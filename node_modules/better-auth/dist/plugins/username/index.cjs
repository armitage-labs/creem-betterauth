'use strict';

const z = require('zod');
const middleware = require('@better-auth/core/middleware');
const betterCall = require('better-call');
const cookies_index = require('../../shared/better-auth.CwvSb6A4.cjs');
const error = require('@better-auth/core/error');
const schema = require('../../shared/better-auth.D2XP_nbx.cjs');
const errorCodes = require('../../shared/better-auth.Bx5mWHak.cjs');
const toAuthEndpoints = require('../../shared/better-auth.b10rFcs4.cjs');
require('../../shared/better-auth.BimfmAGe.cjs');
require('@better-auth/core/env');
require('@better-auth/core/db');
require('@better-auth/utils/random');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('@better-auth/utils/base64');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
require('../../shared/better-auth.CYeOI8C-.cjs');
require('kysely');
require('@better-auth/core/db/adapter');
require('../../shared/better-auth.C1hdVENX.cjs');
require('@better-auth/utils/hmac');
require('../../shared/better-auth.C7Ar55gj.cjs');
require('../../shared/better-auth.Z-JVyRjt.cjs');
require('@better-auth/utils/binary');
require('../../shared/better-auth.CqgkAe9n.cjs');
require('@better-auth/core/utils');
require('@better-auth/core/social-providers');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('defu');
require('../../crypto/index.cjs');
require('jose/errors');

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

const getSchema = (normalizer) => {
  return {
    user: {
      fields: {
        username: {
          type: "string",
          required: false,
          sortable: true,
          unique: true,
          returned: true,
          transform: {
            input(value) {
              return typeof value !== "string" ? value : normalizer.username(value);
            }
          }
        },
        displayUsername: {
          type: "string",
          required: false,
          transform: {
            input(value) {
              return typeof value !== "string" ? value : normalizer.displayUsername(value);
            }
          }
        }
      }
    }
  };
};

