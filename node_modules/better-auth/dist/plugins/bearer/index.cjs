'use strict';

const betterCall = require('better-call');
require('@better-auth/core/error');
require('@better-auth/core/env');
require('@better-auth/utils/base64');
const hmac = require('@better-auth/utils/hmac');
require('@better-auth/utils/binary');
const cookieUtils = require('../../shared/better-auth.CqgkAe9n.cjs');
const middleware = require('@better-auth/core/middleware');

const bearer = (options) => {
  return {
    id: "bearer",
    hooks: {
      before: [
        {
          matcher(context) {
            return Boolean(
              context.request?.headers.get("authorization") || context.headers?.get("authorization")
            );
          },
          handler: middleware.createAuthMiddleware(async (c) => {
            const token = c.request?.headers.get("authorization")?.replace("Bearer ", "") || c.headers?.get("Authorization")?.replace("Bearer ", "");
            if (!token) {
              return;
            }
            let signedToken = "";
            if (token.includes(".")) {
              signedToken = token.replace("=", "");
            } else {
              if (options?.requireSignature) {
                return;
              }
              signedToken = (await betterCall.serializeSignedCookie("", token, c.context.secret)).replace("=", "");
            }
            try {
              const decodedToken = decodeURIComponent(signedToken);
              const isValid = await hmac.createHMAC(
                "SHA-256",
                "base64urlnopad"
              ).verify(
                c.context.secret,
                decodedToken.split(".")[0],
                decodedToken.split(".")[1]
              );
              if (!isValid) {
                return;
              }
            } catch (e) {
              return;
            }
            const existingHeaders = c.request?.headers || c.headers;
            const headers = new Headers({
              ...Object.fromEntries(existingHeaders?.entries())
            });
            headers.append(
              "cookie",
              `${c.context.authCookies.sessionToken.name}=${signedToken}`
            );
            return {
              context: {
                headers
              }
            };
          })
        }
      ],
      after: [
        {
          matcher(context) {
            return true;
          },
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const setCookie = ctx.context.responseHeaders?.get("set-cookie");
            if (!setCookie) {
              return;
            }
            const parsedCookies = cookieUtils.parseSetCookieHeader(setCookie);
            const cookieName = ctx.context.authCookies.sessionToken.name;
            const sessionCookie = parsedCookies.get(cookieName);
            if (!sessionCookie || !sessionCookie.value || sessionCookie["max-age"] === 0) {
              return;
            }
            const token = sessionCookie.value;
            const exposedHeaders = ctx.context.responseHeaders?.get(
              "access-control-expose-headers"
            ) || "";
            const headersSet = new Set(
              exposedHeaders.split(",").map((header) => header.trim()).filter(Boolean)
            );
            headersSet.add("set-auth-token");
            ctx.setHeader("set-auth-token", token);
            ctx.setHeader(
              "Access-Control-Expose-Headers",
              Array.from(headersSet).join(", ")
            );
          })
        }
      ]
    }
  };
};

exports.bearer = bearer;
