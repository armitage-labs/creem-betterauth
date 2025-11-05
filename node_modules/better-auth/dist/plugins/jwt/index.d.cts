import * as _better_auth_core from '@better-auth/core';
import { GenericEndpointContext } from '@better-auth/core';
import * as better_call from 'better-call';
import * as jose from 'jose';
import { JWTPayload, JSONWebKeySet } from 'jose';
import { User, Session } from '@better-auth/core/db';
import { A as Awaitable } from '../../shared/better-auth.DNnBkMGu.cjs';
import { I as InferOptionSchema } from '../../shared/better-auth.CtDEK5dv.cjs';
import * as z from 'zod';

declare const schema: {
    jwks: {
        fields: {
            publicKey: {
                type: "string";
                required: true;
            };
            privateKey: {
                type: "string";
                required: true;
            };
            createdAt: {
                type: "date";
                required: true;
            };
        };
    };
};

interface JwtOptions {
    jwks?: {
        /**
         * Disables the /jwks endpoint and uses this endpoint in discovery.
         *
         * Useful if jwks are not managed at /jwks or
         * if your jwks are signed with a certificate and placed on your CDN.
         */
        remoteUrl?: string;
        /**
         * Key pair configuration
         * @description A subset of the options available for the generateKeyPair function
         *
         * @see https://github.com/panva/jose/blob/main/src/runtime/node/generate.ts
         *
         * @default { alg: 'EdDSA', crv: 'Ed25519' }
         */
        keyPairConfig?: JWKOptions;
        /**
         * Disable private key encryption
         * @description Disable the encryption of the private key in the database
         *
         * @default false
         */
        disablePrivateKeyEncryption?: boolean;
    };
    jwt?: {
        /**
         * The issuer of the JWT
         */
        issuer?: string;
        /**
         * The audience of the JWT
         */
        audience?: string;
        /**
         * Set the "exp" (Expiration Time) Claim.
         *
         * - If a `number` is passed as an argument it is used as the claim directly.
         * - If a `Date` instance is passed as an argument it is converted to unix timestamp and used as the
         *   claim.
         * - If a `string` is passed as an argument it is resolved to a time span, and then added to the
         *   current unix timestamp and used as the claim.
         *
         * Format used for time span should be a number followed by a unit, such as "5 minutes" or "1
         * day".
         *
         * Valid units are: "sec", "secs", "second", "seconds", "s", "minute", "minutes", "min", "mins",
         * "m", "hour", "hours", "hr", "hrs", "h", "day", "days", "d", "week", "weeks", "w", "year",
         * "years", "yr", "yrs", and "y". It is not possible to specify months. 365.25 days is used as an
         * alias for a year.
         *
         * If the string is suffixed with "ago", or prefixed with a "-", the resulting time span gets
         * subtracted from the current unix timestamp. A "from now" suffix can also be used for
         * readability when adding to the current unix timestamp.
         *
         * @default 15m
         */
        expirationTime?: number | string | Date;
        /**
         * A function that is called to define the payload of the JWT
         */
        definePayload?: (session: {
            user: User & Record<string, any>;
            session: Session & Record<string, any>;
        }) => Promise<Record<string, any>> | Record<string, any>;
        /**
         * A function that is called to get the subject of the JWT
         *
         * @default session.user.id
         */
        getSubject?: (session: {
            user: User & Record<string, any>;
            session: Session & Record<string, any>;
        }) => Promise<string> | string;
        /**
         * A custom function to remote sign the jwt payload.
         *
         * All headers, such as `alg` and `kid`,
         * MUST be defined within this function.
         * You can safely define the header `typ: 'JWT'`.
         *
         * @requires jwks.remoteUrl
         * @invalidates other jwt.* options
         */
        sign?: (payload: JWTPayload) => Awaitable<string>;
    };
    /**
     * Disables setting JWTs through middleware.
     *
     * Recommended to set `true` when using an oAuth provider plugin
     * like OIDC or MCP where session payloads should not be signed.
     *
     * @default false
     */
    disableSettingJwtHeader?: boolean;
    /**
     * Custom schema for the admin plugin
     */
    schema?: InferOptionSchema<typeof schema>;
}
/**
 * Asymmetric (JWS) Supported.
 *
 * @see https://github.com/panva/jose/issues/210
 */