function defaultUsernameValidator(username2) {
  return /^[a-zA-Z0-9_.]+$/.test(username2);
}
const username = (options) => {
  const normalizer = (username2) => {
    if (options?.usernameNormalization === false) {
      return username2;
    }
    if (options?.usernameNormalization) {
      return options.usernameNormalization(username2);
    }
    return username2.toLowerCase();
  };
  const displayUsernameNormalizer = (displayUsername) => {
    return options?.displayUsernameNormalization ? options.displayUsernameNormalization(displayUsername) : displayUsername;
  };
  return {
    id: "username",
    init(ctx) {
      return {
        options: {
          databaseHooks: {
            user: {
              create: {
                async before(user, context) {
                  const username2 = "username" in user ? user.username : null;
                  const displayUsername = "displayUsername" in user ? user.displayUsername : null;
                  return {
                    data: {
                      ...user,
                      ...username2 ? { username: normalizer(username2) } : {},
                      ...displayUsername ? {
                        displayUsername: displayUsernameNormalizer(displayUsername)
                      } : {}
                    }
                  };
                }
              },
              update: {
                async before(user, context) {
                  const username2 = "username" in user ? user.username : null;
                  const displayUsername = "displayUsername" in user ? user.displayUsername : null;
                  return {
                    data: {
                      ...user,
                      ...username2 ? { username: normalizer(username2) } : {},
                      ...displayUsername ? {
                        displayUsername: displayUsernameNormalizer(displayUsername)
                      } : {}
                    }
                  };
                }
              }
            }
          }
        }
      };
    },
    endpoints: {
      signInUsername: middleware.createAuthEndpoint(
        "/sign-in/username",
        {
          method: "POST",
          body: z__namespace.object({
            username: z__namespace.string().meta({ description: "The username of the user" }),
            password: z__namespace.string().meta({ description: "The password of the user" }),
            rememberMe: z__namespace.boolean().meta({
              description: "Remember the user session"
            }).optional(),
            callbackURL: z__namespace.string().meta({
              description: "The URL to redirect to after email verification"
            }).optional()
          }),
          metadata: {
            openapi: {
              summary: "Sign in with username",
              description: "Sign in with username",
              responses: {
                200: {
                  description: "Success",
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
                            $ref: "#/components/schemas/User"
                          }
                        },
                        required: ["token", "user"]
                      }
                    }
                  }
                },
                422: {
                  description: "Unprocessable Entity. Validation error",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          message: {
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
          if (!ctx.body.username || !ctx.body.password) {
            ctx.context.logger.error("Username or password not found");
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: errorCodes.USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
            });
          }
          const username2 = options?.validationOrder?.username === "pre-normalization" ? normalizer(ctx.body.username) : ctx.body.username;
          const minUsernameLength = options?.minUsernameLength || 3;
          const maxUsernameLength = options?.maxUsernameLength || 30;
          if (username2.length < minUsernameLength) {
            ctx.context.logger.error("Username too short", {
              username: username2
            });
            throw new betterCall.APIError("UNPROCESSABLE_ENTITY", {
              message: errorCodes.USERNAME_ERROR_CODES.USERNAME_TOO_SHORT
            });
          }
          if (username2.length > maxUsernameLength) {
            ctx.context.logger.error("Username too long", {
              username: username2
            });
            throw new betterCall.APIError("UNPROCESSABLE_ENTITY", {
              message: errorCodes.USERNAME_ERROR_CODES.USERNAME_TOO_LONG
            });
          }
          const validator = options?.usernameValidator || defaultUsernameValidator;
          if (!validator(username2)) {
            throw new betterCall.APIError("UNPROCESSABLE_ENTITY", {
              message: errorCodes.USERNAME_ERROR_CODES.INVALID_USERNAME
            });
          }
          const user = await ctx.context.adapter.findOne({
            model: "user",
            where: [
              {
                field: "username",
                value: normalizer(username2)
              }
            ]
          });
          if (!user) {
            await ctx.context.password.hash(ctx.body.password);
            ctx.context.logger.error("User not found", {
              username: username2
            });
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: errorCodes.USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
            });
          }
          const account = await ctx.context.adapter.findOne({
            model: "account",
            where: [
              {
                field: "userId",
                value: user.id
              },
              {
                field: "providerId",
                value: "credential"
              }
            ]
          });
          if (!account) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: errorCodes.USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
            });
          }
          const currentPassword = account?.password;
          if (!currentPassword) {
            ctx.context.logger.error("Password not found", {
              username: username2
            });
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: errorCodes.USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
            });
          }
          const validPassword = await ctx.context.password.verify({
            hash: currentPassword,
            password: ctx.body.password
          });
          if (!validPassword) {
            ctx.context.logger.error("Invalid password");
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: errorCodes.USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
            });
          }
          if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user.emailVerified) {
            if (!ctx.context.options?.emailVerification?.sendVerificationEmail) {
              throw new betterCall.APIError("FORBIDDEN", {
                message: errorCodes.USERNAME_ERROR_CODES.EMAIL_NOT_VERIFIED
              });
            }
            if (ctx.context.options?.emailVerification?.sendOnSignIn) {
              const token = await toAuthEndpoints.createEmailVerificationToken(
                ctx.context.secret,
                user.email,
                void 0,
                ctx.context.options.emailVerification?.expiresIn
              );
              const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${ctx.body.callbackURL || "/"}`;
              await ctx.context.options.emailVerification.sendVerificationEmail(
                {
                  user,
                  url,
                  token
                },
                ctx.request
              );
            }
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.USERNAME_ERROR_CODES.EMAIL_NOT_VERIFIED
            });
          }
          const session = await ctx.context.internalAdapter.createSession(
            user.id,
            ctx,
            ctx.body.rememberMe === false
          );
          if (!session) {
            return ctx.json(null, {
              status: 500,
              body: {
                message: error.BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION
              }
            });
          }
          await cookies_index.setSessionCookie(
            ctx,
            { session, user },
            ctx.body.rememberMe === false
          );
          return ctx.json({
            token: session.token,
            user: {
              id: user.id,
              email: user.email,
              emailVerified: user.emailVerified,
              username: user.username,
              displayUsername: user.displayUsername,
              name: user.name,
              image: user.image,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            }
          });
        }
      ),
      isUsernameAvailable: middleware.createAuthEndpoint(
        "/is-username-available",
        {
          method: "POST",
          body: z__namespace.object({
            username: z__namespace.string().meta({
              description: "The username to check"
            })
          })
        },
        async (ctx) => {
          const username2 = ctx.body.username;
          if (!username2) {
            throw new betterCall.APIError("UNPROCESSABLE_ENTITY", {
              message: errorCodes.USERNAME_ERROR_CODES.INVALID_USERNAME
            });
          }
          const minUsernameLength = options?.minUsernameLength || 3;
          const maxUsernameLength = options?.maxUsernameLength || 30;
          if (username2.length < minUsernameLength) {
            throw new betterCall.APIError("UNPROCESSABLE_ENTITY", {
              message: errorCodes.USERNAME_ERROR_CODES.USERNAME_TOO_SHORT
            });
          }
          if (username2.length > maxUsernameLength) {
            throw new betterCall.APIError("UNPROCESSABLE_ENTITY", {
              message: errorCodes.USERNAME_ERROR_CODES.USERNAME_TOO_LONG
            });
          }
          const validator = options?.usernameValidator || defaultUsernameValidator;
          if (!await validator(username2)) {
            throw new betterCall.APIError("UNPROCESSABLE_ENTITY", {
              message: errorCodes.USERNAME_ERROR_CODES.INVALID_USERNAME
            });
          }
          const user = await ctx.context.adapter.findOne({
            model: "user",
            where: [
              {
                field: "username",
                value: normalizer(username2)
              }
            ]
          });
          if (user) {
            return ctx.json({
              available: false
            });
          }
          return ctx.json({
            available: true
          });
        }
      )
    },
    schema: schema.mergeSchema(
      getSchema({
        username: normalizer,
        displayUsername: displayUsernameNormalizer
      }),
      options?.schema
    ),
    hooks: {
      before: [
        {
          matcher(context) {
            return context.path === "/sign-up/email" || context.path === "/update-user";
          },
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const username2 = typeof ctx.body.username === "string" && options?.validationOrder?.username === "post-normalization" ? normalizer(ctx.body.username) : ctx.body.username;
            if (username2 !== void 0 && typeof username2 === "string") {
              const minUsernameLength = options?.minUsernameLength || 3;
              const maxUsernameLength = options?.maxUsernameLength || 30;
              if (username2.length < minUsernameLength) {
                throw new betterCall.APIError("BAD_REQUEST", {
                  message: errorCodes.USERNAME_ERROR_CODES.USERNAME_TOO_SHORT
                });
              }
              if (username2.length > maxUsernameLength) {
                throw new betterCall.APIError("BAD_REQUEST", {
                  message: errorCodes.USERNAME_ERROR_CODES.USERNAME_TOO_LONG
                });
              }
              const validator = options?.usernameValidator || defaultUsernameValidator;
              const valid = await validator(username2);
              if (!valid) {
                throw new betterCall.APIError("BAD_REQUEST", {
                  message: errorCodes.USERNAME_ERROR_CODES.INVALID_USERNAME
                });
              }
              const user = await ctx.context.adapter.findOne({
                model: "user",
                where: [
                  {
                    field: "username",
                    value: username2
                  }
                ]
              });
              const blockChangeSignUp = ctx.path === "/sign-up/email" && user;
              const blockChangeUpdateUser = ctx.path === "/update-user" && user && ctx.context.session && user.id !== ctx.context.session.session.userId;
              if (blockChangeSignUp || blockChangeUpdateUser) {
                throw new betterCall.APIError("BAD_REQUEST", {
                  message: errorCodes.USERNAME_ERROR_CODES.USERNAME_IS_ALREADY_TAKEN
                });
              }
            }
            const displayUsername = typeof ctx.body.displayUsername === "string" && options?.validationOrder?.displayUsername === "post-normalization" ? displayUsernameNormalizer(ctx.body.displayUsername) : ctx.body.displayUsername;
            if (displayUsername !== void 0 && typeof displayUsername === "string") {
              if (options?.displayUsernameValidator) {
                const valid = await options.displayUsernameValidator(displayUsername);
                if (!valid) {
                  throw new betterCall.APIError("BAD_REQUEST", {
                    message: errorCodes.USERNAME_ERROR_CODES.INVALID_DISPLAY_USERNAME
                  });
                }
              }
            }
          })
        },
        {
          matcher(context) {
            return context.path === "/sign-up/email" || context.path === "/update-user";
          },
          handler: middleware.createAuthMiddleware(async (ctx) => {
            if (ctx.body.username && !ctx.body.displayUsername) {
              ctx.body.displayUsername = ctx.body.username;
            }
            if (ctx.body.displayUsername && !ctx.body.username) {
              ctx.body.username = ctx.body.displayUsername;
            }
          })
        }
      ]
    },
    $ERROR_CODES: errorCodes.USERNAME_ERROR_CODES
  };
};

exports.USERNAME_ERROR_CODES = errorCodes.USERNAME_ERROR_CODES;
exports.username = username;
