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
   * @required
   * @example "sub_abc123"
   */
  id: string;
}

/**
 * Creem subscription object returned from the API.
 */
export type SubscriptionData = SubscriptionEntity$Outbound;