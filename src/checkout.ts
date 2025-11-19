import { createAuthEndpoint, getSessionFromCtx } from "better-auth/api";
import type { GenericEndpointContext } from "better-auth";
import { Creem } from "creem";
import { z } from "zod";
import type { CreemOptions } from "./types.js";
import { resolveSuccessUrl } from "./utils.js";
import type {
  CreateCheckoutInput,
  CreateCheckoutResponse,
} from "./checkout-types.js";

export const CheckoutParams = z.object({
  productId: z.string(),
  requestId: z.string().optional(),
  units: z.number().positive().optional(),
  discountCode: z.string().optional(),
  customer: z
    .object({
      email: z.string().email().optional(),
    })
    .optional(),
  customField: z.array(z.record(z.string(), z.unknown())).max(3).optional(),
  successUrl: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type CheckoutParams = z.infer<typeof CheckoutParams>;

// Re-export types for convenience
export type { CreateCheckoutInput, CreateCheckoutResponse };

const createCheckoutHandler = (creem: Creem, options: CreemOptions) => {
  return async (ctx: GenericEndpointContext) => {
    const body = ctx.body as CheckoutParams;

    try {
      const session = await getSessionFromCtx(ctx);

      const checkout = await creem.createCheckout({
        xApiKey: options.apiKey,
        createCheckoutRequest: {
          productId: body.productId,
          requestId: body.requestId,
          units: body.units,
          discountCode: body.discountCode,
          customer: body.customer?.email ? {
            email: body.customer.email,
          } : session?.user?.email ? {
            email: session.user.email,
          } : undefined,
          //   customField: body.customField, TODO: Implement proper customField handling
          successUrl: resolveSuccessUrl(
            body.successUrl || options.defaultSuccessUrl,
            ctx
          ),
          metadata: {
            ...(body.metadata || {}),
            ...(session?.user?.id && {
              referenceId: session.user.id,
            }),
          },
        },
      });

      return ctx.json({
        url: checkout.checkoutUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("Creem checkout error:", error);
      return ctx.json({ error: "Failed to create checkout" }, { status: 500 });
    }
  };
};

/**
 * Creates the checkout endpoint for the Creem plugin.
 *
 * This endpoint handles creating Creem checkout sessions for authenticated users.
 * It automatically includes the user's session information and redirects to the checkout URL.
 *
 * @param creem - The Creem client instance
 * @param options - Plugin configuration options
 * @returns BetterAuth endpoint configuration
 *
 * @endpoint POST /creem/create-checkout
 *
 * @example
 * Client-side usage:
 * ```typescript
 * const { data, error } = await authClient.creem.createCheckout({
 *   productId: "prod_abc123",
 *   units: 1,
 *   successUrl: "/thank-you"
 * });
 *
 * if (data?.url) {
 *   window.location.href = data.url;
 * }
 * ```
 */
export const createCheckoutEndpoint = (creem: Creem, options: CreemOptions) => {
  return createAuthEndpoint(
    "/creem/create-checkout",
    {
      method: "POST",
      body: CheckoutParams,
    },
    createCheckoutHandler(creem, options)
  );
};
