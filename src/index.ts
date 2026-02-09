import type { BetterAuthPlugin } from "better-auth";
import { Creem } from "creem";
import { createCancelSubscriptionEndpoint } from "./cancel-subscription.js";
import { createCheckoutEndpoint } from "./checkout.js";
import { createHasAccessGrantedEndpoint } from "./has-active-subscription.js";
import { createPortalEndpoint } from "./portal.js";
import { createRetrieveSubscriptionEndpoint } from "./retrieve-subscription.js";
import { getSchema } from "./schema.js";
import { createSearchTransactionsEndpoint } from "./search-transactions.js";
import type { CreemOptions } from "./types.js";
import { createWebhookEndpoint } from "./webhook.js";

// Export subscription types
export type {
	CancelSubscriptionInput,
	CancelSubscriptionResponse,
} from "./cancel-subscription-types.js";

// Export checkout types
export type {
	CheckoutCustomer,
	CreateCheckoutInput,
	CreateCheckoutResponse,
} from "./checkout-types.js";
// Export server utilities and types
export type { CreemServerConfig } from "./creem-server.js";
export {
	cancelSubscription,
	checkSubscriptionAccess,
	createCheckout,
	createCreemClient,
	createPortal,
	formatCreemDate,
	getActiveSubscriptions,
	getDaysUntilRenewal,
	isActiveSubscription,
	retrieveSubscription,
	searchTransactions,
	validateWebhookSignature,
} from "./creem-server.js";
// Export access check types
export type { HasAccessGrantedResponse } from "./has-active-subscription-types.js";
// Export portal types
export type {
	CreatePortalInput,
	CreatePortalResponse,
} from "./portal-types.js";
export type {
	RetrieveSubscriptionInput,
	SubscriptionData,
} from "./retrieve-subscription-types.js";
// Export transaction types
export type {
	SearchTransactionsInput,
	SearchTransactionsResponse,
	TransactionData,
} from "./search-transactions-types.js";
// Export plugin configuration types
export type {
	CreemOptions,
	FlatCheckoutCompleted,
	FlatDisputeCreated,
	FlatRefundCreated,
	FlatSubscriptionEvent,
	GrantAccessContext,
	GrantAccessReason,
	RevokeAccessContext,
	RevokeAccessReason,
} from "./types.js";

/**
 * Creem Better-Auth plugin for payment and subscription management.
 *
 * Provides endpoints for:
 * - `createCheckout` - Create a checkout session for a product
 * - `createPortal` - Create a customer portal session
 * - `cancelSubscription` - Cancel an active subscription
 * - `retrieveSubscription` - Get subscription details
 * - `searchTransactions` - Search transaction history
 * - `hasAccessGranted` - Check if user has an active subscription
 *
 * @param options - Plugin configuration options
 * @returns BetterAuth plugin configuration
 *
 * @example
 * ```typescript
 * import { creem } from "@creem_io/better-auth";
 *
 * export const auth = betterAuth({
 *   plugins: [
 *     creem({
 *       apiKey: process.env.CREEM_API_KEY!,
 *       testMode: true,
 *       defaultSuccessUrl: "/success",
 *       onGrantAccess: async ({ customer, product, metadata }) => {
 *         // Grant user access to your platform
 *       },
 *       onRevokeAccess: async ({ customer, product, metadata }) => {
 *         // Revoke user access
 *       }
 *     })
 *   ]
 * });
 * ```
 */
export const creem = <T extends CreemOptions>(options: T) => {
	const serverURL = options.testMode
		? "https://test-api.creem.io"
		: "https://api.creem.io";

	const creem = new Creem({
		apiKey: options.apiKey,
		serverURL,
	});

	if (!options.apiKey) {
		console.warn(
			"⚠️  Creem API key is not set. The plugin will initialize, but Creem API functionality will not work until an API key is provided.",
		);
	}

	return {
		id: "creem",
		endpoints: {
			createCheckout: createCheckoutEndpoint(creem, options),
			createPortal: createPortalEndpoint(serverURL, options),
			cancelSubscription: createCancelSubscriptionEndpoint(creem, options),
			retrieveSubscription: createRetrieveSubscriptionEndpoint(creem, options),
			searchTransactions: createSearchTransactionsEndpoint(creem, options),
			hasAccessGranted: createHasAccessGrantedEndpoint(options),
			...(options.webhookSecret && {
				creemWebhook: createWebhookEndpoint(options),
			}),
		},
		schema: getSchema(options),
	} satisfies BetterAuthPlugin;
};
