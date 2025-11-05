export { AdapterConfig, AdapterFactory, AdapterFactoryConfig, AdapterFactoryCustomizeAdapterCreator, AdapterFactoryOptions, AdapterTestDebugLogs, CreateAdapterOptions, CreateCustomAdapter, CustomAdapter, createAdapter, createAdapterFactory } from '../index.mjs';
import * as _better_auth_core_db_adapter from '@better-auth/core/db/adapter';
import { DBAdapterDebugLogOption } from '@better-auth/core/db/adapter';
export * from '@better-auth/core/db/adapter';
import { BetterAuthOptions } from '@better-auth/core';
import '@better-auth/core/db';
import '../../shared/better-auth.DNnBkMGu.mjs';
import '../../shared/better-auth.Bn2XUCG7.mjs';

interface MemoryDB {
    [key: string]: any[];
}
interface MemoryAdapterConfig {
    debugLogs?: DBAdapterDebugLogOption;
}
declare const memoryAdapter: (db: MemoryDB, config?: MemoryAdapterConfig) => (options: BetterAuthOptions) => _better_auth_core_db_adapter.DBAdapter<BetterAuthOptions>;

export { memoryAdapter };
export type { MemoryAdapterConfig, MemoryDB };
