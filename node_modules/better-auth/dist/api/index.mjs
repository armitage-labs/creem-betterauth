import { APIError, createRouter } from 'better-call';
export { APIError } from 'better-call';
import { c as createEmailVerificationToken, w as wildcardMatch, u as updateUser, t as toAuthEndpoints, a as originCheckMiddleware, e as error, b as ok, f as accountInfo, i as getAccessToken, r as refreshToken, j as unlinkAccount, k as deleteUserCallback, l as listUserAccounts, m as linkSocialAccount, n as requestPasswordResetCallback, q as requestPasswordReset, v as forgetPasswordCallback, x as deleteUser, y as setPassword, z as changePassword, A as changeEmail, B as sendVerificationEmail, C as verifyEmail, D as resetPassword, E as forgetPassword, F as signInEmail, G as signOut, I as callbackOAuth, J as signInSocial } from '../shared/better-auth.BX9UB8EP.mjs';
export { L as isSimpleRequest, o as originCheck, K as sendVerificationEmailFn } from '../shared/better-auth.BX9UB8EP.mjs';
import { l as listSessions, a as getSession, r as revokeOtherSessions, b as revokeSessions, c as revokeSession } from '../shared/better-auth.DEBtROF9.mjs';
export { f as freshSessionMiddleware, g as getSessionFromCtx, d as getSessionQuerySchema, h as requestOnlySessionMiddleware, e as sensitiveSessionMiddleware, s as sessionMiddleware } from '../shared/better-auth.DEBtROF9.mjs';
import * as z from 'zod';
import { createAuthEndpoint } from '@better-auth/core/middleware';
export { createAuthEndpoint, createAuthMiddleware, optionsMiddleware } from '@better-auth/core/middleware';
import { s as setSessionCookie } from '../shared/better-auth.D9_vQR83.mjs';
import { BASE_ERROR_CODES } from '@better-auth/core/error';
import { isDevelopment, logger } from '@better-auth/core/env';
import '@better-auth/core/db';
import { d as parseUserInput } from '../shared/better-auth.Cwj9dt6i.mjs';
import '@better-auth/utils/random';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import '@better-auth/utils/base64';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import '../shared/better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
import { s as safeJSONParse } from '../shared/better-auth.BKEtEpt0.mjs';
import { g as getIp } from '../shared/better-auth.ClH5r3NH.mjs';
import '@better-auth/core/social-providers';
import '../shared/better-auth.CW6D9eSx.mjs';
import '../shared/better-auth.BUPPRXfK.mjs';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import 'defu';
import '../crypto/index.mjs';
import '../shared/better-auth.DR3R5wdU.mjs';
import 'jose/errors';
import '../shared/better-auth.Ih8C76Vo.mjs';

