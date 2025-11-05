'use strict';

const z = require('zod');
const fetch = require('@better-fetch/fetch');
const betterCall = require('better-call');
const jose = require('jose');
const oauth2 = require('@better-auth/core/oauth2');
const error_index = require('../error/index.cjs');
const env = require('@better-auth/core/env');
const base64 = require('@better-auth/utils/base64');
require('@better-auth/core/utils');

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

const apple = (options) => {
  const tokenEndpoint = "https://appleid.apple.com/auth/token";
  return {
    id: "apple",
    name: "Apple",
    async createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scope = options.disableDefaultScope ? [] : ["email", "name"];
      options.scope && _scope.push(...options.scope);
      scopes && _scope.push(...scopes);
      const url = await oauth2.createAuthorizationURL({
        id: "apple",
        options,
        authorizationEndpoint: "https://appleid.apple.com/auth/authorize",
        scopes: _scope,
        state,
        redirectURI,
        responseMode: "form_post",
        responseType: "code id_token"
      });
      return url;
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      const decodedHeader = jose.decodeProtectedHeader(token);
      const { kid, alg: jwtAlg } = decodedHeader;
      if (!kid || !jwtAlg) return false;
      const publicKey = await getApplePublicKey(kid);
      const { payload: jwtClaims } = await jose.jwtVerify(token, publicKey, {
        algorithms: [jwtAlg],
        issuer: "https://appleid.apple.com",
        audience: options.audience && options.audience.length ? options.audience : options.appBundleIdentifier ? options.appBundleIdentifier : options.clientId,
        maxTokenAge: "1h"
      });
      ["email_verified", "is_private_email"].forEach((field) => {
        if (jwtClaims[field] !== void 0) {
          jwtClaims[field] = Boolean(jwtClaims[field]);
        }
      });
      if (nonce && jwtClaims.nonce !== nonce) {
        return false;
      }
      return !!jwtClaims;
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://appleid.apple.com/auth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (!token.idToken) {
        return null;
      }
      const profile = jose.decodeJwt(token.idToken);
      if (!profile) {
        return null;
      }
      const name = token.user ? `${token.user.name?.firstName} ${token.user.name?.lastName}` : profile.name || profile.email;
      const emailVerified = typeof profile.email_verified === "boolean" ? profile.email_verified : profile.email_verified === "true";
      const enrichedProfile = {
        ...profile,
        name
      };
      const userMap = await options.mapProfileToUser?.(enrichedProfile);
      return {
        user: {
          id: profile.sub,
          name: enrichedProfile.name,
          emailVerified,
          email: profile.email,
          ...userMap
        },
        data: enrichedProfile
      };
    },
    options
  };
};
const getApplePublicKey = async (kid) => {
  const APPLE_BASE_URL = "https://appleid.apple.com";
  const JWKS_APPLE_URI = "/auth/keys";
  const { data } = await fetch.betterFetch(`${APPLE_BASE_URL}${JWKS_APPLE_URI}`);
  if (!data?.keys) {
    throw new betterCall.APIError("BAD_REQUEST", {
      message: "Keys not found"
    });
  }
  const jwk = data.keys.find((key) => key.kid === kid);
  if (!jwk) {
    throw new Error(`JWK with kid ${kid} not found`);
  }
  return await jose.importJWK(jwk, jwk.alg);
};

const atlassian = (options) => {
  return {
    id: "atlassian",
    name: "Atlassian",
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      if (!options.clientId || !options.clientSecret) {
        env.logger.error("Client Id and Secret are required for Atlassian");
        throw new error_index.BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) {
        throw new error_index.BetterAuthError("codeVerifier is required for Atlassian");
      }
      const _scopes = options.disableDefaultScope ? [] : ["read:jira-user", "offline_access"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "atlassian",
        options,
        authorizationEndpoint: "https://auth.atlassian.com/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        additionalParams: {
          audience: "api.atlassian.com"
        },
        prompt: options.prompt
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://auth.atlassian.com/oauth/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://auth.atlassian.com/oauth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (!token.accessToken) {
        return null;
      }
      try {
        const { data: profile } = await fetch.betterFetch("https://api.atlassian.com/me", {
          headers: { Authorization: `Bearer ${token.accessToken}` }
        });
        if (!profile) return null;
        const userMap = await options.mapProfileToUser?.(profile);
        return {
          user: {
            id: profile.account_id,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            emailVerified: false,
            ...userMap
          },
          data: profile
        };
      } catch (error) {
        env.logger.error("Failed to fetch user info from Figma:", error);
        return null;
      }
    },
    options
  };
};

