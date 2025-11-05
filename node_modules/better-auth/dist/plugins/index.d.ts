export { InferInvitation, InferMember, InferOrganization, InferOrganizationRolesFromOption, InferOrganizationZodRolesFromOption, InferTeam, Invitation, InvitationInput, InvitationStatus, Member, MemberInput, Organization, OrganizationInput, OrganizationOptions, OrganizationRole, Team, TeamInput, TeamMember, TeamMemberInput, defaultRolesSchema, invitationSchema, invitationStatus, memberSchema, organization, organizationRoleSchema, organizationSchema, parseRoles, role, teamMemberSchema, teamSchema } from './organization/index.js';
export { adminAc, defaultAc, defaultRoles, defaultStatements, memberAc, ownerAc } from './organization/access/index.js';
export { TWO_FACTOR_ERROR_CODES, TwoFactorOptions, TwoFactorProvider, TwoFactorTable, UserWithTwoFactor, twoFactor, twoFactorClient } from './two-factor/index.js';
export { USERNAME_ERROR_CODES, UsernameOptions, username } from './username/index.js';
export { bearer } from './bearer/index.js';
export { I as InferOptionSchema, a as InferPluginErrorCodes } from '../shared/better-auth.DyhDNJOb.js';
export { H as HIDE_METADATA } from '../shared/better-auth.DEHJp1rk.js';
export { magicLink } from './magic-link/index.js';
export { PhoneNumberOptions, UserWithPhoneNumber, phoneNumber } from './phone-number/index.js';
export { AnonymousOptions, UserWithAnonymous, anonymous } from './anonymous/index.js';
export { AdminOptions, InferAdminRolesFromOption, SessionWithImpersonatedBy, UserWithRole, admin } from './admin/index.js';
export { GenericOAuthConfig, genericOAuth } from './generic-oauth/index.js';
export { JWKOptions, JWSAlgorithms, Jwk, JwtOptions, createJwk, generateExportedKeyPair, getJwtToken, jwt } from './jwt/index.js';
export { multiSession } from './multi-session/index.js';
export { EmailOTPOptions, emailOTP } from './email-otp/index.js';
export { oneTap } from './one-tap/index.js';
export { oAuthProxy } from './oauth-proxy/index.js';
export { CustomSessionPluginOptions, customSession } from './custom-session/index.js';
export { OpenAPIOptions, Path, generator, openAPI } from './open-api/index.js';
import { OIDCOptions, OIDCMetadata, OAuthAccessToken } from './oidc-provider/index.js';
export { AuthorizationQuery, Client, CodeVerificationValue, TokenBody, getClient, getMetadata, oidcProvider } from './oidc-provider/index.js';
export { captcha } from './captcha/index.js';
export { A as API_KEY_TABLE_NAME, E as ERROR_CODES, a as apiKey, d as defaultKeyHasher } from '../shared/better-auth.CKP88w2n.js';
export { HaveIBeenPwnedOptions, haveIBeenPwned } from './haveibeenpwned/index.js';
export { oneTimeToken } from './one-time-token/index.js';
import * as better_call from 'better-call';
import * as z from 'zod';
import * as _better_auth_core from '@better-auth/core';
import { GenericEndpointContext, BetterAuthOptions } from '@better-auth/core';
export { SIWEPluginOptions, siwe } from './siwe/index.js';
export { $deviceAuthorizationOptionsSchema, DeviceAuthorizationOptions, deviceAuthorization, deviceAuthorizationClient } from './device-authorization/index.js';
export { AuthEndpoint, AuthMiddleware, createAuthEndpoint, createAuthMiddleware, optionsMiddleware } from '@better-auth/core/middleware';
import '../shared/better-auth.DNnBkMGu.js';
import '@better-auth/core/db';
import './access/index.js';
import '../shared/better-auth.kD29xbrE.js';
import 'packages/core/dist/db';
import 'packages/core/dist';
import '@better-fetch/fetch';
import '@better-auth/core/oauth2';
import 'jose';
import '../shared/better-auth.BUpnjBGu.js';
import 'packages/core/dist/oauth2';
import '@better-auth/core/env';
import '@better-auth/core/error';
import 'zod/v4/core';

