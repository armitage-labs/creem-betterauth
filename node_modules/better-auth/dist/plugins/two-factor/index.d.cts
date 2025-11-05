import * as _better_fetch_fetch from '@better-fetch/fetch';
import * as _better_auth_core from '@better-auth/core';
import * as better_call from 'better-call';
import * as z from 'zod';
import { User } from '@better-auth/core/db';
import { L as LiteralString } from '../../shared/better-auth.DNnBkMGu.cjs';
import { AuthEndpoint } from '@better-auth/core/middleware';
import { I as InferOptionSchema } from '../../shared/better-auth.CtDEK5dv.cjs';

interface BackupCodeOptions {
    /**
     * The amount of backup codes to generate
     *
     * @default 10
     */
    amount?: number;
    /**
     * The length of the backup codes
     *
     * @default 10
     */
    length?: number;
    /**
     * An optional custom function to generate backup codes
     */
    customBackupCodesGenerate?: () => string[];
    /**
     * How to store the backup codes in the database, whether encrypted or plain.
     */
    storeBackupCodes?: "plain" | "encrypted" | {
        encrypt: (token: string) => Promise<string>;
        decrypt: (token: string) => Promise<string>;
    };
}

interface OTPOptions {
    /**
     * How long the opt will be valid for in
     * minutes
     *
     * @default "3 mins"
     */
    period?: number;
    /**
     * Number of digits for the OTP code
     *
     * @default 6
     */
    digits?: number;
    /**
     * Send the otp to the user
     *
     * @param user - The user to send the otp to
     * @param otp - The otp to send
     * @param request - The request object
     * @returns void | Promise<void>
     */
    sendOTP?: (
    /**
     * The user to send the otp to
     * @type UserWithTwoFactor
     * @default UserWithTwoFactors
     */
    data: {
        user: UserWithTwoFactor;
        otp: string;
    }, 
    /**
     * The request object
     */
    request?: Request) => Promise<void> | void;
    /**
     * The number of allowed attempts for the OTP
     *
     * @default 5
     */
    allowedAttempts?: number;
    storeOTP?: "plain" | "encrypted" | "hashed" | {
        hash: (token: string) => Promise<string>;
    } | {
        encrypt: (token: string) => Promise<string>;
        decrypt: (token: string) => Promise<string>;
    };
}

type TOTPOptions = {
    /**
     * Issuer
     */
    issuer?: string;
    /**
     * How many digits the otp to be
     *
     * @default 6
     */
    digits?: 6 | 8;
    /**
     * Period for otp in seconds.
     * @default 30
     */
    period?: number;
    /**
     * Backup codes configuration
     */
    backupCodes?: BackupCodeOptions;
    /**
     * Disable totp
     */
    disable?: boolean;
};

declare const schema: {
    user: {
        fields: {
            twoFactorEnabled: {
                type: "boolean";
                required: false;
                defaultValue: false;
                input: false;
            };
        };
    };
    twoFactor: {
        fields: {
            secret: {
                type: "string";
                required: true;
                returned: false;
            };
            backupCodes: {
                type: "string";
                required: true;
                returned: false;
            };
            userId: {
                type: "string";
                required: true;
                returned: false;
                references: {
                    model: string;
                    field: string;
                };
            };
        };
    };
};

interface TwoFactorOptions {
    /**
     * Application Name
     */
    issuer?: string;
    /**
     * TOTP OPtions
     */
    totpOptions?: Omit<TOTPOptions, "issuer">;
    /**
     * OTP Options
     */
    otpOptions?: OTPOptions;
    /**
     * Backup code options
     */
    backupCodeOptions?: BackupCodeOptions;
    /**
     * Skip verification on enabling two factor authentication.
     * @default false
     */
    skipVerificationOnEnable?: boolean;
    /**
     * Custom schema for the two factor plugin
     */
    schema?: InferOptionSchema<typeof schema>;
}
interface UserWithTwoFactor extends User {
    /**
     * If the user has enabled two factor authentication.
     */
    twoFactorEnabled: boolean;
}
interface TwoFactorProvider {
    id: LiteralString;
    endpoints?: Record<string, AuthEndpoint>;
}
interface TwoFactorTable {
    userId: string;
    secret: string;
    backupCodes: string;
    enabled: boolean;
}

