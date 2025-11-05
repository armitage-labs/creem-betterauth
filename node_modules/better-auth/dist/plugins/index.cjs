'use strict';

const organization = require('../shared/better-auth.CkenUgdp.cjs');
const plugins_twoFactor_index = require('./two-factor/index.cjs');
const plugins_username_index = require('./username/index.cjs');
const plugins_bearer_index = require('./bearer/index.cjs');
const toAuthEndpoints = require('../shared/better-auth.b10rFcs4.cjs');
const plugins_magicLink_index = require('./magic-link/index.cjs');
const plugins_phoneNumber_index = require('./phone-number/index.cjs');
const plugins_anonymous_index = require('./anonymous/index.cjs');
const admin = require('../shared/better-auth.aYwfa4Zw.cjs');
const plugins_genericOauth_index = require('./generic-oauth/index.cjs');
const plugins_jwt_index = require('./jwt/index.cjs');
const plugins_multiSession_index = require('./multi-session/index.cjs');
const plugins_emailOtp_index = require('./email-otp/index.cjs');
const plugins_oneTap_index = require('./one-tap/index.cjs');
const plugins_oauthProxy_index = require('./oauth-proxy/index.cjs');
const plugins_customSession_index = require('./custom-session/index.cjs');
const plugins_openApi_index = require('./open-api/index.cjs');
const plugins_oidcProvider_index = require('../shared/better-auth.l34T33PQ.cjs');
const plugins_captcha_index = require('./captcha/index.cjs');
const plugins_oneTimeToken_index = require('../shared/better-auth.D7DXZSN4.cjs');
const plugins_haveibeenpwned_index = require('./haveibeenpwned/index.cjs');
const z = require('zod');
const middleware = require('@better-auth/core/middleware');
const betterCall = require('better-call');
const session = require('../shared/better-auth.BimfmAGe.cjs');
require('@better-auth/core/error');
const env = require('@better-auth/core/env');
const base64 = require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
const url = require('../shared/better-auth.Z-JVyRjt.cjs');
require('@better-auth/utils/binary');
const cookieUtils = require('../shared/better-auth.CqgkAe9n.cjs');
require('@better-auth/core/db');
require('@better-auth/utils/random');
const hash = require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
const jose = require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
const random = require('../shared/better-auth.CYeOI8C-.cjs');
require('kysely');
require('@better-auth/core/db/adapter');
const utils = require('@better-auth/utils');
const plugins_siwe_index = require('./siwe/index.cjs');
const plugins_deviceAuthorization_index = require('./device-authorization/index.cjs');
const client = require('../shared/better-auth.DnER2-iT.cjs');
const errorCodes = require('../shared/better-auth.Bx5mWHak.cjs');
const sign = require('../shared/better-auth.COF45WkB.cjs');
const client$1 = require('../shared/better-auth.BMgeJg3r.cjs');
require('../shared/better-auth.C1hdVENX.cjs');
require('../shared/better-auth.DUNU0obG.cjs');
require('../shared/better-auth.KwRooTgr.cjs');
require('@better-auth/core/utils');
require('../shared/better-auth.Bg6iw3ig.cjs');
require('../shared/better-auth.CwvSb6A4.cjs');
require('../shared/better-auth.C7Ar55gj.cjs');
require('../shared/better-auth.CsC4FSOQ.cjs');
require('../shared/better-auth.kVDH3hoR.cjs');
require('../shared/better-auth.HiXxvark.cjs');
require('../shared/better-auth.CqRypKVa.cjs');
require('../shared/better-auth.D2XP_nbx.cjs');
require('../crypto/index.cjs');
require('@better-auth/utils/otp');
require('../shared/better-auth.CDXNofOe.cjs');
require('@better-auth/core/social-providers');
require('defu');
require('jose/errors');
require('../shared/better-auth.DNqtHmvg.cjs');
require('../shared/better-auth.Zk899y_h.cjs');
require('../shared/better-auth.D1q5UHpO.cjs');
require('../shared/better-auth.DtX8_eyE.cjs');
require('@better-fetch/fetch');
require('@better-auth/core/oauth2');
require('../api/index.cjs');
require('../shared/better-auth.Ga4lloSW.cjs');
require('../shared/better-auth.DAHECDyM.cjs');
require('../shared/better-auth.BM1EYiYB.cjs');
require('@noble/hashes/sha3.js');

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

