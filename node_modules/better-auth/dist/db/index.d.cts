import { BetterAuthDBSchema, DBFieldAttribute, DBFieldType, User, Account, Session, BetterAuthPluginDBSchema } from '@better-auth/core/db';
export * from '@better-auth/core/db';
import { BetterAuthOptions, AuthContext, InternalAdapter, GenericEndpointContext } from '@better-auth/core';
import { DBAdapter, Where } from '@better-auth/core/db/adapter';
import { InternalLogger } from '@better-auth/core/env';
export { F as FieldAttributeToObject, e as InferAdditionalFieldsFromPluginOptions, g as InferFieldsFromOptions, f as InferFieldsFromPlugins, d as InferFieldsInput, I as InferFieldsInputClient, a as InferFieldsOutput, b as InferValueType, P as PluginFieldAttribute, c as createFieldAttribute } from '../shared/better-auth.kD29xbrE.cjs';
import { T as TransactionAdapter } from '../shared/better-auth.Bn2XUCG7.cjs';
import * as z from 'zod';
import { K as KyselyDatabaseType } from '../shared/better-auth.BnBM8gPy.cjs';

declare const createInternalAdapter: (adapter: DBAdapter<BetterAuthOptions>, ctx: {
    options: Omit<BetterAuthOptions, "logger">;
    logger: InternalLogger;
    hooks: Exclude<BetterAuthOptions["databaseHooks"], undefined>[];
    generateId: AuthContext["generateId"];
}) => InternalAdapter;

declare const getAuthTables: (options: BetterAuthOptions) => BetterAuthDBSchema;

declare function getWithHooks(adapter: DBAdapter<BetterAuthOptions>, ctx: {
    options: BetterAuthOptions;
    hooks: Exclude<BetterAuthOptions["databaseHooks"], undefined>[];
}): {
    createWithHooks: <T extends Record<string, any>>(data: T, model: "user" | "account" | "session" | "verification", customCreateFn?: {
        fn: (data: Record<string, any>) => void | Promise<any>;
        executeMainFn?: boolean;
    }, context?: GenericEndpointContext, trxAdapter?: TransactionAdapter) => Promise<any>;
    updateWithHooks: <T extends Record<string, any>>(data: any, where: Where[], model: "user" | "account" | "session" | "verification", customUpdateFn?: {
        fn: (data: Record<string, any>) => void | Promise<any>;
        executeMainFn?: boolean;
    }, context?: GenericEndpointContext, trxAdapter?: TransactionAdapter) => Promise<any>;
    updateManyWithHooks: <T extends Record<string, any>>(data: any, where: Where[], model: "user" | "account" | "session" | "verification", customUpdateFn?: {
        fn: (data: Record<string, any>) => void | Promise<any>;
        executeMainFn?: boolean;
    }, context?: GenericEndpointContext, trxAdapter?: TransactionAdapter) => Promise<any>;
};

declare function toZodSchema<Fields extends Record<string, DBFieldAttribute | never>, IsClientSide extends boolean>({ fields, isClientSide, }: {
    fields: Fields;
    /**
     * If true, then any fields that have `input: false` will be removed from the schema to prevent user input.
     */
    isClientSide: IsClientSide;
}): z.ZodObject<RemoveNeverProps<{ [key in keyof Fields]: FieldAttributeToSchema<Fields[key], IsClientSide>; }>, z.core.$strip>;
type FieldAttributeToSchema<Field extends DBFieldAttribute | Record<string, never>, isClientSide extends boolean = false> = Field extends {
    type: any;
} ? GetInput<isClientSide, Field, GetRequired<Field, GetType<Field>>> : Record<string, never>;
type GetType<F extends DBFieldAttribute> = F extends {
    type: "string";
} ? z.ZodString : F extends {
    type: "number";
} ? z.ZodNumber : F extends {
    type: "boolean";
} ? z.ZodBoolean : F extends {
    type: "date";
} ? z.ZodDate : z.ZodAny;
type GetRequired<F extends DBFieldAttribute, Schema extends z.core.SomeType> = F extends {
    required: true;
} ? Schema : z.ZodOptional<Schema>;
type GetInput<isClientSide extends boolean, Field extends DBFieldAttribute, Schema extends z.core.SomeType> = Field extends {
    input: false;
} ? isClientSide extends true ? never : Schema : Schema;
type RemoveNeverProps<T> = {
    [K in keyof T as [T[K]] extends [never] ? never : K]: T[K];
};