const signUpEmail = () => createAuthEndpoint(
  "/sign-up/email",
  {
    method: "POST",
    body: z.record(z.string(), z.any()),
    metadata: {
      $Infer: {
        body: {}
      },
      openapi: {
        description: "Sign up a user using email and password",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "The name of the user"
                  },
                  email: {
                    type: "string",
                    description: "The email of the user"
                  },
                  password: {
                    type: "string",
                    description: "The password of the user"
                  },
                  image: {
                    type: "string",
                    description: "The profile image URL of the user"
                  },
                  callbackURL: {
                    type: "string",
                    description: "The URL to use for email verification callback"
                  },
                  rememberMe: {
                    type: "boolean",
                    description: "If this is false, the session will not be remembered. Default is `true`."
                  }
                },
                required: ["name", "email", "password"]
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Successfully created user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      nullable: true,
                      description: "Authentication token for the session"
                    },
                    user: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          description: "The unique identifier of the user"
                        },
                        email: {
                          type: "string",
                          format: "email",
                          description: "The email address of the user"
                        },
                        name: {
                          type: "string",
                          description: "The name of the user"
                        },
                        image: {
                          type: "string",
                          format: "uri",
                          nullable: true,
                          description: "The profile image URL of the user"
                        },
                        emailVerified: {
                          type: "boolean",
                          description: "Whether the email has been verified"
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          description: "When the user was created"
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          description: "When the user was last updated"
                        }
                      },
                      required: [
                        "id",
                        "email",
                        "name",
                        "emailVerified",
                        "createdAt",
                        "updatedAt"
                      ]
                    }
                  },
                  required: ["user"]
                  // token is optional
                }
              }
            }
          },
          "422": {
            description: "Unprocessable Entity. User already exists or failed to create user.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string"
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
    if (!ctx.context.options.emailAndPassword?.enabled || ctx.context.options.emailAndPassword?.disableSignUp) {
      throw new APIError("BAD_REQUEST", {
        message: "Email and password sign up is not enabled"
      });
    }
    const body = ctx.body;
    const { name, email, password, image, callbackURL, rememberMe, ...rest } = body;
    const isValidEmail = z.email().safeParse(email);
    if (!isValidEmail.success) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.INVALID_EMAIL
      });
    }
    const minPasswordLength = ctx.context.password.config.minPasswordLength;
    if (password.length < minPasswordLength) {
      ctx.context.logger.error("Password is too short");
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.PASSWORD_TOO_SHORT
      });
    }
    const maxPasswordLength = ctx.context.password.config.maxPasswordLength;
    if (password.length > maxPasswordLength) {
      ctx.context.logger.error("Password is too long");
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.PASSWORD_TOO_LONG
      });
    }
    const dbUser = await ctx.context.internalAdapter.findUserByEmail(email);
    if (dbUser?.user) {
      ctx.context.logger.info(`Sign-up attempt for existing email: ${email}`);
      throw new APIError("UNPROCESSABLE_ENTITY", {
        message: BASE_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL
      });
    }
    const hash = await ctx.context.password.hash(password);
    let createdUser;
    try {
      const data = parseUserInput(ctx.context.options, rest, "create");
      createdUser = await ctx.context.internalAdapter.createUser(
        {
          email: email.toLowerCase(),
          name,
          image,
          ...data,
          emailVerified: false
        },
        ctx
      );
      if (!createdUser) {
        throw new APIError("BAD_REQUEST", {
          message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER
        });
      }
    } catch (e) {
      if (isDevelopment()) {
        ctx.context.logger.error("Failed to create user", e);
      }
      if (e instanceof APIError) {
        throw e;
      }
      ctx.context.logger?.error("Failed to create user", e);
      throw new APIError("UNPROCESSABLE_ENTITY", {
        message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER,
        details: e
      });
    }
    if (!createdUser) {
      throw new APIError("UNPROCESSABLE_ENTITY", {
        message: BASE_ERROR_CODES.FAILED_TO_CREATE_USER
      });
    }
    await ctx.context.internalAdapter.linkAccount(
      {
        userId: createdUser.id,
        providerId: "credential",
        accountId: createdUser.id,
        password: hash
      },
      ctx
    );
    if (ctx.context.options.emailVerification?.sendOnSignUp || ctx.context.options.emailAndPassword.requireEmailVerification) {
      const token = await createEmailVerificationToken(
        ctx.context.secret,
        createdUser.email,
        void 0,
        ctx.context.options.emailVerification?.expiresIn
      );
      const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${body.callbackURL || "/"}`;
      const args = ctx.request ? [
        {
          user: createdUser,
          url,
          token
        },
        ctx.request
      ] : [
        {
          user: createdUser,
          url,
          token
        }
      ];
      await ctx.context.options.emailVerification?.sendVerificationEmail?.(
        ...args
      );
    }
    if (ctx.context.options.emailAndPassword.autoSignIn === false || ctx.context.options.emailAndPassword.requireEmailVerification) {
      return ctx.json({
        token: null,
        user: {
          id: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
          image: createdUser.image,
          emailVerified: createdUser.emailVerified,
          createdAt: createdUser.createdAt,
          updatedAt: createdUser.updatedAt
        }
      });
    }
    const session = await ctx.context.internalAdapter.createSession(
      createdUser.id,
      ctx,
      rememberMe === false
    );
    if (!session) {
      throw new APIError("BAD_REQUEST", {
        message: BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION
      });
    }
    await setSessionCookie(
      ctx,
      {
        session,
        user: createdUser
      },
      rememberMe === false
    );
    return ctx.json({
      token: session.token,
      user: {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        image: createdUser.image,
        emailVerified: createdUser.emailVerified,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt
      }
    });
  }
);

function shouldRateLimit(max, window, rateLimitData) {
  const now = Date.now();
  const windowInMs = window * 1e3;
  const timeSinceLastRequest = now - rateLimitData.lastRequest;
  return timeSinceLastRequest < windowInMs && rateLimitData.count >= max;
}
function rateLimitResponse(retryAfter) {
  return new Response(
    JSON.stringify({
      message: "Too many requests. Please try again later."
    }),
    {
      status: 429,
      statusText: "Too Many Requests",
      headers: {
        "X-Retry-After": retryAfter.toString()
      }
    }
  );
}
function getRetryAfter(lastRequest, window) {
  const now = Date.now();
  const windowInMs = window * 1e3;
  return Math.ceil((lastRequest + windowInMs - now) / 1e3);
}
function createDBStorage(ctx) {
  const model = "rateLimit";
  const db = ctx.adapter;
  return {
    get: async (key) => {
      const res = await db.findMany({
        model,
        where: [{ field: "key", value: key }]
      });
      const data = res[0];
      if (typeof data?.lastRequest === "bigint") {
        data.lastRequest = Number(data.lastRequest);
      }
      return data;
    },
    set: async (key, value, _update) => {
      try {
        if (_update) {
          await db.updateMany({
            model,
            where: [{ field: "key", value: key }],
            update: {
              count: value.count,
              lastRequest: value.lastRequest
            }
          });
        } else {
          await db.create({
            model,
            data: {
              key,
              count: value.count,
              lastRequest: value.lastRequest
            }
          });
        }
      } catch (e) {
        ctx.logger.error("Error setting rate limit", e);
      }
    }
  };
}
const memory = /* @__PURE__ */ new Map();
function getRateLimitStorage(ctx, rateLimitSettings) {
  if (ctx.options.rateLimit?.customStorage) {
    return ctx.options.rateLimit.customStorage;
  }
  const storage = ctx.rateLimit.storage;
  if (storage === "secondary-storage") {
    return {
      get: async (key) => {
        const data = await ctx.options.secondaryStorage?.get(key);
        return data ? safeJSONParse(data) : void 0;
      },
      set: async (key, value, _update) => {
        const ttl = rateLimitSettings?.window ?? ctx.options.rateLimit?.window ?? 10;
        await ctx.options.secondaryStorage?.set?.(
          key,
          JSON.stringify(value),
          ttl
        );
      }
    };
  } else if (storage === "memory") {
    return {
      async get(key) {
        return memory.get(key);
      },
      async set(key, value, _update) {
        memory.set(key, value);
      }
    };
  }
  return createDBStorage(ctx);
}
async function onRequestRateLimit(req, ctx) {
  if (!ctx.rateLimit.enabled) {
    return;
  }
  const path = new URL(req.url).pathname.replace(
    ctx.options.basePath || "/api/auth",
    ""
  );
  let window = ctx.rateLimit.window;
  let max = ctx.rateLimit.max;
  const ip = getIp(req, ctx.options);
  if (!ip) {
    return;
  }
  const key = ip + path;
  const specialRules = getDefaultSpecialRules();
  const specialRule = specialRules.find((rule) => rule.pathMatcher(path));
  if (specialRule) {
    window = specialRule.window;
    max = specialRule.max;
  }
  for (const plugin of ctx.options.plugins || []) {
    if (plugin.rateLimit) {
      const matchedRule = plugin.rateLimit.find(
        (rule) => rule.pathMatcher(path)
      );
      if (matchedRule) {
        window = matchedRule.window;
        max = matchedRule.max;
        break;
      }
    }
  }
  if (ctx.rateLimit.customRules) {
    const _path = Object.keys(ctx.rateLimit.customRules).find((p) => {
      if (p.includes("*")) {
        const isMatch = wildcardMatch(p)(path);
        return isMatch;
      }
      return p === path;
    });
    if (_path) {
      const customRule = ctx.rateLimit.customRules[_path];
      const resolved = typeof customRule === "function" ? await customRule(req) : customRule;
      if (resolved) {
        window = resolved.window;
        max = resolved.max;
      }
      if (resolved === false) {
        return;
      }
    }
  }
  const storage = getRateLimitStorage(ctx, {
    window
  });
  const data = await storage.get(key);
  const now = Date.now();
  if (!data) {
    await storage.set(key, {
      key,
      count: 1,
      lastRequest: now
    });
  } else {
    const timeSinceLastRequest = now - data.lastRequest;
    if (shouldRateLimit(max, window, data)) {
      const retryAfter = getRetryAfter(data.lastRequest, window);
      return rateLimitResponse(retryAfter);
    } else if (timeSinceLastRequest > window * 1e3) {
      await storage.set(
        key,
        {
          ...data,
          count: 1,
          lastRequest: now
        },
        true
      );
    } else {
      await storage.set(
        key,
        {
          ...data,
          count: data.count + 1,
          lastRequest: now
        },
        true
      );
    }
  }
}
function getDefaultSpecialRules() {
  const specialRules = [
    {
      pathMatcher(path) {
        return path.startsWith("/sign-in") || path.startsWith("/sign-up") || path.startsWith("/change-password") || path.startsWith("/change-email");
      },
      window: 10,
      max: 3
    }
  ];
  return specialRules;
}

function checkEndpointConflicts(options, logger2) {
  const endpointRegistry = /* @__PURE__ */ new Map();
  options.plugins?.forEach((plugin) => {
    if (plugin.endpoints) {
      for (const [key, endpoint] of Object.entries(plugin.endpoints)) {
        if (endpoint && "path" in endpoint) {
          const path = endpoint.path;
          let methods = [];
          if (endpoint.options && "method" in endpoint.options) {
            if (Array.isArray(endpoint.options.method)) {
              methods = endpoint.options.method;
            } else if (typeof endpoint.options.method === "string") {
              methods = [endpoint.options.method];
            }
          }
          if (methods.length === 0) {
            methods = ["*"];
          }
          if (!endpointRegistry.has(path)) {
            endpointRegistry.set(path, []);
          }
          endpointRegistry.get(path).push({
            pluginId: plugin.id,
            endpointKey: key,
            methods
          });
        }
      }
    }
  });
  const conflicts = [];
  for (const [path, entries] of endpointRegistry.entries()) {
    if (entries.length > 1) {
      const methodMap = /* @__PURE__ */ new Map();
      let hasConflict = false;
      for (const entry of entries) {
        for (const method of entry.methods) {
          if (!methodMap.has(method)) {
            methodMap.set(method, []);
          }
          methodMap.get(method).push(entry.pluginId);
          if (methodMap.get(method).length > 1) {
            hasConflict = true;
          }
          if (method === "*" && entries.length > 1) {
            hasConflict = true;
          } else if (method !== "*" && methodMap.has("*")) {
            hasConflict = true;
          }
        }
      }
      if (hasConflict) {
        const uniquePlugins = [...new Set(entries.map((e) => e.pluginId))];
        const conflictingMethods = [];
        for (const [method, plugins] of methodMap.entries()) {
          if (plugins.length > 1 || method === "*" && entries.length > 1 || method !== "*" && methodMap.has("*")) {
            conflictingMethods.push(method);
          }
        }
        conflicts.push({
          path,
          plugins: uniquePlugins,
          conflictingMethods
        });
      }
    }
  }
  if (conflicts.length > 0) {
    const conflictMessages = conflicts.map(
      (conflict) => `  - "${conflict.path}" [${conflict.conflictingMethods.join(", ")}] used by plugins: ${conflict.plugins.join(", ")}`
    ).join("\n");
    logger2.error(
      `Endpoint path conflicts detected! Multiple plugins are trying to use the same endpoint paths with conflicting HTTP methods:
${conflictMessages}

To resolve this, you can:
	1. Use only one of the conflicting plugins
	2. Configure the plugins to use different paths (if supported)
	3. Ensure plugins use different HTTP methods for the same path
`
    );
  }
}
function getEndpoints(ctx, options) {
  const pluginEndpoints = options.plugins?.reduce((acc, plugin) => {
    return {
      ...acc,
      ...plugin.endpoints
    };
  }, {}) ?? {};
  const middlewares = options.plugins?.map(
    (plugin) => plugin.middlewares?.map((m) => {
      const middleware = (async (context) => {
        const authContext = await ctx;
        return m.middleware({
          ...context,
          context: {
            ...authContext,
            ...context.context
          }
        });
      });
      middleware.options = m.middleware.options;
      return {
        path: m.path,
        middleware
      };
    })
  ).filter((plugin) => plugin !== void 0).flat() || [];
  const baseEndpoints = {
    signInSocial,
    callbackOAuth,
    getSession: getSession(),
    signOut,
    signUpEmail: signUpEmail(),
    signInEmail,
    forgetPassword,
    resetPassword,
    verifyEmail,
    sendVerificationEmail,
    changeEmail,
    changePassword,
    setPassword,
    updateUser: updateUser(),
    deleteUser,
    forgetPasswordCallback,
    requestPasswordReset,
    requestPasswordResetCallback,
    listSessions: listSessions(),
    revokeSession,
    revokeSessions,
    revokeOtherSessions,
    linkSocialAccount,
    listUserAccounts,
    deleteUserCallback,
    unlinkAccount,
    refreshToken,
    getAccessToken,
    accountInfo
  };
  const endpoints = {
    ...baseEndpoints,
    ...pluginEndpoints,
    ok,
    error
  };
  const api = toAuthEndpoints(endpoints, ctx);
  return {
    api,
    middlewares
  };
}
const router = (ctx, options) => {
  const { api, middlewares } = getEndpoints(ctx, options);
  const basePath = new URL(ctx.baseURL).pathname;
  return createRouter(api, {
    routerContext: ctx,
    openapi: {
      disabled: true
    },
    basePath,
    routerMiddleware: [
      {
        path: "/**",
        middleware: originCheckMiddleware
      },
      ...middlewares
    ],
    async onRequest(req) {
      const disabledPaths = ctx.options.disabledPaths || [];
      const path = new URL(req.url).pathname.replace(basePath, "");
      if (disabledPaths.includes(path)) {
        return new Response("Not Found", { status: 404 });
      }
      for (const plugin of ctx.options.plugins || []) {
        if (plugin.onRequest) {
          const response = await plugin.onRequest(req, ctx);
          if (response && "response" in response) {
            return response.response;
          }
          if (response && "request" in response) {
            const rateLimitResponse = await onRequestRateLimit(
              response.request,
              ctx
            );
            if (rateLimitResponse) {
              return rateLimitResponse;
            }
            return response.request;
          }
        }
      }
      return onRequestRateLimit(req, ctx);
    },
    async onResponse(res) {
      for (const plugin of ctx.options.plugins || []) {
        if (plugin.onResponse) {
          const response = await plugin.onResponse(res, ctx);
          if (response) {
            return response.response;
          }
        }
      }
      return res;
    },
    onError(e) {
      if (e instanceof APIError && e.status === "FOUND") {
        return;
      }
      if (options.onAPIError?.throw) {
        throw e;
      }
      if (options.onAPIError?.onError) {
        options.onAPIError.onError(e, ctx);
        return;
      }
      const optLogLevel = options.logger?.level;
      const log = optLogLevel === "error" || optLogLevel === "warn" || optLogLevel === "debug" ? logger : void 0;
      if (options.logger?.disabled !== true) {
        if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
          if (e.message.includes("no column") || e.message.includes("column") || e.message.includes("relation") || e.message.includes("table") || e.message.includes("does not exist")) {
            ctx.logger?.error(e.message);
            return;
          }
        }
        if (e instanceof APIError) {
          if (e.status === "INTERNAL_SERVER_ERROR") {
            ctx.logger.error(e.status, e);
          }
          log?.error(e.message);
        } else {
          ctx.logger?.error(
            e && typeof e === "object" && "name" in e ? e.name : "",
            e
          );
        }
      }
    }
  });
};

export { accountInfo, callbackOAuth, changeEmail, changePassword, checkEndpointConflicts, createEmailVerificationToken, deleteUser, deleteUserCallback, error, forgetPassword, forgetPasswordCallback, getAccessToken, getEndpoints, getSession, linkSocialAccount, listSessions, listUserAccounts, ok, originCheckMiddleware, refreshToken, requestPasswordReset, requestPasswordResetCallback, resetPassword, revokeOtherSessions, revokeSession, revokeSessions, router, sendVerificationEmail, setPassword, signInEmail, signInSocial, signOut, signUpEmail, unlinkAccount, updateUser, verifyEmail };
