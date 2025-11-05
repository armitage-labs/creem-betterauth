import * as packages_core_dist_db from 'packages/core/dist/db';
import * as _better_auth_core from '@better-auth/core';
import { GenericEndpointContext } from '@better-auth/core';
import { I as InferOptionSchema } from './better-auth.DyhDNJOb.js';
import { Statements } from '../plugins/access/index.js';
import * as _better_auth_core_db from '@better-auth/core/db';
import * as zod_v4_core from 'zod/v4/core';
import * as z from 'zod';
import * as better_call from 'better-call';

declare const apiKeySchema: ({ timeWindow, rateLimitMax, }: {
    timeWindow: number;
    rateLimitMax: number;
}) => {
    apikey: {
        fields: {
            /**
             * The name of the key.
             */
            name: {
                type: "string";
                required: false;
                input: false;
            };
            /**
             * Shows the first few characters of the API key
             * This allows you to show those few characters in the UI to make it easier for users to identify the API key.
             */
            start: {
                type: "string";
                required: false;
                input: false;
            };
            /**
             * The prefix of the key.
             */
            prefix: {
                type: "string";
                required: false;
                input: false;
            };
            /**
             * The hashed key value.
             */
            key: {
                type: "string";
                required: true;
                input: false;
            };
            /**
             * The user id of the user who created the key.
             */
            userId: {
                type: "string";
                references: {
                    model: string;
                    field: string;
                    onDelete: "cascade";
                };
                required: true;
                input: false;
            };
            /**
             * The interval to refill the key in milliseconds.
             */
            refillInterval: {
                type: "number";
                required: false;
                input: false;
            };
            /**
             * The amount to refill the remaining count of the key.
             */
            refillAmount: {
                type: "number";
                required: false;
                input: false;
            };
            /**
             * The date and time when the key was last refilled.
             */
            lastRefillAt: {
                type: "date";
                required: false;
                input: false;
            };
            /**
             * Whether the key is enabled.
             */
            enabled: {
                type: "boolean";
                required: false;
                input: false;
                defaultValue: true;
            };
            /**
             * Whether the key has rate limiting enabled.
             */
            rateLimitEnabled: {
                type: "boolean";
                required: false;
                input: false;
                defaultValue: true;
            };
            /**
             * The time window in milliseconds for the rate limit.
             */
            rateLimitTimeWindow: {
                type: "number";
                required: false;
                input: false;
                defaultValue: number;
            };
            /**
             * The maximum number of requests allowed within the `rateLimitTimeWindow`.
             */
            rateLimitMax: {
                type: "number";
                required: false;
                input: false;
                defaultValue: number;
            };
            /**
             * The number of requests made within the rate limit time window
             */
            requestCount: {
                type: "number";
                required: false;
                input: false;
                defaultValue: number;
            };
            /**
             * The remaining number of requests before the key is revoked.
             *
             * If this is null, then the key is not revoked.
             *
             * If `refillInterval` & `refillAmount` are provided, than this will refill accordingly.
             */
            remaining: {
                type: "number";
                required: false;
                input: false;
            };
            /**
             * The date and time of the last request made to the key.
             */
            lastRequest: {
                type: "date";
                required: false;
                input: false;
            };
            /**
             * The date and time when the key will expire.
             */
            expiresAt: {
                type: "date";
                required: false;
                input: false;
            };
            /**
             * The date and time when the key was created.
             */
            createdAt: {
                type: "date";
                required: true;
                input: false;
            };
            /**
             * The date and time when the key was last updated.
             */
            updatedAt: {
                type: "date";
                required: true;
                input: false;
            };
            /**
             * The permissions of the key.
             */
            permissions: {
                type: "string";
                required: false;
                input: false;
            };
            /**
             * Any additional metadata you want to store with the key.
             */
            metadata: {
                type: "string";
                required: false;
                input: true;
                transform: {
                    input(value: _better_auth_core_db.DBPrimitive): string;
                    output(value: _better_auth_core_db.DBPrimitive): any;
                };
            };
        };
    };
};

