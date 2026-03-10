import type { SubscriptionEntity$Outbound } from "creem/models/components";

/**
 * Parameters for retrieving a Creem subscription.
 *
 * @example
 * ```typescript
 * const { data, error } = await authClient.creem.retrieveSubscription({
 *   id: "sub_abc123"
 * });
 * ```
 */
export interface RetrieveSubscriptionInput {
  /**
   * The subscription ID to retrieve.
   * You can get this from webhook events or from your database.
   *
   * @example "sub_abc123"
   */
  id: string;
}

/**
 * Creem subscription object returned from the API.
 *
 * @see SubscriptionEntity$Outbound This alias is offered for convenience,
 * but the original Creem JSDoc is not preserved when the type is re-exported here.
 */
export type SubscriptionData = SubscriptionEntity$Outbound;
