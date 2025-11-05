import * as z from 'zod';
import { APIError } from 'better-call';
import { createAuthEndpoint, createAuthMiddleware } from '@better-auth/core/middleware';
import './better-auth.BX9UB8EP.mjs';
import { g as getSessionFromCtx, s as sessionMiddleware } from './better-auth.DEBtROF9.mjs';
import '@better-auth/core/error';
import '@better-auth/core/env';
import { base64Url } from '@better-auth/utils/base64';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import '@better-auth/core/db';
import '@better-auth/utils/random';
import { createHash } from '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import { g as generateRandomString } from './better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
import './better-auth.BIQhnWWW.mjs';
import './better-auth.DevHHPLH.mjs';
import '@better-auth/utils/otp';
import './better-auth.CP1SBr-a.mjs';
import './better-auth.C4MGirLD.mjs';
import './better-auth.CP-SWMbr.mjs';
import '@better-fetch/fetch';
import '@better-auth/core/oauth2';
import '@better-auth/utils';
import '../plugins/custom-session/index.mjs';
import './better-auth.cK9aJBRe.mjs';
import { g as getDate } from './better-auth.CW6D9eSx.mjs';
import { m as mergeSchema } from './better-auth.Cwj9dt6i.mjs';
import { g as getIp } from './better-auth.ClH5r3NH.mjs';
import { p as parseJSON } from './better-auth.msGOU0m9.mjs';
import { s as safeJSONParse } from './better-auth.BKEtEpt0.mjs';
import { r as role } from './better-auth.BLxPPg5G.mjs';
import '@noble/hashes/sha3.js';
import '../plugins/device-authorization/index.mjs';

const apiKeySchema = ({
  timeWindow,
  rateLimitMax
}) => ({
  apikey: {
    fields: {
      /**
       * The name of the key.
       */
      name: {
        type: "string",
        required: false,
        input: false
      },
      /**
       * Shows the first few characters of the API key
       * This allows you to show those few characters in the UI to make it easier for users to identify the API key.
       */
      start: {
        type: "string",
        required: false,
        input: false
      },
      /**
       * The prefix of the key.
       */
      prefix: {
        type: "string",
        required: false,
        input: false
      },
      /**
       * The hashed key value.
       */
      key: {
        type: "string",
        required: true,
        input: false
      },
      /**
       * The user id of the user who created the key.
       */
      userId: {
        type: "string",
        references: { model: "user", field: "id", onDelete: "cascade" },
        required: true,
        input: false
      },
      /**
       * The interval to refill the key in milliseconds.
       */
      refillInterval: {
        type: "number",
        required: false,
        input: false
      },
      /**
       * The amount to refill the remaining count of the key.
       */
      refillAmount: {
        type: "number",
        required: false,
        input: false
      },
      /**
       * The date and time when the key was last refilled.
       */
      lastRefillAt: {
        type: "date",
        required: false,
        input: false
      },
      /**
       * Whether the key is enabled.
       */
      enabled: {
        type: "boolean",
        required: false,
        input: false,
        defaultValue: true
      },
      /**
       * Whether the key has rate limiting enabled.
       */
      rateLimitEnabled: {
        type: "boolean",
        required: false,
        input: false,
        defaultValue: true
      },
      /**
       * The time window in milliseconds for the rate limit.
       */
      rateLimitTimeWindow: {
        type: "number",
        required: false,
        input: false,
        defaultValue: timeWindow
      },
      /**
       * The maximum number of requests allowed within the `rateLimitTimeWindow`.
       */
      rateLimitMax: {
        type: "number",
        required: false,
        input: false,
        defaultValue: rateLimitMax
      },
      /**
       * The number of requests made within the rate limit time window
       */
      requestCount: {
        type: "number",
        required: false,
        input: false,
        defaultValue: 0
      },
      /**
       * The remaining number of requests before the key is revoked.
       *
       * If this is null, then the key is not revoked.
       *
       * If `refillInterval` & `refillAmount` are provided, than this will refill accordingly.
       */
      remaining: {
        type: "number",
        required: false,
        input: false
      },
      /**
       * The date and time of the last request made to the key.
       */
      lastRequest: {
        type: "date",
        required: false,
        input: false
      },
      /**
       * The date and time when the key will expire.
       */
      expiresAt: {
        type: "date",
        required: false,
        input: false
      },
      /**
       * The date and time when the key was created.
       */
      createdAt: {
        type: "date",
        required: true,
        input: false
      },
      /**
       * The date and time when the key was last updated.
       */
      updatedAt: {
        type: "date",
        required: true,
        input: false
      },
      /**
       * The permissions of the key.
       */
      permissions: {
        type: "string",
        required: false,
        input: false
      },
      /**
       * Any additional metadata you want to store with the key.
       */
      metadata: {
        type: "string",
        required: false,
        input: true,
        transform: {
          input(value) {
            return JSON.stringify(value);
          },
          output(value) {
            if (!value) return null;
            return parseJSON(value);
          }
        }
      }
    }
  }
});

