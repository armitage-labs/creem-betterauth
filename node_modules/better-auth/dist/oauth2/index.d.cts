export * from '@better-auth/core/oauth2';
import { AuthContext, GenericEndpointContext } from '@better-auth/core';
export { g as generateState, p as parseState } from '../shared/better-auth.ComctQAf.cjs';
import { User, Account } from '@better-auth/core/db';

declare function decryptOAuthToken(token: string, ctx: AuthContext): string | Promise<string>;
declare function setTokenUtil(token: string | null | undefined, ctx: AuthContext): string | Promise<string> | null | undefined;

declare function handleOAuthUserInfo(c: GenericEndpointContext, { userInfo, account, callbackURL, disableSignUp, overrideUserInfo, }: {
    userInfo: Omit<User, "createdAt" | "updatedAt">;
    account: Omit<Account, "id" | "userId" | "createdAt" | "updatedAt">;
    callbackURL?: string;
    disableSignUp?: boolean;
    overrideUserInfo?: boolean;
}): Promise<{
    error: string;
    data: null;
    isRegister?: undefined;
} | {
    error: string;
    data: null;
    isRegister: boolean;
} | {
    data: {
        session: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        };
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image?: string | null | undefined;
        };
    };
    error: null;
    isRegister: boolean;
}>;

export { decryptOAuthToken, handleOAuthUserInfo, setTokenUtil };
