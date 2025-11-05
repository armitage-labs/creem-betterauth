import * as nanostores from 'nanostores';
import * as _better_fetch_fetch from '@better-fetch/fetch';
import { SuccessContext } from '@better-fetch/fetch';
import { I as IsSignal, d as InferRoute, c as InferErrorCodes } from '../shared/better-auth.BNARIIb2.js';
import * as packages_core_dist_oauth2 from 'packages/core/dist/oauth2';
import * as zod_v4_core from 'zod/v4/core';
import * as z from 'zod';
import * as better_call from 'better-call';
import { U as UnionToIntersection, a as Prettify } from '../shared/better-auth.DNnBkMGu.js';
import * as _better_auth_core from '@better-auth/core';
import { BetterAuthOptions, BetterAuthClientOptions } from '@better-auth/core';
import { A as Auth, b as InferAPI } from '../shared/better-auth.BUpnjBGu.js';
import { User, Session } from '@better-auth/core/db';
import * as packages_core_dist_shared_core_Bshk2o_x from 'packages/core/dist/shared/core.Bshk2o_x';
import { s as setCookieToHeader } from '../shared/better-auth.BgW7o7g9.js';
import { Kysely } from 'kysely';
import '../shared/better-auth.kD29xbrE.js';
import '@better-auth/core/env';
import '../shared/better-auth.DyhDNJOb.js';
import '@better-auth/core/error';
import '@better-auth/core/oauth2';
import '@better-auth/core/middleware';

