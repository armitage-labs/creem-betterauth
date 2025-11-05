import { BetterAuthClientOptions, ClientStore, ClientAtomListener, BetterAuthClientPlugin, BetterAuthPlugin } from '@better-auth/core';
import { U as UnionToIntersection, H as HasRequiredKeys, a as Prettify, S as StripEmptyObjects } from './better-auth.DNnBkMGu.cjs';
import { A as Auth } from './better-auth.Cj7kf8Ev.cjs';
import { BetterFetchOption, BetterFetchResponse } from '@better-fetch/fetch';
import { Endpoint, InputContext, StandardSchemaV1 } from 'better-call';
import { User, Session } from '@better-auth/core/db';
import { I as InferFieldsInputClient, a as InferFieldsOutput } from './better-auth.kD29xbrE.cjs';

type CamelCase<S extends string> = S extends `${infer P1}-${infer P2}${infer P3}` ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}` : Lowercase<S>;
type PathToObject<T extends string, Fn extends (...args: any[]) => any> = T extends `/${infer Segment}/${infer Rest}` ? {
    [K in CamelCase<Segment>]: PathToObject<`/${Rest}`, Fn>;
} : T extends `/${infer Segment}` ? {
    [K in CamelCase<Segment>]: Fn;
} : never;
type InferSignUpEmailCtx<ClientOpts extends BetterAuthClientOptions, FetchOptions extends BetterFetchOption> = {
    email: string;
    name: string;
    password: string;
    image?: string;
    callbackURL?: string;
    fetchOptions?: FetchOptions;
} & UnionToIntersection<InferAdditionalFromClient<ClientOpts, "user", "input">>;
type InferUserUpdateCtx<ClientOpts extends BetterAuthClientOptions, FetchOptions extends BetterFetchOption> = {
    image?: string | null;
    name?: string;
    fetchOptions?: FetchOptions;
} & Partial<UnionToIntersection<InferAdditionalFromClient<ClientOpts, "user", "input">>>;
type InferCtx<C extends InputContext<any, any>, FetchOptions extends BetterFetchOption> = C["body"] extends Record<string, any> ? C["body"] & {
    fetchOptions?: FetchOptions;
} : C["query"] extends Record<string, any> ? {
    query: C["query"];
    fetchOptions?: FetchOptions;
} : C["query"] extends Record<string, any> | undefined ? {
    query?: C["query"];
    fetchOptions?: FetchOptions;
} : {
    fetchOptions?: FetchOptions;
};
type MergeRoutes<T> = UnionToIntersection<T>;
type InferRoute<API, COpts extends BetterAuthClientOptions> = API extends Record<string, infer T> ? T extends Endpoint ? T["options"]["metadata"] extends {
    isAction: false;
} | {
    SERVER_ONLY: true;
} ? {} : PathToObject<T["path"], T extends (ctx: infer C) => infer R ? C extends InputContext<any, any> ? <FetchOptions extends BetterFetchOption<Partial<C["body"]> & Record<string, any>, Partial<C["query"]> & Record<string, any>, C["params"]>>(...data: HasRequiredKeys<InferCtx<C, FetchOptions>> extends true ? [
    Prettify<T["path"] extends `/sign-up/email` ? InferSignUpEmailCtx<COpts, FetchOptions> : InferCtx<C, FetchOptions>>,
    FetchOptions?
] : [
    Prettify<T["path"] extends `/update-user` ? InferUserUpdateCtx<COpts, FetchOptions> : InferCtx<C, FetchOptions>>?,
    FetchOptions?
]) => Promise<BetterFetchResponse<T["options"]["metadata"] extends {
    CUSTOM_SESSION: boolean;
} ? NonNullable<Awaited<R>> : T["path"] extends "/get-session" ? {
    user: InferUserFromClient<COpts>;
    session: InferSessionFromClient<COpts>;
} | null : NonNullable<Awaited<R>>, T["options"]["error"] extends StandardSchemaV1 ? NonNullable<T["options"]["error"]["~standard"]["types"]>["output"] : {
    code?: string;
    message?: string;
}, FetchOptions["throw"] extends true ? true : COpts["fetchOptions"] extends {
    throw: true;
} ? true : false>> : never : never> : {} : never;
type InferRoutes<API extends Record<string, Endpoint>, ClientOpts extends BetterAuthClientOptions> = MergeRoutes<InferRoute<API, ClientOpts>>;

/**
 * @deprecated use type `BetterAuthClientOptions` instead.
 */
type Store = ClientStore;
/**
 * @deprecated use type `ClientAtomListener` instead.
 */
type AtomListener = ClientAtomListener;
/**
 * @deprecated use type `BetterAuthClientPlugin` instead.
 */
type ClientOptions = BetterAuthClientOptions;
type InferClientAPI<O extends BetterAuthClientOptions> = InferRoutes<O["plugins"] extends Array<any> ? Auth["api"] & (O["plugins"] extends Array<infer Pl> ? UnionToIntersection<Pl extends {
    $InferServerPlugin: infer Plug;
} ? Plug extends {
    endpoints: infer Endpoints;
} ? Endpoints : {} : {}> : {}) : Auth["api"], O>;
type InferActions<O extends BetterAuthClientOptions> = (O["plugins"] extends Array<infer Plugin> ? UnionToIntersection<Plugin extends BetterAuthClientPlugin ? Plugin["getActions"] extends (...args: any) => infer Actions ? Actions : {} : {}> : {}) & InferRoutes<O["$InferAuth"] extends {
    plugins: infer Plugins;
} ? Plugins extends Array<infer Plugin> ? Plugin extends {
    endpoints: infer Endpoints;
} ? Endpoints : {} : {} : {}, O>;
type InferErrorCodes<O extends BetterAuthClientOptions> = O["plugins"] extends Array<infer Plugin> ? UnionToIntersection<Plugin extends BetterAuthClientPlugin ? Plugin["$InferServerPlugin"] extends BetterAuthPlugin ? Plugin["$InferServerPlugin"]["$ERROR_CODES"] : {} : {}> : {};
/**
 * signals are just used to recall a computed value.
 * as a convention they start with "$"
 */
type IsSignal<T> = T extends `$${infer _}` ? true : false;
type InferPluginsFromClient<O extends BetterAuthClientOptions> = O["plugins"] extends Array<BetterAuthClientPlugin> ? Array<O["plugins"][number]["$InferServerPlugin"]> : undefined;
type InferSessionFromClient<O extends BetterAuthClientOptions> = StripEmptyObjects<Session & UnionToIntersection<InferAdditionalFromClient<O, "session", "output">>>;
type InferUserFromClient<O extends BetterAuthClientOptions> = StripEmptyObjects<User & UnionToIntersection<InferAdditionalFromClient<O, "user", "output">>>;
type InferAdditionalFromClient<Options extends BetterAuthClientOptions, Key extends string, Format extends "input" | "output" = "output"> = Options["plugins"] extends Array<infer T> ? T extends BetterAuthClientPlugin ? T["$InferServerPlugin"] extends {
    schema: {
        [key in Key]: {
            fields: infer Field;
        };
    };
} ? Format extends "input" ? InferFieldsInputClient<Field> : InferFieldsOutput<Field> : {} : {} : {};
type SessionQueryParams = {
    disableCookieCache?: boolean;
    disableRefresh?: boolean;
};

export type { AtomListener as A, ClientOptions as C, IsSignal as I, Store as S, InferClientAPI as a, InferActions as b, InferErrorCodes as c, InferRoute as d, InferPluginsFromClient as e, InferSessionFromClient as f, InferUserFromClient as g, InferAdditionalFromClient as h, SessionQueryParams as i };
