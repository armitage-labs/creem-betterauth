export { AdapterConfig, AdapterFactory, AdapterFactoryConfig, AdapterFactoryCustomizeAdapterCreator, AdapterFactoryOptions, AdapterTestDebugLogs, CreateAdapterOptions, CreateCustomAdapter, CustomAdapter, createAdapter, createAdapterFactory } from '../index.cjs';
import { Kysely } from 'kysely';
import { BetterAuthOptions } from '@better-auth/core';
import { K as KyselyDatabaseType } from '../../shared/better-auth.BnBM8gPy.cjs';
import { DBAdapterDebugLogOption, DBAdapter } from '@better-auth/core/db/adapter';
export * from '@better-auth/core/db/adapter';
import '@better-auth/core/db';
import '../../shared/better-auth.DNnBkMGu.cjs';
import '../../shared/better-auth.Bn2XUCG7.cjs';

declare function getKyselyDatabaseType(db: BetterAuthOptions["database"]): KyselyDatabaseType | null;
declare const createKyselyAdapter: (config: BetterAuthOptions) => Promise<{
    kysely: Kysely<any>;
    databaseType: "postgres" | "mysql" | "sqlite" | "mssql";
    transaction: boolean | undefined;
} | {
    kysely: Kysely<any> | null;
    databaseType: KyselyDatabaseType | null;
    transaction: undefined;
}>;

interface KyselyAdapterConfig {
    /**
     * Database type.
     */
    type?: KyselyDatabaseType;
    /**
     * Enable debug logs for the adapter
     *
     * @default false
     */
    debugLogs?: DBAdapterDebugLogOption;
    /**
     * Use plural for table names.
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
declare const kyselyAdapter: (db: Kysely<any>, config?: KyselyAdapterConfig) => (options: BetterAuthOptions) => DBAdapter<BetterAuthOptions>;

export { KyselyDatabaseType, createKyselyAdapter, getKyselyDatabaseType, kyselyAdapter };
