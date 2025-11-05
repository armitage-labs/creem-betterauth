import { D as DBFieldAttribute, b as DBFieldAttributeConfig, c as DBFieldType, d as DBPrimitive, B as BetterAuthDBSchema } from '../shared/core.CajxAutx.js';
export { S as SecondaryStorage } from '../shared/core.CajxAutx.js';
import { B as BetterAuthPluginDBSchema } from '../shared/core.Bqe5IGAi.js';
import * as z from 'zod';
export { A as Account, R as RateLimit, S as Session, U as User, V as Verification, a as accountSchema, r as rateLimitSchema, s as sessionSchema, u as userSchema, v as verificationSchema } from '../shared/core.Dl-70uns.js';

declare const coreSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDefault<z.ZodDate>;
}, z.core.$strip>;

/**
 * @deprecated Backport for 1.3.x, we will remove this in 1.4.x
 */
type AuthPluginSchema = BetterAuthPluginDBSchema;
/**
 * @deprecated Backport for 1.3.x, we will remove this in 1.4.x
 */
type FieldAttribute = DBFieldAttribute;
/**
 * @deprecated Backport for 1.3.x, we will remove this in 1.4.x
 */
type FieldAttributeConfig = DBFieldAttributeConfig;
/**
 * @deprecated Backport for 1.3.x, we will remove this in 1.4.x
 */
type FieldType = DBFieldType;
/**
 * @deprecated Backport for 1.3.x, we will remove this in 1.4.x
 */
type Primitive = DBPrimitive;
/**
 * @deprecated Backport for 1.3.x, we will remove this in 1.4.x
 */
type BetterAuthDbSchema = BetterAuthDBSchema;

export { BetterAuthDBSchema, BetterAuthPluginDBSchema, DBFieldAttribute, DBFieldAttributeConfig, DBFieldType, DBPrimitive, coreSchema };
export type { AuthPluginSchema, BetterAuthDbSchema, FieldAttribute, FieldAttributeConfig, FieldType, Primitive };
