import * as packages_core_dist_oauth2 from 'packages/core/dist/oauth2';
import * as better_call from 'better-call';
import { Endpoint, Middleware } from 'better-call';
import { BetterAuthOptions, BetterAuthPlugin, GenericEndpointContext, AuthContext } from '@better-auth/core';
import { InternalLogger } from '@better-auth/core/env';
import { f as InferFieldsFromPlugins, g as InferFieldsFromOptions } from './better-auth.kD29xbrE.mjs';
import { a as InferPluginErrorCodes } from './better-auth.5wJlMsTX.mjs';
import { U as UnionToIntersection, S as StripEmptyObjects, P as PrettifyDeep, a as Prettify, E as Expand } from './better-auth.DNnBkMGu.mjs';
import { BASE_ERROR_CODES } from '@better-auth/core/error';
import { Session, User } from '@better-auth/core/db';
import * as z from 'zod';
import * as zod_v4_core from 'zod/v4/core';
import * as _better_auth_core_oauth2 from '@better-auth/core/oauth2';
import { OAuth2Tokens } from '@better-auth/core/oauth2';
import '@better-auth/core/middleware';

type Models = "user" | "account" | "session" | "verification" | "rate-limit" | "organization" | "member" | "invitation" | "jwks" | "passkey" | "two-factor";
type AdditionalUserFieldsInput<Options extends BetterAuthOptions> = InferFieldsFromPlugins<Options, "user", "input"> & InferFieldsFromOptions<Options, "user", "input">;
type AdditionalUserFieldsOutput<Options extends BetterAuthOptions> = InferFieldsFromPlugins<Options, "user"> & InferFieldsFromOptions<Options, "user">;
type AdditionalSessionFieldsInput<Options extends BetterAuthOptions> = InferFieldsFromPlugins<Options, "session", "input"> & InferFieldsFromOptions<Options, "session", "input">;
type AdditionalSessionFieldsOutput<Options extends BetterAuthOptions> = InferFieldsFromPlugins<Options, "session"> & InferFieldsFromOptions<Options, "session">;
type InferUser<O extends BetterAuthOptions | Auth> = UnionToIntersection<StripEmptyObjects<User & (O extends BetterAuthOptions ? AdditionalUserFieldsOutput<O> : O extends Auth ? AdditionalUserFieldsOutput<O["options"]> : {})>>;
type InferSession<O extends BetterAuthOptions | Auth> = UnionToIntersection<StripEmptyObjects<Session & (O extends BetterAuthOptions ? AdditionalSessionFieldsOutput<O> : O extends Auth ? AdditionalSessionFieldsOutput<O["options"]> : {})>>;
type InferPluginTypes<O extends BetterAuthOptions> = O["plugins"] extends Array<infer P> ? UnionToIntersection<P extends BetterAuthPlugin ? P["$Infer"] extends Record<string, any> ? P["$Infer"] : {} : {}> : {};

type FilteredAPI<API> = Omit<API, API extends {
    [key in infer K]: Endpoint;
} ? K extends string ? K extends "getSession" ? K : API[K]["options"]["metadata"] extends {
    isAction: false;
} ? K : never : never : never>;
type FilterActions<API> = Omit<API, API extends {
    [key in infer K]: Endpoint;
} ? K extends string ? API[K]["options"]["metadata"] extends {
    isAction: false;
} ? K : never : never : never>;
type InferSessionAPI<API> = API extends {
    [key: string]: infer E;
} ? UnionToIntersection<E extends Endpoint ? E["path"] extends "/get-session" ? {
    getSession: <R extends boolean, H extends boolean = false>(context: {
        headers: Headers;
        query?: {
            disableCookieCache?: boolean;
            disableRefresh?: boolean;
        };
        asResponse?: R;
        returnHeaders?: H;
    }) => false extends R ? H extends true ? Promise<{
        headers: Headers;
        response: PrettifyDeep<Awaited<ReturnType<E>>> | null;
    }> : Promise<PrettifyDeep<Awaited<ReturnType<E>>> | null> : Promise<Response>;
} : never : never> : never;
type InferAPI<API> = InferSessionAPI<API> & API;

declare const signInSocial: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            provider: unknown;
            callbackURL?: string | undefined;
            newUserCallbackURL?: string | undefined;
            errorCallbackURL?: string | undefined;
            disableRedirect?: boolean | undefined;
            idToken?: {
                token: string;
                nonce?: string | undefined;
                accessToken?: string | undefined;
                refreshToken?: string | undefined;
                expiresAt?: number | undefined;
            } | undefined;
            scopes?: string[] | undefined;
            requestSignUp?: boolean | undefined;
            loginHint?: string | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            redirect: boolean;
            token: string;
            url: undefined;
            user: {
                id: string;
                email: string;
                name: string;
                image: string | null | undefined;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } | {
            url: string;
            redirect: boolean;
        };
    } : {
        redirect: boolean;
        token: string;
        url: undefined;
        user: {
            id: string;
            email: string;
            name: string;
            image: string | null | undefined;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } | {
        url: string;
        redirect: boolean;
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            callbackURL: z.ZodOptional<z.ZodString>;
            newUserCallbackURL: z.ZodOptional<z.ZodString>;
            errorCallbackURL: z.ZodOptional<z.ZodString>;
            provider: z.ZodType<(string & {}) | "github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal", unknown, z.core.$ZodTypeInternals<(string & {}) | "github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal", unknown>>;
            disableRedirect: z.ZodOptional<z.ZodBoolean>;
            idToken: z.ZodOptional<z.ZodObject<{
                token: z.ZodString;
                nonce: z.ZodOptional<z.ZodString>;
                accessToken: z.ZodOptional<z.ZodString>;
                refreshToken: z.ZodOptional<z.ZodString>;
                expiresAt: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>>;
            scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            requestSignUp: z.ZodOptional<z.ZodBoolean>;
            loginHint: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        metadata: {
            openapi: {
                description: string;
                operationId: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    description: string;
                                    properties: {
                                        redirect: {
                                            type: string;
                                            enum: boolean[];
                                        };
                                        token: {
                                            type: string;
                                            description: string;
                                            url: {
                                                type: string;
                                                nullable: boolean;
                                            };
                                            user: {
                                                type: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    email: {
                                                        type: string;
                                                    };
                                                    name: {
                                                        type: string;
                                                        nullable: boolean;
                                                    };
                                                    image: {
                                                        type: string;
                                                        nullable: boolean;
                                                    };
                                                    emailVerified: {
                                                        type: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                    updatedAt: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/sign-in/social";
};
declare const signInEmail: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            email: string;
            password: string;
            callbackURL?: string | undefined;
            rememberMe?: boolean | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            redirect: boolean;
            token: string;
            url: string | undefined;
            user: {
                id: string;
                email: string;
                name: string;
                image: string | null | undefined;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        };
    } : {
        redirect: boolean;
        token: string;
        url: string | undefined;
        user: {
            id: string;
            email: string;
            name: string;
            image: string | null | undefined;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            email: z.ZodString;
            password: z.ZodString;
            callbackURL: z.ZodOptional<z.ZodString>;
            rememberMe: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, z.core.$strip>;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    description: string;
                                    properties: {
                                        redirect: {
                                            type: string;
                                            enum: boolean[];
                                        };
                                        token: {
                                            type: string;
                                            description: string;
                                        };
                                        url: {
                                            type: string;
                                            nullable: boolean;
                                        };
                                        user: {
                                            type: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                name: {
                                                    type: string;
                                                    nullable: boolean;
                                                };
                                                image: {
                                                    type: string;
                                                    nullable: boolean;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/sign-in/email";
};

declare const callbackOAuth: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: {
            code?: string | undefined;
            error?: string | undefined;
            device_id?: string | undefined;
            error_description?: string | undefined;
            state?: string | undefined;
            user?: string | undefined;
        } | undefined;
    } & {
        method: "GET" | "POST";
    } & {
        query?: {
            code?: string | undefined;
            error?: string | undefined;
            device_id?: string | undefined;
            error_description?: string | undefined;
            state?: string | undefined;
            user?: string | undefined;
        } | undefined;
    } & {
        params: {
            id: string;
        };
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: void;
    } : void>;
    options: {
        method: ("GET" | "POST")[];
        body: z.ZodOptional<z.ZodObject<{
            code: z.ZodOptional<z.ZodString>;
            error: z.ZodOptional<z.ZodString>;
            device_id: z.ZodOptional<z.ZodString>;
            error_description: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            user: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        query: z.ZodOptional<z.ZodObject<{
            code: z.ZodOptional<z.ZodString>;
            error: z.ZodOptional<z.ZodString>;
            device_id: z.ZodOptional<z.ZodString>;
            error_description: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            user: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        metadata: {
            isAction: false;
        };
    } & {
        use: any[];
    };
    path: "/callback/:id";
};

declare const getSessionQuerySchema: z.ZodOptional<z.ZodObject<{
    disableCookieCache: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    disableRefresh: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>>;
declare const getSession: <Option extends BetterAuthOptions>() => {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: undefined;
    } & {
        method?: "GET" | undefined;
    } & {
        query?: {
            disableCookieCache?: unknown;
            disableRefresh?: unknown;
        } | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            session: UnionToIntersection<StripEmptyObjects<{
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined;
                userAgent?: string | null | undefined;
            } & (Option extends BetterAuthOptions ? AdditionalSessionFieldsOutput<Option> : Option extends Auth ? AdditionalSessionFieldsOutput<Option["options"]> : {})>>;
            user: UnionToIntersection<StripEmptyObjects<{
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                emailVerified: boolean;
                name: string;
                image?: string | null | undefined;
            } & (Option extends BetterAuthOptions ? AdditionalUserFieldsOutput<Option> : Option extends Auth ? AdditionalUserFieldsOutput<Option["options"]> : {})>>;
        } | null;
    } : {
        session: UnionToIntersection<StripEmptyObjects<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        } & (Option extends BetterAuthOptions ? AdditionalSessionFieldsOutput<Option> : Option extends Auth ? AdditionalSessionFieldsOutput<Option["options"]> : {})>>;
        user: UnionToIntersection<StripEmptyObjects<{
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        } & (Option extends BetterAuthOptions ? AdditionalUserFieldsOutput<Option> : Option extends Auth ? AdditionalUserFieldsOutput<Option["options"]> : {})>>;
    } | null>;
    options: {
        method: "GET";
        query: z.ZodOptional<z.ZodObject<{
            disableCookieCache: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
            disableRefresh: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
        }, z.core.$strip>>;
        requireHeaders: true;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        session: {
                                            $ref: string;
                                        };
                                        user: {
                                            $ref: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/get-session";
};
declare const getSessionFromCtx: <U extends Record<string, any> = Record<string, any>, S extends Record<string, any> = Record<string, any>>(ctx: GenericEndpointContext, config?: {
    disableCookieCache?: boolean;
    disableRefresh?: boolean;
}) => Promise<{
    session: S & Session;
    user: U & User;
} | null>;
/**
 * The middleware forces the endpoint to require a valid session.
 */
declare const sessionMiddleware: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
    session: {
        session: Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        };
        user: Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        };
    };
}>;
/**
 * This middleware forces the endpoint to require a valid session and ignores cookie cache.
 * This should be used for sensitive operations like password changes, account deletion, etc.
 * to ensure that revoked sessions cannot be used even if they're still cached in cookies.
 */
declare const sensitiveSessionMiddleware: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
    session: {
        session: Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        };
        user: Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        };
    };
}>;
/**
 * This middleware allows you to call the endpoint on the client if session is valid.
 * However, if called on the server, no session is required.
 */
declare const requestOnlySessionMiddleware: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
    session: {
        session: Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        };
        user: Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        };
    } | null;
}>;
/**
 * This middleware forces the endpoint to require a valid session,
 * as well as making sure the session is fresh before proceeding.
 *
 * Session freshness check will be skipped if the session config's freshAge
 * is set to 0
 */
declare const freshSessionMiddleware: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
    session: {
        session: Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        };
        user: Record<string, any> & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        };
    };
}>;
/**
 * user active sessions list
 */
