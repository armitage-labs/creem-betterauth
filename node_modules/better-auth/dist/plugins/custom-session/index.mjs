import * as z from 'zod';
import { createAuthEndpoint, createAuthMiddleware } from '@better-auth/core/middleware';
import 'better-call';
import '../../shared/better-auth.BX9UB8EP.mjs';
import { a as getSession } from '../../shared/better-auth.DEBtROF9.mjs';
import '@better-auth/core/error';
import '@better-auth/core/env';
import '@better-auth/utils/base64';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import '@better-auth/core/db';
import '@better-auth/utils/random';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import '../../shared/better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
import { g as getEndpointResponse } from '../../shared/better-auth.DQI8AD7d.mjs';
import '../../shared/better-auth.D9_vQR83.mjs';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '../../shared/better-auth.DR3R5wdU.mjs';
import '../../shared/better-auth.Ih8C76Vo.mjs';
import '@better-auth/core/social-providers';
import '../../shared/better-auth.BUPPRXfK.mjs';
import '../../shared/better-auth.Cwj9dt6i.mjs';
import 'defu';
import '../../crypto/index.mjs';
import 'jose/errors';

const getSessionQuerySchema = z.optional(
  z.object({
    /**
     * If cookie cache is enabled, it will disable the cache
     * and fetch the session from the database
     */
    disableCookieCache: z.boolean().meta({
      description: "Disable cookie cache and fetch session from database"
    }).or(z.string().transform((v) => v === "true")).optional(),
    disableRefresh: z.boolean().meta({
      description: "Disable session refresh. Useful for checking session status, without updating the session"
    }).optional()
  })
);
const customSession = (fn, options, pluginOptions) => {
  return {
    id: "custom-session",
    hooks: {
      after: [
        {
          matcher: (ctx) => ctx.path === "/multi-session/list-device-sessions" && (pluginOptions?.shouldMutateListDeviceSessionsEndpoint ?? false),
          handler: createAuthMiddleware(async (ctx) => {
            const response = await getEndpointResponse(ctx);
            if (!response) return;
            const newResponse = await Promise.all(
              response.map(async (v) => await fn(v, ctx))
            );
            return ctx.json(newResponse);
          })
        }
      ]
    },
    endpoints: {
      getSession: createAuthEndpoint(
        "/get-session",
        {
          method: "GET",
          query: getSessionQuerySchema,
          metadata: {
            CUSTOM_SESSION: true,
            openapi: {
              description: "Get custom session data",
              responses: {
                "200": {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "array",
                        nullable: true,
                        items: {
                          $ref: "#/components/schemas/Session"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          requireHeaders: true
        },
        async (ctx) => {
          const session = await getSession()({
            ...ctx,
            asResponse: false,
            headers: ctx.headers,
            returnHeaders: true
          }).catch((e) => {
            return null;
          });
          if (!session?.response) {
            return ctx.json(null);
          }
          const fnResult = await fn(session.response, ctx);
          const setCookie = session.headers.get("set-cookie");
          if (setCookie) {
            ctx.setHeader("set-cookie", setCookie);
            session.headers.delete("set-cookie");
          }
          session.headers.forEach((value, key) => {
            ctx.setHeader(key, value);
          });
          return ctx.json(fnResult);
        }
      )
    }
  };
};

export { customSession };
