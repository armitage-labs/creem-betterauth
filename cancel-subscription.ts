import { createAuthEndpoint, getSessionFromCtx } from "better-auth/api";
import type { GenericEndpointContext } from "better-auth";
import { Creem } from "creem";
import { z } from "zod";
import type { CreemOptions } from "./types";
import type {
  CancelSubscriptionInput,
  CancelSubscriptionResponse,
} from "./cancel-subscription-types";

export const CancelSubscriptionParams = z.object({
  id: z.string(),
});

export type CancelSubscriptionParams = z.infer<typeof CancelSubscriptionParams>;

// Re-export types for convenience
export type { CancelSubscriptionInput, CancelSubscriptionResponse };

const createCancelSubscriptionHandler = (
  creem: Creem,
  options: CreemOptions
) => {
  return async (ctx: GenericEndpointContext) => {
    const body = ctx.body as CancelSubscriptionParams;

    try {
      const session = await getSessionFromCtx(ctx);

      if (!session?.user?.id) {
        return ctx.json({ error: "User must be logged in" }, { status: 400 });
      }

      await creem.cancelSubscription({
        xApiKey: options.apiKey,
        id: body.id,
      });

      return ctx.json({
        success: true,
        message: "Subscription cancelled successfully",
      });
    } catch (error) {
      console.error("Creem cancel subscription error:", error);
      return ctx.json(
        { error: "Failed to cancel subscription" },
        { status: 500 }
      );
    }
  };
};

/**
 * Creates the cancel subscription endpoint for the Creem plugin.
 *
 * This endpoint cancels an active subscription. The subscription will be
 * canceled immediately or at the end of the current billing period,
 * depending on your Creem settings.
 *
 * @param creem - The Creem client instance
 * @param options - Plugin configuration options
 * @returns BetterAuth endpoint configuration
 *
 * @endpoint POST /creem/cancel-subscription
 *
 * @example
 * Client-side usage:
 * ```typescript
 * const { data, error } = await authClient.creem.cancelSubscription({
 *   id: "sub_abc123"
 * });
 *
 * if (data?.success) {
 *   console.log(data.message); // "Subscription cancelled successfully"
 * }
 * ```
 */
export const createCancelSubscriptionEndpoint = (
  creem: Creem,
  options: CreemOptions
) => {
  return createAuthEndpoint(
    "/creem/cancel-subscription",
    {
      method: "POST",
      body: CancelSubscriptionParams,
    },
    createCancelSubscriptionHandler(creem, options)
  );
};