type JWKOptions = {
    alg: "EdDSA";
    crv?: "Ed25519";
} | {
    alg: "ES256";
    crv?: never;
} | {
    alg: "ES512";
    crv?: never;
} | {
    alg: "PS256";
    modulusLength?: number;
} | {
    alg: "RS256";
    modulusLength?: number;
};
type JWSAlgorithms = JWKOptions["alg"];
interface Jwk {
    id: string;
    publicKey: string;
    privateKey: string;
    createdAt: Date;
    alg?: JWSAlgorithms;
    crv?: "Ed25519" | "P-256" | "P-521";
}

declare function getJwtToken(ctx: GenericEndpointContext, options?: JwtOptions): Promise<string>;

declare function generateExportedKeyPair(options?: JwtOptions): Promise<{
    publicWebKey: jose.JWK;
    privateWebKey: jose.JWK;
    alg: "EdDSA" | "ES256" | "ES512" | "PS256" | "RS256";
    cfg: {
        crv?: "Ed25519";
    } | {
        crv?: never;
    } | {
        crv?: never;
    } | {
        modulusLength?: number;
    } | {
        modulusLength?: number;
    };
}>;
/**
 * Creates a Jwk on the database
 *
 * @param ctx
 * @param options
 * @returns
 */
declare function createJwk(ctx: GenericEndpointContext, options?: JwtOptions): Promise<Jwk>;

declare const jwt: (options?: JwtOptions) => {
    id: "jwt";
    options: JwtOptions | undefined;
    endpoints: {
        getJwks: {
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
                response: JSONWebKeySet;
            } : JSONWebKeySet>;
            options: {
                method: "GET";
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
                                                keys: {
                                                    type: string;
                                                    description: string;
                                                    items: {
                                                        type: string;
                                                        properties: {
                                                            kid: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            kty: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            alg: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            use: {
                                                                type: string;
                                                                description: string;
                                                                enum: string[];
                                                                nullable: boolean;
                                                            };
                                                            n: {
                                                                type: string;
                                                                description: string;
                                                                nullable: boolean;
                                                            };
                                                            e: {
                                                                type: string;
                                                                description: string;
                                                                nullable: boolean;
                                                            };
                                                            crv: {
                                                                type: string;
                                                                description: string;
                                                                nullable: boolean;
                                                            };
                                                            x: {
                                                                type: string;
                                                                description: string;
                                                                nullable: boolean;
                                                            };
                                                            y: {
                                                                type: string;
                                                                description: string;
                                                                nullable: boolean;
                                                            };
                                                        };
                                                        required: string[];
                                                    };
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
            path: "/jwks";
        };
        getToken: {
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
                response: {
                    token: string;
                };
            } : {
                token: string;
            }>;
            options: {
                method: "GET";
                requireHeaders: true;
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
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
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
            path: "/token";
        };
        signJWT: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    payload: JWTPayload;
                    overrideOptions?: JwtOptions;
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
                };
            } : {
                token: string;
            }>;
            options: {
                method: "POST";
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            payload: JWTPayload;
                            overrideOptions?: JwtOptions;
                        };
                    };
                };
                body: z.ZodObject<{
                    payload: z.ZodRecord<z.ZodString, z.ZodAny>;
                    overrideOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                }, z.core.$strip>;
            } & {
                use: any[];
            };
            path: "/sign-jwt";
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
    schema: {
        jwks: {
            fields: {
                publicKey: {
                    type: "string";
                    required: true;
                };
                privateKey: {
                    type: "string";
                    required: true;
                };
                createdAt: {
                    type: "date";
                    required: true;
                };
            };
        };
    };
};

export { createJwk, generateExportedKeyPair, getJwtToken, jwt };
export type { JWKOptions, JWSAlgorithms, Jwk, JwtOptions };
