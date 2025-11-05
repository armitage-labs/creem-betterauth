export { AdapterConfig, AdapterFactory, AdapterFactoryConfig, AdapterFactoryCustomizeAdapterCreator, AdapterFactoryOptions, AdapterTestDebugLogs, CreateAdapterOptions, CreateCustomAdapter, CustomAdapter, createAdapter, createAdapterFactory } from '../index.cjs';
import { BetterAuthOptions } from '@better-auth/core';
import { DBAdapterDebugLogOption, DBAdapter } from '@better-auth/core/db/adapter';
export * from '@better-auth/core/db/adapter';
import '@better-auth/core/db';
import '../../shared/better-auth.DNnBkMGu.cjs';
import '../../shared/better-auth.Bn2XUCG7.cjs';

interface DB {
    [key: string]: any;
}
interface DrizzleAdapterConfig {
    /**
     * The schema object that defines the tables and fields
     */
    schema?: Record<string, any>;
    /**
     * The database provider
     */
    provider: "pg" | "mysql" | "sqlite";
    /**
     * If the table names in the schema are plural
     * set this to true. For example, if the schema
     * has an object with a key "users" instead of "user"
     */
    usePlural?: boolean;
    /**
     * Enable debug logs for the adapter
     *
     * @default false
     */
    debugLogs?: DBAdapterDebugLogOption;
    /**
     * By default snake case is used for table and field names
     * when the CLI is used to generate the schema. If you want
     * to use camel case, set this to true.
     * @default false
     */
    camelCase?: boolean;
    /**
     * Whether to execute multiple operations in a transaction.
     *
     * If the database doesn't support transactions,
     * set this to `false` and operations will be executed sequentially.
     * @default true
     */
    transaction?: boolean;
}
declare const drizzleAdapter: (db: DB, config: DrizzleAdapterConfig) => (options: BetterAuthOptions) => DBAdapter<BetterAuthOptions>;

export { drizzleAdapter };
export type { DB, DrizzleAdapterConfig };