function createApiKey({
  keyGenerator,
  opts,
  schema,
  deleteAllExpiredApiKeys
}) {
  return createAuthEndpoint(
    "/api-key/create",
    {
      method: "POST",
      body: z.object({
        name: z.string().meta({ description: "Name of the Api Key" }).optional(),
        expiresIn: z.number().meta({
          description: "Expiration time of the Api Key in seconds"
        }).min(1).optional().nullable().default(null),
        userId: z.coerce.string().meta({
          description: 'User Id of the user that the Api Key belongs to. server-only. Eg: "user-id"'
        }).optional(),
        prefix: z.string().meta({ description: "Prefix of the Api Key" }).regex(/^[a-zA-Z0-9_-]+$/, {
          message: "Invalid prefix format, must be alphanumeric and contain only underscores and hyphens."
        }).optional(),
        remaining: z.number().meta({
          description: "Remaining number of requests. Server side only"
        }).min(0).optional().nullable().default(null),
        metadata: z.any().optional(),
        refillAmount: z.number().meta({
          description: "Amount to refill the remaining count of the Api Key. server-only. Eg: 100"
        }).min(1).optional(),
        refillInterval: z.number().meta({
          description: "Interval to refill the Api Key in milliseconds. server-only. Eg: 1000"
        }).optional(),
        rateLimitTimeWindow: z.number().meta({
          description: "The duration in milliseconds where each request is counted. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 1000"
        }).optional(),
        rateLimitMax: z.number().meta({
          description: "Maximum amount of requests allowed within a window. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 100"
        }).optional(),
        rateLimitEnabled: z.boolean().meta({
          description: "Whether the key has rate limiting enabled. server-only. Eg: true"
        }).optional(),
        permissions: z.record(z.string(), z.array(z.string())).meta({
          description: "Permissions of the Api Key."
        }).optional()
      }),
      metadata: {
        openapi: {
          description: "Create a new API key for a user",
          responses: {
            "200": {
              description: "API key created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "Unique identifier of the API key"
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
                      },
                      name: {
                        type: "string",
                        nullable: true,
                        description: "Name of the API key"
                      },
                      prefix: {
                        type: "string",
                        nullable: true,
                        description: "Prefix of the API key"
                      },
                      start: {
                        type: "string",
                        nullable: true,
                        description: "Starting characters of the key (if configured)"
                      },
                      key: {
                        type: "string",
                        description: "The full API key (only returned on creation)"
                      },
                      enabled: {
                        type: "boolean",
                        description: "Whether the key is enabled"
                      },
                      expiresAt: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                        description: "Expiration timestamp"
                      },
                      userId: {
                        type: "string",
                        description: "ID of the user owning the key"
                      },
                      lastRefillAt: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                        description: "Last refill timestamp"
                      },
                      lastRequest: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                        description: "Last request timestamp"
                      },
                      metadata: {
                        type: "object",
                        nullable: true,
                        additionalProperties: true,
                        description: "Metadata associated with the key"
                      },
                      rateLimitMax: {
                        type: "number",
                        nullable: true,
                        description: "Maximum requests in time window"
                      },
                      rateLimitTimeWindow: {
                        type: "number",
                        nullable: true,
                        description: "Rate limit time window in milliseconds"
                      },
                      remaining: {
                        type: "number",
                        nullable: true,
                        description: "Remaining requests"
                      },
                      refillAmount: {
                        type: "number",
                        nullable: true,
                        description: "Amount to refill"
                      },
                      refillInterval: {
                        type: "number",
                        nullable: true,
                        description: "Refill interval in milliseconds"
                      },
                      rateLimitEnabled: {
                        type: "boolean",
                        description: "Whether rate limiting is enabled"
                      },
                      requestCount: {
                        type: "number",
                        description: "Current request count in window"
                      },
                      permissions: {
                        type: "object",
                        nullable: true,
                        additionalProperties: {
                          type: "array",
                          items: { type: "string" }
                        },
                        description: "Permissions associated with the key"
                      }
                    },
                    required: [
                      "id",
                      "createdAt",
                      "updatedAt",
                      "key",
                      "enabled",
                      "userId",
                      "rateLimitEnabled",
                      "requestCount"
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
      const {
        name,
        expiresIn,
        prefix,
        remaining,
        metadata,
        refillAmount,
        refillInterval,
        permissions,
        rateLimitMax,
        rateLimitTimeWindow,
        rateLimitEnabled
      } = ctx.body;
      const session = await getSessionFromCtx(ctx);
      const authRequired = ctx.request || ctx.headers;
      const user = authRequired && !session ? null : session?.user || { id: ctx.body.userId };
      if (!user?.id) {
        throw new APIError("UNAUTHORIZED", {
          message: ERROR_CODES.UNAUTHORIZED_SESSION
        });
      }
      if (session && ctx.body.userId && session?.user.id !== ctx.body.userId) {
        throw new APIError("UNAUTHORIZED", {
          message: ERROR_CODES.UNAUTHORIZED_SESSION
        });
      }
      if (authRequired) {
        if (refillAmount !== void 0 || refillInterval !== void 0 || rateLimitMax !== void 0 || rateLimitTimeWindow !== void 0 || rateLimitEnabled !== void 0 || permissions !== void 0 || remaining !== null) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.SERVER_ONLY_PROPERTY
          });
        }
      }
      if (metadata) {
        if (opts.enableMetadata === false) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.METADATA_DISABLED
          });
        }
        if (typeof metadata !== "object") {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.INVALID_METADATA_TYPE
          });
        }
      }
      if (refillAmount && !refillInterval) {
        throw new APIError("BAD_REQUEST", {
          message: ERROR_CODES.REFILL_AMOUNT_AND_INTERVAL_REQUIRED
        });
      }
      if (refillInterval && !refillAmount) {
        throw new APIError("BAD_REQUEST", {
          message: ERROR_CODES.REFILL_INTERVAL_AND_AMOUNT_REQUIRED
        });
      }
      if (expiresIn) {
        if (opts.keyExpiration.disableCustomExpiresTime === true) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.KEY_DISABLED_EXPIRATION
          });
        }
        const expiresIn_in_days = expiresIn / (60 * 60 * 24);
        if (opts.keyExpiration.minExpiresIn > expiresIn_in_days) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.EXPIRES_IN_IS_TOO_SMALL
          });
        } else if (opts.keyExpiration.maxExpiresIn < expiresIn_in_days) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.EXPIRES_IN_IS_TOO_LARGE
          });
        }
      }
      if (prefix) {
        if (prefix.length < opts.minimumPrefixLength) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.INVALID_PREFIX_LENGTH
          });
        }
        if (prefix.length > opts.maximumPrefixLength) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.INVALID_PREFIX_LENGTH
          });
        }
      }
      if (name) {
        if (name.length < opts.minimumNameLength) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.INVALID_NAME_LENGTH
          });
        }
        if (name.length > opts.maximumNameLength) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.INVALID_NAME_LENGTH
          });
        }
      } else if (opts.requireName) {
        throw new APIError("BAD_REQUEST", {
          message: ERROR_CODES.NAME_REQUIRED
        });
      }
      deleteAllExpiredApiKeys(ctx.context);
      const key = await keyGenerator({
        length: opts.defaultKeyLength,
        prefix: prefix || opts.defaultPrefix
      });
      const hashed = opts.disableKeyHashing ? key : await defaultKeyHasher(key);
      let start = null;
      if (opts.startingCharactersConfig.shouldStore) {
        start = key.substring(
          0,
          opts.startingCharactersConfig.charactersLength
        );
      }
      const defaultPermissions = opts.permissions?.defaultPermissions ? typeof opts.permissions.defaultPermissions === "function" ? await opts.permissions.defaultPermissions(user.id, ctx) : opts.permissions.defaultPermissions : void 0;
      const permissionsToApply = permissions ? JSON.stringify(permissions) : defaultPermissions ? JSON.stringify(defaultPermissions) : void 0;
      let data = {
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        name: name ?? null,
        prefix: prefix ?? opts.defaultPrefix ?? null,
        start,
        key: hashed,
        enabled: true,
        expiresAt: expiresIn ? getDate(expiresIn, "sec") : opts.keyExpiration.defaultExpiresIn ? getDate(opts.keyExpiration.defaultExpiresIn, "sec") : null,
        userId: user.id,
        lastRefillAt: null,
        lastRequest: null,
        metadata: null,
        rateLimitMax: rateLimitMax ?? opts.rateLimit.maxRequests ?? null,
        rateLimitTimeWindow: rateLimitTimeWindow ?? opts.rateLimit.timeWindow ?? null,
        remaining: remaining === null ? remaining : remaining ?? refillAmount ?? null,
        refillAmount: refillAmount ?? null,
        refillInterval: refillInterval ?? null,
        rateLimitEnabled: rateLimitEnabled === void 0 ? opts.rateLimit.enabled ?? true : rateLimitEnabled,
        requestCount: 0,
        //@ts-expect-error - we intentionally save the permissions as string on DB.
        permissions: permissionsToApply
      };
      if (metadata) {
        data.metadata = schema.apikey.fields.metadata.transform.input(metadata);
      }
      const apiKey = await ctx.context.adapter.create({
        model: API_KEY_TABLE_NAME,
        data
      });
      return ctx.json({
        ...apiKey,
        key,
        metadata: metadata ?? null,
        permissions: apiKey.permissions ? safeJSONParse(apiKey.permissions) : null
      });
    }
  );
}