declare function getAdapter(options: BetterAuthOptions): Promise<DBAdapter<BetterAuthOptions>>;
declare function convertToDB<T extends Record<string, any>>(fields: Record<string, DBFieldAttribute>, values: T): T;
declare function convertFromDB<T extends Record<string, any>>(fields: Record<string, DBFieldAttribute>, values: T | null): T | null;

declare function matchType(columnDataType: string, fieldType: DBFieldType, dbType: KyselyDatabaseType): boolean;
declare function getMigrations(config: BetterAuthOptions): Promise<{
    toBeCreated: {
        table: string;
        fields: Record<string, DBFieldAttribute>;
        order: number;
    }[];
    toBeAdded: {
        table: string;
        fields: Record<string, DBFieldAttribute>;
        order: number;
    }[];
    runMigrations: () => Promise<void>;
    compileMigrations: () => Promise<string>;
}>;

declare function getSchema(config: BetterAuthOptions): Record<string, {
    fields: Record<string, DBFieldAttribute>;
    order: number;
}>;

declare function parseUserOutput(options: BetterAuthOptions, user: User): {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
};
declare function parseAccountOutput(options: BetterAuthOptions, account: Account): {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    providerId: string;
    accountId: string;
    userId: string;
    accessToken?: string | null | undefined;
    refreshToken?: string | null | undefined;
    idToken?: string | null | undefined;
    accessTokenExpiresAt?: Date | null | undefined;
    refreshTokenExpiresAt?: Date | null | undefined;
    scope?: string | null | undefined;
    password?: string | null | undefined;
};
declare function parseSessionOutput(options: BetterAuthOptions, session: Session): {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
};
declare function parseInputData<T extends Record<string, any>>(data: T, schema: {
    fields: Record<string, DBFieldAttribute>;
    action?: "create" | "update";
}): Partial<T>;
declare function parseUserInput(options: BetterAuthOptions, user: Record<string, any> | undefined, action: "create" | "update"): Partial<Record<string, any>>;
declare function parseAdditionalUserInput(options: BetterAuthOptions, user?: Record<string, any>): Partial<Record<string, any>>;
declare function parseAccountInput(options: BetterAuthOptions, account: Partial<Account>): Partial<Partial<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    providerId: string;
    accountId: string;
    userId: string;
    accessToken?: string | null | undefined;
    refreshToken?: string | null | undefined;
    idToken?: string | null | undefined;
    accessTokenExpiresAt?: Date | null | undefined;
    refreshTokenExpiresAt?: Date | null | undefined;
    scope?: string | null | undefined;
    password?: string | null | undefined;
}>>;
declare function parseSessionInput(options: BetterAuthOptions, session: Partial<Session>): Partial<Partial<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
}>>;
declare function mergeSchema<S extends BetterAuthPluginDBSchema>(schema: S, newSchema?: {
    [K in keyof S]?: {
        modelName?: string;
        fields?: {
            [P: string]: string;
        };
    };
}): S;

export { convertFromDB, convertToDB, createInternalAdapter, getAdapter, getAuthTables, getMigrations, getSchema, getWithHooks, matchType, mergeSchema, parseAccountInput, parseAccountOutput, parseAdditionalUserInput, parseInputData, parseSessionInput, parseSessionOutput, parseUserInput, parseUserOutput, toZodSchema };
export type { FieldAttributeToSchema };
