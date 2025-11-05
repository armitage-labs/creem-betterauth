import * as better_call from 'better-call';
import * as packages_core_dist_db from 'packages/core/dist/db';
import * as _better_auth_core from '@better-auth/core';
import * as z from 'zod';

interface EmailOTPOptions {
    /**
     * Function to send email verification
     */
    sendVerificationOTP: (data: {
        email: string;
        otp: string;
        type: "sign-in" | "email-verification" | "forget-password";
    }, request?: Request) => Promise<void>;
    /**
     * Length of the OTP
     *
     * @default 6
     */
    otpLength?: number;
    /**
     * Expiry time of the OTP in seconds
     *
     * @default 300 (5 minutes)
     */
    expiresIn?: number;
    /**
     * Custom function to generate otp
     */
    generateOTP?: (data: {
        email: string;
        type: "sign-in" | "email-verification" | "forget-password";
    }, request?: Request) => string | undefined;
    /**
     * Send email verification on sign-up
     *
     * @Default false
     */
    sendVerificationOnSignUp?: boolean;
    /**
     * A boolean value that determines whether to prevent
     * automatic sign-up when the user is not registered.
     *
     * @Default false
     */
    disableSignUp?: boolean;
    /**
     * Allowed attempts for the OTP code
     * @default 3
     */
    allowedAttempts?: number;
    /**
     * Store the OTP in your database in a secure way
     * Note: This will not affect the OTP sent to the user, it will only affect the OTP stored in your database
     *
     * @default "plain"
     */
    storeOTP?: "hashed" | "plain" | "encrypted" | {
        hash: (otp: string) => Promise<string>;
    } | {
        encrypt: (otp: string) => Promise<string>;
        decrypt: (otp: string) => Promise<string>;
    };
    /**
     * Override the default email verification to use email otp instead
     *
     * @default false
     */
    overrideDefaultEmailVerification?: boolean;
}
declare const emailOTP: (options: EmailOTPOptions) => {
    id: "email-otp";
    init(ctx: _better_auth_core.AuthContext): {
        options: {
            emailVerification: {
                sendVerificationEmail(data: {
                    user: packages_core_dist_db.User;
                    url: string;
                    token: string;
                }, request: Request | undefined): Promise<void>;
            };
        };
    } | undefined;
    endpoints: {
        createVerificationOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    type: "sign-in" | "forget-password" | "email-verification";
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
                response: string;
            } : string>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodString;
                    type: z.ZodEnum<{
                        "sign-in": "sign-in";
                        "forget-password": "forget-password";
                        "email-verification": "email-verification";
                    }>;
                }, z.core.$strip>;
                metadata: {
                    SERVER_ONLY: true;
                    openapi: {
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "string";
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
            path: "/email-otp/create-verification-otp";
        };
        /**
         * ### Endpoint
         *
         * GET `/email-otp/get-verification-otp`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getVerificationOTP`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-get-verification-otp)
         */
        getVerificationOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    email: string;
                    type: "sign-in" | "forget-password" | "email-verification";
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
                    otp: null;
                } | {
                    otp: string;
                };
            } : {
                otp: null;
            } | {
                otp: string;
            }>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    email: z.ZodString;
                    type: z.ZodEnum<{
                        "sign-in": "sign-in";
                        "forget-password": "forget-password";
                        "email-verification": "email-verification";
                    }>;
                }, z.core.$strip>;
                metadata: {
                    SERVER_ONLY: true;
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
                                                otp: {
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
            path: "/email-otp/get-verification-otp";
        };
        /**
         * ### Endpoint
         *
         * GET `/email-otp/check-verification-otp`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.checkVerificationOTP`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-check-verification-otp)
         */
        checkVerificationOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    type: "sign-in" | "forget-password" | "email-verification";
                    otp: string;
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
                    email: z.ZodString;
                    type: z.ZodEnum<{
                        "sign-in": "sign-in";
                        "forget-password": "forget-password";
                        "email-verification": "email-verification";
                    }>;
                    otp: z.ZodString;
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
            path: "/email-otp/check-verification-otp";
        };
        /**
         * ### Endpoint
         *
         * POST `/email-otp/verify-email`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.verifyEmailOTP`
         *
         * **client:**
         * `authClient.emailOtp.verifyEmail`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-verify-email)
         */
        verifyEmailOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    otp: string;
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
                    token: string;
                    user: {
                        id: any;
                        email: any;
                        emailVerified: any;
                        name: any;
                        image: any;
                        createdAt: any;
                        updatedAt: any;
                    };
                } | {
                    status: boolean;
                    token: null;
                    user: {
                        id: any;
                        email: any;
                        emailVerified: any;
                        name: any;
                        image: any;
                        createdAt: any;
                        updatedAt: any;
                    };
                };
            } : {
                status: boolean;
                token: string;
                user: {
                    id: any;
                    email: any;
                    emailVerified: any;
                    name: any;
                    image: any;
                    createdAt: any;
                    updatedAt: any;
                };
            } | {
                status: boolean;
                token: null;
                user: {
                    id: any;
                    email: any;
                    emailVerified: any;
                    name: any;
                    image: any;
                    createdAt: any;
                    updatedAt: any;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodString;
                    otp: z.ZodString;
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
                                                    description: string;
                                                    enum: boolean[];
                                                };
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
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
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/email-otp/verify-email";
        };
        /**
         * ### Endpoint
         *
         * POST `/sign-in/email-otp`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.signInEmailOTP`
         *
         * **client:**
         * `authClient.signIn.emailOtp`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-sign-in-email-otp)
         */
        signInEmailOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    otp: string;
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
                method: "POST";
                body: z.ZodObject<{
                    email: z.ZodString;
                    otp: z.ZodString;
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
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/email-otp";
        };
        /**
         * ### Endpoint
         *
         * POST `/forget-password/email-otp`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.forgetPasswordEmailOTP`
         *
         * **client:**
         * `authClient.forgetPassword.emailOtp`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-forget-password-email-otp)
         */
        forgetPasswordEmailOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
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
                    email: z.ZodString;
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
                                                success: {
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
            path: "/forget-password/email-otp";
        };
        /**
         * ### Endpoint
         *
         * POST `/email-otp/reset-password`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.resetPasswordEmailOTP`
         *
         * **client:**
         * `authClient.emailOtp.resetPassword`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-reset-password)
         */
        resetPasswordEmailOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    otp: string;
                    password: string;
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
                    email: z.ZodString;
                    otp: z.ZodString;
                    password: z.ZodString;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                contnt: {
                                    "application/json": {
                                        schema: {
                                            type: string;
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
            path: "/email-otp/reset-password";
        };
        /**
         * ### Endpoint
         *
         * POST `/email-otp/send-verification-otp`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.sendVerificationOTP`
         *
         * **client:**
         * `authClient.emailOtp.sendVerificationOtp`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-send-verification-otp)
         */
        sendVerificationOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    type: "sign-in" | "forget-password" | "email-verification";
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
                    email: z.ZodString;
                    type: z.ZodEnum<{
                        "sign-in": "sign-in";
                        "forget-password": "forget-password";
                        "email-verification": "email-verification";
                    }>;
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
            path: "/email-otp/send-verification-otp";
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
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
    $ERROR_CODES: {
        readonly OTP_EXPIRED: "otp expired";
        readonly INVALID_OTP: "Invalid OTP";
        readonly INVALID_EMAIL: "Invalid email";
        readonly USER_NOT_FOUND: "User not found";
        readonly TOO_MANY_ATTEMPTS: "Too many attempts";
    };
    rateLimit: ({
        pathMatcher(path: string): path is "/email-otp/send-verification-otp";
        window: number;
        max: number;
    } | {
        pathMatcher(path: string): path is "/email-otp/check-verification-otp";
        window: number;
        max: number;
    } | {
        pathMatcher(path: string): path is "/email-otp/verify-email";
        window: number;
        max: number;
    } | {
        pathMatcher(path: string): path is "/sign-in/email-otp";
        window: number;
        max: number;
    })[];
};

export { emailOTP };
export type { EmailOTPOptions };
