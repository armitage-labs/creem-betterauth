'use strict';

require('@better-auth/core/error');
require('@better-auth/core/env');
require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
require('@better-auth/utils/binary');
const cookieUtils = require('../shared/better-auth.CqgkAe9n.cjs');
const middleware = require('@better-auth/core/middleware');

function toNextJsHandler(auth) {
  const handler = async (request) => {
    return "handler" in auth ? auth.handler(request) : auth(request);
  };
  return {
    GET: handler,
    POST: handler
  };
}
const nextCookies = () => {
  return {
    id: "next-cookies",
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
              const { cookies } = await import('next/headers');
              let cookieHelper;
              try {
                cookieHelper = await cookies();
              } catch (error) {
                if (error instanceof Error && error.message.startsWith(
                  "`cookies` was called outside a request scope."
                )) {
                  return;
                }
                throw error;
              }
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
                  cookieHelper.set(key, decodeURIComponent(value.value), opts);
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

exports.nextCookies = nextCookies;
exports.toNextJsHandler = toNextJsHandler;
