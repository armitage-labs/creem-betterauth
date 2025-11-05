'use strict';

const error = require('@better-auth/core/error');
const date = require('./better-auth.C1hdVENX.cjs');
const env = require('@better-auth/core/env');
const base64 = require('@better-auth/utils/base64');
const hmac = require('@better-auth/utils/hmac');
const json = require('./better-auth.C7Ar55gj.cjs');
const url = require('./better-auth.Z-JVyRjt.cjs');
const binary = require('@better-auth/utils/binary');
require('./better-auth.CqgkAe9n.cjs');

//#region src/index.ts
const s = 1e3;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;
const mo = y / 12;
function ms(value, options) {
	if (typeof value === "string") return parse(value);
	else if (typeof value === "number") return format(value);
	throw new Error(`Value provided to ms() must be a string or number. value=${JSON.stringify(value)}`);
}
/**
* Parse the given string and return milliseconds.
*
* @param str - A string to parse to milliseconds
* @returns The parsed value in milliseconds, or `NaN` if the string can't be
* parsed
*/
function parse(str) {
	if (typeof str !== "string" || str.length === 0 || str.length > 100) throw new Error(`Value provided to ms.parse() must be a string with length between 1 and 99. value=${JSON.stringify(str)}`);
	const match = /^(?<value>-?\d*\.?\d+) *(?<unit>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mo|years?|yrs?|y)?$/i.exec(str);
	if (!match?.groups) return NaN;
	const { value, unit = "ms" } = match.groups;
	const n = parseFloat(value);
	const matchUnit = unit.toLowerCase();
	/* istanbul ignore next - istanbul doesn't understand, but thankfully the TypeScript the exhaustiveness check in the default case keeps us type safe here */
	switch (matchUnit) {
		case "years":
		case "year":
		case "yrs":
		case "yr":
		case "y": return n * y;
		case "months":
		case "month":
		case "mo": return n * mo;
		case "weeks":
		case "week":
		case "w": return n * w;
		case "days":
		case "day":
		case "d": return n * d;
		case "hours":
		case "hour":
		case "hrs":
		case "hr":
		case "h": return n * h;
		case "minutes":
		case "minute":
		case "mins":
		case "min":
		case "m": return n * m;
		case "seconds":
		case "second":
		case "secs":
		case "sec":
		case "s": return n * s;
		case "milliseconds":
		case "millisecond":
		case "msecs":
		case "msec":
		case "ms": return n;
		default: throw new Error(`Unknown unit "${matchUnit}" provided to ms.parse(). value=${JSON.stringify(str)}`);
	}
}
/**
* Short format for `ms`.
*/
function fmtShort(ms$1) {
	const msAbs = Math.abs(ms$1);
	if (msAbs >= y) return `${Math.round(ms$1 / y)}y`;
	if (msAbs >= mo) return `${Math.round(ms$1 / mo)}mo`;
	if (msAbs >= w) return `${Math.round(ms$1 / w)}w`;
	if (msAbs >= d) return `${Math.round(ms$1 / d)}d`;
	if (msAbs >= h) return `${Math.round(ms$1 / h)}h`;
	if (msAbs >= m) return `${Math.round(ms$1 / m)}m`;
	if (msAbs >= s) return `${Math.round(ms$1 / s)}s`;
	return `${ms$1}ms`;
}
/**
* Format the given integer as a string.
*
* @param ms - milliseconds
* @param options - Options for the conversion
* @returns The formatted string
*/
function format(ms$1, options) {
	if (typeof ms$1 !== "number" || !Number.isFinite(ms$1)) throw new Error("Value provided to ms.format() must be of type number.");
	return fmtShort(ms$1);
}

