import { U as UnionToIntersection } from './better-auth.DNnBkMGu.cjs';
import { BetterAuthPluginDBSchema } from '@better-auth/core/db';
import { BetterAuthOptions, BetterAuthPlugin } from '@better-auth/core';

type InferOptionSchema<S extends BetterAuthPluginDBSchema> = S extends Record<string, {
    fields: infer Fields;
}> ? {
    [K in keyof S]?: {
        modelName?: string;
        fields?: {
            [P in keyof Fields]?: string;
        };
    };
} : never;
type InferPluginErrorCodes<O extends BetterAuthOptions> = O["plugins"] extends Array<infer P> ? UnionToIntersection<P extends BetterAuthPlugin ? P["$ERROR_CODES"] extends Record<string, any> ? P["$ERROR_CODES"] : {} : {}> : {};

export type { InferOptionSchema as I, InferPluginErrorCodes as a };