interface MCPOptions {
    loginPage: string;
    resource?: string;
    oidcConfig?: OIDCOptions;
}
declare const getMCPProviderMetadata: (ctx: GenericEndpointContext, options?: OIDCOptions) => OIDCMetadata;
declare const getMCPProtectedResourceMetadata: (ctx: GenericEndpointContext, options?: MCPOptions) => {
    resource: string;
    authorization_servers: string[];
    jwks_uri: string;
    scopes_supported: string[];
    bearer_methods_supported: string[];
    resource_signing_alg_values_supported: string[];
};
declare const mcp: (options: MCPOptions) => {
    id: "mcp";
    hooks: {
        after: {
            matcher(): true;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
    endpoints: {
        getMcpOAuthConfig: {
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
                response: OIDCMetadata | null;
            } : OIDCMetadata | null>;
            options: {
                method: "GET";
                metadata: {
                    client: boolean;
                };
            } & {
                use: any[];
            };
            path: "/.well-known/oauth-authorization-server";
        };
        getMCPProtectedResource: {
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
                    resource: string;
                    authorization_servers: string[];
                    jwks_uri: string;
                    scopes_supported: string[];
                    bearer_methods_supported: string[];
                    resource_signing_alg_values_supported: string[];
                };
            } : {
                resource: string;
                authorization_servers: string[];
                jwks_uri: string;
                scopes_supported: string[];
                bearer_methods_supported: string[];
                resource_signing_alg_values_supported: string[];
            }>;
            options: {
                method: "GET";
                metadata: {
                    client: boolean;
                };
            } & {
                use: any[];
            };
            path: "/.well-known/oauth-protected-resource";
        };
        mcpOAuthAuthorize: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: Record<string, any>;
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
                response: void;
            } : void>;
            options: {
                method: "GET";
                query: z.ZodRecord<z.ZodString, z.ZodAny>;
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
                                            additionalProperties: boolean;
                                            description: string;
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
            path: "/mcp/authorize";
        };
        mcpOAuthToken: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: Record<any, any>;
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
                    access_token: string;
                    token_type: string;
                    expires_in: number;
                    refresh_token: string;
                    scope: string;
                } | {
                    access_token: string;
                    token_type: string;
                    expires_in: number;
                    refresh_token: string | undefined;
                    scope: string;
                    id_token: string | undefined;
                };
            } : {
                access_token: string;
                token_type: string;
                expires_in: number;
                refresh_token: string;
                scope: string;
            } | {
                access_token: string;
                token_type: string;
                expires_in: number;
                refresh_token: string | undefined;
                scope: string;
                id_token: string | undefined;
            }>;
            options: {
                method: "POST";
                body: z.ZodRecord<z.ZodAny, z.ZodAny>;
                metadata: {
                    isAction: boolean;
                };
            } & {
                use: any[];
            };
            path: "/mcp/token";
        };
        registerMcpClient: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    redirect_uris: string[];
                    token_endpoint_auth_method?: "none" | "client_secret_basic" | "client_secret_post" | undefined;
                    grant_types?: ("password" | "authorization_code" | "refresh_token" | "implicit" | "client_credentials" | "urn:ietf:params:oauth:grant-type:jwt-bearer" | "urn:ietf:params:oauth:grant-type:saml2-bearer")[] | undefined;
                    response_types?: ("token" | "code")[] | undefined;
                    client_name?: string | undefined;
                    client_uri?: string | undefined;
                    logo_uri?: string | undefined;
                    scope?: string | undefined;
                    contacts?: string[] | undefined;
                    tos_uri?: string | undefined;
                    policy_uri?: string | undefined;
                    jwks_uri?: string | undefined;
                    jwks?: Record<string, any> | undefined;
                    metadata?: Record<any, any> | undefined;
                    software_id?: string | undefined;
                    software_version?: string | undefined;
                    software_statement?: string | undefined;
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
                response: Response;
            } : Response>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    redirect_uris: z.ZodArray<z.ZodString>;
                    token_endpoint_auth_method: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
                        none: "none";
                        client_secret_basic: "client_secret_basic";
                        client_secret_post: "client_secret_post";
                    }>>>;
                    grant_types: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<{
                        password: "password";
                        authorization_code: "authorization_code";
                        refresh_token: "refresh_token";
                        implicit: "implicit";
                        client_credentials: "client_credentials";
                        "urn:ietf:params:oauth:grant-type:jwt-bearer": "urn:ietf:params:oauth:grant-type:jwt-bearer";
                        "urn:ietf:params:oauth:grant-type:saml2-bearer": "urn:ietf:params:oauth:grant-type:saml2-bearer";
                    }>>>>;
                    response_types: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<{
                        token: "token";
                        code: "code";
                    }>>>>;
                    client_name: z.ZodOptional<z.ZodString>;
                    client_uri: z.ZodOptional<z.ZodString>;
                    logo_uri: z.ZodOptional<z.ZodString>;
                    scope: z.ZodOptional<z.ZodString>;
                    contacts: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    tos_uri: z.ZodOptional<z.ZodString>;
                    policy_uri: z.ZodOptional<z.ZodString>;
                    jwks_uri: z.ZodOptional<z.ZodString>;
                    jwks: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodAny, z.ZodAny>>;
                    software_id: z.ZodOptional<z.ZodString>;
                    software_version: z.ZodOptional<z.ZodString>;
                    software_statement: z.ZodOptional<z.ZodString>;
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
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                icon: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                metadata: {
                                                    type: string;
                                                    additionalProperties: boolean;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                clientId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                clientSecret: {
                                                    type: string;
                                                    description: string;
                                                };
                                                redirectURLs: {
                                                    type: string;
                                                    items: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                    description: string;
                                                };
                                                type: {
                                                    type: string;
                                                    description: string;
                                                    enum: string[];
                                                };
                                                authenticationScheme: {
                                                    type: string;
                                                    description: string;
                                                    enum: string[];
                                                };
                                                disabled: {
                                                    type: string;
                                                    description: string;
                                                    enum: boolean[];
                                                };
                                                userId: {
                                                    type: string;
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
            path: "/mcp/register";
        };
        getMcpSession: {
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
                response: OAuthAccessToken | null;
            } : OAuthAccessToken | null>;
            options: {
                method: "GET";
                requireHeaders: true;
            } & {
                use: any[];
            };
            path: "/mcp/get-session";
        };
    };
    schema: {
        oauthApplication: {
            modelName: string;
            fields: {
                name: {
                    type: "string";
                };
                icon: {
                    type: "string";
                    required: false;
                };
                metadata: {
                    type: "string";
                    required: false;
                };
                clientId: {
                    type: "string";
                    unique: true;
                };
                clientSecret: {
                    type: "string";
                    required: false;
                };
                redirectURLs: {
                    type: "string";
                };
                type: {
                    type: "string";
                };
                disabled: {
                    type: "boolean";
                    required: false;
                    defaultValue: false;
                };
                userId: {
                    type: "string";
                    required: false;
                    references: {
                        model: string;
                        field: string;
                        onDelete: "cascade";
                    };
                };
                createdAt: {
                    type: "date";
                };
                updatedAt: {
                    type: "date";
                };
            };
        };
        oauthAccessToken: {
            modelName: string;
            fields: {
                accessToken: {
                    type: "string";
                    unique: true;
                };
                refreshToken: {
                    type: "string";
                    unique: true;
                };
                accessTokenExpiresAt: {
                    type: "date";
                };
                refreshTokenExpiresAt: {
                    type: "date";
                };
                clientId: {
                    type: "string";
                    references: {
                        model: string;
                        field: string;
                        onDelete: "cascade";
                    };
                };
                userId: {
                    type: "string";
                    required: false;
                    references: {
                        model: string;
                        field: string;
                        onDelete: "cascade";
                    };
                };
                scopes: {
                    type: "string";
                };
                createdAt: {
                    type: "date";
                };
                updatedAt: {
                    type: "date";
                };
            };
        };
        oauthConsent: {
            modelName: string;
            fields: {
                clientId: {
                    type: "string";
                    references: {
                        model: string;
                        field: string;
                        onDelete: "cascade";
                    };
                };
                userId: {
                    type: "string";
                    references: {
                        model: string;
                        field: string;
                        onDelete: "cascade";
                    };
                };
                scopes: {
                    type: "string";
                };
                createdAt: {
                    type: "date";
                };
                updatedAt: {
                    type: "date";
                };
                consentGiven: {
                    type: "boolean";
                };
            };
        };
    };
};
declare const withMcpAuth: <Auth extends {
    api: {
        getMcpSession: (...args: any) => Promise<OAuthAccessToken | null>;
    };
    options: BetterAuthOptions;
}>(auth: Auth, handler: (req: Request, sesssion: OAuthAccessToken) => Response | Promise<Response>) => (req: Request) => Promise<Response>;
declare const oAuthDiscoveryMetadata: <Auth extends {
    api: {
        getMcpOAuthConfig: (...args: any) => any;
    };
}>(auth: Auth) => (request: Request) => Promise<Response>;
declare const oAuthProtectedResourceMetadata: <Auth extends {
    api: {
        getMCPProtectedResource: (...args: any) => any;
    };
}>(auth: Auth) => (request: Request) => Promise<Response>;