function redirectErrorURL(url, error, description) {
  return `${url.includes("?") ? "&" : "?"}error=${error}&error_description=${description}`;
}
async function authorizeMCPOAuth(ctx, options) {
  ctx.setHeader("Access-Control-Allow-Origin", "*");
  ctx.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  ctx.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  ctx.setHeader("Access-Control-Max-Age", "86400");
  const opts = {
    codeExpiresIn: 600,
    defaultScope: "openid",
    ...options,
    scopes: [
      "openid",
      "profile",
      "email",
      "offline_access",
      ...options?.scopes || []
    ]
  };
  if (!ctx.request) {
    throw new betterCall.APIError("UNAUTHORIZED", {
      error_description: "request not found",
      error: "invalid_request"
    });
  }
  const session$1 = await session.getSessionFromCtx(ctx);
  if (!session$1) {
    await ctx.setSignedCookie(
      "oidc_login_prompt",
      JSON.stringify(ctx.query),
      ctx.context.secret,
      {
        maxAge: 600,
        path: "/",
        sameSite: "lax"
      }
    );
    const queryFromURL = ctx.request.url?.split("?")[1];
    throw ctx.redirect(`${options.loginPage}?${queryFromURL}`);
  }
  const query = ctx.query;
  console.log(query);
  if (!query.client_id) {
    throw ctx.redirect(`${ctx.context.baseURL}/error?error=invalid_client`);
  }
  if (!query.response_type) {
    throw ctx.redirect(
      redirectErrorURL(
        `${ctx.context.baseURL}/error`,
        "invalid_request",
        "response_type is required"
      )
    );
  }
  const client = await ctx.context.adapter.findOne({
    model: "oauthApplication",
    where: [
      {
        field: "clientId",
        value: ctx.query.client_id
      }
    ]
  }).then((res) => {
    if (!res) {
      return null;
    }
    return {
      ...res,
      redirectURLs: res.redirectURLs.split(","),
      metadata: res.metadata ? JSON.parse(res.metadata) : {}
    };
  });
  console.log(client);
  if (!client) {
    throw ctx.redirect(`${ctx.context.baseURL}/error?error=invalid_client`);
  }
  const redirectURI = client.redirectURLs.find(
    (url) => url === ctx.query.redirect_uri
  );
  if (!redirectURI || !query.redirect_uri) {
    throw new betterCall.APIError("BAD_REQUEST", {
      message: "Invalid redirect URI"
    });
  }
  if (client.disabled) {
    throw ctx.redirect(`${ctx.context.baseURL}/error?error=client_disabled`);
  }
  if (query.response_type !== "code") {
    throw ctx.redirect(
      `${ctx.context.baseURL}/error?error=unsupported_response_type`
    );
  }
  const requestScope = query.scope?.split(" ").filter((s) => s) || opts.defaultScope.split(" ");
  const invalidScopes = requestScope.filter((scope) => {
    return !opts.scopes.includes(scope);
  });
  if (invalidScopes.length) {
    throw ctx.redirect(
      redirectErrorURL(
        query.redirect_uri,
        "invalid_scope",
        `The following scopes are invalid: ${invalidScopes.join(", ")}`
      )
    );
  }
  if ((!query.code_challenge || !query.code_challenge_method) && options.requirePKCE) {
    throw ctx.redirect(
      redirectErrorURL(
        query.redirect_uri,
        "invalid_request",
        "pkce is required"
      )
    );
  }
  if (!query.code_challenge_method) {
    query.code_challenge_method = "plain";
  }
  if (![
    "s256",
    options.allowPlainCodeChallengeMethod ? "plain" : "s256"
  ].includes(query.code_challenge_method?.toLowerCase() || "")) {
    throw ctx.redirect(
      redirectErrorURL(
        query.redirect_uri,
        "invalid_request",
        "invalid code_challenge method"
      )
    );
  }
  const code = random.generateRandomString(32, "a-z", "A-Z", "0-9");
  const codeExpiresInMs = opts.codeExpiresIn * 1e3;
  const expiresAt = new Date(Date.now() + codeExpiresInMs);
  try {
    await ctx.context.internalAdapter.createVerificationValue(
      {
        value: JSON.stringify({
          clientId: client.clientId,
          redirectURI: query.redirect_uri,
          scope: requestScope,
          userId: session$1.user.id,
          authTime: new Date(session$1.session.createdAt).getTime(),
          /**
           * If the prompt is set to `consent`, then we need
           * to require the user to consent to the scopes.
           *
           * This means the code now needs to be treated as a
           * consent request.
           *
           * once the user consents, the code will be updated
           * with the actual code. This is to prevent the
           * client from using the code before the user
           * consents.
           */
          requireConsent: query.prompt === "consent",
          state: query.prompt === "consent" ? query.state : null,
          codeChallenge: query.code_challenge,
          codeChallengeMethod: query.code_challenge_method,
          nonce: query.nonce
        }),
        identifier: code,
        expiresAt
      },
      ctx
    );
  } catch (e) {
    throw ctx.redirect(
      redirectErrorURL(
        query.redirect_uri,
        "server_error",
        "An error occurred while processing the request"
      )
    );
  }
  const redirectURIWithCode = new URL(redirectURI);
  redirectURIWithCode.searchParams.set("code", code);
  redirectURIWithCode.searchParams.set("state", ctx.query.state);
  if (query.prompt !== "consent") {
    throw ctx.redirect(redirectURIWithCode.toString());
  }
  throw ctx.redirect(redirectURIWithCode.toString());
}

