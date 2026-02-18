import type {
  TransactionEntity$Outbound,
  TransactionListEntity$Outbound,
} from "creem/models/components";

/**
 * Parameters for searching Creem transactions.
 *
 * @example
 * ```typescript
 * const { data, error } = await authClient.creem.searchTransactions({
 *   customerId: "cust_abc123",
 *   pageSize: 50
 * });
 * ```
 */
export interface SearchTransactionsInput {
  /**
   * Customer ID to filter transactions by.
   * If not provided, uses the authenticated user's Creem customer ID from session.
   *
   * @optional
   * @example "cust_abc123"
   */
  customerId?: string;

  /**
   * Page number for pagination.
   * Must be at least 1.
   *
   * @optional
   * @default 1
   * @example 2
   */
  pageNumber?: number;

  /**
   * Number of transactions to return per page.
   * Must be a positive number.
   *
   * @optional
   * @default 20
   * @example 50
   */
  pageSize?: number;

  /**
   * Product ID to filter transactions by.
   *
   * @optional
   * @example "prod_abc123"
   */
  productId?: string;

  /**
   * Order ID to filter transactions by.
   *
   * @optional
   * @example "ord_abc123"
   */
  orderId?: string;
}

/**
 * A single transaction object from Creem.
 */
export type TransactionData = TransactionEntity$Outbound;

/**
 * Response from searching transactions.
 */
export type SearchTransactionsResponse = TransactionListEntity$Outbound;

