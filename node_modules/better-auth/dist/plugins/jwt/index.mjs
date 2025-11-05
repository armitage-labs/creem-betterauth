import { g as getJwtToken, s as signJWT, a as getJwksAdapter, c as createJwk } from '../../shared/better-auth.iy-Q9EM9.mjs';
export { b as generateExportedKeyPair } from '../../shared/better-auth.iy-Q9EM9.mjs';
import { APIError } from 'better-call';
import '../../shared/better-auth.BX9UB8EP.mjs';
import { s as sessionMiddleware } from '../../shared/better-auth.DEBtROF9.mjs';
import * as z from 'zod';
import { createAuthMiddleware, createAuthEndpoint } from '@better-auth/core/middleware';
import { BetterAuthError } from '@better-auth/core/error';
import '@better-auth/core/env';
import '@better-auth/utils/base64';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import '@better-auth/core/db';
import { m as mergeSchema } from '../../shared/better-auth.Cwj9dt6i.mjs';
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
import '../../crypto/index.mjs';
import '@better-auth/utils';
import '../../shared/better-auth.D9_vQR83.mjs';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '../../shared/better-auth.DR3R5wdU.mjs';
import '../../shared/better-auth.Ih8C76Vo.mjs';
import '@better-auth/core/social-providers';
import '../../shared/better-auth.BUPPRXfK.mjs';
import 'defu';
import 'jose/errors';

const schema = {
  jwks: {
    fields: {
      publicKey: {
        type: "string",
        required: true
      },
      privateKey: {
        type: "string",
        required: true
      },
      createdAt: {
        type: "date",
        required: true
      }
    }
  }
};

const jwt = (options) => {
  if (options?.jwt?.sign && !options.jwks?.remoteUrl) {
    throw new BetterAuthError(
      "jwks_config",
      "jwks.remoteUrl must be set when using jwt.sign"
    );
  }
  if (options?.jwks?.remoteUrl && !options.jwks?.keyPairConfig?.alg) {
    throw new BetterAuthError(
      "jwks_config",
      "must specify alg when using the oidc plugin and jwks.remoteUrl"
    );
  }
  return {
    id: "jwt",
    options,
    endpoints: {
      getJwks: createAuthEndpoint(
        "/jwks",
        {
          method: "GET",
          metadata: {
            openapi: {
              description: "Get the JSON Web Key Set",
              responses: {
                "200": {
                  description: "JSON Web Key Set retrieved successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          keys: {
                            type: "array",
                            description: "Array of public JSON Web Keys",
                            items: {
                              type: "object",
                              properties: {
                                kid: {
                                  type: "string",
                                  description: "Key ID uniquely identifying the key, corresponds to the 'id' from the stored Jwk"
                                },
                                kty: {
                                  type: "string",
                                  description: "Key type (e.g., 'RSA', 'EC', 'OKP')"
                                },
                                alg: {
                                  type: "string",
                                  description: "Algorithm intended for use with the key (e.g., 'EdDSA', 'RS256')"
                                },
                                use: {
                                  type: "string",
                                  description: "Intended use of the public key (e.g., 'sig' for signature)",
                                  enum: ["sig"],
                                  nullable: true
                                },
                                n: {
                                  type: "string",
                                  description: "Modulus for RSA keys (base64url-encoded)",
                                  nullable: true
                                },
                                e: {
                                  type: "string",
                                  description: "Exponent for RSA keys (base64url-encoded)",
                                  nullable: true
                                },
                                crv: {
                                  type: "string",
                                  description: "Curve name for elliptic curve keys (e.g., 'Ed25519', 'P-256')",
                                  nullable: true
                                },
                                x: {
                                  type: "string",
                                  description: "X coordinate for elliptic curve keys (base64url-encoded)",
                                  nullable: true
                                },
                                y: {
                                  type: "string",
                                  description: "Y coordinate for elliptic curve keys (base64url-encoded)",
                                  nullable: true
                                }
                              },
                              required: ["kid", "kty", "alg"]
                            }
                          }
                        },
                        required: ["keys"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          if (options?.jwks?.remoteUrl) {
            throw new APIError("NOT_FOUND");
          }
          const adapter = getJwksAdapter(ctx.context.adapter);
          const keySets = await adapter.getAllKeys();
          if (keySets.length === 0) {
            const key = await createJwk(ctx, options);
            keySets.push(key);
          }
          const keyPairConfig = options?.jwks?.keyPairConfig;
          const defaultCrv = keyPairConfig ? "crv" in keyPairConfig ? keyPairConfig.crv : void 0 : void 0;
          return ctx.json({
            keys: keySets.map((keySet) => {
              return {
                alg: keySet.alg ?? options?.jwks?.keyPairConfig?.alg ?? "EdDSA",
                crv: keySet.crv ?? defaultCrv,
                ...JSON.parse(keySet.publicKey),
                kid: keySet.id
              };
            })
          });
        }
      ),
      getToken: createAuthEndpoint(
        "/token",
        {
          method: "GET",
          requireHeaders: true,
          use: [sessionMiddleware],
          metadata: {
            openapi: {
              description: "Get a JWT token",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          token: {
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
          const jwt2 = await getJwtToken(ctx, options);
          return ctx.json({
            token: jwt2
          });
        }
      ),
      signJWT: createAuthEndpoint(
        "/sign-jwt",
        {
          method: "POST",
          metadata: {
            SERVER_ONLY: true,
            $Infer: {
              body: {}
            }
          },
          body: z.object({
            payload: z.record(z.string(), z.any()),
            overrideOptions: z.record(z.string(), z.any()).optional()
          })
        },
        async (c) => {
          const jwt2 = await signJWT(c, {
            options: {
              ...options,
              ...c.body.overrideOptions
            },
            payload: c.body.payload
          });
          return c.json({ token: jwt2 });
        }
      )
    },
    hooks: {
      after: [
        {
          matcher(context) {
            return context.path === "/get-session";
          },
          handler: createAuthMiddleware(async (ctx) => {
            if (options?.disableSettingJwtHeader) {
              return;
            }
            const session = ctx.context.session || ctx.context.newSession;
            if (session && session.session) {
              const jwt2 = await getJwtToken(ctx, options);
              const exposedHeaders = ctx.context.responseHeaders?.get(
                "access-control-expose-headers"
              ) || "";
              const headersSet = new Set(
                exposedHeaders.split(",").map((header) => header.trim()).filter(Boolean)
              );
              headersSet.add("set-auth-jwt");
              ctx.setHeader("set-auth-jwt", jwt2);
              ctx.setHeader(
                "Access-Control-Expose-Headers",
                Array.from(headersSet).join(", ")
              );
            }
          })
        }
      ]
    },
    schema: mergeSchema(schema, options?.schema)
  };
};

export { createJwk, getJwtToken, jwt };
