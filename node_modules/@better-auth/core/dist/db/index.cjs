'use strict';

const z = require('zod');

function _interopNamespaceCompat(e) {
	if (e && typeof e === 'object' && 'default' in e) return e;
	const n = Object.create(null);
	if (e) {
		for (const k in e) {
			n[k] = e[k];
		}
	}
	n.default = e;
	return n;
}

const z__namespace = /*#__PURE__*/_interopNamespaceCompat(z);

const coreSchema = z__namespace.object({
  id: z__namespace.string(),
  createdAt: z__namespace.date().default(() => /* @__PURE__ */ new Date()),
  updatedAt: z__namespace.date().default(() => /* @__PURE__ */ new Date())
});

const userSchema = coreSchema.extend({
  email: z__namespace.string().transform((val) => val.toLowerCase()),
  emailVerified: z__namespace.boolean().default(false),
  name: z__namespace.string(),
  image: z__namespace.string().nullish()
});

const accountSchema = coreSchema.extend({
  providerId: z__namespace.string(),
  accountId: z__namespace.string(),
  userId: z__namespace.coerce.string(),
  accessToken: z__namespace.string().nullish(),
  refreshToken: z__namespace.string().nullish(),
  idToken: z__namespace.string().nullish(),
  /**
   * Access token expires at
   */
  accessTokenExpiresAt: z__namespace.date().nullish(),
  /**
   * Refresh token expires at
   */
  refreshTokenExpiresAt: z__namespace.date().nullish(),
  /**
   * The scopes that the user has authorized
   */
  scope: z__namespace.string().nullish(),
  /**
   * Password is only stored in the credential provider
   */
  password: z__namespace.string().nullish()
});

const sessionSchema = coreSchema.extend({
  userId: z__namespace.coerce.string(),
  expiresAt: z__namespace.date(),
  token: z__namespace.string(),
  ipAddress: z__namespace.string().nullish(),
  userAgent: z__namespace.string().nullish()
});

const verificationSchema = coreSchema.extend({
  value: z__namespace.string(),
  expiresAt: z__namespace.date(),
  identifier: z__namespace.string()
});

const rateLimitSchema = z__namespace.object({
  /**
   * The key to use for rate limiting
   */
  key: z__namespace.string(),
  /**
   * The number of requests made
   */
  count: z__namespace.number(),
  /**
   * The last request time in milliseconds
   */
  lastRequest: z__namespace.number()
});

exports.accountSchema = accountSchema;
exports.coreSchema = coreSchema;
exports.rateLimitSchema = rateLimitSchema;
exports.sessionSchema = sessionSchema;
exports.userSchema = userSchema;
exports.verificationSchema = verificationSchema;
