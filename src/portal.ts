import type { GenericEndpointContext } from "better-auth";
import { createAuthEndpoint, getSessionFromCtx } from "better-auth/api";
import type { Creem } from "creem";
import { z } from "zod";
import type {
	CreatePortalInput,
	CreatePortalResponse,
} from "./portal-types.js";
import type { CreemOptions } from "./types.js";

export const PortalParams = z.object({
	customerId: z.string().optional(),
	redirect: z.boolean().optional().prefault(true).default(true),
});

export type PortalParams = z.infer<typeof PortalParams>;

// Re-export types for convenience
export type { CreatePortalInput, CreatePortalResponse };

const createPortalHandler = (creem: Creem, options: CreemOptions) => {
	return async (ctx: GenericEndpointContext) => {
		const body = (ctx.body || {}) as PortalParams;

		if (!options.apiKey) {
			return ctx.json(
				{
					error:
						"Creem API key is not configured. Please set the apiKey option when initializing the Creem plugin.",
				},
				{ status: 500 },
			);
		}

		try {
			const session = await getSessionFromCtx(ctx);

			if (!session?.user?.id) {
				return ctx.json({ error: "User must be logged in" }, { status: 400 });
			}

			if (!session?.user.creemCustomerId) {
				return ctx.json(
					{ error: "User must have a Creem customer ID" },
					{ status: 400 },
				);
			}

			const customerId = body.customerId || session.user.creemCustomerId;

			if (customerId !== session.user.creemCustomerId) {
				return ctx.json(
					{
						error:
							"Provided customerId does not match the customer's ID in the session. Please provide a valid customerId or omit it to use the default.",
					},
					{ status: 403 },
				);
			}

			const { customerPortalLink } = await creem.customers.generateBillingLinks(
				{
					customerId,
				},
			);

			return ctx.json({
				url: customerPortalLink,
				redirect: body.redirect,
			});
		} catch {
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
 * @param creem - The Creem client instance
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
export const createPortalEndpoint = (creem: Creem, options: CreemOptions) => {
	return createAuthEndpoint(
		"/creem/create-portal",
		{
			method: "POST",
			body: PortalParams,
		},
		createPortalHandler(creem, options),
	);
};
