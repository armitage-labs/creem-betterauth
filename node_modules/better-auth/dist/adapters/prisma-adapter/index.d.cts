export { AdapterConfig, AdapterFactory, AdapterFactoryConfig, AdapterFactoryCustomizeAdapterCreator, AdapterFactoryOptions, AdapterTestDebugLogs, CreateAdapterOptions, CreateCustomAdapter, CustomAdapter, createAdapter, createAdapterFactory } from '../index.cjs';
import { BetterAuthOptions } from '@better-auth/core';
import { DBAdapterDebugLogOption, DBAdapter } from '@better-auth/core/db/adapter';
export * from '@better-auth/core/db/adapter';
import '@better-auth/core/db';
import '../../shared/better-auth.DNnBkMGu.cjs';
import '../../shared/better-auth.Bn2XUCG7.cjs';

interface PrismaConfig {
    /**
     * Database provider.
     */
    provider: "sqlite" | "cockroachdb" | "mysql" | "postgresql" | "sqlserver" | "mongodb";
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
interface PrismaClient {
}
declare const prismaAdapter: (prisma: PrismaClient, config: PrismaConfig) => (options: BetterAuthOptions) => DBAdapter<BetterAuthOptions>;

export { prismaAdapter };
export type { PrismaConfig };