declare const listSessions: <Option extends BetterAuthOptions>() => {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: undefined;
    } & {
        method?: "GET" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: Prettify<InferSession<Option>>[];
    } : Prettify<InferSession<Option>>[]>;
    options: {
        method: "GET";
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        requireHeaders: true;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array";
                                    items: {
                                        $ref: string;
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/list-sessions";
};
/**
 * revoke a single session
 */
declare const revokeSession: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            token: string;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
        };
    } : {
        status: boolean;
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            token: z.ZodString;
        }, z.core.$strip>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        requireHeaders: true;
        metadata: {
            openapi: {
                description: string;
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object";
                                properties: {
                                    token: {
                                        type: string;
                                        description: string;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/revoke-session";
};
/**
 * revoke all user sessions
 */
declare const revokeSessions: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: undefined;
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
        };
    } : {
        status: boolean;
    }>;
    options: {
        method: "POST";
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        requireHeaders: true;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/revoke-sessions";
};
declare const revokeOtherSessions: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: undefined;
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
        };
    } : {
        status: boolean;
    }>;
    options: {
        method: "POST";
        requireHeaders: true;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/revoke-other-sessions";
};

declare const signOut: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: undefined;
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            success: boolean;
        };
    } : {
        success: boolean;
    }>;
    options: {
        method: "POST";
        requireHeaders: true;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        success: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/sign-out";
};

declare const requestPasswordReset: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            email: string;
            redirectTo?: string | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
            message: string;
        };
    } : {
        status: boolean;
        message: string;
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            email: z.ZodEmail;
            redirectTo: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                        };
                                        message: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/request-password-reset";
};
/**
 * @deprecated Use requestPasswordReset instead. This endpoint will be removed in the next major
 * version.
 */
declare const forgetPassword: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            email: string;
            redirectTo?: string | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
        };
    } : {
        status: boolean;
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            email: z.ZodString;
            redirectTo: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                        };
                                        message: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/forget-password";
};
declare const requestPasswordResetCallback: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: undefined;
    } & {
        method?: "GET" | undefined;
    } & {
        query: {
            callbackURL: string;
        };
    } & {
        params: {
            token: string;
        };
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: never;
    } : never>;
    options: {
        method: "GET";
        query: z.ZodObject<{
            callbackURL: z.ZodString;
        }, z.core.$strip>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        token: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/reset-password/:token";
};
/**
 * @deprecated Use requestPasswordResetCallback instead
 */
