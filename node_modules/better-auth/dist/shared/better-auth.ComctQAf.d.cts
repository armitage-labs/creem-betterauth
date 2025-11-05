import { GenericEndpointContext } from '@better-auth/core';

declare function generateState(c: GenericEndpointContext, link?: {
    email: string;
    userId: string;
}): Promise<{
    state: string;
    codeVerifier: string;
}>;
declare function parseState(c: GenericEndpointContext): Promise<{
    callbackURL: string;
    codeVerifier: string;
    expiresAt: number;
    errorURL?: string | undefined;
    newUserURL?: string | undefined;
    link?: {
        email: string;
        userId: string;
    } | undefined;
    requestSignUp?: boolean | undefined;
}>;

export { generateState as g, parseState as p };
