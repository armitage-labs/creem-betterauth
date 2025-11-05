import * as z from 'zod';
import { createAuthEndpoint } from '@better-auth/core/middleware';
import { APIError } from 'better-call';
import { s as setSessionCookie } from '../../shared/better-auth.D9_vQR83.mjs';
import { createHash } from '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import { base64Url } from '@better-auth/utils/base64';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import { BASE_ERROR_CODES } from '@better-auth/core/error';
import { g as generateRandomString } from '../../shared/better-auth.B4Qoxdgc.mjs';
import { o as originCheck } from '../../shared/better-auth.BX9UB8EP.mjs';
import '../../shared/better-auth.DEBtROF9.mjs';
import '@better-auth/core/env';
import '@better-auth/core/db';
import '@better-auth/utils/random';
import 'kysely';
import '@better-auth/core/db/adapter';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '@better-auth/utils/hmac';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '../../shared/better-auth.DR3R5wdU.mjs';
import '@better-auth/utils/binary';
import '../../shared/better-auth.Ih8C76Vo.mjs';
import '@better-auth/core/social-providers';
import '../../shared/better-auth.BUPPRXfK.mjs';
import '../../shared/better-auth.Cwj9dt6i.mjs';
import 'defu';
import '../../crypto/index.mjs';
import 'jose/errors';

const defaultKeyHasher = async (otp) => {
  const hash = await createHash("SHA-256").digest(
    new TextEncoder().encode(otp)
  );
  const hashed = base64Url.encode(new Uint8Array(hash), {
    padding: false
  });
  return hashed;
};

