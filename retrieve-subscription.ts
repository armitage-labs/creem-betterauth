import { createAuthEndpoint, getSessionFromCtx } from "better-auth/api";
import type { GenericEndpointContext } from "better-auth";
import { Creem } from "creem";
import { z } from "zod";
import type { CreemOptions } from "./types";
import type {
  RetrieveSubscriptionInput,
  SubscriptionData,
} from "./retrieve-subscription-types";

export const RetrieveSubscriptionParams = z.object({
  id: z.string(),
});

export type RetrieveSubscriptionParams = z.infer<
  typeof RetrieveSubscriptionParams
>;

// Re-export types for convenience
export type { RetrieveSubscriptionInput, SubscriptionData };

const createRetrieveSubscriptionHandler = (
  creem: Creem,
  options: CreemOptions
) => {
  return async (ctx: GenericEndpointContext) => {
    const body = ctx.body as RetrieveSubscriptionParams;

    try {
      const session = await getSessionFromCtx(ctx);

      if (!session?.user?.id) {
        return ctx.json({ error: "User must be logged in" }, { status: 400 });
      }

      const subscription = await creem.retrieveSubscription({
        xApiKey: options.apiKey,
        subscriptionId: body.id,
      });

      return ctx.json(subscription);
    } catch (error) {
      console.error("Creem retrieve subscription error:", error);
      return ctx.json(
        { error: "Failed to retrieve subscription" },
        { status: 500 }
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
 * @param creem - The Creem client instance
 * @param options - Plugin configuration options
 * @returns BetterAuth endpoint configuration
 *
 * @endpoint POST /creem/retrieve-subscription
 *
 * @example
 * Client-side usage:
 * ```typescript
 * const { data, error } = await authClient.creem.retrieveSubscription({
 *   id: "sub_abc123"
 * });
 *
 * if (data) {
 *   console.log(`Status: ${data.status}`);
 *   console.log(`Product: ${data.product.name}`);
 *   console.log(`Next billing: ${new Date(data.next_billing_date * 1000)}`);
 * }
 * ```
 */
export const createRetrieveSubscriptionEndpoint = (
  creem: Creem,
  options: CreemOptions
) => {
  return createAuthEndpoint(
    "/creem/retrieve-subscription",
    {
      method: "POST",
      body: RetrieveSubscriptionParams,
    },
    createRetrieveSubscriptionHandler(creem, options)
  );
};