function createCookieGetter(options) {
  const secure = options.advanced?.useSecureCookies !== void 0 ? options.advanced?.useSecureCookies : options.baseURL !== void 0 ? options.baseURL.startsWith("https://") ? true : false : env.isProduction;
  const secureCookiePrefix = secure ? "__Secure-" : "";
  const crossSubdomainEnabled = !!options.advanced?.crossSubDomainCookies?.enabled;
  const domain = crossSubdomainEnabled ? options.advanced?.crossSubDomainCookies?.domain || (options.baseURL ? new URL(options.baseURL).hostname : void 0) : void 0;
  if (crossSubdomainEnabled && !domain) {
    throw new error.BetterAuthError(
      "baseURL is required when crossSubdomainCookies are enabled"
    );
  }
  function createCookie(cookieName, overrideAttributes = {}) {
    const prefix = options.advanced?.cookiePrefix || "better-auth";
    const name = options.advanced?.cookies?.[cookieName]?.name || `${prefix}.${cookieName}`;
    const attributes = options.advanced?.cookies?.[cookieName]?.attributes;
    return {
      name: `${secureCookiePrefix}${name}`,
      attributes: {
        secure: !!secureCookiePrefix,
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        ...crossSubdomainEnabled ? { domain } : {},
        ...options.advanced?.defaultCookieAttributes,
        ...overrideAttributes,
        ...attributes
      }
    };
  }
  return createCookie;
}
function getCookies(options) {
  const createCookie = createCookieGetter(options);
  const sessionMaxAge = options.session?.expiresIn || ms("7d") / 1e3;
  const sessionToken = createCookie("session_token", {
    maxAge: sessionMaxAge
  });
  const sessionData = createCookie("session_data", {
    maxAge: options.session?.cookieCache?.maxAge || 60 * 5
  });
  const dontRememberToken = createCookie("dont_remember");
  return {
    sessionToken: {
      name: sessionToken.name,
      options: sessionToken.attributes
    },
    /**
     * This cookie is used to store the session data in the cookie
     * This is useful for when you want to cache the session in the cookie
     */
    sessionData: {
      name: sessionData.name,
      options: sessionData.attributes
    },
    dontRememberToken: {
      name: dontRememberToken.name,
      options: dontRememberToken.attributes
    }
  };
}
async function setCookieCache(ctx, session, dontRememberMe) {
  const shouldStoreSessionDataInCookie = ctx.context.options.session?.cookieCache?.enabled;
  if (shouldStoreSessionDataInCookie) {
    const filteredSession = Object.entries(session.session).reduce(
      (acc, [key, value]) => {
        const fieldConfig = ctx.context.options.session?.additionalFields?.[key];
        if (!fieldConfig || fieldConfig.returned !== false) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    const sessionData = { session: filteredSession, user: session.user };
    const options = {
      ...ctx.context.authCookies.sessionData.options,
      maxAge: dontRememberMe ? void 0 : ctx.context.authCookies.sessionData.options.maxAge
    };
    const expiresAtDate = date.getDate(options.maxAge || 60, "sec").getTime();
    const data = base64.base64Url.encode(
      JSON.stringify({
        session: sessionData,
        expiresAt: expiresAtDate,
        signature: await hmac.createHMAC("SHA-256", "base64urlnopad").sign(
          ctx.context.secret,
          JSON.stringify({
            ...sessionData,
            expiresAt: expiresAtDate
          })
        )
      }),
      {
        padding: false
      }
    );
    if (data.length > 4093) {
      ctx.context?.logger?.error(
        `Session data exceeds cookie size limit (${data.length} bytes > 4093 bytes). Consider reducing session data size or disabling cookie cache. Session will not be cached in cookie.`
      );
      return;
    }
    ctx.setCookie(ctx.context.authCookies.sessionData.name, data, options);
  }
}
async function setSessionCookie(ctx, session, dontRememberMe, overrides) {
  const dontRememberMeCookie = await ctx.getSignedCookie(
    ctx.context.authCookies.dontRememberToken.name,
    ctx.context.secret
  );
  dontRememberMe = dontRememberMe !== void 0 ? dontRememberMe : !!dontRememberMeCookie;
  const options = ctx.context.authCookies.sessionToken.options;
  const maxAge = dontRememberMe ? void 0 : ctx.context.sessionConfig.expiresIn;
  await ctx.setSignedCookie(
    ctx.context.authCookies.sessionToken.name,
    session.session.token,
    ctx.context.secret,
    {
      ...options,
      maxAge,
      ...overrides
    }
  );
  if (dontRememberMe) {
    await ctx.setSignedCookie(
      ctx.context.authCookies.dontRememberToken.name,
      "true",
      ctx.context.secret,
      ctx.context.authCookies.dontRememberToken.options
    );
  }
  await setCookieCache(ctx, session, dontRememberMe);
  ctx.context.setNewSession(session);
  if (ctx.context.options.secondaryStorage) {
    await ctx.context.secondaryStorage?.set(
      session.session.token,
      JSON.stringify({
        user: session.user,
        session: session.session
      }),
      Math.floor(
        (new Date(session.session.expiresAt).getTime() - Date.now()) / 1e3
      )
    );
  }
}
function deleteSessionCookie(ctx, skipDontRememberMe) {
  ctx.setCookie(ctx.context.authCookies.sessionToken.name, "", {
    ...ctx.context.authCookies.sessionToken.options,
    maxAge: 0
  });
  ctx.setCookie(ctx.context.authCookies.sessionData.name, "", {
    ...ctx.context.authCookies.sessionData.options,
    maxAge: 0
  });
  if (!skipDontRememberMe) {
    ctx.setCookie(ctx.context.authCookies.dontRememberToken.name, "", {
      ...ctx.context.authCookies.dontRememberToken.options,
      maxAge: 0
    });
  }
}
function parseCookies(cookieHeader) {
  const cookies = cookieHeader.split("; ");
  const cookieMap = /* @__PURE__ */ new Map();
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookieMap.set(name, value);
  });
  return cookieMap;
}
const getSessionCookie = (request, config) => {
  if (config?.cookiePrefix) {
    if (config.cookieName) {
      config.cookiePrefix = `${config.cookiePrefix}-`;
    } else {
      config.cookiePrefix = `${config.cookiePrefix}.`;
    }
  }
  const headers = "headers" in request ? request.headers : request;
  const req = request instanceof Request ? request : void 0;
  url.getBaseURL(req?.url, config?.path, req);
  const cookies = headers.get("cookie");
  if (!cookies) {
    return null;
  }
  const { cookieName = "session_token", cookiePrefix = "better-auth." } = config || {};
  const name = `${cookiePrefix}${cookieName}`;
  const secureCookieName = `__Secure-${name}`;
  const parsedCookie = parseCookies(cookies);
  const sessionToken = parsedCookie.get(name) || parsedCookie.get(secureCookieName);
  if (sessionToken) {
    return sessionToken;
  }
  return null;
};
const getCookieCache = async (request, config) => {
  const headers = request instanceof Headers ? request : request.headers;
  const cookies = headers.get("cookie");
  if (!cookies) {
    return null;
  }
  const { cookieName = "session_data", cookiePrefix = "better-auth" } = config || {};
  const name = config?.isSecure !== void 0 ? config.isSecure ? `__Secure-${cookiePrefix}.${cookieName}` : `${cookiePrefix}.${cookieName}` : env.isProduction ? `__Secure-${cookiePrefix}.${cookieName}` : `${cookiePrefix}.${cookieName}`;
  const parsedCookie = parseCookies(cookies);
  const sessionData = parsedCookie.get(name);
  if (sessionData) {
    const sessionDataPayload = json.safeJSONParse(binary.binary.decode(base64.base64Url.decode(sessionData)));
    if (!sessionDataPayload) {
      return null;
    }
    const secret = config?.secret || env.env.BETTER_AUTH_SECRET;
    if (!secret) {
      throw new error.BetterAuthError(
        "getCookieCache requires a secret to be provided. Either pass it as an option or set the BETTER_AUTH_SECRET environment variable"
      );
    }
    const isValid = await hmac.createHMAC("SHA-256", "base64urlnopad").verify(
      secret,
      JSON.stringify({
        ...sessionDataPayload.session,
        expiresAt: sessionDataPayload.expiresAt
      }),
      sessionDataPayload.signature
    );
    if (!isValid) {
      return null;
    }
    return sessionDataPayload.session;
  }
  return null;
};

exports.createCookieGetter = createCookieGetter;
exports.deleteSessionCookie = deleteSessionCookie;
exports.getCookieCache = getCookieCache;
exports.getCookies = getCookies;
exports.getSessionCookie = getSessionCookie;
exports.ms = ms;
exports.parseCookies = parseCookies;
exports.setCookieCache = setCookieCache;
exports.setSessionCookie = setSessionCookie;
