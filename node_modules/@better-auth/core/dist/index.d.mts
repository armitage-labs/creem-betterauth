import { L as LiteralString } from './shared/core.CajxAutx.mjs';
export { a as LiteralUnion } from './shared/core.CajxAutx.mjs';
import { A as AuthContext, B as BetterAuthOptions, a as AuthMiddleware } from './shared/core.C6_2xGyf.mjs';
export { b as BetterAuthAdvancedOptions, d as BetterAuthCookies, c as BetterAuthRateLimitOptions, G as GenerateIdFn, e as GenericEndpointContext, I as InternalAdapter } from './shared/core.C6_2xGyf.mjs';
import { Migration } from 'kysely';
import { Endpoint, Middleware, EndpointContext, InputContext } from 'better-call';
import { B as BetterAuthPluginDBSchema } from './shared/core.E9DfzGLz.mjs';
import { BetterFetch, BetterFetchOption, BetterFetchPlugin } from '@better-fetch/fetch';
import { WritableAtom, Atom } from 'nanostores';
import 'zod';
import './shared/core.Dl-70uns.mjs';
import 'bun:sqlite';
import 'node:sqlite';
import './social-providers/index.mjs';
import '@better-auth/core/oauth2';
import './shared/core.Bl6TpxyD.mjs';
import './shared/core.BwoNUcJQ.mjs';
import '@better-auth/core';

type Awaitable<T> = T | Promise<T>;
type DeepPartial<T> = T extends Function ? T : T extends object ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : T;
type HookEndpointContext = EndpointContext<string, any> & Omit<InputContext<string, any>, "method"> & {
    context: AuthContext & {
        returned?: unknown;
        responseHeaders?: Headers;
    };
    headers?: Headers;
};
type BetterAuthPlugin = {
    id: LiteralString;
    /**
     * The init function is called when the plugin is initialized.
     * You can return a new context or modify the existing context.
     */
    init?: (ctx: AuthContext) => Awaitable<{
        context?: DeepPartial<Omit<AuthContext, "options">>;
        options?: Partial<BetterAuthOptions>;
    }> | void | Promise<void>;
    endpoints?: {
        [key: string]: Endpoint;
    };
    middlewares?: {
        path: string;
        middleware: Middleware;
    }[];
    onRequest?: (request: Request, ctx: AuthContext) => Promise<{
        response: Response;
    } | {
        request: Request;
    } | void>;
    onResponse?: (response: Response, ctx: AuthContext) => Promise<{
        response: Response;
    } | void>;
    hooks?: {
        before?: {
            matcher: (context: HookEndpointContext) => boolean;
            handler: AuthMiddleware;
        }[];
        after?: {
            matcher: (context: HookEndpointContext) => boolean;
            handler: AuthMiddleware;
        }[];
    };
    /**
     * Schema the plugin needs
     *
     * This will also be used to migrate the database. If the fields are dynamic from the plugins
     * configuration each time the configuration is changed a new migration will be created.
     *
     * NOTE: If you want to create migrations manually using
     * migrations option or any other way you
     * can disable migration per table basis.
     *
     * @example
     * ```ts
     * schema: {
     * 	user: {
     * 		fields: {
     * 			email: {
     * 				 type: "string",
     * 			},
     * 			emailVerified: {
     * 				type: "boolean",
     * 				defaultValue: false,
     * 			},
     * 		},
     * 	}
     * } as AuthPluginSchema
     * ```
     */
    schema?: BetterAuthPluginDBSchema;
    /**
     * The migrations of the plugin. If you define schema that will automatically create
     * migrations for you.
     *
     * ⚠️ Only uses this if you dont't want to use the schema option and you disabled migrations for
     * the tables.
     */
    migrations?: Record<string, Migration>;
    /**
     * The options of the plugin
     */
    options?: Record<string, any> | undefined;
    /**
     * types to be inferred
     */
    $Infer?: Record<string, any>;
    /**
     * The rate limit rules to apply to specific paths.
     */
    rateLimit?: {
        window: number;
        max: number;
        pathMatcher: (path: string) => boolean;
    }[];
    /**
     * The error codes returned by the plugin
     */
    $ERROR_CODES?: Record<string, string>;
};

interface ClientStore {
    notify: (signal: string) => void;
    listen: (signal: string, listener: () => void) => void;
    atoms: Record<string, WritableAtom<any>>;
}
type ClientAtomListener = {
    matcher: (path: string) => boolean;
    signal: "$sessionSignal" | Omit<string, "$sessionSignal">;
};
interface BetterAuthClientOptions {
    fetchOptions?: BetterFetchOption;
    plugins?: BetterAuthClientPlugin[];
    baseURL?: string;
    basePath?: string;
    disableDefaultFetchPlugins?: boolean;
    $InferAuth?: BetterAuthOptions;
}
interface BetterAuthClientPlugin {
    id: LiteralString;
    /**
     * only used for type inference. don't pass the
     * actual plugin
     */
    $InferServerPlugin?: BetterAuthPlugin;
    /**
     * Custom actions
     */
    getActions?: ($fetch: BetterFetch, $store: ClientStore, 
    /**
     * better-auth client options
     */
    options: BetterAuthClientOptions | undefined) => Record<string, any>;
    /**
     * State atoms that'll be resolved by each framework
     * auth store.
     */
    getAtoms?: ($fetch: BetterFetch) => Record<string, Atom<any>>;
    /**
     * specify path methods for server plugin inferred
     * endpoints to force a specific method.
     */
    pathMethods?: Record<string, "POST" | "GET">;
    /**
     * Better fetch plugins
     */
    fetchPlugins?: BetterFetchPlugin[];
    /**
     * a list of recaller based on a matcher function.
     * The signal name needs to match a signal in this
     * plugin or any plugin the user might have added.
     */
    atomListeners?: ClientAtomListener[];
}

export { AuthContext, BetterAuthOptions, LiteralString };
export type { BetterAuthClientOptions, BetterAuthClientPlugin, BetterAuthPlugin, ClientAtomListener, ClientStore };
