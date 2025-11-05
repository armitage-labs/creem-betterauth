import * as _better_auth_core from '@better-auth/core';
import * as better_call from 'better-call';
import { EndpointContext } from 'better-call';
import * as z from 'zod';

interface OAuthProxyOptions {
    /**
     * The current URL of the application.
     * The plugin will attempt to infer the current URL from your environment
     * by checking the base URL from popular hosting providers,
     * from the request URL if invoked by a client,
     * or as a fallback, from the `baseURL` in your auth config.
     * If the URL is not inferred correctly, you can provide a value here."
     */
    currentURL?: string;
    /**
     * If a request in a production url it won't be proxied.
     *
     * default to `BETTER_AUTH_URL`
     */
    productionURL?: string;
}
/**
 * A proxy plugin, that allows you to proxy OAuth requests.
 * Useful for development and preview deployments where
 * the redirect URL can't be known in advance to add to the OAuth provider.
 */
declare const oAuthProxy: (opts?: OAuthProxyOptions) => {
    id: "oauth-proxy";
    options: OAuthProxyOptions | undefined;
    endpoints: {
        oAuthProxy: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    callbackURL: string;
                    cookies: string;
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
                response: never;
            } : never>;
            options: {
                method: "GET";
                query: z.ZodObject<{
                    callbackURL: z.ZodString;
                    cookies: z.ZodString;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        parameters: {
                            in: "query";
                            name: string;
                            required: true;
                            description: string;
                        }[];
                        responses: {
                            302: {
                                description: string;
                                headers: {
                                    Location: {
                                        description: string;
                                        schema: {
                                            type: string;
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
            path: "/oauth-proxy-callback";
        };
    };
    hooks: {
        after: {
            matcher(context: EndpointContext<string, any> & Omit<better_call.InputContext<string, any>, "method"> & {
                context: _better_auth_core.AuthContext & {
                    returned?: unknown;
                    responseHeaders?: Headers;
                };
                headers?: Headers;
            }): boolean;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
        before: ({
            matcher(): true;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                context: {
                    context: {
                        oauthConfig: {
                            skipStateCookieCheck: boolean;
                        };
                    };
                };
            } | undefined>;
        } | {
            matcher(context: EndpointContext<string, any> & Omit<better_call.InputContext<string, any>, "method"> & {
                context: _better_auth_core.AuthContext & {
                    returned?: unknown;
                    responseHeaders?: Headers;
                };
                headers?: Headers;
            }): boolean;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                context: better_call.MiddlewareContext<better_call.MiddlewareOptions, _better_auth_core.AuthContext<_better_auth_core.BetterAuthOptions> & {
                    returned?: unknown;
                    responseHeaders?: Headers;
                }>;
            } | undefined>;
        })[];
    };
};

export { oAuthProxy };