const cognito = (options) => {
  if (!options.domain || !options.region || !options.userPoolId) {
    env.logger.error(
      "Domain, region and userPoolId are required for Amazon Cognito. Make sure to provide them in the options."
    );
    throw new error_index.BetterAuthError("DOMAIN_AND_REGION_REQUIRED");
  }
  const cleanDomain = options.domain.replace(/^https?:\/\//, "");
  const authorizationEndpoint = `https://${cleanDomain}/oauth2/authorize`;
  const tokenEndpoint = `https://${cleanDomain}/oauth2/token`;
  const userInfoEndpoint = `https://${cleanDomain}/oauth2/userinfo`;
  return {
    id: "cognito",
    name: "Cognito",
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      if (!options.clientId) {
        env.logger.error(
          "ClientId is required for Amazon Cognito. Make sure to provide them in the options."
        );
        throw new error_index.BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (options.requireClientSecret && !options.clientSecret) {
        env.logger.error(
          "Client Secret is required when requireClientSecret is true. Make sure to provide it in the options."
        );
        throw new error_index.BetterAuthError("CLIENT_SECRET_REQUIRED");
      }
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const url = await oauth2.createAuthorizationURL({
        id: "cognito",
        options: {
          ...options
        },
        authorizationEndpoint,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt
      });
      return url;
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      try {
        const decodedHeader = jose.decodeProtectedHeader(token);
        const { kid, alg: jwtAlg } = decodedHeader;
        if (!kid || !jwtAlg) return false;
        const publicKey = await getCognitoPublicKey(
          kid,
          options.region,
          options.userPoolId
        );
        const expectedIssuer = `https://cognito-idp.${options.region}.amazonaws.com/${options.userPoolId}`;
        const { payload: jwtClaims } = await jose.jwtVerify(token, publicKey, {
          algorithms: [jwtAlg],
          issuer: expectedIssuer,
          audience: options.clientId,
          maxTokenAge: "1h"
        });
        if (nonce && jwtClaims.nonce !== nonce) {
          return false;
        }
        return true;
      } catch (error) {
        env.logger.error("Failed to verify ID token:", error);
        return false;
      }
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (token.idToken) {
        try {
          const profile = jose.decodeJwt(token.idToken);
          if (!profile) {
            return null;
          }
          const name = profile.name || profile.given_name || profile.username || profile.email;
          const enrichedProfile = {
            ...profile,
            name
          };
          const userMap = await options.mapProfileToUser?.(enrichedProfile);
          return {
            user: {
              id: profile.sub,
              name: enrichedProfile.name,
              email: profile.email,
              image: profile.picture,
              emailVerified: profile.email_verified,
              ...userMap
            },
            data: enrichedProfile
          };
        } catch (error) {
          env.logger.error("Failed to decode ID token:", error);
        }
      }
      if (token.accessToken) {
        try {
          const { data: userInfo } = await fetch.betterFetch(
            userInfoEndpoint,
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`
              }
            }
          );
          if (userInfo) {
            const userMap = await options.mapProfileToUser?.(userInfo);
            return {
              user: {
                id: userInfo.sub,
                name: userInfo.name || userInfo.given_name || userInfo.username,
                email: userInfo.email,
                image: userInfo.picture,
                emailVerified: userInfo.email_verified,
                ...userMap
              },
              data: userInfo
            };
          }
        } catch (error) {
          env.logger.error("Failed to fetch user info from Cognito:", error);
        }
      }
      return null;
    },
    options
  };
};
const getCognitoPublicKey = async (kid, region, userPoolId) => {
  const COGNITO_JWKS_URI = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
  try {
    const { data } = await fetch.betterFetch(COGNITO_JWKS_URI);
    if (!data?.keys) {
      throw new betterCall.APIError("BAD_REQUEST", {
        message: "Keys not found"
      });
    }
    const jwk = data.keys.find((key) => key.kid === kid);
    if (!jwk) {
      throw new Error(`JWK with kid ${kid} not found`);
    }
    return await jose.importJWK(jwk, jwk.alg);
  } catch (error) {
    env.logger.error("Failed to fetch Cognito public key:", error);
    throw error;
  }
};

const discord = (options) => {
  return {
    id: "discord",
    name: "Discord",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["identify", "email"];
      scopes && _scopes.push(...scopes);
      options.scope && _scopes.push(...options.scope);
      const hasBotScope = _scopes.includes("bot");
      const permissionsParam = hasBotScope && options.permissions !== void 0 ? `&permissions=${options.permissions}` : "";
      return new URL(
        `https://discord.com/api/oauth2/authorize?scope=${_scopes.join(
          "+"
        )}&response_type=code&client_id=${options.clientId}&redirect_uri=${encodeURIComponent(
          options.redirectURI || redirectURI
        )}&state=${state}&prompt=${options.prompt || "none"}${permissionsParam}`
      );
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://discord.com/api/oauth2/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://discord.com/api/oauth2/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://discord.com/api/users/@me",
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error) {
        return null;
      }
      if (profile.avatar === null) {
        const defaultAvatarNumber = profile.discriminator === "0" ? Number(BigInt(profile.id) >> BigInt(22)) % 6 : parseInt(profile.discriminator) % 5;
        profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
      } else {
        const format = profile.avatar.startsWith("a_") ? "gif" : "png";
        profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.global_name || profile.username || "",
          email: profile.email,
          emailVerified: profile.verified,
          image: profile.image_url,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const facebook = (options) => {
  return {
    id: "facebook",
    name: "Facebook",
    async createAuthorizationURL({ state, scopes, redirectURI, loginHint }) {
      const _scopes = options.disableDefaultScope ? [] : ["email", "public_profile"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return await oauth2.createAuthorizationURL({
        id: "facebook",
        options,
        authorizationEndpoint: "https://www.facebook.com/v21.0/dialog/oauth",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint,
        additionalParams: options.configId ? {
          config_id: options.configId
        } : {}
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://graph.facebook.com/oauth/access_token"
      });
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      if (token.split(".").length === 3) {
        try {
          const { payload: jwtClaims } = await jose.jwtVerify(
            token,
            jose.createRemoteJWKSet(
              // https://developers.facebook.com/docs/facebook-login/limited-login/token/#jwks
              new URL(
                "https://limited.facebook.com/.well-known/oauth/openid/jwks/"
              )
            ),
            {
              algorithms: ["RS256"],
              audience: options.clientId,
              issuer: "https://www.facebook.com"
            }
          );
          if (nonce && jwtClaims.nonce !== nonce) {
            return false;
          }
          return !!jwtClaims;
        } catch (error) {
          return false;
        }
      }
      return true;
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://graph.facebook.com/v18.0/oauth/access_token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (token.idToken && token.idToken.split(".").length === 3) {
        const profile2 = jose.decodeJwt(token.idToken);
        const user = {
          id: profile2.sub,
          name: profile2.name,
          email: profile2.email,
          picture: {
            data: {
              url: profile2.picture,
              height: 100,
              width: 100,
              is_silhouette: false
            }
          }
        };
        const userMap2 = await options.mapProfileToUser?.({
          ...user,
          email_verified: true
        });
        return {
          user: {
            ...user,
            emailVerified: true,
            ...userMap2
          },
          data: profile2
        };
      }
      const fields = [
        "id",
        "name",
        "email",
        "picture",
        ...options?.fields || []
      ];
      const { data: profile, error } = await fetch.betterFetch(
        "https://graph.facebook.com/me?fields=" + fields.join(","),
        {
          auth: {
            type: "Bearer",
            token: token.accessToken
          }
        }
      );
      if (error) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture.data.url,
          emailVerified: profile.email_verified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const figma = (options) => {
  return {
    id: "figma",
    name: "Figma",
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      if (!options.clientId || !options.clientSecret) {
        env.logger.error(
          "Client Id and Client Secret are required for Figma. Make sure to provide them in the options."
        );
        throw new error_index.BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) {
        throw new error_index.BetterAuthError("codeVerifier is required for Figma");
      }
      const _scopes = options.disableDefaultScope ? [] : ["file_read"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const url = await oauth2.createAuthorizationURL({
        id: "figma",
        options,
        authorizationEndpoint: "https://www.figma.com/oauth",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI
      });
      return url;
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://www.figma.com/api/oauth/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://www.figma.com/api/oauth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      try {
        const { data: profile } = await fetch.betterFetch(
          "https://api.figma.com/v1/me",
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`
            }
          }
        );
        if (!profile) {
          env.logger.error("Failed to fetch user from Figma");
          return null;
        }
        const userMap = await options.mapProfileToUser?.(profile);
        return {
          user: {
            id: profile.id,
            name: profile.handle,
            email: profile.email,
            image: profile.img_url,
            emailVerified: !!profile.email,
            ...userMap
          },
          data: profile
        };
      } catch (error) {
        env.logger.error("Failed to fetch user info from Figma:", error);
        return null;
      }
    },
    options
  };
};