const getMCPProviderMetadata = (ctx, options) => {
  const issuer = ctx.context.options.baseURL;
  const baseURL = ctx.context.baseURL;
  if (!issuer || !baseURL) {
    throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
      error: "invalid_issuer",
      error_description: "issuer or baseURL is not set. If you're the app developer, please make sure to set the `baseURL` in your auth config."
    });
  }
  return {
    issuer,
    authorization_endpoint: `${baseURL}/mcp/authorize`,
    token_endpoint: `${baseURL}/mcp/token`,
    userinfo_endpoint: `${baseURL}/mcp/userinfo`,
    jwks_uri: `${baseURL}/mcp/jwks`,
    registration_endpoint: `${baseURL}/mcp/register`,
    scopes_supported: ["openid", "profile", "email", "offline_access"],
    response_types_supported: ["code"],
    response_modes_supported: ["query"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    acr_values_supported: [
      "urn:mace:incommon:iap:silver",
      "urn:mace:incommon:iap:bronze"
    ],
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["RS256", "none"],
    token_endpoint_auth_methods_supported: [
      "client_secret_basic",
      "client_secret_post",
      "none"
    ],
    code_challenge_methods_supported: ["S256"],
    claims_supported: [
      "sub",
      "iss",
      "aud",
      "exp",
      "nbf",
      "iat",
      "jti",
      "email",
      "email_verified",
      "name"
    ],
    ...options?.metadata
  };
};
const getMCPProtectedResourceMetadata = (ctx, options) => {
  const baseURL = ctx.context.baseURL;
  return {
    resource: options?.resource ?? new URL(baseURL).origin,
    authorization_servers: [baseURL],
    jwks_uri: options?.oidcConfig?.metadata?.jwks_uri ?? `${baseURL}/mcp/jwks`,
    scopes_supported: options?.oidcConfig?.metadata?.scopes_supported ?? [
      "openid",
      "profile",
      "email",
      "offline_access"
    ],
    bearer_methods_supported: ["header"],
    resource_signing_alg_values_supported: ["RS256", "none"]
  };
};
const mcp = (options) => {
  const opts = {
    codeExpiresIn: 600,
    defaultScope: "openid",
    accessTokenExpiresIn: 3600,
    refreshTokenExpiresIn: 604800,
    allowPlainCodeChallengeMethod: true,
    ...options.oidcConfig,
    loginPage: options.loginPage,
    scopes: [
      "openid",
      "profile",
      "email",
      "offline_access",
      ...options.oidcConfig?.scopes || []
    ]
  };
  const modelName = {
    oauthClient: "oauthApplication",
    oauthAccessToken: "oauthAccessToken"};
  plugins_oidcProvider_index.oidcProvider(opts);
  return {
    id: "mcp",
    hooks: {
      after: [
        {
          matcher() {
            return true;
          },
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const cookie = await ctx.getSignedCookie(
              "oidc_login_prompt",
              ctx.context.secret
            );
            const cookieName = ctx.context.authCookies.sessionToken.name;
            const parsedSetCookieHeader = cookieUtils.parseSetCookieHeader(
              ctx.context.responseHeaders?.get("set-cookie") || ""
            );
            const hasSessionToken = parsedSetCookieHeader.has(cookieName);
            if (!cookie || !hasSessionToken) {
              return;
            }
            ctx.setCookie("oidc_login_prompt", "", {
              maxAge: 0
            });
            const sessionCookie = parsedSetCookieHeader.get(cookieName)?.value;
            const sessionToken = sessionCookie?.split(".")[0];
            if (!sessionToken) {
              return;
            }
            const session = await ctx.context.internalAdapter.findSession(sessionToken);
            if (!session) {
              return;
            }
            ctx.query = JSON.parse(cookie);
            ctx.query.prompt = "consent";
            ctx.context.session = session;
            const response = await authorizeMCPOAuth(ctx, opts);
            return response;
          })
        }
      ]
    },
    endpoints: {
      getMcpOAuthConfig: middleware.createAuthEndpoint(
        "/.well-known/oauth-authorization-server",
        {
          method: "GET",
          metadata: {
            client: false
          }
        },
        async (c) => {
          try {
            const metadata = getMCPProviderMetadata(c, options);
            return c.json(metadata);
          } catch (e) {
            console.log(e);
            return c.json(null);
          }
        }
      ),
      getMCPProtectedResource: middleware.createAuthEndpoint(
        "/.well-known/oauth-protected-resource",
        {
          method: "GET",
          metadata: {
            client: false
          }
        },
        async (c) => {
          const metadata = getMCPProtectedResourceMetadata(c, options);
          return c.json(metadata);
        }
      ),
      mcpOAuthAuthorize: middleware.createAuthEndpoint(
        "/mcp/authorize",
        {
          method: "GET",
          query: z__namespace.record(z__namespace.string(), z__namespace.any()),
          metadata: {
            openapi: {
              description: "Authorize an OAuth2 request using MCP",
              responses: {
                "200": {
                  description: "Authorization response generated successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        additionalProperties: true,
                        description: "Authorization response, contents depend on the authorize function implementation"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          return authorizeMCPOAuth(ctx, opts);
        }
      ),
      mcpOAuthToken: middleware.createAuthEndpoint(
        "/mcp/token",
        {
          method: "POST",
          body: z__namespace.record(z__namespace.any(), z__namespace.any()),
          metadata: {
            isAction: false
          }
        },
        async (ctx) => {
          ctx.setHeader("Access-Control-Allow-Origin", "*");
          ctx.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          ctx.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
          );
          ctx.setHeader("Access-Control-Max-Age", "86400");
          let { body } = ctx;
          if (!body) {
            throw ctx.error("BAD_REQUEST", {
              error_description: "request body not found",
              error: "invalid_request"
            });
          }
          if (body instanceof FormData) {
            body = Object.fromEntries(body.entries());
          }
          if (!(body instanceof Object)) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error_description: "request body is not an object",
              error: "invalid_request"
            });
          }
          let { client_id, client_secret } = body;
          const authorization = ctx.request?.headers.get("authorization") || null;
          if (authorization && !client_id && !client_secret && authorization.startsWith("Basic ")) {
            try {
              const encoded = authorization.replace("Basic ", "");
              const decoded = new TextDecoder().decode(base64.base64.decode(encoded));
              if (!decoded.includes(":")) {
                throw new betterCall.APIError("UNAUTHORIZED", {
                  error_description: "invalid authorization header format",
                  error: "invalid_client"
                });
              }
              const [id, secret] = decoded.split(":");
              if (!id || !secret) {
                throw new betterCall.APIError("UNAUTHORIZED", {
                  error_description: "invalid authorization header format",
                  error: "invalid_client"
                });
              }
              client_id = id;
              client_secret = secret;
            } catch (error) {
              throw new betterCall.APIError("UNAUTHORIZED", {
                error_description: "invalid authorization header format",
                error: "invalid_client"
              });
            }
          }
          const {
            grant_type,
            code,
            redirect_uri,
            refresh_token,
            code_verifier
          } = body;
          if (grant_type === "refresh_token") {
            if (!refresh_token) {
              throw new betterCall.APIError("BAD_REQUEST", {
                error_description: "refresh_token is required",
                error: "invalid_request"
              });
            }
            const token = await ctx.context.adapter.findOne({
              model: "oauthAccessToken",
              where: [
                {
                  field: "refreshToken",
                  value: refresh_token.toString()
                }
              ]
            });
            if (!token) {
              throw new betterCall.APIError("UNAUTHORIZED", {
                error_description: "invalid refresh token",
                error: "invalid_grant"
              });
            }
            if (token.clientId !== client_id?.toString()) {
              throw new betterCall.APIError("UNAUTHORIZED", {
                error_description: "invalid client_id",
                error: "invalid_client"
              });
            }
            if (token.refreshTokenExpiresAt < /* @__PURE__ */ new Date()) {
              throw new betterCall.APIError("UNAUTHORIZED", {
                error_description: "refresh token expired",
                error: "invalid_grant"
              });
            }
            const accessToken2 = random.generateRandomString(32, "a-z", "A-Z");
            const newRefreshToken = random.generateRandomString(32, "a-z", "A-Z");
            const accessTokenExpiresAt2 = new Date(
              Date.now() + opts.accessTokenExpiresIn * 1e3
            );
            const refreshTokenExpiresAt2 = new Date(
              Date.now() + opts.refreshTokenExpiresIn * 1e3
            );
            await ctx.context.adapter.create({
              model: modelName.oauthAccessToken,
              data: {
                accessToken: accessToken2,
                refreshToken: newRefreshToken,
                accessTokenExpiresAt: accessTokenExpiresAt2,
                refreshTokenExpiresAt: refreshTokenExpiresAt2,
                clientId: client_id.toString(),
                userId: token.userId,
                scopes: token.scopes,
                createdAt: /* @__PURE__ */ new Date(),
                updatedAt: /* @__PURE__ */ new Date()
              }
            });
            return ctx.json({
              access_token: accessToken2,
              token_type: "bearer",
              expires_in: opts.accessTokenExpiresIn,
              refresh_token: newRefreshToken,
              scope: token.scopes
            });
          }
          if (!code) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error_description: "code is required",
              error: "invalid_request"
            });
          }
          if (opts.requirePKCE && !code_verifier) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error_description: "code verifier is missing",
              error: "invalid_request"
            });
          }
          const verificationValue = await ctx.context.internalAdapter.findVerificationValue(
            code.toString()
          );
          if (!verificationValue) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              error_description: "invalid code",
              error: "invalid_grant"
            });
          }
          if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              error_description: "code expired",
              error: "invalid_grant"
            });
          }
          await ctx.context.internalAdapter.deleteVerificationValue(
            verificationValue.id
          );
          if (!client_id) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              error_description: "client_id is required",
              error: "invalid_client"
            });
          }
          if (!grant_type) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error_description: "grant_type is required",
              error: "invalid_request"
            });
          }
          if (grant_type !== "authorization_code") {
            throw new betterCall.APIError("BAD_REQUEST", {
              error_description: "grant_type must be 'authorization_code'",
              error: "unsupported_grant_type"
            });
          }
          if (!redirect_uri) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error_description: "redirect_uri is required",
              error: "invalid_request"
            });
          }
          const client = await ctx.context.adapter.findOne({
            model: modelName.oauthClient,
            where: [{ field: "clientId", value: client_id.toString() }]
          }).then((res) => {
            if (!res) {
              return null;
            }
            return {
              ...res,
              redirectURLs: res.redirectURLs.split(","),
              metadata: res.metadata ? JSON.parse(res.metadata) : {}
            };
          });
          if (!client) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              error_description: "invalid client_id",
              error: "invalid_client"
            });
          }
          if (client.disabled) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              error_description: "client is disabled",
              error: "invalid_client"
            });
          }
          if (client.type === "public") {
            if (!code_verifier) {
              throw new betterCall.APIError("BAD_REQUEST", {
                error_description: "code verifier is required for public clients",
                error: "invalid_request"
              });
            }
          } else {
            if (!client_secret) {
              throw new betterCall.APIError("UNAUTHORIZED", {
                error_description: "client_secret is required for confidential clients",
                error: "invalid_client"
              });
            }
            const isValidSecret = client.clientSecret === client_secret.toString();
            if (!isValidSecret) {
              throw new betterCall.APIError("UNAUTHORIZED", {
                error_description: "invalid client_secret",
                error: "invalid_client"
              });
            }
          }
          const value = JSON.parse(
            verificationValue.value
          );
          if (value.clientId !== client_id.toString()) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              error_description: "invalid client_id",
              error: "invalid_client"
            });
          }
          if (value.redirectURI !== redirect_uri.toString()) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              error_description: "invalid redirect_uri",
              error: "invalid_client"
            });
          }
          if (value.codeChallenge && !code_verifier) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error_description: "code verifier is missing",
              error: "invalid_request"
            });
          }
          const challenge = value.codeChallengeMethod === "plain" ? code_verifier : await hash.createHash("SHA-256", "base64urlnopad").digest(
            code_verifier
          );
          if (challenge !== value.codeChallenge) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              error_description: "code verification failed",
              error: "invalid_request"
            });
          }
          const requestedScopes = value.scope;
          await ctx.context.internalAdapter.deleteVerificationValue(
            verificationValue.id
          );
          const accessToken = random.generateRandomString(32, "a-z", "A-Z");
          const refreshToken = random.generateRandomString(32, "A-Z", "a-z");
          const accessTokenExpiresAt = new Date(
            Date.now() + opts.accessTokenExpiresIn * 1e3
          );
          const refreshTokenExpiresAt = new Date(
            Date.now() + opts.refreshTokenExpiresIn * 1e3
          );
          await ctx.context.adapter.create({
            model: modelName.oauthAccessToken,
            data: {
              accessToken,
              refreshToken,
              accessTokenExpiresAt,
              refreshTokenExpiresAt,
              clientId: client_id.toString(),
              userId: value.userId,
              scopes: requestedScopes.join(" "),
              createdAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            }
          });
          const user = await ctx.context.internalAdapter.findUserById(
            value.userId
          );
          if (!user) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              error_description: "user not found",
              error: "invalid_grant"
            });
          }
          let secretKey = {
            alg: "HS256",
            key: await utils.getWebcryptoSubtle().generateKey(
              {
                name: "HMAC",
                hash: "SHA-256"
              },
              true,
              ["sign", "verify"]
            )
          };
          const profile = {
            given_name: user.name.split(" ")[0],
            family_name: user.name.split(" ")[1],
            name: user.name,
            profile: user.image,
            updated_at: user.updatedAt.toISOString()
          };
          const email = {
            email: user.email,
            email_verified: user.emailVerified
          };
          const userClaims = {
            ...requestedScopes.includes("profile") ? profile : {},
            ...requestedScopes.includes("email") ? email : {}
          };
          const additionalUserClaims = opts.getAdditionalUserInfoClaim ? await opts.getAdditionalUserInfoClaim(
            user,
            requestedScopes,
            client
          ) : {};
          const idToken = await new jose.SignJWT({
            sub: user.id,
            aud: client_id.toString(),
            iat: Date.now(),
            auth_time: ctx.context.session ? new Date(ctx.context.session.session.createdAt).getTime() : void 0,
            nonce: value.nonce,
            acr: "urn:mace:incommon:iap:silver",
            // default to silver - ⚠︎ this should be configurable and should be validated against the client's metadata
            ...userClaims,
            ...additionalUserClaims
          }).setProtectedHeader({ alg: secretKey.alg }).setIssuedAt().setExpirationTime(
            Math.floor(Date.now() / 1e3) + opts.accessTokenExpiresIn
          ).sign(secretKey.key);
          return ctx.json(
            {
              access_token: accessToken,
              token_type: "Bearer",
              expires_in: opts.accessTokenExpiresIn,
              refresh_token: requestedScopes.includes("offline_access") ? refreshToken : void 0,
              scope: requestedScopes.join(" "),
              id_token: requestedScopes.includes("openid") ? idToken : void 0
            },
            {
              headers: {
                "Cache-Control": "no-store",
                Pragma: "no-cache"
              }
            }
          );
        }
      ),
      registerMcpClient: middleware.createAuthEndpoint(
        "/mcp/register",
        {
          method: "POST",
          body: z__namespace.object({
            redirect_uris: z__namespace.array(z__namespace.string()),
            token_endpoint_auth_method: z__namespace.enum(["none", "client_secret_basic", "client_secret_post"]).default("client_secret_basic").optional(),
            grant_types: z__namespace.array(
              z__namespace.enum([
                "authorization_code",
                "implicit",
                "password",
                "client_credentials",
                "refresh_token",
                "urn:ietf:params:oauth:grant-type:jwt-bearer",
                "urn:ietf:params:oauth:grant-type:saml2-bearer"
              ])
            ).default(["authorization_code"]).optional(),
            response_types: z__namespace.array(z__namespace.enum(["code", "token"])).default(["code"]).optional(),
            client_name: z__namespace.string().optional(),
            client_uri: z__namespace.string().optional(),
            logo_uri: z__namespace.string().optional(),
            scope: z__namespace.string().optional(),
            contacts: z__namespace.array(z__namespace.string()).optional(),
            tos_uri: z__namespace.string().optional(),
            policy_uri: z__namespace.string().optional(),
            jwks_uri: z__namespace.string().optional(),
            jwks: z__namespace.record(z__namespace.string(), z__namespace.any()).optional(),
            metadata: z__namespace.record(z__namespace.any(), z__namespace.any()).optional(),
            software_id: z__namespace.string().optional(),
            software_version: z__namespace.string().optional(),
            software_statement: z__namespace.string().optional()
          }),
          metadata: {
            openapi: {
              description: "Register an OAuth2 application",
              responses: {
                "200": {
                  description: "OAuth2 application registered successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                            description: "Name of the OAuth2 application"
                          },
                          icon: {
                            type: "string",
                            nullable: true,
                            description: "Icon URL for the application"
                          },
                          metadata: {
                            type: "object",
                            additionalProperties: true,
                            nullable: true,
                            description: "Additional metadata for the application"
                          },
                          clientId: {
                            type: "string",
                            description: "Unique identifier for the client"
                          },
                          clientSecret: {
                            type: "string",
                            description: "Secret key for the client. Not included for public clients."
                          },
                          redirectURLs: {
                            type: "array",
                            items: { type: "string", format: "uri" },
                            description: "List of allowed redirect URLs"
                          },
                          type: {
                            type: "string",
                            description: "Type of the client",
                            enum: ["web", "public"]
                          },
                          authenticationScheme: {
                            type: "string",
                            description: "Authentication scheme used by the client",
                            enum: ["client_secret", "none"]
                          },
                          disabled: {
                            type: "boolean",
                            description: "Whether the client is disabled",
                            enum: [false]
                          },
                          userId: {
                            type: "string",
                            nullable: true,
                            description: "ID of the user who registered the client, null if registered anonymously"
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            description: "Creation timestamp"
                          },
                          updatedAt: {
                            type: "string",
                            format: "date-time",
                            description: "Last update timestamp"
                          }
                        },
                        required: [
                          "name",
                          "clientId",
                          "redirectURLs",
                          "type",
                          "authenticationScheme",
                          "disabled",
                          "createdAt",
                          "updatedAt"
                        ]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const body = ctx.body;
          const session$1 = await session.getSessionFromCtx(ctx);
          ctx.setHeader("Access-Control-Allow-Origin", "*");
          ctx.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          ctx.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
          );
          ctx.setHeader("Access-Control-Max-Age", "86400");
          ctx.headers?.set("Access-Control-Max-Age", "86400");
          if ((!body.grant_types || body.grant_types.includes("authorization_code") || body.grant_types.includes("implicit")) && (!body.redirect_uris || body.redirect_uris.length === 0)) {
            throw new betterCall.APIError("BAD_REQUEST", {
              error: "invalid_redirect_uri",
              error_description: "Redirect URIs are required for authorization_code and implicit grant types"
            });
          }
          if (body.grant_types && body.response_types) {
            if (body.grant_types.includes("authorization_code") && !body.response_types.includes("code")) {
              throw new betterCall.APIError("BAD_REQUEST", {
                error: "invalid_client_metadata",
                error_description: "When 'authorization_code' grant type is used, 'code' response type must be included"
              });
            }
            if (body.grant_types.includes("implicit") && !body.response_types.includes("token")) {
              throw new betterCall.APIError("BAD_REQUEST", {
                error: "invalid_client_metadata",
                error_description: "When 'implicit' grant type is used, 'token' response type must be included"
              });
            }
          }
          const clientId = opts.generateClientId?.() || random.generateRandomString(32, "a-z", "A-Z");
          const clientSecret = opts.generateClientSecret?.() || random.generateRandomString(32, "a-z", "A-Z");
          const clientType = body.token_endpoint_auth_method === "none" ? "public" : "web";
          const finalClientSecret = clientType === "public" ? "" : clientSecret;
          await ctx.context.adapter.create({
            model: modelName.oauthClient,
            data: {
              name: body.client_name,
              icon: body.logo_uri,
              metadata: body.metadata ? JSON.stringify(body.metadata) : null,
              clientId,
              clientSecret: finalClientSecret,
              redirectURLs: body.redirect_uris.join(","),
              type: clientType,
              authenticationScheme: body.token_endpoint_auth_method || "client_secret_basic",
              disabled: false,
              userId: session$1?.session.userId,
              createdAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            }
          });
          const responseData = {
            client_id: clientId,
            client_id_issued_at: Math.floor(Date.now() / 1e3),
            redirect_uris: body.redirect_uris,
            token_endpoint_auth_method: body.token_endpoint_auth_method || "client_secret_basic",
            grant_types: body.grant_types || ["authorization_code"],
            response_types: body.response_types || ["code"],
            client_name: body.client_name,
            client_uri: body.client_uri,
            logo_uri: body.logo_uri,
            scope: body.scope,
            contacts: body.contacts,
            tos_uri: body.tos_uri,
            policy_uri: body.policy_uri,
            jwks_uri: body.jwks_uri,
            jwks: body.jwks,
            software_id: body.software_id,
            software_version: body.software_version,
            software_statement: body.software_statement,
            metadata: body.metadata,
            ...clientType !== "public" ? {
              client_secret: finalClientSecret,
              client_secret_expires_at: 0
              // 0 means it doesn't expire
            } : {}
          };
          return new Response(JSON.stringify(responseData), {
            status: 201,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
              Pragma: "no-cache"
            }
          });
        }
      ),
      getMcpSession: middleware.createAuthEndpoint(
        "/mcp/get-session",
        {
          method: "GET",
          requireHeaders: true
        },
        async (c) => {
          const accessToken = c.headers?.get("Authorization")?.replace("Bearer ", "");
          if (!accessToken) {
            c.headers?.set("WWW-Authenticate", "Bearer");
            return c.json(null);
          }
          const accessTokenData = await c.context.adapter.findOne({
            model: modelName.oauthAccessToken,
            where: [
              {
                field: "accessToken",
                value: accessToken
              }
            ]
          });
          if (!accessTokenData) {
            return c.json(null);
          }
          return c.json(accessTokenData);
        }
      )
    },
    schema: plugins_oidcProvider_index.schema
  };
};
const withMcpAuth = (auth, handler) => {
  return async (req) => {
    const baseURL = url.getBaseURL(auth.options.baseURL, auth.options.basePath);
    if (!baseURL && !env.isProduction) {
      env.logger.warn("Unable to get the baseURL, please check your config!");
    }
    const session = await auth.api.getMcpSession({
      headers: req.headers
    });
    const wwwAuthenticateValue = `Bearer resource_metadata="${baseURL}/.well-known/oauth-protected-resource"`;
    if (!session) {
      return Response.json(
        {
          jsonrpc: "2.0",
          error: {
            code: -32e3,
            message: "Unauthorized: Authentication required",
            "www-authenticate": wwwAuthenticateValue
          },
          id: null
        },
        {
          status: 401,
          headers: {
            "WWW-Authenticate": wwwAuthenticateValue,
            // we also add this headers otherwise browser based clients will not be able to read the `www-authenticate` header
            "Access-Control-Expose-Headers": "WWW-Authenticate"
          }
        }
      );
    }
    return handler(req, session);
  };
};
const oAuthDiscoveryMetadata = (auth) => {
  return async (request) => {
    const res = await auth.api.getMcpOAuthConfig();
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400"
      }
    });
  };
};
const oAuthProtectedResourceMetadata = (auth) => {
  return async (request) => {
    const res = await auth.api.getMCPProtectedResource();
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400"
      }
    });
  };
};

