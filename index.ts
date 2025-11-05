import { BetterAuthPlugin } from "better-auth";
import { Creem } from "creem";
import { getSchema } from "./schema";
import { createCheckoutEndpoint } from "./checkout";
import { createPortalEndpoint } from "./portal";
import { createCancelSubscriptionEndpoint } from "./cancel-subscription";
import { createRetrieveSubscriptionEndpoint } from "./retrieve-subscription";
import { createSearchTransactionsEndpoint } from "./search-transactions";
import { createHasAccessGrantedEndpoint } from "./has-active-subscription";
import { createWebhookEndpoint } from "./webhook";
import { CreemOptions } from "./types";

// Export types for client-side usage
export type {
  CreateCheckoutInput,
  CreateCheckoutResponse,
  CheckoutCustomer,
} from "./checkout-types";

export type { CreatePortalInput, CreatePortalResponse } from "./portal-types";

export type {
  CancelSubscriptionInput,
  CancelSubscriptionResponse,
} from "./cancel-subscription-types";

export type {
  RetrieveSubscriptionInput,
  SubscriptionData,
} from "./retrieve-subscription-types";

export type {
  SearchTransactionsInput,
  SearchTransactionsResponse,
  TransactionData,
} from "./search-transactions-types";

export type { HasAccessGrantedResponse } from "./has-active-subscription-types";

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
 * import { creem } from "./lib/creem-betterauth";
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
export const creem = (options: CreemOptions) => {
  const serverURL = options.testMode
    ? "https://test-api.creem.io"
    : "https://api.creem.io";

  const creem = new Creem({
    serverURL,
  });

  if (!options.apiKey) {
    throw new Error("Creem API key is not set");
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

module.exports = { creem };
