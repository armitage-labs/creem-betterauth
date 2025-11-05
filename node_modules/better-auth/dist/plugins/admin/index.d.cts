import { AccessControl, Role, Statements } from '../access/index.cjs';
import * as packages_core_dist_db from 'packages/core/dist/db';
import * as better_call from 'better-call';
import * as _better_auth_core from '@better-auth/core';
import * as z from 'zod';
import { Session, User } from '@better-auth/core/db';
import { I as InferOptionSchema } from '../../shared/better-auth.CtDEK5dv.cjs';
import '../../shared/better-auth.DNnBkMGu.cjs';

declare const schema: {
    user: {
        fields: {
            role: {
                type: "string";
                required: false;
                input: false;
            };
            banned: {
                type: "boolean";
                defaultValue: false;
                required: false;
                input: false;
            };
            banReason: {
                type: "string";
                required: false;
                input: false;
            };
            banExpires: {
                type: "date";
                required: false;
                input: false;
            };
        };
    };
    session: {
        fields: {
            impersonatedBy: {
                type: "string";
                required: false;
            };
        };
    };
};
type AdminSchema = typeof schema;

interface UserWithRole extends User {
    role?: string;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | null;
}
interface SessionWithImpersonatedBy extends Session {
    impersonatedBy?: string;
}
interface AdminOptions {
    /**
     * The default role for a user
     *
     * @default "user"
     */
    defaultRole?: string;
    /**
     * Roles that are considered admin roles.
     *
     * Any user role that isn't in this list, even if they have the permission,
     * will not be considered an admin.
     *
     * @default ["admin"]
     */
    adminRoles?: string | string[];
    /**
     * A default ban reason
     *
     * By default, no reason is provided
     */
    defaultBanReason?: string;
    /**
     * Number of seconds until the ban expires
     *
     * By default, the ban never expires
     */
    defaultBanExpiresIn?: number;
    /**
     * Duration of the impersonation session in seconds
     *
     * By default, the impersonation session lasts 1 hour
     */
    impersonationSessionDuration?: number;
    /**
     * Custom schema for the admin plugin
     */
    schema?: InferOptionSchema<AdminSchema>;
    /**
     * Configure the roles and permissions for the admin
     * plugin.
     */
    ac?: AccessControl;
    /**
     * Custom permissions for roles.
     */
    roles?: {
        [key in string]?: Role;
    };
    /**
     * List of user ids that should have admin access
     *
     * If this is set, the `adminRole` option is ignored
     */
    adminUserIds?: string[];
    /**
     * Message to show when a user is banned
     *
     * By default, the message is "You have been banned from this application"
     */
    bannedUserMessage?: string;
}
type InferAdminRolesFromOption<O extends AdminOptions | undefined> = O extends {
    roles: Record<string, unknown>;
} ? keyof O["roles"] : "user" | "admin";

