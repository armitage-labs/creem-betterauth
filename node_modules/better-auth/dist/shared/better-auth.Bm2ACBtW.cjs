'use strict';

const api_index = require('../api/index.cjs');
const defu = require('defu');
const crypto_index = require('../crypto/index.cjs');
require('@better-auth/core/db');
const getMigration = require('./better-auth.DhHADHGp.cjs');
const getTables = require('./better-auth.DAHECDyM.cjs');
require('zod');
require('better-call');
const cookies_index = require('./better-auth.CwvSb6A4.cjs');
const env = require('@better-auth/core/env');
const socialProviders = require('@better-auth/core/social-providers');
const id = require('./better-auth.Bg6iw3ig.cjs');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('@better-auth/utils/base64');
require('jose');
require('./better-auth.CYeOI8C-.cjs');
const password = require('./better-auth.CDXNofOe.cjs');
const url = require('./better-auth.Z-JVyRjt.cjs');
const error = require('@better-auth/core/error');
const telemetry = require('@better-auth/telemetry');
require('@better-auth/core/db/adapter');
const kyselyAdapter = require('./better-auth.p4oHeQgF.cjs');

const DEFAULT_SECRET = "better-auth-secret-123456789";

function isPromise(obj) {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
}

const init = async (options) => {
  const adapter = await getMigration.getAdapter(options);
  const plugins = options.plugins || [];
  const internalPlugins = getInternalPlugins(options);
  const logger = env.createLogger(options.logger);
  const baseURL = url.getBaseURL(options.baseURL, options.basePath);
  const secret = options.secret || env.env.BETTER_AUTH_SECRET || env.env.AUTH_SECRET || DEFAULT_SECRET;
  if (secret === DEFAULT_SECRET) {
    if (env.isProduction) {
      logger.error(
        "You are using the default secret. Please set `BETTER_AUTH_SECRET` in your environment variables or pass `secret` in your auth config."
      );
    }
  }
  options = {
    ...options,
    secret,
    baseURL: baseURL ? new URL(baseURL).origin : "",
    basePath: options.basePath || "/api/auth",
    plugins: plugins.concat(internalPlugins)
  };
  api_index.checkEndpointConflicts(options, logger);
  const cookies = cookies_index.getCookies(options);
  const tables = getTables.getAuthTables(options);
  const providers = Object.entries(
    options.socialProviders || {}
  ).map(([key, config]) => {
    if (config == null) {
      return null;
    }
    if (config.enabled === false) {
      return null;
    }
    if (!config.clientId) {
      logger.warn(
        `Social provider ${key} is missing clientId or clientSecret`
      );
    }
    const provider = socialProviders.socialProviders[key](config);
    provider.disableImplicitSignUp = config.disableImplicitSignUp;
    return provider;
  }).filter((x) => x !== null);
  const generateIdFunc = ({ model, size }) => {
    if (typeof options.advanced?.generateId === "function") {
      return options.advanced.generateId({ model, size });
    }
    if (typeof options?.advanced?.database?.generateId === "function") {
      return options.advanced.database.generateId({ model, size });
    }
    return id.generateId(size);
  };
  const { publish } = await telemetry.createTelemetry(options, {
    adapter: adapter.id,
    database: typeof options.database === "function" ? "adapter" : kyselyAdapter.getKyselyDatabaseType(options.database) || "unknown"
  });
  let ctx = {
    appName: options.appName || "Better Auth",
    socialProviders: providers,
    options,
    tables,
    trustedOrigins: getTrustedOrigins(options),
    baseURL: baseURL || "",
    sessionConfig: {
      updateAge: options.session?.updateAge !== void 0 ? options.session.updateAge : 24 * 60 * 60,
      // 24 hours
      expiresIn: options.session?.expiresIn || 60 * 60 * 24 * 7,
      // 7 days
      freshAge: options.session?.freshAge === void 0 ? 60 * 60 * 24 : options.session.freshAge
    },
    secret,
    rateLimit: {
      ...options.rateLimit,
      enabled: options.rateLimit?.enabled ?? env.isProduction,
      window: options.rateLimit?.window || 10,
      max: options.rateLimit?.max || 100,
      storage: options.rateLimit?.storage || (options.secondaryStorage ? "secondary-storage" : "memory")
    },
    authCookies: cookies,
    logger,
    generateId: generateIdFunc,
    session: null,
    secondaryStorage: options.secondaryStorage,
    password: {
      hash: options.emailAndPassword?.password?.hash || crypto_index.hashPassword,
      verify: options.emailAndPassword?.password?.verify || crypto_index.verifyPassword,
      config: {
        minPasswordLength: options.emailAndPassword?.minPasswordLength || 8,
        maxPasswordLength: options.emailAndPassword?.maxPasswordLength || 128
      },
      checkPassword: password.checkPassword
    },
    setNewSession(session) {
      this.newSession = session;
    },
    newSession: null,
    adapter,
    internalAdapter: getMigration.createInternalAdapter(adapter, {
      options,
      logger,
      hooks: options.databaseHooks ? [options.databaseHooks] : []}),
    createAuthCookie: cookies_index.createCookieGetter(options),
    async runMigrations() {
      if (!options.database || "updateMany" in options.database) {
        throw new error.BetterAuthError(
          "Database is not provided or it's an adapter. Migrations are only supported with a database instance."
        );
      }
      const { runMigrations } = await getMigration.getMigrations(options);
      await runMigrations();
    },
    publishTelemetry: publish,
    skipCSRFCheck: !!options.advanced?.disableCSRFCheck,
    skipOriginCheck: options.advanced?.disableOriginCheck !== void 0 ? options.advanced.disableOriginCheck : env.isTest() ? true : false
  };
  const initOrPromise = runPluginInit(ctx);
  let context;
  if (isPromise(initOrPromise)) {
    ({ context } = await initOrPromise);
  } else {
    ({ context } = initOrPromise);
  }
  return context;
};
async function runPluginInit(ctx) {
  let options = ctx.options;
  const plugins = options.plugins || [];
  let context = ctx;
  const dbHooks = [];
  for (const plugin of plugins) {
    if (plugin.init) {
      let initPromise = plugin.init(context);
      let result;
      if (isPromise(initPromise)) {
        result = await initPromise;
      } else {
        result = initPromise;
      }
      if (typeof result === "object") {
        if (result.options) {
          const { databaseHooks, ...restOpts } = result.options;
          if (databaseHooks) {
            dbHooks.push(databaseHooks);
          }
          options = defu.defu(options, restOpts);
        }
        if (result.context) {
          context = {
            ...context,
            ...result.context
          };
        }
      }
    }
  }
  dbHooks.push(options.databaseHooks);
  context.internalAdapter = getMigration.createInternalAdapter(ctx.adapter, {
    options,
    logger: ctx.logger,
    hooks: dbHooks.filter((u) => u !== void 0),
    generateId: ctx.generateId
  });
  context.options = options;
  return { context };
}
function getInternalPlugins(options) {
  const plugins = [];
  if (options.advanced?.crossSubDomainCookies?.enabled) ;
  return plugins;
}
function getTrustedOrigins(options) {
  const baseURL = url.getBaseURL(options.baseURL, options.basePath);
  if (!baseURL) {
    return [];
  }
  const trustedOrigins = [new URL(baseURL).origin];
  if (options.trustedOrigins && Array.isArray(options.trustedOrigins)) {
    trustedOrigins.push(...options.trustedOrigins);
  }
  const envTrustedOrigins = env.env.BETTER_AUTH_TRUSTED_ORIGINS;
  if (envTrustedOrigins) {
    trustedOrigins.push(...envTrustedOrigins.split(","));
  }
  if (trustedOrigins.filter((x) => !x).length) {
    throw new error.BetterAuthError(
      "A provided trusted origin is invalid, make sure your trusted origins list is properly defined."
    );
  }
  return trustedOrigins;
}

