import * as z from 'zod';
import { APIError } from 'better-call';
import '../../shared/better-auth.BX9UB8EP.mjs';
import { s as sessionMiddleware } from '../../shared/better-auth.DEBtROF9.mjs';
import { createAuthMiddleware, createAuthEndpoint } from '@better-auth/core/middleware';
import { p as parseCookies, s as setSessionCookie, d as deleteSessionCookie } from '../../shared/better-auth.D9_vQR83.mjs';
import '@better-auth/core/error';
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
import { p as parseSetCookieHeader } from '../../shared/better-auth.Ih8C76Vo.mjs';
import '@better-auth/core/social-providers';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '../../shared/better-auth.BUPPRXfK.mjs';
import '../../shared/better-auth.Cwj9dt6i.mjs';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import 'defu';
import '../../crypto/index.mjs';
import '../../shared/better-auth.DR3R5wdU.mjs';
import 'jose/errors';

const multiSession = (options) => {
  const opts = {
    maximumSessions: 5,
    ...options
  };
  const isMultiSessionCookie = (key) => key.includes("_multi-");
  const ERROR_CODES = {
    INVALID_SESSION_TOKEN: "Invalid session token"
  };
  return {
    id: "multi-session",
    endpoints: {
      /**
       * ### Endpoint
       *
       * GET `/multi-session/list-device-sessions`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.listDeviceSessions`
       *
       * **client:**
       * `authClient.multiSession.listDeviceSessions`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-list-device-sessions)
       */
      listDeviceSessions: createAuthEndpoint(
        "/multi-session/list-device-sessions",
        {
          method: "GET",
          requireHeaders: true
        },
        async (ctx) => {
          const cookieHeader = ctx.headers?.get("cookie");
          if (!cookieHeader) return ctx.json([]);
          const cookies = Object.fromEntries(parseCookies(cookieHeader));
          const sessionTokens = (await Promise.all(
            Object.entries(cookies).filter(([key]) => isMultiSessionCookie(key)).map(
              async ([key]) => await ctx.getSignedCookie(key, ctx.context.secret)
            )
          )).filter((v) => v !== null);
          if (!sessionTokens.length) return ctx.json([]);
          const sessions = await ctx.context.internalAdapter.findSessions(sessionTokens);
          const validSessions = sessions.filter(
            (session) => session && session.session.expiresAt > /* @__PURE__ */ new Date()
          );
          const uniqueUserSessions = validSessions.reduce(
            (acc, session) => {
              if (!acc.find((s) => s.user.id === session.user.id)) {
                acc.push(session);
              }
              return acc;
            },
            []
          );
          return ctx.json(uniqueUserSessions);
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/multi-session/set-active`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.setActiveSession`
       *
       * **client:**
       * `authClient.multiSession.setActive`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-set-active)
       */
      setActiveSession: createAuthEndpoint(
        "/multi-session/set-active",
        {
          method: "POST",
          body: z.object({
            sessionToken: z.string().meta({
              description: "The session token to set as active"
            })
          }),
          requireHeaders: true,
          use: [sessionMiddleware],
          metadata: {
            openapi: {
              description: "Set the active session",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
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
          const sessionToken = ctx.body.sessionToken;
          const multiSessionCookieName = `${ctx.context.authCookies.sessionToken.name}_multi-${sessionToken.toLowerCase()}`;
          const sessionCookie = await ctx.getSignedCookie(
            multiSessionCookieName,
            ctx.context.secret
          );
          if (!sessionCookie) {
            throw new APIError("UNAUTHORIZED", {
              message: ERROR_CODES.INVALID_SESSION_TOKEN
            });
          }
          const session = await ctx.context.internalAdapter.findSession(sessionToken);
          if (!session || session.session.expiresAt < /* @__PURE__ */ new Date()) {
            ctx.setCookie(multiSessionCookieName, "", {
              ...ctx.context.authCookies.sessionToken.options,
              maxAge: 0
            });
            throw new APIError("UNAUTHORIZED", {
              message: ERROR_CODES.INVALID_SESSION_TOKEN
            });
          }
          await setSessionCookie(ctx, session);
          return ctx.json(session);
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/multi-session/revoke`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.revokeDeviceSession`
       *
       * **client:**
       * `authClient.multiSession.revoke`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-revoke)
       */
      revokeDeviceSession: createAuthEndpoint(
        "/multi-session/revoke",
        {
          method: "POST",
          body: z.object({
            sessionToken: z.string().meta({
              description: "The session token to revoke"
            })
          }),
          requireHeaders: true,
          use: [sessionMiddleware],
          metadata: {
            openapi: {
              description: "Revoke a device session",
              responses: {
                200: {
                  description: "Success",
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
          const sessionToken = ctx.body.sessionToken;
          const multiSessionCookieName = `${ctx.context.authCookies.sessionToken.name}_multi-${sessionToken.toLowerCase()}`;
          const sessionCookie = await ctx.getSignedCookie(
            multiSessionCookieName,
            ctx.context.secret
          );
          if (!sessionCookie) {
            throw new APIError("UNAUTHORIZED", {
              message: ERROR_CODES.INVALID_SESSION_TOKEN
            });
          }
          await ctx.context.internalAdapter.deleteSession(sessionToken);
          ctx.setCookie(multiSessionCookieName, "", {
            ...ctx.context.authCookies.sessionToken.options,
            maxAge: 0
          });
          const isActive = ctx.context.session?.session.token === sessionToken;
          if (!isActive) return ctx.json({ status: true });
          const cookieHeader = ctx.headers?.get("cookie");
          if (cookieHeader) {
            const cookies = Object.fromEntries(parseCookies(cookieHeader));
            const sessionTokens = (await Promise.all(
              Object.entries(cookies).filter(([key]) => isMultiSessionCookie(key)).map(
                async ([key]) => await ctx.getSignedCookie(key, ctx.context.secret)
              )
            )).filter((v) => v !== void 0);
            const internalAdapter = ctx.context.internalAdapter;
            if (sessionTokens.length > 0) {
              const sessions = await internalAdapter.findSessions(sessionTokens);
              const validSessions = sessions.filter(
                (session) => session && session.session.expiresAt > /* @__PURE__ */ new Date()
              );
              if (validSessions.length > 0) {
                const nextSession = validSessions[0];
                await setSessionCookie(ctx, nextSession);
              } else {
                deleteSessionCookie(ctx);
              }
            } else {
              deleteSessionCookie(ctx);
            }
          } else {
            deleteSessionCookie(ctx);
          }
          return ctx.json({
            status: true
          });
        }
      )
    },
    hooks: {
      after: [
        {
          matcher: () => true,
          handler: createAuthMiddleware(async (ctx) => {
            const cookieString = ctx.context.responseHeaders?.get("set-cookie");
            if (!cookieString) return;
            const setCookies = parseSetCookieHeader(cookieString);
            const sessionCookieConfig = ctx.context.authCookies.sessionToken;
            const sessionToken = ctx.context.newSession?.session.token;
            if (!sessionToken) return;
            const cookies = parseCookies(ctx.headers?.get("cookie") || "");
            const cookieName = `${sessionCookieConfig.name}_multi-${sessionToken.toLowerCase()}`;
            if (setCookies.get(cookieName) || cookies.get(cookieName)) return;
            const currentMultiSessions = Object.keys(Object.fromEntries(cookies)).filter(
              isMultiSessionCookie
            ).length + (cookieString.includes("session_token") ? 1 : 0);
            if (currentMultiSessions >= opts.maximumSessions) {
              return;
            }
            await ctx.setSignedCookie(
              cookieName,
              sessionToken,
              ctx.context.secret,
              sessionCookieConfig.options
            );
          })
        },
        {
          matcher: (context) => context.path === "/sign-out",
          handler: createAuthMiddleware(async (ctx) => {
            const cookieHeader = ctx.headers?.get("cookie");
            if (!cookieHeader) return;
            const cookies = Object.fromEntries(parseCookies(cookieHeader));
            const ids = Object.keys(cookies).map((key) => {
              if (isMultiSessionCookie(key)) {
                ctx.setCookie(
                  key.toLowerCase().replace("__secure-", "__Secure-"),
                  "",
                  {
                    ...ctx.context.authCookies.sessionToken.options,
                    maxAge: 0
                  }
                );
                const token = cookies[key].split(".")[0];
                return token;
              }
              return null;
            }).filter((v) => v !== null);
            await ctx.context.internalAdapter.deleteSessions(ids);
          })
        }
      ]
    },
    $ERROR_CODES: ERROR_CODES
  };
};

export { multiSession };
