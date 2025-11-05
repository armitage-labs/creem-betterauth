'use strict';

const sign = require('../../shared/better-auth.COF45WkB.cjs');
const betterCall = require('better-call');
require('../../shared/better-auth.b10rFcs4.cjs');
const session = require('../../shared/better-auth.BimfmAGe.cjs');
const z = require('zod');
const middleware = require('@better-auth/core/middleware');
const error = require('@better-auth/core/error');
require('@better-auth/core/env');
require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
require('@better-auth/utils/binary');
require('@better-auth/core/db');
const schema$1 = require('../../shared/better-auth.D2XP_nbx.cjs');
require('@better-auth/utils/random');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
require('../../shared/better-auth.CYeOI8C-.cjs');
require('kysely');
require('@better-auth/core/db/adapter');
require('../../crypto/index.cjs');
require('@better-auth/utils');
require('../../shared/better-auth.CwvSb6A4.cjs');
require('../../shared/better-auth.C1hdVENX.cjs');
require('../../shared/better-auth.C7Ar55gj.cjs');
require('../../shared/better-auth.Z-JVyRjt.cjs');
require('../../shared/better-auth.CqgkAe9n.cjs');
require('@better-auth/core/social-providers');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('defu');
require('jose/errors');

function _interopNamespaceCompat(e) {
	if (e && typeof e === 'object' && 'default' in e) return e;
	const n = Object.create(null);
	if (e) {
		for (const k in e) {
			n[k] = e[k];
		}
	}
	n.default = e;
	return n;
}

const z__namespace = /*#__PURE__*/_interopNamespaceCompat(z);

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
    throw new error.BetterAuthError(
      "jwks_config",
      "jwks.remoteUrl must be set when using jwt.sign"
    );
  }
  if (options?.jwks?.remoteUrl && !options.jwks?.keyPairConfig?.alg) {
    throw new error.BetterAuthError(
      "jwks_config",
      "must specify alg when using the oidc plugin and jwks.remoteUrl"
    );
  }
  return {
    id: "jwt",
    options,
    endpoints: {
      getJwks: middleware.createAuthEndpoint(
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
            throw new betterCall.APIError("NOT_FOUND");
          }
          const adapter = sign.getJwksAdapter(ctx.context.adapter);
          const keySets = await adapter.getAllKeys();
          if (keySets.length === 0) {
            const key = await sign.createJwk(ctx, options);
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
      getToken: middleware.createAuthEndpoint(
        "/token",
        {
          method: "GET",
          requireHeaders: true,
          use: [session.sessionMiddleware],
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
          const jwt2 = await sign.getJwtToken(ctx, options);
          return ctx.json({
            token: jwt2
          });
        }
      ),
      signJWT: middleware.createAuthEndpoint(
        "/sign-jwt",
        {
          method: "POST",
          metadata: {
            SERVER_ONLY: true,
            $Infer: {
              body: {}
            }
          },
          body: z__namespace.object({
            payload: z__namespace.record(z__namespace.string(), z__namespace.any()),
            overrideOptions: z__namespace.record(z__namespace.string(), z__namespace.any()).optional()
          })
        },
        async (c) => {
          const jwt2 = await sign.signJWT(c, {
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
          handler: middleware.createAuthMiddleware(async (ctx) => {
            if (options?.disableSettingJwtHeader) {
              return;
            }
            const session = ctx.context.session || ctx.context.newSession;
            if (session && session.session) {
              const jwt2 = await sign.getJwtToken(ctx, options);
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
    schema: schema$1.mergeSchema(schema, options?.schema)
  };
};

exports.createJwk = sign.createJwk;
exports.generateExportedKeyPair = sign.generateExportedKeyPair;
exports.getJwtToken = sign.getJwtToken;
exports.jwt = jwt;
