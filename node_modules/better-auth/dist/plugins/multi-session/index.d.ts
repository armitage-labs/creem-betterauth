import * as _better_auth_core from '@better-auth/core';
import * as packages_core_dist_db from 'packages/core/dist/db';
import * as better_call from 'better-call';
import * as z from 'zod';

interface MultiSessionConfig {
    /**
     * The maximum number of sessions a user can have
     * at a time
     * @default 5
     */
    maximumSessions?: number;
}
declare const multiSession: (options?: MultiSessionConfig) => {
    id: "multi-session";
    endpoints: {
        /**
         * ### Endpoint
         *
         * GET `/multi-session/list-device-sessions`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listDeviceSessions`
         *
         * **client:**
         * `authClient.multiSession.listDeviceSessions`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-list-device-sessions)
         */
        listDeviceSessions: {
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
                response: {
                    session: packages_core_dist_db.Session;
                    user: packages_core_dist_db.User;
                }[];
            } : {
                session: packages_core_dist_db.Session;
                user: packages_core_dist_db.User;
            }[]>;
            options: {
                method: "GET";
                requireHeaders: true;
            } & {
                use: any[];
            };
            path: "/multi-session/list-device-sessions";
        };
        /**
         * ### Endpoint
         *
         * POST `/multi-session/set-active`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.setActiveSession`
         *
         * **client:**
         * `authClient.multiSession.setActive`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-set-active)
         */
        setActiveSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    sessionToken: string;
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
                    session: packages_core_dist_db.Session & Record<string, any>;
                    user: packages_core_dist_db.User & Record<string, any>;
                };
            } : {
                session: packages_core_dist_db.Session & Record<string, any>;
                user: packages_core_dist_db.User & Record<string, any>;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    sessionToken: z.ZodString;
                }, z.core.$strip>;
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
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    $ref: string;
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
            path: "/multi-session/set-active";
        };
        /**
         * ### Endpoint
         *
         * POST `/multi-session/revoke`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.revokeDeviceSession`
         *
         * **client:**
         * `authClient.multiSession.revoke`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-revoke)
         */
        revokeDeviceSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    sessionToken: string;
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
                    sessionToken: z.ZodString;
                }, z.core.$strip>;
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
                            200: {
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
            path: "/multi-session/revoke";
        };
    };
    hooks: {
        after: {
            matcher: (context: better_call.EndpointContext<string, any> & Omit<better_call.InputContext<string, any>, "method"> & {
                context: _better_auth_core.AuthContext & {
                    returned?: unknown;
                    responseHeaders?: Headers;
                };
                headers?: Headers;
            }) => boolean;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
    $ERROR_CODES: {
        readonly INVALID_SESSION_TOKEN: "Invalid session token";
    };
};

export { multiSession };
