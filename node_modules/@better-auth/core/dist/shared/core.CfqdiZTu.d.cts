import { PostgresPool, MysqlPool, SqliteDatabase, Dialect, Kysely } from 'kysely';
import * as better_call from 'better-call';
import { CookieOptions, EndpointContext } from 'better-call';
import { D as DBFieldAttribute, B as BetterAuthDBSchema, a as LiteralUnion, M as Models, S as SecondaryStorage } from './core.CajxAutx.cjs';
import { S as Session, U as User, A as Account, V as Verification, R as RateLimit } from './core.Dl-70uns.cjs';
import { Database } from 'bun:sqlite';
import { DatabaseSync } from 'node:sqlite';
import { SocialProviders, SocialProviderList } from '../social-providers/index.cjs';
import { c as createLogger, L as Logger } from './core.BwoNUcJQ.cjs';
import { a as OAuthProvider } from './core.DyEdx0m7.cjs';
import { BetterAuthPlugin } from '@better-auth/core';

type DBAdapterDebugLogOption = boolean | {
    /**
     * Useful when you want to log only certain conditions.
     */
    logCondition?: (() => boolean) | undefined;
    create?: boolean;
    update?: boolean;
    updateMany?: boolean;
    findOne?: boolean;
    findMany?: boolean;
    delete?: boolean;
    deleteMany?: boolean;
    count?: boolean;
} | {
    /**
     * Only used for adapter tests to show debug logs if a test fails.
     *
     * @deprecated Not actually deprecated. Doing this for IDEs to show this option at the very bottom and stop end-users from using this.
     */
    isRunningAdapterTests: boolean;
};
type DBAdapterSchemaCreation = {
    /**
     * Code to be inserted into the file
     */
    code: string;
    /**
     * Path to the file, including the file name and extension.
     * Relative paths are supported, with the current working directory of the developer's project as the base.
     */
    path: string;
    /**
     * Append the file if it already exists.
     * Note: This will not apply if `overwrite` is set to true.
     */
    append?: boolean;
    /**
     * Overwrite the file if it already exists
     */
    overwrite?: boolean;
};
interface DBAdapterFactoryConfig<Options extends BetterAuthOptions = BetterAuthOptions> {
    /**
     * Use plural table names.
     *
     * All tables will be named with an `s` at the end.
     *
     * @default false
     */
    usePlural?: boolean;
    /**
     * Enable debug logs.
     *
     * @default false
     */
    debugLogs?: DBAdapterDebugLogOption;
    /**
     * Name of the adapter.
     *
     * This is used to identify the adapter in the debug logs.
     *
     * @default `adapterId`
     */
    adapterName?: string;
    /**
     * Adapter id
     */
    adapterId: string;
    /**
     * If the database supports numeric ids, set this to `true`.
     *
     * @default true
     */
    supportsNumericIds?: boolean;
    /**
     * If the database doesn't support JSON columns, set this to `false`.
     *
     * We will handle the translation between using `JSON` columns, and saving `string`s to the database.
     *
     * @default false
     */
    supportsJSON?: boolean;
    /**
     * If the database doesn't support dates, set this to `false`.
     *
     * We will handle the translation between using `Date` objects, and saving `string`s to the database.
     *
     * @default true
     */
    supportsDates?: boolean;
    /**
     * If the database doesn't support booleans, set this to `false`.
     *
     * We will handle the translation between using `boolean`s, and saving `0`s and `1`s to the database.
     *
     * @default true
     */
    supportsBooleans?: boolean;
    /**
     * Execute multiple operations in a transaction.
     *
     * If the database doesn't support transactions, set this to `false` and operations will be executed sequentially.
     *
     * @default false
     */
    transaction?: false | (<R>(callback: (trx: DBTransactionAdapter<Options>) => Promise<R>) => Promise<R>);
    /**
     * Disable id generation for the `create` method.
     *
     * This is useful for databases that don't support custom id values and would auto-generate them for you.
     *
     * @default false
     */
    disableIdGeneration?: boolean;
    /**
     * Map the keys of the input data.
     *
     * This is useful for databases that expect a different key name for a given situation.
     *
     * For example, MongoDB uses `_id` while in Better-Auth we use `id`.
     *
     *
     * @example
     * Each key represents the old key to replace.
     * The value represents the new key
     *
     * This can be a partial object that only transforms some keys.
     *
     * ```ts
     * mapKeysTransformInput: {
     *  id: "_id" // We want to replace `id` to `_id` to save into MongoDB
     * }
     * ```
     */
    mapKeysTransformInput?: Record<string, string>;
    /**
     * Map the keys of the output data.
     *
     * This is useful for databases that expect a different key name for a given situation.
     *
     * For example, MongoDB uses `_id` while in Better-Auth we use `id`.
     *
     * @example
     * Each key represents the old key to replace.
     * The value represents the new key
     *
     * This can be a partial object that only transforms some keys.
     *
     * ```ts
     * mapKeysTransformOutput: {
     *  _id: "id" // In MongoDB, we save `id` as `_id`. So we want to replace `_id` with `id` when we get the data back.
     * }
     * ```
     */
    mapKeysTransformOutput?: Record<string, string>;
    /**
     * Custom transform input function.
     *
     * This function is used to transform the input data before it is saved to the database.
     */
    customTransformInput?: (props: {
        data: any;
        /**
         * The fields of the model.
         */
        fieldAttributes: DBFieldAttribute;
        /**
         * The field to transform.
         */
        field: string;
        /**
         * The action which was called from the adapter.
         */
        action: "create" | "update";
        /**
         * The model name.
         */
        model: string;
        /**
         * The schema of the user's Better-Auth instance.
         */
        schema: BetterAuthDBSchema;
        /**
         * The options of the user's Better-Auth instance.
         */
        options: Options;
    }) => any;
    /**
     * Custom transform output function.
     *
     * This function is used to transform the output data before it is returned to the user.
     */
    customTransformOutput?: (props: {
        data: any;
        /**
         * The fields of the model.
         */
        fieldAttributes: DBFieldAttribute;
        /**
         * The field to transform.
         */
        field: string;
        /**
         * The fields to select.
         */
        select: string[];
        /**
         * The model name.
         */
        model: string;
        /**
         * The schema of the user's Better-Auth instance.
         */
        schema: BetterAuthDBSchema;
        /**
         * The options of the user's Better-Auth instance.
         */
        options: Options;
    }) => any;
    /**
     * Custom ID generator function.
     *
     * By default, we can handle ID generation for you, however if the database your adapter is for only supports a specific custom id generation,
     * then you can use this function to generate your own IDs.
     *
     *
     * Notes:
     * - If the user enabled `useNumberId`, then this option will be ignored. Unless this adapter config has `supportsNumericIds` set to `false`.
     * - If `generateId` is `false` in the user's Better-Auth config, then this option will be ignored.
     * - If `generateId` is a function, then it will override this option.
     *
     * @example
     *
     * ```ts
     * customIdGenerator: ({ model }) => {
     *  return "my-super-unique-id";
     * }
     * ```
     */
    customIdGenerator?: (props: {
        model: string;
    }) => string;
    /**
     * Whether to disable the transform output.
     * Do not use this option unless you know what you are doing.
     * @default false
     */
    disableTransformOutput?: boolean;
    /**
     * Whether to disable the transform input.
     * Do not use this option unless you know what you are doing.
     * @default false
     */
    disableTransformInput?: boolean;
}
type Where = {
    /**
     * @default eq
     */
    operator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "in" | "not_in" | "contains" | "starts_with" | "ends_with";
    value: string | number | boolean | string[] | number[] | Date | null;
    field: string;
    /**
     * @default AND
     */
    connector?: "AND" | "OR";
};
type DBTransactionAdapter<Options extends BetterAuthOptions = BetterAuthOptions> = Omit<DBAdapter<Options>, "transaction">;
type DBAdapter<Options extends BetterAuthOptions = BetterAuthOptions> = {
    id: string;
    create: <T extends Record<string, any>, R = T>(data: {
        model: string;
        data: Omit<T, "id">;
        select?: string[];
        /**
         * By default, any `id` provided in `data` will be ignored.
         *
         * If you want to force the `id` to be the same as the `data.id`, set this to `true`.
         */
        forceAllowId?: boolean;
    }) => Promise<R>;
    findOne: <T>(data: {
        model: string;
        where: Where[];
        select?: string[];
    }) => Promise<T | null>;
    findMany: <T>(data: {
        model: string;
        where?: Where[];
        limit?: number;
        sortBy?: {
            field: string;
            direction: "asc" | "desc";
        };
        offset?: number;
    }) => Promise<T[]>;
    count: (data: {
        model: string;
        where?: Where[];
    }) => Promise<number>;
    /**
     * ⚠︎ Update may not return the updated data
     * if multiple where clauses are provided
     */
    update: <T>(data: {
        model: string;
        where: Where[];
        update: Record<string, any>;
    }) => Promise<T | null>;
    updateMany: (data: {
        model: string;
        where: Where[];
        update: Record<string, any>;
    }) => Promise<number>;
    delete: <T>(data: {
        model: string;
        where: Where[];
    }) => Promise<void>;
    deleteMany: (data: {
        model: string;
        where: Where[];
    }) => Promise<number>;
    /**
     * Execute multiple operations in a transaction.
     * If the adapter doesn't support transactions, operations will be executed sequentially.
     */
    transaction: <R>(callback: (trx: DBTransactionAdapter<Options>) => Promise<R>) => Promise<R>;
    /**
     *
     * @param options
     * @param file - file path if provided by the user
     */
    createSchema?: (options: Options, file?: string) => Promise<DBAdapterSchemaCreation>;
    options?: {
        adapterConfig: DBAdapterFactoryConfig<Options>;
    } & CustomAdapter["options"];
};
type CleanedWhere = Required<Where>;
interface CustomAdapter {
    create: <T extends Record<string, any>>({ data, model, select, }: {
        model: string;
        data: T;
        select?: string[];
    }) => Promise<T>;
    update: <T>(data: {
        model: string;
        where: CleanedWhere[];
        update: T;
    }) => Promise<T | null>;
    updateMany: (data: {
        model: string;
        where: CleanedWhere[];
        update: Record<string, any>;
    }) => Promise<number>;
    findOne: <T>({ model, where, select, }: {
        model: string;
        where: CleanedWhere[];
        select?: string[];
    }) => Promise<T | null>;
    findMany: <T>({ model, where, limit, sortBy, offset, }: {
        model: string;
        where?: CleanedWhere[];
        limit: number;
        sortBy?: {
            field: string;
            direction: "asc" | "desc";
        };
        offset?: number;
    }) => Promise<T[]>;
    delete: ({ model, where, }: {
        model: string;
        where: CleanedWhere[];
    }) => Promise<void>;
    deleteMany: ({ model, where, }: {
        model: string;
        where: CleanedWhere[];
    }) => Promise<number>;
    count: ({ model, where, }: {
        model: string;
        where?: CleanedWhere[];
    }) => Promise<number>;
    createSchema?: (props: {
        /**
         * The file the user may have passed in to the `generate` command as the expected schema file output path.
         */
        file?: string;
        /**
         * The tables from the user's Better-Auth instance schema.
         */
        tables: BetterAuthDBSchema;
    }) => Promise<DBAdapterSchemaCreation>;
    /**
     * Your adapter's options.
     */
    options?: Record<string, any> | undefined;
}
interface DBAdapterInstance<Options extends BetterAuthOptions = BetterAuthOptions> {
    (options: BetterAuthOptions): DBAdapter<Options>;
}