interface ApiKeyOptions {
    /**
     * The header name to check for API key
     * @default "x-api-key"
     */
    apiKeyHeaders?: string | string[];
    /**
     * Disable hashing of the API key.
     *
     * ⚠️ Security Warning: It's strongly recommended to not disable hashing.
     * Storing API keys in plaintext makes them vulnerable to database breaches, potentially exposing all your users' API keys.
     *
     * @default false
     */
    disableKeyHashing?: boolean;
    /**
     * The function to get the API key from the context
     */
    customAPIKeyGetter?: (ctx: GenericEndpointContext) => string | null;
    /**
     * A custom function to validate the API key
     */
    customAPIKeyValidator?: (options: {
        ctx: GenericEndpointContext;
        key: string;
    }) => boolean | Promise<boolean>;
    /**
     * custom key generation function
     */
    customKeyGenerator?: (options: {
        /**
         * The length of the API key to generate
         */
        length: number;
        /**
         * The prefix of the API key to generate
         */
        prefix: string | undefined;
    }) => string | Promise<string>;
    /**
     * The configuration for storing the starting characters of the API key in the database.
     *
     * Useful if you want to display the starting characters of an API key in the UI.
     */
    startingCharactersConfig?: {
        /**
         * Whether to store the starting characters in the database. If false, we will set `start` to `null`.
         *
         * @default true
         */
        shouldStore?: boolean;
        /**
         * The length of the starting characters to store in the database.
         *
         * This includes the prefix length.
         *
         * @default 6
         */
        charactersLength?: number;
    };
    /**
     * The length of the API key. Longer is better. Default is 64. (Doesn't include the prefix length)
     * @default 64
     */
    defaultKeyLength?: number;
    /**
     * The prefix of the API key.
     *
     * Note: We recommend you append an underscore to the prefix to make the prefix more identifiable. (eg `hello_`)
     */
    defaultPrefix?: string;
    /**
     * The maximum length of the prefix.
     *
     * @default 32
     */
    maximumPrefixLength?: number;
    /**
     * Whether to require a name for the API key.
     *
     * @default false
     */
    requireName?: boolean;
    /**
     * The minimum length of the prefix.
     *
     * @default 1
     */
    minimumPrefixLength?: number;
    /**
     * The maximum length of the name.
     *
     * @default 32
     */
    maximumNameLength?: number;
    /**
     * The minimum length of the name.
     *
     * @default 1
     */
    minimumNameLength?: number;
    /**
     * Whether to enable metadata for an API key.
     *
     * @default false
     */
    enableMetadata?: boolean;
    /**
     * Customize the key expiration.
     */
    keyExpiration?: {
        /**
         * The default expires time in milliseconds.
         *
         * If `null`, then there will be no expiration time.
         *
         * @default null
         */
        defaultExpiresIn?: number | null;
        /**
         * Whether to disable the expires time passed from the client.
         *
         * If `true`, the expires time will be based on the default values.
         *
         * @default false
         */
        disableCustomExpiresTime?: boolean;
        /**
         * The minimum expiresIn value allowed to be set from the client. in days.
         *
         * @default 1
         */
        minExpiresIn?: number;
        /**
         * The maximum expiresIn value allowed to be set from the client. in days.
         *
         * @default 365
         */
        maxExpiresIn?: number;
    };
    /**
     * Default rate limiting options.
     */
    rateLimit?: {
        /**
         * Whether to enable rate limiting.
         *
         * @default true
         */
        enabled?: boolean;
        /**
         * The duration in milliseconds where each request is counted.
         *
         * Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset.
         *
         * @default 1000 * 60 * 60 * 24 // 1 day
         */
        timeWindow?: number;
        /**
         * Maximum amount of requests allowed within a window
         *
         * Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset.
         *
         * @default 10 // 10 requests per day
         */
        maxRequests?: number;
    };
    /**
     * custom schema for the API key plugin
     */
    schema?: InferOptionSchema<ReturnType<typeof apiKeySchema>>;
    /**
     * An API Key can represent a valid session, so we automatically mock a session for the user if we find a valid API key in the request headers.
     *
     * ⚠︎ This is not recommended for production use, as it can lead to security issues.
     * @default false
     */
    enableSessionForAPIKeys?: boolean;
    /**
     * Permissions for the API key.
     */
    permissions?: {
        /**
         * The default permissions for the API key.
         */
        defaultPermissions?: Statements | ((userId: string, ctx: GenericEndpointContext) => Statements | Promise<Statements>);
    };
}
type ApiKey = {
    /**
     * ID
     */
    id: string;
    /**
     * The name of the key
     */
    name: string | null;
    /**
     * Shows the first few characters of the API key, including the prefix.
     * This allows you to show those few characters in the UI to make it easier for users to identify the API key.
     */
    start: string | null;
    /**
     * The API Key prefix. Stored as plain text.
     */
    prefix: string | null;
    /**
     * The hashed API key value
     */
    key: string;
    /**
     * The owner of the user id
     */
    userId: string;
    /**
     * The interval in milliseconds between refills of the `remaining` count
     *
     * @example 3600000 // refill every hour (3600000ms = 1h)
     */
    refillInterval: number | null;
    /**
     * The amount to refill
     */
    refillAmount: number | null;
    /**
     * The last refill date
     */
    lastRefillAt: Date | null;
    /**
     * Sets if key is enabled or disabled
     *
     * @default true
     */
    enabled: boolean;
    /**
     * Whether the key has rate limiting enabled.
     */
    rateLimitEnabled: boolean;
    /**
     * The duration in milliseconds
     */
    rateLimitTimeWindow: number | null;
    /**
     * Maximum amount of requests allowed within a window
     */
    rateLimitMax: number | null;
    /**
     * The number of requests made within the rate limit time window
     */
    requestCount: number;
    /**
     * Remaining requests (every time API key is used this should updated and should be updated on refill as well)
     */
    remaining: number | null;
    /**
     * When last request occurred
     */
    lastRequest: Date | null;
    /**
     * Expiry date of a key
     */
    expiresAt: Date | null;
    /**
     * created at
     */
    createdAt: Date;
    /**
     * updated at
     */
    updatedAt: Date;
    /**
     * Extra metadata about the apiKey
     */
    metadata: Record<string, any> | null;
    /**
     * Permissions for the API key
     */
    permissions?: {
        [key: string]: string[];
    } | null;
};