declare const TWO_FACTOR_ERROR_CODES: {
    readonly OTP_NOT_ENABLED: "OTP not enabled";
    readonly OTP_HAS_EXPIRED: "OTP has expired";
    readonly TOTP_NOT_ENABLED: "TOTP not enabled";
    readonly TWO_FACTOR_NOT_ENABLED: "Two factor isn't enabled";
    readonly BACKUP_CODES_NOT_ENABLED: "Backup codes aren't enabled";
    readonly INVALID_BACKUP_CODE: "Invalid backup code";
    readonly INVALID_CODE: "Invalid code";
    readonly TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "Too many attempts. Please request a new code.";
    readonly INVALID_TWO_FACTOR_COOKIE: "Invalid two factor cookie";
};

declare const twoFactor: (options?: TwoFactorOptions) => {
    id: "two-factor";
    endpoints: {
        /**
         * ### Endpoint
         *
         * POST `/two-factor/enable`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.enableTwoFactor`
         *
         * **client:**
         * `authClient.twoFactor.enable`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-enable)
         */
        enableTwoFactor: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    password: string;
                    issuer?: string | undefined;
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
                    totpURI: string;
                    backupCodes: string[];
                };
            } : {
                totpURI: string;
                backupCodes: string[];
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    password: z.ZodString;
                    issuer: z.ZodOptional<z.ZodString>;
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
                                                totpURI: {
                                                    type: string;
                                                    description: string;
                                                };
                                                backupCodes: {
                                                    type: string;
                                                    items: {
                                                        type: string;
                                                    };
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
            path: "/two-factor/enable";
        };
        /**
         * ### Endpoint
         *
         * POST `/two-factor/disable`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.disableTwoFactor`
         *
         * **client:**
         * `authClient.twoFactor.disable`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-disable)
         */
        disableTwoFactor: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
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
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    password: z.ZodString;
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
            path: "/two-factor/disable";
        };
        verifyBackupCode: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    code: string;
                    disableSession?: boolean | undefined;
                    trustDevice?: boolean | undefined;
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
                    token: string | undefined;
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
                token: string | undefined;
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
                    code: z.ZodString;
                    disableSession: z.ZodOptional<z.ZodBoolean>;
                    trustDevice: z.ZodOptional<z.ZodBoolean>;
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
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        twoFactorEnabled: {
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
                                                    description: string;
                                                };
                                                session: {
                                                    type: string;
                                                    properties: {
                                                        token: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        expiresAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
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
            path: "/two-factor/verify-backup-code";
        };
        generateBackupCodes: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
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
                    status: boolean;
                    backupCodes: string[];
                };
            } : {
                status: boolean;
                backupCodes: string[];
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    password: z.ZodString;
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
                                                    description: string;
                                                    enum: boolean[];
                                                };
                                                backupCodes: {
                                                    type: string;
                                                    items: {
                                                        type: string;
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
            path: "/two-factor/generate-backup-codes";
        };
        viewBackupCodes: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    userId: unknown;
                };
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
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                    backupCodes: string[];
                };
            } : {
                status: boolean;
                backupCodes: string[];
            }>;
            options: {
                method: "GET";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                metadata: {
                    SERVER_ONLY: true;
                };
            } & {
                use: any[];
            };
            path: "/two-factor/view-backup-codes";
        };
        sendTwoFactorOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: {
                    trustDevice?: boolean | undefined;
                } | undefined;
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
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodOptional<z.ZodObject<{
                    trustDevice: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>>;
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
            path: "/two-factor/send-otp";
        };
        verifyTwoFactorOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    code: string;
                    trustDevice?: boolean | undefined;
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
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    code: z.ZodString;
                    trustDevice: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        summary: string;
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
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        image: {
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
                                                    };
                                                    required: string[];
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
            path: "/two-factor/verify-otp";
        };
        generateTOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    secret: string;
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
                    code: string;
                };
            } : {
                code: string;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    secret: z.ZodString;
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
                                                code: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    SERVER_ONLY: true;
                };
            } & {
                use: any[];
            };
            path: "/totp/generate";
        };
        getTOTPURI: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
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
                    totpURI: string;
                };
            } : {
                totpURI: string;
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
                    password: z.ZodString;
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
                                                totpURI: {
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
            path: "/two-factor/get-totp-uri";
        };
        verifyTOTP: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    code: string;
                    trustDevice?: boolean | undefined;
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
                    code: z.ZodString;
                    trustDevice: z.ZodOptional<z.ZodBoolean>;
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
            path: "/two-factor/verify-totp";
        };
    };
    options: TwoFactorOptions | undefined;
    hooks: {
        after: {
            matcher(context: better_call.EndpointContext<string, any> & Omit<better_call.InputContext<string, any>, "method"> & {
                context: _better_auth_core.AuthContext & {
                    returned?: unknown;
                    responseHeaders?: Headers;
                };
                headers?: Headers;
            }): boolean;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                twoFactorRedirect: boolean;
            } | undefined>;
        }[];
    };
    schema: {
        user: {
            fields: {
                twoFactorEnabled: {
                    type: "boolean";
                    required: false;
                    defaultValue: false;
                    input: false;
                };
            };
        };
        twoFactor: {
            fields: {
                secret: {
                    type: "string";
                    required: true;
                    returned: false;
                };
                backupCodes: {
                    type: "string";
                    required: true;
                    returned: false;
                };
                userId: {
                    type: "string";
                    required: true;
                    returned: false;
                    references: {
                        model: string;
                        field: string;
                    };
                };
            };
        };
    };
    rateLimit: {
        pathMatcher(path: string): boolean;
        window: number;
        max: number;
    }[];
    $ERROR_CODES: {
        readonly OTP_NOT_ENABLED: "OTP not enabled";
        readonly OTP_HAS_EXPIRED: "OTP has expired";
        readonly TOTP_NOT_ENABLED: "TOTP not enabled";
        readonly TWO_FACTOR_NOT_ENABLED: "Two factor isn't enabled";
        readonly BACKUP_CODES_NOT_ENABLED: "Backup codes aren't enabled";
        readonly INVALID_BACKUP_CODE: "Invalid backup code";
        readonly INVALID_CODE: "Invalid code";
        readonly TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "Too many attempts. Please request a new code.";
        readonly INVALID_TWO_FACTOR_COOKIE: "Invalid two factor cookie";
    };
};

declare const twoFactorClient: (options?: {
    /**
     * a redirect function to call if a user needs to verify
     * their two factor
     */
    onTwoFactorRedirect?: () => void | Promise<void>;
}) => {
    id: "two-factor";
    $InferServerPlugin: ReturnType<typeof twoFactor>;
    atomListeners: {
        matcher: (path: string) => boolean;
        signal: "$sessionSignal";
    }[];
    pathMethods: {
        "/two-factor/disable": "POST";
        "/two-factor/enable": "POST";
        "/two-factor/send-otp": "POST";
        "/two-factor/generate-backup-codes": "POST";
    };
    fetchPlugins: {
        id: string;
        name: string;
        hooks: {
            onSuccess(context: _better_fetch_fetch.SuccessContext<any>): Promise<void>;
        };
    }[];
};

export { TWO_FACTOR_ERROR_CODES, twoFactor, twoFactorClient };
export type { TwoFactorOptions, TwoFactorProvider, TwoFactorTable, UserWithTwoFactor };
