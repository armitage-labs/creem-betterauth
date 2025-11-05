'use strict';

const z = require('zod');
const betterCall = require('better-call');
require('../../shared/better-auth.b10rFcs4.cjs');
require('../../shared/better-auth.BimfmAGe.cjs');
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
const jose = require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
require('../../shared/better-auth.CYeOI8C-.cjs');
require('kysely');
require('@better-auth/core/db/adapter');
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

function toBoolean(value) {
  return value === "true" || value === true;
}

const oneTap = (options) => ({
  id: "one-tap",
  endpoints: {
    oneTapCallback: middleware.createAuthEndpoint(
      "/one-tap/callback",
      {
        method: "POST",
        body: z__namespace.object({
          idToken: z__namespace.string().meta({
            description: "Google ID token, which the client obtains from the One Tap API"
          })
        }),
        metadata: {
          openapi: {
            summary: "One tap callback",
            description: "Use this endpoint to authenticate with Google One Tap",
            responses: {
              200: {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        session: {
                          $ref: "#/components/schemas/Session"
                        },
                        user: {
                          $ref: "#/components/schemas/User"
                        }
                      }
                    }
                  }
                }
              },
              400: {
                description: "Invalid token"
              }
            }
          }
        }
      },
      async (ctx) => {
        const { idToken } = ctx.body;
        let payload;
        try {
          const JWKS = jose.createRemoteJWKSet(
            new URL("https://www.googleapis.com/oauth2/v3/certs")
          );
          const { payload: verifiedPayload } = await jose.jwtVerify(
            idToken,
            JWKS,
            {
              issuer: ["https://accounts.google.com", "accounts.google.com"],
              audience: options?.clientId || ctx.context.options.socialProviders?.google?.clientId
            }
          );
          payload = verifiedPayload;
        } catch (error) {
          throw new betterCall.APIError("BAD_REQUEST", {
            message: "invalid id token"
          });
        }
        const { email, email_verified, name, picture, sub } = payload;
        if (!email) {
          return ctx.json({ error: "Email not available in token" });
        }
        const user = await ctx.context.internalAdapter.findUserByEmail(email);
        if (!user) {
          if (options?.disableSignup) {
            throw new betterCall.APIError("BAD_GATEWAY", {
              message: "User not found"
            });
          }
          const newUser = await ctx.context.internalAdapter.createOAuthUser(
            {
              email,
              emailVerified: typeof email_verified === "boolean" ? email_verified : toBoolean(email_verified),
              name,
              image: picture
            },
            {
              providerId: "google",
              accountId: sub
            },
            ctx
          );
          if (!newUser) {
            throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
              message: "Could not create user"
            });
          }
          const session2 = await ctx.context.internalAdapter.createSession(
            newUser.user.id,
            ctx
          );
          await cookies_index.setSessionCookie(ctx, {
            user: newUser.user,
            session: session2
          });
          return ctx.json({
            token: session2.token,
            user: {
              id: newUser.user.id,
              email: newUser.user.email,
              emailVerified: newUser.user.emailVerified,
              name: newUser.user.name,
              image: newUser.user.image,
              createdAt: newUser.user.createdAt,
              updatedAt: newUser.user.updatedAt
            }
          });
        }
        const account = await ctx.context.internalAdapter.findAccount(sub);
        if (!account) {
          const accountLinking = ctx.context.options.account?.accountLinking;
          const shouldLinkAccount = accountLinking?.enabled && (accountLinking.trustedProviders?.includes("google") || email_verified);
          if (shouldLinkAccount) {
            await ctx.context.internalAdapter.linkAccount({
              userId: user.user.id,
              providerId: "google",
              accountId: sub,
              scope: "openid,profile,email",
              idToken
            });
          } else {
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: "Google sub doesn't match"
            });
          }
        }
        const session = await ctx.context.internalAdapter.createSession(
          user.user.id,
          ctx
        );
        await cookies_index.setSessionCookie(ctx, {
          user: user.user,
          session
        });
        return ctx.json({
          token: session.token,
          user: {
            id: user.user.id,
            email: user.user.email,
            emailVerified: user.user.emailVerified,
            name: user.user.name,
            image: user.user.image,
            createdAt: user.user.createdAt,
            updatedAt: user.user.updatedAt
          }
        });
      }
    )
  }
});

exports.oneTap = oneTap;