declare const forgetPasswordCallback: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: undefined;
    } & {
        method?: "GET" | undefined;
    } & {
        query: {
            callbackURL: string;
        };
    } & {
        params: {
            token: string;
        };
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: never;
    } : never>;
    options: {
        method: "GET";
        query: z.ZodObject<{
            callbackURL: z.ZodString;
        }, z.core.$strip>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        token: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/reset-password/:token";
};
declare const resetPassword: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            newPassword: string;
            token?: string | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: {
            token?: string | undefined;
        } | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
        };
    } : {
        status: boolean;
    }>;
    options: {
        method: "POST";
        query: z.ZodOptional<z.ZodObject<{
            token: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        body: z.ZodObject<{
            newPassword: z.ZodString;
            token: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/reset-password";
};

declare function createEmailVerificationToken(secret: string, email: string, 
/**
 * The email to update from
 */
updateTo?: string, 
/**
 * The time in seconds for the token to expire
 */
expiresIn?: number): Promise<string>;
/**
 * A function to send a verification email to the user
 */
declare function sendVerificationEmailFn(ctx: GenericEndpointContext, user: User): Promise<void>;
declare const sendVerificationEmail: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            email: string;
            callbackURL?: string | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
        };
    } : {
        status: boolean;
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            email: z.ZodEmail;
            callbackURL: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        metadata: {
            openapi: {
                description: string;
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object";
                                properties: {
                                    email: {
                                        type: string;
                                        description: string;
                                        example: string;
                                    };
                                    callbackURL: {
                                        type: string;
                                        description: string;
                                        example: string;
                                        nullable: boolean;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                            description: string;
                                            example: boolean;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    "400": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        message: {
                                            type: string;
                                            description: string;
                                            example: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/send-verification-email";
};
declare const verifyEmail: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: undefined;
    } & {
        method?: "GET" | undefined;
    } & {
        query: {
            token: string;
            callbackURL?: string | undefined;
        };
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: void | {
            status: boolean;
            user: {
                id: string;
                email: string;
                name: string;
                image: string | null | undefined;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } | {
            status: boolean;
            user: null;
        };
    } : void | {
        status: boolean;
        user: {
            id: string;
            email: string;
            name: string;
            image: string | null | undefined;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } | {
        status: boolean;
        user: null;
    }>;
    options: {
        method: "GET";
        query: z.ZodObject<{
            token: z.ZodString;
            callbackURL: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
        metadata: {
            openapi: {
                description: string;
                parameters: ({
                    name: string;
                    in: "query";
                    description: string;
                    required: true;
                    schema: {
                        type: "string";
                    };
                } | {
                    name: string;
                    in: "query";
                    description: string;
                    required: false;
                    schema: {
                        type: "string";
                    };
                })[];
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        user: {
                                            type: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                email: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                image: {
                                                    type: string;
                                                    description: string;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                        status: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/verify-email";
};

declare const updateUser: <O extends BetterAuthOptions>() => {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/update-user", {
        method: "POST";
        body: z.ZodRecord<z.ZodString, z.ZodAny>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            $Infer: {
                body: Partial<AdditionalUserFieldsInput<O>> & {
                    name?: string;
                    image?: string;
                };
            };
            openapi: {
                description: string;
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object";
                                properties: {
                                    name: {
                                        type: string;
                                        description: string;
                                    };
                                    image: {
                                        type: string;
                                        description: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    }>> extends true ? [better_call.InferBodyInput<{
        method: "POST";
        body: z.ZodRecord<z.ZodString, z.ZodAny>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            $Infer: {
                body: Partial<AdditionalUserFieldsInput<O>> & {
                    name?: string;
                    image?: string;
                };
            };
            openapi: {
                description: string;
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object";
                                properties: {
                                    name: {
                                        type: string;
                                        description: string;
                                    };
                                    image: {
                                        type: string;
                                        description: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    }, Partial<AdditionalUserFieldsInput<O>> & {
        name?: string;
        image?: string;
    }> & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }] : [((better_call.InferBodyInput<{
        method: "POST";
        body: z.ZodRecord<z.ZodString, z.ZodAny>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            $Infer: {
                body: Partial<AdditionalUserFieldsInput<O>> & {
                    name?: string;
                    image?: string;
                };
            };
            openapi: {
                description: string;
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object";
                                properties: {
                                    name: {
                                        type: string;
                                        description: string;
                                    };
                                    image: {
                                        type: string;
                                        description: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    }, Partial<AdditionalUserFieldsInput<O>> & {
        name?: string;
        image?: string;
    }> & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
        };
    } : {
        status: boolean;
    }>;
    options: {
        method: "POST";
        body: z.ZodRecord<z.ZodString, z.ZodAny>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            $Infer: {
                body: Partial<AdditionalUserFieldsInput<O>> & {
                    name?: string;
                    image?: string;
                };
            };
            openapi: {
                description: string;
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object";
                                properties: {
                                    name: {
                                        type: string;
                                        description: string;
                                    };
                                    image: {
                                        type: string;
                                        description: string;
                                    };
                                };
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/update-user";
};
declare const changePassword: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            newPassword: string;
            currentPassword: string;
            revokeOtherSessions?: boolean | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            token: string | null;
            user: {
                id: string;
                email: string;
                name: string;
                image: string | null | undefined;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        };
    } : {
        token: string | null;
        user: {
            id: string;
            email: string;
            name: string;
            image: string | null | undefined;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            newPassword: z.ZodString;
            currentPassword: z.ZodString;
            revokeOtherSessions: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        token: {
                                            type: string;
                                            nullable: boolean;
                                            description: string;
                                        };
                                        user: {
                                            type: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                email: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                image: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/change-password";
};
declare const setPassword: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            newPassword: string;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
        };
    } : {
        status: boolean;
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            newPassword: z.ZodString;
        }, z.core.$strip>;
        metadata: {
            SERVER_ONLY: true;
        };
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
    } & {
        use: any[];
    };
    path: "/set-password";
};
declare const deleteUser: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            callbackURL?: string | undefined;
            password?: string | undefined;
            token?: string | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            success: boolean;
            message: string;
        };
    } : {
        success: boolean;
        message: string;
    }>;
    options: {
        method: "POST";
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        body: z.ZodObject<{
            callbackURL: z.ZodOptional<z.ZodString>;
            password: z.ZodOptional<z.ZodString>;
            token: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        success: {
                                            type: string;
                                            description: string;
                                        };
                                        message: {
                                            type: string;
                                            enum: string[];
                                            description: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/delete-user";
};
declare const deleteUserCallback: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: undefined;
    } & {
        method?: "GET" | undefined;
    } & {
        query: {
            token: string;
            callbackURL?: string | undefined;
        };
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            success: boolean;
            message: string;
        };
    } : {
        success: boolean;
        message: string;
    }>;
    options: {
        method: "GET";
        query: z.ZodObject<{
            token: z.ZodString;
            callbackURL: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        success: {
                                            type: string;
                                            description: string;
                                        };
                                        message: {
                                            type: string;
                                            enum: string[];
                                            description: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/delete-user/callback";
};
declare const changeEmail: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            newEmail: string;
            callbackURL?: string | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
        };
    } : {
        status: boolean;
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            newEmail: z.ZodEmail;
            callbackURL: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            openapi: {
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                            description: string;
                                        };
                                        message: {
                                            type: string;
                                            enum: string[];
                                            description: string;
                                            nullable: boolean;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                    "422": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        message: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/change-email";
};

declare const error: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
        body?: undefined;
    } & {
        method?: "GET" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: Response;
    } : Response>;
    options: {
        method: "GET";
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "text/html": {
                                schema: {
                                    type: "string";
                                    description: string;
                                };
                            };
                        };
                    };
                };
            };
            isAction: false;
        };
    } & {
        use: any[];
    };
    path: "/error";
};

declare const ok: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
        body?: undefined;
    } & {
        method?: "GET" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            ok: boolean;
        };
    } : {
        ok: boolean;
    }>;
    options: {
        method: "GET";
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        ok: {
                                            type: string;
                                            description: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
            isAction: false;
        };
    } & {
        use: any[];
    };
    path: "/ok";
};

declare const signUpEmail: <O extends BetterAuthOptions>() => {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/sign-up/email", {
        method: "POST";
        body: z.ZodRecord<z.ZodString, z.ZodAny>;
        metadata: {
            $Infer: {
                body: {
                    name: string;
                    email: string;
                    password: string;
                    image?: string;
                    callbackURL?: string;
                    rememberMe?: boolean;
                } & AdditionalUserFieldsInput<O>;
            };
            openapi: {
                description: string;
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object";
                                properties: {
                                    name: {
                                        type: string;
                                        description: string;
                                    };
                                    email: {
                                        type: string;
                                        description: string;
                                    };
                                    password: {
                                        type: string;
                                        description: string;
                                    };
                                    image: {
                                        type: string;
                                        description: string;
                                    };
                                    callbackURL: {
                                        type: string;
                                        description: string;
                                    };
                                    rememberMe: {
                                        type: string;
                                        description: string;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        token: {
                                            type: string;
                                            nullable: boolean;
                                            description: string;
                                        };
                                        user: {
                                            type: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                email: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                image: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                    "422": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        message: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    }>> extends true ? [better_call.InferBodyInput<{
        method: "POST";
        body: z.ZodRecord<z.ZodString, z.ZodAny>;
        metadata: {
            $Infer: {
                body: {
                    name: string;
                    email: string;
                    password: string;
                    image?: string;
                    callbackURL?: string;
                    rememberMe?: boolean;
                } & AdditionalUserFieldsInput<O>;
            };
            openapi: {
                description: string;
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object";
                                properties: {
                                    name: {
                                        type: string;
                                        description: string;
                                    };
                                    email: {
                                        type: string;
                                        description: string;
                                    };
                                    password: {
                                        type: string;
                                        description: string;
                                    };
                                    image: {
                                        type: string;
                                        description: string;
                                    };
                                    callbackURL: {
                                        type: string;
                                        description: string;
                                    };
                                    rememberMe: {
                                        type: string;
                                        description: string;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        token: {
                                            type: string;
                                            nullable: boolean;
                                            description: string;
                                        };
                                        user: {
                                            type: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                email: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                image: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                    "422": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        message: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    }, {
        name: string;
        email: string;
        password: string;
        image?: string;
        callbackURL?: string;
        rememberMe?: boolean;
    } & InferFieldsFromPlugins<O, "user", "input"> & InferFieldsFromOptions<O, "user", "input">> & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }] : [((better_call.InferBodyInput<{
        method: "POST";
        body: z.ZodRecord<z.ZodString, z.ZodAny>;
        metadata: {
            $Infer: {
                body: {
                    name: string;
                    email: string;
                    password: string;
                    image?: string;
                    callbackURL?: string;
                    rememberMe?: boolean;
                } & AdditionalUserFieldsInput<O>;
            };
            openapi: {
                description: string;
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object";
                                properties: {
                                    name: {
                                        type: string;
                                        description: string;
                                    };
                                    email: {
                                        type: string;
                                        description: string;
                                    };
                                    password: {
                                        type: string;
                                        description: string;
                                    };
                                    image: {
                                        type: string;
                                        description: string;
                                    };
                                    callbackURL: {
                                        type: string;
                                        description: string;
                                    };
                                    rememberMe: {
                                        type: string;
                                        description: string;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        token: {
                                            type: string;
                                            nullable: boolean;
                                            description: string;
                                        };
                                        user: {
                                            type: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                email: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                image: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                    "422": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        message: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    }, {
        name: string;
        email: string;
        password: string;
        image?: string;
        callbackURL?: string;
        rememberMe?: boolean;
    } & InferFieldsFromPlugins<O, "user", "input"> & InferFieldsFromOptions<O, "user", "input">> & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            token: null;
            user: {
                id: string;
                email: string;
                name: string;
                image: string | null | undefined;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } | {
            token: string;
            user: {
                id: string;
                email: string;
                name: string;
                image: string | null | undefined;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        };
    } : {
        token: null;
        user: {
            id: string;
            email: string;
            name: string;
            image: string | null | undefined;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } | {
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            image: string | null | undefined;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    options: {
        method: "POST";
        body: z.ZodRecord<z.ZodString, z.ZodAny>;
        metadata: {
            $Infer: {
                body: {
                    name: string;
                    email: string;
                    password: string;
                    image?: string;
                    callbackURL?: string;
                    rememberMe?: boolean;
                } & AdditionalUserFieldsInput<O>;
            };
            openapi: {
                description: string;
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object";
                                properties: {
                                    name: {
                                        type: string;
                                        description: string;
                                    };
                                    email: {
                                        type: string;
                                        description: string;
                                    };
                                    password: {
                                        type: string;
                                        description: string;
                                    };
                                    image: {
                                        type: string;
                                        description: string;
                                    };
                                    callbackURL: {
                                        type: string;
                                        description: string;
                                    };
                                    rememberMe: {
                                        type: string;
                                        description: string;
                                    };
                                };
                                required: string[];
                            };
                        };
                    };
                };
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        token: {
                                            type: string;
                                            nullable: boolean;
                                            description: string;
                                        };
                                        user: {
                                            type: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                email: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                image: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                    "422": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        message: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/sign-up/email";
};

declare const listUserAccounts: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
        body?: undefined;
    } & {
        method?: "GET" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            id: string;
            providerId: string;
            createdAt: Date;
            updatedAt: Date;
            accountId: string;
            scopes: string[];
        }[];
    } : {
        id: string;
        providerId: string;
        createdAt: Date;
        updatedAt: Date;
        accountId: string;
        scopes: string[];
    }[]>;
    options: {
        method: "GET";
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array";
                                    items: {
                                        type: string;
                                        properties: {
                                            id: {
                                                type: string;
                                            };
                                            providerId: {
                                                type: string;
                                            };
                                            createdAt: {
                                                type: string;
                                                format: string;
                                            };
                                            updatedAt: {
                                                type: string;
                                                format: string;
                                            };
                                            accountId: {
                                                type: string;
                                            };
                                            scopes: {
                                                type: string;
                                                items: {
                                                    type: string;
                                                };
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/list-accounts";
};
declare const linkSocialAccount: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            provider: unknown;
            callbackURL?: string | undefined;
            idToken?: {
                token: string;
                nonce?: string | undefined;
                accessToken?: string | undefined;
                refreshToken?: string | undefined;
                scopes?: string[] | undefined;
            } | undefined;
            requestSignUp?: boolean | undefined;
            scopes?: string[] | undefined;
            errorCallbackURL?: string | undefined;
            disableRedirect?: boolean | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            url: string;
            redirect: boolean;
        };
    } : {
        url: string;
        redirect: boolean;
    }>;
    options: {
        method: "POST";
        requireHeaders: true;
        body: z.ZodObject<{
            callbackURL: z.ZodOptional<z.ZodString>;
            provider: z.ZodType<(string & {}) | "github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal", unknown, z.core.$ZodTypeInternals<(string & {}) | "github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal", unknown>>;
            idToken: z.ZodOptional<z.ZodObject<{
                token: z.ZodString;
                nonce: z.ZodOptional<z.ZodString>;
                accessToken: z.ZodOptional<z.ZodString>;
                refreshToken: z.ZodOptional<z.ZodString>;
                scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            }, z.core.$strip>>;
            requestSignUp: z.ZodOptional<z.ZodBoolean>;
            scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
            errorCallbackURL: z.ZodOptional<z.ZodString>;
            disableRedirect: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        url: {
                                            type: string;
                                            description: string;
                                        };
                                        redirect: {
                                            type: string;
                                            description: string;
                                        };
                                        status: {
                                            type: string;
                                        };
                                    };
                                    required: string[];
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/link-social";
};
declare const unlinkAccount: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            providerId: string;
            accountId?: string | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            status: boolean;
        };
    } : {
        status: boolean;
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            providerId: z.ZodString;
            accountId: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        status: {
                                            type: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/unlink-account";
};
declare const getAccessToken: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            providerId: string;
            accountId?: string | undefined;
            userId?: string | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            accessToken: string;
            accessTokenExpiresAt: Date | undefined;
            scopes: string[];
            idToken: string | undefined;
        };
    } : {
        accessToken: string;
        accessTokenExpiresAt: Date | undefined;
        scopes: string[];
        idToken: string | undefined;
    }>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            providerId: z.ZodString;
            accountId: z.ZodOptional<z.ZodString>;
            userId: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    200: {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        tokenType: {
                                            type: string;
                                        };
                                        idToken: {
                                            type: string;
                                        };
                                        accessToken: {
                                            type: string;
                                        };
                                        refreshToken: {
                                            type: string;
                                        };
                                        accessTokenExpiresAt: {
                                            type: string;
                                            format: string;
                                        };
                                        refreshTokenExpiresAt: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/get-access-token";
};
declare const refreshToken: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            providerId: string;
            accountId?: string | undefined;
            userId?: string | undefined;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: OAuth2Tokens;
    } : OAuth2Tokens>;
    options: {
        method: "POST";
        body: z.ZodObject<{
            providerId: z.ZodString;
            accountId: z.ZodOptional<z.ZodString>;
            userId: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        metadata: {
            openapi: {
                description: string;
                responses: {
                    200: {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        tokenType: {
                                            type: string;
                                        };
                                        idToken: {
                                            type: string;
                                        };
                                        accessToken: {
                                            type: string;
                                        };
                                        refreshToken: {
                                            type: string;
                                        };
                                        accessTokenExpiresAt: {
                                            type: string;
                                            format: string;
                                        };
                                        refreshTokenExpiresAt: {
                                            type: string;
                                            format: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    400: {
                        description: string;
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/refresh-token";
};
declare const accountInfo: {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body: {
            accountId: string;
        };
    } & {
        method?: "POST" | undefined;
    } & {
        query?: Record<string, any> | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers?: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: {
            user: _better_auth_core_oauth2.OAuth2UserInfo;
            data: Record<string, any>;
        } | null;
    } : {
        user: _better_auth_core_oauth2.OAuth2UserInfo;
        data: Record<string, any>;
    } | null>;
    options: {
        method: "POST";
        use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            session: {
                session: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: Record<string, any> & {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            };
        }>)[];
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    properties: {
                                        user: {
                                            type: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                name: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                image: {
                                                    type: string;
                                                };
                                                emailVerified: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                        data: {
                                            type: string;
                                            properties: {};
                                            additionalProperties: boolean;
                                        };
                                    };
                                    required: string[];
                                    additionalProperties: boolean;
                                };
                            };
                        };
                    };
                };
            };
        };
        body: z.ZodObject<{
            accountId: z.ZodString;
        }, z.core.$strip>;
    } & {
        use: any[];
    };
    path: "/account-info";
};

/**
 * A middleware to validate callbackURL and origin against
 * trustedOrigins.
 */
declare const originCheckMiddleware: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
declare const originCheck: (getValue: (ctx: GenericEndpointContext) => string | string[]) => (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
declare function isSimpleRequest(headers: Headers): boolean;

declare function checkEndpointConflicts(options: BetterAuthOptions, logger: InternalLogger): void;
declare function getEndpoints<Option extends BetterAuthOptions>(ctx: Promise<AuthContext> | AuthContext, options: Option): {
    api: {
        readonly ok: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    ok: boolean;
                };
            } : {
                ok: boolean;
            }>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                ok: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/ok";
        };
        readonly error: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: Response;
            } : Response>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "text/html": {
                                        schema: {
                                            type: "string";
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/error";
        };
        readonly signInSocial: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    provider: unknown;
                    callbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    errorCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                    idToken?: {
                        token: string;
                        nonce?: string | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        expiresAt?: number | undefined;
                    } | undefined;
                    scopes?: string[] | undefined;
                    requestSignUp?: boolean | undefined;
                    loginHint?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    redirect: boolean;
                    token: string;
                    url: undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    url: string;
                    redirect: boolean;
                };
            } : {
                redirect: boolean;
                token: string;
                url: undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    callbackURL: z.ZodOptional<z.ZodString>;
                    newUserCallbackURL: z.ZodOptional<z.ZodString>;
                    errorCallbackURL: z.ZodOptional<z.ZodString>;
                    provider: z.ZodType<"github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown, zod_v4_core.$ZodTypeInternals<"github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown>>;
                    disableRedirect: z.ZodOptional<z.ZodBoolean>;
                    idToken: z.ZodOptional<z.ZodObject<{
                        token: z.ZodString;
                        nonce: z.ZodOptional<z.ZodString>;
                        accessToken: z.ZodOptional<z.ZodString>;
                        refreshToken: z.ZodOptional<z.ZodString>;
                        expiresAt: z.ZodOptional<z.ZodNumber>;
                    }, zod_v4_core.$strip>>;
                    scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    requestSignUp: z.ZodOptional<z.ZodBoolean>;
                    loginHint: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        operationId: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            properties: {
                                                redirect: {
                                                    type: string;
                                                    enum: boolean[];
                                                };
                                                token: {
                                                    type: string;
                                                    description: string;
                                                    url: {
                                                        type: string;
                                                        nullable: boolean;
                                                    };
                                                    user: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                            };
                                                            email: {
                                                                type: string;
                                                            };
                                                            name: {
                                                                type: string;
                                                                nullable: boolean;
                                                            };
                                                            image: {
                                                                type: string;
                                                                nullable: boolean;
                                                            };
                                                            emailVerified: {
                                                                type: string;
                                                            };
                                                            createdAt: {
                                                                type: string;
                                                                format: string;
                                                            };
                                                            updatedAt: {
                                                                type: string;
                                                                format: string;
                                                            };
                                                        };
                                                        required: string[];
                                                    };
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/social";
        };
        readonly callbackOAuth: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: {
                    code?: string | undefined;
                    error?: string | undefined;
                    device_id?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                    user?: string | undefined;
                } | undefined;
            } & {
                method: "GET" | "POST";
            } & {
                query?: {
                    code?: string | undefined;
                    error?: string | undefined;
                    device_id?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                    user?: string | undefined;
                } | undefined;
            } & {
                params: {
                    id: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: void;
            } : void>;
            options: {
                method: ("GET" | "POST")[];
                body: z.ZodOptional<z.ZodObject<{
                    code: z.ZodOptional<z.ZodString>;
                    error: z.ZodOptional<z.ZodString>;
                    device_id: z.ZodOptional<z.ZodString>;
                    error_description: z.ZodOptional<z.ZodString>;
                    state: z.ZodOptional<z.ZodString>;
                    user: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>>;
                query: z.ZodOptional<z.ZodObject<{
                    code: z.ZodOptional<z.ZodString>;
                    error: z.ZodOptional<z.ZodString>;
                    device_id: z.ZodOptional<z.ZodString>;
                    error_description: z.ZodOptional<z.ZodString>;
                    state: z.ZodOptional<z.ZodString>;
                    user: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>>;
                metadata: {
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/callback/:id";
        };
        readonly getSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    disableCookieCache?: unknown;
                    disableRefresh?: unknown;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    session: UnionToIntersection<StripEmptyObjects<{
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    } & (Option extends BetterAuthOptions ? AdditionalSessionFieldsOutput<Option> : Option extends Auth ? AdditionalSessionFieldsOutput<Option["options"]> : {})>>;
                    user: UnionToIntersection<StripEmptyObjects<{
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    } & (Option extends BetterAuthOptions ? AdditionalUserFieldsOutput<Option> : Option extends Auth ? AdditionalUserFieldsOutput<Option["options"]> : {})>>;
                } | null;
            } : {
                session: UnionToIntersection<StripEmptyObjects<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                } & (Option extends BetterAuthOptions ? AdditionalSessionFieldsOutput<Option> : Option extends Auth ? AdditionalSessionFieldsOutput<Option["options"]> : {})>>;
                user: UnionToIntersection<StripEmptyObjects<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                } & (Option extends BetterAuthOptions ? AdditionalUserFieldsOutput<Option> : Option extends Auth ? AdditionalUserFieldsOutput<Option["options"]> : {})>>;
            } | null>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    disableCookieCache: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
                    disableRefresh: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
                }, zod_v4_core.$strip>>;
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    $ref: string;
                                                };
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/get-session";
        };
        readonly signOut: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-out";
        };
        readonly signUpEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/sign-up/email", {
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
                        } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                            rememberMe: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
                        } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                            rememberMe: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                name: string;
                email: string;
                password: string;
                image?: string;
                callbackURL?: string;
                rememberMe?: boolean;
            } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
                        } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                            rememberMe: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                name: string;
                email: string;
                password: string;
                image?: string;
                callbackURL?: string;
                rememberMe?: boolean;
            } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    token: null;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                token: string;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
                        } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                            rememberMe: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-up/email";
        };
        readonly signInEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    password: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    redirect: boolean;
                    token: string;
                    url: string | undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                redirect: boolean;
                token: string;
                url: string | undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodString;
                    password: z.ZodString;
                    callbackURL: z.ZodOptional<z.ZodString>;
                    rememberMe: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            properties: {
                                                redirect: {
                                                    type: string;
                                                    enum: boolean[];
                                                };
                                                token: {
                                                    type: string;
                                                    description: string;
                                                };
                                                url: {
                                                    type: string;
                                                    nullable: boolean;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            nullable: boolean;
                                                        };
                                                        image: {
                                                            type: string;
                                                            nullable: boolean;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/email";
        };
        readonly forgetPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    redirectTo?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodString;
                    redirectTo: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/forget-password";
        };
        readonly resetPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                    token?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: {
                    token?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                query: z.ZodOptional<z.ZodObject<{
                    token: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>>;
                body: z.ZodObject<{
                    newPassword: z.ZodString;
                    token: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password";
        };
        readonly verifyEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: void | {
                    status: boolean;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    status: boolean;
                    user: null;
                };
            } : void | {
                status: boolean;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                status: boolean;
                user: null;
            }>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    token: z.ZodString;
                    callbackURL: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        parameters: ({
                            name: string;
                            in: "query";
                            description: string;
                            required: true;
                            schema: {
                                type: "string";
                            };
                        } | {
                            name: string;
                            in: "query";
                            description: string;
                            required: false;
                            schema: {
                                type: "string";
                            };
                        })[];
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/verify-email";
        };
        readonly sendVerificationEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    callbackURL?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodEmail;
                    callbackURL: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            email: {
                                                type: string;
                                                description: string;
                                                example: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                                example: string;
                                                nullable: boolean;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                    example: boolean;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            "400": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                    description: string;
                                                    example: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/send-verification-email";
        };
        readonly changeEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newEmail: string;
                    callbackURL?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    newEmail: z.ZodEmail;
                    callbackURL: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                    nullable: boolean;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/change-email";
        };
        readonly changePassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    token: string | null;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: string | null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    newPassword: z.ZodString;
                    currentPassword: z.ZodString;
                    revokeOtherSessions: z.ZodOptional<z.ZodBoolean>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/change-password";
        };
        readonly setPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    newPassword: z.ZodString;
                }, zod_v4_core.$strip>;
                metadata: {
                    SERVER_ONLY: true;
                };
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
            } & {
                use: any[];
            };
            path: "/set-password";
        };
        readonly updateUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/update-user", {
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<AdditionalUserFieldsInput<Option>> & {
                            name?: string;
                            image?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<AdditionalUserFieldsInput<Option>> & {
                            name?: string;
                            image?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, Partial<AdditionalUserFieldsInput<Option>> & {
                name?: string;
                image?: string;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<AdditionalUserFieldsInput<Option>> & {
                            name?: string;
                            image?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, Partial<AdditionalUserFieldsInput<Option>> & {
                name?: string;
                image?: string;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<AdditionalUserFieldsInput<Option>> & {
                            name?: string;
                            image?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/update-user";
        };
        readonly deleteUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    callbackURL?: string | undefined;
                    password?: string | undefined;
                    token?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    message: string;
                };
            } : {
                success: boolean;
                message: string;
            }>;
            options: {
                method: "POST";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                body: z.ZodObject<{
                    callbackURL: z.ZodOptional<z.ZodString>;
                    password: z.ZodOptional<z.ZodString>;
                    token: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/delete-user";
        };
        readonly forgetPasswordCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    callbackURL: string;
                };
            } & {
                params: {
                    token: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: never;
            } : never>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    callbackURL: z.ZodString;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password/:token";
        };
        readonly requestPasswordReset: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    redirectTo?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                    message: string;
                };
            } : {
                status: boolean;
                message: string;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodEmail;
                    redirectTo: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/request-password-reset";
        };
        readonly requestPasswordResetCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    callbackURL: string;
                };
            } & {
                params: {
                    token: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: never;
            } : never>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    callbackURL: z.ZodString;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password/:token";
        };
        readonly listSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: Prettify<UnionToIntersection<StripEmptyObjects<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                } & (Option extends BetterAuthOptions ? AdditionalSessionFieldsOutput<Option> : Option extends Auth ? AdditionalSessionFieldsOutput<Option["options"]> : {})>>>[];
            } : Prettify<UnionToIntersection<StripEmptyObjects<{
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined;
                userAgent?: string | null | undefined;
            } & (Option extends BetterAuthOptions ? AdditionalSessionFieldsOutput<Option> : Option extends Auth ? AdditionalSessionFieldsOutput<Option["options"]> : {})>>>[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/list-sessions";
        };
        readonly revokeSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    token: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    token: z.ZodString;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            token: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-session";
        };
        readonly revokeSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-sessions";
        };
        readonly revokeOtherSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-other-sessions";
        };
        readonly linkSocialAccount: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    provider: unknown;
                    callbackURL?: string | undefined;
                    idToken?: {
                        token: string;
                        nonce?: string | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        scopes?: string[] | undefined;
                    } | undefined;
                    requestSignUp?: boolean | undefined;
                    scopes?: string[] | undefined;
                    errorCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    url: string;
                    redirect: boolean;
                };
            } : {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                body: z.ZodObject<{
                    callbackURL: z.ZodOptional<z.ZodString>;
                    provider: z.ZodType<"github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown, zod_v4_core.$ZodTypeInternals<"github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown>>;
                    idToken: z.ZodOptional<z.ZodObject<{
                        token: z.ZodString;
                        nonce: z.ZodOptional<z.ZodString>;
                        accessToken: z.ZodOptional<z.ZodString>;
                        refreshToken: z.ZodOptional<z.ZodString>;
                        scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    }, zod_v4_core.$strip>>;
                    requestSignUp: z.ZodOptional<z.ZodBoolean>;
                    scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    errorCallbackURL: z.ZodOptional<z.ZodString>;
                    disableRedirect: z.ZodOptional<z.ZodBoolean>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                url: {
                                                    type: string;
                                                    description: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                    description: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/link-social";
        };
        readonly listUserAccounts: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    providerId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    accountId: string;
                    scopes: string[];
                }[];
            } : {
                id: string;
                providerId: string;
                createdAt: Date;
                updatedAt: Date;
                accountId: string;
                scopes: string[];
            }[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    providerId: {
                                                        type: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                    updatedAt: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                    accountId: {
                                                        type: string;
                                                    };
                                                    scopes: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/list-accounts";
        };
        readonly deleteUserCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    message: string;
                };
            } : {
                success: boolean;
                message: string;
            }>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    token: z.ZodString;
                    callbackURL: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/delete-user/callback";
        };
        readonly unlinkAccount: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    providerId: z.ZodString;
                    accountId: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/unlink-account";
        };
        readonly refreshToken: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                    userId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: packages_core_dist_oauth2.OAuth2Tokens;
            } : packages_core_dist_oauth2.OAuth2Tokens>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    providerId: z.ZodString;
                    accountId: z.ZodOptional<z.ZodString>;
                    userId: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                tokenType: {
                                                    type: string;
                                                };
                                                idToken: {
                                                    type: string;
                                                };
                                                accessToken: {
                                                    type: string;
                                                };
                                                refreshToken: {
                                                    type: string;
                                                };
                                                accessTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                                refreshTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            400: {
                                description: string;
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/refresh-token";
        };
        readonly getAccessToken: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                    userId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    accessToken: string;
                    accessTokenExpiresAt: Date | undefined;
                    scopes: string[];
                    idToken: string | undefined;
                };
            } : {
                accessToken: string;
                accessTokenExpiresAt: Date | undefined;
                scopes: string[];
                idToken: string | undefined;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    providerId: z.ZodString;
                    accountId: z.ZodOptional<z.ZodString>;
                    userId: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                tokenType: {
                                                    type: string;
                                                };
                                                idToken: {
                                                    type: string;
                                                };
                                                accessToken: {
                                                    type: string;
                                                };
                                                refreshToken: {
                                                    type: string;
                                                };
                                                accessTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                                refreshTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            400: {
                                description: string;
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/get-access-token";
        };
        readonly accountInfo: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    accountId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: packages_core_dist_oauth2.OAuth2UserInfo;
                    data: Record<string, any>;
                } | null;
            } : {
                user: packages_core_dist_oauth2.OAuth2UserInfo;
                data: Record<string, any>;
            } | null>;
            options: {
                method: "POST";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                                data: {
                                                    type: string;
                                                    properties: {};
                                                    additionalProperties: boolean;
                                                };
                                            };
                                            required: string[];
                                            additionalProperties: boolean;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                body: z.ZodObject<{
                    accountId: z.ZodString;
                }, zod_v4_core.$strip>;
            } & {
                use: any[];
            };
            path: "/account-info";
        };
    } & UnionToIntersection<Option["plugins"] extends (infer T)[] ? T extends BetterAuthPlugin ? T extends {
        endpoints: infer E;
    } ? E : {} : {} : {}>;
    middlewares: {
        path: string;
        middleware: any;
    }[];
};
declare const router: <Option extends BetterAuthOptions>(ctx: AuthContext, options: Option) => {
    handler: (request: Request) => Promise<Response>;
    endpoints: {
        readonly ok: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    ok: boolean;
                };
            } : {
                ok: boolean;
            }>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                ok: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/ok";
        };
        readonly error: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: Response;
            } : Response>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "text/html": {
                                        schema: {
                                            type: "string";
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/error";
        };
        readonly signInSocial: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    provider: unknown;
                    callbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    errorCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                    idToken?: {
                        token: string;
                        nonce?: string | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        expiresAt?: number | undefined;
                    } | undefined;
                    scopes?: string[] | undefined;
                    requestSignUp?: boolean | undefined;
                    loginHint?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    redirect: boolean;
                    token: string;
                    url: undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    url: string;
                    redirect: boolean;
                };
            } : {
                redirect: boolean;
                token: string;
                url: undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    callbackURL: z.ZodOptional<z.ZodString>;
                    newUserCallbackURL: z.ZodOptional<z.ZodString>;
                    errorCallbackURL: z.ZodOptional<z.ZodString>;
                    provider: z.ZodType<"github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown, zod_v4_core.$ZodTypeInternals<"github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown>>;
                    disableRedirect: z.ZodOptional<z.ZodBoolean>;
                    idToken: z.ZodOptional<z.ZodObject<{
                        token: z.ZodString;
                        nonce: z.ZodOptional<z.ZodString>;
                        accessToken: z.ZodOptional<z.ZodString>;
                        refreshToken: z.ZodOptional<z.ZodString>;
                        expiresAt: z.ZodOptional<z.ZodNumber>;
                    }, zod_v4_core.$strip>>;
                    scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    requestSignUp: z.ZodOptional<z.ZodBoolean>;
                    loginHint: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        operationId: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            properties: {
                                                redirect: {
                                                    type: string;
                                                    enum: boolean[];
                                                };
                                                token: {
                                                    type: string;
                                                    description: string;
                                                    url: {
                                                        type: string;
                                                        nullable: boolean;
                                                    };
                                                    user: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                            };
                                                            email: {
                                                                type: string;
                                                            };
                                                            name: {
                                                                type: string;
                                                                nullable: boolean;
                                                            };
                                                            image: {
                                                                type: string;
                                                                nullable: boolean;
                                                            };
                                                            emailVerified: {
                                                                type: string;
                                                            };
                                                            createdAt: {
                                                                type: string;
                                                                format: string;
                                                            };
                                                            updatedAt: {
                                                                type: string;
                                                                format: string;
                                                            };
                                                        };
                                                        required: string[];
                                                    };
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/social";
        };
        readonly callbackOAuth: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: {
                    code?: string | undefined;
                    error?: string | undefined;
                    device_id?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                    user?: string | undefined;
                } | undefined;
            } & {
                method: "GET" | "POST";
            } & {
                query?: {
                    code?: string | undefined;
                    error?: string | undefined;
                    device_id?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                    user?: string | undefined;
                } | undefined;
            } & {
                params: {
                    id: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: void;
            } : void>;
            options: {
                method: ("GET" | "POST")[];
                body: z.ZodOptional<z.ZodObject<{
                    code: z.ZodOptional<z.ZodString>;
                    error: z.ZodOptional<z.ZodString>;
                    device_id: z.ZodOptional<z.ZodString>;
                    error_description: z.ZodOptional<z.ZodString>;
                    state: z.ZodOptional<z.ZodString>;
                    user: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>>;
                query: z.ZodOptional<z.ZodObject<{
                    code: z.ZodOptional<z.ZodString>;
                    error: z.ZodOptional<z.ZodString>;
                    device_id: z.ZodOptional<z.ZodString>;
                    error_description: z.ZodOptional<z.ZodString>;
                    state: z.ZodOptional<z.ZodString>;
                    user: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>>;
                metadata: {
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/callback/:id";
        };
        readonly getSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    disableCookieCache?: unknown;
                    disableRefresh?: unknown;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    session: UnionToIntersection<StripEmptyObjects<{
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    } & (Option extends BetterAuthOptions ? AdditionalSessionFieldsOutput<Option> : Option extends Auth ? AdditionalSessionFieldsOutput<Option["options"]> : {})>>;
                    user: UnionToIntersection<StripEmptyObjects<{
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    } & (Option extends BetterAuthOptions ? AdditionalUserFieldsOutput<Option> : Option extends Auth ? AdditionalUserFieldsOutput<Option["options"]> : {})>>;
                } | null;
            } : {
                session: UnionToIntersection<StripEmptyObjects<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                } & (Option extends BetterAuthOptions ? AdditionalSessionFieldsOutput<Option> : Option extends Auth ? AdditionalSessionFieldsOutput<Option["options"]> : {})>>;
                user: UnionToIntersection<StripEmptyObjects<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                } & (Option extends BetterAuthOptions ? AdditionalUserFieldsOutput<Option> : Option extends Auth ? AdditionalUserFieldsOutput<Option["options"]> : {})>>;
            } | null>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    disableCookieCache: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
                    disableRefresh: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
                }, zod_v4_core.$strip>>;
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    $ref: string;
                                                };
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/get-session";
        };
        readonly signOut: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-out";
        };
        readonly signUpEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/sign-up/email", {
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
                        } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                            rememberMe: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
                        } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                            rememberMe: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                name: string;
                email: string;
                password: string;
                image?: string;
                callbackURL?: string;
                rememberMe?: boolean;
            } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
                        } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                            rememberMe: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                name: string;
                email: string;
                password: string;
                image?: string;
                callbackURL?: string;
                rememberMe?: boolean;
            } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    token: null;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                token: string;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
                        } & InferFieldsFromPlugins<Option, "user", "input"> & InferFieldsFromOptions<Option, "user", "input">;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                            rememberMe: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-up/email";
        };
        readonly signInEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    password: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    redirect: boolean;
                    token: string;
                    url: string | undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                redirect: boolean;
                token: string;
                url: string | undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodString;
                    password: z.ZodString;
                    callbackURL: z.ZodOptional<z.ZodString>;
                    rememberMe: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            properties: {
                                                redirect: {
                                                    type: string;
                                                    enum: boolean[];
                                                };
                                                token: {
                                                    type: string;
                                                    description: string;
                                                };
                                                url: {
                                                    type: string;
                                                    nullable: boolean;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            nullable: boolean;
                                                        };
                                                        image: {
                                                            type: string;
                                                            nullable: boolean;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/email";
        };
        readonly forgetPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    redirectTo?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodString;
                    redirectTo: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/forget-password";
        };
        readonly resetPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                    token?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: {
                    token?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                query: z.ZodOptional<z.ZodObject<{
                    token: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>>;
                body: z.ZodObject<{
                    newPassword: z.ZodString;
                    token: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password";
        };
        readonly verifyEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: void | {
                    status: boolean;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    status: boolean;
                    user: null;
                };
            } : void | {
                status: boolean;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                status: boolean;
                user: null;
            }>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    token: z.ZodString;
                    callbackURL: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        parameters: ({
                            name: string;
                            in: "query";
                            description: string;
                            required: true;
                            schema: {
                                type: "string";
                            };
                        } | {
                            name: string;
                            in: "query";
                            description: string;
                            required: false;
                            schema: {
                                type: "string";
                            };
                        })[];
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/verify-email";
        };
        readonly sendVerificationEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    callbackURL?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodEmail;
                    callbackURL: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            email: {
                                                type: string;
                                                description: string;
                                                example: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                                example: string;
                                                nullable: boolean;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                    example: boolean;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            "400": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                    description: string;
                                                    example: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/send-verification-email";
        };
        readonly changeEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newEmail: string;
                    callbackURL?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    newEmail: z.ZodEmail;
                    callbackURL: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                    nullable: boolean;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            "422": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/change-email";
        };
        readonly changePassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    token: string | null;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: string | null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    newPassword: z.ZodString;
                    currentPassword: z.ZodString;
                    revokeOtherSessions: z.ZodOptional<z.ZodBoolean>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/change-password";
        };
        readonly setPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    newPassword: z.ZodString;
                }, zod_v4_core.$strip>;
                metadata: {
                    SERVER_ONLY: true;
                };
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
            } & {
                use: any[];
            };
            path: "/set-password";
        };
        readonly updateUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/update-user", {
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<AdditionalUserFieldsInput<Option>> & {
                            name?: string;
                            image?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<AdditionalUserFieldsInput<Option>> & {
                            name?: string;
                            image?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, Partial<AdditionalUserFieldsInput<Option>> & {
                name?: string;
                image?: string;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<AdditionalUserFieldsInput<Option>> & {
                            name?: string;
                            image?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, Partial<AdditionalUserFieldsInput<Option>> & {
                name?: string;
                image?: string;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodRecord<z.ZodString, z.ZodAny>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<AdditionalUserFieldsInput<Option>> & {
                            name?: string;
                            image?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/update-user";
        };
        readonly deleteUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    callbackURL?: string | undefined;
                    password?: string | undefined;
                    token?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    message: string;
                };
            } : {
                success: boolean;
                message: string;
            }>;
            options: {
                method: "POST";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                body: z.ZodObject<{
                    callbackURL: z.ZodOptional<z.ZodString>;
                    password: z.ZodOptional<z.ZodString>;
                    token: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/delete-user";
        };
        readonly forgetPasswordCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    callbackURL: string;
                };
            } & {
                params: {
                    token: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: never;
            } : never>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    callbackURL: z.ZodString;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password/:token";
        };
        readonly requestPasswordReset: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    redirectTo?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                    message: string;
                };
            } : {
                status: boolean;
                message: string;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodEmail;
                    redirectTo: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/request-password-reset";
        };
        readonly requestPasswordResetCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    callbackURL: string;
                };
            } & {
                params: {
                    token: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: never;
            } : never>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    callbackURL: z.ZodString;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password/:token";
        };
        readonly listSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: Prettify<UnionToIntersection<StripEmptyObjects<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                } & (Option extends BetterAuthOptions ? AdditionalSessionFieldsOutput<Option> : Option extends Auth ? AdditionalSessionFieldsOutput<Option["options"]> : {})>>>[];
            } : Prettify<UnionToIntersection<StripEmptyObjects<{
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined;
                userAgent?: string | null | undefined;
            } & (Option extends BetterAuthOptions ? AdditionalSessionFieldsOutput<Option> : Option extends Auth ? AdditionalSessionFieldsOutput<Option["options"]> : {})>>>[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/list-sessions";
        };
        readonly revokeSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    token: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    token: z.ZodString;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            token: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-session";
        };
        readonly revokeSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-sessions";
        };
        readonly revokeOtherSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-other-sessions";
        };
        readonly linkSocialAccount: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    provider: unknown;
                    callbackURL?: string | undefined;
                    idToken?: {
                        token: string;
                        nonce?: string | undefined;
                        accessToken?: string | undefined;
                        refreshToken?: string | undefined;
                        scopes?: string[] | undefined;
                    } | undefined;
                    requestSignUp?: boolean | undefined;
                    scopes?: string[] | undefined;
                    errorCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    url: string;
                    redirect: boolean;
                };
            } : {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                body: z.ZodObject<{
                    callbackURL: z.ZodOptional<z.ZodString>;
                    provider: z.ZodType<"github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown, zod_v4_core.$ZodTypeInternals<"github" | "apple" | "atlassian" | "cognito" | "discord" | "facebook" | "figma" | "microsoft" | "google" | "huggingface" | "slack" | "spotify" | "twitch" | "twitter" | "dropbox" | "kick" | "linear" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "salesforce" | "vk" | "zoom" | "notion" | "kakao" | "naver" | "line" | "paypal" | (string & {}), unknown>>;
                    idToken: z.ZodOptional<z.ZodObject<{
                        token: z.ZodString;
                        nonce: z.ZodOptional<z.ZodString>;
                        accessToken: z.ZodOptional<z.ZodString>;
                        refreshToken: z.ZodOptional<z.ZodString>;
                        scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    }, zod_v4_core.$strip>>;
                    requestSignUp: z.ZodOptional<z.ZodBoolean>;
                    scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    errorCallbackURL: z.ZodOptional<z.ZodString>;
                    disableRedirect: z.ZodOptional<z.ZodBoolean>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                url: {
                                                    type: string;
                                                    description: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                    description: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/link-social";
        };
        readonly listUserAccounts: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    providerId: string;
                    createdAt: Date;
                    updatedAt: Date;
                    accountId: string;
                    scopes: string[];
                }[];
            } : {
                id: string;
                providerId: string;
                createdAt: Date;
                updatedAt: Date;
                accountId: string;
                scopes: string[];
            }[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    providerId: {
                                                        type: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                    updatedAt: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                    accountId: {
                                                        type: string;
                                                    };
                                                    scopes: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                        };
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/list-accounts";
        };
        readonly deleteUserCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    message: string;
                };
            } : {
                success: boolean;
                message: string;
            }>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    token: z.ZodString;
                    callbackURL: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/delete-user/callback";
        };
        readonly unlinkAccount: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    providerId: z.ZodString;
                    accountId: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/unlink-account";
        };
        readonly refreshToken: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                    userId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: packages_core_dist_oauth2.OAuth2Tokens;
            } : packages_core_dist_oauth2.OAuth2Tokens>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    providerId: z.ZodString;
                    accountId: z.ZodOptional<z.ZodString>;
                    userId: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                tokenType: {
                                                    type: string;
                                                };
                                                idToken: {
                                                    type: string;
                                                };
                                                accessToken: {
                                                    type: string;
                                                };
                                                refreshToken: {
                                                    type: string;
                                                };
                                                accessTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                                refreshTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            400: {
                                description: string;
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/refresh-token";
        };
        readonly getAccessToken: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                    userId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    accessToken: string;
                    accessTokenExpiresAt: Date | undefined;
                    scopes: string[];
                    idToken: string | undefined;
                };
            } : {
                accessToken: string;
                accessTokenExpiresAt: Date | undefined;
                scopes: string[];
                idToken: string | undefined;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    providerId: z.ZodString;
                    accountId: z.ZodOptional<z.ZodString>;
                    userId: z.ZodOptional<z.ZodString>;
                }, zod_v4_core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                tokenType: {
                                                    type: string;
                                                };
                                                idToken: {
                                                    type: string;
                                                };
                                                accessToken: {
                                                    type: string;
                                                };
                                                refreshToken: {
                                                    type: string;
                                                };
                                                accessTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                                refreshTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            400: {
                                description: string;
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/get-access-token";
        };
        readonly accountInfo: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    accountId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: packages_core_dist_oauth2.OAuth2UserInfo;
                    data: Record<string, any>;
                } | null;
            } : {
                user: packages_core_dist_oauth2.OAuth2UserInfo;
                data: Record<string, any>;
            } | null>;
            options: {
                method: "POST";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                                data: {
                                                    type: string;
                                                    properties: {};
                                                    additionalProperties: boolean;
                                                };
                                            };
                                            required: string[];
                                            additionalProperties: boolean;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                body: z.ZodObject<{
                    accountId: z.ZodString;
                }, zod_v4_core.$strip>;
            } & {
                use: any[];
            };
            path: "/account-info";
        };
    } & UnionToIntersection<Option["plugins"] extends (infer T)[] ? T extends BetterAuthPlugin ? T extends {
        endpoints: infer E;
    } ? E : {} : {} : {}>;
};