declare const admin: <O extends AdminOptions>(options?: O) => {
    id: "admin";
    init(): {
        options: {
            databaseHooks: {
                user: {
                    create: {
                        before(user: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        } & Record<string, unknown>): Promise<{
                            data: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                                role: string;
                            };
                        }>;
                    };
                };
                session: {
                    create: {
                        before(session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        } & Record<string, unknown>, ctx: _better_auth_core.GenericEndpointContext<_better_auth_core.BetterAuthOptions> | undefined): Promise<void>;
                    };
                };
            };
        };
    };
    hooks: {
        after: {
            matcher(context: better_call.EndpointContext<string, any> & Omit<better_call.InputContext<string, any>, "method"> & {
                context: _better_auth_core.AuthContext & {
                    returned?: unknown;
                    responseHeaders?: Headers;
                };
                headers?: Headers;
            }): boolean;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<SessionWithImpersonatedBy[] | undefined>;
        }[];
    };
    endpoints: {
        /**
         * ### Endpoint
         *
         * POST `/admin/set-role`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.setRole`
         *
         * **client:**
         * `authClient.admin.setRole`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-set-role)
         */
        setRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: string;
                    role: InferAdminRolesFromOption<O> | InferAdminRolesFromOption<O>[];
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
                    user: UserWithRole;
                };
            } : {
                user: UserWithRole;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                }, z.core.$strip>;
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferAdminRolesFromOption<O> | InferAdminRolesFromOption<O>[];
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/set-role";
        };
        getUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    id: string;
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
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
            } : {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                emailVerified: boolean;
                name: string;
                image?: string | null | undefined;
            }>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    id: z.ZodString;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
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
            path: "/admin/get-user";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/create-user`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createUser`
         *
         * **client:**
         * `authClient.admin.createUser`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-create-user)
         */
        createUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    password: string;
                    name: string;
                    role?: InferAdminRolesFromOption<O> | InferAdminRolesFromOption<O>[];
                    data?: Record<string, any>;
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
                    user: UserWithRole;
                };
            } : {
                user: UserWithRole;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodString;
                    password: z.ZodString;
                    name: z.ZodString;
                    role: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
                    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: {
                            email: string;
                            password: string;
                            name: string;
                            role?: InferAdminRolesFromOption<O> | InferAdminRolesFromOption<O>[];
                            data?: Record<string, any>;
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/create-user";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/update-user`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.adminUpdateUser`
         *
         * **client:**
         * `authClient.admin.updateUser`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-update-user)
         */
        adminUpdateUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
                    data: Record<any, any>;
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
                response: UserWithRole;
            } : UserWithRole>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    data: z.ZodRecord<z.ZodAny, z.ZodAny>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
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
            path: "/admin/update-user";
        };
        listUsers: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    searchValue?: string | undefined;
                    searchField?: "email" | "name" | undefined;
                    searchOperator?: "contains" | "starts_with" | "ends_with" | undefined;
                    limit?: string | number | undefined;
                    offset?: string | number | undefined;
                    sortBy?: string | undefined;
                    sortDirection?: "asc" | "desc" | undefined;
                    filterField?: string | undefined;
                    filterValue?: string | number | boolean | undefined;
                    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
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
                    users: UserWithRole[];
                    total: number;
                    limit: number | undefined;
                    offset: number | undefined;
                } | {
                    users: never[];
                    total: number;
                };
            } : {
                users: UserWithRole[];
                total: number;
                limit: number | undefined;
                offset: number | undefined;
            } | {
                users: never[];
                total: number;
            }>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                query: z.ZodObject<{
                    searchValue: z.ZodOptional<z.ZodString>;
                    searchField: z.ZodOptional<z.ZodEnum<{
                        email: "email";
                        name: "name";
                    }>>;
                    searchOperator: z.ZodOptional<z.ZodEnum<{
                        contains: "contains";
                        starts_with: "starts_with";
                        ends_with: "ends_with";
                    }>>;
                    limit: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                    offset: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                    sortBy: z.ZodOptional<z.ZodString>;
                    sortDirection: z.ZodOptional<z.ZodEnum<{
                        asc: "asc";
                        desc: "desc";
                    }>>;
                    filterField: z.ZodOptional<z.ZodString>;
                    filterValue: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber]>, z.ZodBoolean]>>;
                    filterOperator: z.ZodOptional<z.ZodEnum<{
                        eq: "eq";
                        ne: "ne";
                        lt: "lt";
                        lte: "lte";
                        gt: "gt";
                        gte: "gte";
                        contains: "contains";
                    }>>;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                users: {
                                                    type: string;
                                                    items: {
                                                        $ref: string;
                                                    };
                                                };
                                                total: {
                                                    type: string;
                                                };
                                                limit: {
                                                    type: string;
                                                };
                                                offset: {
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
            path: "/admin/list-users";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/list-user-sessions`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listUserSessions`
         *
         * **client:**
         * `authClient.admin.listUserSessions`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-list-user-sessions)
         */
        listUserSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
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
                    sessions: SessionWithImpersonatedBy[];
                };
            } : {
                sessions: SessionWithImpersonatedBy[];
            }>;
            options: {
                method: "POST";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                sessions: {
                                                    type: string;
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
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/list-user-sessions";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/unban-user`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.unbanUser`
         *
         * **client:**
         * `authClient.admin.unbanUser`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-unban-user)
         */
        unbanUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
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
                    user: any;
                };
            } : {
                user: any;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
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
            path: "/admin/unban-user";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/ban-user`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.banUser`
         *
         * **client:**
         * `authClient.admin.banUser`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-ban-user)
         */
        banUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
                    banReason?: string | undefined;
                    banExpiresIn?: number | undefined;
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
                    user: any;
                };
            } : {
                user: any;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    banReason: z.ZodOptional<z.ZodString>;
                    banExpiresIn: z.ZodOptional<z.ZodNumber>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
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
            path: "/admin/ban-user";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/impersonate-user`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.impersonateUser`
         *
         * **client:**
         * `authClient.admin.impersonateUser`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-impersonate-user)
         */
        impersonateUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
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
                };
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
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
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
                                                user: {
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
            path: "/admin/impersonate-user";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/stop-impersonating`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.stopImpersonating`
         *
         * **client:**
         * `authClient.admin.stopImpersonating`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-stop-impersonating)
         */
        stopImpersonating: {
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
                    session: Session & Record<string, any>;
                    user: packages_core_dist_db.User & Record<string, any>;
                };
            } : {
                session: Session & Record<string, any>;
                user: packages_core_dist_db.User & Record<string, any>;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
            } & {
                use: any[];
            };
            path: "/admin/stop-impersonating";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/revoke-user-session`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.revokeUserSession`
         *
         * **client:**
         * `authClient.admin.revokeUserSession`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-revoke-user-session)
         */
        revokeUserSession: {
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
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    sessionToken: z.ZodString;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
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
            path: "/admin/revoke-user-session";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/revoke-user-sessions`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.revokeUserSessions`
         *
         * **client:**
         * `authClient.admin.revokeUserSessions`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-revoke-user-sessions)
         */
        revokeUserSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
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
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
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
            path: "/admin/revoke-user-sessions";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/remove-user`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.removeUser`
         *
         * **client:**
         * `authClient.admin.removeUser`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-remove-user)
         */
        removeUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
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
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
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
            path: "/admin/remove-user";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/set-user-password`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.setUserPassword`
         *
         * **client:**
         * `authClient.admin.setUserPassword`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-set-user-password)
         */
        setUserPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                    userId: unknown;
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
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        user: UserWithRole;
                        session: Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
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
            path: "/admin/set-user-password";
        };
        /**
         * ### Endpoint
         *
         * POST `/admin/has-permission`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.userHasPermission`
         *
         * **client:**
         * `authClient.admin.hasPermission`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-has-permission)
         */
        userHasPermission: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: ({
                    /**
                     * @deprecated Use `permissions` instead
                     */
                    permission: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                        readonly session: readonly ["list", "revoke", "delete"];
                    })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                        readonly session: readonly ["list", "revoke", "delete"];
                    })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                        readonly session: readonly ["list", "revoke", "delete"];
                    })[key][number] : never)[] | undefined; };
                    permissions?: never;
                } | {
                    permissions: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                        readonly session: readonly ["list", "revoke", "delete"];
                    })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                        readonly session: readonly ["list", "revoke", "delete"];
                    })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                        readonly session: readonly ["list", "revoke", "delete"];
                    })[key][number] : never)[] | undefined; };
                    permission?: never;
                }) & {
                    userId?: string;
                    role?: InferAdminRolesFromOption<O>;
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
                    error: null;
                    success: boolean;
                };
            } : {
                error: null;
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodIntersection<z.ZodObject<{
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    role: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>, z.ZodUnion<readonly [z.ZodObject<{
                    permission: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
                    permissions: z.ZodUndefined;
                }, z.core.$strip>, z.ZodObject<{
                    permission: z.ZodUndefined;
                    permissions: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
                }, z.core.$strip>]>>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            permission: {
                                                type: string;
                                                description: string;
                                                deprecated: boolean;
                                            };
                                            permissions: {
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
                                                error: {
                                                    type: string;
                                                };
                                                success: {
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
                    $Infer: {
                        body: ({
                            /**
                             * @deprecated Use `permissions` instead
                             */
                            permission: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            })[key][number] : never)[] | undefined; };
                            permissions?: never;
                        } | {
                            permissions: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                                readonly session: readonly ["list", "revoke", "delete"];
                            })[key][number] : never)[] | undefined; };
                            permission?: never;
                        }) & {
                            userId?: string;
                            role?: InferAdminRolesFromOption<O>;
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/admin/has-permission";
        };
    };
    $ERROR_CODES: {
        readonly FAILED_TO_CREATE_USER: "Failed to create user";
        readonly USER_ALREADY_EXISTS: "User already exists.";
        readonly USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.";
        readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
        readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
        readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
        readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
        readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
        readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
        readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
        readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
        readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
        readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
        readonly BANNED_USER: "You have been banned from this application";
        readonly YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user";
        readonly NO_DATA_TO_UPDATE: "No data to update";
        readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users";
        readonly YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself";
        readonly YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE: "You are not allowed to set a non-existent role value";
    };
    schema: {
        user: {
            fields: {
                role: {
                    type: "string";
                    required: false;
                    input: false;
                };
                banned: {
                    type: "boolean";
                    defaultValue: false;
                    required: false;
                    input: false;
                };
                banReason: {
                    type: "string";
                    required: false;
                    input: false;
                };
                banExpires: {
                    type: "date";
                    required: false;
                    input: false;
                };
            };
        };
        session: {
            fields: {
                impersonatedBy: {
                    type: "string";
                    required: false;
                };
            };
        };
    };
    options: any;
};

export { admin };
export type { AdminOptions, InferAdminRolesFromOption, SessionWithImpersonatedBy, UserWithRole };