/**
 * Configuration for tracking different authentication methods
 */
interface LastLoginMethodOptions {
    /**
     * Name of the cookie to store the last login method
     * @default "better-auth.last_used_login_method"
     */
    cookieName?: string;
    /**
     * Cookie expiration time in seconds
     * @default 2592000 (30 days)
     */
    maxAge?: number;
    /**
     * Custom method to resolve the last login method
     * @param ctx - The context from the hook
     * @returns The last login method
     */
    customResolveMethod?: (ctx: GenericEndpointContext) => string | null;
    /**
     * Store the last login method in the database. This will create a new field in the user table.
     * @default false
     */
    storeInDatabase?: boolean;
    /**
     * Custom schema for the plugin
     * @default undefined
     */
    schema?: {
        user?: {
            lastLoginMethod?: string;
        };
    };
}
/**
 * Plugin to track the last used login method
 */
declare const lastLoginMethod: <O extends LastLoginMethodOptions>(userConfig?: O) => {
    id: "last-login-method";
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
                        } & Record<string, unknown>, context: GenericEndpointContext<_better_auth_core.BetterAuthOptions> | undefined): Promise<{
                            data: {
                                lastLoginMethod: any;
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        } | undefined>;
                    };
                };
                session: {
                    create: {
                        after(session: {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        } & Record<string, unknown>, context: GenericEndpointContext<_better_auth_core.BetterAuthOptions> | undefined): Promise<void>;
                    };
                };
            };
        };
    };
    hooks: {
        after: {
            matcher(): true;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
    schema: O["storeInDatabase"] extends true ? {
        user: {
            fields: {
                lastLoginMethod: {
                    type: "string";
                    required: false;
                    input: false;
                };
            };
        };
    } : undefined;
};

export { OAuthAccessToken, OIDCMetadata, OIDCOptions, getMCPProtectedResourceMetadata, getMCPProviderMetadata, lastLoginMethod, mcp, oAuthDiscoveryMetadata, oAuthProtectedResourceMetadata, withMcpAuth };
export type { LastLoginMethodOptions };
