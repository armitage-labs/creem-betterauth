'use strict';

const random = require('../../shared/better-auth.CYeOI8C-.cjs');
const z = require('zod');
const middleware = require('@better-auth/core/middleware');
const betterCall = require('better-call');
require('../../shared/better-auth.b10rFcs4.cjs');
const session = require('../../shared/better-auth.BimfmAGe.cjs');
const cookies_index = require('../../shared/better-auth.CwvSb6A4.cjs');
const error = require('@better-auth/core/error');
require('@better-auth/core/env');
require('@better-auth/core/db');
const schema$1 = require('../../shared/better-auth.D2XP_nbx.cjs');
require('@better-auth/utils/random');
const crypto_index = require('../../crypto/index.cjs');
require('kysely');
require('@better-auth/core/db/adapter');
const base64 = require('@better-auth/utils/base64');
const hmac = require('@better-auth/utils/hmac');
const json = require('../../shared/better-auth.C7Ar55gj.cjs');
require('@better-auth/utils/binary');
const hash = require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
const otp = require('@better-auth/utils/otp');
const password = require('../../shared/better-auth.CDXNofOe.cjs');
const client = require('../../shared/better-auth.DnER2-iT.cjs');
require('@better-auth/core/social-providers');
require('../../shared/better-auth.C1hdVENX.cjs');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('defu');
require('../../shared/better-auth.Z-JVyRjt.cjs');
require('jose/errors');
require('../../shared/better-auth.CqgkAe9n.cjs');

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

const TWO_FACTOR_ERROR_CODES = {
  OTP_NOT_ENABLED: "OTP not enabled",
  OTP_HAS_EXPIRED: "OTP has expired",
  TOTP_NOT_ENABLED: "TOTP not enabled",
  TWO_FACTOR_NOT_ENABLED: "Two factor isn't enabled",
  BACKUP_CODES_NOT_ENABLED: "Backup codes aren't enabled",
  INVALID_BACKUP_CODE: "Invalid backup code",
  INVALID_CODE: "Invalid code",
  TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "Too many attempts. Please request a new code.",
  INVALID_TWO_FACTOR_COOKIE: "Invalid two factor cookie"
};

const TWO_FACTOR_COOKIE_NAME = "two_factor";
const TRUST_DEVICE_COOKIE_NAME = "trust_device";

async function verifyTwoFactor(ctx) {
  const session$1 = await session.getSessionFromCtx(ctx);
  if (!session$1) {
    const cookieName = ctx.context.createAuthCookie(TWO_FACTOR_COOKIE_NAME);
    const twoFactorCookie = await ctx.getSignedCookie(
      cookieName.name,
      ctx.context.secret
    );
    if (!twoFactorCookie) {
      throw new betterCall.APIError("UNAUTHORIZED", {
        message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE
      });
    }
    const verificationToken = await ctx.context.internalAdapter.findVerificationValue(twoFactorCookie);
    if (!verificationToken) {
      throw new betterCall.APIError("UNAUTHORIZED", {
        message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE
      });
    }
    const user = await ctx.context.internalAdapter.findUserById(
      verificationToken.value
    );
    if (!user) {
      throw new betterCall.APIError("UNAUTHORIZED", {
        message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE
      });
    }
    const dontRememberMe = await ctx.getSignedCookie(
      ctx.context.authCookies.dontRememberToken.name,
      ctx.context.secret
    );
    return {
      valid: async (ctx2) => {
        const session2 = await ctx2.context.internalAdapter.createSession(
          verificationToken.value,
          ctx2,
          !!dontRememberMe
        );
        if (!session2) {
          throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
            message: "failed to create session"
          });
        }
        await cookies_index.setSessionCookie(ctx2, {
          session: session2,
          user
        });
        if (ctx2.body.trustDevice) {
          const trustDeviceCookie = ctx2.context.createAuthCookie(
            TRUST_DEVICE_COOKIE_NAME,
            {
              maxAge: 30 * 24 * 60 * 60
              // 30 days, it'll be refreshed on sign in requests
            }
          );
          const token = await hmac.createHMAC("SHA-256", "base64urlnopad").sign(
            ctx2.context.secret,
            `${user.id}!${session2.token}`
          );
          await ctx2.setSignedCookie(
            trustDeviceCookie.name,
            `${token}!${session2.token}`,
            ctx2.context.secret,
            trustDeviceCookie.attributes
          );
          ctx2.setCookie(ctx2.context.authCookies.dontRememberToken.name, "", {
            maxAge: 0
          });
          ctx2.setCookie(cookieName.name, "", {
            maxAge: 0
          });
        }
        return ctx2.json({
          token: session2.token,
          user: {
            id: user.id,
            email: user.email,
            emailVerified: user.emailVerified,
            name: user.name,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
        });
      },
      invalid: async (errorKey) => {
        throw new betterCall.APIError("UNAUTHORIZED", {
          message: TWO_FACTOR_ERROR_CODES[errorKey]
        });
      },
      session: {
        session: null,
        user
      },
      key: twoFactorCookie
    };
  }
  return {
    valid: async (ctx2) => {
      return ctx2.json({
        token: session$1.session.token,
        user: {
          id: session$1.user.id,
          email: session$1.user.email,
          emailVerified: session$1.user.emailVerified,
          name: session$1.user.name,
          image: session$1.user.image,
          createdAt: session$1.user.createdAt,
          updatedAt: session$1.user.updatedAt
        }
      });
    },
    invalid: async () => {
      throw new betterCall.APIError("UNAUTHORIZED", {
        message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE
      });
    },
    session: session$1,
    key: `${session$1.user.id}!${session$1.session.id}`
  };
}

