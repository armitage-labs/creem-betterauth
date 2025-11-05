import * as z from 'zod';

declare const userSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDefault<z.ZodDate>;
    email: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    emailVerified: z.ZodDefault<z.ZodBoolean>;
    name: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * User schema type used by better-auth, note that it's possible that user could have additional fields
 *
 * todo: we should use generics to extend this type with additional fields from plugins and options in the future
 */
type User = z.infer<typeof userSchema>;

declare const accountSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDefault<z.ZodDate>;
    providerId: z.ZodString;
    accountId: z.ZodString;
    userId: z.ZodCoercedString<unknown>;
    accessToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    refreshToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    idToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    accessTokenExpiresAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    refreshTokenExpiresAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    scope: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    password: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * Account schema type used by better-auth, note that it's possible that account could have additional fields
 *
 * todo: we should use generics to extend this type with additional fields from plugins and options in the future
 */
type Account = z.infer<typeof accountSchema>;

declare const sessionSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDefault<z.ZodDate>;
    userId: z.ZodCoercedString<unknown>;
    expiresAt: z.ZodDate;
    token: z.ZodString;
    ipAddress: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userAgent: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * Session schema type used by better-auth, note that it's possible that session could have additional fields
 *
 * todo: we should use generics to extend this type with additional fields from plugins and options in the future
 */
type Session = z.infer<typeof sessionSchema>;

declare const verificationSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDefault<z.ZodDate>;
    value: z.ZodString;
    expiresAt: z.ZodDate;
    identifier: z.ZodString;
}, z.core.$strip>;
/**
 * Verification schema type used by better-auth, note that it's possible that verification could have additional fields
 *
 * todo: we should use generics to extend this type with additional fields from plugins and options in the future
 */
type Verification = z.infer<typeof verificationSchema>;

declare const rateLimitSchema: z.ZodObject<{
    key: z.ZodString;
    count: z.ZodNumber;
    lastRequest: z.ZodNumber;
}, z.core.$strip>;
/**
 * Rate limit schema type used by better-auth for rate limiting
 */
type RateLimit = z.infer<typeof rateLimitSchema>;

export { accountSchema as a, rateLimitSchema as r, sessionSchema as s, userSchema as u, verificationSchema as v };
export type { Account as A, RateLimit as R, Session as S, User as U, Verification as V };
