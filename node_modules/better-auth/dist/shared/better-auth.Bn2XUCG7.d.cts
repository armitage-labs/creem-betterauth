import { DBAdapter, DBTransactionAdapter, DBAdapterSchemaCreation, DBAdapterInstance } from '@better-auth/core/db/adapter';

/**
 * Adapter Interface
 *
 * @deprecated Use `DBAdapter` from `@better-auth/core/db/adapter` instead.
 */
type Adapter = DBAdapter;
/**
 * @deprecated Use `DBTransactionAdapter` from `@better-auth/core/db/adapter` instead.
 */
type TransactionAdapter = DBTransactionAdapter;
/**
 * @deprecated Use `DBAdapterSchemaCreation` from `@better-auth/core/db/adapter` instead.
 */
type AdapterSchemaCreation = DBAdapterSchemaCreation;
/**
 * @deprecated Use `DBAdapterInstance` from `@better-auth/core/db/adapter` instead.
 */
type AdapterInstance = DBAdapterInstance;

export type { Adapter as A, TransactionAdapter as T, AdapterSchemaCreation as a, AdapterInstance as b };
