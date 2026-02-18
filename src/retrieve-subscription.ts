import { createAuthEndpoint, getSessionFromCtx } from "better-auth/api";
import type { GenericEndpointContext } from "better-auth";
import { Creem } from "creem";
import { z } from "zod";
import type { CreemOptions } from "./types.js";
import type {
  RetrieveSubscriptionInput,
  SubscriptionData,
} from "./retrieve-subscription-types.js";

export const RetrieveSubscriptionParams = z.object({
  id: z.string().optional(),
});

export type RetrieveSubscriptionParams = z.infer<
  typeof RetrieveSubscriptionParams
>;

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

// Re-export types for convenience
export type { RetrieveSubscriptionInput, SubscriptionData };

const createRetrieveSubscriptionHandler = (
  creem: Creem,
  options: CreemOptions,
) => {
  return async (ctx: GenericEndpointContext) => {
    const body = ctx.body as RetrieveSubscriptionParams;

    if (!options.apiKey) {
      return ctx.json(
        { error: "Creem API key is not configured. Please set the apiKey option when initializing the Creem plugin." },
        { status: 500 },
      );
    }

    try {
      const session = await getSessionFromCtx(ctx);

      if (!session?.user?.id) {
        return ctx.json({ error: "User must be logged in" }, { status: 400 });
      }

      let subscriptionId = body.id;

      // Check if database persistence is enabled
      const shouldPersist = options.persistSubscriptions !== false;

      if (shouldPersist) {
        // If database persistence is enabled, fetch the user's subscription from the database
        const userId = session.user.id;

        // Find all subscriptions for this user
        const subscriptions = await ctx.context.adapter.findMany<Subscription>({
          model: "creem_subscription",
          where: [{ field: "referenceId", value: userId }],
        });

        if (subscriptions && subscriptions.length > 0) {
          // Get the first subscription for this user
          const userSubscription = subscriptions[0];

          if (userSubscription && userSubscription.creemSubscriptionId) {
            // Use the subscription ID from the database
            subscriptionId = userSubscription.creemSubscriptionId;
          } else if (!subscriptionId) {
            // If subscription doesn't have a Creem ID and no ID provided, return error
            return ctx.json(
              { error: "No subscription found for this user" },
              { status: 404 },
            );
          }
        } else if (!subscriptionId) {
          // No subscriptions in database and no ID provided
          return ctx.json(
            { error: "No subscription found for this user" },
            { status: 404 },
          );
        }
      } else if (!subscriptionId) {
        // If persistence is disabled and no ID provided, return error
        return ctx.json(
          {
            error:
              "Subscription ID is required when database persistence is disabled",
          },
          { status: 400 },
        );
      }

      // When persistence is disabled, verify the subscription belongs to the
      // authenticated user via the Creem API.
      if (!shouldPersist && subscriptionId) {
        if (!session?.user?.creemCustomerId) {
          return ctx.json({ error: "User must have a Creem customer ID" }, { status: 400 });
        }
        try {
          const sub = await creem.subscriptions.get(subscriptionId);
          const subCustomerId = typeof sub.customer === "object" ? sub.customer.id : (sub.customer as string);
          const metadataRef = (sub as any).metadata?.referenceId as string | undefined;
          if (subCustomerId !== session.user.creemCustomerId && metadataRef !== session.user.id) {
            return ctx.json({ error: "Subscription does not belong to the authenticated user" }, { status: 403 });
          }
        } catch (err) {
          return ctx.json({ error: "Subscription not found" }, { status: 404 });
        }
      }

      const subscription = await creem.subscriptions.get(subscriptionId);

      return ctx.json(subscription);
    } catch (error) {
      return ctx.json(
        { error: "Failed to retrieve subscription" },
        { status: 500 },
      );
    }
  };
};

/**
 * Creates the retrieve subscription endpoint for the Creem plugin.
 *
 * This endpoint retrieves detailed information about a subscription,
 * including its status, product details, customer information, and billing dates.
 *
 * **Behavior:**
 * - If database persistence is enabled (persistSubscriptions: true), the endpoint
 *   will automatically find the authenticated user's subscription and retrieve it.
 *   The `id` parameter is optional in this case.
 * - If database persistence is disabled, the `id` parameter is required.
 *
 * @param creem - The Creem client instance
 * @param options - Plugin configuration options
 * @returns BetterAuth endpoint configuration
 *
 * @endpoint POST /creem/retrieve-subscription
 *
 * @example
 * Client-side usage with database persistence enabled (id is optional):
 * ```typescript
 * // Retrieves the authenticated user's subscription
 * const { data, error } = await authClient.creem.retrieveSubscription({});
 *
 * if (data) {
 *   console.log(`Status: ${data.status}`);
 *   console.log(`Product: ${data.product.name}`);
 *   console.log(`Next billing: ${new Date(data.next_transaction_date)}`);
 * }
 * ```
 *
 * @example
 * Client-side usage with explicit subscription ID:
 * ```typescript
 * const { data, error } = await authClient.creem.retrieveSubscription({
 *   id: "sub_abc123"
 * });
 *
 * if (data) {
 *   console.log(`Status: ${data.status}`);
 *   console.log(`Product: ${data.product.name}`);
 *   console.log(`Next billing: ${new Date(data.next_transaction_date)}`);
 * }
 * ```
 */
export const createRetrieveSubscriptionEndpoint = (
  creem: Creem,
  options: CreemOptions,
) => {
  return createAuthEndpoint(
    "/creem/retrieve-subscription",
    {
      method: "POST",
      body: RetrieveSubscriptionParams,
    },
    createRetrieveSubscriptionHandler(creem, options),
  );
};