function deleteApiKey({
  opts,
  schema,
  deleteAllExpiredApiKeys
}) {
  return createAuthEndpoint(
    "/api-key/delete",
    {
      method: "POST",
      body: z.object({
        keyId: z.string().meta({
          description: "The id of the Api Key"
        })
      }),
      use: [sessionMiddleware],
      metadata: {
        openapi: {
          description: "Delete an existing API key",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    keyId: {
                      type: "string",
                      description: "The id of the API key to delete"
                    }
                  },
                  required: ["keyId"]
                }
              }
            }
          },
          responses: {
            "200": {
              description: "API key deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: {
                        type: "boolean",
                        description: "Indicates if the API key was successfully deleted"
                      }
                    },
                    required: ["success"]
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      const { keyId } = ctx.body;
      const session = ctx.context.session;
      if (session.user.banned === true) {
        throw new APIError("UNAUTHORIZED", {
          message: ERROR_CODES.USER_BANNED
        });
      }
      const apiKey = await ctx.context.adapter.findOne({
        model: API_KEY_TABLE_NAME,
        where: [
          {
            field: "id",
            value: keyId
          }
        ]
      });
      if (!apiKey || apiKey.userId !== session.user.id) {
        throw new APIError("NOT_FOUND", {
          message: ERROR_CODES.KEY_NOT_FOUND
        });
      }
      try {
        await ctx.context.adapter.delete({
          model: API_KEY_TABLE_NAME,
          where: [
            {
              field: "id",
              value: apiKey.id
            }
          ]
        });
      } catch (error) {
        throw new APIError("INTERNAL_SERVER_ERROR", {
          message: error?.message
        });
      }
      deleteAllExpiredApiKeys(ctx.context);
      return ctx.json({
        success: true
      });
    }
  );
}

function getApiKey({
  opts,
  schema,
  deleteAllExpiredApiKeys
}) {
  return createAuthEndpoint(
    "/api-key/get",
    {
      method: "GET",
      query: z.object({
        id: z.string().meta({
          description: "The id of the Api Key"
        })
      }),
      use: [sessionMiddleware],
      metadata: {
        openapi: {
          description: "Retrieve an existing API key by ID",
          responses: {
            "200": {
              description: "API key retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "ID"
                      },
                      name: {
                        type: "string",
                        nullable: true,
                        description: "The name of the key"
                      },
                      start: {
                        type: "string",
                        nullable: true,
                        description: "Shows the first few characters of the API key, including the prefix. This allows you to show those few characters in the UI to make it easier for users to identify the API key."
                      },
                      prefix: {
                        type: "string",
                        nullable: true,
                        description: "The API Key prefix. Stored as plain text."
                      },
                      userId: {
                        type: "string",
                        description: "The owner of the user id"
                      },
                      refillInterval: {
                        type: "number",
                        nullable: true,
                        description: "The interval in milliseconds between refills of the `remaining` count. Example: 3600000 // refill every hour (3600000ms = 1h)"
                      },
                      refillAmount: {
                        type: "number",
                        nullable: true,
                        description: "The amount to refill"
                      },
                      lastRefillAt: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                        description: "The last refill date"
                      },
                      enabled: {
                        type: "boolean",
                        description: "Sets if key is enabled or disabled",
                        default: true
                      },
                      rateLimitEnabled: {
                        type: "boolean",
                        description: "Whether the key has rate limiting enabled"
                      },
                      rateLimitTimeWindow: {
                        type: "number",
                        nullable: true,
                        description: "The duration in milliseconds"
                      },
                      rateLimitMax: {
                        type: "number",
                        nullable: true,
                        description: "Maximum amount of requests allowed within a window"
                      },
                      requestCount: {
                        type: "number",
                        description: "The number of requests made within the rate limit time window"
                      },
                      remaining: {
                        type: "number",
                        nullable: true,
                        description: "Remaining requests (every time api key is used this should updated and should be updated on refill as well)"
                      },
                      lastRequest: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                        description: "When last request occurred"
                      },
                      expiresAt: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                        description: "Expiry date of a key"
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        description: "created at"
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        description: "updated at"
                      },
                      metadata: {
                        type: "object",
                        nullable: true,
                        additionalProperties: true,
                        description: "Extra metadata about the apiKey"
                      },
                      permissions: {
                        type: "string",
                        nullable: true,
                        description: "Permissions for the api key (stored as JSON string)"
                      }
                    },
                    required: [
                      "id",
                      "userId",
                      "enabled",
                      "rateLimitEnabled",
                      "requestCount",
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
      const { id } = ctx.query;
      const session = ctx.context.session;
      let apiKey = await ctx.context.adapter.findOne({
        model: API_KEY_TABLE_NAME,
        where: [
          {
            field: "id",
            value: id
          },
          {
            field: "userId",
            value: session.user.id
          }
        ]
      });
      if (!apiKey) {
        throw new APIError("NOT_FOUND", {
          message: ERROR_CODES.KEY_NOT_FOUND
        });
      }
      deleteAllExpiredApiKeys(ctx.context);
      apiKey.metadata = schema.apikey.fields.metadata.transform.output(
        apiKey.metadata
      );
      const { key, ...returningApiKey } = apiKey;
      return ctx.json({
        ...returningApiKey,
        permissions: returningApiKey.permissions ? safeJSONParse(returningApiKey.permissions) : null
      });
    }
  );
}