type WithJsDoc<T, D> = Expand<T & D>;
declare const betterAuth: <Options extends BetterAuthOptions>(options: Options & Record<never, never>) => Auth<Options>;
type Auth<Options extends BetterAuthOptions = BetterAuthOptions> = {
    handler: (request: Request) => Promise<Response>;
    api: InferAPI<ReturnType<typeof router<Options>>["endpoints"]>;
    options: Options;
    $ERROR_CODES: InferPluginErrorCodes<Options> & typeof BASE_ERROR_CODES;
    $context: Promise<AuthContext>;
    /**
     * Share types
     */
    $Infer: {
        Session: {
            session: PrettifyDeep<InferSession<Options>>;
            user: PrettifyDeep<InferUser<Options>>;
        };
    } & InferPluginTypes<Options>;
};

export { unlinkAccount as $, revokeOtherSessions as B, signOut as C, requestPasswordReset as D, forgetPassword as E, requestPasswordResetCallback as G, forgetPasswordCallback as H, resetPassword as J, createEmailVerificationToken as K, sendVerificationEmailFn as L, sendVerificationEmail as N, verifyEmail as O, updateUser as P, changePassword as Q, setPassword as R, deleteUser as S, deleteUserCallback as T, changeEmail as U, error as V, ok as X, signUpEmail as Y, listUserAccounts as Z, linkSocialAccount as _, getAccessToken as a0, refreshToken as a1, accountInfo as a2, originCheckMiddleware as a3, originCheck as a4, isSimpleRequest as a5, betterAuth as c, checkEndpointConflicts as k, getEndpoints as l, signInEmail as m, callbackOAuth as n, getSessionQuerySchema as o, getSession as p, getSessionFromCtx as q, router as r, signInSocial as s, sessionMiddleware as t, sensitiveSessionMiddleware as u, requestOnlySessionMiddleware as v, freshSessionMiddleware as w, listSessions as x, revokeSession as y, revokeSessions as z };
export type { Auth as A, FilteredAPI as F, InferUser as I, Models as M, WithJsDoc as W, InferSession as a, InferAPI as b, AdditionalUserFieldsInput as d, AdditionalUserFieldsOutput as e, AdditionalSessionFieldsInput as f, AdditionalSessionFieldsOutput as g, InferPluginTypes as h, FilterActions as i, InferSessionAPI as j };