const lastLoginMethod = (userConfig) => {
  const paths = [
    "/callback/:id",
    "/oauth2/callback/:id",
    "/sign-in/email",
    "/sign-up/email"
  ];
  const defaultResolveMethod = (ctx) => {
    if (paths.includes(ctx.path)) {
      return ctx.params?.id ? ctx.params.id : ctx.path.split("/").pop();
    }
    return null;
  };
  const config = {
    cookieName: "better-auth.last_used_login_method",
    maxAge: 60 * 60 * 24 * 30,
    ...userConfig
  };
  return {
    id: "last-login-method",
    init(ctx) {
      return {
        options: {
          databaseHooks: {
            user: {
              create: {
                async before(user, context) {
                  if (!config.storeInDatabase) return;
                  if (!context) return;
                  const lastUsedLoginMethod = config.customResolveMethod?.(context) ?? defaultResolveMethod(context);
                  if (lastUsedLoginMethod) {
                    return {
                      data: {
                        ...user,
                        lastLoginMethod: lastUsedLoginMethod
                      }
                    };
                  }
                }
              }
            },
            session: {
              create: {
                async after(session, context) {
                  if (!config.storeInDatabase) return;
                  if (!context) return;
                  const lastUsedLoginMethod = config.customResolveMethod?.(context) ?? defaultResolveMethod(context);
                  if (lastUsedLoginMethod && session?.userId) {
                    try {
                      await ctx.internalAdapter.updateUser(session.userId, {
                        lastLoginMethod: lastUsedLoginMethod
                      });
                    } catch (error) {
                      ctx.logger.error(
                        "Failed to update lastLoginMethod",
                        error
                      );
                    }
                  }
                }
              }
            }
          }
        }
      };
    },
    hooks: {
      after: [
        {
          matcher() {
            return true;
          },
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const lastUsedLoginMethod = config.customResolveMethod?.(ctx) ?? defaultResolveMethod(ctx);
            if (lastUsedLoginMethod) {
              const setCookie = ctx.context.responseHeaders?.get("set-cookie");
              const sessionTokenName = ctx.context.authCookies.sessionToken.name;
              const hasSessionToken = setCookie && setCookie.includes(sessionTokenName);
              if (hasSessionToken) {
                const cookieAttributes = {
                  ...ctx.context.authCookies.sessionToken.options,
                  maxAge: config.maxAge,
                  httpOnly: false
                  // Override: plugin cookies are not httpOnly
                };
                ctx.setCookie(
                  config.cookieName,
                  lastUsedLoginMethod,
                  cookieAttributes
                );
              }
            }
          })
        }
      ]
    },
    schema: config.storeInDatabase ? {
      user: {
        fields: {
          lastLoginMethod: {
            type: "string",
            input: false,
            required: false,
            fieldName: config.schema?.user?.lastLoginMethod || "lastLoginMethod"
          }
        }
      }
    } : void 0
  };
};

