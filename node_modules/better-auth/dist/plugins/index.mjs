export { o as organization, p as parseRoles } from '../shared/better-auth.BxlKa8Uk.mjs';
export { TWO_FACTOR_ERROR_CODES, twoFactor } from './two-factor/index.mjs';
export { username } from './username/index.mjs';
export { bearer } from './bearer/index.mjs';
export { H as HIDE_METADATA } from '../shared/better-auth.BX9UB8EP.mjs';
export { magicLink } from './magic-link/index.mjs';
export { phoneNumber } from './phone-number/index.mjs';
export { anonymous } from './anonymous/index.mjs';
export { a as admin } from '../shared/better-auth.Bz5l8J5E.mjs';
export { genericOAuth } from './generic-oauth/index.mjs';
export { jwt } from './jwt/index.mjs';
export { multiSession } from './multi-session/index.mjs';
export { emailOTP } from './email-otp/index.mjs';
export { oneTap } from './one-tap/index.mjs';
export { oAuthProxy } from './oauth-proxy/index.mjs';
export { customSession } from './custom-session/index.mjs';
export { openAPI } from './open-api/index.mjs';
import { o as oidcProvider, s as schema } from '../shared/better-auth.Dzn6KLfq.mjs';
export { g as getClient, a as getMetadata } from '../shared/better-auth.Dzn6KLfq.mjs';
export { captcha } from './captcha/index.mjs';
export { A as API_KEY_TABLE_NAME, E as ERROR_CODES, a as apiKey, d as defaultKeyHasher, o as oneTimeToken } from '../shared/better-auth.DdryoYyv.mjs';
export { haveIBeenPwned } from './haveibeenpwned/index.mjs';
import * as z from 'zod';
import { createAuthEndpoint, createAuthMiddleware } from '@better-auth/core/middleware';
export { createAuthEndpoint, createAuthMiddleware, optionsMiddleware } from '@better-auth/core/middleware';
import { APIError } from 'better-call';
import { g as getSessionFromCtx } from '../shared/better-auth.DEBtROF9.mjs';
import '@better-auth/core/error';
import { isProduction, logger } from '@better-auth/core/env';
import { base64 } from '@better-auth/utils/base64';
import '@better-auth/utils/hmac';
import { a as getBaseURL } from '../shared/better-auth.DR3R5wdU.mjs';
import '@better-auth/utils/binary';
import { p as parseSetCookieHeader } from '../shared/better-auth.Ih8C76Vo.mjs';
import '@better-auth/core/db';
import '@better-auth/utils/random';
import { createHash } from '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import { SignJWT } from 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import { g as generateRandomString } from '../shared/better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
import { getWebcryptoSubtle } from '@better-auth/utils';
export { siwe } from './siwe/index.mjs';
export { $deviceAuthorizationOptionsSchema, deviceAuthorization } from './device-authorization/index.mjs';
export { t as twoFactorClient } from '../shared/better-auth.Ddw8bVyV.mjs';
export { U as USERNAME_ERROR_CODES } from '../shared/better-auth.CP1SBr-a.mjs';
export { c as createJwk, b as generateExportedKeyPair, g as getJwtToken } from '../shared/better-auth.iy-Q9EM9.mjs';
export { d as deviceAuthorizationClient } from '../shared/better-auth.BpA03GIs.mjs';
import '../shared/better-auth.CW6D9eSx.mjs';
import '../shared/better-auth.msGOU0m9.mjs';
import '../shared/better-auth.BIQhnWWW.mjs';
import '@better-auth/core/utils';
import '../shared/better-auth.BUPPRXfK.mjs';
import '../shared/better-auth.D9_vQR83.mjs';
import '../shared/better-auth.BKEtEpt0.mjs';
import '../shared/better-auth.BxexnJiR.mjs';
import '../shared/better-auth.DevHHPLH.mjs';
import '../shared/better-auth.BLxPPg5G.mjs';
import '../shared/better-auth.DaEBQJp_.mjs';
import '../shared/better-auth.Cwj9dt6i.mjs';
import '../crypto/index.mjs';
import '@better-auth/utils/otp';
import '../shared/better-auth.YwDQhoPc.mjs';
import '@better-auth/core/social-providers';
import 'defu';
import 'jose/errors';
import '../shared/better-auth.DQI8AD7d.mjs';
import '../shared/better-auth.C4MGirLD.mjs';
import '../shared/better-auth.BjOWrlEY.mjs';
import '../shared/better-auth.CP-SWMbr.mjs';
import '@better-fetch/fetch';
import '@better-auth/core/oauth2';
import '../api/index.mjs';
import '../shared/better-auth.ClH5r3NH.mjs';
import '../shared/better-auth.pQjeRkzN.mjs';
import '../shared/better-auth.cK9aJBRe.mjs';
import '@noble/hashes/sha3.js';

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
    throw new APIError("UNAUTHORIZED", {
      error_description: "request not found",
      error: "invalid_request"
    });
  }
  const session = await getSessionFromCtx(ctx);
  if (!session) {
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
    throw new APIError("BAD_REQUEST", {
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
  const code = generateRandomString(32, "a-z", "A-Z", "0-9");
  const codeExpiresInMs = opts.codeExpiresIn * 1e3;
  const expiresAt = new Date(Date.now() + codeExpiresInMs);
  try {
    await ctx.context.internalAdapter.createVerificationValue(
      {
        value: JSON.stringify({
          clientId: client.clientId,
          redirectURI: query.redirect_uri,
          scope: requestScope,
          userId: session.user.id,
          authTime: new Date(session.session.createdAt).getTime(),
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
    throw new APIError("INTERNAL_SERVER_ERROR", {
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
  oidcProvider(opts);
  return {
    id: "mcp",
    hooks: {
      after: [
        {
          matcher() {
            return true;
          },
          handler: createAuthMiddleware(async (ctx) => {
            const cookie = await ctx.getSignedCookie(
              "oidc_login_prompt",
              ctx.context.secret
            );
            const cookieName = ctx.context.authCookies.sessionToken.name;
            const parsedSetCookieHeader = parseSetCookieHeader(
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
      getMcpOAuthConfig: createAuthEndpoint(
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
      getMCPProtectedResource: createAuthEndpoint(
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
      mcpOAuthAuthorize: createAuthEndpoint(
        "/mcp/authorize",
        {
          method: "GET",
          query: z.record(z.string(), z.any()),
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
      mcpOAuthToken: createAuthEndpoint(
        "/mcp/token",
        {
          method: "POST",
          body: z.record(z.any(), z.any()),
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
            throw new APIError("BAD_REQUEST", {
              error_description: "request body is not an object",
              error: "invalid_request"
            });
          }
          let { client_id, client_secret } = body;
          const authorization = ctx.request?.headers.get("authorization") || null;
          if (authorization && !client_id && !client_secret && authorization.startsWith("Basic ")) {
            try {
              const encoded = authorization.replace("Basic ", "");
              const decoded = new TextDecoder().decode(base64.decode(encoded));
              if (!decoded.includes(":")) {
                throw new APIError("UNAUTHORIZED", {
                  error_description: "invalid authorization header format",
                  error: "invalid_client"
                });
              }
              const [id, secret] = decoded.split(":");
              if (!id || !secret) {
                throw new APIError("UNAUTHORIZED", {
                  error_description: "invalid authorization header format",
                  error: "invalid_client"
                });
              }
              client_id = id;
              client_secret = secret;
            } catch (error) {
              throw new APIError("UNAUTHORIZED", {
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
              throw new APIError("BAD_REQUEST", {
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
              throw new APIError("UNAUTHORIZED", {
                error_description: "invalid refresh token",
                error: "invalid_grant"
              });
            }
            if (token.clientId !== client_id?.toString()) {
              throw new APIError("UNAUTHORIZED", {
                error_description: "invalid client_id",
                error: "invalid_client"
              });
            }
            if (token.refreshTokenExpiresAt < /* @__PURE__ */ new Date()) {
              throw new APIError("UNAUTHORIZED", {
                error_description: "refresh token expired",
                error: "invalid_grant"
              });
            }
            const accessToken2 = generateRandomString(32, "a-z", "A-Z");
            const newRefreshToken = generateRandomString(32, "a-z", "A-Z");
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
            throw new APIError("BAD_REQUEST", {
              error_description: "code is required",
              error: "invalid_request"
            });
          }
          if (opts.requirePKCE && !code_verifier) {
            throw new APIError("BAD_REQUEST", {
              error_description: "code verifier is missing",
              error: "invalid_request"
            });
          }
          const verificationValue = await ctx.context.internalAdapter.findVerificationValue(
            code.toString()
          );
          if (!verificationValue) {
            throw new APIError("UNAUTHORIZED", {
              error_description: "invalid code",
              error: "invalid_grant"
            });
          }
          if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
            throw new APIError("UNAUTHORIZED", {
              error_description: "code expired",
              error: "invalid_grant"
            });
          }
          await ctx.context.internalAdapter.deleteVerificationValue(
            verificationValue.id
          );
          if (!client_id) {
            throw new APIError("UNAUTHORIZED", {
              error_description: "client_id is required",
              error: "invalid_client"
            });
          }
          if (!grant_type) {
            throw new APIError("BAD_REQUEST", {
              error_description: "grant_type is required",
              error: "invalid_request"
            });
          }
          if (grant_type !== "authorization_code") {
            throw new APIError("BAD_REQUEST", {
              error_description: "grant_type must be 'authorization_code'",
              error: "unsupported_grant_type"
            });
          }
          if (!redirect_uri) {
            throw new APIError("BAD_REQUEST", {
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
            throw new APIError("UNAUTHORIZED", {
              error_description: "invalid client_id",
              error: "invalid_client"
            });
          }
          if (client.disabled) {
            throw new APIError("UNAUTHORIZED", {
              error_description: "client is disabled",
              error: "invalid_client"
            });
          }
          if (client.type === "public") {
            if (!code_verifier) {
              throw new APIError("BAD_REQUEST", {
                error_description: "code verifier is required for public clients",
                error: "invalid_request"
              });
            }
          } else {
            if (!client_secret) {
              throw new APIError("UNAUTHORIZED", {
                error_description: "client_secret is required for confidential clients",
                error: "invalid_client"
              });
            }
            const isValidSecret = client.clientSecret === client_secret.toString();
            if (!isValidSecret) {
              throw new APIError("UNAUTHORIZED", {
                error_description: "invalid client_secret",
                error: "invalid_client"
              });
            }
          }
          const value = JSON.parse(
            verificationValue.value
          );
          if (value.clientId !== client_id.toString()) {
            throw new APIError("UNAUTHORIZED", {
              error_description: "invalid client_id",
              error: "invalid_client"
            });
          }
          if (value.redirectURI !== redirect_uri.toString()) {
            throw new APIError("UNAUTHORIZED", {
              error_description: "invalid redirect_uri",
              error: "invalid_client"
            });
          }
          if (value.codeChallenge && !code_verifier) {
            throw new APIError("BAD_REQUEST", {
              error_description: "code verifier is missing",
              error: "invalid_request"
            });
          }
          const challenge = value.codeChallengeMethod === "plain" ? code_verifier : await createHash("SHA-256", "base64urlnopad").digest(
            code_verifier
          );
          if (challenge !== value.codeChallenge) {
            throw new APIError("UNAUTHORIZED", {
              error_description: "code verification failed",
              error: "invalid_request"
            });
          }
          const requestedScopes = value.scope;
          await ctx.context.internalAdapter.deleteVerificationValue(
            verificationValue.id
          );
          const accessToken = generateRandomString(32, "a-z", "A-Z");
          const refreshToken = generateRandomString(32, "A-Z", "a-z");
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
            throw new APIError("UNAUTHORIZED", {
              error_description: "user not found",
              error: "invalid_grant"
            });
          }
          let secretKey = {
            alg: "HS256",
            key: await getWebcryptoSubtle().generateKey(
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
          const idToken = await new SignJWT({
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
      registerMcpClient: createAuthEndpoint(
        "/mcp/register",
        {
          method: "POST",
          body: z.object({
            redirect_uris: z.array(z.string()),
            token_endpoint_auth_method: z.enum(["none", "client_secret_basic", "client_secret_post"]).default("client_secret_basic").optional(),
            grant_types: z.array(
              z.enum([
                "authorization_code",
                "implicit",
                "password",
                "client_credentials",
                "refresh_token",
                "urn:ietf:params:oauth:grant-type:jwt-bearer",
                "urn:ietf:params:oauth:grant-type:saml2-bearer"
              ])
            ).default(["authorization_code"]).optional(),
            response_types: z.array(z.enum(["code", "token"])).default(["code"]).optional(),
            client_name: z.string().optional(),
            client_uri: z.string().optional(),
            logo_uri: z.string().optional(),
            scope: z.string().optional(),
            contacts: z.array(z.string()).optional(),
            tos_uri: z.string().optional(),
            policy_uri: z.string().optional(),
            jwks_uri: z.string().optional(),
            jwks: z.record(z.string(), z.any()).optional(),
            metadata: z.record(z.any(), z.any()).optional(),
            software_id: z.string().optional(),
            software_version: z.string().optional(),
            software_statement: z.string().optional()
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
          const session = await getSessionFromCtx(ctx);
          ctx.setHeader("Access-Control-Allow-Origin", "*");
          ctx.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          ctx.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
          );
          ctx.setHeader("Access-Control-Max-Age", "86400");
          ctx.headers?.set("Access-Control-Max-Age", "86400");
          if ((!body.grant_types || body.grant_types.includes("authorization_code") || body.grant_types.includes("implicit")) && (!body.redirect_uris || body.redirect_uris.length === 0)) {
            throw new APIError("BAD_REQUEST", {
              error: "invalid_redirect_uri",
              error_description: "Redirect URIs are required for authorization_code and implicit grant types"
            });
          }
          if (body.grant_types && body.response_types) {
            if (body.grant_types.includes("authorization_code") && !body.response_types.includes("code")) {
              throw new APIError("BAD_REQUEST", {
                error: "invalid_client_metadata",
                error_description: "When 'authorization_code' grant type is used, 'code' response type must be included"
              });
            }
            if (body.grant_types.includes("implicit") && !body.response_types.includes("token")) {
              throw new APIError("BAD_REQUEST", {
                error: "invalid_client_metadata",
                error_description: "When 'implicit' grant type is used, 'token' response type must be included"
              });
            }
          }
          const clientId = opts.generateClientId?.() || generateRandomString(32, "a-z", "A-Z");
          const clientSecret = opts.generateClientSecret?.() || generateRandomString(32, "a-z", "A-Z");
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
              userId: session?.session.userId,
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
      getMcpSession: createAuthEndpoint(
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
    schema
  };
};
const withMcpAuth = (auth, handler) => {
  return async (req) => {
    const baseURL = getBaseURL(auth.options.baseURL, auth.options.basePath);
    if (!baseURL && !isProduction) {
      logger.warn("Unable to get the baseURL, please check your config!");
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
          handler: createAuthMiddleware(async (ctx) => {
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

export { getMCPProtectedResourceMetadata, getMCPProviderMetadata, lastLoginMethod, mcp, oAuthDiscoveryMetadata, oAuthProtectedResourceMetadata, oidcProvider, withMcpAuth };