const betterAuth = (options) => {
  const authContext = init(options);
  const { api } = api_index.getEndpoints(authContext, options);
  const errorCodes = options.plugins?.reduce((acc, plugin) => {
    if (plugin.$ERROR_CODES) {
      return {
        ...acc,
        ...plugin.$ERROR_CODES
      };
    }
    return acc;
  }, {});
  return {
    handler: async (request) => {
      const ctx = await authContext;
      const basePath = ctx.options.basePath || "/api/auth";
      if (!ctx.options.baseURL) {
        const baseURL = url.getBaseURL(void 0, basePath, request);
        if (baseURL) {
          ctx.baseURL = baseURL;
          ctx.options.baseURL = url.getOrigin(ctx.baseURL) || void 0;
        } else {
          throw new error.BetterAuthError(
            "Could not get base URL from request. Please provide a valid base URL."
          );
        }
      }
      ctx.trustedOrigins = [
        ...options.trustedOrigins ? Array.isArray(options.trustedOrigins) ? options.trustedOrigins : await options.trustedOrigins(request) : [],
        ctx.options.baseURL
      ];
      const { handler } = api_index.router(ctx, options);
      return handler(request);
    },
    api,
    options,
    $context: authContext,
    $Infer: {},
    $ERROR_CODES: {
      ...errorCodes,
      ...error.BASE_ERROR_CODES
    }
  };
};

exports.betterAuth = betterAuth;
