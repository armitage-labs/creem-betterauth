import * as better_call from 'better-call';
import * as z from 'zod';
import { GenericEndpointContext } from '@better-auth/core';
import { User, Session } from '@better-auth/core/db';

interface OneTimeTokenOptions {
    /**
     * Expires in minutes
     *
     * @default 3
     */
    expiresIn?: number;
    /**
     * Only allow server initiated requests
     */
    disableClientRequest?: boolean;
    /**
     * Generate a custom token
     */
    generateToken?: (session: {
        user: User & Record<string, any>;
        session: Session & Record<string, any>;
    }, ctx: GenericEndpointContext) => Promise<string>;
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
declare const oneTimeToken: (options?: OneTimeTokenOptions) => {
    id: "one-time-token";
    endpoints: {
        /**
         * ### Endpoint
         *
         * GET `/one-time-token/generate`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.generateOneTimeToken`
         *
         * **client:**
         * `authClient.oneTimeToken.generate`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/one-time-token#api-method-one-time-token-generate)
         */
        generateOneTimeToken: {
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
                    token: string;
                };
            } : {
                token: string;
            }>;
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
            } & {
                use: any[];
            };
            path: "/one-time-token/generate";
        };
        /**
         * ### Endpoint
         *
         * POST `/one-time-token/verify`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.verifyOneTimeToken`
         *
         * **client:**
         * `authClient.oneTimeToken.verify`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/one-time-token#api-method-one-time-token-verify)
         */
        verifyOneTimeToken: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    token: string;
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
                    session: Session & Record<string, any>;
                    user: User & Record<string, any>;
                };
            } : {
                session: Session & Record<string, any>;
                user: User & Record<string, any>;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    token: z.ZodString;
                }, z.core.$strip>;
            } & {
                use: any[];
            };
            path: "/one-time-token/verify";
        };
    };
};

export { oneTimeToken };
