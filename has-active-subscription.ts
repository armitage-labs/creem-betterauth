import { createAuthEndpoint, getSessionFromCtx } from "better-auth/api";
import type { GenericEndpointContext } from "better-auth";
import { z } from "zod";
import type { CreemOptions } from "./types";
import { SubscriptionStatus } from "./webhook-types";

// No input needed - uses session to get user ID
export const HasAccessGrantedParams = z.object({}).optional();

export type HasAccessGrantedParams = z.infer<typeof HasAccessGrantedParams>;

interface Subscription {
  id: string;
  productId: string;
  referenceId: string;
  creemCustomerId?: string;
  creemSubscriptionId?: string;
  creemOrderId?: string;
  status: string;
  periodStart?: Date;
  periodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
}

const createHasAccessGrantedHandler = (options: CreemOptions) => {
  return async (ctx: GenericEndpointContext) => {
    try {
      const session = await getSessionFromCtx(ctx);

      if (!session?.user?.id) {
        return ctx.json(
          {
            hasAccessGranted: undefined,
            message: "User must be logged in to check subscription status",
          },
          { status: 401 }
        );
      }

      // Check if persistSubscriptions is disabled
      const shouldPersist = options.persistSubscriptions !== false;

      if (!shouldPersist) {
        return ctx.json(
          {
            hasAccessGranted: undefined,
            message:
              "Database persistence is disabled. Enable 'persistSubscriptions' option or implement custom subscription checking.",
          },
          { status: 400 }
        );
      }

      const userId = session.user.id;

      // Find all subscriptions for this user
      const subscriptions = await ctx.context.adapter.findMany<Subscription>({
        model: "subscription",
        where: [{ field: "referenceId", value: userId }],
      });

      if (!subscriptions || subscriptions.length === 0) {
        return ctx.json({
          hasAccessGranted: false,
          message: "No subscriptions found for this user",
        });
      }

      // Get current UTC time
      const now = new Date();

      // Check each subscription
      for (const subscription of subscriptions) {
        const status = subscription.status.toLowerCase() as SubscriptionStatus;

        // Active or trialing = always has access
        if (status === "active" || status === "trialing") {
          return ctx.json({
            hasAccessGranted: true,
            subscription: {
              id: subscription.id,
              status: subscription.status,
              productId: subscription.productId,
              periodEnd: subscription.periodEnd,
            },
          });
        }

        // For canceled, past_due, or unpaid - check if period hasn't ended yet
        if (status === "canceled" || status === "unpaid") {
          if (subscription.periodEnd) {
            const periodEnd = new Date(subscription.periodEnd);

            // If period hasn't ended yet, user still has access
            if (periodEnd > now) {
              return ctx.json({
                hasAccessGranted: true,
                subscription: {
                  id: subscription.id,
                  status: subscription.status,
                  productId: subscription.productId,
                  periodEnd: subscription.periodEnd,
                },
                message: `Subscription is ${status} but access granted until ${periodEnd.toISOString()}`,
              });
            }
          }
        }
      }

      // No active subscriptions found
      return ctx.json({
        hasAccessGranted: false,
        message: "No active subscriptions found",
        subscriptions: subscriptions.map((s) => ({
          id: s.id,
          status: s.status,
          productId: s.productId,
          periodEnd: s.periodEnd,
        })),
      });
    } catch (error) {
      console.error("Error checking active subscription:", error);
      return ctx.json(
        {
          hasAccessGranted: undefined,
          message: "Failed to check subscription status",
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 500 }
      );
    }
  };
};

export const createHasAccessGrantedEndpoint = (options: CreemOptions) => {
  return createAuthEndpoint(
    "/creem/has-access-granted",
    {
      method: "GET",
    },
    createHasAccessGrantedHandler(options)
  );
};
