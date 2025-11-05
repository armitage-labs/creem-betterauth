import * as better_call from 'better-call';
import * as _better_auth_core_oauth2 from '@better-auth/core/oauth2';
import { OAuth2Tokens, OAuth2UserInfo, OAuthProvider } from '@better-auth/core/oauth2';
import * as _better_auth_core from '@better-auth/core';
import { GenericEndpointContext } from '@better-auth/core';
import * as z from 'zod';
import { User } from '@better-auth/core/db';

/**
 * Configuration interface for generic OAuth providers.
 */
interface GenericOAuthConfig {
    /** Unique identifier for the OAuth provider */
    providerId: string;
    /**
     * URL to fetch OAuth 2.0 configuration.
     * If provided, the authorization and token endpoints will be fetched from this URL.
     */
    discoveryUrl?: string;
    /**
     * URL for the authorization endpoint.
     * Optional if using discoveryUrl.
     */
    authorizationUrl?: string;
    /**
     * URL for the token endpoint.
     * Optional if using discoveryUrl.
     */
    tokenUrl?: string;
    /**
     * URL for the user info endpoint.
     * Optional if using discoveryUrl.
     */
    userInfoUrl?: string;
    /** OAuth client ID */
    clientId: string;
    /** OAuth client secret */
    clientSecret?: string;
    /**
     * Array of OAuth scopes to request.
     * @default []
     */
    scopes?: string[];
    /**
     * Custom redirect URI.
     * If not provided, a default URI will be constructed.
     */
    redirectURI?: string;
    /**
     * OAuth response type.
     * @default "code"
     */
    responseType?: string;
    /**
     * The response mode to use for the authorization code request.

     */
    responseMode?: "query" | "form_post";
    /**
     * Prompt parameter for the authorization request.
     * Controls the authentication experience for the user.
     */
    prompt?: "none" | "login" | "consent" | "select_account";
    /**
     * Whether to use PKCE (Proof Key for Code Exchange)
     * @default false
     */
    pkce?: boolean;
    /**
     * Access type for the authorization request.
     * Use "offline" to request a refresh token.
     */
    accessType?: string;
    /**
     * Custom function to fetch user info.
     * If provided, this function will be used instead of the default user info fetching logic.
     * @param tokens - The OAuth tokens received after successful authentication
     * @returns A promise that resolves to a User object or null
     */
    getUserInfo?: (tokens: OAuth2Tokens) => Promise<OAuth2UserInfo | null>;
    /**
     * Custom function to map the user profile to a User object.
     */
    mapProfileToUser?: (profile: Record<string, any>) => Partial<Partial<User>> | Promise<Partial<User>>;
    /**
     * Additional search-params to add to the authorizationUrl.
     * Warning: Search-params added here overwrite any default params.
     */
    authorizationUrlParams?: Record<string, string> | ((ctx: GenericEndpointContext) => Record<string, string>);
    /**
     * Additional search-params to add to the tokenUrl.
     * Warning: Search-params added here overwrite any default params.
     */
    tokenUrlParams?: Record<string, string> | ((ctx: GenericEndpointContext) => Record<string, string>);
    /**
     * Disable implicit sign up for new users. When set to true for the provider,
     * sign-in need to be called with with requestSignUp as true to create new users.
     */
    disableImplicitSignUp?: boolean;
    /**
     * Disable sign up for new users.
     */
    disableSignUp?: boolean;
    /**
     * Authentication method for token requests.
     * @default "post"
     */
    authentication?: "basic" | "post";
    /**
     * Custom headers to include in the discovery request.
     * Useful for providers like Epic that require specific headers (e.g., Epic-Client-ID).
     */
    discoveryHeaders?: Record<string, string>;
    /**
     * Custom headers to include in the authorization request.
     * Useful for providers like Qonto that require specific headers (e.g., X-Qonto-Staging-Token for local development).
     */
    authorizationHeaders?: Record<string, string>;
    /**
     * Override user info with the provider info.
     *
     * This will update the user info with the provider info,
     * when the user signs in with the provider.
     * @default false
     */
    overrideUserInfo?: boolean;
}
interface GenericOAuthOptions {
    /**
     * Array of OAuth provider configurations.
     */
    config: GenericOAuthConfig[];
}
/**
 * A generic OAuth plugin that can be used to add OAuth support to any provider
 */
declare const genericOAuth: (options: GenericOAuthOptions) => {
    id: "generic-oauth";
    init: (ctx: _better_auth_core.AuthContext) => {
        context: {
            socialProviders: OAuthProvider<Record<string, any>, Partial<_better_auth_core_oauth2.ProviderOptions<any>>>[];
        };
    };
    endpoints: {
        /**
         * ### Endpoint
         *
         * POST `/sign-in/oauth2`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.signInWithOAuth2`
         *
         * **client:**
         * `authClient.signIn.oauth2`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/sign-in#api-method-sign-in-oauth2)
         */
        signInWithOAuth2: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    callbackURL?: string | undefined;
                    errorCallbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                    scopes?: string[] | undefined;
                    requestSignUp?: boolean | undefined;
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
                    url: string;
                    redirect: boolean;
                };
            } : {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    providerId: z.ZodString;
                    callbackURL: z.ZodOptional<z.ZodString>;
                    errorCallbackURL: z.ZodOptional<z.ZodString>;
                    newUserCallbackURL: z.ZodOptional<z.ZodString>;
                    disableRedirect: z.ZodOptional<z.ZodBoolean>;
                    scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    requestSignUp: z.ZodOptional<z.ZodBoolean>;
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
                                                url: {
                                                    type: string;
                                                };
                                                redirect: {
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
            path: "/sign-in/oauth2";
        };
        oAuth2Callback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    code?: string | undefined;
                    error?: string | undefined;
                    error_description?: string | undefined;
                    state?: string | undefined;
                };
            } & {
                params: {
                    providerId: string;
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
                method: "GET";
                query: z.ZodObject<{
                    code: z.ZodOptional<z.ZodString>;
                    error: z.ZodOptional<z.ZodString>;
                    error_description: z.ZodOptional<z.ZodString>;
                    state: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                metadata: {
                    client: boolean;
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
                                                url: {
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
            path: "/oauth2/callback/:providerId";
        };
        /**
         * ### Endpoint
         *
         * POST `/oauth2/link`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.oAuth2LinkAccount`
         *
         * **client:**
         * `authClient.oauth2.link`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/generic-oauth#api-method-oauth2-link)
         */
        oAuth2LinkAccount: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    callbackURL: string;
                    scopes?: string[] | undefined;
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
                    url: string;
                    redirect: boolean;
                };
            } : {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    providerId: z.ZodString;
                    callbackURL: z.ZodString;
                    scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    errorCallbackURL: z.ZodOptional<z.ZodString>;
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
                                                    format: string;
                                                    description: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                    description: string;
                                                    enum: boolean[];
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
            path: "/oauth2/link";
        };
    };
    $ERROR_CODES: {
        readonly INVALID_OAUTH_CONFIGURATION: "Invalid OAuth configuration";
    };
};

export { genericOAuth };
export type { GenericOAuthConfig };