function updateApiKey({
  opts,
  schema,
  deleteAllExpiredApiKeys
}) {
  return createAuthEndpoint(
    "/api-key/update",
    {
      method: "POST",
      body: z.object({
        keyId: z.string().meta({
          description: "The id of the Api Key"
        }),
        userId: z.coerce.string().meta({
          description: 'The id of the user which the api key belongs to. server-only. Eg: "some-user-id"'
        }).optional(),
        name: z.string().meta({
          description: "The name of the key"
        }).optional(),
        enabled: z.boolean().meta({
          description: "Whether the Api Key is enabled or not"
        }).optional(),
        remaining: z.number().meta({
          description: "The number of remaining requests"
        }).min(1).optional(),
        refillAmount: z.number().meta({
          description: "The refill amount"
        }).optional(),
        refillInterval: z.number().meta({
          description: "The refill interval"
        }).optional(),
        metadata: z.any().optional(),
        expiresIn: z.number().meta({
          description: "Expiration time of the Api Key in seconds"
        }).min(1).optional().nullable(),
        rateLimitEnabled: z.boolean().meta({
          description: "Whether the key has rate limiting enabled."
        }).optional(),
        rateLimitTimeWindow: z.number().meta({
          description: "The duration in milliseconds where each request is counted. server-only. Eg: 1000"
        }).optional(),
        rateLimitMax: z.number().meta({
          description: "Maximum amount of requests allowed within a window. Once the `maxRequests` is reached, the request will be rejected until the `timeWindow` has passed, at which point the `timeWindow` will be reset. server-only. Eg: 100"
        }).optional(),
        permissions: z.record(z.string(), z.array(z.string())).meta({
          description: "Update the permissions on the API Key. server-only."
        }).optional().nullable()
      }),
      metadata: {
        openapi: {
          description: "Update an existing API key by ID",
          responses: {
            "200": {
              description: "API key updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "ID"
                      },
                      name: {
                        type: "string",
                        nullable: true,
                        description: "The name of the key"
                      },
                      start: {
                        type: "string",
                        nullable: true,
                        description: "Shows the first few characters of the API key, including the prefix. This allows you to show those few characters in the UI to make it easier for users to identify the API key."
                      },
                      prefix: {
                        type: "string",
                        nullable: true,
                        description: "The API Key prefix. Stored as plain text."
                      },
                      userId: {
                        type: "string",
                        description: "The owner of the user id"
                      },
                      refillInterval: {
                        type: "number",
                        nullable: true,
                        description: "The interval in milliseconds between refills of the `remaining` count. Example: 3600000 // refill every hour (3600000ms = 1h)"
                      },
                      refillAmount: {
                        type: "number",
                        nullable: true,
                        description: "The amount to refill"
                      },
                      lastRefillAt: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                        description: "The last refill date"
                      },
                      enabled: {
                        type: "boolean",
                        description: "Sets if key is enabled or disabled",
                        default: true
                      },
                      rateLimitEnabled: {
                        type: "boolean",
                        description: "Whether the key has rate limiting enabled"
                      },
                      rateLimitTimeWindow: {
                        type: "number",
                        nullable: true,
                        description: "The duration in milliseconds"
                      },
                      rateLimitMax: {
                        type: "number",
                        nullable: true,
                        description: "Maximum amount of requests allowed within a window"
                      },
                      requestCount: {
                        type: "number",
                        description: "The number of requests made within the rate limit time window"
                      },
                      remaining: {
                        type: "number",
                        nullable: true,
                        description: "Remaining requests (every time api key is used this should updated and should be updated on refill as well)"
                      },
                      lastRequest: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                        description: "When last request occurred"
                      },
                      expiresAt: {
                        type: "string",
                        format: "date-time",
                        nullable: true,
                        description: "Expiry date of a key"
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        description: "created at"
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        description: "updated at"
                      },
                      metadata: {
                        type: "object",
                        nullable: true,
                        additionalProperties: true,
                        description: "Extra metadata about the apiKey"
                      },
                      permissions: {
                        type: "string",
                        nullable: true,
                        description: "Permissions for the api key (stored as JSON string)"
                      }
                    },
                    required: [
                      "id",
                      "userId",
                      "enabled",
                      "rateLimitEnabled",
                      "requestCount",
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
      const {
        keyId,
        expiresIn,
        enabled,
        metadata,
        refillAmount,
        refillInterval,
        remaining,
        name,
        permissions,
        rateLimitEnabled,
        rateLimitTimeWindow,
        rateLimitMax
      } = ctx.body;
      const session = await getSessionFromCtx(ctx);
      const authRequired = (ctx.request || ctx.headers) && !ctx.body.userId;
      const user = session?.user ?? (authRequired ? null : { id: ctx.body.userId });
      if (!user?.id) {
        throw new APIError("UNAUTHORIZED", {
          message: ERROR_CODES.UNAUTHORIZED_SESSION
        });
      }
      if (authRequired) {
        if (refillAmount !== void 0 || refillInterval !== void 0 || rateLimitMax !== void 0 || rateLimitTimeWindow !== void 0 || rateLimitEnabled !== void 0 || remaining !== void 0 || permissions !== void 0) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.SERVER_ONLY_PROPERTY
          });
        }
      }
      const apiKey = await ctx.context.adapter.findOne({
        model: API_KEY_TABLE_NAME,
        where: [
          {
            field: "id",
            value: keyId
          },
          {
            field: "userId",
            value: user.id
          }
        ]
      });
      if (!apiKey) {
        throw new APIError("NOT_FOUND", {
          message: ERROR_CODES.KEY_NOT_FOUND
        });
      }
      let newValues = {};
      if (name !== void 0) {
        if (name.length < opts.minimumNameLength) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.INVALID_NAME_LENGTH
          });
        } else if (name.length > opts.maximumNameLength) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.INVALID_NAME_LENGTH
          });
        }
        newValues.name = name;
      }
      if (enabled !== void 0) {
        newValues.enabled = enabled;
      }
      if (expiresIn !== void 0) {
        if (opts.keyExpiration.disableCustomExpiresTime === true) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.KEY_DISABLED_EXPIRATION
          });
        }
        if (expiresIn !== null) {
          const expiresIn_in_days = expiresIn / (60 * 60 * 24);
          if (expiresIn_in_days < opts.keyExpiration.minExpiresIn) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.EXPIRES_IN_IS_TOO_SMALL
            });
          } else if (expiresIn_in_days > opts.keyExpiration.maxExpiresIn) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.EXPIRES_IN_IS_TOO_LARGE
            });
          }
        }
        newValues.expiresAt = expiresIn ? getDate(expiresIn, "sec") : null;
      }
      if (metadata !== void 0) {
        if (typeof metadata !== "object") {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.INVALID_METADATA_TYPE
          });
        }
        newValues.metadata = schema.apikey.fields.metadata.transform.input(metadata);
      }
      if (remaining !== void 0) {
        newValues.remaining = remaining;
      }
      if (refillAmount !== void 0 || refillInterval !== void 0) {
        if (refillAmount !== void 0 && refillInterval === void 0) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.REFILL_AMOUNT_AND_INTERVAL_REQUIRED
          });
        } else if (refillInterval !== void 0 && refillAmount === void 0) {
          throw new APIError("BAD_REQUEST", {
            message: ERROR_CODES.REFILL_INTERVAL_AND_AMOUNT_REQUIRED
          });
        }
        newValues.refillAmount = refillAmount;
        newValues.refillInterval = refillInterval;
      }
      if (rateLimitEnabled !== void 0) {
        newValues.rateLimitEnabled = rateLimitEnabled;
      }
      if (rateLimitTimeWindow !== void 0) {
        newValues.rateLimitTimeWindow = rateLimitTimeWindow;
      }
      if (rateLimitMax !== void 0) {
        newValues.rateLimitMax = rateLimitMax;
      }
      if (permissions !== void 0) {
        newValues.permissions = JSON.stringify(permissions);
      }
      if (Object.keys(newValues).length === 0) {
        throw new APIError("BAD_REQUEST", {
          message: ERROR_CODES.NO_VALUES_TO_UPDATE
        });
      }
      let newApiKey = apiKey;
      try {
        let result = await ctx.context.adapter.update({
          model: API_KEY_TABLE_NAME,
          where: [
            {
              field: "id",
              value: apiKey.id
            }
          ],
          update: {
            lastRequest: /* @__PURE__ */ new Date(),
            remaining: apiKey.remaining === null ? null : apiKey.remaining - 1,
            ...newValues
          }
        });
        if (result) newApiKey = result;
      } catch (error) {
        throw new APIError("INTERNAL_SERVER_ERROR", {
          message: error?.message
        });
      }
      deleteAllExpiredApiKeys(ctx.context);
      newApiKey.metadata = schema.apikey.fields.metadata.transform.output(
        newApiKey.metadata
      );
      const { key, ...returningApiKey } = newApiKey;
      return ctx.json({
        ...returningApiKey,
        permissions: returningApiKey.permissions ? safeJSONParse(returningApiKey.permissions) : null
      });
    }
  );
}

