import * as _better_fetch_fetch from '@better-fetch/fetch';
import { BetterFetchError } from '@better-fetch/fetch';
export * from '@better-fetch/fetch';
import { I as IsSignal, a as InferClientAPI, b as InferActions, c as InferErrorCodes } from '../../shared/better-auth.KhreCtS9.cjs';
import { BetterAuthClientOptions, BetterAuthClientPlugin } from '@better-auth/core';
import { Accessor } from 'solid-js';
import { U as UnionToIntersection, P as PrettifyDeep } from '../../shared/better-auth.DNnBkMGu.cjs';
import { BASE_ERROR_CODES } from '@better-auth/core/error';
export * from 'nanostores';
import '../../shared/better-auth.Cj7kf8Ev.cjs';
import 'packages/core/dist/oauth2';
import 'better-call';
import '@better-auth/core/env';
import '../../shared/better-auth.kD29xbrE.cjs';
import 'zod';
import '@better-auth/core/db';
import '../../shared/better-auth.CtDEK5dv.cjs';
import 'zod/v4/core';
import '@better-auth/core/oauth2';
import '@better-auth/core/middleware';

type InferResolvedHooks<O extends BetterAuthClientOptions> = O["plugins"] extends Array<infer Plugin> ? Plugin extends BetterAuthClientPlugin ? Plugin["getAtoms"] extends (fetch: any) => infer Atoms ? Atoms extends Record<string, any> ? {
    [key in keyof Atoms as IsSignal<key> extends true ? never : key extends string ? `use${Capitalize<key>}` : never]: () => Accessor<ReturnType<Atoms[key]["get"]>>;
} : {} : {} : {} : {};
declare function createAuthClient<Option extends BetterAuthClientOptions>(options?: Option): UnionToIntersection<InferResolvedHooks<Option>> & InferClientAPI<Option> & InferActions<Option> & {
    useSession: () => Accessor<{
        data: InferClientAPI<Option> extends {
            getSession: () => Promise<infer Res>;
        } ? Res extends {
            data: null;
            error: {
                message?: string | undefined;
                status: number;
                statusText: string;
            };
        } | {
            data: infer S;
            error: null;
        } ? S : Res extends Record<string, any> ? Res : never : never;
        isPending: boolean;
        isRefetching: boolean;
        error: BetterFetchError | null;
    }>;
    $Infer: {
        Session: NonNullable<InferClientAPI<Option> extends {
            getSession: () => Promise<infer Res>;
        } ? Res extends {
            data: null;
            error: {
                message?: string | undefined;
                status: number;
                statusText: string;
            };
        } | {
            data: infer S;
            error: null;
        } ? S : Res extends Record<string, any> ? Res : never : never>;
    };
    $fetch: _better_fetch_fetch.BetterFetch<{
        plugins: (_better_fetch_fetch.BetterFetchPlugin | {
            id: string;
            name: string;
            hooks: {
                onSuccess: ((context: _better_fetch_fetch.SuccessContext<any>) => Promise<void> | void) | undefined;
                onError: ((context: _better_fetch_fetch.ErrorContext) => Promise<void> | void) | undefined;
                onRequest: (<T extends Record<string, any>>(context: _better_fetch_fetch.RequestContext<T>) => Promise<_better_fetch_fetch.RequestContext | void> | _better_fetch_fetch.RequestContext | void) | undefined;
                onResponse: ((context: _better_fetch_fetch.ResponseContext) => Promise<Response | void | _better_fetch_fetch.ResponseContext> | Response | _better_fetch_fetch.ResponseContext | void) | undefined;
            };
        } | {
            id: string;
            name: string;
            hooks: {
                onSuccess(context: _better_fetch_fetch.SuccessContext<any>): void;
            };
        })[];
        method: string;
        headers?: (HeadersInit & (HeadersInit | {
            accept: "application/json" | "text/plain" | "application/octet-stream";
            "content-type": "application/json" | "text/plain" | "application/x-www-form-urlencoded" | "multipart/form-data" | "application/octet-stream";
            authorization: "Bearer" | "Basic";
        })) | undefined;
        redirect?: RequestRedirect | undefined;
        cache?: RequestCache | undefined;
        credentials?: RequestCredentials;
        integrity?: string | undefined;
        keepalive?: boolean | undefined;
        mode?: RequestMode | undefined;
        priority?: RequestPriority | undefined;
        referrer?: string | undefined;
        referrerPolicy?: ReferrerPolicy | undefined;
        signal?: (AbortSignal | null) | undefined;
        window?: null | undefined;
        onRetry?: ((response: _better_fetch_fetch.ResponseContext) => Promise<void> | void) | undefined;
        hookOptions?: {
            cloneResponse?: boolean;
        } | undefined;
        timeout?: number | undefined;
        customFetchImpl: _better_fetch_fetch.FetchEsque;
        baseURL: string;
        throw?: boolean | undefined;
        auth?: ({
            type: "Bearer";
            token: string | Promise<string | undefined> | (() => string | Promise<string | undefined> | undefined) | undefined;
        } | {
            type: "Basic";
            username: string | (() => string | undefined) | undefined;
            password: string | (() => string | undefined) | undefined;
        } | {
            type: "Custom";
            prefix: string | (() => string | undefined) | undefined;
            value: string | (() => string | undefined) | undefined;
        }) | undefined;
        body?: any;
        query?: any;
        params?: any;
        duplex?: "full" | "half" | undefined;
        jsonParser: (text: string) => Promise<any> | any;
        retry?: _better_fetch_fetch.RetryOptions | undefined;
        retryAttempt?: number | undefined;
        output?: (_better_fetch_fetch.StandardSchemaV1 | typeof Blob | typeof File) | undefined;
        errorSchema?: _better_fetch_fetch.StandardSchemaV1 | undefined;
        disableValidation?: boolean | undefined;
    }, unknown, unknown, {}>;
    $ERROR_CODES: PrettifyDeep<InferErrorCodes<Option> & typeof BASE_ERROR_CODES>;
};

export { createAuthClient };