declare function getTestInstanceMemory<O extends Partial<BetterAuthOptions>, C extends BetterAuthClientOptions>(options?: O, config?: {
    clientOptions?: C;
    port?: number;
    disableTestUser?: boolean;
    testUser?: Partial<User>;
    testWith?: "sqlite" | "postgres" | "mongodb" | "mysql" | "memory";
}): Promise<{
    auth: Auth<O extends undefined ? {
        socialProviders: {
            github: {
                clientId: string;
                clientSecret: string;
            };
            google: {
                clientId: string;
                clientSecret: string;
            };
        };
        secret: string;
        database: ((options: BetterAuthOptions) => packages_core_dist_shared_core_Bshk2o_x.i<BetterAuthOptions>) | {
            db: Kysely<unknown>;
            type: "postgres";
        } | {
            db: Kysely<unknown>;
            type: "mysql";
        } | undefined;
        emailAndPassword: {
            enabled: true;
        };
        rateLimit: {
            enabled: false;
        };
        advanced: {
            cookies: {};
        };
    } : O & {
        socialProviders: {
            github: {
                clientId: string;
                clientSecret: string;
            };
            google: {
                clientId: string;
                clientSecret: string;
            };
        };
        secret: string;
        database: ((options: BetterAuthOptions) => packages_core_dist_shared_core_Bshk2o_x.i<BetterAuthOptions>) | {
            db: Kysely<unknown>;
            type: "postgres";
        } | {
            db: Kysely<unknown>;
            type: "mysql";
        } | undefined;
        emailAndPassword: {
            enabled: true;
        };
        rateLimit: {
            enabled: false;
        };
        advanced: {
            cookies: {};
        };
    }>;
    client: UnionToIntersection<((C extends undefined ? {} : C) & {
        baseURL: string | undefined;
        fetchOptions: {
            customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
        };
    })["plugins"] extends (infer Plugin)[] ? Plugin extends _better_auth_core.BetterAuthClientPlugin ? Plugin["getAtoms"] extends (fetch: any) => infer Atoms ? Atoms extends Record<string, any> ? { [key in keyof Atoms as IsSignal<key> extends true ? never : key extends string ? `use${Capitalize<key>}` : never]: Atoms[key]; } : {} : {} : {} : {}> & UnionToIntersection<InferRoute<((C extends undefined ? {} : C) & {
        baseURL: string | undefined;
        fetchOptions: {
            customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
        };
    })["plugins"] extends any[] ? {
        getSession: <R extends boolean, H extends boolean = false>(context: {
            headers: Headers;
            query?: {
                disableCookieCache?: boolean;
                disableRefresh?: boolean;
            } | undefined;
            asResponse?: R | undefined;
            returnHeaders?: H | undefined;
        }) => false extends R ? H extends true ? Promise<{
            headers: Headers;
            response: {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            } | null;
        }> : Promise<{
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined;
                userAgent?: string | null | undefined;
            };
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                emailVerified: boolean;
                name: string;
                image?: string | null | undefined;
            };
        } | null> : Promise<Response>;
    } & {
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
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                } | null;
            } : {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
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
        readonly signUpEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    name: string;
                    email: string;
                    password: string;
                    image?: string;
                    callbackURL?: string;
                    rememberMe?: boolean;
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
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: Partial<{}> & {
                    name?: string;
                    image?: string;
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
                        body: Partial<{}> & {
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
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: Prettify<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                }>[];
            } : Prettify<{
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined;
                userAgent?: string | null | undefined;
            }>[]>;
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
                use?: better_call.Middleware[];
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
                use?: better_call.Middleware[];
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
    } & (((C extends undefined ? {} : C) & {
        baseURL: string | undefined;
        fetchOptions: {
            customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
        };
    })["plugins"] extends (infer Pl)[] ? UnionToIntersection<Pl extends {
        $InferServerPlugin: infer Plug;
    } ? Plug extends {
        endpoints: infer Endpoints;
    } ? Endpoints : {} : {}> : {}) : InferAPI<{
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
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                } | null;
            } : {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
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
        readonly signUpEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    name: string;
                    email: string;
                    password: string;
                    image?: string;
                    callbackURL?: string;
                    rememberMe?: boolean;
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
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: Partial<{}> & {
                    name?: string;
                    image?: string;
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
                        body: Partial<{}> & {
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
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: Prettify<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                }>[];
            } : Prettify<{
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined;
                userAgent?: string | null | undefined;
            }>[]>;
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
                use?: better_call.Middleware[];
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
                use?: better_call.Middleware[];
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
    }>, (C extends undefined ? {} : C) & {
        baseURL: string | undefined;
        fetchOptions: {
            customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
        };
    }>> & (((C extends undefined ? {} : C) & {
        baseURL: string | undefined;
        fetchOptions: {
            customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
        };
    })["plugins"] extends (infer Plugin_1)[] ? UnionToIntersection<Plugin_1 extends _better_auth_core.BetterAuthClientPlugin ? Plugin_1["getActions"] extends (...args: any) => infer Actions ? Actions : {} : {}> : {}) & UnionToIntersection<InferRoute<((C extends undefined ? {} : C) & {
        baseURL: string | undefined;
        fetchOptions: {
            customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
        };
    })["$InferAuth"] extends {
        plugins: infer Plugins;
    } ? Plugins extends (infer Plugin_2)[] ? Plugin_2 extends {
        endpoints: infer Endpoints_1;
    } ? Endpoints_1 : {} : {} : {}, (C extends undefined ? {} : C) & {
        baseURL: string | undefined;
        fetchOptions: {
            customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
        };
    }>> & {
        useSession: nanostores.Atom<{
            data: UnionToIntersection<InferRoute<((C extends undefined ? {} : C) & {
                baseURL: string | undefined;
                fetchOptions: {
                    customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
                };
            })["plugins"] extends any[] ? {
                getSession: <R extends boolean, H extends boolean = false>(context: {
                    headers: Headers;
                    query?: {
                        disableCookieCache?: boolean;
                        disableRefresh?: boolean;
                    } | undefined;
                    asResponse?: R | undefined;
                    returnHeaders?: H | undefined;
                }) => false extends R ? H extends true ? Promise<{
                    headers: Headers;
                    response: {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    } | null;
                }> : Promise<{
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                } | null> : Promise<Response>;
            } & {
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
                        use?: better_call.Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            session: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        } | null;
                    } : {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
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
                readonly signUpEmail: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
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
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: Partial<{}> & {
                            name?: string;
                            image?: string;
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
                                body: Partial<{}> & {
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
                        use?: better_call.Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: Prettify<{
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        }>[];
                    } : Prettify<{
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    }>[]>;
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
                        use?: better_call.Middleware[];
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
                        use?: better_call.Middleware[];
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
            } & (((C extends undefined ? {} : C) & {
                baseURL: string | undefined;
                fetchOptions: {
                    customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
                };
            })["plugins"] extends (infer Pl)[] ? UnionToIntersection<Pl extends {
                $InferServerPlugin: infer Plug;
            } ? Plug extends {
                endpoints: infer Endpoints;
            } ? Endpoints : {} : {}> : {}) : InferAPI<{
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
                        use?: better_call.Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            session: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        } | null;
                    } : {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
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
                readonly signUpEmail: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
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
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: Partial<{}> & {
                            name?: string;
                            image?: string;
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
                                body: Partial<{}> & {
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
                        use?: better_call.Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: Prettify<{
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        }>[];
                    } : Prettify<{
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    }>[]>;
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
                        use?: better_call.Middleware[];
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
                        use?: better_call.Middleware[];
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
            }>, (C extends undefined ? {} : C) & {
                baseURL: string | undefined;
                fetchOptions: {
                    customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
                };
            }>> extends {
                getSession: () => Promise<infer Res>;
            } ? Res extends {
                data: infer S;
                error: null;
            } | {
                data: null;
                error: {
                    message?: string | undefined;
                    status: number;
                    statusText: string;
                };
            } ? S : Res extends Record<string, any> ? Res : never : never;
            error: _better_fetch_fetch.BetterFetchError | null;
            isPending: boolean;
        }>;
        $fetch: _better_fetch_fetch.BetterFetch<{
            plugins: (_better_fetch_fetch.BetterFetchPlugin | {
                id: string;
                name: string;
                hooks: {
                    onSuccess: ((context: SuccessContext<any>) => Promise<void> | void) | undefined;
                    onError: ((context: _better_fetch_fetch.ErrorContext) => Promise<void> | void) | undefined;
                    onRequest: (<T extends Record<string, any>>(context: _better_fetch_fetch.RequestContext<T>) => Promise<_better_fetch_fetch.RequestContext | void> | _better_fetch_fetch.RequestContext | void) | undefined;
                    onResponse: ((context: _better_fetch_fetch.ResponseContext) => Promise<Response | void | _better_fetch_fetch.ResponseContext> | Response | _better_fetch_fetch.ResponseContext | void) | undefined;
                };
            } | {
                id: string;
                name: string;
                hooks: {
                    onSuccess(context: SuccessContext<any>): void;
                };
            })[];
            method: string;
            headers?: (HeadersInit & (HeadersInit | {
                accept: "application/json" | "text/plain" | "application/octet-stream";
                "content-type": "application/json" | "text/plain" | "application/x-www-form-urlencoded" | "multipart/form-data" | "application/octet-stream";
                authorization: "Bearer" | "Basic";
            })) | undefined;
            cache?: RequestCache | undefined;
            credentials?: RequestCredentials;
            integrity?: string | undefined;
            keepalive?: boolean | undefined;
            mode?: RequestMode | undefined;
            priority?: RequestPriority | undefined;
            redirect?: RequestRedirect | undefined;
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
        $store: {
            notify: (signal?: Omit<string, "$sessionSignal"> | "$sessionSignal") => void;
            listen: (signal: Omit<string, "$sessionSignal"> | "$sessionSignal", listener: (value: boolean, oldValue?: boolean | undefined) => void) => void;
            atoms: Record<string, nanostores.WritableAtom<any>>;
        };
        $Infer: {
            Session: NonNullable<UnionToIntersection<InferRoute<((C extends undefined ? {} : C) & {
                baseURL: string | undefined;
                fetchOptions: {
                    customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
                };
            })["plugins"] extends any[] ? {
                getSession: <R extends boolean, H extends boolean = false>(context: {
                    headers: Headers;
                    query?: {
                        disableCookieCache?: boolean;
                        disableRefresh?: boolean;
                    } | undefined;
                    asResponse?: R | undefined;
                    returnHeaders?: H | undefined;
                }) => false extends R ? H extends true ? Promise<{
                    headers: Headers;
                    response: {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    } | null;
                }> : Promise<{
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                } | null> : Promise<Response>;
            } & {
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
                        use?: better_call.Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            session: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        } | null;
                    } : {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
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
                readonly signUpEmail: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
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
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: Partial<{}> & {
                            name?: string;
                            image?: string;
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
                                body: Partial<{}> & {
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
                        use?: better_call.Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: Prettify<{
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        }>[];
                    } : Prettify<{
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    }>[]>;
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
                        use?: better_call.Middleware[];
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
                        use?: better_call.Middleware[];
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
            } & (((C extends undefined ? {} : C) & {
                baseURL: string | undefined;
                fetchOptions: {
                    customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
                };
            })["plugins"] extends (infer Pl)[] ? UnionToIntersection<Pl extends {
                $InferServerPlugin: infer Plug;
            } ? Plug extends {
                endpoints: infer Endpoints;
            } ? Endpoints : {} : {}> : {}) : InferAPI<{
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
                        use?: better_call.Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: {
                            session: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        } | null;
                    } : {
                        session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
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
                readonly signUpEmail: {
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                            image?: string;
                            callbackURL?: string;
                            rememberMe?: boolean;
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
                    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                        body: Partial<{}> & {
                            name?: string;
                            image?: string;
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
                                body: Partial<{}> & {
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
                        use?: better_call.Middleware[];
                        path?: string;
                    } & {
                        asResponse?: AsResponse | undefined;
                        returnHeaders?: ReturnHeaders | undefined;
                    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                        headers: Headers;
                        response: Prettify<{
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        }>[];
                    } : Prettify<{
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    }>[]>;
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
                        use?: better_call.Middleware[];
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
                        use?: better_call.Middleware[];
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
            }>, (C extends undefined ? {} : C) & {
                baseURL: string | undefined;
                fetchOptions: {
                    customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
                };
            }>> extends {
                getSession: () => Promise<infer Res>;
            } ? Res extends {
                data: infer S;
                error: null;
            } | {
                data: null;
                error: {
                    message?: string | undefined;
                    status: number;
                    statusText: string;
                };
            } ? S : Res extends Record<string, any> ? Res : never : never>;
        };
        $ERROR_CODES: InferErrorCodes<(C extends undefined ? {} : C) & {
            baseURL: string | undefined;
            fetchOptions: {
                customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
            };
        }> & {
            readonly USER_NOT_FOUND: "User not found";
            readonly FAILED_TO_CREATE_USER: "Failed to create user";
            readonly FAILED_TO_CREATE_SESSION: "Failed to create session";
            readonly FAILED_TO_UPDATE_USER: "Failed to update user";
            readonly FAILED_TO_GET_SESSION: "Failed to get session";
            readonly INVALID_PASSWORD: "Invalid password";
            readonly INVALID_EMAIL: "Invalid email";
            readonly INVALID_EMAIL_OR_PASSWORD: "Invalid email or password";
            readonly SOCIAL_ACCOUNT_ALREADY_LINKED: "Social account already linked";
            readonly PROVIDER_NOT_FOUND: "Provider not found";
            readonly INVALID_TOKEN: "Invalid token";
            readonly ID_TOKEN_NOT_SUPPORTED: "id_token not supported";
            readonly FAILED_TO_GET_USER_INFO: "Failed to get user info";
            readonly USER_EMAIL_NOT_FOUND: "User email not found";
            readonly EMAIL_NOT_VERIFIED: "Email not verified";
            readonly PASSWORD_TOO_SHORT: "Password too short";
            readonly PASSWORD_TOO_LONG: "Password too long";
            readonly USER_ALREADY_EXISTS: "User already exists.";
            readonly USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.";
            readonly EMAIL_CAN_NOT_BE_UPDATED: "Email can not be updated";
            readonly CREDENTIAL_ACCOUNT_NOT_FOUND: "Credential account not found";
            readonly SESSION_EXPIRED: "Session expired. Re-authenticate to perform this action.";
            readonly FAILED_TO_UNLINK_LAST_ACCOUNT: "You can't unlink your last account";
            readonly ACCOUNT_NOT_FOUND: "Account not found";
            readonly USER_ALREADY_HAS_PASSWORD: "User already has a password. Provide that to delete the account.";
        } extends infer T ? { [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : T[K] extends object ? T[K] extends any[] ? T[K] : T[K] extends Date ? T[K] : T[K] extends infer T_1 ? { [K_2 in keyof T_1]: T_1[K_2] extends (...args: any[]) => any ? T_1[K_2] : T_1[K_2] extends object ? T_1[K_2] extends any[] ? T_1[K_2] : T_1[K_2] extends Date ? T_1[K_2] : T_1[K_2] extends infer T_2 ? { [K_3 in keyof T_2]: T_2[K_3] extends (...args: any[]) => any ? T_2[K_3] : T_2[K_3] extends object ? T_2[K_3] extends any[] ? T_2[K_3] : T_2[K_3] extends Date ? T_2[K_3] : T_2[K_3] extends infer T_3 ? { [K_4 in keyof T_3]: T_3[K_4] extends (...args: any[]) => any ? T_3[K_4] : T_3[K_4] extends object ? T_3[K_4] extends any[] ? T_3[K_4] : T_3[K_4] extends Date ? T_3[K_4] : T_3[K_4] extends infer T_4 ? { [K_5 in keyof T_4]: T_4[K_5] extends (...args: any[]) => any ? T_4[K_5] : T_4[K_5] extends object ? T_4[K_5] extends any[] ? T_4[K_5] : T_4[K_5] extends Date ? T_4[K_5] : T_4[K_5] extends infer T_5 ? { [K_6 in keyof T_5]: T_5[K_6] extends (...args: any[]) => any ? T_5[K_6] : T_5[K_6] extends object ? T_5[K_6] extends any[] ? T_5[K_6] : T_5[K_6] extends Date ? T_5[K_6] : T_5[K_6] extends infer T_6 ? { [K_7 in keyof T_6]: T_6[K_7] extends (...args: any[]) => any ? T_6[K_7] : T_6[K_7] extends object ? T_6[K_7] extends any[] ? T_6[K_7] : T_6[K_7] extends Date ? T_6[K_7] : T_6[K_7] extends infer T_7 ? { [K_8 in keyof T_7]: T_7[K_8] extends (...args: any[]) => any ? T_7[K_8] : T_7[K_8] extends object ? T_7[K_8] extends any[] ? T_7[K_8] : T_7[K_8] extends Date ? T_7[K_8] : T_7[K_8] extends infer T_8 ? { [K_9 in keyof T_8]: T_8[K_9] extends (...args: any[]) => any ? T_8[K_9] : T_8[K_9] extends object ? T_8[K_9] extends any[] ? T_8[K_9] : T_8[K_9] extends Date ? T_8[K_9] : T_8[K_9] extends infer T_9 ? { [K_10 in keyof T_9]: T_9[K_10] extends (...args: any[]) => any ? T_9[K_10] : T_9[K_10] extends object ? T_9[K_10] extends any[] ? T_9[K_10] : T_9[K_10] extends Date ? T_9[K_10] : T_9[K_10] extends infer T_10 ? { [K_11 in keyof T_10]: T_10[K_11] extends (...args: any[]) => any ? T_10[K_11] : T_10[K_11] extends object ? T_10[K_11] extends any[] ? T_10[K_11] : T_10[K_11] extends Date ? T_10[K_11] : /*elided*/ any : T_10[K_11]; } : never : T_9[K_10]; } : never : T_8[K_9]; } : never : T_7[K_8]; } : never : T_6[K_7]; } : never : T_5[K_6]; } : never : T_4[K_5]; } : never : T_3[K_4]; } : never : T_2[K_3]; } : never : T_1[K_2]; } : never : T[K]; } : never;
    };
    testUser: {
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        email: string;
        emailVerified?: boolean | undefined;
        name: string;
        image?: string | null | undefined;
        password: string;
    };
    signInWithTestUser: () => Promise<{
        session: Session;
        user: User;
        headers: Headers;
        setCookie: (name: string, value: string) => void;
    }>;
    signInWithUser: (email: string, password: string) => Promise<{
        res: {
            user: User;
            session: Session;
        };
        headers: Headers;
    }>;
    cookieSetter: typeof setCookieToHeader;
    customFetchImpl: (url: string | URL | Request, init?: RequestInit) => Promise<Response>;
    sessionSetter: (headers: Headers) => (context: SuccessContext) => void;
    db: packages_core_dist_shared_core_Bshk2o_x.i<BetterAuthOptions>;
}>;

export { getTestInstanceMemory };