type BetterAuthCookies = {
    sessionToken: {
        name: string;
        options: CookieOptions;
    };
    sessionData: {
        name: string;
        options: CookieOptions;
    };
    dontRememberToken: {
        name: string;
        options: CookieOptions;
    };
};

type GenericEndpointContext<Options extends BetterAuthOptions = BetterAuthOptions> = EndpointContext<string, any> & {
    context: AuthContext<Options>;
};
interface InternalAdapter<Options extends BetterAuthOptions = BetterAuthOptions> {
    createOAuthUser(user: Omit<User, "id" | "createdAt" | "updatedAt">, account: Omit<Account, "userId" | "id" | "createdAt" | "updatedAt"> & Partial<Account>, context?: GenericEndpointContext<Options>): Promise<{
        user: User;
        account: Account;
    }>;
    createUser<T extends Record<string, any>>(user: Omit<User, "id" | "createdAt" | "updatedAt" | "emailVerified"> & Partial<User> & Record<string, any>, context?: GenericEndpointContext<Options>, trxAdapter?: DBTransactionAdapter<Options>): Promise<T & User>;
    createAccount<T extends Record<string, any>>(account: Omit<Account, "id" | "createdAt" | "updatedAt"> & Partial<Account> & T, context?: GenericEndpointContext<Options>, trxAdapter?: DBTransactionAdapter<Options>): Promise<T & Account>;
    listSessions(userId: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<Session[]>;
    listUsers(limit?: number, offset?: number, sortBy?: {
        field: string;
        direction: "asc" | "desc";
    }, where?: Where[], trxAdapter?: DBTransactionAdapter<Options>): Promise<User[]>;
    countTotalUsers(where?: Where[], trxAdapter?: DBTransactionAdapter<Options>): Promise<number>;
    deleteUser(userId: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<void>;
    createSession(userId: string, ctx: GenericEndpointContext<Options>, dontRememberMe?: boolean, override?: Partial<Session> & Record<string, any>, overrideAll?: boolean, trxAdapter?: DBTransactionAdapter<Options>): Promise<Session>;
    findSession(token: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<{
        session: Session & Record<string, any>;
        user: User & Record<string, any>;
    } | null>;
    findSessions(sessionTokens: string[], trxAdapter?: DBTransactionAdapter<Options>): Promise<{
        session: Session;
        user: User;
    }[]>;
    updateSession(sessionToken: string, session: Partial<Session> & Record<string, any>, context?: GenericEndpointContext<Options>, trxAdapter?: DBTransactionAdapter<Options>): Promise<Session | null>;
    deleteSession(token: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<void>;
    deleteAccounts(userId: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<void>;
    deleteAccount(accountId: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<void>;
    deleteSessions(userIdOrSessionTokens: string | string[], trxAdapter?: DBTransactionAdapter<Options>): Promise<void>;
    findOAuthUser(email: string, accountId: string, providerId: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<{
        user: User;
        accounts: Account[];
    } | null>;
    findUserByEmail(email: string, options?: {
        includeAccounts: boolean;
    }, trxAdapter?: DBTransactionAdapter<Options>): Promise<{
        user: User;
        accounts: Account[];
    } | null>;
    findUserById(userId: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<User | null>;
    linkAccount(account: Omit<Account, "id" | "createdAt" | "updatedAt"> & Partial<Account>, context?: GenericEndpointContext<Options>, trxAdapter?: DBTransactionAdapter<Options>): Promise<Account>;
    updateUser(userId: string, data: Partial<User> & Record<string, any>, context?: GenericEndpointContext<Options>, trxAdapter?: DBTransactionAdapter<Options>): Promise<any>;
    updateUserByEmail(email: string, data: Partial<User & Record<string, any>>, context?: GenericEndpointContext<Options>, trxAdapter?: DBTransactionAdapter<Options>): Promise<User>;
    updatePassword(userId: string, password: string, context?: GenericEndpointContext<Options>, trxAdapter?: DBTransactionAdapter<Options>): Promise<void>;
    findAccounts(userId: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<Account[]>;
    findAccount(accountId: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<Account | null>;
    findAccountByProviderId(accountId: string, providerId: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<Account | null>;
    findAccountByUserId(userId: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<Account[]>;
    updateAccount(id: string, data: Partial<Account>, context?: GenericEndpointContext<Options>, trxAdapter?: DBTransactionAdapter<Options>): Promise<Account>;
    createVerificationValue(data: Omit<Verification, "createdAt" | "id" | "updatedAt"> & Partial<Verification>, context?: GenericEndpointContext<Options>, trxAdapter?: DBTransactionAdapter<Options>): Promise<Verification>;
    findVerificationValue(identifier: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<Verification | null>;
    deleteVerificationValue(id: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<void>;
    deleteVerificationByIdentifier(identifier: string, trxAdapter?: DBTransactionAdapter<Options>): Promise<void>;
    updateVerificationValue(id: string, data: Partial<Verification>, context?: GenericEndpointContext<Options>, trxAdapter?: DBTransactionAdapter<Options>): Promise<Verification>;
}
type CreateCookieGetterFn = (cookieName: string, overrideAttributes?: Partial<CookieOptions>) => {
    name: string;
    attributes: CookieOptions;
};
type CheckPasswordFn<Options extends BetterAuthOptions = BetterAuthOptions> = (userId: string, ctx: GenericEndpointContext<Options>) => Promise<boolean>;
type AuthContext<Options extends BetterAuthOptions = BetterAuthOptions> = {
    options: Options;
    appName: string;
    baseURL: string;
    trustedOrigins: string[];
    oauthConfig?: {
        /**
         * This is dangerous and should only be used in dev or staging environments.
         */
        skipStateCookieCheck?: boolean;
    };
    /**
     * New session that will be set after the request
     * meaning: there is a `set-cookie` header that will set
     * the session cookie. This is the fetched session. And it's set
     * by `setNewSession` method.
     */
    newSession: {
        session: Session & Record<string, any>;
        user: User & Record<string, any>;
    } | null;
    session: {
        session: Session & Record<string, any>;
        user: User & Record<string, any>;
    } | null;
    setNewSession: (session: {
        session: Session & Record<string, any>;
        user: User & Record<string, any>;
    } | null) => void;
    socialProviders: OAuthProvider[];
    authCookies: BetterAuthCookies;
    logger: ReturnType<typeof createLogger>;
    rateLimit: {
        enabled: boolean;
        window: number;
        max: number;
        storage: "memory" | "database" | "secondary-storage";
    } & BetterAuthRateLimitOptions;
    adapter: DBAdapter<Options>;
    internalAdapter: InternalAdapter<Options>;
    createAuthCookie: CreateCookieGetterFn;
    secret: string;
    sessionConfig: {
        updateAge: number;
        expiresIn: number;
        freshAge: number;
    };
    generateId: (options: {
        model: LiteralUnion<Models, string>;
        size?: number;
    }) => string | false;
    secondaryStorage: SecondaryStorage | undefined;
    password: {
        hash: (password: string) => Promise<string>;
        verify: (data: {
            password: string;
            hash: string;
        }) => Promise<boolean>;
        config: {
            minPasswordLength: number;
            maxPasswordLength: number;
        };
        checkPassword: CheckPasswordFn<Options>;
    };
    tables: BetterAuthDBSchema;
    runMigrations: () => Promise<void>;
    publishTelemetry: (event: {
        type: string;
        anonymousId?: string;
        payload: Record<string, any>;
    }) => Promise<void>;
    /**
     * This skips the origin check for all requests.
     *
     * set to true by default for `test` environments and `false`
     * for other environments.
     *
     * It's inferred from the `options.advanced?.disableCSRFCheck`
     * option or `options.advanced?.disableOriginCheck` option.
     *
     * @default false
     */
    skipOriginCheck: boolean;
    /**
     * This skips the CSRF check for all requests.
     *
     * This is inferred from the `options.advanced?.
     * disableCSRFCheck` option.
     *
     * @default false
     */
    skipCSRFCheck: boolean;
};

declare const optionsMiddleware: <InputCtx extends better_call.MiddlewareInputContext<better_call.MiddlewareOptions>>(inputContext: InputCtx) => Promise<AuthContext>;
declare const createAuthMiddleware: {
    <Options extends better_call.MiddlewareOptions, R>(options: Options, handler: (ctx: better_call.MiddlewareContext<Options, AuthContext & {
        returned?: unknown;
        responseHeaders?: Headers;
    }>) => Promise<R>): (inputContext: better_call.MiddlewareInputContext<Options>) => Promise<R>;
    <Options extends better_call.MiddlewareOptions, R_1>(handler: (ctx: better_call.MiddlewareContext<Options, AuthContext & {
        returned?: unknown;
        responseHeaders?: Headers;
    }>) => Promise<R_1>): (inputContext: better_call.MiddlewareInputContext<Options>) => Promise<R_1>;
};
declare const createAuthEndpoint: <Path extends string, Opts extends better_call.EndpointOptions, R>(path: Path, options: Opts, handler: (ctx: better_call.EndpointContext<Path, Opts, AuthContext>) => Promise<R>) => {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<Path, Opts & {
        use: any[];
    }>> extends true ? [better_call.InferBodyInput<Opts & {
        use: any[];
    }, (Opts & {
        use: any[];
    })["metadata"] extends {
        $Infer: {
            body: infer B;
        };
    } ? B : (Opts & {
        use: any[];
    })["body"] extends better_call.StandardSchemaV1<unknown, unknown> ? better_call.StandardSchemaV1.InferInput<(Opts & {
        use: any[];
    })["body"]> : undefined> & better_call.InferInputMethod<Opts & {
        use: any[];
    }, (Opts & {
        use: any[];
    })["method"] extends any[] ? (Opts & {
        use: any[];
    })["method"][number] : (Opts & {
        use: any[];
    })["method"] extends "*" ? better_call.HTTPMethod : (Opts & {
        use: any[];
    })["method"] | undefined> & better_call.InferQueryInput<Opts & {
        use: any[];
    }, (Opts & {
        use: any[];
    })["metadata"] extends {
        $Infer: {
            query: infer Query;
        };
    } ? Query : (Opts & {
        use: any[];
    })["query"] extends better_call.StandardSchemaV1<unknown, unknown> ? better_call.StandardSchemaV1.InferInput<(Opts & {
        use: any[];
    })["query"]> : Record<string, any> | undefined> & better_call.InferParamInput<Path> & better_call.InferRequestInput<Opts & {
        use: any[];
    }> & better_call.InferHeadersInput<Opts & {
        use: any[];
    }> & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }] : [((better_call.InferBodyInput<Opts & {
        use: any[];
    }, (Opts & {
        use: any[];
    })["metadata"] extends {
        $Infer: {
            body: infer B_1;
        };
    } ? B_1 : (Opts & {
        use: any[];
    })["body"] extends better_call.StandardSchemaV1<unknown, unknown> ? better_call.StandardSchemaV1.InferInput<(Opts & {
        use: any[];
    })["body"]> : undefined> & better_call.InferInputMethod<Opts & {
        use: any[];
    }, (Opts & {
        use: any[];
    })["method"] extends any[] ? (Opts & {
        use: any[];
    })["method"][number] : (Opts & {
        use: any[];
    })["method"] extends "*" ? better_call.HTTPMethod : (Opts & {
        use: any[];
    })["method"] | undefined> & better_call.InferQueryInput<Opts & {
        use: any[];
    }, (Opts & {
        use: any[];
    })["metadata"] extends {
        $Infer: {
            query: infer Query_1;
        };
    } ? Query_1 : (Opts & {
        use: any[];
    })["query"] extends better_call.StandardSchemaV1<unknown, unknown> ? better_call.StandardSchemaV1.InferInput<(Opts & {
        use: any[];
    })["query"]> : Record<string, any> | undefined> & better_call.InferParamInput<Path> & better_call.InferRequestInput<Opts & {
        use: any[];
    }> & better_call.InferHeadersInput<Opts & {
        use: any[];
    }> & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: R;
    } : R>;
    options: Opts & {
        use: any[];
    };
    path: Path;
};
type AuthEndpoint = ReturnType<typeof createAuthEndpoint>;
type AuthMiddleware = ReturnType<typeof createAuthMiddleware>;

type KyselyDatabaseType = "postgres" | "mysql" | "sqlite" | "mssql";
type OmitId<T extends {
    id: unknown;
}> = Omit<T, "id">;
type GenerateIdFn = (options: {
    model: LiteralUnion<Models, string>;
    size?: number;
}) => string | false;
type BetterAuthRateLimitOptions = {
    /**
     * By default, rate limiting is only
     * enabled on production.
     */
    enabled?: boolean;
    /**
     * Default window to use for rate limiting. The value
     * should be in seconds.
     *
     * @default 10 seconds
     */
    window?: number;
    /**
     * The default maximum number of requests allowed within the window.
     *
     * @default 100 requests
     */
    max?: number;
    /**
     * Custom rate limit rules to apply to
     * specific paths.
     */
    customRules?: {
        [key: string]: {
            /**
             * The window to use for the custom rule.
             */
            window: number;
            /**
             * The maximum number of requests allowed within the window.
             */
            max: number;
        } | false | ((request: Request) => {
            window: number;
            max: number;
        } | false | Promise<{
            window: number;
            max: number;
        } | false>);
    };
    /**
     * Storage configuration
     *
     * By default, rate limiting is stored in memory. If you passed a
     * secondary storage, rate limiting will be stored in the secondary
     * storage.
     *
     * @default "memory"
     */
    storage?: "memory" | "database" | "secondary-storage";
    /**
     * If database is used as storage, the name of the table to
     * use for rate limiting.
     *
     * @default "rateLimit"
     */
    modelName?: string;
    /**
     * Custom field names for the rate limit table
     */
    fields?: Record<keyof RateLimit, string>;
    /**
     * custom storage configuration.
     *
     * NOTE: If custom storage is used storage
     * is ignored
     */
    customStorage?: {
        get: (key: string) => Promise<RateLimit | undefined>;
        set: (key: string, value: RateLimit) => Promise<void>;
    };
};
type BetterAuthAdvancedOptions = {
    /**
     * Ip address configuration
     */
    ipAddress?: {
        /**
         * List of headers to use for ip address
         *
         * Ip address is used for rate limiting and session tracking
         *
         * @example ["x-client-ip", "x-forwarded-for", "cf-connecting-ip"]
         *
         * @default
         * @link https://github.com/better-auth/better-auth/blob/main/packages/better-auth/src/utils/get-request-ip.ts#L8
         */
        ipAddressHeaders?: string[];
        /**
         * Disable ip tracking
         *
         * ⚠︎ This is a security risk and it may expose your application to abuse
         */
        disableIpTracking?: boolean;
    };
    /**
     * Use secure cookies
     *
     * @default false
     */
    useSecureCookies?: boolean;
    /**
     * Disable trusted origins check
     *
     * ⚠︎ This is a security risk and it may expose your application to
     * CSRF attacks
     */
    disableCSRFCheck?: boolean;
    /**
     * Disable origin check
     *
     * ⚠︎ This may allow requests from any origin to be processed by
     * Better Auth. And could lead to security vulnerabilities.
     */
    disableOriginCheck?: boolean;
    /**
     * Configure cookies to be cross subdomains
     */
    crossSubDomainCookies?: {
        /**
         * Enable cross subdomain cookies
         */
        enabled: boolean;
        /**
         * Additional cookies to be shared across subdomains
         */
        additionalCookies?: string[];
        /**
         * The domain to use for the cookies
         *
         * By default, the domain will be the root
         * domain from the base URL.
         */
        domain?: string;
    };
    cookies?: {
        [key: string]: {
            name?: string;
            attributes?: CookieOptions;
        };
    };
    defaultCookieAttributes?: CookieOptions;
    /**
     * Prefix for cookies. If a cookie name is provided
     * in cookies config, this will be overridden.
     *
     * @default
     * ```txt
     * "appName" -> which defaults to "better-auth"
     * ```
     */
    cookiePrefix?: string;
    /**
     * Database configuration.
     */
    database?: {
        /**
         * The default number of records to return from the database
         * when using the `findMany` adapter method.
         *
         * @default 100
         */
        defaultFindManyLimit?: number;
        /**
         * If your database auto increments number ids, set this to `true`.
         *
         * Note: If enabled, we will not handle ID generation (including if you use `generateId`), and it would be expected that your database will provide the ID automatically.
         *
         * @default false
         */
        useNumberId?: boolean;
        /**
         * Custom generateId function.
         *
         * If not provided, random ids will be generated.
         * If set to false, the database's auto generated id will be used.
         */
        generateId?: GenerateIdFn | false;
    };
    /**
     * Custom generateId function.
     *
     * If not provided, random ids will be generated.
     * If set to false, the database's auto generated id will be used.
     *
     * @deprecated Please use `database.generateId` instead. This will be potentially removed in future releases.
     */
    generateId?: GenerateIdFn | false;
};
type BetterAuthOptions = {
    /**
     * The name of the application
     *
     * process.env.APP_NAME
     *
     * @default "Better Auth"
     */
    appName?: string;
    /**
     * Base URL for the Better Auth. This is typically the
     * root URL where your application server is hosted.
     * If not explicitly set,
     * the system will check the following environment variable:
     *
     * process.env.BETTER_AUTH_URL
     */
    baseURL?: string;
    /**
     * Base path for the Better Auth. This is typically
     * the path where the
     * Better Auth routes are mounted.
     *
     * @default "/api/auth"
     */
    basePath?: string;
    /**
     * The secret to use for encryption,
     * signing and hashing.
     *
     * By default Better Auth will look for
     * the following environment variables:
     * process.env.BETTER_AUTH_SECRET,
     * process.env.AUTH_SECRET
     * If none of these environment
     * variables are set,
     * it will default to
     * "better-auth-secret-123456789".
     *
     * on production if it's not set
     * it will throw an error.
     *
     * you can generate a good secret
     * using the following command:
     * @example
     * ```bash
     * openssl rand -base64 32
     * ```
     */
    secret?: string;
    /**
     * Database configuration
     */
    database?: PostgresPool | MysqlPool | SqliteDatabase | Dialect | DBAdapterInstance | Database | DatabaseSync | {
        dialect: Dialect;
        type: KyselyDatabaseType;
        /**
         * casing for table names
         *
         * @default "camel"
         */
        casing?: "snake" | "camel";
        /**
         * Enable debug logs for the adapter
         *
         * @default false
         */
        debugLogs?: DBAdapterDebugLogOption;
        /**
         * Whether to execute multiple operations in a transaction.
         * If the database doesn't support transactions,
         * set this to `false` and operations will be executed sequentially.
         * @default true
         */
        transaction?: boolean;
    } | {
        /**
         * Kysely instance
         */
        db: Kysely<any>;
        /**
         * Database type between postgres, mysql and sqlite
         */
        type: KyselyDatabaseType;
        /**
         * casing for table names
         *
         * @default "camel"
         */
        casing?: "snake" | "camel";
        /**
         * Enable debug logs for the adapter
         *
         * @default false
         */
        debugLogs?: DBAdapterDebugLogOption;
        /**
         * Whether to execute multiple operations in a transaction.
         * If the database doesn't support transactions,
         * set this to `false` and operations will be executed sequentially.
         * @default true
         */
        transaction?: boolean;
    };
    /**
     * Secondary storage configuration
     *
     * This is used to store session and rate limit data.
     */
    secondaryStorage?: SecondaryStorage;
    /**
     * Email verification configuration
     */
    emailVerification?: {
        /**
         * Send a verification email
         * @param data the data object
         * @param request the request object
         */
        sendVerificationEmail?: (
        /**
         * @param user the user to send the
         * verification email to
         * @param url the URL to send the verification email to
         * it contains the token as well
         * @param token the token to send the verification email to
         */
        data: {
            user: User;
            url: string;
            token: string;
        }, 
        /**
         * The request object
         */
        request?: Request) => Promise<void>;
        /**
         * Send a verification email automatically
         * after sign up
         *
         * @default false
         */
        sendOnSignUp?: boolean;
        /**
         * Send a verification email automatically
         * on sign in when the user's email is not verified
         *
         * @default false
         */
        sendOnSignIn?: boolean;
        /**
         * Auto signin the user after they verify their email
         */
        autoSignInAfterVerification?: boolean;
        /**
         * Number of seconds the verification token is
         * valid for.
         * @default 3600 seconds (1 hour)
         */
        expiresIn?: number;
        /**
         * A function that is called when a user verifies their email
         * @param user the user that verified their email
         * @param request the request object
         */
        onEmailVerification?: (user: User, request?: Request) => Promise<void>;
        /**
         * A function that is called when a user's email is updated to verified
         * @param user the user that verified their email
         * @param request the request object
         */
        afterEmailVerification?: (user: User, request?: Request) => Promise<void>;
    };
    /**
     * Email and password authentication
     */
    emailAndPassword?: {
        /**
         * Enable email and password authentication
         *
         * @default false
         */
        enabled: boolean;
        /**
         * Disable email and password sign up
         *
         * @default false
         */
        disableSignUp?: boolean;
        /**
         * Require email verification before a session
         * can be created for the user.
         *
         * if the user is not verified, the user will not be able to sign in
         * and on sign in attempts, the user will be prompted to verify their email.
         */
        requireEmailVerification?: boolean;
        /**
         * The maximum length of the password.
         *
         * @default 128
         */
        maxPasswordLength?: number;
        /**
         * The minimum length of the password.
         *
         * @default 8
         */
        minPasswordLength?: number;
        /**
         * send reset password
         */
        sendResetPassword?: (
        /**
         * @param user the user to send the
         * reset password email to
         * @param url the URL to send the reset password email to
         * @param token the token to send to the user (could be used instead of sending the url
         * if you need to redirect the user to custom route)
         */
        data: {
            user: User;
            url: string;
            token: string;
        }, 
        /**
         * The request object
         */
        request?: Request) => Promise<void>;
        /**
         * Number of seconds the reset password token is
         * valid for.
         * @default 1 hour (60 * 60)
         */
        resetPasswordTokenExpiresIn?: number;
        /**
         * A callback function that is triggered
         * when a user's password is changed successfully.
         */
        onPasswordReset?: (data: {
            user: User;
        }, request?: Request) => Promise<void>;
        /**
         * Password hashing and verification
         *
         * By default Scrypt is used for password hashing and
         * verification. You can provide your own hashing and
         * verification function. if you want to use a
         * different algorithm.
         */
        password?: {
            hash?: (password: string) => Promise<string>;
            verify?: (data: {
                hash: string;
                password: string;
            }) => Promise<boolean>;
        };
        /**
         * Automatically sign in the user after sign up
         *
         * @default true
         */
        autoSignIn?: boolean;
        /**
         * Whether to revoke all other sessions when resetting password
         * @default false
         */
        revokeSessionsOnPasswordReset?: boolean;
    };
    /**
     * list of social providers
     */
    socialProviders?: SocialProviders;
    /**
     * List of Better Auth plugins
     */
    plugins?: [] | BetterAuthPlugin[];
    /**
     * User configuration
     */
    user?: {
        /**
         * The model name for the user. Defaults to "user".
         */
        modelName?: string;
        /**
         * Map fields
         *
         * @example
         * ```ts
         * {
         *  userId: "user_id"
         * }
         * ```
         */
        fields?: Partial<Record<keyof OmitId<User>, string>>;
        /**
         * Additional fields for the user
         */
        additionalFields?: {
            [key: string]: DBFieldAttribute;
        };
        /**
         * Changing email configuration
         */
        changeEmail?: {
            /**
             * Enable changing email
             * @default false
             */
            enabled: boolean;
            /**
             * Send a verification email when the user changes their email.
             * @param data the data object
             * @param request the request object
             */
            sendChangeEmailVerification?: (data: {
                user: User;
                newEmail: string;
                url: string;
                token: string;
            }, request?: Request) => Promise<void>;
        };
        /**
         * User deletion configuration
         */
        deleteUser?: {
            /**
             * Enable user deletion
             */
            enabled?: boolean;
            /**
             * Send a verification email when the user deletes their account.
             *
             * if this is not set, the user will be deleted immediately.
             * @param data the data object
             * @param request the request object
             */
            sendDeleteAccountVerification?: (data: {
                user: User;
                url: string;
                token: string;
            }, request?: Request) => Promise<void>;
            /**
             * A function that is called before a user is deleted.
             *
             * to interrupt with error you can throw `APIError`
             */
            beforeDelete?: (user: User, request?: Request) => Promise<void>;
            /**
             * A function that is called after a user is deleted.
             *
             * This is useful for cleaning up user data
             */
            afterDelete?: (user: User, request?: Request) => Promise<void>;
            /**
             * The expiration time for the delete token.
             *
             * @default 1 day (60 * 60 * 24) in seconds
             */
            deleteTokenExpiresIn?: number;
        };
    };
    session?: {
        /**
         * The model name for the session.
         *
         * @default "session"
         */
        modelName?: string;
        /**
         * Map fields
         *
         * @example
         * ```ts
         * {
         *  userId: "user_id"
         * }
         */
        fields?: Partial<Record<keyof OmitId<Session>, string>>;
        /**
         * Expiration time for the session token. The value
         * should be in seconds.
         * @default 7 days (60 * 60 * 24 * 7)
         */
        expiresIn?: number;
        /**
         * How often the session should be refreshed. The value
         * should be in seconds.
         * If set 0 the session will be refreshed every time it is used.
         * @default 1 day (60 * 60 * 24)
         */
        updateAge?: number;
        /**
         * Disable session refresh so that the session is not updated
         * regardless of the `updateAge` option.
         *
         * @default false
         */
        disableSessionRefresh?: boolean;
        /**
         * Additional fields for the session
         */
        additionalFields?: {
            [key: string]: DBFieldAttribute;
        };
        /**
         * By default if secondary storage is provided
         * the session is stored in the secondary storage.
         *
         * Set this to true to store the session in the database
         * as well.
         *
         * Reads are always done from the secondary storage.
         *
         * @default false
         */
        storeSessionInDatabase?: boolean;
        /**
         * By default, sessions are deleted from the database when secondary storage
         * is provided when session is revoked.
         *
         * Set this to true to preserve session records in the database,
         * even if they are deleted from the secondary storage.
         *
         * @default false
         */
        preserveSessionInDatabase?: boolean;
        /**
         * Enable caching session in cookie
         */
        cookieCache?: {
            /**
             * max age of the cookie
             * @default 5 minutes (5 * 60)
             */
            maxAge?: number;
            /**
             * Enable caching session in cookie
             * @default false
             */
            enabled?: boolean;
        };
        /**
         * The age of the session to consider it fresh.
         *
         * This is used to check if the session is fresh
         * for sensitive operations. (e.g. deleting an account)
         *
         * If the session is not fresh, the user should be prompted
         * to sign in again.
         *
         * If set to 0, the session will be considered fresh every time. (⚠︎ not recommended)
         *
         * @default 1 day (60 * 60 * 24)
         */
        freshAge?: number;
    };
    account?: {
        /**
         * The model name for the account. Defaults to "account".
         */
        modelName?: string;
        /**
         * Map fields
         */
        fields?: Partial<Record<keyof OmitId<Account>, string>>;
        /**
         * Additional fields for the account
         */
        additionalFields?: {
            [key: string]: DBFieldAttribute;
        };
        /**
         * When enabled (true), the user account data (accessToken, idToken, refreshToken, etc.)
         * will be updated on sign in with the latest data from the provider.
         *
         * @default true
         */
        updateAccountOnSignIn?: boolean;
        /**
         * Configuration for account linking.
         */
        accountLinking?: {
            /**
             * Enable account linking
             *
             * @default true
             */
            enabled?: boolean;
            /**
             * List of trusted providers
             */
            trustedProviders?: Array<LiteralUnion<SocialProviderList[number] | "email-password", string>>;
            /**
             * If enabled (true), this will allow users to manually linking accounts with different email addresses than the main user.
             *
             * @default false
             *
             * ⚠️ Warning: enabling this might lead to account takeovers, so proceed with caution.
             */
            allowDifferentEmails?: boolean;
            /**
             * If enabled (true), this will allow users to unlink all accounts.
             *
             * @default false
             */
            allowUnlinkingAll?: boolean;
            /**
             * If enabled (true), this will update the user information based on the newly linked account
             *
             * @default false
             */
            updateUserInfoOnLink?: boolean;
        };
        /**
         * Encrypt OAuth tokens
         *
         * By default, OAuth tokens (access tokens, refresh tokens, ID tokens) are stored in plain text in the database.
         * This poses a security risk if your database is compromised, as attackers could gain access to user accounts
         * on external services.
         *
         * When enabled, tokens are encrypted using AES-256-GCM before storage, providing protection against:
         * - Database breaches and unauthorized access to raw token data
         * - Internal threats from database administrators or compromised credentials
         * - Token exposure in database backups and logs
         * @default false
         */
        encryptOAuthTokens?: boolean;
    };
    /**
     * Verification configuration
     */
    verification?: {
        /**
         * Change the modelName of the verification table
         */
        modelName?: string;
        /**
         * Map verification fields
         */
        fields?: Partial<Record<keyof OmitId<Verification>, string>>;
        /**
         * disable cleaning up expired values when a verification value is
         * fetched
         */
        disableCleanup?: boolean;
    };
    /**
     * List of trusted origins.
     */
    trustedOrigins?: string[] | ((request: Request) => string[] | Promise<string[]>);
    /**
     * Rate limiting configuration
     */
    rateLimit?: BetterAuthRateLimitOptions;
    /**
     * Advanced options
     */
    advanced?: BetterAuthAdvancedOptions & {
        /**
         * @deprecated Please use `database.generateId` instead.
         */
        generateId?: GenerateIdFn | false;
    };
    logger?: Logger;
    /**
     * allows you to define custom hooks that can be
     * executed during lifecycle of core database
     * operations.
     */
    databaseHooks?: {
        /**
         * User hooks
         */
        user?: {
            create?: {
                /**
                 * Hook that is called before a user is created.
                 * if the hook returns false, the user will not be created.
                 * If the hook returns an object, it'll be used instead of the original data
                 */
                before?: (user: User & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<User> & Record<string, any>;
                }>;
                /**
                 * Hook that is called after a user is created.
                 */
                after?: (user: User & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
            update?: {
                /**
                 * Hook that is called before a user is updated.
                 * if the hook returns false, the user will not be updated.
                 * If the hook returns an object, it'll be used instead of the original data
                 */
                before?: (user: Partial<User> & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<User & Record<string, any>>;
                }>;
                /**
                 * Hook that is called after a user is updated.
                 */
                after?: (user: User & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
            delete?: {
                /**
                 * Hook that is called before a user is deleted.
                 * if the hook returns false, the user will not be deleted.
                 */
                before?: (user: User & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void>;
                /**
                 * Hook that is called after a user is deleted.
                 */
                after?: (user: User & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
        };
        /**
         * Session Hook
         */
        session?: {
            create?: {
                /**
                 * Hook that is called before a session is created.
                 * if the hook returns false, the session will not be created.
                 * If the hook returns an object, it'll be used instead of the original data
                 */
                before?: (session: Session & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Session> & Record<string, any>;
                }>;
                /**
                 * Hook that is called after a session is created.
                 */
                after?: (session: Session & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
            /**
             * Update hook
             */
            update?: {
                /**
                 * Hook that is called before a user is updated.
                 * if the hook returns false, the session will not be updated.
                 * If the hook returns an object, it'll be used instead of the original data
                 */
                before?: (session: Partial<Session> & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Session & Record<string, any>>;
                }>;
                /**
                 * Hook that is called after a session is updated.
                 */
                after?: (session: Session & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
            delete?: {
                /**
                 * Hook that is called before a session is deleted.
                 * if the hook returns false, the session will not be deleted.
                 */
                before?: (session: Session & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void>;
                /**
                 * Hook that is called after a session is deleted.
                 */
                after?: (session: Session & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
        };
        /**
         * Account Hook
         */
        account?: {
            create?: {
                /**
                 * Hook that is called before a account is created.
                 * If the hook returns false, the account will not be created.
                 * If the hook returns an object, it'll be used instead of the original data
                 */
                before?: (account: Account, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Account> & Record<string, any>;
                }>;
                /**
                 * Hook that is called after a account is created.
                 */
                after?: (account: Account, context?: GenericEndpointContext) => Promise<void>;
            };
            /**
             * Update hook
             */
            update?: {
                /**
                 * Hook that is called before a account is update.
                 * If the hook returns false, the user will not be updated.
                 * If the hook returns an object, it'll be used instead of the original data
                 */
                before?: (account: Partial<Account> & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Account & Record<string, any>>;
                }>;
                /**
                 * Hook that is called after a account is updated.
                 */
                after?: (account: Account & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
            delete?: {
                /**
                 * Hook that is called before an account is deleted.
                 * if the hook returns false, the account will not be deleted.
                 */
                before?: (account: Account & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void>;
                /**
                 * Hook that is called after an account is deleted.
                 */
                after?: (account: Account & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
        };
        /**
         * Verification Hook
         */
        verification?: {
            create?: {
                /**
                 * Hook that is called before a verification is created.
                 * if the hook returns false, the verification will not be created.
                 * If the hook returns an object, it'll be used instead of the original data
                 */
                before?: (verification: Verification & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Verification> & Record<string, any>;
                }>;
                /**
                 * Hook that is called after a verification is created.
                 */
                after?: (verification: Verification & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
            update?: {
                /**
                 * Hook that is called before a verification is updated.
                 * if the hook returns false, the verification will not be updated.
                 * If the hook returns an object, it'll be used instead of the original data
                 */
                before?: (verification: Partial<Verification> & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void | {
                    data: Partial<Verification & Record<string, any>>;
                }>;
                /**
                 * Hook that is called after a verification is updated.
                 */
                after?: (verification: Verification & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
            delete?: {
                /**
                 * Hook that is called before a verification is deleted.
                 * if the hook returns false, the verification will not be deleted.
                 */
                before?: (verification: Verification & Record<string, unknown>, context?: GenericEndpointContext) => Promise<boolean | void>;
                /**
                 * Hook that is called after a verification is deleted.
                 */
                after?: (verification: Verification & Record<string, unknown>, context?: GenericEndpointContext) => Promise<void>;
            };
        };
    };
    /**
     * API error handling
     */
    onAPIError?: {
        /**
         * Throw an error on API error
         *
         * @default false
         */
        throw?: boolean;
        /**
         * Custom error handler
         *
         * @param error
         * @param ctx - Auth context
         */
        onError?: (error: unknown, ctx: AuthContext) => void | Promise<void>;
        /**
         * The URL to redirect to on error
         *
         * When errorURL is provided, the error will be added to the URL as a query parameter
         * and the user will be redirected to the errorURL.
         *
         * @default - "/api/auth/error"
         */
        errorURL?: string;
    };
    /**
     * Hooks
     */
    hooks?: {
        /**
         * Before a request is processed
         */
        before?: AuthMiddleware;
        /**
         * After a request is processed
         */
        after?: AuthMiddleware;
    };
    /**
     * Disabled paths
     *
     * Paths you want to disable.
     */
    disabledPaths?: string[];
    /**
     * Telemetry configuration
     */
    telemetry?: {
        /**
         * Enable telemetry collection
         *
         * @default false
         */
        enabled?: boolean;
        /**
         * Enable debug mode
         *
         * @default false
         */
        debug?: boolean;
    };
};

export { createAuthMiddleware as l, createAuthEndpoint as m, optionsMiddleware as o };
export type { AuthContext as A, BetterAuthOptions as B, CleanedWhere as C, DBAdapterDebugLogOption as D, GenerateIdFn as G, InternalAdapter as I, Where as W, AuthMiddleware as a, BetterAuthAdvancedOptions as b, BetterAuthRateLimitOptions as c, BetterAuthCookies as d, GenericEndpointContext as e, DBAdapterSchemaCreation as f, DBAdapterFactoryConfig as g, DBTransactionAdapter as h, DBAdapter as i, CustomAdapter as j, DBAdapterInstance as k, AuthEndpoint as n };
