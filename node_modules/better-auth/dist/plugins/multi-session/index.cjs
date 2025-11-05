'use strict';

const z = require('zod');
const betterCall = require('better-call');
require('../../shared/better-auth.b10rFcs4.cjs');
const session = require('../../shared/better-auth.BimfmAGe.cjs');
const middleware = require('@better-auth/core/middleware');
const cookies_index = require('../../shared/better-auth.CwvSb6A4.cjs');
require('@better-auth/core/error');
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
const cookieUtils = require('../../shared/better-auth.CqgkAe9n.cjs');
require('@better-auth/core/social-providers');
require('../../shared/better-auth.C7Ar55gj.cjs');
require('../../shared/better-auth.C1hdVENX.cjs');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('../../shared/better-auth.D2XP_nbx.cjs');
require('@better-auth/utils/hmac');
require('@better-auth/utils/binary');
require('defu');
require('../../crypto/index.cjs');
require('../../shared/better-auth.Z-JVyRjt.cjs');
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
      listDeviceSessions: middleware.createAuthEndpoint(
        "/multi-session/list-device-sessions",
        {
          method: "GET",
          requireHeaders: true
        },
        async (ctx) => {
          const cookieHeader = ctx.headers?.get("cookie");
          if (!cookieHeader) return ctx.json([]);
          const cookies = Object.fromEntries(cookies_index.parseCookies(cookieHeader));
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
      setActiveSession: middleware.createAuthEndpoint(
        "/multi-session/set-active",
        {
          method: "POST",
          body: z__namespace.object({
            sessionToken: z__namespace.string().meta({
              description: "The session token to set as active"
            })
          }),
          requireHeaders: true,
          use: [session.sessionMiddleware],
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
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: ERROR_CODES.INVALID_SESSION_TOKEN
            });
          }
          const session = await ctx.context.internalAdapter.findSession(sessionToken);
          if (!session || session.session.expiresAt < /* @__PURE__ */ new Date()) {
            ctx.setCookie(multiSessionCookieName, "", {
              ...ctx.context.authCookies.sessionToken.options,
              maxAge: 0
            });
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: ERROR_CODES.INVALID_SESSION_TOKEN
            });
          }
          await cookies_index.setSessionCookie(ctx, session);
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
      revokeDeviceSession: middleware.createAuthEndpoint(
        "/multi-session/revoke",
        {
          method: "POST",
          body: z__namespace.object({
            sessionToken: z__namespace.string().meta({
              description: "The session token to revoke"
            })
          }),
          requireHeaders: true,
          use: [session.sessionMiddleware],
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
            throw new betterCall.APIError("UNAUTHORIZED", {
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
            const cookies = Object.fromEntries(cookies_index.parseCookies(cookieHeader));
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
                await cookies_index.setSessionCookie(ctx, nextSession);
              } else {
                cookies_index.deleteSessionCookie(ctx);
              }
            } else {
              cookies_index.deleteSessionCookie(ctx);
            }
          } else {
            cookies_index.deleteSessionCookie(ctx);
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
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const cookieString = ctx.context.responseHeaders?.get("set-cookie");
            if (!cookieString) return;
            const setCookies = cookieUtils.parseSetCookieHeader(cookieString);
            const sessionCookieConfig = ctx.context.authCookies.sessionToken;
            const sessionToken = ctx.context.newSession?.session.token;
            if (!sessionToken) return;
            const cookies = cookies_index.parseCookies(ctx.headers?.get("cookie") || "");
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
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const cookieHeader = ctx.headers?.get("cookie");
            if (!cookieHeader) return;
            const cookies = Object.fromEntries(cookies_index.parseCookies(cookieHeader));
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

exports.multiSession = multiSession;
