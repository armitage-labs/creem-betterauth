import * as better_call from 'better-call';
import * as z from 'zod';
import { I as InferOptionSchema } from '../../shared/better-auth.DyhDNJOb.js';
import '../../shared/better-auth.DNnBkMGu.js';
import '@better-auth/core/db';
import '@better-auth/core';

interface CacaoHeader {
    t: "caip122";
}
interface CacaoPayload {
    domain: string;
    aud: string;
    nonce: string;
    iss: string;
    version?: string;
    iat?: string;
    nbf?: string;
    exp?: string;
    statement?: string;
    requestId?: string;
    resources?: string[];
    type?: string;
}
interface Cacao {
    h: CacaoHeader;
    p: CacaoPayload;
    s: {
        t: "eip191" | "eip1271";
        s: string;
        m?: string;
    };
}
interface SIWEVerifyMessageArgs {
    message: string;
    signature: string;
    address: string;
    chainId: number;
    cacao?: Cacao;
}
interface ENSLookupArgs {
    walletAddress: string;
}
interface ENSLookupResult {
    name: string;
    avatar: string;
}

declare const schema: {
    walletAddress: {
        fields: {
            userId: {
                type: "string";
                references: {
                    model: string;
                    field: string;
                };
                required: true;
            };
            address: {
                type: "string";
                required: true;
            };
            chainId: {
                type: "number";
                required: true;
            };
            isPrimary: {
                type: "boolean";
                defaultValue: false;
            };
            createdAt: {
                type: "date";
                required: true;
            };
        };
    };
};

interface SIWEPluginOptions {
    domain: string;
    emailDomainName?: string;
    anonymous?: boolean;
    getNonce: () => Promise<string>;
    verifyMessage: (args: SIWEVerifyMessageArgs) => Promise<boolean>;
    ensLookup?: (args: ENSLookupArgs) => Promise<ENSLookupResult>;
    schema?: InferOptionSchema<typeof schema>;
}
declare const siwe: (options: SIWEPluginOptions) => {
    id: "siwe";
    schema: {
        walletAddress: {
            fields: {
                userId: {
                    type: "string";
                    references: {
                        model: string;
                        field: string;
                    };
                    required: true;
                };
                address: {
                    type: "string";
                    required: true;
                };
                chainId: {
                    type: "number";
                    required: true;
                };
                isPrimary: {
                    type: "boolean";
                    defaultValue: false;
                };
                createdAt: {
                    type: "date";
                    required: true;
                };
            };
        };
    };
    endpoints: {
        getSiweNonce: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    walletAddress: string;
                    chainId?: number | undefined;
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
                    nonce: string;
                };
            } : {
                nonce: string;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    walletAddress: z.ZodString;
                    chainId: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                }, z.core.$strip>;
            } & {
                use: any[];
            };
            path: "/siwe/nonce";
        };
        verifySiweMessage: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    message: string;
                    signature: string;
                    walletAddress: string;
                    chainId?: number | undefined;
                    email?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request: Request;
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
                    success: boolean;
                    user: {
                        id: string;
                        walletAddress: string;
                        chainId: number;
                    };
                };
            } : {
                token: string;
                success: boolean;
                user: {
                    id: string;
                    walletAddress: string;
                    chainId: number;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    message: z.ZodString;
                    signature: z.ZodString;
                    walletAddress: z.ZodString;
                    chainId: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
                    email: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                requireRequest: true;
            } & {
                use: any[];
            };
            path: "/siwe/verify";
        };
    };
};

export { siwe };
export type { SIWEPluginOptions };