exports.organization = organization.organization;
exports.parseRoles = organization.parseRoles;
exports.TWO_FACTOR_ERROR_CODES = plugins_twoFactor_index.TWO_FACTOR_ERROR_CODES;
exports.twoFactor = plugins_twoFactor_index.twoFactor;
exports.username = plugins_username_index.username;
exports.bearer = plugins_bearer_index.bearer;
exports.HIDE_METADATA = toAuthEndpoints.HIDE_METADATA;
exports.magicLink = plugins_magicLink_index.magicLink;
exports.phoneNumber = plugins_phoneNumber_index.phoneNumber;
exports.anonymous = plugins_anonymous_index.anonymous;
exports.admin = admin.admin;
exports.genericOAuth = plugins_genericOauth_index.genericOAuth;
exports.jwt = plugins_jwt_index.jwt;
exports.multiSession = plugins_multiSession_index.multiSession;
exports.emailOTP = plugins_emailOtp_index.emailOTP;
exports.oneTap = plugins_oneTap_index.oneTap;
exports.oAuthProxy = plugins_oauthProxy_index.oAuthProxy;
exports.customSession = plugins_customSession_index.customSession;
exports.openAPI = plugins_openApi_index.openAPI;
exports.getClient = plugins_oidcProvider_index.getClient;
exports.getMetadata = plugins_oidcProvider_index.getMetadata;
exports.oidcProvider = plugins_oidcProvider_index.oidcProvider;
exports.captcha = plugins_captcha_index.captcha;
exports.API_KEY_TABLE_NAME = plugins_oneTimeToken_index.API_KEY_TABLE_NAME;
exports.ERROR_CODES = plugins_oneTimeToken_index.ERROR_CODES;
exports.apiKey = plugins_oneTimeToken_index.apiKey;
exports.defaultKeyHasher = plugins_oneTimeToken_index.defaultKeyHasher;
exports.oneTimeToken = plugins_oneTimeToken_index.oneTimeToken;
exports.haveIBeenPwned = plugins_haveibeenpwned_index.haveIBeenPwned;
exports.createAuthEndpoint = middleware.createAuthEndpoint;
exports.createAuthMiddleware = middleware.createAuthMiddleware;
exports.optionsMiddleware = middleware.optionsMiddleware;
exports.siwe = plugins_siwe_index.siwe;
exports.$deviceAuthorizationOptionsSchema = plugins_deviceAuthorization_index.$deviceAuthorizationOptionsSchema;
exports.deviceAuthorization = plugins_deviceAuthorization_index.deviceAuthorization;
exports.twoFactorClient = client.twoFactorClient;
exports.USERNAME_ERROR_CODES = errorCodes.USERNAME_ERROR_CODES;
exports.createJwk = sign.createJwk;
exports.generateExportedKeyPair = sign.generateExportedKeyPair;
exports.getJwtToken = sign.getJwtToken;
exports.deviceAuthorizationClient = client$1.deviceAuthorizationClient;
exports.getMCPProtectedResourceMetadata = getMCPProtectedResourceMetadata;
exports.getMCPProviderMetadata = getMCPProviderMetadata;
exports.lastLoginMethod = lastLoginMethod;
exports.mcp = mcp;
exports.oAuthDiscoveryMetadata = oAuthDiscoveryMetadata;
exports.oAuthProtectedResourceMetadata = oAuthProtectedResourceMetadata;
exports.withMcpAuth = withMcpAuth;
