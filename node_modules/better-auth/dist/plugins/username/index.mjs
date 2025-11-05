import * as z from 'zod';
import { createAuthMiddleware, createAuthEndpoint } from '@better-auth/core/middleware';
import { APIError } from 'better-call';
import { s as setSessionCookie } from '../../shared/better-auth.D9_vQR83.mjs';
import { BASE_ERROR_CODES } from '@better-auth/core/error';
import { m as mergeSchema } from '../../shared/better-auth.Cwj9dt6i.mjs';
import { U as USERNAME_ERROR_CODES } from '../../shared/better-auth.CP1SBr-a.mjs';
import { c as createEmailVerificationToken } from '../../shared/better-auth.BX9UB8EP.mjs';
import '../../shared/better-auth.DEBtROF9.mjs';
import '@better-auth/core/env';
import '@better-auth/core/db';
import '@better-auth/utils/random';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import '@better-auth/utils/base64';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import '../../shared/better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '@better-auth/utils/hmac';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '../../shared/better-auth.DR3R5wdU.mjs';
import '@better-auth/utils/binary';
import '../../shared/better-auth.Ih8C76Vo.mjs';
import '@better-auth/core/utils';
import '@better-auth/core/social-providers';
import '../../shared/better-auth.BUPPRXfK.mjs';
import 'defu';
import '../../crypto/index.mjs';
import 'jose/errors';

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
      signInUsername: createAuthEndpoint(
        "/sign-in/username",
        {
          method: "POST",
          body: z.object({
            username: z.string().meta({ description: "The username of the user" }),
            password: z.string().meta({ description: "The password of the user" }),
            rememberMe: z.boolean().meta({
              description: "Remember the user session"
            }).optional(),
            callbackURL: z.string().meta({
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
            throw new APIError("UNAUTHORIZED", {
              message: USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
            });
          }
          const username2 = options?.validationOrder?.username === "pre-normalization" ? normalizer(ctx.body.username) : ctx.body.username;
          const minUsernameLength = options?.minUsernameLength || 3;
          const maxUsernameLength = options?.maxUsernameLength || 30;
          if (username2.length < minUsernameLength) {
            ctx.context.logger.error("Username too short", {
              username: username2
            });
            throw new APIError("UNPROCESSABLE_ENTITY", {
              message: USERNAME_ERROR_CODES.USERNAME_TOO_SHORT
            });
          }
          if (username2.length > maxUsernameLength) {
            ctx.context.logger.error("Username too long", {
              username: username2
            });
            throw new APIError("UNPROCESSABLE_ENTITY", {
              message: USERNAME_ERROR_CODES.USERNAME_TOO_LONG
            });
          }
          const validator = options?.usernameValidator || defaultUsernameValidator;
          if (!validator(username2)) {
            throw new APIError("UNPROCESSABLE_ENTITY", {
              message: USERNAME_ERROR_CODES.INVALID_USERNAME
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
            throw new APIError("UNAUTHORIZED", {
              message: USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
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
            throw new APIError("UNAUTHORIZED", {
              message: USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
            });
          }
          const currentPassword = account?.password;
          if (!currentPassword) {
            ctx.context.logger.error("Password not found", {
              username: username2
            });
            throw new APIError("UNAUTHORIZED", {
              message: USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
            });
          }
          const validPassword = await ctx.context.password.verify({
            hash: currentPassword,
            password: ctx.body.password
          });
          if (!validPassword) {
            ctx.context.logger.error("Invalid password");
            throw new APIError("UNAUTHORIZED", {
              message: USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
            });
          }
          if (ctx.context.options?.emailAndPassword?.requireEmailVerification && !user.emailVerified) {
            if (!ctx.context.options?.emailVerification?.sendVerificationEmail) {
              throw new APIError("FORBIDDEN", {
                message: USERNAME_ERROR_CODES.EMAIL_NOT_VERIFIED
              });
            }
            if (ctx.context.options?.emailVerification?.sendOnSignIn) {
              const token = await createEmailVerificationToken(
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
            throw new APIError("FORBIDDEN", {
              message: USERNAME_ERROR_CODES.EMAIL_NOT_VERIFIED
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
                message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION
              }
            });
          }
          await setSessionCookie(
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
      isUsernameAvailable: createAuthEndpoint(
        "/is-username-available",
        {
          method: "POST",
          body: z.object({
            username: z.string().meta({
              description: "The username to check"
            })
          })
        },
        async (ctx) => {
          const username2 = ctx.body.username;
          if (!username2) {
            throw new APIError("UNPROCESSABLE_ENTITY", {
              message: USERNAME_ERROR_CODES.INVALID_USERNAME
            });
          }
          const minUsernameLength = options?.minUsernameLength || 3;
          const maxUsernameLength = options?.maxUsernameLength || 30;
          if (username2.length < minUsernameLength) {
            throw new APIError("UNPROCESSABLE_ENTITY", {
              message: USERNAME_ERROR_CODES.USERNAME_TOO_SHORT
            });
          }
          if (username2.length > maxUsernameLength) {
            throw new APIError("UNPROCESSABLE_ENTITY", {
              message: USERNAME_ERROR_CODES.USERNAME_TOO_LONG
            });
          }
          const validator = options?.usernameValidator || defaultUsernameValidator;
          if (!await validator(username2)) {
            throw new APIError("UNPROCESSABLE_ENTITY", {
              message: USERNAME_ERROR_CODES.INVALID_USERNAME
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
    schema: mergeSchema(
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
          handler: createAuthMiddleware(async (ctx) => {
            const username2 = typeof ctx.body.username === "string" && options?.validationOrder?.username === "post-normalization" ? normalizer(ctx.body.username) : ctx.body.username;
            if (username2 !== void 0 && typeof username2 === "string") {
              const minUsernameLength = options?.minUsernameLength || 3;
              const maxUsernameLength = options?.maxUsernameLength || 30;
              if (username2.length < minUsernameLength) {
                throw new APIError("BAD_REQUEST", {
                  message: USERNAME_ERROR_CODES.USERNAME_TOO_SHORT
                });
              }
              if (username2.length > maxUsernameLength) {
                throw new APIError("BAD_REQUEST", {
                  message: USERNAME_ERROR_CODES.USERNAME_TOO_LONG
                });
              }
              const validator = options?.usernameValidator || defaultUsernameValidator;
              const valid = await validator(username2);
              if (!valid) {
                throw new APIError("BAD_REQUEST", {
                  message: USERNAME_ERROR_CODES.INVALID_USERNAME
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
                throw new APIError("BAD_REQUEST", {
                  message: USERNAME_ERROR_CODES.USERNAME_IS_ALREADY_TAKEN
                });
              }
            }
            const displayUsername = typeof ctx.body.displayUsername === "string" && options?.validationOrder?.displayUsername === "post-normalization" ? displayUsernameNormalizer(ctx.body.displayUsername) : ctx.body.displayUsername;
            if (displayUsername !== void 0 && typeof displayUsername === "string") {
              if (options?.displayUsernameValidator) {
                const valid = await options.displayUsernameValidator(displayUsername);
                if (!valid) {
                  throw new APIError("BAD_REQUEST", {
                    message: USERNAME_ERROR_CODES.INVALID_DISPLAY_USERNAME
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
          handler: createAuthMiddleware(async (ctx) => {
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
    $ERROR_CODES: USERNAME_ERROR_CODES
  };
};

export { USERNAME_ERROR_CODES, username };