function isRateLimited(apiKey, opts) {
  const now = /* @__PURE__ */ new Date();
  const lastRequest = apiKey.lastRequest;
  const rateLimitTimeWindow = apiKey.rateLimitTimeWindow;
  const rateLimitMax = apiKey.rateLimitMax;
  let requestCount = apiKey.requestCount;
  if (opts.rateLimit.enabled === false)
    return {
      success: true,
      message: null,
      update: { lastRequest: now },
      tryAgainIn: null
    };
  if (apiKey.rateLimitEnabled === false)
    return {
      success: true,
      message: null,
      update: { lastRequest: now },
      tryAgainIn: null
    };
  if (rateLimitTimeWindow === null || rateLimitMax === null) {
    return {
      success: true,
      message: null,
      update: null,
      tryAgainIn: null
    };
  }
  if (lastRequest === null) {
    return {
      success: true,
      message: null,
      update: { lastRequest: now, requestCount: 1 },
      tryAgainIn: null
    };
  }
  const timeSinceLastRequest = now.getTime() - new Date(lastRequest).getTime();
  if (timeSinceLastRequest > rateLimitTimeWindow) {
    return {
      success: true,
      message: null,
      update: { lastRequest: now, requestCount: 1 },
      tryAgainIn: null
    };
  }
  if (requestCount >= rateLimitMax) {
    return {
      success: false,
      message: ERROR_CODES.RATE_LIMIT_EXCEEDED,
      update: null,
      tryAgainIn: Math.ceil(rateLimitTimeWindow - timeSinceLastRequest)
    };
  }
  requestCount++;
  return {
    success: true,
    message: null,
    tryAgainIn: null,
    update: { lastRequest: now, requestCount }
  };
}

async function validateApiKey({
  hashedKey,
  ctx,
  opts,
  schema,
  permissions
}) {
  const apiKey = await ctx.context.adapter.findOne({
    model: API_KEY_TABLE_NAME,
    where: [
      {
        field: "key",
        value: hashedKey
      }
    ]
  });
  if (!apiKey) {
    throw new APIError("UNAUTHORIZED", {
      message: ERROR_CODES.INVALID_API_KEY
    });
  }
  if (apiKey.enabled === false) {
    throw new APIError("UNAUTHORIZED", {
      message: ERROR_CODES.KEY_DISABLED,
      code: "KEY_DISABLED"
    });
  }
  if (apiKey.expiresAt) {
    const now = (/* @__PURE__ */ new Date()).getTime();
    const expiresAt = new Date(apiKey.expiresAt).getTime();
    if (now > expiresAt) {
      try {
        ctx.context.adapter.delete({
          model: API_KEY_TABLE_NAME,
          where: [
            {
              field: "id",
              value: apiKey.id
            }
          ]
        });
      } catch (error) {
        ctx.context.logger.error(`Failed to delete expired API keys:`, error);
      }
      throw new APIError("UNAUTHORIZED", {
        message: ERROR_CODES.KEY_EXPIRED,
        code: "KEY_EXPIRED"
      });
    }
  }
  if (permissions) {
    const apiKeyPermissions = apiKey.permissions ? safeJSONParse(apiKey.permissions) : null;
    if (!apiKeyPermissions) {
      throw new APIError("UNAUTHORIZED", {
        message: ERROR_CODES.KEY_NOT_FOUND,
        code: "KEY_NOT_FOUND"
      });
    }
    const r = role(apiKeyPermissions);
    const result = r.authorize(permissions);
    if (!result.success) {
      throw new APIError("UNAUTHORIZED", {
        message: ERROR_CODES.KEY_NOT_FOUND,
        code: "KEY_NOT_FOUND"
      });
    }
  }
  let remaining = apiKey.remaining;
  let lastRefillAt = apiKey.lastRefillAt;
  if (apiKey.remaining === 0 && apiKey.refillAmount === null) {
    try {
      ctx.context.adapter.delete({
        model: API_KEY_TABLE_NAME,
        where: [
          {
            field: "id",
            value: apiKey.id
          }
        ]
      });
    } catch (error) {
      ctx.context.logger.error(`Failed to delete expired API keys:`, error);
    }
    throw new APIError("TOO_MANY_REQUESTS", {
      message: ERROR_CODES.USAGE_EXCEEDED,
      code: "USAGE_EXCEEDED"
    });
  } else if (remaining !== null) {
    let now = (/* @__PURE__ */ new Date()).getTime();
    const refillInterval = apiKey.refillInterval;
    const refillAmount = apiKey.refillAmount;
    let lastTime = new Date(lastRefillAt ?? apiKey.createdAt).getTime();
    if (refillInterval && refillAmount) {
      const timeSinceLastRequest = now - lastTime;
      if (timeSinceLastRequest > refillInterval) {
        remaining = refillAmount;
        lastRefillAt = /* @__PURE__ */ new Date();
      }
    }
    if (remaining === 0) {
      throw new APIError("TOO_MANY_REQUESTS", {
        message: ERROR_CODES.USAGE_EXCEEDED,
        code: "USAGE_EXCEEDED"
      });
    } else {
      remaining--;
    }
  }
  const { message, success, update, tryAgainIn } = isRateLimited(apiKey, opts);
  const newApiKey = await ctx.context.adapter.update({
    model: API_KEY_TABLE_NAME,
    where: [
      {
        field: "id",
        value: apiKey.id
      }
    ],
    update: {
      ...update,
      remaining,
      lastRefillAt
    }
  });
  if (!newApiKey) {
    throw new APIError("INTERNAL_SERVER_ERROR", {
      message: ERROR_CODES.FAILED_TO_UPDATE_API_KEY,
      code: "INTERNAL_SERVER_ERROR"
    });
  }
  if (success === false) {
    throw new APIError("UNAUTHORIZED", {
      message: message ?? void 0,
      code: "RATE_LIMITED",
      details: {
        tryAgainIn
      }
    });
  }
  return newApiKey;
}
function verifyApiKey({
  opts,
  schema,
  deleteAllExpiredApiKeys
}) {
  return createAuthEndpoint(
    "/api-key/verify",
    {
      method: "POST",
      body: z.object({
        key: z.string().meta({
          description: "The key to verify"
        }),
        permissions: z.record(z.string(), z.array(z.string())).meta({
          description: "The permissions to verify."
        }).optional()
      }),
      metadata: {
        SERVER_ONLY: true
      }
    },
    async (ctx) => {
      const { key } = ctx.body;
      if (key.length < opts.defaultKeyLength) {
        return ctx.json({
          valid: false,
          error: {
            message: ERROR_CODES.INVALID_API_KEY,
            code: "KEY_NOT_FOUND"
          },
          key: null
        });
      }
      if (opts.customAPIKeyValidator) {
        const isValid = await opts.customAPIKeyValidator({ ctx, key });
        if (!isValid) {
          return ctx.json({
            valid: false,
            error: {
              message: ERROR_CODES.INVALID_API_KEY,
              code: "KEY_NOT_FOUND"
            },
            key: null
          });
        }
      }
      const hashed = opts.disableKeyHashing ? key : await defaultKeyHasher(key);
      let apiKey = null;
      try {
        apiKey = await validateApiKey({
          hashedKey: hashed,
          permissions: ctx.body.permissions,
          ctx,
          opts,
          schema
        });
        await deleteAllExpiredApiKeys(ctx.context);
      } catch (error) {
        if (error instanceof APIError) {
          return ctx.json({
            valid: false,
            error: {
              message: error.body?.message,
              code: error.body?.code
            },
            key: null
          });
        }
        return ctx.json({
          valid: false,
          error: {
            message: ERROR_CODES.INVALID_API_KEY,
            code: "INVALID_API_KEY"
          },
          key: null
        });
      }
      const { key: _, ...returningApiKey } = apiKey ?? {
        key: 1,
        permissions: void 0
      };
      if ("metadata" in returningApiKey) {
        returningApiKey.metadata = schema.apikey.fields.metadata.transform.output(
          returningApiKey.metadata
        );
      }
      returningApiKey.permissions = returningApiKey.permissions ? safeJSONParse(returningApiKey.permissions) : null;
      return ctx.json({
        valid: true,
        error: null,
        key: apiKey === null ? null : returningApiKey
      });
    }
  );
}

