import * as z from 'zod';
import { APIError } from 'better-call';
import '../../shared/better-auth.BX9UB8EP.mjs';
import '../../shared/better-auth.DEBtROF9.mjs';
import { createAuthEndpoint } from '@better-auth/core/middleware';
import { s as setSessionCookie } from '../../shared/better-auth.D9_vQR83.mjs';
import '@better-auth/core/error';
import '@better-auth/core/env';
import '@better-auth/core/db';
import '@better-auth/utils/random';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import '@better-auth/utils/base64';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import '../../shared/better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
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
import '../../shared/better-auth.Ih8C76Vo.mjs';

function toBoolean(value) {
  return value === "true" || value === true;
}

const oneTap = (options) => ({
  id: "one-tap",
  endpoints: {
    oneTapCallback: createAuthEndpoint(
      "/one-tap/callback",
      {
        method: "POST",
        body: z.object({
          idToken: z.string().meta({
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
          const JWKS = createRemoteJWKSet(
            new URL("https://www.googleapis.com/oauth2/v3/certs")
          );
          const { payload: verifiedPayload } = await jwtVerify(
            idToken,
            JWKS,
            {
              issuer: ["https://accounts.google.com", "accounts.google.com"],
              audience: options?.clientId || ctx.context.options.socialProviders?.google?.clientId
            }
          );
          payload = verifiedPayload;
        } catch (error) {
          throw new APIError("BAD_REQUEST", {
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
            throw new APIError("BAD_GATEWAY", {
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
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Could not create user"
            });
          }
          const session2 = await ctx.context.internalAdapter.createSession(
            newUser.user.id,
            ctx
          );
          await setSessionCookie(ctx, {
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
            throw new APIError("UNAUTHORIZED", {
              message: "Google sub doesn't match"
            });
          }
        }
        const session = await ctx.context.internalAdapter.createSession(
          user.user.id,
          ctx
        );
        await setSessionCookie(ctx, {
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

export { oneTap };
