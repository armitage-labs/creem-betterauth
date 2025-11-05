import * as z from 'zod';
import * as _better_auth_core_db from '@better-auth/core/db';
import { DBFieldAttribute, DBFieldType, DBFieldAttributeConfig } from '@better-auth/core/db';
import { BetterAuthOptions } from '@better-auth/core';

declare const createFieldAttribute: <T extends DBFieldType, C extends DBFieldAttributeConfig>(type: T, config?: C) => {
    required?: boolean;
    returned?: boolean;
    input?: boolean;
    defaultValue?: _better_auth_core_db.DBPrimitive | (() => _better_auth_core_db.DBPrimitive);
    onUpdate?: () => _better_auth_core_db.DBPrimitive;
    transform?: {
        input?: (value: _better_auth_core_db.DBPrimitive) => _better_auth_core_db.DBPrimitive | Promise<_better_auth_core_db.DBPrimitive>;
        output?: (value: _better_auth_core_db.DBPrimitive) => _better_auth_core_db.DBPrimitive | Promise<_better_auth_core_db.DBPrimitive>;
    };
    references?: {
        model: string;
        field: string;
        onDelete?: "no action" | "restrict" | "cascade" | "set null" | "set default";
    };
    unique?: boolean;
    bigint?: boolean;
    validator?: {
        input?: z.ZodType;
        output?: z.ZodType;
    };
    fieldName?: string;
    sortable?: boolean;
    type: T;
};
type InferValueType<T extends DBFieldType> = T extends "string" ? string : T extends "number" ? number : T extends "boolean" ? boolean : T extends "date" ? Date : T extends `${infer T}[]` ? T extends "string" ? string[] : number[] : T extends Array<any> ? T[number] : never;
type InferFieldsOutput<Field> = Field extends Record<infer Key, DBFieldAttribute> ? {
    [key in Key as Field[key]["required"] extends false ? Field[key]["defaultValue"] extends boolean | string | number | Date ? key : never : key]: InferFieldOutput<Field[key]>;
} & {
    [key in Key as Field[key]["returned"] extends false ? never : key]?: InferFieldOutput<Field[key]> | null;
} : {};
type InferFieldsInput<Field> = Field extends Record<infer Key, DBFieldAttribute> ? {
    [key in Key as Field[key]["required"] extends false ? never : Field[key]["defaultValue"] extends string | number | boolean | Date ? never : Field[key]["input"] extends false ? never : key]: InferFieldInput<Field[key]>;
} & {
    [key in Key as Field[key]["input"] extends false ? never : key]?: InferFieldInput<Field[key]> | undefined | null;
} : {};
/**
 * For client will add "?" on optional fields
 */
type InferFieldsInputClient<Field> = Field extends Record<infer Key, DBFieldAttribute> ? {
    [key in Key as Field[key]["required"] extends false ? never : Field[key]["defaultValue"] extends string | number | boolean | Date ? never : Field[key]["input"] extends false ? never : key]: InferFieldInput<Field[key]>;
} & {
    [key in Key as Field[key]["input"] extends false ? never : Field[key]["required"] extends false ? key : Field[key]["defaultValue"] extends string | number | boolean | Date ? key : never]?: InferFieldInput<Field[key]> | undefined | null;
} : {};
type InferFieldOutput<T extends DBFieldAttribute> = T["returned"] extends false ? never : T["required"] extends false ? InferValueType<T["type"]> | undefined | null : InferValueType<T["type"]>;
/**
 * Converts a Record<string, DBFieldAttribute> to an object type
 * with keys and value types inferred from DBFieldAttribute["type"].
 */
type FieldAttributeToObject<Fields extends Record<string, DBFieldAttribute>> = AddOptionalFields<{
    [K in keyof Fields]: InferValueType<Fields[K]["type"]>;
}, Fields>;
type AddOptionalFields<T extends Record<string, any>, Fields extends Record<keyof T, DBFieldAttribute>> = {
    [K in keyof T as Fields[K] extends {
        required: true;
    } ? K : never]: T[K];
} & {
    [K in keyof T as Fields[K] extends {
        required: true;
    } ? never : K]?: T[K];
};
/**
 * Infer the additional fields from the plugin options.
 * For example, you can infer the additional fields of the org plugin's organization schema like this:
 * ```ts
 * type AdditionalFields = InferAdditionalFieldsFromPluginOptions<"organization", OrganizationOptions>
 * ```
 */
type InferAdditionalFieldsFromPluginOptions<SchemaName extends string, Options extends {
    schema?: {
        [key in SchemaName]?: {
            additionalFields?: Record<string, DBFieldAttribute>;
        };
    };
}, isClientSide extends boolean = true> = Options["schema"] extends {
    [key in SchemaName]?: {
        additionalFields: infer Field extends Record<string, DBFieldAttribute>;
    };
} ? isClientSide extends true ? FieldAttributeToObject<RemoveFieldsWithInputFalse<Field>> : FieldAttributeToObject<Field> : {};
type RemoveFieldsWithInputFalse<T extends Record<string, DBFieldAttribute>> = {
    [K in keyof T as T[K]["input"] extends false ? never : K]: T[K];
};
type InferFieldInput<T extends DBFieldAttribute> = InferValueType<T["type"]>;
type PluginFieldAttribute = Omit<DBFieldAttribute, "transform" | "defaultValue" | "hashValue">;
type InferFieldsFromPlugins<Options extends BetterAuthOptions, Key extends string, Format extends "output" | "input" = "output"> = Options["plugins"] extends [] ? {} : Options["plugins"] extends Array<infer T> ? T extends {
    schema: {
        [key in Key]: {
            fields: infer Field;
        };
    };
} ? Format extends "output" ? InferFieldsOutput<Field> : InferFieldsInput<Field> : {} : {};
type InferFieldsFromOptions<Options extends BetterAuthOptions, Key extends "session" | "user", Format extends "output" | "input" = "output"> = Options[Key] extends {
    additionalFields: infer Field;
} ? Format extends "output" ? InferFieldsOutput<Field> : InferFieldsInput<Field> : {};

export { createFieldAttribute as c };
export type { FieldAttributeToObject as F, InferFieldsInputClient as I, PluginFieldAttribute as P, InferFieldsOutput as a, InferValueType as b, InferFieldsInput as d, InferAdditionalFieldsFromPluginOptions as e, InferFieldsFromPlugins as f, InferFieldsFromOptions as g };