function listApiKeys({
  opts,
  schema,
  deleteAllExpiredApiKeys
}) {
  return createAuthEndpoint(
    "/api-key/list",
    {
      method: "GET",
      use: [sessionMiddleware],
      metadata: {
        openapi: {
          description: "List all API keys for the authenticated user",
          responses: {
            "200": {
              description: "API keys retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                          description: "ID"
                        },
                        name: {
                          type: "string",
                          nullable: true,
                          description: "The name of the key"
                        },
                        start: {
                          type: "string",
                          nullable: true,
                          description: "Shows the first few characters of the API key, including the prefix. This allows you to show those few characters in the UI to make it easier for users to identify the API key."
                        },
                        prefix: {
                          type: "string",
                          nullable: true,
                          description: "The API Key prefix. Stored as plain text."
                        },
                        userId: {
                          type: "string",
                          description: "The owner of the user id"
                        },
                        refillInterval: {
                          type: "number",
                          nullable: true,
                          description: "The interval in milliseconds between refills of the `remaining` count. Example: 3600000 // refill every hour (3600000ms = 1h)"
                        },
                        refillAmount: {
                          type: "number",
                          nullable: true,
                          description: "The amount to refill"
                        },
                        lastRefillAt: {
                          type: "string",
                          format: "date-time",
                          nullable: true,
                          description: "The last refill date"
                        },
                        enabled: {
                          type: "boolean",
                          description: "Sets if key is enabled or disabled",
                          default: true
                        },
                        rateLimitEnabled: {
                          type: "boolean",
                          description: "Whether the key has rate limiting enabled"
                        },
                        rateLimitTimeWindow: {
                          type: "number",
                          nullable: true,
                          description: "The duration in milliseconds"
                        },
                        rateLimitMax: {
                          type: "number",
                          nullable: true,
                          description: "Maximum amount of requests allowed within a window"
                        },
                        requestCount: {
                          type: "number",
                          description: "The number of requests made within the rate limit time window"
                        },
                        remaining: {
                          type: "number",
                          nullable: true,
                          description: "Remaining requests (every time api key is used this should updated and should be updated on refill as well)"
                        },
                        lastRequest: {
                          type: "string",
                          format: "date-time",
                          nullable: true,
                          description: "When last request occurred"
                        },
                        expiresAt: {
                          type: "string",
                          format: "date-time",
                          nullable: true,
                          description: "Expiry date of a key"
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          description: "created at"
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          description: "updated at"
                        },
                        metadata: {
                          type: "object",
                          nullable: true,
                          additionalProperties: true,
                          description: "Extra metadata about the apiKey"
                        },
                        permissions: {
                          type: "string",
                          nullable: true,
                          description: "Permissions for the api key (stored as JSON string)"
                        }
                      },
                      required: [
                        "id",
                        "userId",
                        "enabled",
                        "rateLimitEnabled",
                        "requestCount",
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
      }
    },
    async (ctx) => {
      const session = ctx.context.session;
      let apiKeys = await ctx.context.adapter.findMany({
        model: API_KEY_TABLE_NAME,
        where: [
          {
            field: "userId",
            value: session.user.id
          }
        ]
      });
      deleteAllExpiredApiKeys(ctx.context);
      apiKeys = apiKeys.map((apiKey) => {
        return {
          ...apiKey,
          metadata: schema.apikey.fields.metadata.transform.output(
            apiKey.metadata
          )
        };
      });
      let returningApiKey = apiKeys.map((x) => {
        const { key, ...returningApiKey2 } = x;
        return {
          ...returningApiKey2,
          permissions: returningApiKey2.permissions ? safeJSONParse(returningApiKey2.permissions) : null
        };
      });
      return ctx.json(returningApiKey);
    }
  );
}

function deleteAllExpiredApiKeysEndpoint({
  deleteAllExpiredApiKeys
}) {
  return createAuthEndpoint(
    "/api-key/delete-all-expired-api-keys",
    {
      method: "POST",
      metadata: {
        SERVER_ONLY: true,
        client: false
      }
    },
    async (ctx) => {
      try {
        await deleteAllExpiredApiKeys(ctx.context, true);
      } catch (error) {
        ctx.context.logger.error(
          "[API KEY PLUGIN] Failed to delete expired API keys:",
          error
        );
        return ctx.json({
          success: false,
          error
        });
      }
      return ctx.json({ success: true, error: null });
    }
  );
}

let lastChecked = null;
async function deleteAllExpiredApiKeys(ctx, byPassLastCheckTime = false) {
  if (lastChecked && !byPassLastCheckTime) {
    const now = /* @__PURE__ */ new Date();
    const diff = now.getTime() - lastChecked.getTime();
    if (diff < 1e4) {
      return;
    }
  }
  lastChecked = /* @__PURE__ */ new Date();
  await ctx.adapter.deleteMany({
    model: API_KEY_TABLE_NAME,
    where: [
      {
        field: "expiresAt",
        operator: "lt",
        value: /* @__PURE__ */ new Date()
      },
      {
        field: "expiresAt",
        operator: "ne",
        value: null
      }
    ]
  }).catch((error) => {
    ctx.logger.error(`Failed to delete expired API keys:`, error);
  });
}
function createApiKeyRoutes({
  keyGenerator,
  opts,
  schema
}) {
  return {
    createApiKey: createApiKey({
      keyGenerator,
      opts,
      schema,
      deleteAllExpiredApiKeys
    }),
    verifyApiKey: verifyApiKey({ opts, schema, deleteAllExpiredApiKeys }),
    getApiKey: getApiKey({ opts, schema, deleteAllExpiredApiKeys }),
    updateApiKey: updateApiKey({ opts, schema, deleteAllExpiredApiKeys }),
    deleteApiKey: deleteApiKey({ opts, schema, deleteAllExpiredApiKeys }),
    listApiKeys: listApiKeys({ opts, schema, deleteAllExpiredApiKeys }),
    deleteAllExpiredApiKeys: deleteAllExpiredApiKeysEndpoint({
      deleteAllExpiredApiKeys
    })
  };
}

const defaultKeyHasher = async (key) => {
  const hash = await createHash("SHA-256").digest(
    new TextEncoder().encode(key)
  );
  const hashed = base64Url.encode(new Uint8Array(hash), {
    padding: false
  });
  return hashed;
};
const ERROR_CODES = {
  INVALID_METADATA_TYPE: "metadata must be an object or undefined",
  REFILL_AMOUNT_AND_INTERVAL_REQUIRED: "refillAmount is required when refillInterval is provided",
  REFILL_INTERVAL_AND_AMOUNT_REQUIRED: "refillInterval is required when refillAmount is provided",
  USER_BANNED: "User is banned",
  UNAUTHORIZED_SESSION: "Unauthorized or invalid session",
  KEY_NOT_FOUND: "API Key not found",
  KEY_DISABLED: "API Key is disabled",
  KEY_EXPIRED: "API Key has expired",
  USAGE_EXCEEDED: "API Key has reached its usage limit",
  KEY_NOT_RECOVERABLE: "API Key is not recoverable",
  EXPIRES_IN_IS_TOO_SMALL: "The expiresIn is smaller than the predefined minimum value.",
  EXPIRES_IN_IS_TOO_LARGE: "The expiresIn is larger than the predefined maximum value.",
  INVALID_REMAINING: "The remaining count is either too large or too small.",
  INVALID_PREFIX_LENGTH: "The prefix length is either too large or too small.",
  INVALID_NAME_LENGTH: "The name length is either too large or too small.",
  METADATA_DISABLED: "Metadata is disabled.",
  RATE_LIMIT_EXCEEDED: "Rate limit exceeded.",
  NO_VALUES_TO_UPDATE: "No values to update.",
  KEY_DISABLED_EXPIRATION: "Custom key expiration values are disabled.",
  INVALID_API_KEY: "Invalid API key.",
  INVALID_USER_ID_FROM_API_KEY: "The user id from the API key is invalid.",
  INVALID_API_KEY_GETTER_RETURN_TYPE: "API Key getter returned an invalid key type. Expected string.",
  SERVER_ONLY_PROPERTY: "The property you're trying to set can only be set from the server auth instance only.",
  FAILED_TO_UPDATE_API_KEY: "Failed to update API key",
  NAME_REQUIRED: "API Key name is required."
};
const API_KEY_TABLE_NAME = "apikey";
const apiKey = (options) => {
  const opts = {
    ...options,
    apiKeyHeaders: options?.apiKeyHeaders ?? "x-api-key",
    defaultKeyLength: options?.defaultKeyLength || 64,
    maximumPrefixLength: options?.maximumPrefixLength ?? 32,
    minimumPrefixLength: options?.minimumPrefixLength ?? 1,
    maximumNameLength: options?.maximumNameLength ?? 32,
    minimumNameLength: options?.minimumNameLength ?? 1,
    enableMetadata: options?.enableMetadata ?? false,
    disableKeyHashing: options?.disableKeyHashing ?? false,
    requireName: options?.requireName ?? false,
    rateLimit: {
      enabled: options?.rateLimit?.enabled === void 0 ? true : options?.rateLimit?.enabled,
      timeWindow: options?.rateLimit?.timeWindow ?? 1e3 * 60 * 60 * 24,
      maxRequests: options?.rateLimit?.maxRequests ?? 10
    },
    keyExpiration: {
      defaultExpiresIn: options?.keyExpiration?.defaultExpiresIn ?? null,
      disableCustomExpiresTime: options?.keyExpiration?.disableCustomExpiresTime ?? false,
      maxExpiresIn: options?.keyExpiration?.maxExpiresIn ?? 365,
      minExpiresIn: options?.keyExpiration?.minExpiresIn ?? 1
    },
    startingCharactersConfig: {
      shouldStore: options?.startingCharactersConfig?.shouldStore ?? true,
      charactersLength: options?.startingCharactersConfig?.charactersLength ?? 6
    },
    enableSessionForAPIKeys: options?.enableSessionForAPIKeys ?? false
  };
  const schema = mergeSchema(
    apiKeySchema({
      rateLimitMax: opts.rateLimit.maxRequests,
      timeWindow: opts.rateLimit.timeWindow
    }),
    opts.schema
  );
  const getter = opts.customAPIKeyGetter || ((ctx) => {
    if (Array.isArray(opts.apiKeyHeaders)) {
      for (const header of opts.apiKeyHeaders) {
        const value = ctx.headers?.get(header);
        if (value) {
          return value;
        }
      }
    } else {
      return ctx.headers?.get(opts.apiKeyHeaders);
    }
  });
  const keyGenerator = opts.customKeyGenerator || (async (options2) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let apiKey2 = `${options2.prefix || ""}`;
    for (let i = 0; i < options2.length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      apiKey2 += characters[randomIndex];
    }
    return apiKey2;
  });
  const routes = createApiKeyRoutes({ keyGenerator, opts, schema });
  return {
    id: "api-key",
    $ERROR_CODES: ERROR_CODES,
    hooks: {
      before: [
        {
          matcher: (ctx) => !!getter(ctx) && opts.enableSessionForAPIKeys,
          handler: createAuthMiddleware(async (ctx) => {
            const key = getter(ctx);
            if (typeof key !== "string") {
              throw new APIError("BAD_REQUEST", {
                message: ERROR_CODES.INVALID_API_KEY_GETTER_RETURN_TYPE
              });
            }
            if (key.length < opts.defaultKeyLength) {
              throw new APIError("FORBIDDEN", {
                message: ERROR_CODES.INVALID_API_KEY
              });
            }
            if (opts.customAPIKeyValidator) {
              const isValid = await opts.customAPIKeyValidator({ ctx, key });
              if (!isValid) {
                throw new APIError("FORBIDDEN", {
                  message: ERROR_CODES.INVALID_API_KEY
                });
              }
            }
            const hashed = opts.disableKeyHashing ? key : await defaultKeyHasher(key);
            const apiKey2 = await validateApiKey({
              hashedKey: hashed,
              ctx,
              opts,
              schema
            });
            deleteAllExpiredApiKeys(ctx.context).catch((err) => {
              ctx.context.logger.error(
                "Failed to delete expired API keys:",
                err
              );
            });
            const user = await ctx.context.internalAdapter.findUserById(
              apiKey2.userId
            );
            if (!user) {
              throw new APIError("UNAUTHORIZED", {
                message: ERROR_CODES.INVALID_USER_ID_FROM_API_KEY
              });
            }
            const session = {
              user,
              session: {
                id: apiKey2.id,
                token: key,
                userId: apiKey2.userId,
                userAgent: ctx.request?.headers.get("user-agent") ?? null,
                ipAddress: ctx.request ? getIp(ctx.request, ctx.context.options) : null,
                createdAt: /* @__PURE__ */ new Date(),
                updatedAt: /* @__PURE__ */ new Date(),
                expiresAt: apiKey2.expiresAt || getDate(
                  ctx.context.options.session?.expiresIn || 60 * 60 * 24 * 7,
                  // 7 days
                  "ms"
                )
              }
            };
            ctx.context.session = session;
            if (ctx.path === "/get-session") {
              return session;
            } else {
              return {
                context: ctx
              };
            }
          })
        }
      ]
    },
    endpoints: {
      /**
       * ### Endpoint
       *
       * POST `/api-key/create`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.createApiKey`
       *
       * **client:**
       * `authClient.apiKey.create`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-create)
       */
      createApiKey: routes.createApiKey,
      /**
       * ### Endpoint
       *
       * POST `/api-key/verify`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.verifyApiKey`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-verify)
       */
      verifyApiKey: routes.verifyApiKey,
      /**
       * ### Endpoint
       *
       * GET `/api-key/get`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.getApiKey`
       *
       * **client:**
       * `authClient.apiKey.get`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-get)
       */
      getApiKey: routes.getApiKey,
      /**
       * ### Endpoint
       *
       * POST `/api-key/update`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.updateApiKey`
       *
       * **client:**
       * `authClient.apiKey.update`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-update)
       */
      updateApiKey: routes.updateApiKey,
      /**
       * ### Endpoint
       *
       * POST `/api-key/delete`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.deleteApiKey`
       *
       * **client:**
       * `authClient.apiKey.delete`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-delete)
       */
      deleteApiKey: routes.deleteApiKey,
      /**
       * ### Endpoint
       *
       * GET `/api-key/list`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.listApiKeys`
       *
       * **client:**
       * `authClient.apiKey.list`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-list)
       */
      listApiKeys: routes.listApiKeys,
      /**
       * ### Endpoint
       *
       * POST `/api-key/delete-all-expired-api-keys`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.deleteAllExpiredApiKeys`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/api-key#api-method-api-key-delete-all-expired-api-keys)
       */
      deleteAllExpiredApiKeys: routes.deleteAllExpiredApiKeys
    },
    schema
  };
};

const oneTimeToken = (options) => {
  const opts = {
    storeToken: "plain",
    ...options
  };
  async function storeToken(ctx, token) {
    if (opts.storeToken === "hashed") {
      return await defaultKeyHasher(token);
    }
    if (typeof opts.storeToken === "object" && "type" in opts.storeToken && opts.storeToken.type === "custom-hasher") {
      return await opts.storeToken.hash(token);
    }
    return token;
  }
  return {
    id: "one-time-token",
    endpoints: {
      /**
       * ### Endpoint
       *
       * GET `/one-time-token/generate`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.generateOneTimeToken`
       *
       * **client:**
       * `authClient.oneTimeToken.generate`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/one-time-token#api-method-one-time-token-generate)
       */
      generateOneTimeToken: createAuthEndpoint(
        "/one-time-token/generate",
        {
          method: "GET",
          use: [sessionMiddleware]
        },
        async (c) => {
          if (opts?.disableClientRequest && c.request) {
            throw c.error("BAD_REQUEST", {
              message: "Client requests are disabled"
            });
          }
          const session = c.context.session;
          const token = opts?.generateToken ? await opts.generateToken(session, c) : generateRandomString(32);
          const expiresAt = new Date(
            Date.now() + (opts?.expiresIn ?? 3) * 60 * 1e3
          );
          const storedToken = await storeToken(c, token);
          await c.context.internalAdapter.createVerificationValue({
            value: session.session.token,
            identifier: `one-time-token:${storedToken}`,
            expiresAt
          });
          return c.json({ token });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/one-time-token/verify`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.verifyOneTimeToken`
       *
       * **client:**
       * `authClient.oneTimeToken.verify`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/one-time-token#api-method-one-time-token-verify)
       */
      verifyOneTimeToken: createAuthEndpoint(
        "/one-time-token/verify",
        {
          method: "POST",
          body: z.object({
            token: z.string().meta({
              description: 'The token to verify. Eg: "some-token"'
            })
          })
        },
        async (c) => {
          const { token } = c.body;
          const storedToken = await storeToken(c, token);
          const verificationValue = await c.context.internalAdapter.findVerificationValue(
            `one-time-token:${storedToken}`
          );
          if (!verificationValue) {
            throw c.error("BAD_REQUEST", {
              message: "Invalid token"
            });
          }
          await c.context.internalAdapter.deleteVerificationValue(
            verificationValue.id
          );
          if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
            throw c.error("BAD_REQUEST", {
              message: "Token expired"
            });
          }
          const session = await c.context.internalAdapter.findSession(
            verificationValue.value
          );
          if (!session) {
            throw c.error("BAD_REQUEST", {
              message: "Session not found"
            });
          }
          return c.json(session);
        }
      )
    }
  };
};

export { API_KEY_TABLE_NAME as A, ERROR_CODES as E, apiKey as a, defaultKeyHasher as d, oneTimeToken as o };
