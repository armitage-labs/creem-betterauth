'use strict';

require('@better-auth/core/error');
require('@better-auth/core/env');
require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
require('@better-auth/utils/binary');
const cookieUtils = require('../shared/better-auth.CqgkAe9n.cjs');
const middleware = require('@better-auth/core/middleware');

const reactStartCookies = () => {
  return {
    id: "react-start-cookies",
    hooks: {
      after: [
        {
          matcher(ctx) {
            return true;
          },
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const returned = ctx.context.responseHeaders;
            if ("_flag" in ctx && ctx._flag === "router") {
              return;
            }
            if (returned instanceof Headers) {
              const setCookies = returned?.get("set-cookie");
              if (!setCookies) return;
              const parsed = cookieUtils.parseSetCookieHeader(setCookies);
              const { setCookie } = await import('../chunks/index.cjs');
              parsed.forEach((value, key) => {
                if (!key) return;
                const opts = {
                  sameSite: value.samesite,
                  secure: value.secure,
                  maxAge: value["max-age"],
                  httpOnly: value.httponly,
                  domain: value.domain,
                  path: value.path
                };
                try {
                  setCookie(key, decodeURIComponent(value.value), opts);
                } catch (e) {
                }
              });
              return;
            }
          })
        }
      ]
    }
  };
};

exports.reactStartCookies = reactStartCookies;
