import * as packages_core_dist_db from 'packages/core/dist/db';
import * as better_call from 'better-call';
import * as _better_auth_core from '@better-auth/core';
import * as z from 'zod';
import { I as InferOptionSchema } from '../../shared/better-auth.CtDEK5dv.cjs';
import * as _better_auth_core_db from '@better-auth/core/db';
import '../../shared/better-auth.DNnBkMGu.cjs';

declare const getSchema: (normalizer: {
    username: (username: string) => string;
    displayUsername: (displayUsername: string) => string;
}) => {
    user: {
        fields: {
            username: {
                type: "string";
                required: false;
                sortable: true;
                unique: true;
                returned: true;
                transform: {
                    input(value: _better_auth_core_db.DBPrimitive): string | number | boolean | Date | string[] | number[] | null | undefined;
                };
            };
            displayUsername: {
                type: "string";
                required: false;
                transform: {
                    input(value: _better_auth_core_db.DBPrimitive): string | number | boolean | Date | string[] | number[] | null | undefined;
                };
            };
        };
    };
};
type UsernameSchema = ReturnType<typeof getSchema>;

declare const USERNAME_ERROR_CODES: {
    readonly INVALID_USERNAME_OR_PASSWORD: "Invalid username or password";
    readonly EMAIL_NOT_VERIFIED: "Email not verified";
    readonly UNEXPECTED_ERROR: "Unexpected error";
    readonly USERNAME_IS_ALREADY_TAKEN: "Username is already taken. Please try another.";
    readonly USERNAME_TOO_SHORT: "Username is too short";
    readonly USERNAME_TOO_LONG: "Username is too long";
    readonly INVALID_USERNAME: "Username is invalid";
    readonly INVALID_DISPLAY_USERNAME: "Display username is invalid";
};

type UsernameOptions = {
    schema?: InferOptionSchema<UsernameSchema>;
    /**
     * The minimum length of the username
     *
     * @default 3
     */
    minUsernameLength?: number;
    /**
     * The maximum length of the username
     *
     * @default 30
     */
    maxUsernameLength?: number;
    /**
     * A function to validate the username
     *
     * By default, the username should only contain alphanumeric characters and underscores
     */
    usernameValidator?: (username: string) => boolean | Promise<boolean>;
    /**
     * A function to validate the display username
     *
     * By default, no validation is applied to display username
     */
    displayUsernameValidator?: (displayUsername: string) => boolean | Promise<boolean>;
    /**
     * A function to normalize the username
     *
     * @default (username) => username.toLowerCase()
     */
    usernameNormalization?: ((username: string) => string) | false;
    /**
     * A function to normalize the display username
     *
     * @default false
     */
    displayUsernameNormalization?: ((displayUsername: string) => string) | false;
    /**
     * The order of validation
     *
     * @default { username: "pre-normalization", displayUsername: "pre-normalization" }
     */
    validationOrder?: {
        /**
         * The order of username validation
         *
         * @default "pre-normalization"
         */
        username?: "pre-normalization" | "post-normalization";
        /**
         * The order of display username validation
         *
         * @default "pre-normalization"
         */
        displayUsername?: "pre-normalization" | "post-normalization";
    };
};
declare const username: (options?: UsernameOptions) => {
    id: "username";
    init(ctx: _better_auth_core.AuthContext): {
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
                        } & Record<string, unknown>, context: _better_auth_core.GenericEndpointContext<_better_auth_core.BetterAuthOptions> | undefined): Promise<{
                            data: {
                                displayUsername?: string | undefined;
                                username?: string | undefined;
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        }>;
                    };
                    update: {
                        before(user: Partial<{
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        }> & Record<string, unknown>, context: _better_auth_core.GenericEndpointContext<_better_auth_core.BetterAuthOptions> | undefined): Promise<{
                            data: {
                                displayUsername?: string | undefined;
                                username?: string | undefined;
                                id?: string | undefined;
                                createdAt?: Date | undefined;
                                updatedAt?: Date | undefined;
                                email?: string | undefined;
                                emailVerified?: boolean | undefined;
                                name?: string | undefined;
                                image?: string | null | undefined;
                            };
                        }>;
                    };
                };
            };
        };
    };
    endpoints: {
        signInUsername: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    username: string;
                    password: string;
                    rememberMe?: boolean | undefined;
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
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        emailVerified: boolean;
                        username: string;
                        displayUsername: string;
                        name: string;
                        image: string | null | undefined;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | null;
            } : {
                token: string;
                user: {
                    id: string;
                    email: string;
                    emailVerified: boolean;
                    username: string;
                    displayUsername: string;
                    name: string;
                    image: string | null | undefined;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    username: z.ZodString;
                    password: z.ZodString;
                    rememberMe: z.ZodOptional<z.ZodBoolean>;
                    callbackURL: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
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
                                                token: {
                                                    type: string;
                                                    description: string;
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
                            422: {
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
            path: "/sign-in/username";
        };
        isUsernameAvailable: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    username: string;
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
                    available: boolean;
                };
            } : {
                available: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    username: z.ZodString;
                }, z.core.$strip>;
            } & {
                use: any[];
            };
            path: "/is-username-available";
        };
    };
    schema: {
        user: {
            fields: {
                username: {
                    type: "string";
                    required: false;
                    sortable: true;
                    unique: true;
                    returned: true;
                    transform: {
                        input(value: packages_core_dist_db.DBPrimitive): string | number | boolean | Date | string[] | number[] | null | undefined;
                    };
                };
                displayUsername: {
                    type: "string";
                    required: false;
                    transform: {
                        input(value: packages_core_dist_db.DBPrimitive): string | number | boolean | Date | string[] | number[] | null | undefined;
                    };
                };
            };
        };
    };
    hooks: {
        before: {
            matcher(context: better_call.EndpointContext<string, any> & Omit<better_call.InputContext<string, any>, "method"> & {
                context: _better_auth_core.AuthContext & {
                    returned?: unknown;
                    responseHeaders?: Headers;
                };
                headers?: Headers;
            }): boolean;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
    $ERROR_CODES: {
        readonly INVALID_USERNAME_OR_PASSWORD: "Invalid username or password";
        readonly EMAIL_NOT_VERIFIED: "Email not verified";
        readonly UNEXPECTED_ERROR: "Unexpected error";
        readonly USERNAME_IS_ALREADY_TAKEN: "Username is already taken. Please try another.";
        readonly USERNAME_TOO_SHORT: "Username is too short";
        readonly USERNAME_TOO_LONG: "Username is too long";
        readonly INVALID_USERNAME: "Username is invalid";
        readonly INVALID_DISPLAY_USERNAME: "Display username is invalid";
    };
};

export { USERNAME_ERROR_CODES, username };
export type { UsernameOptions };
