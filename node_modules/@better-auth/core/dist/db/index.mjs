import * as z from 'zod';

const coreSchema = z.object({
  id: z.string(),
  createdAt: z.date().default(() => /* @__PURE__ */ new Date()),
  updatedAt: z.date().default(() => /* @__PURE__ */ new Date())
});

const userSchema = coreSchema.extend({
  email: z.string().transform((val) => val.toLowerCase()),
  emailVerified: z.boolean().default(false),
  name: z.string(),
  image: z.string().nullish()
});

const accountSchema = coreSchema.extend({
  providerId: z.string(),
  accountId: z.string(),
  userId: z.coerce.string(),
  accessToken: z.string().nullish(),
  refreshToken: z.string().nullish(),
  idToken: z.string().nullish(),
  /**
   * Access token expires at
   */
  accessTokenExpiresAt: z.date().nullish(),
  /**
   * Refresh token expires at
   */
  refreshTokenExpiresAt: z.date().nullish(),
  /**
   * The scopes that the user has authorized
   */
  scope: z.string().nullish(),
  /**
   * Password is only stored in the credential provider
   */
  password: z.string().nullish()
});

const sessionSchema = coreSchema.extend({
  userId: z.coerce.string(),
  expiresAt: z.date(),
  token: z.string(),
  ipAddress: z.string().nullish(),
  userAgent: z.string().nullish()
});

const verificationSchema = coreSchema.extend({
  value: z.string(),
  expiresAt: z.date(),
  identifier: z.string()
});

const rateLimitSchema = z.object({
  /**
   * The key to use for rate limiting
   */
  key: z.string(),
  /**
   * The number of requests made
   */
  count: z.number(),
  /**
   * The last request time in milliseconds
   */
  lastRequest: z.number()
});

export { accountSchema, coreSchema, rateLimitSchema, sessionSchema, userSchema, verificationSchema };
