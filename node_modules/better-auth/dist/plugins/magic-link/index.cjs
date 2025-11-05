'use strict';

const z = require('zod');
const middleware = require('@better-auth/core/middleware');
const betterCall = require('better-call');
const cookies_index = require('../../shared/better-auth.CwvSb6A4.cjs');
const hash = require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
const base64 = require('@better-auth/utils/base64');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
const error = require('@better-auth/core/error');
const random = require('../../shared/better-auth.CYeOI8C-.cjs');
const toAuthEndpoints = require('../../shared/better-auth.b10rFcs4.cjs');
require('../../shared/better-auth.BimfmAGe.cjs');
require('@better-auth/core/env');
require('@better-auth/core/db');
require('@better-auth/utils/random');
require('kysely');
require('@better-auth/core/db/adapter');
require('../../shared/better-auth.C1hdVENX.cjs');
require('@better-auth/utils/hmac');
require('../../shared/better-auth.C7Ar55gj.cjs');
require('../../shared/better-auth.Z-JVyRjt.cjs');
require('@better-auth/utils/binary');
require('../../shared/better-auth.CqgkAe9n.cjs');
require('@better-auth/core/social-providers');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('../../shared/better-auth.D2XP_nbx.cjs');
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

const defaultKeyHasher = async (otp) => {
  const hash$1 = await hash.createHash("SHA-256").digest(
    new TextEncoder().encode(otp)
  );
  const hashed = base64.base64Url.encode(new Uint8Array(hash$1), {
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
      signInMagicLink: middleware.createAuthEndpoint(
        "/sign-in/magic-link",
        {
          method: "POST",
          requireHeaders: true,
          body: z__namespace.object({
            email: z__namespace.string().meta({
              description: "Email address to send the magic link"
            }).email(),
            name: z__namespace.string().meta({
              description: 'User display name. Only used if the user is registering for the first time. Eg: "my-name"'
            }).optional(),
            callbackURL: z__namespace.string().meta({
              description: "URL to redirect after magic link verification"
            }).optional(),
            newUserCallbackURL: z__namespace.string().meta({
              description: "URL to redirect after new user signup. Only used if the user is registering for the first time."
            }).optional(),
            errorCallbackURL: z__namespace.string().meta({
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
              throw new betterCall.APIError("BAD_REQUEST", {
                message: error.BASE_ERROR_CODES.USER_NOT_FOUND
              });
            }
          }
          const verificationToken = opts?.generateToken ? await opts.generateToken(email) : random.generateRandomString(32, "a-z", "A-Z");
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
      magicLinkVerify: middleware.createAuthEndpoint(
        "/magic-link/verify",
        {
          method: "GET",
          query: z__namespace.object({
            token: z__namespace.string().meta({
              description: "Verification token"
            }),
            callbackURL: z__namespace.string().meta({
              description: 'URL to redirect after magic link verification, if not provided the user will be redirected to the root URL. Eg: "/dashboard"'
            }).optional(),
            errorCallbackURL: z__namespace.string().meta({
              description: "URL to redirect after error."
            }).optional(),
            newUserCallbackURL: z__namespace.string().meta({
              description: "URL to redirect after new user signup. Only used if the user is registering for the first time."
            }).optional()
          }),
          use: [
            toAuthEndpoints.originCheck((ctx) => {
              return ctx.query.callbackURL ? decodeURIComponent(ctx.query.callbackURL) : "/";
            }),
            toAuthEndpoints.originCheck((ctx) => {
              return ctx.query.newUserCallbackURL ? decodeURIComponent(ctx.query.newUserCallbackURL) : "/";
            }),
            toAuthEndpoints.originCheck((ctx) => {
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
          await cookies_index.setSessionCookie(ctx, {
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

exports.magicLink = magicLink;
