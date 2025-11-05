import { verifyAuthenticationResponse, verifyRegistrationResponse, generateAuthenticationOptions, generateRegistrationOptions } from '@simplewebauthn/server';
import { APIError } from 'better-call';
import { g as generateRandomString } from '../../shared/better-auth.B4Qoxdgc.mjs';
import * as z from 'zod';
import { createAuthEndpoint } from '@better-auth/core/middleware';
import '../../shared/better-auth.BX9UB8EP.mjs';
import { s as sessionMiddleware, f as freshSessionMiddleware, g as getSessionFromCtx } from '../../shared/better-auth.DEBtROF9.mjs';
import { s as setSessionCookie } from '../../shared/better-auth.D9_vQR83.mjs';
import '@better-auth/core/error';
import '@better-auth/core/env';
import '@better-auth/core/db';
import { m as mergeSchema } from '../../shared/better-auth.Cwj9dt6i.mjs';
import { g as generateId } from '../../shared/better-auth.BUPPRXfK.mjs';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import { base64 } from '@better-auth/utils/base64';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import 'kysely';
import '@better-auth/core/db/adapter';
import '@better-auth/utils/random';
import '@better-auth/core/social-providers';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import 'defu';
import '../../crypto/index.mjs';
import '../../shared/better-auth.DR3R5wdU.mjs';
import 'jose/errors';
import '../../shared/better-auth.Ih8C76Vo.mjs';