const magicLink = (options) => {
  const opts = {
    storeToken: "plain",
    ...options
  };
  async function storeToken(ctx, token) {
    if (opts.storeToken === "hashed") {
      return await defaultKeyHasher(token);
    }
    if (typeof opts.storeToken === "object" && "type" in opts.storeToken && opts.storeToken.type === "custom-hasher") {
      return await opts.storeToken.hash(token);
    }
    return token;
  }
  return {
    id: "magic-link",
    endpoints: {
      /**
       * ### Endpoint
       *
       * POST `/sign-in/magic-link`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.signInMagicLink`
       *
       * **client:**
       * `authClient.signIn.magicLink`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/sign-in#api-method-sign-in-magic-link)
       */
      signInMagicLink: createAuthEndpoint(
        "/sign-in/magic-link",
        {
          method: "POST",
          requireHeaders: true,
          body: z.object({
            email: z.string().meta({
              description: "Email address to send the magic link"
            }).email(),
            name: z.string().meta({
              description: 'User display name. Only used if the user is registering for the first time. Eg: "my-name"'
            }).optional(),
            callbackURL: z.string().meta({
              description: "URL to redirect after magic link verification"
            }).optional(),
            newUserCallbackURL: z.string().meta({
              description: "URL to redirect after new user signup. Only used if the user is registering for the first time."
            }).optional(),
            errorCallbackURL: z.string().meta({
              description: "URL to redirect after error."
            }).optional()
          }),
          metadata: {
            openapi: {
              description: "Sign in with magic link",
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
          const { email } = ctx.body;
          if (opts.disableSignUp) {
            const user = await ctx.context.internalAdapter.findUserByEmail(email);
            if (!user) {
              throw new APIError("BAD_REQUEST", {
                message: BASE_ERROR_CODES.USER_NOT_FOUND
              });
            }
          }
          const verificationToken = opts?.generateToken ? await opts.generateToken(email) : generateRandomString(32, "a-z", "A-Z");
          const storedToken = await storeToken(ctx, verificationToken);
          await ctx.context.internalAdapter.createVerificationValue(
            {
              identifier: storedToken,
              value: JSON.stringify({ email, name: ctx.body.name }),
              expiresAt: new Date(
                Date.now() + (opts.expiresIn || 60 * 5) * 1e3
              )
            },
            ctx
          );
          const realBaseURL = new URL(ctx.context.baseURL);
          const pathname = realBaseURL.pathname === "/" ? "" : realBaseURL.pathname;
          const basePath = pathname ? "" : ctx.context.options.basePath || "";
          const url = new URL(
            `${pathname}${basePath}/magic-link/verify`,
            realBaseURL.origin
          );
          url.searchParams.set("token", verificationToken);
          url.searchParams.set("callbackURL", ctx.body.callbackURL || "/");
          if (ctx.body.newUserCallbackURL) {
            url.searchParams.set(
              "newUserCallbackURL",
              ctx.body.newUserCallbackURL
            );
          }
          if (ctx.body.errorCallbackURL) {
            url.searchParams.set("errorCallbackURL", ctx.body.errorCallbackURL);
          }
          await options.sendMagicLink(
            {
              email,
              url: url.toString(),
              token: verificationToken
            },
            ctx.request
          );
          return ctx.json({
            status: true
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * GET `/magic-link/verify`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.magicLinkVerify`
       *
       * **client:**
       * `authClient.magicLink.verify`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/magic-link#api-method-magic-link-verify)
       */
      magicLinkVerify: createAuthEndpoint(
        "/magic-link/verify",
        {
          method: "GET",
          query: z.object({
            token: z.string().meta({
              description: "Verification token"
            }),
            callbackURL: z.string().meta({
              description: 'URL to redirect after magic link verification, if not provided the user will be redirected to the root URL. Eg: "/dashboard"'
            }).optional(),
            errorCallbackURL: z.string().meta({
              description: "URL to redirect after error."
            }).optional(),
            newUserCallbackURL: z.string().meta({
              description: "URL to redirect after new user signup. Only used if the user is registering for the first time."
            }).optional()
          }),
          use: [
            originCheck((ctx) => {
              return ctx.query.callbackURL ? decodeURIComponent(ctx.query.callbackURL) : "/";
            }),
            originCheck((ctx) => {
              return ctx.query.newUserCallbackURL ? decodeURIComponent(ctx.query.newUserCallbackURL) : "/";
            }),
            originCheck((ctx) => {
              return ctx.query.errorCallbackURL ? decodeURIComponent(ctx.query.errorCallbackURL) : "/";
            })
          ],
          requireHeaders: true,
          metadata: {
            openapi: {
              description: "Verify magic link",
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
                          },
                          user: {
                            $ref: "#/components/schemas/User"
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
          const token = ctx.query.token;
          const callbackURL = new URL(
            ctx.query.callbackURL ? decodeURIComponent(ctx.query.callbackURL) : "/",
            ctx.context.baseURL
          ).toString();
          const errorCallbackURL = new URL(
            ctx.query.errorCallbackURL ? decodeURIComponent(ctx.query.errorCallbackURL) : callbackURL,
            ctx.context.baseURL
          ).toString();
          const newUserCallbackURL = new URL(
            ctx.query.newUserCallbackURL ? decodeURIComponent(ctx.query.newUserCallbackURL) : callbackURL,
            ctx.context.baseURL
          ).toString();
          callbackURL?.startsWith("http") ? callbackURL : callbackURL ? `${ctx.context.options.baseURL}${callbackURL}` : ctx.context.options.baseURL;
          const storedToken = await storeToken(ctx, token);
          const tokenValue = await ctx.context.internalAdapter.findVerificationValue(
            storedToken
          );
          if (!tokenValue) {
            throw ctx.redirect(`${errorCallbackURL}?error=INVALID_TOKEN`);
          }
          if (tokenValue.expiresAt < /* @__PURE__ */ new Date()) {
            await ctx.context.internalAdapter.deleteVerificationValue(
              tokenValue.id
            );
            throw ctx.redirect(`${errorCallbackURL}?error=EXPIRED_TOKEN`);
          }
          await ctx.context.internalAdapter.deleteVerificationValue(
            tokenValue.id
          );
          const { email, name } = JSON.parse(tokenValue.value);
          let isNewUser = false;
          let user = await ctx.context.internalAdapter.findUserByEmail(email).then((res) => res?.user);
          if (!user) {
            if (!opts.disableSignUp) {
              const newUser = await ctx.context.internalAdapter.createUser(
                {
                  email,
                  emailVerified: true,
                  name: name || ""
                },
                ctx
              );
              isNewUser = true;
              user = newUser;
              if (!user) {
                throw ctx.redirect(
                  `${errorCallbackURL}?error=failed_to_create_user`
                );
              }
            } else {
              throw ctx.redirect(
                `${errorCallbackURL}?error=new_user_signup_disabled`
              );
            }
          }
          if (!user.emailVerified) {
            await ctx.context.internalAdapter.updateUser(
              user.id,
              {
                emailVerified: true
              },
              ctx
            );
          }
          const session = await ctx.context.internalAdapter.createSession(
            user.id,
            ctx
          );
          if (!session) {
            throw ctx.redirect(
              `${errorCallbackURL}?error=failed_to_create_session`
            );
          }
          await setSessionCookie(ctx, {
            session,
            user
          });
          if (!ctx.query.callbackURL) {
            return ctx.json({
              token: session.token,
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
          }
          if (isNewUser) {
            throw ctx.redirect(newUserCallbackURL);
          }
          throw ctx.redirect(callbackURL);
        }
      )
    },
    rateLimit: [
      {
        pathMatcher(path) {
          return path.startsWith("/sign-in/magic-link") || path.startsWith("/magic-link/verify");
        },
        window: opts.rateLimit?.window || 60,
        max: opts.rateLimit?.max || 5
      }
    ]
  };
};

export { magicLink };
