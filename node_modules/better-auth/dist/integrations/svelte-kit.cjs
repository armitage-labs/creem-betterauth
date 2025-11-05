'use strict';

const middleware = require('@better-auth/core/middleware');
require('@better-auth/core/error');
require('@better-auth/core/env');
require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
require('@better-auth/utils/binary');
const cookieUtils = require('../shared/better-auth.CqgkAe9n.cjs');

const toSvelteKitHandler = (auth) => {
  return (event) => auth.handler(event.request);
};
const svelteKitHandler = async ({
  auth,
  event,
  resolve,
  building
}) => {
  if (building) {
    return resolve(event);
  }
  const { request, url } = event;
  if (isAuthPath(url.toString(), auth.options)) {
    return auth.handler(request);
  }
  return resolve(event);
};
function isAuthPath(url, options) {
  const _url = new URL(url);
  const baseURL = new URL(
    `${options.baseURL || _url.origin}${options.basePath || "/api/auth"}`
  );
  if (_url.origin !== baseURL.origin) return false;
  if (!_url.pathname.startsWith(
    baseURL.pathname.endsWith("/") ? baseURL.pathname : `${baseURL.pathname}/`
  ))
    return false;
  return true;
}
const sveltekitCookies = (getRequestEvent) => {
  return {
    id: "sveltekit-cookies",
    hooks: {
      after: [
        {
          matcher() {
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
              const event = getRequestEvent();
              if (!event) return;
              const parsed = cookieUtils.parseSetCookieHeader(setCookies);
              for (const [name, { value, ...ops }] of parsed) {
                try {
                  event.cookies.set(name, decodeURIComponent(value), {
                    sameSite: ops.samesite,
                    path: ops.path || "/",
                    expires: ops.expires,
                    secure: ops.secure,
                    httpOnly: ops.httponly,
                    domain: ops.domain,
                    maxAge: ops["max-age"]
                  });
                } catch (e) {
                }
              }
            }
          })
        }
      ]
    }
  };
};

exports.isAuthPath = isAuthPath;
exports.svelteKitHandler = svelteKitHandler;
exports.sveltekitCookies = sveltekitCookies;
exports.toSvelteKitHandler = toSvelteKitHandler;
