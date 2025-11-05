import { APIError } from 'better-call';
import '../../shared/better-auth.BX9UB8EP.mjs';
import { g as getSessionFromCtx } from '../../shared/better-auth.DEBtROF9.mjs';
import 'zod';
import { createAuthMiddleware, createAuthEndpoint } from '@better-auth/core/middleware';
import { s as setSessionCookie } from '../../shared/better-auth.D9_vQR83.mjs';
import '@better-auth/core/error';
import '@better-auth/core/env';
import '@better-auth/core/db';
import { m as mergeSchema } from '../../shared/better-auth.Cwj9dt6i.mjs';
import { g as generateId } from '../../shared/better-auth.BUPPRXfK.mjs';
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
import { g as getOrigin } from '../../shared/better-auth.DR3R5wdU.mjs';
import { p as parseSetCookieHeader } from '../../shared/better-auth.Ih8C76Vo.mjs';
import '@better-auth/utils/random';
import '@better-auth/core/social-providers';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import 'defu';
import '../../crypto/index.mjs';
import 'jose/errors';

const schema = {
  user: {
    fields: {
      isAnonymous: {
        type: "boolean",
        required: false
      }
    }
  }
};
const anonymous = (options) => {
  const ERROR_CODES = {
    FAILED_TO_CREATE_USER: "Failed to create user",
    COULD_NOT_CREATE_SESSION: "Could not create session",
    ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY: "Anonymous users cannot sign in again anonymously"
  };
  return {
    id: "anonymous",
    endpoints: {
      signInAnonymous: createAuthEndpoint(
        "/sign-in/anonymous",
        {
          method: "POST",
          metadata: {
            openapi: {
              description: "Sign in anonymously",
              responses: {
                200: {
                  description: "Sign in anonymously",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          user: {
                            $ref: "#/components/schemas/User"
                          },
                          session: {
                            $ref: "#/components/schemas/Session"
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
          const existingSession = await getSessionFromCtx(ctx, { disableRefresh: true });
          if (existingSession?.user.isAnonymous) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY
            });
          }
          const { emailDomainName = getOrigin(ctx.context.baseURL) } = options || {};
          const id = generateId();
          const email = `temp-${id}@${emailDomainName}`;
          const name = await options?.generateName?.(ctx) || "Anonymous";
          const newUser = await ctx.context.internalAdapter.createUser(
            {
              email,
              emailVerified: false,
              isAnonymous: true,
              name,
              createdAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            },
            ctx
          );
          if (!newUser) {
            throw ctx.error("INTERNAL_SERVER_ERROR", {
              message: ERROR_CODES.FAILED_TO_CREATE_USER
            });
          }
          const session = await ctx.context.internalAdapter.createSession(
            newUser.id,
            ctx
          );
          if (!session) {
            return ctx.json(null, {
              status: 400,
              body: {
                message: ERROR_CODES.COULD_NOT_CREATE_SESSION
              }
            });
          }
          await setSessionCookie(ctx, {
            session,
            user: newUser
          });
          return ctx.json({
            token: session.token,
            user: {
              id: newUser.id,
              email: newUser.email,
              emailVerified: newUser.emailVerified,
              name: newUser.name,
              createdAt: newUser.createdAt,
              updatedAt: newUser.updatedAt
            }
          });
        }
      )
    },
    hooks: {
      after: [
        {
          matcher(ctx) {
            return ctx.path.startsWith("/sign-in") || ctx.path.startsWith("/sign-up") || ctx.path.startsWith("/callback") || ctx.path.startsWith("/oauth2/callback") || ctx.path.startsWith("/magic-link/verify") || ctx.path.startsWith("/email-otp/verify-email") || ctx.path.startsWith("/one-tap/callback") || ctx.path.startsWith("/passkey/verify-authentication");
          },
          handler: createAuthMiddleware(async (ctx) => {
            const setCookie = ctx.context.responseHeaders?.get("set-cookie");
            const sessionTokenName = ctx.context.authCookies.sessionToken.name;
            const sessionCookie = parseSetCookieHeader(setCookie || "").get(sessionTokenName)?.value.split(".")[0];
            if (!sessionCookie) {
              return;
            }
            const session = await getSessionFromCtx(
              ctx,
              {
                disableRefresh: true
              }
            );
            if (!session || !session.user.isAnonymous) {
              return;
            }
            if (ctx.path === "/sign-in/anonymous" && !ctx.context.newSession) {
              throw new APIError("BAD_REQUEST", {
                message: ERROR_CODES.ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY
              });
            }
            const newSession = ctx.context.newSession;
            if (!newSession) {
              return;
            }
            if (options?.onLinkAccount) {
              await options?.onLinkAccount?.({
                anonymousUser: session,
                newUser: newSession
              });
            }
            if (!options?.disableDeleteAnonymousUser) {
              await ctx.context.internalAdapter.deleteUser(session.user.id);
            }
          })
        }
      ]
    },
    schema: mergeSchema(schema, options?.schema),
    $ERROR_CODES: ERROR_CODES
  };
};

export { anonymous };