const github = (options) => {
  const tokenEndpoint = "https://github.com/login/oauth/access_token";
  return {
    id: "github",
    name: "GitHub",
    createAuthorizationURL({ state, scopes, loginHint, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["read:user", "user:email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "github",
        options,
        authorizationEndpoint: "https://github.com/login/oauth/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint,
        prompt: options.prompt
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://github.com/login/oauth/access_token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://api.github.com/user",
        {
          headers: {
            "User-Agent": "better-auth",
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error) {
        return null;
      }
      const { data: emails } = await fetch.betterFetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "User-Agent": "better-auth"
        }
      });
      if (!profile.email && emails) {
        profile.email = (emails.find((e) => e.primary) ?? emails[0])?.email;
      }
      const emailVerified = emails?.find((e) => e.email === profile.email)?.verified ?? false;
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          emailVerified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const google = (options) => {
  return {
    id: "google",
    name: "Google",
    async createAuthorizationURL({
      state,
      scopes,
      codeVerifier,
      redirectURI,
      loginHint,
      display
    }) {
      if (!options.clientId || !options.clientSecret) {
        env.logger.error(
          "Client Id and Client Secret is required for Google. Make sure to provide them in the options."
        );
        throw new error_index.BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) {
        throw new error_index.BetterAuthError("codeVerifier is required for Google");
      }
      const _scopes = options.disableDefaultScope ? [] : ["email", "profile", "openid"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const url = await oauth2.createAuthorizationURL({
        id: "google",
        options,
        authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt,
        accessType: options.accessType,
        display: display || options.display,
        loginHint,
        hd: options.hd,
        additionalParams: {
          include_granted_scopes: "true"
        }
      });
      return url;
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://oauth2.googleapis.com/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token"
      });
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      const googlePublicKeyUrl = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;
      const { data: tokenInfo } = await fetch.betterFetch(googlePublicKeyUrl);
      if (!tokenInfo) {
        return false;
      }
      const isValid = tokenInfo.aud === options.clientId && (tokenInfo.iss === "https://accounts.google.com" || tokenInfo.iss === "accounts.google.com");
      return isValid;
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (!token.idToken) {
        return null;
      }
      const user = jose.decodeJwt(token.idToken);
      const userMap = await options.mapProfileToUser?.(user);
      return {
        user: {
          id: user.sub,
          name: user.name,
          email: user.email,
          image: user.picture,
          emailVerified: user.email_verified,
          ...userMap
        },
        data: user
      };
    },
    options
  };
};

const kick = (options) => {
  return {
    id: "kick",
    name: "Kick",
    createAuthorizationURL({ state, scopes, redirectURI, codeVerifier }) {
      const _scopes = options.disableDefaultScope ? [] : ["user:read"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "kick",
        redirectURI,
        options,
        authorizationEndpoint: "https://id.kick.com/oauth/authorize",
        scopes: _scopes,
        codeVerifier,
        state
      });
    },
    async validateAuthorizationCode({ code, redirectURI, codeVerifier }) {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://id.kick.com/oauth/token",
        codeVerifier
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data, error } = await fetch.betterFetch("https://api.kick.com/public/v1/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });
      if (error) {
        return null;
      }
      const profile = data.data[0];
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.user_id,
          name: profile.name,
          email: profile.email,
          image: profile.profile_picture,
          emailVerified: true,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const huggingface = (options) => {
  return {
    id: "huggingface",
    name: "Hugging Face",
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "huggingface",
        options,
        authorizationEndpoint: "https://huggingface.co/oauth/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://huggingface.co/oauth/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://huggingface.co/oauth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://huggingface.co/oauth/userinfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.sub,
          name: profile.name || profile.preferred_username,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified ?? false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const microsoft = (options) => {
  const tenant = options.tenantId || "common";
  const authority = options.authority || "https://login.microsoftonline.com";
  const authorizationEndpoint = `${authority}/${tenant}/oauth2/v2.0/authorize`;
  const tokenEndpoint = `${authority}/${tenant}/oauth2/v2.0/token`;
  return {
    id: "microsoft",
    name: "Microsoft EntraID",
    createAuthorizationURL(data) {
      const scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email", "User.Read", "offline_access"];
      options.scope && scopes.push(...options.scope);
      data.scopes && scopes.push(...data.scopes);
      return oauth2.createAuthorizationURL({
        id: "microsoft",
        options,
        authorizationEndpoint,
        state: data.state,
        codeVerifier: data.codeVerifier,
        scopes,
        redirectURI: data.redirectURI,
        prompt: options.prompt,
        loginHint: data.loginHint
      });
    },
    validateAuthorizationCode({ code, codeVerifier, redirectURI }) {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (!token.idToken) {
        return null;
      }
      const user = jose.decodeJwt(token.idToken);
      const profilePhotoSize = options.profilePhotoSize || 48;
      await fetch.betterFetch(
        `https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          },
          async onResponse(context) {
            if (options.disableProfilePhoto || !context.response.ok) {
              return;
            }
            try {
              const response = context.response.clone();
              const pictureBuffer = await response.arrayBuffer();
              const pictureBase64 = base64.base64.encode(pictureBuffer);
              user.picture = `data:image/jpeg;base64, ${pictureBase64}`;
            } catch (e) {
              env.logger.error(
                e && typeof e === "object" && "name" in e ? e.name : "",
                e
              );
            }
          }
        }
      );
      const userMap = await options.mapProfileToUser?.(user);
      return {
        user: {
          id: user.sub,
          name: user.name,
          email: user.email,
          image: user.picture,
          emailVerified: true,
          ...userMap
        },
        data: user
      };
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      const scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email", "User.Read", "offline_access"];
      options.scope && scopes.push(...options.scope);
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        extraParams: {
          scope: scopes.join(" ")
          // Include the scopes in request to microsoft
        },
        tokenEndpoint
      });
    },
    options
  };
};

const slack = (options) => {
  return {
    id: "slack",
    name: "Slack",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email"];
      scopes && _scopes.push(...scopes);
      options.scope && _scopes.push(...options.scope);
      const url = new URL("https://slack.com/openid/connect/authorize");
      url.searchParams.set("scope", _scopes.join(" "));
      url.searchParams.set("response_type", "code");
      url.searchParams.set("client_id", options.clientId);
      url.searchParams.set("redirect_uri", options.redirectURI || redirectURI);
      url.searchParams.set("state", state);
      return url;
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://slack.com/api/openid.connect.token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://slack.com/api/openid.connect.token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://slack.com/api/openid.connect.userInfo",
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile["https://slack.com/user_id"],
          name: profile.name || "",
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture || profile["https://slack.com/user_image_512"],
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const notion = (options) => {
  const tokenEndpoint = "https://api.notion.com/v1/oauth/token";
  return {
    id: "notion",
    name: "Notion",
    createAuthorizationURL({ state, scopes, loginHint, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : [];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "notion",
        options,
        authorizationEndpoint: "https://api.notion.com/v1/oauth/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint,
        additionalParams: {
          owner: "user"
        }
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint,
        authentication: "basic"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch("https://api.notion.com/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "Notion-Version": "2022-06-28"
        }
      });
      if (error || !profile) {
        return null;
      }
      const userProfile = profile.bot?.owner?.user;
      if (!userProfile) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(userProfile);
      return {
        user: {
          id: userProfile.id,
          name: userProfile.name || "Notion User",
          email: userProfile.person?.email || null,
          image: userProfile.avatar_url,
          emailVerified: !!userProfile.person?.email,
          ...userMap
        },
        data: userProfile
      };
    },
    options
  };
};

const spotify = (options) => {
  return {
    id: "spotify",
    name: "Spotify",
    createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["user-read-email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "spotify",
        options,
        authorizationEndpoint: "https://accounts.spotify.com/authorize",
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint: "https://accounts.spotify.com/api/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://accounts.spotify.com/api/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://api.spotify.com/v1/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images[0]?.url,
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const twitch = (options) => {
  return {
    id: "twitch",
    name: "Twitch",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["user:read:email", "openid"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "twitch",
        redirectURI,
        options,
        authorizationEndpoint: "https://id.twitch.tv/oauth2/authorize",
        scopes: _scopes,
        state,
        claims: options.claims || [
          "email",
          "email_verified",
          "preferred_username",
          "picture"
        ]
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://id.twitch.tv/oauth2/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://id.twitch.tv/oauth2/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const idToken = token.idToken;
      if (!idToken) {
        env.logger.error("No idToken found in token");
        return null;
      }
      const profile = jose.decodeJwt(idToken);
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.sub,
          name: profile.preferred_username,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const twitter = (options) => {
  return {
    id: "twitter",
    name: "Twitter",
    createAuthorizationURL(data) {
      const _scopes = options.disableDefaultScope ? [] : ["users.read", "tweet.read", "offline.access", "users.email"];
      options.scope && _scopes.push(...options.scope);
      data.scopes && _scopes.push(...data.scopes);
      return oauth2.createAuthorizationURL({
        id: "twitter",
        options,
        authorizationEndpoint: "https://x.com/i/oauth2/authorize",
        scopes: _scopes,
        state: data.state,
        codeVerifier: data.codeVerifier,
        redirectURI: data.redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        authentication: "basic",
        redirectURI,
        options,
        tokenEndpoint: "https://api.x.com/2/oauth2/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        authentication: "basic",
        tokenEndpoint: "https://api.x.com/2/oauth2/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error: profileError } = await fetch.betterFetch(
        "https://api.x.com/2/users/me?user.fields=profile_image_url",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (profileError) {
        return null;
      }
      const { data: emailData, error: emailError } = await fetch.betterFetch("https://api.x.com/2/users/me?user.fields=confirmed_email", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });
      let emailVerified = false;
      if (!emailError && emailData?.data?.confirmed_email) {
        profile.data.email = emailData.data.confirmed_email;
        emailVerified = true;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.data.id,
          name: profile.data.name,
          email: profile.data.email || profile.data.username || null,
          image: profile.data.profile_image_url,
          emailVerified,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const dropbox = (options) => {
  const tokenEndpoint = "https://api.dropboxapi.com/oauth2/token";
  return {
    id: "dropbox",
    name: "Dropbox",
    createAuthorizationURL: async ({
      state,
      scopes,
      codeVerifier,
      redirectURI
    }) => {
      const _scopes = options.disableDefaultScope ? [] : ["account_info.read"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const additionalParams = {};
      if (options.accessType) {
        additionalParams.token_access_type = options.accessType;
      }
      return await oauth2.createAuthorizationURL({
        id: "dropbox",
        options,
        authorizationEndpoint: "https://www.dropbox.com/oauth2/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        codeVerifier,
        additionalParams
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return await oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://api.dropbox.com/oauth2/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://api.dropboxapi.com/2/users/get_current_account",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.account_id,
          name: profile.name?.display_name,
          email: profile.email,
          emailVerified: profile.email_verified || false,
          image: profile.profile_photo_url,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const linear = (options) => {
  const tokenEndpoint = "https://api.linear.app/oauth/token";
  return {
    id: "linear",
    name: "Linear",
    createAuthorizationURL({ state, scopes, loginHint, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["read"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "linear",
        options,
        authorizationEndpoint: "https://linear.app/oauth/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        loginHint
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://api.linear.app/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.accessToken}`
          },
          body: JSON.stringify({
            query: `
							query {
								viewer {
									id
									name
									email
									avatarUrl
									active
									createdAt
									updatedAt
								}
							}
						`
          })
        }
      );
      if (error || !profile?.data?.viewer) {
        return null;
      }
      const userData = profile.data.viewer;
      const userMap = await options.mapProfileToUser?.(userData);
      return {
        user: {
          id: profile.data.viewer.id,
          name: profile.data.viewer.name,
          email: profile.data.viewer.email,
          image: profile.data.viewer.avatarUrl,
          emailVerified: true,
          ...userMap
        },
        data: userData
      };
    },
    options
  };
};

const linkedin = (options) => {
  const authorizationEndpoint = "https://www.linkedin.com/oauth/v2/authorization";
  const tokenEndpoint = "https://www.linkedin.com/oauth/v2/accessToken";
  return {
    id: "linkedin",
    name: "Linkedin",
    createAuthorizationURL: async ({
      state,
      scopes,
      redirectURI,
      loginHint
    }) => {
      const _scopes = options.disableDefaultScope ? [] : ["profile", "email", "openid"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return await oauth2.createAuthorizationURL({
        id: "linkedin",
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        loginHint,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return await oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://api.linkedin.com/v2/userinfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified || false,
          image: profile.picture,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const cleanDoubleSlashes = (input = "") => {
  return input.split("://").map((str) => str.replace(/\/{2,}/g, "/")).join("://");
};
const issuerToEndpoints = (issuer) => {
  let baseUrl = issuer || "https://gitlab.com";
  return {
    authorizationEndpoint: cleanDoubleSlashes(`${baseUrl}/oauth/authorize`),
    tokenEndpoint: cleanDoubleSlashes(`${baseUrl}/oauth/token`),
    userinfoEndpoint: cleanDoubleSlashes(`${baseUrl}/api/v4/user`)
  };
};
const gitlab = (options) => {
  const { authorizationEndpoint, tokenEndpoint, userinfoEndpoint } = issuerToEndpoints(options.issuer);
  const issuerId = "gitlab";
  const issuerName = "Gitlab";
  return {
    id: issuerId,
    name: issuerName,
    createAuthorizationURL: async ({
      state,
      scopes,
      codeVerifier,
      loginHint,
      redirectURI
    }) => {
      const _scopes = options.disableDefaultScope ? [] : ["read_user"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return await oauth2.createAuthorizationURL({
        id: issuerId,
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        redirectURI,
        codeVerifier,
        loginHint
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI, codeVerifier }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        codeVerifier,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        userinfoEndpoint,
        { headers: { authorization: `Bearer ${token.accessToken}` } }
      );
      if (error || profile.state !== "active" || profile.locked) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.name ?? profile.username,
          email: profile.email,
          image: profile.avatar_url,
          emailVerified: true,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const tiktok = (options) => {
  return {
    id: "tiktok",
    name: "TikTok",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["user.info.profile"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return new URL(
        `https://www.tiktok.com/v2/auth/authorize?scope=${_scopes.join(
          ","
        )}&response_type=code&client_key=${options.clientKey}&redirect_uri=${encodeURIComponent(
          options.redirectURI || redirectURI
        )}&state=${state}`
      );
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI: options.redirectURI || redirectURI,
        options: {
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://open.tiktokapis.com/v2/oauth/token/"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://open.tiktokapis.com/v2/oauth/token/",
        authentication: "post",
        extraParams: {
          client_key: options.clientKey
        }
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const fields = [
        "open_id",
        "avatar_large_url",
        "display_name",
        "username"
      ];
      const { data: profile, error } = await fetch.betterFetch(
        `https://open.tiktokapis.com/v2/user/info/?fields=${fields.join(",")}`,
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error) {
        return null;
      }
      return {
        user: {
          email: profile.data.user.email || profile.data.user.username,
          id: profile.data.user.open_id,
          name: profile.data.user.display_name || profile.data.user.username,
          image: profile.data.user.avatar_large_url,
          /** @note Tiktok does not provide emailVerified or even email*/
          emailVerified: profile.data.user.email ? true : false
        },
        data: profile
      };
    },
    options
  };
};

const reddit = (options) => {
  return {
    id: "reddit",
    name: "Reddit",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["identity"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "reddit",
        options,
        authorizationEndpoint: "https://www.reddit.com/api/v1/authorize",
        scopes: _scopes,
        state,
        redirectURI,
        duration: options.duration
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: options.redirectURI || redirectURI
      });
      const headers = {
        "content-type": "application/x-www-form-urlencoded",
        accept: "text/plain",
        "user-agent": "better-auth",
        Authorization: `Basic ${base64.base64.encode(
          `${options.clientId}:${options.clientSecret}`
        )}`
      };
      const { data, error } = await fetch.betterFetch(
        "https://www.reddit.com/api/v1/access_token",
        {
          method: "POST",
          headers,
          body: body.toString()
        }
      );
      if (error) {
        throw error;
      }
      return oauth2.getOAuth2Tokens(data);
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        authentication: "basic",
        tokenEndpoint: "https://www.reddit.com/api/v1/access_token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://oauth.reddit.com/api/v1/me",
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "User-Agent": "better-auth"
          }
        }
      );
      if (error) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.name,
          email: profile.oauth_client_id,
          emailVerified: profile.has_verified_email,
          image: profile.icon_img?.split("?")[0],
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const roblox = (options) => {
  return {
    id: "roblox",
    name: "Roblox",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return new URL(
        `https://apis.roblox.com/oauth/v1/authorize?scope=${_scopes.join(
          "+"
        )}&response_type=code&client_id=${options.clientId}&redirect_uri=${encodeURIComponent(
          options.redirectURI || redirectURI
        )}&state=${state}&prompt=${options.prompt || "select_account consent"}`
      );
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI: options.redirectURI || redirectURI,
        options,
        tokenEndpoint: "https://apis.roblox.com/oauth/v1/token",
        authentication: "post"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://apis.roblox.com/oauth/v1/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://apis.roblox.com/oauth/v1/userinfo",
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.sub,
          name: profile.nickname || profile.preferred_username || "",
          image: profile.picture,
          email: profile.preferred_username || null,
          // Roblox does not provide email
          emailVerified: true,
          ...userMap
        },
        data: {
          ...profile
        }
      };
    },
    options
  };
};

const salesforce = (options) => {
  const environment = options.environment ?? "production";
  const isSandbox = environment === "sandbox";
  const authorizationEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/authorize` : isSandbox ? "https://test.salesforce.com/services/oauth2/authorize" : "https://login.salesforce.com/services/oauth2/authorize";
  const tokenEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/token` : isSandbox ? "https://test.salesforce.com/services/oauth2/token" : "https://login.salesforce.com/services/oauth2/token";
  const userInfoEndpoint = options.loginUrl ? `https://${options.loginUrl}/services/oauth2/userinfo` : isSandbox ? "https://test.salesforce.com/services/oauth2/userinfo" : "https://login.salesforce.com/services/oauth2/userinfo";
  return {
    id: "salesforce",
    name: "Salesforce",
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      if (!options.clientId || !options.clientSecret) {
        env.logger.error(
          "Client Id and Client Secret are required for Salesforce. Make sure to provide them in the options."
        );
        throw new error_index.BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      if (!codeVerifier) {
        throw new error_index.BetterAuthError("codeVerifier is required for Salesforce");
      }
      const _scopes = options.disableDefaultScope ? [] : ["openid", "email", "profile"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "salesforce",
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI: options.redirectURI || redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI: options.redirectURI || redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      try {
        const { data: user } = await fetch.betterFetch(
          userInfoEndpoint,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`
            }
          }
        );
        if (!user) {
          env.logger.error("Failed to fetch user info from Salesforce");
          return null;
        }
        const userMap = await options.mapProfileToUser?.(user);
        return {
          user: {
            id: user.user_id,
            name: user.name,
            email: user.email,
            image: user.photos?.picture || user.photos?.thumbnail,
            emailVerified: user.email_verified ?? false,
            ...userMap
          },
          data: user
        };
      } catch (error) {
        env.logger.error("Failed to fetch user info from Salesforce:", error);
        return null;
      }
    },
    options
  };
};

const vk = (options) => {
  return {
    id: "vk",
    name: "VK",
    async createAuthorizationURL({ state, scopes, codeVerifier, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["email", "phone"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      const authorizationEndpoint = "https://id.vk.com/authorize";
      return oauth2.createAuthorizationURL({
        id: "vk",
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        redirectURI,
        codeVerifier
      });
    },
    validateAuthorizationCode: async ({
      code,
      codeVerifier,
      redirectURI,
      deviceId
    }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI: options.redirectURI || redirectURI,
        options,
        deviceId,
        tokenEndpoint: "https://id.vk.com/oauth2/auth"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://id.vk.com/oauth2/auth"
      });
    },
    async getUserInfo(data) {
      if (options.getUserInfo) {
        return options.getUserInfo(data);
      }
      if (!data.accessToken) {
        return null;
      }
      const formBody = new URLSearchParams({
        access_token: data.accessToken,
        client_id: options.clientId
      }).toString();
      const { data: profile, error } = await fetch.betterFetch(
        "https://id.vk.com/oauth2/user_info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formBody
        }
      );
      if (error) {
        return null;
      }
      if (!profile.user.email) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.user.user_id,
          first_name: profile.user.first_name,
          last_name: profile.user.last_name,
          email: profile.user.email,
          image: profile.user.avatar,
          /** @note VK does not provide emailVerified*/
          emailVerified: !!profile.user.email,
          birthday: profile.user.birthday,
          sex: profile.user.sex,
          name: `${profile.user.first_name} ${profile.user.last_name}`,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const zoom = (userOptions) => {
  const options = {
    pkce: true,
    ...userOptions
  };
  return {
    id: "zoom",
    name: "Zoom",
    createAuthorizationURL: async ({ state, redirectURI, codeVerifier }) => {
      const params = new URLSearchParams({
        response_type: "code",
        redirect_uri: options.redirectURI ? options.redirectURI : redirectURI,
        client_id: options.clientId,
        state
      });
      if (options.pkce) {
        const codeChallenge = await oauth2.generateCodeChallenge(codeVerifier);
        params.set("code_challenge_method", "S256");
        params.set("code_challenge", codeChallenge);
      }
      const url = new URL("https://zoom.us/oauth/authorize");
      url.search = params.toString();
      return url;
    },
    validateAuthorizationCode: async ({ code, redirectURI, codeVerifier }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI: options.redirectURI || redirectURI,
        codeVerifier,
        options,
        tokenEndpoint: "https://zoom.us/oauth/token",
        authentication: "post"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://api.zoom.us/v2/users/me",
        {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      return {
        user: {
          id: profile.id,
          name: profile.display_name,
          image: profile.pic_url,
          email: profile.email,
          emailVerified: Boolean(profile.verified),
          ...userMap
        },
        data: {
          ...profile
        }
      };
    }
  };
};

const kakao = (options) => {
  return {
    id: "kakao",
    name: "Kakao",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["account_email", "profile_image", "profile_nickname"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "kakao",
        options,
        authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
        scopes: _scopes,
        state,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://kauth.kakao.com/oauth/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://kauth.kakao.com/oauth/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error || !profile) {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      const account = profile.kakao_account || {};
      const kakaoProfile = account.profile || {};
      const user = {
        id: String(profile.id),
        name: kakaoProfile.nickname || account.name || void 0,
        email: account.email,
        image: kakaoProfile.profile_image_url || kakaoProfile.thumbnail_image_url,
        emailVerified: !!account.is_email_valid && !!account.is_email_verified,
        ...userMap
      };
      return {
        user,
        data: profile
      };
    },
    options
  };
};

const naver = (options) => {
  return {
    id: "naver",
    name: "Naver",
    createAuthorizationURL({ state, scopes, redirectURI }) {
      const _scopes = options.disableDefaultScope ? [] : ["profile", "email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return oauth2.createAuthorizationURL({
        id: "naver",
        options,
        authorizationEndpoint: "https://nid.naver.com/oauth2.0/authorize",
        scopes: _scopes,
        state,
        redirectURI
      });
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        redirectURI,
        options,
        tokenEndpoint: "https://nid.naver.com/oauth2.0/token"
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientKey: options.clientKey,
          clientSecret: options.clientSecret
        },
        tokenEndpoint: "https://nid.naver.com/oauth2.0/token"
      });
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      const { data: profile, error } = await fetch.betterFetch(
        "https://openapi.naver.com/v1/nid/me",
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`
          }
        }
      );
      if (error || !profile || profile.resultcode !== "00") {
        return null;
      }
      const userMap = await options.mapProfileToUser?.(profile);
      const res = profile.response || {};
      const user = {
        id: res.id,
        name: res.name || res.nickname,
        email: res.email,
        image: res.profile_image,
        emailVerified: false,
        ...userMap
      };
      return {
        user,
        data: profile
      };
    },
    options
  };
};

const line = (options) => {
  const authorizationEndpoint = "https://access.line.me/oauth2/v2.1/authorize";
  const tokenEndpoint = "https://api.line.me/oauth2/v2.1/token";
  const userInfoEndpoint = "https://api.line.me/oauth2/v2.1/userinfo";
  const verifyIdTokenEndpoint = "https://api.line.me/oauth2/v2.1/verify";
  return {
    id: "line",
    name: "LINE",
    async createAuthorizationURL({
      state,
      scopes,
      codeVerifier,
      redirectURI,
      loginHint
    }) {
      const _scopes = options.disableDefaultScope ? [] : ["openid", "profile", "email"];
      options.scope && _scopes.push(...options.scope);
      scopes && _scopes.push(...scopes);
      return await oauth2.createAuthorizationURL({
        id: "line",
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        loginHint
      });
    },
    validateAuthorizationCode: async ({ code, codeVerifier, redirectURI }) => {
      return oauth2.validateAuthorizationCode({
        code,
        codeVerifier,
        redirectURI,
        options,
        tokenEndpoint
      });
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      return oauth2.refreshAccessToken({
        refreshToken,
        options: {
          clientId: options.clientId,
          clientSecret: options.clientSecret
        },
        tokenEndpoint
      });
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      const body = new URLSearchParams();
      body.set("id_token", token);
      body.set("client_id", options.clientId);
      if (nonce) body.set("nonce", nonce);
      const { data, error } = await fetch.betterFetch(
        verifyIdTokenEndpoint,
        {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          body
        }
      );
      if (error || !data) {
        return false;
      }
      if (data.aud !== options.clientId) return false;
      if (nonce && data.nonce && data.nonce !== nonce) return false;
      return true;
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      let profile = null;
      if (token.idToken) {
        try {
          profile = jose.decodeJwt(token.idToken);
        } catch {
        }
      }
      if (!profile) {
        const { data } = await fetch.betterFetch(userInfoEndpoint, {
          headers: {
            authorization: `Bearer ${token.accessToken}`
          }
        });
        profile = data || null;
      }
      if (!profile) return null;
      const userMap = await options.mapProfileToUser?.(profile);
      const id = profile.sub || profile.userId;
      const name = profile.name || profile.displayName;
      const image = profile.picture || profile.pictureUrl || void 0;
      const email = profile.email;
      return {
        user: {
          id,
          name,
          email,
          image,
          // LINE does not expose email verification status in ID token/userinfo
          emailVerified: false,
          ...userMap
        },
        data: profile
      };
    },
    options
  };
};

const paypal = (options) => {
  const environment = options.environment || "sandbox";
  const isSandbox = environment === "sandbox";
  const authorizationEndpoint = isSandbox ? "https://www.sandbox.paypal.com/signin/authorize" : "https://www.paypal.com/signin/authorize";
  const tokenEndpoint = isSandbox ? "https://api-m.sandbox.paypal.com/v1/oauth2/token" : "https://api-m.paypal.com/v1/oauth2/token";
  const userInfoEndpoint = isSandbox ? "https://api-m.sandbox.paypal.com/v1/identity/oauth2/userinfo" : "https://api-m.paypal.com/v1/identity/oauth2/userinfo";
  return {
    id: "paypal",
    name: "PayPal",
    async createAuthorizationURL({ state, codeVerifier, redirectURI }) {
      if (!options.clientId || !options.clientSecret) {
        env.logger.error(
          "Client Id and Client Secret is required for PayPal. Make sure to provide them in the options."
        );
        throw new error_index.BetterAuthError("CLIENT_ID_AND_SECRET_REQUIRED");
      }
      const _scopes = [];
      const url = await oauth2.createAuthorizationURL({
        id: "paypal",
        options,
        authorizationEndpoint,
        scopes: _scopes,
        state,
        codeVerifier,
        redirectURI,
        prompt: options.prompt
      });
      return url;
    },
    validateAuthorizationCode: async ({ code, redirectURI }) => {
      const credentials = base64.base64.encode(
        `${options.clientId}:${options.clientSecret}`
      );
      try {
        const response = await fetch.betterFetch(tokenEndpoint, {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectURI
          }).toString()
        });
        if (!response.data) {
          throw new error_index.BetterAuthError("FAILED_TO_GET_ACCESS_TOKEN");
        }
        const data = response.data;
        const result = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          accessTokenExpiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1e3) : void 0,
          idToken: data.id_token
        };
        return result;
      } catch (error) {
        env.logger.error("PayPal token exchange failed:", error);
        throw new error_index.BetterAuthError("FAILED_TO_GET_ACCESS_TOKEN");
      }
    },
    refreshAccessToken: options.refreshAccessToken ? options.refreshAccessToken : async (refreshToken) => {
      const credentials = base64.base64.encode(
        `${options.clientId}:${options.clientSecret}`
      );
      try {
        const response = await fetch.betterFetch(tokenEndpoint, {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken
          }).toString()
        });
        if (!response.data) {
          throw new error_index.BetterAuthError("FAILED_TO_REFRESH_ACCESS_TOKEN");
        }
        const data = response.data;
        return {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          accessTokenExpiresAt: data.expires_in ? new Date(Date.now() + data.expires_in * 1e3) : void 0
        };
      } catch (error) {
        env.logger.error("PayPal token refresh failed:", error);
        throw new error_index.BetterAuthError("FAILED_TO_REFRESH_ACCESS_TOKEN");
      }
    },
    async verifyIdToken(token, nonce) {
      if (options.disableIdTokenSignIn) {
        return false;
      }
      if (options.verifyIdToken) {
        return options.verifyIdToken(token, nonce);
      }
      try {
        const payload = jose.decodeJwt(token);
        return !!payload.sub;
      } catch (error) {
        env.logger.error("Failed to verify PayPal ID token:", error);
        return false;
      }
    },
    async getUserInfo(token) {
      if (options.getUserInfo) {
        return options.getUserInfo(token);
      }
      if (!token.accessToken) {
        env.logger.error("Access token is required to fetch PayPal user info");
        return null;
      }
      try {
        const response = await fetch.betterFetch(
          `${userInfoEndpoint}?schema=paypalv1.1`,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
              Accept: "application/json"
            }
          }
        );
        if (!response.data) {
          env.logger.error("Failed to fetch user info from PayPal");
          return null;
        }
        const userInfo = response.data;
        const userMap = await options.mapProfileToUser?.(userInfo);
        const result = {
          user: {
            id: userInfo.user_id,
            name: userInfo.name,
            email: userInfo.email,
            image: userInfo.picture,
            emailVerified: userInfo.email_verified,
            ...userMap
          },
          data: userInfo
        };
        return result;
      } catch (error) {
        env.logger.error("Failed to fetch user info from PayPal:", error);
        return null;
      }
    },
    options
  };
};

const socialProviders = {
  apple,
  atlassian,
  cognito,
  discord,
  facebook,
  figma,
  github,
  microsoft,
  google,
  huggingface,
  slack,
  spotify,
  twitch,
  twitter,
  dropbox,
  kick,
  linear,
  linkedin,
  gitlab,
  tiktok,
  reddit,
  roblox,
  salesforce,
  vk,
  zoom,
  notion,
  kakao,
  naver,
  line,
  paypal
};
const socialProviderList = Object.keys(socialProviders);
const SocialProviderListEnum = z__namespace.enum(socialProviderList).or(z__namespace.string());

exports.SocialProviderListEnum = SocialProviderListEnum;
exports.apple = apple;
exports.atlassian = atlassian;
exports.cognito = cognito;
exports.discord = discord;
exports.dropbox = dropbox;
exports.facebook = facebook;
exports.figma = figma;
exports.getApplePublicKey = getApplePublicKey;
exports.getCognitoPublicKey = getCognitoPublicKey;
exports.github = github;
exports.gitlab = gitlab;
exports.google = google;
exports.huggingface = huggingface;
exports.kakao = kakao;
exports.kick = kick;
exports.line = line;
exports.linear = linear;
exports.linkedin = linkedin;
exports.microsoft = microsoft;
exports.naver = naver;
exports.notion = notion;
exports.paypal = paypal;
exports.reddit = reddit;
exports.roblox = roblox;
exports.salesforce = salesforce;
exports.slack = slack;
exports.socialProviderList = socialProviderList;
exports.socialProviders = socialProviders;
exports.spotify = spotify;
exports.tiktok = tiktok;
exports.twitch = twitch;
exports.twitter = twitter;
exports.vk = vk;
exports.zoom = zoom;
