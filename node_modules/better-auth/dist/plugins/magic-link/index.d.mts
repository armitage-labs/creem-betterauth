import * as better_call from 'better-call';
import * as z from 'zod';

interface MagicLinkopts {
    /**
     * Time in seconds until the magic link expires.
     * @default (60 * 5) // 5 minutes
     */
    expiresIn?: number;
    /**
     * Send magic link implementation.
     */
    sendMagicLink: (data: {
        email: string;
        url: string;
        token: string;
    }, request?: Request) => Promise<void> | void;
    /**
     * Disable sign up if user is not found.
     *
     * @default false
     */
    disableSignUp?: boolean;
    /**
     * Rate limit configuration.
     *
     * @default {
     *  window: 60,
     *  max: 5,
     * }
     */
    rateLimit?: {
        window: number;
        max: number;
    };
    /**
     * Custom function to generate a token
     */
    generateToken?: (email: string) => Promise<string> | string;
    /**
     * This option allows you to configure how the token is stored in your database.
     * Note: This will not affect the token that's sent, it will only affect the token stored in your database.
     *
     * @default "plain"
     */
    storeToken?: "plain" | "hashed" | {
        type: "custom-hasher";
        hash: (token: string) => Promise<string>;
    };
}
declare const magicLink: (options: MagicLinkopts) => {
    id: "magic-link";
    endpoints: {
        /**
         * ### Endpoint
         *
         * POST `/sign-in/magic-link`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.signInMagicLink`
         *
         * **client:**
         * `authClient.signIn.magicLink`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/sign-in#api-method-sign-in-magic-link)
         */
        signInMagicLink: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    name?: string | undefined;
                    callbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    errorCallbackURL?: string | undefined;
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
                requireHeaders: true;
                body: z.ZodObject<{
                    email: z.ZodString;
                    name: z.ZodOptional<z.ZodString>;
                    callbackURL: z.ZodOptional<z.ZodString>;
                    newUserCallbackURL: z.ZodOptional<z.ZodString>;
                    errorCallbackURL: z.ZodOptional<z.ZodString>;
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
            path: "/sign-in/magic-link";
        };
        /**
         * ### Endpoint
         *
         * GET `/magic-link/verify`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.magicLinkVerify`
         *
         * **client:**
         * `authClient.magicLink.verify`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/magic-link#api-method-magic-link-verify)
         */
        magicLinkVerify: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                    errorCallbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                };
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
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image: string | null | undefined;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: string;
                user: {
                    id: string;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image: string | null | undefined;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    token: z.ZodString;
                    callbackURL: z.ZodOptional<z.ZodString>;
                    errorCallbackURL: z.ZodOptional<z.ZodString>;
                    newUserCallbackURL: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                requireHeaders: true;
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
            path: "/magic-link/verify";
        };
    };
    rateLimit: {
        pathMatcher(path: string): boolean;
        window: number;
        max: number;
    }[];
};

export { magicLink };
