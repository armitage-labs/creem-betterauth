interface DetectionInfo {
    name: string;
    version: string | null;
}
interface SystemInfo {
    systemPlatform: string;
    systemRelease: string;
    systemArchitecture: string;
    cpuCount: number;
    cpuModel: string | null;
    cpuSpeed: number | null;
    memory: number;
    isDocker: boolean;
    isTTY: boolean;
    isWSL: boolean;
    isCI: boolean;
}
interface AuthConfigInfo {
    options: any;
    plugins: string[];
}
interface ProjectInfo {
    isGit: boolean;
    packageManager: DetectionInfo | null;
}
interface TelemetryEvent {
    type: string;
    anonymousId?: string;
    payload: Record<string, any>;
}
interface TelemetryContext {
    customTrack?: (event: TelemetryEvent) => Promise<void>;
    database?: string;
    adapter?: string;
    skipTestCheck?: boolean;
}
interface BetterAuthOptions {
    baseURL?: string;
    appName?: string;
    telemetry?: {
        enabled?: boolean;
        debug?: boolean;
    };
    emailVerification?: any;
    emailAndPassword?: any;
    socialProviders?: Record<string, any>;
    plugins?: Array<{
        id: string | symbol;
    }>;
    user?: any;
    verification?: any;
    session?: any;
    account?: any;
    hooks?: any;
    secondaryStorage?: any;
    advanced?: any;
    trustedOrigins?: any;
    rateLimit?: any;
    onAPIError?: any;
    logger?: any;
    databaseHooks?: any;
}

declare function getTelemetryAuthConfig(options: BetterAuthOptions, context?: TelemetryContext): {
    database: string | undefined;
    adapter: string | undefined;
    emailVerification: {
        sendVerificationEmail: boolean;
        sendOnSignUp: boolean;
        sendOnSignIn: boolean;
        autoSignInAfterVerification: boolean;
        expiresIn: any;
        onEmailVerification: boolean;
        afterEmailVerification: boolean;
    };
    emailAndPassword: {
        enabled: boolean;
        disableSignUp: boolean;
        requireEmailVerification: boolean;
        maxPasswordLength: any;
        minPasswordLength: any;
        sendResetPassword: boolean;
        resetPasswordTokenExpiresIn: any;
        onPasswordReset: boolean;
        password: {
            hash: boolean;
            verify: boolean;
        };
        autoSignIn: boolean;
        revokeSessionsOnPasswordReset: boolean;
    };
    socialProviders: ({
        id?: undefined;
        mapProfileToUser?: undefined;
        disableDefaultScope?: undefined;
        disableIdTokenSignIn?: undefined;
        disableImplicitSignUp?: undefined;
        disableSignUp?: undefined;
        getUserInfo?: undefined;
        overrideUserInfoOnSignIn?: undefined;
        prompt?: undefined;
        verifyIdToken?: undefined;
        scope?: undefined;
        refreshAccessToken?: undefined;
    } | {
        id: string;
        mapProfileToUser: boolean;
        disableDefaultScope: boolean;
        disableIdTokenSignIn: boolean;
        disableImplicitSignUp: any;
        disableSignUp: any;
        getUserInfo: boolean;
        overrideUserInfoOnSignIn: boolean;
        prompt: any;
        verifyIdToken: boolean;
        scope: any;
        refreshAccessToken: boolean;
    })[];
    plugins: string[] | undefined;
    user: {
        modelName: any;
        fields: any;
        additionalFields: any;
        changeEmail: {
            enabled: any;
            sendChangeEmailVerification: boolean;
        };
    };
    verification: {
        modelName: any;
        disableCleanup: any;
        fields: any;
    };
    session: {
        modelName: any;
        additionalFields: any;
        cookieCache: {
            enabled: any;
            maxAge: any;
        };
        disableSessionRefresh: any;
        expiresIn: any;
        fields: any;
        freshAge: any;
        preserveSessionInDatabase: any;
        storeSessionInDatabase: any;
        updateAge: any;
    };
    account: {
        modelName: any;
        fields: any;
        encryptOAuthTokens: any;
        updateAccountOnSignIn: any;
        accountLinking: {
            enabled: any;
            trustedProviders: any;
            updateUserInfoOnLink: any;
            allowUnlinkingAll: any;
        };
    };
    hooks: {
        after: boolean;
        before: boolean;
    };
    secondaryStorage: boolean;
    advanced: {
        cookiePrefix: boolean;
        cookies: boolean;
        crossSubDomainCookies: {
            domain: boolean;
            enabled: any;
            additionalCookies: any;
        };
        database: {
            useNumberId: boolean;
            generateId: any;
            defaultFindManyLimit: any;
        };
        useSecureCookies: any;
        ipAddress: {
            disableIpTracking: any;
            ipAddressHeaders: any;
        };
        disableCSRFCheck: any;
        cookieAttributes: {
            expires: any;
            secure: any;
            sameSite: any;
            domain: boolean;
            path: any;
            httpOnly: any;
        };
    };
    trustedOrigins: any;
    rateLimit: {
        storage: any;
        modelName: any;
        window: any;
        customStorage: boolean;
        enabled: any;
        max: any;
    };
    onAPIError: {
        errorURL: any;
        onError: boolean;
        throw: any;
    };
    logger: {
        disabled: any;
        level: any;
        log: boolean;
    };
    databaseHooks: {
        user: {
            create: {
                after: boolean;
                before: boolean;
            };
            update: {
                after: boolean;
                before: boolean;
            };
        };
        session: {
            create: {
                after: boolean;
                before: boolean;
            };
            update: {
                after: boolean;
                before: boolean;
            };
        };
        account: {
            create: {
                after: boolean;
                before: boolean;
            };
            update: {
                after: boolean;
                before: boolean;
            };
        };
        verification: {
            create: {
                after: boolean;
                before: boolean;
            };
            update: {
                after: boolean;
                before: boolean;
            };
        };
    };
};

declare function createTelemetry(options: BetterAuthOptions, context?: TelemetryContext): Promise<{
    publish: (event: TelemetryEvent) => Promise<void>;
}>;

export { createTelemetry, getTelemetryAuthConfig };
export type { AuthConfigInfo, BetterAuthOptions, DetectionInfo, ProjectInfo, SystemInfo, TelemetryContext, TelemetryEvent };
