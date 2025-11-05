import { CookieOptions } from 'better-call';
import { BetterAuthOptions, GenericEndpointContext, BetterAuthCookies } from '@better-auth/core';
import { Session, User } from '@better-auth/core/db';
export { p as parseSetCookieHeader, s as setCookieToHeader } from '../shared/better-auth.BgW7o7g9.js';

declare function createCookieGetter(options: BetterAuthOptions): (cookieName: string, overrideAttributes?: Partial<CookieOptions>) => {
    name: string;
    attributes: CookieOptions;
};
declare function getCookies(options: BetterAuthOptions): {
    sessionToken: {
        name: string;
        options: CookieOptions;
    };
    /**
     * This cookie is used to store the session data in the cookie
     * This is useful for when you want to cache the session in the cookie
     */
    sessionData: {
        name: string;
        options: CookieOptions;
    };
    dontRememberToken: {
        name: string;
        options: CookieOptions;
    };
};
declare function setCookieCache(ctx: GenericEndpointContext, session: {
    session: Session & Record<string, any>;
    user: User;
}, dontRememberMe: boolean): Promise<void>;
declare function setSessionCookie(ctx: GenericEndpointContext, session: {
    session: Session & Record<string, any>;
    user: User;
}, dontRememberMe?: boolean, overrides?: Partial<CookieOptions>): Promise<void>;
declare function deleteSessionCookie(ctx: GenericEndpointContext, skipDontRememberMe?: boolean): void;
declare function parseCookies(cookieHeader: string): Map<string, string>;
type EligibleCookies = (string & {}) | (keyof BetterAuthCookies & {});
declare const getSessionCookie: (request: Request | Headers, config?: {
    cookiePrefix?: string;
    cookieName?: string;
    path?: string;
}) => string | null;
declare const getCookieCache: <S extends {
    session: Session & Record<string, any>;
    user: User & Record<string, any>;
}>(request: Request | Headers, config?: {
    cookiePrefix?: string;
    cookieName?: string;
    isSecure?: boolean;
    secret?: string;
}) => Promise<S | null>;

export { createCookieGetter, deleteSessionCookie, getCookieCache, getCookies, getSessionCookie, parseCookies, setCookieCache, setSessionCookie };
export type { EligibleCookies };