function getRpID(options, baseURL) {
  return options.rpID || (baseURL ? new URL(baseURL).hostname : "localhost");
}
const passkey = (options) => {
  const opts = {
    origin: null,
    ...options,
    advanced: {
      webAuthnChallengeCookie: "better-auth-passkey",
      ...options?.advanced
    }
  };
  const expirationTime = new Date(Date.now() + 1e3 * 60 * 5);
  const currentTime = /* @__PURE__ */ new Date();
  const maxAgeInSeconds = Math.floor(
    (expirationTime.getTime() - currentTime.getTime()) / 1e3
  );
  const ERROR_CODES = {
    CHALLENGE_NOT_FOUND: "Challenge not found",
    YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY: "You are not allowed to register this passkey",
    FAILED_TO_VERIFY_REGISTRATION: "Failed to verify registration",
    PASSKEY_NOT_FOUND: "Passkey not found",
    AUTHENTICATION_FAILED: "Authentication failed",
    UNABLE_TO_CREATE_SESSION: "Unable to create session",
    FAILED_TO_UPDATE_PASSKEY: "Failed to update passkey"
  };
  return {
    id: "passkey",
    endpoints: {
      generatePasskeyRegistrationOptions: createAuthEndpoint(
        "/passkey/generate-register-options",
        {
          method: "GET",
          use: [freshSessionMiddleware],
          query: z.object({
            authenticatorAttachment: z.enum(["platform", "cross-platform"]).optional(),
            name: z.string().optional()
          }).optional(),
          metadata: {
            client: false,
            openapi: {
              description: "Generate registration options for a new passkey",
              responses: {
                200: {
                  description: "Success",
                  parameters: {
                    query: {
                      authenticatorAttachment: {
                        description: `Type of authenticator to use for registration.
                          "platform" for device-specific authenticators,
                          "cross-platform" for authenticators that can be used across devices.`,
                        required: false
                      },
                      name: {
                        description: `Optional custom name for the passkey.
                          This can help identify the passkey when managing multiple credentials.`,
                        required: false
                      }
                    }
                  },
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          challenge: {
                            type: "string"
                          },
                          rp: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string"
                              },
                              id: {
                                type: "string"
                              }
                            }
                          },
                          user: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string"
                              },
                              name: {
                                type: "string"
                              },
                              displayName: {
                                type: "string"
                              }
                            }
                          },
                          pubKeyCredParams: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                type: {
                                  type: "string"
                                },
                                alg: {
                                  type: "number"
                                }
                              }
                            }
                          },
                          timeout: {
                            type: "number"
                          },
                          excludeCredentials: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string"
                                },
                                type: {
                                  type: "string"
                                },
                                transports: {
                                  type: "array",
                                  items: {
                                    type: "string"
                                  }
                                }
                              }
                            }
                          },
                          authenticatorSelection: {
                            type: "object",
                            properties: {
                              authenticatorAttachment: {
                                type: "string"
                              },
                              requireResidentKey: {
                                type: "boolean"
                              },
                              userVerification: {
                                type: "string"
                              }
                            }
                          },
                          attestation: {
                            type: "string"
                          },
                          extensions: {
                            type: "object"
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
          const { session } = ctx.context;
          const userPasskeys = await ctx.context.adapter.findMany({
            model: "passkey",
            where: [
              {
                field: "userId",
                value: session.user.id
              }
            ]
          });
          const userID = new TextEncoder().encode(
            generateRandomString(32, "a-z", "0-9")
          );
          let options2;
          options2 = await generateRegistrationOptions({
            rpName: opts.rpName || ctx.context.appName,
            rpID: getRpID(opts, ctx.context.options.baseURL),
            userID,
            userName: ctx.query?.name || session.user.email || session.user.id,
            userDisplayName: session.user.email || session.user.id,
            attestationType: "none",
            excludeCredentials: userPasskeys.map((passkey2) => ({
              id: passkey2.credentialID,
              transports: passkey2.transports?.split(
                ","
              )
            })),
            authenticatorSelection: {
              residentKey: "preferred",
              userVerification: "preferred",
              ...opts.authenticatorSelection || {},
              ...ctx.query?.authenticatorAttachment ? {
                authenticatorAttachment: ctx.query.authenticatorAttachment
              } : {}
            }
          });
          const id = generateId(32);
          const webAuthnCookie = ctx.context.createAuthCookie(
            opts.advanced.webAuthnChallengeCookie
          );
          await ctx.setSignedCookie(
            webAuthnCookie.name,
            id,
            ctx.context.secret,
            {
              ...webAuthnCookie.attributes,
              maxAge: maxAgeInSeconds
            }
          );
          await ctx.context.internalAdapter.createVerificationValue(
            {
              identifier: id,
              value: JSON.stringify({
                expectedChallenge: options2.challenge,
                userData: {
                  id: session.user.id
                }
              }),
              expiresAt: expirationTime
            },
            ctx
          );
          return ctx.json(options2, {
            status: 200
          });
        }
      ),
      generatePasskeyAuthenticationOptions: createAuthEndpoint(
        "/passkey/generate-authenticate-options",
        {
          method: "POST",
          metadata: {
            openapi: {
              description: "Generate authentication options for a passkey",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          challenge: {
                            type: "string"
                          },
                          rp: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string"
                              },
                              id: {
                                type: "string"
                              }
                            }
                          },
                          user: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string"
                              },
                              name: {
                                type: "string"
                              },
                              displayName: {
                                type: "string"
                              }
                            }
                          },
                          timeout: {
                            type: "number"
                          },
                          allowCredentials: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string"
                                },
                                type: {
                                  type: "string"
                                },
                                transports: {
                                  type: "array",
                                  items: {
                                    type: "string"
                                  }
                                }
                              }
                            }
                          },
                          userVerification: {
                            type: "string"
                          },
                          authenticatorSelection: {
                            type: "object",
                            properties: {
                              authenticatorAttachment: {
                                type: "string"
                              },
                              requireResidentKey: {
                                type: "boolean"
                              },
                              userVerification: {
                                type: "string"
                              }
                            }
                          },
                          extensions: {
                            type: "object"
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
          const session = await getSessionFromCtx(ctx);
          let userPasskeys = [];
          if (session) {
            userPasskeys = await ctx.context.adapter.findMany({
              model: "passkey",
              where: [
                {
                  field: "userId",
                  value: session.user.id
                }
              ]
            });
          }
          const options2 = await generateAuthenticationOptions({
            rpID: getRpID(opts, ctx.context.options.baseURL),
            userVerification: "preferred",
            ...userPasskeys.length ? {
              allowCredentials: userPasskeys.map((passkey2) => ({
                id: passkey2.credentialID,
                transports: passkey2.transports?.split(
                  ","
                )
              }))
            } : {}
          });
          const data = {
            expectedChallenge: options2.challenge,
            userData: {
              id: session?.user.id || ""
            }
          };
          const id = generateId(32);
          const webAuthnCookie = ctx.context.createAuthCookie(
            opts.advanced.webAuthnChallengeCookie
          );
          await ctx.setSignedCookie(
            webAuthnCookie.name,
            id,
            ctx.context.secret,
            {
              ...webAuthnCookie.attributes,
              maxAge: maxAgeInSeconds
            }
          );
          await ctx.context.internalAdapter.createVerificationValue(
            {
              identifier: id,
              value: JSON.stringify(data),
              expiresAt: expirationTime
            },
            ctx
          );
          return ctx.json(options2, {
            status: 200
          });
        }
      ),
      verifyPasskeyRegistration: createAuthEndpoint(
        "/passkey/verify-registration",
        {
          method: "POST",
          body: z.object({
            response: z.any(),
            name: z.string().meta({
              description: "Name of the passkey"
            }).optional()
          }),
          use: [freshSessionMiddleware],
          metadata: {
            openapi: {
              description: "Verify registration of a new passkey",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        $ref: "#/components/schemas/Passkey"
                      }
                    }
                  }
                },
                400: {
                  description: "Bad request"
                }
              }
            }
          }
        },
        async (ctx) => {
          const origin = options?.origin || ctx.headers?.get("origin") || "";
          if (!origin) {
            return ctx.json(null, {
              status: 400
            });
          }
          const resp = ctx.body.response;
          const webAuthnCookie = ctx.context.createAuthCookie(
            opts.advanced.webAuthnChallengeCookie
          );
          const challengeId = await ctx.getSignedCookie(
            webAuthnCookie.name,
            ctx.context.secret
          );
          if (!challengeId) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.CHALLENGE_NOT_FOUND
            });
          }
          const data = await ctx.context.internalAdapter.findVerificationValue(
            challengeId
          );
          if (!data) {
            return ctx.json(null, {
              status: 400
            });
          }
          const { expectedChallenge, userData } = JSON.parse(
            data.value
          );
          if (userData.id !== ctx.context.session.user.id) {
            throw new APIError("UNAUTHORIZED", {
              message: ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY
            });
          }
          try {
            const verification = await verifyRegistrationResponse({
              response: resp,
              expectedChallenge,
              expectedOrigin: origin,
              expectedRPID: getRpID(opts, ctx.context.options.baseURL),
              requireUserVerification: false
            });
            const { verified, registrationInfo } = verification;
            if (!verified || !registrationInfo) {
              return ctx.json(null, {
                status: 400
              });
            }
            const {
              aaguid,
              // credentialID,
              // credentialPublicKey,
              // counter,
              credentialDeviceType,
              credentialBackedUp,
              credential,
              credentialType
            } = registrationInfo;
            const pubKey = base64.encode(credential.publicKey);
            const newPasskey = {
              name: ctx.body.name,
              userId: userData.id,
              credentialID: credential.id,
              publicKey: pubKey,
              counter: credential.counter,
              deviceType: credentialDeviceType,
              transports: resp.response.transports.join(","),
              backedUp: credentialBackedUp,
              createdAt: /* @__PURE__ */ new Date(),
              aaguid
            };
            const newPasskeyRes = await ctx.context.adapter.create({
              model: "passkey",
              data: newPasskey
            });
            return ctx.json(newPasskeyRes, {
              status: 200
            });
          } catch (e) {
            console.log(e);
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: ERROR_CODES.FAILED_TO_VERIFY_REGISTRATION
            });
          }
        }
      ),
      verifyPasskeyAuthentication: createAuthEndpoint(
        "/passkey/verify-authentication",
        {
          method: "POST",
          body: z.object({
            response: z.record(z.any(), z.any())
          }),
          metadata: {
            openapi: {
              description: "Verify authentication of a passkey",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          session: {
                            $ref: "#/components/schemas/Session"
                          },
                          user: {
                            $ref: "#/components/schemas/User"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            $Infer: {
              body: {}
            }
          }
        },
        async (ctx) => {
          const origin = options?.origin || ctx.headers?.get("origin") || "";
          if (!origin) {
            throw new APIError("BAD_REQUEST", {
              message: "origin missing"
            });
          }
          const resp = ctx.body.response;
          const webAuthnCookie = ctx.context.createAuthCookie(
            opts.advanced.webAuthnChallengeCookie
          );
          const challengeId = await ctx.getSignedCookie(
            webAuthnCookie.name,
            ctx.context.secret
          );
          if (!challengeId) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.CHALLENGE_NOT_FOUND
            });
          }
          const data = await ctx.context.internalAdapter.findVerificationValue(
            challengeId
          );
          if (!data) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.CHALLENGE_NOT_FOUND
            });
          }
          const { expectedChallenge } = JSON.parse(
            data.value
          );
          const passkey2 = await ctx.context.adapter.findOne({
            model: "passkey",
            where: [
              {
                field: "credentialID",
                value: resp.id
              }
            ]
          });
          if (!passkey2) {
            throw new APIError("UNAUTHORIZED", {
              message: ERROR_CODES.PASSKEY_NOT_FOUND
            });
          }
          try {
            const verification = await verifyAuthenticationResponse({
              response: resp,
              expectedChallenge,
              expectedOrigin: origin,
              expectedRPID: getRpID(opts, ctx.context.options.baseURL),
              credential: {
                id: passkey2.credentialID,
                publicKey: base64.decode(passkey2.publicKey),
                counter: passkey2.counter,
                transports: passkey2.transports?.split(
                  ","
                )
              },
              requireUserVerification: false
            });
            const { verified } = verification;
            if (!verified)
              throw new APIError("UNAUTHORIZED", {
                message: ERROR_CODES.AUTHENTICATION_FAILED
              });
            await ctx.context.adapter.update({
              model: "passkey",
              where: [
                {
                  field: "id",
                  value: passkey2.id
                }
              ],
              update: {
                counter: verification.authenticationInfo.newCounter
              }
            });
            const s = await ctx.context.internalAdapter.createSession(
              passkey2.userId,
              ctx
            );
            if (!s) {
              throw new APIError("INTERNAL_SERVER_ERROR", {
                message: ERROR_CODES.UNABLE_TO_CREATE_SESSION
              });
            }
            const user = await ctx.context.internalAdapter.findUserById(
              passkey2.userId
            );
            if (!user) {
              throw new APIError("INTERNAL_SERVER_ERROR", {
                message: "User not found"
              });
            }
            await setSessionCookie(ctx, {
              session: s,
              user
            });
            return ctx.json(
              {
                session: s
              },
              {
                status: 200
              }
            );
          } catch (e) {
            ctx.context.logger.error("Failed to verify authentication", e);
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.AUTHENTICATION_FAILED
            });
          }
        }
      ),
      /**
       * ### Endpoint
       *
       * GET `/passkey/list-user-passkeys`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.listPasskeys`
       *
       * **client:**
       * `authClient.passkey.listUserPasskeys`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/passkey#api-method-passkey-list-user-passkeys)
       */
      listPasskeys: createAuthEndpoint(
        "/passkey/list-user-passkeys",
        {
          method: "GET",
          use: [sessionMiddleware],
          metadata: {
            openapi: {
              description: "List all passkeys for the authenticated user",
              responses: {
                "200": {
                  description: "Passkeys retrieved successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/Passkey",
                          required: [
                            "id",
                            "userId",
                            "publicKey",
                            "createdAt",
                            "updatedAt"
                          ]
                        },
                        description: "Array of passkey objects associated with the user"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const passkeys = await ctx.context.adapter.findMany({
            model: "passkey",
            where: [{ field: "userId", value: ctx.context.session.user.id }]
          });
          return ctx.json(passkeys, {
            status: 200
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/passkey/delete-passkey`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.deletePasskey`
       *
       * **client:**
       * `authClient.passkey.deletePasskey`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/passkey#api-method-passkey-delete-passkey)
       */
      deletePasskey: createAuthEndpoint(
        "/passkey/delete-passkey",
        {
          method: "POST",
          body: z.object({
            id: z.string().meta({
              description: 'The ID of the passkey to delete. Eg: "some-passkey-id"'
            })
          }),
          use: [sessionMiddleware],
          metadata: {
            openapi: {
              description: "Delete a specific passkey",
              responses: {
                "200": {
                  description: "Passkey deleted successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: {
                            type: "boolean",
                            description: "Indicates whether the deletion was successful"
                          }
                        },
                        required: ["status"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          await ctx.context.adapter.delete({
            model: "passkey",
            where: [
              {
                field: "id",
                value: ctx.body.id
              }
            ]
          });
          return ctx.json(null, {
            status: 200
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/passkey/update-passkey`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.updatePasskey`
       *
       * **client:**
       * `authClient.passkey.updatePasskey`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/passkey#api-method-passkey-update-passkey)
       */
      updatePasskey: createAuthEndpoint(
        "/passkey/update-passkey",
        {
          method: "POST",
          body: z.object({
            id: z.string().meta({
              description: `The ID of the passkey which will be updated. Eg: "passkey-id"`
            }),
            name: z.string().meta({
              description: `The new name which the passkey will be updated to. Eg: "my-new-passkey-name"`
            })
          }),
          use: [sessionMiddleware],
          metadata: {
            openapi: {
              description: "Update a specific passkey's name",
              responses: {
                "200": {
                  description: "Passkey updated successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          passkey: {
                            $ref: "#/components/schemas/Passkey"
                          }
                        },
                        required: ["passkey"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const passkey2 = await ctx.context.adapter.findOne({
            model: "passkey",
            where: [
              {
                field: "id",
                value: ctx.body.id
              }
            ]
          });
          if (!passkey2) {
            throw new APIError("NOT_FOUND", {
              message: ERROR_CODES.PASSKEY_NOT_FOUND
            });
          }
          if (passkey2.userId !== ctx.context.session.user.id) {
            throw new APIError("UNAUTHORIZED", {
              message: ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY
            });
          }
          const updatedPasskey = await ctx.context.adapter.update({
            model: "passkey",
            where: [
              {
                field: "id",
                value: ctx.body.id
              }
            ],
            update: {
              name: ctx.body.name
            }
          });
          if (!updatedPasskey) {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: ERROR_CODES.FAILED_TO_UPDATE_PASSKEY
            });
          }
          return ctx.json(
            {
              passkey: updatedPasskey
            },
            {
              status: 200
            }
          );
        }
      )
    },
    schema: mergeSchema(schema, options?.schema),
    $ERROR_CODES: ERROR_CODES
  };
};
const schema = {
  passkey: {
    fields: {
      name: {
        type: "string",
        required: false
      },
      publicKey: {
        type: "string",
        required: true
      },
      userId: {
        type: "string",
        references: {
          model: "user",
          field: "id"
        },
        required: true
      },
      credentialID: {
        type: "string",
        required: true
      },
      counter: {
        type: "number",
        required: true
      },
      deviceType: {
        type: "string",
        required: true
      },
      backedUp: {
        type: "boolean",
        required: true
      },
      transports: {
        type: "string",
        required: false
      },
      createdAt: {
        type: "date",
        required: false
      },
      aaguid: {
        type: "string",
        required: false
      }
    }
  }
};

export { passkey };
