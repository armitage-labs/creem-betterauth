import { createAuthEndpoint, getSessionFromCtx } from "better-auth/api";
import type { GenericEndpointContext } from "better-auth";
import type { CreemOptions } from "./types";
import type { CreatePortalInput, CreatePortalResponse } from "./portal-types";

// Re-export types for convenience
export type { CreatePortalInput, CreatePortalResponse };

const createPortalHandler = (serverURL: string, options: CreemOptions) => {
  return async (ctx: GenericEndpointContext) => {
    const body = ctx.body;

    try {
      const session = await getSessionFromCtx(ctx);

      if (!session?.user?.id) {
        return ctx.json({ error: "User must be logged in" }, { status: 400 });
      }

      if (!session?.user.creemCustomerId) {
        return ctx.json(
          { error: "User must have a Creem customer ID" },
          { status: 400 }
        );
      }

      const response = await fetch(`${serverURL}/v1/customers/billing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": options.apiKey,
        },
        body: JSON.stringify({
          customer_id: body.customerId || session.user.creemCustomerId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Creem API error: ${response.statusText}`);
      }

      const portal = await response.json();

      return ctx.json({
        url: portal.customer_portal_link,
        redirect: true,
      });
    } catch (error) {
      console.error("Creem portal error:", error);
      return ctx.json({ error: "Failed to create portal" }, { status: 500 });
    }
  };
};

/**
 * Creates the customer portal endpoint for the Creem plugin.
 *
 * This endpoint generates a Creem customer portal URL where users can
 * manage their subscriptions, view invoices, and update payment methods.
 *
 * @param serverURL - The Creem API server URL
 * @param options - Plugin configuration options
 * @returns BetterAuth endpoint configuration
 *
 * @endpoint POST /creem/create-portal
 *
 * @example
 * Client-side usage:
 * ```typescript
 * // Use default customer ID from session
 * const { data, error } = await authClient.creem.createPortal();
 *
 * // Or specify a custom customer ID
 * const { data, error } = await authClient.creem.createPortal({
 *   customerId: "cust_abc123"
 * });
 *
 * if (data?.url) {
 *   window.location.href = data.url;
 * }
 * ```
 */
export const createPortalEndpoint = (
  serverURL: string,
  options: CreemOptions
) => {
  return createAuthEndpoint(
    "/creem/create-portal",
    {
      method: "POST",
    },
    createPortalHandler(serverURL, options)
  );
};