function generateBackupCodesFn(options) {
  return Array.from({ length: options?.amount ?? 10 }).fill(null).map(() => random.generateRandomString(options?.length ?? 10, "a-z", "0-9", "A-Z")).map((code) => `${code.slice(0, 5)}-${code.slice(5)}`);
}
async function generateBackupCodes(secret, options) {
  const backupCodes = options?.customBackupCodesGenerate ? options.customBackupCodesGenerate() : generateBackupCodesFn(options);
  if (options?.storeBackupCodes === "encrypted") {
    const encCodes = await crypto_index.symmetricEncrypt({
      data: JSON.stringify(backupCodes),
      key: secret
    });
    return {
      backupCodes,
      encryptedBackupCodes: encCodes
    };
  }
  if (typeof options?.storeBackupCodes === "object" && "encrypt" in options?.storeBackupCodes) {
    return {
      backupCodes,
      encryptedBackupCodes: await options?.storeBackupCodes.encrypt(
        JSON.stringify(backupCodes)
      )
    };
  }
  return {
    backupCodes,
    encryptedBackupCodes: JSON.stringify(backupCodes)
  };
}
async function verifyBackupCode(data, key, options) {
  const codes = await getBackupCodes(data.backupCodes, key, options);
  if (!codes) {
    return {
      status: false,
      updated: null
    };
  }
  return {
    status: codes.includes(data.code),
    updated: codes.filter((code) => code !== data.code)
  };
}
async function getBackupCodes(backupCodes, key, options) {
  if (options?.storeBackupCodes === "encrypted") {
    const decrypted = await crypto_index.symmetricDecrypt({ key, data: backupCodes });
    return json.safeJSONParse(decrypted);
  }
  if (typeof options?.storeBackupCodes === "object" && "decrypt" in options?.storeBackupCodes) {
    const decrypted = await options?.storeBackupCodes.decrypt(backupCodes);
    return json.safeJSONParse(decrypted);
  }
  return json.safeJSONParse(backupCodes);
}
const backupCode2fa = (opts) => {
  const twoFactorTable = "twoFactor";
  return {
    id: "backup_code",
    endpoints: {
      /**
       * ### Endpoint
       *
       * POST `/two-factor/verify-backup-code`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.verifyBackupCode`
       *
       * **client:**
       * `authClient.twoFactor.verifyBackupCode`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-verify-backup-code)
       */
      verifyBackupCode: middleware.createAuthEndpoint(
        "/two-factor/verify-backup-code",
        {
          method: "POST",
          body: z__namespace.object({
            code: z__namespace.string().meta({
              description: `A backup code to verify. Eg: "123456"`
            }),
            /**
             * Disable setting the session cookie
             */
            disableSession: z__namespace.boolean().meta({
              description: "If true, the session cookie will not be set."
            }).optional(),
            /**
             * if true, the device will be trusted
             * for 30 days. It'll be refreshed on
             * every sign in request within this time.
             */
            trustDevice: z__namespace.boolean().meta({
              description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true"
            }).optional()
          }),
          metadata: {
            openapi: {
              description: "Verify a backup code for two-factor authentication",
              responses: {
                "200": {
                  description: "Backup code verified successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          user: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                                description: "Unique identifier of the user"
                              },
                              email: {
                                type: "string",
                                format: "email",
                                nullable: true,
                                description: "User's email address"
                              },
                              emailVerified: {
                                type: "boolean",
                                nullable: true,
                                description: "Whether the email is verified"
                              },
                              name: {
                                type: "string",
                                nullable: true,
                                description: "User's name"
                              },
                              image: {
                                type: "string",
                                format: "uri",
                                nullable: true,
                                description: "User's profile image URL"
                              },
                              twoFactorEnabled: {
                                type: "boolean",
                                description: "Whether two-factor authentication is enabled for the user"
                              },
                              createdAt: {
                                type: "string",
                                format: "date-time",
                                description: "Timestamp when the user was created"
                              },
                              updatedAt: {
                                type: "string",
                                format: "date-time",
                                description: "Timestamp when the user was last updated"
                              }
                            },
                            required: [
                              "id",
                              "twoFactorEnabled",
                              "createdAt",
                              "updatedAt"
                            ],
                            description: "The authenticated user object with two-factor details"
                          },
                          session: {
                            type: "object",
                            properties: {
                              token: {
                                type: "string",
                                description: "Session token"
                              },
                              userId: {
                                type: "string",
                                description: "ID of the user associated with the session"
                              },
                              createdAt: {
                                type: "string",
                                format: "date-time",
                                description: "Timestamp when the session was created"
                              },
                              expiresAt: {
                                type: "string",
                                format: "date-time",
                                description: "Timestamp when the session expires"
                              }
                            },
                            required: [
                              "token",
                              "userId",
                              "createdAt",
                              "expiresAt"
                            ],
                            description: "The current session object, included unless disableSession is true"
                          }
                        },
                        required: ["user", "session"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const { session, valid } = await verifyTwoFactor(ctx);
          const user = session.user;
          const twoFactor = await ctx.context.adapter.findOne({
            model: twoFactorTable,
            where: [
              {
                field: "userId",
                value: user.id
              }
            ]
          });
          if (!twoFactor) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: TWO_FACTOR_ERROR_CODES.BACKUP_CODES_NOT_ENABLED
            });
          }
          const validate = await verifyBackupCode(
            {
              backupCodes: twoFactor.backupCodes,
              code: ctx.body.code
            },
            ctx.context.secret,
            opts
          );
          if (!validate.status) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: TWO_FACTOR_ERROR_CODES.INVALID_BACKUP_CODE
            });
          }
          const updatedBackupCodes = await crypto_index.symmetricEncrypt({
            key: ctx.context.secret,
            data: JSON.stringify(validate.updated)
          });
          await ctx.context.adapter.updateMany({
            model: twoFactorTable,
            update: {
              backupCodes: updatedBackupCodes
            },
            where: [
              {
                field: "userId",
                value: user.id
              }
            ]
          });
          if (!ctx.body.disableSession) {
            return valid(ctx);
          }
          return ctx.json({
            token: session.session?.token,
            user: {
              id: session.user?.id,
              email: session.user.email,
              emailVerified: session.user.emailVerified,
              name: session.user.name,
              image: session.user.image,
              createdAt: session.user.createdAt,
              updatedAt: session.user.updatedAt
            }
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/two-factor/generate-backup-codes`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.generateBackupCodes`
       *
       * **client:**
       * `authClient.twoFactor.generateBackupCodes`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-generate-backup-codes)
       */
      generateBackupCodes: middleware.createAuthEndpoint(
        "/two-factor/generate-backup-codes",
        {
          method: "POST",
          body: z__namespace.object({
            password: z__namespace.string().meta({
              description: "The users password."
            })
          }),
          use: [session.sessionMiddleware],
          metadata: {
            openapi: {
              description: "Generate new backup codes for two-factor authentication",
              responses: {
                "200": {
                  description: "Backup codes generated successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: {
                            type: "boolean",
                            description: "Indicates if the backup codes were generated successfully",
                            enum: [true]
                          },
                          backupCodes: {
                            type: "array",
                            items: { type: "string" },
                            description: "Array of generated backup codes in plain text"
                          }
                        },
                        required: ["status", "backupCodes"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const user = ctx.context.session.user;
          if (!user.twoFactorEnabled) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: TWO_FACTOR_ERROR_CODES.TWO_FACTOR_NOT_ENABLED
            });
          }
          await ctx.context.password.checkPassword(user.id, ctx);
          const backupCodes = await generateBackupCodes(
            ctx.context.secret,
            opts
          );
          await ctx.context.adapter.updateMany({
            model: twoFactorTable,
            update: {
              backupCodes: backupCodes.encryptedBackupCodes
            },
            where: [
              {
                field: "userId",
                value: ctx.context.session.user.id
              }
            ]
          });
          return ctx.json({
            status: true,
            backupCodes: backupCodes.backupCodes
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * GET `/two-factor/view-backup-codes`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.viewBackupCodes`
       *
       * **client:**
       * `authClient.twoFactor.viewBackupCodes`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-view-backup-codes)
       */
      viewBackupCodes: middleware.createAuthEndpoint(
        "/two-factor/view-backup-codes",
        {
          method: "GET",
          body: z__namespace.object({
            userId: z__namespace.coerce.string().meta({
              description: `The user ID to view all backup codes. Eg: "user-id"`
            })
          }),
          metadata: {
            SERVER_ONLY: true
          }
        },
        async (ctx) => {
          const twoFactor = await ctx.context.adapter.findOne({
            model: twoFactorTable,
            where: [
              {
                field: "userId",
                value: ctx.body.userId
              }
            ]
          });
          if (!twoFactor) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: TWO_FACTOR_ERROR_CODES.BACKUP_CODES_NOT_ENABLED
            });
          }
          const decryptedBackupCodes = await getBackupCodes(
            twoFactor.backupCodes,
            ctx.context.secret,
            opts
          );
          if (!decryptedBackupCodes) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: TWO_FACTOR_ERROR_CODES.INVALID_BACKUP_CODE
            });
          }
          return ctx.json({
            status: true,
            backupCodes: decryptedBackupCodes
          });
        }
      )
    }
  };
};

const defaultKeyHasher = async (token) => {
  const hash$1 = await hash.createHash("SHA-256").digest(
    new TextEncoder().encode(token)
  );
  const hashed = base64.base64Url.encode(new Uint8Array(hash$1), {
    padding: false
  });
  return hashed;
};

const otp2fa = (options) => {
  const opts = {
    storeOTP: "plain",
    digits: 6,
    ...options,
    period: (options?.period || 3) * 60 * 1e3
  };
  const twoFactorTable = "twoFactor";
  async function storeOTP(ctx, otp) {
    if (opts.storeOTP === "hashed") {
      return await defaultKeyHasher(otp);
    }
    if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) {
      return await opts.storeOTP.hash(otp);
    }
    if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) {
      return await opts.storeOTP.encrypt(otp);
    }
    if (opts.storeOTP === "encrypted") {
      return await crypto_index.symmetricEncrypt({
        key: ctx.context.secret,
        data: otp
      });
    }
    return otp;
  }
  async function decryptOTP(ctx, otp) {
    if (opts.storeOTP === "hashed") {
      return await defaultKeyHasher(otp);
    }
    if (opts.storeOTP === "encrypted") {
      return await crypto_index.symmetricDecrypt({
        key: ctx.context.secret,
        data: otp
      });
    }
    if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) {
      return await opts.storeOTP.decrypt(otp);
    }
    if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) {
      return await opts.storeOTP.hash(otp);
    }
    return otp;
  }
  const send2FaOTP = middleware.createAuthEndpoint(
    "/two-factor/send-otp",
    {
      method: "POST",
      body: z__namespace.object({
        /**
         * if true, the device will be trusted
         * for 30 days. It'll be refreshed on
         * every sign in request within this time.
         */
        trustDevice: z__namespace.boolean().optional().meta({
          description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true"
        })
      }).optional(),
      metadata: {
        openapi: {
          summary: "Send two factor OTP",
          description: "Send two factor OTP to the user",
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "boolean"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      if (!options || !options.sendOTP) {
        ctx.context.logger.error(
          "send otp isn't configured. Please configure the send otp function on otp options."
        );
        throw new betterCall.APIError("BAD_REQUEST", {
          message: "otp isn't configured"
        });
      }
      const { session, key } = await verifyTwoFactor(ctx);
      const twoFactor = await ctx.context.adapter.findOne({
        model: twoFactorTable,
        where: [
          {
            field: "userId",
            value: session.user.id
          }
        ]
      });
      if (!twoFactor) {
        throw new betterCall.APIError("BAD_REQUEST", {
          message: TWO_FACTOR_ERROR_CODES.OTP_NOT_ENABLED
        });
      }
      const code = random.generateRandomString(opts.digits, "0-9");
      const hashedCode = await storeOTP(ctx, code);
      await ctx.context.internalAdapter.createVerificationValue(
        {
          value: `${hashedCode}:0`,
          identifier: `2fa-otp-${key}`,
          expiresAt: new Date(Date.now() + opts.period)
        },
        ctx
      );
      await options.sendOTP(
        { user: session.user, otp: code },
        ctx.request
      );
      return ctx.json({ status: true });
    }
  );
  const verifyOTP = middleware.createAuthEndpoint(
    "/two-factor/verify-otp",
    {
      method: "POST",
      body: z__namespace.object({
        code: z__namespace.string().meta({
          description: 'The otp code to verify. Eg: "012345"'
        }),
        /**
         * if true, the device will be trusted
         * for 30 days. It'll be refreshed on
         * every sign in request within this time.
         */
        trustDevice: z__namespace.boolean().optional().meta({
          description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true"
        })
      }),
      metadata: {
        openapi: {
          summary: "Verify two factor OTP",
          description: "Verify two factor OTP",
          responses: {
            "200": {
              description: "Two-factor OTP verified successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                        description: "Session token for the authenticated session"
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            description: "Unique identifier of the user"
                          },
                          email: {
                            type: "string",
                            format: "email",
                            nullable: true,
                            description: "User's email address"
                          },
                          emailVerified: {
                            type: "boolean",
                            nullable: true,
                            description: "Whether the email is verified"
                          },
                          name: {
                            type: "string",
                            nullable: true,
                            description: "User's name"
                          },
                          image: {
                            type: "string",
                            format: "uri",
                            nullable: true,
                            description: "User's profile image URL"
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Timestamp when the user was created"
                          },
                          updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Timestamp when the user was last updated"
                          }
                        },
                        required: ["id", "createdAt", "updatedAt"],
                        description: "The authenticated user object"
                      }
                    },
                    required: ["token", "user"]
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      const { session, key, valid, invalid } = await verifyTwoFactor(ctx);
      const twoFactor = await ctx.context.adapter.findOne({
        model: twoFactorTable,
        where: [
          {
            field: "userId",
            value: session.user.id
          }
        ]
      });
      if (!twoFactor) {
        throw new betterCall.APIError("BAD_REQUEST", {
          message: TWO_FACTOR_ERROR_CODES.OTP_NOT_ENABLED
        });
      }
      const toCheckOtp = await ctx.context.internalAdapter.findVerificationValue(
        `2fa-otp-${key}`
      );
      const [otp, counter] = toCheckOtp?.value?.split(":") ?? [];
      const decryptedOtp = await decryptOTP(ctx, otp);
      if (!toCheckOtp || toCheckOtp.expiresAt < /* @__PURE__ */ new Date()) {
        if (toCheckOtp) {
          await ctx.context.internalAdapter.deleteVerificationValue(
            toCheckOtp.id
          );
        }
        throw new betterCall.APIError("BAD_REQUEST", {
          message: TWO_FACTOR_ERROR_CODES.OTP_HAS_EXPIRED
        });
      }
      const allowedAttempts = options?.allowedAttempts || 5;
      if (parseInt(counter) >= allowedAttempts) {
        await ctx.context.internalAdapter.deleteVerificationValue(
          toCheckOtp.id
        );
        throw new betterCall.APIError("BAD_REQUEST", {
          message: TWO_FACTOR_ERROR_CODES.TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE
        });
      }
      if (decryptedOtp === ctx.body.code) {
        if (!session.user.twoFactorEnabled) {
          if (!session.session) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: error.BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION
            });
          }
          const updatedUser = await ctx.context.internalAdapter.updateUser(
            session.user.id,
            {
              twoFactorEnabled: true
            }
          );
          const newSession = await ctx.context.internalAdapter.createSession(
            session.user.id,
            ctx,
            false,
            session.session
          );
          await ctx.context.internalAdapter.deleteSession(
            session.session.token
          );
          await cookies_index.setSessionCookie(ctx, {
            session: newSession,
            user: updatedUser
          });
          return ctx.json({
            token: newSession.token,
            user: {
              id: updatedUser.id,
              email: updatedUser.email,
              emailVerified: updatedUser.emailVerified,
              name: updatedUser.name,
              image: updatedUser.image,
              createdAt: updatedUser.createdAt,
              updatedAt: updatedUser.updatedAt
            }
          });
        }
        return valid(ctx);
      } else {
        await ctx.context.internalAdapter.updateVerificationValue(
          toCheckOtp.id,
          {
            value: `${otp}:${(parseInt(counter, 10) || 0) + 1}`
          }
        );
        return invalid("INVALID_CODE");
      }
    }
  );
  return {
    id: "otp",
    endpoints: {
      /**
       * ### Endpoint
       *
       * POST `/two-factor/send-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.send2FaOTP`
       *
       * **client:**
       * `authClient.twoFactor.sendOtp`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-send-otp)
       */
      sendTwoFactorOTP: send2FaOTP,
      /**
       * ### Endpoint
       *
       * POST `/two-factor/verify-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.verifyOTP`
       *
       * **client:**
       * `authClient.twoFactor.verifyOtp`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-verify-otp)
       */
      verifyTwoFactorOTP: verifyOTP
    }
  };
};

const totp2fa = (options) => {
  const opts = {
    ...options,
    digits: options?.digits || 6,
    period: options?.period || 30
  };
  const twoFactorTable = "twoFactor";
  const generateTOTP = middleware.createAuthEndpoint(
    "/totp/generate",
    {
      method: "POST",
      body: z__namespace.object({
        secret: z__namespace.string().meta({
          description: "The secret to generate the TOTP code"
        })
      }),
      metadata: {
        openapi: {
          summary: "Generate TOTP code",
          description: "Use this endpoint to generate a TOTP code",
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        SERVER_ONLY: true
      }
    },
    async (ctx) => {
      if (options?.disable) {
        ctx.context.logger.error(
          "totp isn't configured. please pass totp option on two factor plugin to enable totp"
        );
        throw new betterCall.APIError("BAD_REQUEST", {
          message: "totp isn't configured"
        });
      }
      const code = await otp.createOTP(ctx.body.secret, {
        period: opts.period,
        digits: opts.digits
      }).totp();
      return { code };
    }
  );
  const getTOTPURI = middleware.createAuthEndpoint(
    "/two-factor/get-totp-uri",
    {
      method: "POST",
      use: [session.sessionMiddleware],
      body: z__namespace.object({
        password: z__namespace.string().meta({
          description: "User password"
        })
      }),
      metadata: {
        openapi: {
          summary: "Get TOTP URI",
          description: "Use this endpoint to get the TOTP URI",
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      totpURI: {
                        type: "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      if (options?.disable) {
        ctx.context.logger.error(
          "totp isn't configured. please pass totp option on two factor plugin to enable totp"
        );
        throw new betterCall.APIError("BAD_REQUEST", {
          message: "totp isn't configured"
        });
      }
      const user = ctx.context.session.user;
      const twoFactor = await ctx.context.adapter.findOne({
        model: twoFactorTable,
        where: [
          {
            field: "userId",
            value: user.id
          }
        ]
      });
      if (!twoFactor) {
        throw new betterCall.APIError("BAD_REQUEST", {
          message: TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED
        });
      }
      const secret = await crypto_index.symmetricDecrypt({
        key: ctx.context.secret,
        data: twoFactor.secret
      });
      await ctx.context.password.checkPassword(user.id, ctx);
      const totpURI = otp.createOTP(secret, {
        digits: opts.digits,
        period: opts.period
      }).url(options?.issuer || ctx.context.appName, user.email);
      return {
        totpURI
      };
    }
  );
  const verifyTOTP = middleware.createAuthEndpoint(
    "/two-factor/verify-totp",
    {
      method: "POST",
      body: z__namespace.object({
        code: z__namespace.string().meta({
          description: 'The otp code to verify. Eg: "012345"'
        }),
        /**
         * if true, the device will be trusted
         * for 30 days. It'll be refreshed on
         * every sign in request within this time.
         */
        trustDevice: z__namespace.boolean().meta({
          description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true"
        }).optional()
      }),
      metadata: {
        openapi: {
          summary: "Verify two factor TOTP",
          description: "Verify two factor TOTP",
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: {
                        type: "boolean"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      if (options?.disable) {
        ctx.context.logger.error(
          "totp isn't configured. please pass totp option on two factor plugin to enable totp"
        );
        throw new betterCall.APIError("BAD_REQUEST", {
          message: "totp isn't configured"
        });
      }
      const { session, valid, invalid } = await verifyTwoFactor(ctx);
      const user = session.user;
      const twoFactor = await ctx.context.adapter.findOne({
        model: twoFactorTable,
        where: [
          {
            field: "userId",
            value: user.id
          }
        ]
      });
      if (!twoFactor) {
        throw new betterCall.APIError("BAD_REQUEST", {
          message: TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED
        });
      }
      const decrypted = await crypto_index.symmetricDecrypt({
        key: ctx.context.secret,
        data: twoFactor.secret
      });
      const status = await otp.createOTP(decrypted, {
        period: opts.period,
        digits: opts.digits
      }).verify(ctx.body.code);
      if (!status) {
        return invalid("INVALID_CODE");
      }
      if (!user.twoFactorEnabled) {
        if (!session.session) {
          throw new betterCall.APIError("BAD_REQUEST", {
            message: error.BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION
          });
        }
        const updatedUser = await ctx.context.internalAdapter.updateUser(
          user.id,
          {
            twoFactorEnabled: true
          },
          ctx
        );
        const newSession = await ctx.context.internalAdapter.createSession(user.id, ctx, false, session.session).catch((e) => {
          throw e;
        });
        await ctx.context.internalAdapter.deleteSession(session.session.token);
        await cookies_index.setSessionCookie(ctx, {
          session: newSession,
          user: updatedUser
        });
      }
      return valid(ctx);
    }
  );
  return {
    id: "totp",
    endpoints: {
      /**
       * ### Endpoint
       *
       * POST `/totp/generate`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.generateTOTP`
       *
       * **client:**
       * `authClient.totp.generate`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/totp#api-method-totp-generate)
       */
      generateTOTP,
      /**
       * ### Endpoint
       *
       * POST `/two-factor/get-totp-uri`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.getTOTPURI`
       *
       * **client:**
       * `authClient.twoFactor.getTotpUri`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/two-factor#api-method-two-factor-get-totp-uri)
       */
      getTOTPURI,
      verifyTOTP
    }
  };
};

const schema = {
  user: {
    fields: {
      twoFactorEnabled: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false
      }
    }
  },
  twoFactor: {
    fields: {
      secret: {
        type: "string",
        required: true,
        returned: false
      },
      backupCodes: {
        type: "string",
        required: true,
        returned: false
      },
      userId: {
        type: "string",
        required: true,
        returned: false,
        references: {
          model: "user",
          field: "id"
        }
      }
    }
  }
};

const twoFactor = (options) => {
  const opts = {
    twoFactorTable: "twoFactor"
  };
  const backupCodeOptions = {
    storeBackupCodes: "encrypted",
    ...options?.backupCodeOptions
  };
  const totp = totp2fa(options?.totpOptions);
  const backupCode = backupCode2fa(backupCodeOptions);
  const otp$1 = otp2fa(options?.otpOptions);
  return {
    id: "two-factor",
    endpoints: {
      ...totp.endpoints,
      ...otp$1.endpoints,
      ...backupCode.endpoints,
      /**
       * ### Endpoint
       *
       * POST `/two-factor/enable`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.enableTwoFactor`
       *
       * **client:**
       * `authClient.twoFactor.enable`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-enable)
       */
      enableTwoFactor: middleware.createAuthEndpoint(
        "/two-factor/enable",
        {
          method: "POST",
          body: z__namespace.object({
            password: z__namespace.string().meta({
              description: "User password"
            }),
            issuer: z__namespace.string().meta({
              description: "Custom issuer for the TOTP URI"
            }).optional()
          }),
          use: [session.sessionMiddleware],
          metadata: {
            openapi: {
              summary: "Enable two factor authentication",
              description: "Use this endpoint to enable two factor authentication. This will generate a TOTP URI and backup codes. Once the user verifies the TOTP URI, the two factor authentication will be enabled.",
              responses: {
                200: {
                  description: "Successful response",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          totpURI: {
                            type: "string",
                            description: "TOTP URI"
                          },
                          backupCodes: {
                            type: "array",
                            items: {
                              type: "string"
                            },
                            description: "Backup codes"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const user = ctx.context.session.user;
          const { password: password$1, issuer } = ctx.body;
          const isPasswordValid = await password.validatePassword(ctx, {
            password: password$1,
            userId: user.id
          });
          if (!isPasswordValid) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: error.BASE_ERROR_CODES.INVALID_PASSWORD
            });
          }
          const secret = random.generateRandomString(32);
          const encryptedSecret = await crypto_index.symmetricEncrypt({
            key: ctx.context.secret,
            data: secret
          });
          const backupCodes = await generateBackupCodes(
            ctx.context.secret,
            backupCodeOptions
          );
          if (options?.skipVerificationOnEnable) {
            const updatedUser = await ctx.context.internalAdapter.updateUser(
              user.id,
              {
                twoFactorEnabled: true
              },
              ctx
            );
            const newSession = await ctx.context.internalAdapter.createSession(
              updatedUser.id,
              ctx,
              false,
              ctx.context.session.session
            );
            await cookies_index.setSessionCookie(ctx, {
              session: newSession,
              user: updatedUser
            });
            await ctx.context.internalAdapter.deleteSession(
              ctx.context.session.session.token
            );
          }
          await ctx.context.adapter.deleteMany({
            model: opts.twoFactorTable,
            where: [
              {
                field: "userId",
                value: user.id
              }
            ]
          });
          await ctx.context.adapter.create({
            model: opts.twoFactorTable,
            data: {
              secret: encryptedSecret,
              backupCodes: backupCodes.encryptedBackupCodes,
              userId: user.id
            }
          });
          const totpURI = otp.createOTP(secret, {
            digits: options?.totpOptions?.digits || 6,
            period: options?.totpOptions?.period
          }).url(issuer || options?.issuer || ctx.context.appName, user.email);
          return ctx.json({ totpURI, backupCodes: backupCodes.backupCodes });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/two-factor/disable`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.disableTwoFactor`
       *
       * **client:**
       * `authClient.twoFactor.disable`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-disable)
       */
      disableTwoFactor: middleware.createAuthEndpoint(
        "/two-factor/disable",
        {
          method: "POST",
          body: z__namespace.object({
            password: z__namespace.string().meta({
              description: "User password"
            })
          }),
          use: [session.sessionMiddleware],
          metadata: {
            openapi: {
              summary: "Disable two factor authentication",
              description: "Use this endpoint to disable two factor authentication.",
              responses: {
                200: {
                  description: "Successful response",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: {
                            type: "boolean"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const user = ctx.context.session.user;
          const { password: password$1 } = ctx.body;
          const isPasswordValid = await password.validatePassword(ctx, {
            password: password$1,
            userId: user.id
          });
          if (!isPasswordValid) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: "Invalid password"
            });
          }
          const updatedUser = await ctx.context.internalAdapter.updateUser(
            user.id,
            {
              twoFactorEnabled: false
            },
            ctx
          );
          await ctx.context.adapter.delete({
            model: opts.twoFactorTable,
            where: [
              {
                field: "userId",
                value: updatedUser.id
              }
            ]
          });
          const newSession = await ctx.context.internalAdapter.createSession(
            updatedUser.id,
            ctx,
            false,
            ctx.context.session.session
          );
          await cookies_index.setSessionCookie(ctx, {
            session: newSession,
            user: updatedUser
          });
          await ctx.context.internalAdapter.deleteSession(
            ctx.context.session.session.token
          );
          return ctx.json({ status: true });
        }
      )
    },
    options,
    hooks: {
      after: [
        {
          matcher(context) {
            return context.path === "/sign-in/email" || context.path === "/sign-in/username" || context.path === "/sign-in/phone-number";
          },
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const data = ctx.context.newSession;
            if (!data) {
              return;
            }
            if (!data?.user.twoFactorEnabled) {
              return;
            }
            const trustDeviceCookieName = ctx.context.createAuthCookie(
              TRUST_DEVICE_COOKIE_NAME
            );
            const trustDeviceCookie = await ctx.getSignedCookie(
              trustDeviceCookieName.name,
              ctx.context.secret
            );
            if (trustDeviceCookie) {
              const [token, sessionToken] = trustDeviceCookie.split("!");
              const expectedToken = await hmac.createHMAC(
                "SHA-256",
                "base64urlnopad"
              ).sign(ctx.context.secret, `${data.user.id}!${sessionToken}`);
              if (token === expectedToken) {
                const newToken = await hmac.createHMAC(
                  "SHA-256",
                  "base64urlnopad"
                ).sign(ctx.context.secret, `${data.user.id}!${sessionToken}`);
                await ctx.setSignedCookie(
                  trustDeviceCookieName.name,
                  `${newToken}!${data.session.token}`,
                  ctx.context.secret,
                  trustDeviceCookieName.attributes
                );
                return;
              }
            }
            cookies_index.deleteSessionCookie(ctx, true);
            await ctx.context.internalAdapter.deleteSession(data.session.token);
            const maxAge = (options?.otpOptions?.period ?? 3) * 60;
            const twoFactorCookie = ctx.context.createAuthCookie(
              TWO_FACTOR_COOKIE_NAME,
              {
                maxAge
              }
            );
            const identifier = `2fa-${random.generateRandomString(20)}`;
            await ctx.context.internalAdapter.createVerificationValue(
              {
                value: data.user.id,
                identifier,
                expiresAt: new Date(Date.now() + maxAge * 1e3)
              },
              ctx
            );
            await ctx.setSignedCookie(
              twoFactorCookie.name,
              identifier,
              ctx.context.secret,
              twoFactorCookie.attributes
            );
            return ctx.json({
              twoFactorRedirect: true
            });
          })
        }
      ]
    },
    schema: schema$1.mergeSchema(schema, options?.schema),
    rateLimit: [
      {
        pathMatcher(path) {
          return path.startsWith("/two-factor/");
        },
        window: 10,
        max: 3
      }
    ],
    $ERROR_CODES: TWO_FACTOR_ERROR_CODES
  };
};

exports.twoFactorClient = client.twoFactorClient;
exports.TWO_FACTOR_ERROR_CODES = TWO_FACTOR_ERROR_CODES;
exports.twoFactor = twoFactor;
