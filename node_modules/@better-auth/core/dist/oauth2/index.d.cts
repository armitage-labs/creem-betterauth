import { O as OAuth2Tokens, P as ProviderOptions } from '../shared/core.DyEdx0m7.cjs';
export { b as OAuth2UserInfo, a as OAuthProvider } from '../shared/core.DyEdx0m7.cjs';
import * as jose from 'jose';
import '../shared/core.CajxAutx.cjs';
import 'zod';

declare function getOAuth2Tokens(data: Record<string, any>): OAuth2Tokens;
declare function generateCodeChallenge(codeVerifier: string): Promise<string>;

declare function createAuthorizationURL({ id, options, authorizationEndpoint, state, codeVerifier, scopes, claims, redirectURI, duration, prompt, accessType, responseType, display, loginHint, hd, responseMode, additionalParams, scopeJoiner, }: {
    id: string;
    options: ProviderOptions;
    redirectURI: string;
    authorizationEndpoint: string;
    state: string;
    codeVerifier?: string;
    scopes: string[];
    claims?: string[];
    duration?: string;
    prompt?: string;
    accessType?: string;
    responseType?: string;
    display?: string;
    loginHint?: string;
    hd?: string;
    responseMode?: string;
    additionalParams?: Record<string, string>;
    scopeJoiner?: string;
}): Promise<URL>;

declare function createAuthorizationCodeRequest({ code, codeVerifier, redirectURI, options, authentication, deviceId, headers, additionalParams, resource, }: {
    code: string;
    redirectURI: string;
    options: Partial<ProviderOptions>;
    codeVerifier?: string;
    deviceId?: string;
    authentication?: "basic" | "post";
    headers?: Record<string, string>;
    additionalParams?: Record<string, string>;
    resource?: string | string[];
}): {
    body: URLSearchParams;
    headers: Record<string, any>;
};
declare function validateAuthorizationCode({ code, codeVerifier, redirectURI, options, tokenEndpoint, authentication, deviceId, headers, additionalParams, resource, }: {
    code: string;
    redirectURI: string;
    options: Partial<ProviderOptions>;
    codeVerifier?: string;
    deviceId?: string;
    tokenEndpoint: string;
    authentication?: "basic" | "post";
    headers?: Record<string, string>;
    additionalParams?: Record<string, string>;
    resource?: string | string[];
}): Promise<OAuth2Tokens>;
declare function validateToken(token: string, jwksEndpoint: string): Promise<jose.JWTVerifyResult<jose.JWTPayload>>;

declare function createRefreshAccessTokenRequest({ refreshToken, options, authentication, extraParams, resource, }: {
    refreshToken: string;
    options: Partial<ProviderOptions>;
    authentication?: "basic" | "post";
    extraParams?: Record<string, string>;
    resource?: string | string[];
}): {
    body: URLSearchParams;
    headers: Record<string, any>;
};
declare function refreshAccessToken({ refreshToken, options, tokenEndpoint, authentication, extraParams, }: {
    refreshToken: string;
    options: Partial<ProviderOptions>;
    tokenEndpoint: string;
    authentication?: "basic" | "post";
    extraParams?: Record<string, string>;
    /** @deprecated always "refresh_token" */
    grantType?: string;
}): Promise<OAuth2Tokens>;

declare function createClientCredentialsTokenRequest({ options, scope, authentication, resource, }: {
    options: ProviderOptions & {
        clientSecret: string;
    };
    scope?: string;
    authentication?: "basic" | "post";
    resource?: string | string[];
}): {
    body: URLSearchParams;
    headers: Record<string, any>;
};
declare function clientCredentialsToken({ options, tokenEndpoint, scope, authentication, resource, }: {
    options: ProviderOptions & {
        clientSecret: string;
    };
    tokenEndpoint: string;
    scope: string;
    authentication?: "basic" | "post";
    resource?: string | string[];
}): Promise<OAuth2Tokens>;

export { OAuth2Tokens, ProviderOptions, clientCredentialsToken, createAuthorizationCodeRequest, createAuthorizationURL, createClientCredentialsTokenRequest, createRefreshAccessTokenRequest, generateCodeChallenge, getOAuth2Tokens, refreshAccessToken, validateAuthorizationCode, validateToken };
