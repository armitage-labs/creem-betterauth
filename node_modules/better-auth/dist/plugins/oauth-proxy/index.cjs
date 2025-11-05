'use strict';

const z = require('zod');
require('better-call');
const toAuthEndpoints = require('../../shared/better-auth.b10rFcs4.cjs');
require('../../shared/better-auth.BimfmAGe.cjs');
const middleware = require('@better-auth/core/middleware');
require('@better-auth/core/error');
const env = require('@better-auth/core/env');
require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
const url = require('../../shared/better-auth.Z-JVyRjt.cjs');
require('@better-auth/utils/binary');
require('@better-auth/core/db');
require('@better-auth/utils/random');
const crypto_index = require('../../crypto/index.cjs');
require('kysely');
require('@better-auth/core/db/adapter');
require('../../shared/better-auth.CwvSb6A4.cjs');
require('../../shared/better-auth.C1hdVENX.cjs');
require('../../shared/better-auth.C7Ar55gj.cjs');
require('../../shared/better-auth.CqgkAe9n.cjs');
require('@better-auth/core/social-providers');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
require('../../shared/better-auth.CYeOI8C-.cjs');
require('../../shared/better-auth.D2XP_nbx.cjs');
require('defu');
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

function getVenderBaseURL() {
  const vercel = env.env.VERCEL_URL ? `https://${env.env.VERCEL_URL}` : void 0;
  const netlify = env.env.NETLIFY_URL;
  const render = env.env.RENDER_URL;
  const aws = env.env.AWS_LAMBDA_FUNCTION_NAME;
  const google = env.env.GOOGLE_CLOUD_FUNCTION_NAME;
  const azure = env.env.AZURE_FUNCTION_NAME;
  return vercel || netlify || render || aws || google || azure;
}
const oAuthProxy = (opts) => {
  const resolveCurrentURL = (ctx) => {
    return new URL(
      opts?.currentURL || ctx.request?.url || getVenderBaseURL() || ctx.context.baseURL
    );
  };
  const checkSkipProxy = (ctx) => {
    const skipProxy = ctx.request?.headers.get("x-skip-oauth-proxy");
    if (skipProxy) {
      return true;
    }
    const productionURL = opts?.productionURL || env.env.BETTER_AUTH_URL;
    if (productionURL === ctx.context.options.baseURL) {
      return true;
    }
    return false;
  };
  return {
    id: "oauth-proxy",
    options: opts,
    endpoints: {
      oAuthProxy: middleware.createAuthEndpoint(
        "/oauth-proxy-callback",
        {
          method: "GET",
          query: z__namespace.object({
            callbackURL: z__namespace.string().meta({
              description: "The URL to redirect to after the proxy"
            }),
            cookies: z__namespace.string().meta({
              description: "The cookies to set after the proxy"
            })
          }),
          use: [toAuthEndpoints.originCheck((ctx) => ctx.query.callbackURL)],
          metadata: {
            openapi: {
              description: "OAuth Proxy Callback",
              parameters: [
                {
                  in: "query",
                  name: "callbackURL",
                  required: true,
                  description: "The URL to redirect to after the proxy"
                },
                {
                  in: "query",
                  name: "cookies",
                  required: true,
                  description: "The cookies to set after the proxy"
                }
              ],
              responses: {
                302: {
                  description: "Redirect",
                  headers: {
                    Location: {
                      description: "The URL to redirect to",
                      schema: {
                        type: "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const cookies = ctx.query.cookies;
          const decryptedCookies = await crypto_index.symmetricDecrypt({
            key: ctx.context.secret,
            data: cookies
          }).catch((e) => {
            ctx.context.logger.error(e);
            return null;
          });
          const error = ctx.context.options.onAPIError?.errorURL || `${ctx.context.options.baseURL}/api/auth/error`;
          if (!decryptedCookies) {
            throw ctx.redirect(
              `${error}?error=OAuthProxy - Invalid cookies or secret`
            );
          }
          const isSecureContext = resolveCurrentURL(ctx).protocol === "https:";
          const prefix = ctx.context.options.advanced?.cookiePrefix || "better-auth";
          const cookieToSet = isSecureContext ? decryptedCookies : decryptedCookies.replace("Secure;", "").replace(`__Secure-${prefix}`, prefix);
          ctx.setHeader("set-cookie", cookieToSet);
          throw ctx.redirect(ctx.query.callbackURL);
        }
      )
    },
    hooks: {
      after: [
        {
          matcher(context) {
            return context.path?.startsWith("/callback") || context.path?.startsWith("/oauth2/callback");
          },
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const headers = ctx.context.responseHeaders;
            const location = headers?.get("location");
            if (location?.includes("/oauth-proxy-callback?callbackURL")) {
              if (!location.startsWith("http")) {
                return;
              }
              const locationURL = new URL(location);
              const origin = locationURL.origin;
              const productionURL = opts?.productionURL || ctx.context.options.baseURL || ctx.context.baseURL;
              if (origin === url.getOrigin(productionURL)) {
                const newLocation = locationURL.searchParams.get("callbackURL");
                if (!newLocation) {
                  return;
                }
                ctx.setHeader("location", newLocation);
                return;
              }
              const setCookies = headers?.get("set-cookie");
              if (!setCookies) {
                return;
              }
              const encryptedCookies = await crypto_index.symmetricEncrypt({
                key: ctx.context.secret,
                data: setCookies
              });
              const locationWithCookies = `${location}&cookies=${encodeURIComponent(
                encryptedCookies
              )}`;
              ctx.setHeader("location", locationWithCookies);
            }
          })
        }
      ],
      before: [
        {
          matcher() {
            return true;
          },
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const skipProxy = checkSkipProxy(ctx);
            if (skipProxy || ctx.path !== "/callback/:id") {
              return;
            }
            return {
              context: {
                context: {
                  oauthConfig: {
                    skipStateCookieCheck: true
                  }
                }
              }
            };
          })
        },
        {
          matcher(context) {
            return context.path?.startsWith("/sign-in/social") || context.path?.startsWith("/sign-in/oauth2");
          },
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const skipProxy = checkSkipProxy(ctx);
            console.log("skipProxy", skipProxy);
            if (skipProxy) {
              return;
            }
            const url = resolveCurrentURL(ctx);
            if (!ctx.body) {
              return;
            }
            ctx.body.callbackURL = `${url.origin}${ctx.context.options.basePath || "/api/auth"}/oauth-proxy-callback?callbackURL=${encodeURIComponent(
              ctx.body.callbackURL || ctx.context.baseURL
            )}`;
            return {
              context: ctx
            };
          })
        }
      ]
    }
  };
};

exports.oAuthProxy = oAuthProxy;
