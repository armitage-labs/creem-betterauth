export { AdapterConfig, AdapterFactory, AdapterFactoryConfig, AdapterFactoryCustomizeAdapterCreator, AdapterFactoryOptions, AdapterTestDebugLogs, CreateAdapterOptions, CreateCustomAdapter, CustomAdapter, createAdapter, createAdapterFactory } from '../index.mjs';
import { MongoClient, Db } from 'mongodb';
import { BetterAuthOptions } from '@better-auth/core';
import { DBAdapterDebugLogOption, DBAdapter } from '@better-auth/core/db/adapter';
export * from '@better-auth/core/db/adapter';
import '@better-auth/core/db';
import '../../shared/better-auth.DNnBkMGu.mjs';
import '../../shared/better-auth.Bn2XUCG7.mjs';

interface MongoDBAdapterConfig {
    /**
     * MongoDB client instance
     * If not provided, Database transactions won't be enabled.
     */
    client?: MongoClient;
    /**
     * Enable debug logs for the adapter
     *
     * @default false
     */
    debugLogs?: DBAdapterDebugLogOption;
    /**
     * Use plural table names
     *
     * @default false
     */
    usePlural?: boolean;
    /**
     * Whether to execute multiple operations in a transaction.
     *
     * If the database doesn't support transactions,
     * set this to `false` and operations will be executed sequentially.
     * @default true
     */
    transaction?: boolean;
}
declare const mongodbAdapter: (db: Db, config?: MongoDBAdapterConfig) => (options: BetterAuthOptions) => DBAdapter<BetterAuthOptions>;

export { mongodbAdapter };
export type { MongoDBAdapterConfig };