declare const defaultKeyHasher: (key: string) => Promise<string>;
declare const ERROR_CODES: {
    INVALID_METADATA_TYPE: string;
    REFILL_AMOUNT_AND_INTERVAL_REQUIRED: string;
    REFILL_INTERVAL_AND_AMOUNT_REQUIRED: string;
    USER_BANNED: string;
    UNAUTHORIZED_SESSION: string;
    KEY_NOT_FOUND: string;
    KEY_DISABLED: string;
    KEY_EXPIRED: string;
    USAGE_EXCEEDED: string;
    KEY_NOT_RECOVERABLE: string;
    EXPIRES_IN_IS_TOO_SMALL: string;
    EXPIRES_IN_IS_TOO_LARGE: string;
    INVALID_REMAINING: string;
    INVALID_PREFIX_LENGTH: string;
    INVALID_NAME_LENGTH: string;
    METADATA_DISABLED: string;
    RATE_LIMIT_EXCEEDED: string;
    NO_VALUES_TO_UPDATE: string;
    KEY_DISABLED_EXPIRATION: string;
    INVALID_API_KEY: string;
    INVALID_USER_ID_FROM_API_KEY: string;
    INVALID_API_KEY_GETTER_RETURN_TYPE: string;
    SERVER_ONLY_PROPERTY: string;
    FAILED_TO_UPDATE_API_KEY: string;
    NAME_REQUIRED: string;
};
declare const API_KEY_TABLE_NAME = "apikey";
declare const apiKey: (options?: ApiKeyOptions) => {
    id: "api-key";
    $ERROR_CODES: {
        INVALID_METADATA_TYPE: string;
        REFILL_AMOUNT_AND_INTERVAL_REQUIRED: string;
        REFILL_INTERVAL_AND_AMOUNT_REQUIRED: string;
        USER_BANNED: string;
        UNAUTHORIZED_SESSION: string;
        KEY_NOT_FOUND: string;
        KEY_DISABLED: string;
        KEY_EXPIRED: string;
        USAGE_EXCEEDED: string;
        KEY_NOT_RECOVERABLE: string;
        EXPIRES_IN_IS_TOO_SMALL: string;
        EXPIRES_IN_IS_TOO_LARGE: string;
        INVALID_REMAINING: string;
        INVALID_PREFIX_LENGTH: string;
        INVALID_NAME_LENGTH: string;
        METADATA_DISABLED: string;
        RATE_LIMIT_EXCEEDED: string;
        NO_VALUES_TO_UPDATE: string;
        KEY_DISABLED_EXPIRATION: string;
        INVALID_API_KEY: string;
        INVALID_USER_ID_FROM_API_KEY: string;
        INVALID_API_KEY_GETTER_RETURN_TYPE: string;
        SERVER_ONLY_PROPERTY: string;
        FAILED_TO_UPDATE_API_KEY: string;
        NAME_REQUIRED: string;
    };
    hooks: {
        before: {
            matcher: (ctx: better_call.EndpointContext<string, any> & Omit<better_call.InputContext<string, any>, "method"> & {
                context: _better_auth_core.AuthContext & {
                    returned?: unknown;
                    responseHeaders?: Headers;
                };
                headers?: Headers;
            }) => boolean;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                };
                session: {
                    id: string;
                    token: string;
                    userId: string;
                    userAgent: string | null;
                    ipAddress: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    expiresAt: Date;
                };
            } | {
                context: better_call.MiddlewareContext<better_call.MiddlewareOptions, _better_auth_core.AuthContext<_better_auth_core.BetterAuthOptions> & {
                    returned?: unknown;
                    responseHeaders?: Headers;
                }>;
            }>;
        }[];
    };
    endpoints: {
        /**
         * ### Endpoint
         *
         * POST `/api-key/create`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createApiKey`
         *
         * **client:**
         * `authClient.apiKey.create`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-create)
         */
        createApiKey: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    name?: string | undefined;
                    expiresIn?: number | null | undefined;
                    userId?: unknown;
                    prefix?: string | undefined;
                    remaining?: number | null | undefined;
                    metadata?: any;
                    refillAmount?: number | undefined;
                    refillInterval?: number | undefined;
                    rateLimitTimeWindow?: number | undefined;
                    rateLimitMax?: number | undefined;
                    rateLimitEnabled?: boolean | undefined;
                    permissions?: Record<string, string[]> | undefined;
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
                    key: string;
                    metadata: any;
                    permissions: any;
                    id: string;
                    name: string | null;
                    start: string | null;
                    prefix: string | null;
                    userId: string;
                    refillInterval: number | null;
                    refillAmount: number | null;
                    lastRefillAt: Date | null;
                    enabled: boolean;
                    rateLimitEnabled: boolean;
                    rateLimitTimeWindow: number | null;
                    rateLimitMax: number | null;
                    requestCount: number;
                    remaining: number | null;
                    lastRequest: Date | null;
                    expiresAt: Date | null;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } : {
                key: string;
                metadata: any;
                permissions: any;
                id: string;
                name: string | null;
                start: string | null;
                prefix: string | null;
                userId: string;
                refillInterval: number | null;
                refillAmount: number | null;
                lastRefillAt: Date | null;
                enabled: boolean;
                rateLimitEnabled: boolean;
                rateLimitTimeWindow: number | null;
                rateLimitMax: number | null;
                requestCount: number;
                remaining: number | null;
                lastRequest: Date | null;
                expiresAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodOptional<z.ZodString>;
                    expiresIn: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    prefix: z.ZodOptional<z.ZodString>;
                    remaining: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
                    metadata: z.ZodOptional<z.ZodAny>;
                    refillAmount: z.ZodOptional<z.ZodNumber>;
                    refillInterval: z.ZodOptional<z.ZodNumber>;
                    rateLimitTimeWindow: z.ZodOptional<z.ZodNumber>;
                    rateLimitMax: z.ZodOptional<z.ZodNumber>;
                    rateLimitEnabled: z.ZodOptional<z.ZodBoolean>;
                    permissions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
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
                                                id: {
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
                                                name: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                prefix: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                start: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                key: {
                                                    type: string;
                                                    description: string;
                                                };
                                                enabled: {
                                                    type: string;
                                                    description: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                userId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                lastRefillAt: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                lastRequest: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                metadata: {
                                                    type: string;
                                                    nullable: boolean;
                                                    additionalProperties: boolean;
                                                    description: string;
                                                };
                                                rateLimitMax: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                rateLimitTimeWindow: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                remaining: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                refillAmount: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                refillInterval: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                rateLimitEnabled: {
                                                    type: string;
                                                    description: string;
                                                };
                                                requestCount: {
                                                    type: string;
                                                    description: string;
                                                };
                                                permissions: {
                                                    type: string;
                                                    nullable: boolean;
                                                    additionalProperties: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                        };
                                                    };
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
            path: "/api-key/create";
        };
        /**
         * ### Endpoint
         *
         * POST `/api-key/verify`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.verifyApiKey`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-verify)
         */
        verifyApiKey: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    key: string;
                    permissions?: Record<string, string[]> | undefined;
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
                    valid: boolean;
                    error: {
                        message: string | undefined;
                        code: string;
                    };
                    key: null;
                } | {
                    valid: boolean;
                    error: null;
                    key: Omit<ApiKey, "key"> | null;
                };
            } : {
                valid: boolean;
                error: {
                    message: string | undefined;
                    code: string;
                };
                key: null;
            } | {
                valid: boolean;
                error: null;
                key: Omit<ApiKey, "key"> | null;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    key: z.ZodString;
                    permissions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
                }, zod_v4_core.$strip>;
                metadata: {
                    SERVER_ONLY: true;
                };
            } & {
                use: any[];
            };
            path: "/api-key/verify";
        };
        /**
         * ### Endpoint
         *
         * GET `/api-key/get`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getApiKey`
         *
         * **client:**
         * `authClient.apiKey.get`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-get)
         */
        getApiKey: {
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
                    permissions: {
                        [key: string]: string[];
                    } | null;
                    id: string;
                    name: string | null;
                    start: string | null;
                    prefix: string | null;
                    userId: string;
                    refillInterval: number | null;
                    refillAmount: number | null;
                    lastRefillAt: Date | null;
                    enabled: boolean;
                    rateLimitEnabled: boolean;
                    rateLimitTimeWindow: number | null;
                    rateLimitMax: number | null;
                    requestCount: number;
                    remaining: number | null;
                    lastRequest: Date | null;
                    expiresAt: Date | null;
                    createdAt: Date;
                    updatedAt: Date;
                    metadata: Record<string, any> | null;
                };
            } : {
                permissions: {
                    [key: string]: string[];
                } | null;
                id: string;
                name: string | null;
                start: string | null;
                prefix: string | null;
                userId: string;
                refillInterval: number | null;
                refillAmount: number | null;
                lastRefillAt: Date | null;
                enabled: boolean;
                rateLimitEnabled: boolean;
                rateLimitTimeWindow: number | null;
                rateLimitMax: number | null;
                requestCount: number;
                remaining: number | null;
                lastRequest: Date | null;
                expiresAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                metadata: Record<string, any> | null;
            }>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    id: z.ZodString;
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
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                start: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                prefix: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                userId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                refillInterval: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                refillAmount: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                lastRefillAt: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                enabled: {
                                                    type: string;
                                                    description: string;
                                                    default: boolean;
                                                };
                                                rateLimitEnabled: {
                                                    type: string;
                                                    description: string;
                                                };
                                                rateLimitTimeWindow: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                rateLimitMax: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                requestCount: {
                                                    type: string;
                                                    description: string;
                                                };
                                                remaining: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                lastRequest: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
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
                                                metadata: {
                                                    type: string;
                                                    nullable: boolean;
                                                    additionalProperties: boolean;
                                                    description: string;
                                                };
                                                permissions: {
                                                    type: string;
                                                    nullable: boolean;
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
            path: "/api-key/get";
        };
        /**
         * ### Endpoint
         *
         * POST `/api-key/update`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateApiKey`
         *
         * **client:**
         * `authClient.apiKey.update`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-update)
         */
        updateApiKey: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    keyId: string;
                    userId?: unknown;
                    name?: string | undefined;
                    enabled?: boolean | undefined;
                    remaining?: number | undefined;
                    refillAmount?: number | undefined;
                    refillInterval?: number | undefined;
                    metadata?: any;
                    expiresIn?: number | null | undefined;
                    rateLimitEnabled?: boolean | undefined;
                    rateLimitTimeWindow?: number | undefined;
                    rateLimitMax?: number | undefined;
                    permissions?: Record<string, string[]> | null | undefined;
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
                    permissions: {
                        [key: string]: string[];
                    } | null;
                    id: string;
                    name: string | null;
                    start: string | null;
                    prefix: string | null;
                    userId: string;
                    refillInterval: number | null;
                    refillAmount: number | null;
                    lastRefillAt: Date | null;
                    enabled: boolean;
                    rateLimitEnabled: boolean;
                    rateLimitTimeWindow: number | null;
                    rateLimitMax: number | null;
                    requestCount: number;
                    remaining: number | null;
                    lastRequest: Date | null;
                    expiresAt: Date | null;
                    createdAt: Date;
                    updatedAt: Date;
                    metadata: Record<string, any> | null;
                };
            } : {
                permissions: {
                    [key: string]: string[];
                } | null;
                id: string;
                name: string | null;
                start: string | null;
                prefix: string | null;
                userId: string;
                refillInterval: number | null;
                refillAmount: number | null;
                lastRefillAt: Date | null;
                enabled: boolean;
                rateLimitEnabled: boolean;
                rateLimitTimeWindow: number | null;
                rateLimitMax: number | null;
                requestCount: number;
                remaining: number | null;
                lastRequest: Date | null;
                expiresAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                metadata: Record<string, any> | null;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    keyId: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    name: z.ZodOptional<z.ZodString>;
                    enabled: z.ZodOptional<z.ZodBoolean>;
                    remaining: z.ZodOptional<z.ZodNumber>;
                    refillAmount: z.ZodOptional<z.ZodNumber>;
                    refillInterval: z.ZodOptional<z.ZodNumber>;
                    metadata: z.ZodOptional<z.ZodAny>;
                    expiresIn: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                    rateLimitEnabled: z.ZodOptional<z.ZodBoolean>;
                    rateLimitTimeWindow: z.ZodOptional<z.ZodNumber>;
                    rateLimitMax: z.ZodOptional<z.ZodNumber>;
                    permissions: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>>;
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
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                start: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                prefix: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                userId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                refillInterval: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                refillAmount: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                lastRefillAt: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                enabled: {
                                                    type: string;
                                                    description: string;
                                                    default: boolean;
                                                };
                                                rateLimitEnabled: {
                                                    type: string;
                                                    description: string;
                                                };
                                                rateLimitTimeWindow: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                rateLimitMax: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                requestCount: {
                                                    type: string;
                                                    description: string;
                                                };
                                                remaining: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                lastRequest: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                    format: string;
                                                    nullable: boolean;
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
                                                metadata: {
                                                    type: string;
                                                    nullable: boolean;
                                                    additionalProperties: boolean;
                                                    description: string;
                                                };
                                                permissions: {
                                                    type: string;
                                                    nullable: boolean;
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
            path: "/api-key/update";
        };
        /**
         * ### Endpoint
         *
         * POST `/api-key/delete`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.deleteApiKey`
         *
         * **client:**
         * `authClient.apiKey.delete`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-delete)
         */
        deleteApiKey: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    keyId: string;
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
                    keyId: z.ZodString;
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
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            keyId: {
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
                                                success: {
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
            path: "/api-key/delete";
        };
        /**
         * ### Endpoint
         *
         * GET `/api-key/list`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listApiKeys`
         *
         * **client:**
         * `authClient.apiKey.list`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-list)
         */
        listApiKeys: {
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
                    permissions: {
                        [key: string]: string[];
                    } | null;
                    id: string;
                    name: string | null;
                    start: string | null;
                    prefix: string | null;
                    userId: string;
                    refillInterval: number | null;
                    refillAmount: number | null;
                    lastRefillAt: Date | null;
                    enabled: boolean;
                    rateLimitEnabled: boolean;
                    rateLimitTimeWindow: number | null;
                    rateLimitMax: number | null;
                    requestCount: number;
                    remaining: number | null;
                    lastRequest: Date | null;
                    expiresAt: Date | null;
                    createdAt: Date;
                    updatedAt: Date;
                    metadata: Record<string, any> | null;
                }[];
            } : {
                permissions: {
                    [key: string]: string[];
                } | null;
                id: string;
                name: string | null;
                start: string | null;
                prefix: string | null;
                userId: string;
                refillInterval: number | null;
                refillAmount: number | null;
                lastRefillAt: Date | null;
                enabled: boolean;
                rateLimitEnabled: boolean;
                rateLimitTimeWindow: number | null;
                rateLimitMax: number | null;
                requestCount: number;
                remaining: number | null;
                lastRequest: Date | null;
                expiresAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                metadata: Record<string, any> | null;
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
                                                        description: string;
                                                    };
                                                    name: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    start: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    prefix: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    userId: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    refillInterval: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    refillAmount: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    lastRefillAt: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    enabled: {
                                                        type: string;
                                                        description: string;
                                                        default: boolean;
                                                    };
                                                    rateLimitEnabled: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    rateLimitTimeWindow: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    rateLimitMax: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    requestCount: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    remaining: {
                                                        type: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    lastRequest: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
                                                        description: string;
                                                    };
                                                    expiresAt: {
                                                        type: string;
                                                        format: string;
                                                        nullable: boolean;
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
                                                    metadata: {
                                                        type: string;
                                                        nullable: boolean;
                                                        additionalProperties: boolean;
                                                        description: string;
                                                    };
                                                    permissions: {
                                                        type: string;
                                                        nullable: boolean;
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
                };
            } & {
                use: any[];
            };
            path: "/api-key/list";
        };
        /**
         * ### Endpoint
         *
         * POST `/api-key/delete-all-expired-api-keys`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.deleteAllExpiredApiKeys`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-delete-all-expired-api-keys)
         */
        deleteAllExpiredApiKeys: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
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
                    success: boolean;
                    error: unknown;
                };
            } : {
                success: boolean;
                error: unknown;
            }>;
            options: {
                method: "POST";
                metadata: {
                    SERVER_ONLY: true;
                    client: boolean;
                };
            } & {
                use: any[];
            };
            path: "/api-key/delete-all-expired-api-keys";
        };
    };
    schema: {
        apikey: {
            fields: {
                name: {
                    type: "string";
                    required: false;
                    input: false;
                };
                start: {
                    type: "string";
                    required: false;
                    input: false;
                };
                prefix: {
                    type: "string";
                    required: false;
                    input: false;
                };
                key: {
                    type: "string";
                    required: true;
                    input: false;
                };
                userId: {
                    type: "string";
                    references: {
                        model: string;
                        field: string;
                        onDelete: "cascade";
                    };
                    required: true;
                    input: false;
                };
                refillInterval: {
                    type: "number";
                    required: false;
                    input: false;
                };
                refillAmount: {
                    type: "number";
                    required: false;
                    input: false;
                };
                lastRefillAt: {
                    type: "date";
                    required: false;
                    input: false;
                };
                enabled: {
                    type: "boolean";
                    required: false;
                    input: false;
                    defaultValue: true;
                };
                rateLimitEnabled: {
                    type: "boolean";
                    required: false;
                    input: false;
                    defaultValue: true;
                };
                rateLimitTimeWindow: {
                    type: "number";
                    required: false;
                    input: false;
                    defaultValue: number;
                };
                rateLimitMax: {
                    type: "number";
                    required: false;
                    input: false;
                    defaultValue: number;
                };
                requestCount: {
                    type: "number";
                    required: false;
                    input: false;
                    defaultValue: number;
                };
                remaining: {
                    type: "number";
                    required: false;
                    input: false;
                };
                lastRequest: {
                    type: "date";
                    required: false;
                    input: false;
                };
                expiresAt: {
                    type: "date";
                    required: false;
                    input: false;
                };
                createdAt: {
                    type: "date";
                    required: true;
                    input: false;
                };
                updatedAt: {
                    type: "date";
                    required: true;
                    input: false;
                };
                permissions: {
                    type: "string";
                    required: false;
                    input: false;
                };
                metadata: {
                    type: "string";
                    required: false;
                    input: true;
                    transform: {
                        input(value: packages_core_dist_db.DBPrimitive): string;
                        output(value: packages_core_dist_db.DBPrimitive): any;
                    };
                };
            };
        };
    };
};

export { API_KEY_TABLE_NAME as A, ERROR_CODES as E, apiKey as a, defaultKeyHasher as d };
