import * as z from 'zod';
import { APIError } from 'better-call';
import '../../shared/better-auth.BX9UB8EP.mjs';
import '../../shared/better-auth.DEBtROF9.mjs';
import { createAuthEndpoint, createAuthMiddleware } from '@better-auth/core/middleware';
import { s as setSessionCookie } from '../../shared/better-auth.D9_vQR83.mjs';
import '@better-auth/core/error';
import '@better-auth/core/env';
import '@better-auth/core/db';
import { g as getDate } from '../../shared/better-auth.CW6D9eSx.mjs';
import '@better-auth/utils/random';
import { symmetricDecrypt, symmetricEncrypt } from '../../crypto/index.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
import { g as getEndpointResponse } from '../../shared/better-auth.DQI8AD7d.mjs';
import { createHash } from '@better-auth/utils/hash';
import { base64Url } from '@better-auth/utils/base64';
import { g as generateRandomString } from '../../shared/better-auth.B4Qoxdgc.mjs';
import '@better-auth/core/social-providers';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '../../shared/better-auth.BUPPRXfK.mjs';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import '../../shared/better-auth.Cwj9dt6i.mjs';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import 'defu';
import '../../shared/better-auth.DR3R5wdU.mjs';
import 'jose/errors';
import '../../shared/better-auth.Ih8C76Vo.mjs';

const defaultKeyHasher = async (otp) => {
  const hash = await createHash("SHA-256").digest(
    new TextEncoder().encode(otp)
  );
  const hashed = base64Url.encode(new Uint8Array(hash), {
    padding: false
  });
  return hashed;
};
function splitAtLastColon(input) {
  const idx = input.lastIndexOf(":");
  if (idx === -1) {
    return [input, ""];
  }
  return [input.slice(0, idx), input.slice(idx + 1)];
}

const types = ["email-verification", "sign-in", "forget-password"];
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const defaultOTPGenerator = (options) => generateRandomString(options.otpLength ?? 6, "0-9");
const emailOTP = (options) => {
  const opts = {
    expiresIn: 5 * 60,
    generateOTP: () => defaultOTPGenerator(options),
    storeOTP: "plain",
    ...options
  };
  const ERROR_CODES = {
    OTP_EXPIRED: "otp expired",
    INVALID_OTP: "Invalid OTP",
    INVALID_EMAIL: "Invalid email",
    USER_NOT_FOUND: "User not found",
    TOO_MANY_ATTEMPTS: "Too many attempts"
  };
  async function storeOTP(ctx, otp) {
    if (opts.storeOTP === "encrypted") {
      return await symmetricEncrypt({
        key: ctx.context.secret,
        data: otp
      });
    }
    if (opts.storeOTP === "hashed") {
      return await defaultKeyHasher(otp);
    }
    if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) {
      return await opts.storeOTP.hash(otp);
    }
    if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) {
      return await opts.storeOTP.encrypt(otp);
    }
    return otp;
  }
  async function verifyStoredOTP(ctx, storedOtp, otp) {
    if (opts.storeOTP === "encrypted") {
      return await symmetricDecrypt({
        key: ctx.context.secret,
        data: storedOtp
      }) === otp;
    }
    if (opts.storeOTP === "hashed") {
      const hashedOtp = await defaultKeyHasher(otp);
      return hashedOtp === storedOtp;
    }
    if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) {
      const hashedOtp = await opts.storeOTP.hash(otp);
      return hashedOtp === storedOtp;
    }
    if (typeof opts.storeOTP === "object" && "decrypt" in opts.storeOTP) {
      const decryptedOtp = await opts.storeOTP.decrypt(storedOtp);
      return decryptedOtp === otp;
    }
    return otp === storedOtp;
  }
  const endpoints = {
    /**
     * ### Endpoint
     *
     * POST `/email-otp/send-verification-otp`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.sendVerificationOTP`
     *
     * **client:**
     * `authClient.emailOtp.sendVerificationOtp`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-send-verification-otp)
     */
    sendVerificationOTP: createAuthEndpoint(
      "/email-otp/send-verification-otp",
      {
        method: "POST",
        body: z.object({
          email: z.string({}).meta({
            description: "Email address to send the OTP"
          }),
          type: z.enum(types).meta({
            description: "Type of the OTP"
          })
        }),
        metadata: {
          openapi: {
            description: "Send verification OTP",
            responses: {
              200: {
                description: "Success",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        success: {
                          type: "boolean"
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
        if (!options?.sendVerificationOTP) {
          ctx.context.logger.error(
            "send email verification is not implemented"
          );
          throw new APIError("BAD_REQUEST", {
            message: "send email verification is not implemented"
          });
        }
        const email = ctx.body.email;
        if (!emailRegex.test(email)) {
          throw ctx.error("BAD_REQUEST", {
            message: ERROR_CODES.INVALID_EMAIL
          });
        }
        if (opts.disableSignUp) {
          const user = await ctx.context.internalAdapter.findUserByEmail(email);
          if (!user) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.USER_NOT_FOUND
            });
          }
        } else if (ctx.body.type === "forget-password") {
          const user = await ctx.context.internalAdapter.findUserByEmail(email);
          if (!user) {
            return ctx.json({
              success: true
            });
          }
        }
        let otp = opts.generateOTP({ email, type: ctx.body.type }, ctx.request) || defaultOTPGenerator(opts);
        let storedOTP = await storeOTP(ctx, otp);
        await ctx.context.internalAdapter.createVerificationValue(
          {
            value: `${storedOTP}:0`,
            identifier: `${ctx.body.type}-otp-${email}`,
            expiresAt: getDate(opts.expiresIn, "sec")
          },
          ctx
        ).catch(async (error) => {
          await ctx.context.internalAdapter.deleteVerificationByIdentifier(
            `${ctx.body.type}-otp-${email}`
          );
          await ctx.context.internalAdapter.createVerificationValue(
            {
              value: `${storedOTP}:0`,
              identifier: `${ctx.body.type}-otp-${email}`,
              expiresAt: getDate(opts.expiresIn, "sec")
            },
            ctx
          );
        });
        await options.sendVerificationOTP(
          {
            email,
            otp,
            type: ctx.body.type
          },
          ctx.request
        );
        return ctx.json({
          success: true
        });
      }
    )
  };
  return {
    id: "email-otp",
    init(ctx) {
      if (!opts.overrideDefaultEmailVerification) {
        return;
      }
      return {
        options: {
          emailVerification: {
            async sendVerificationEmail(data, request) {
              await endpoints.sendVerificationOTP({
                //@ts-expect-error - we need to pass the context
                context: ctx,
                request,
                body: {
                  email: data.user.email,
                  type: "email-verification"
                },
                ctx
              });
            }
          }
        }
      };
    },
    endpoints: {
      ...endpoints,
      createVerificationOTP: createAuthEndpoint(
        "/email-otp/create-verification-otp",
        {
          method: "POST",
          body: z.object({
            email: z.string({}).meta({
              description: "Email address to send the OTP"
            }),
            type: z.enum(types).meta({
              required: true,
              description: "Type of the OTP"
            })
          }),
          metadata: {
            SERVER_ONLY: true,
            openapi: {
              description: "Create verification OTP",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "string"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const email = ctx.body.email;
          const otp = opts.generateOTP({ email, type: ctx.body.type }, ctx.request) || defaultOTPGenerator(opts);
          let storedOTP = await storeOTP(ctx, otp);
          await ctx.context.internalAdapter.createVerificationValue(
            {
              value: `${storedOTP}:0`,
              identifier: `${ctx.body.type}-otp-${email}`,
              expiresAt: getDate(opts.expiresIn, "sec")
            },
            ctx
          );
          return otp;
        }
      ),
      /**
       * ### Endpoint
       *
       * GET `/email-otp/get-verification-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.getVerificationOTP`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-get-verification-otp)
       */
      getVerificationOTP: createAuthEndpoint(
        "/email-otp/get-verification-otp",
        {
          method: "GET",
          query: z.object({
            email: z.string({}).meta({
              description: "Email address the OTP was sent to"
            }),
            type: z.enum(types).meta({
              required: true,
              description: "Type of the OTP"
            })
          }),
          metadata: {
            SERVER_ONLY: true,
            openapi: {
              description: "Get verification OTP",
              responses: {
                "200": {
                  description: "OTP retrieved successfully or not found/expired",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          otp: {
                            type: "string",
                            nullable: true,
                            description: "The stored OTP, or null if not found or expired"
                          }
                        },
                        required: ["otp"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const email = ctx.query.email;
          const verificationValue = await ctx.context.internalAdapter.findVerificationValue(
            `${ctx.query.type}-otp-${email}`
          );
          if (!verificationValue || verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
            return ctx.json({
              otp: null
            });
          }
          if (opts.storeOTP === "hashed" || typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) {
            throw new APIError("BAD_REQUEST", {
              message: "OTP is hashed, cannot return the plain text OTP"
            });
          }
          let [storedOtp, _attempts] = splitAtLastColon(
            verificationValue.value
          );
          let otp = storedOtp;
          if (opts.storeOTP === "encrypted") {
            otp = await symmetricDecrypt({
              key: ctx.context.secret,
              data: storedOtp
            });
          }
          if (typeof opts.storeOTP === "object" && "decrypt" in opts.storeOTP) {
            otp = await opts.storeOTP.decrypt(storedOtp);
          }
          return ctx.json({
            otp
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * GET `/email-otp/check-verification-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.checkVerificationOTP`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-check-verification-otp)
       */
      checkVerificationOTP: createAuthEndpoint(
        "/email-otp/check-verification-otp",
        {
          method: "POST",
          body: z.object({
            email: z.string().meta({
              description: "Email address the OTP was sent to"
            }),
            type: z.enum(types).meta({
              required: true,
              description: "Type of the OTP"
            }),
            otp: z.string().meta({
              required: true,
              description: "OTP to verify"
            })
          }),
          metadata: {
            openapi: {
              description: "Check if a verification OTP is valid",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          success: {
                            type: "boolean"
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
          const email = ctx.body.email;
          if (!emailRegex.test(email)) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_EMAIL
            });
          }
          const user = await ctx.context.internalAdapter.findUserByEmail(email);
          if (!user) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.USER_NOT_FOUND
            });
          }
          const verificationValue = await ctx.context.internalAdapter.findVerificationValue(
            `${ctx.body.type}-otp-${email}`
          );
          if (!verificationValue) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_OTP
            });
          }
          if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
            await ctx.context.internalAdapter.deleteVerificationValue(
              verificationValue.id
            );
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.OTP_EXPIRED
            });
          }
          const [otpValue, attempts] = splitAtLastColon(
            verificationValue.value
          );
          const allowedAttempts = options?.allowedAttempts || 3;
          if (attempts && parseInt(attempts) >= allowedAttempts) {
            await ctx.context.internalAdapter.deleteVerificationValue(
              verificationValue.id
            );
            throw new APIError("FORBIDDEN", {
              message: ERROR_CODES.TOO_MANY_ATTEMPTS
            });
          }
          const verified = await verifyStoredOTP(ctx, otpValue, ctx.body.otp);
          if (!verified) {
            await ctx.context.internalAdapter.updateVerificationValue(
              verificationValue.id,
              {
                value: `${otpValue}:${parseInt(attempts || "0") + 1}`
              }
            );
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_OTP
            });
          }
          return ctx.json({
            success: true
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/email-otp/verify-email`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.verifyEmailOTP`
       *
       * **client:**
       * `authClient.emailOtp.verifyEmail`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-verify-email)
       */
      verifyEmailOTP: createAuthEndpoint(
        "/email-otp/verify-email",
        {
          method: "POST",
          body: z.object({
            email: z.string({}).meta({
              description: "Email address to verify"
            }),
            otp: z.string().meta({
              required: true,
              description: "OTP to verify"
            })
          }),
          metadata: {
            openapi: {
              description: "Verify email with OTP",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: {
                            type: "boolean",
                            description: "Indicates if the verification was successful",
                            enum: [true]
                          },
                          token: {
                            type: "string",
                            nullable: true,
                            description: "Session token if autoSignInAfterVerification is enabled, otherwise null"
                          },
                          user: {
                            $ref: "#/components/schemas/User"
                          }
                        },
                        required: ["status", "token", "user"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const email = ctx.body.email;
          if (!emailRegex.test(email)) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_EMAIL
            });
          }
          const verificationValue = await ctx.context.internalAdapter.findVerificationValue(
            `email-verification-otp-${email}`
          );
          if (!verificationValue) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_OTP
            });
          }
          if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.OTP_EXPIRED
            });
          }
          const [otpValue, attempts] = splitAtLastColon(
            verificationValue.value
          );
          const allowedAttempts = options?.allowedAttempts || 3;
          if (attempts && parseInt(attempts) >= allowedAttempts) {
            await ctx.context.internalAdapter.deleteVerificationValue(
              verificationValue.id
            );
            throw new APIError("FORBIDDEN", {
              message: ERROR_CODES.TOO_MANY_ATTEMPTS
            });
          }
          const verified = await verifyStoredOTP(ctx, otpValue, ctx.body.otp);
          if (!verified) {
            await ctx.context.internalAdapter.updateVerificationValue(
              verificationValue.id,
              {
                value: `${otpValue}:${parseInt(attempts || "0") + 1}`
              }
            );
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_OTP
            });
          }
          await ctx.context.internalAdapter.deleteVerificationValue(
            verificationValue.id
          );
          const user = await ctx.context.internalAdapter.findUserByEmail(email);
          if (!user) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.USER_NOT_FOUND
            });
          }
          const updatedUser = await ctx.context.internalAdapter.updateUser(
            user.user.id,
            {
              email,
              emailVerified: true
            },
            ctx
          );
          await ctx.context.options.emailVerification?.onEmailVerification?.(
            updatedUser,
            ctx.request
          );
          if (ctx.context.options.emailVerification?.autoSignInAfterVerification) {
            const session = await ctx.context.internalAdapter.createSession(
              updatedUser.id,
              ctx
            );
            await setSessionCookie(ctx, {
              session,
              user: updatedUser
            });
            return ctx.json({
              status: true,
              token: session.token,
              user: {
                id: updatedUser.id,
                email: updatedUser.email,
                emailVerified: updatedUser.emailVerified,
                name: updatedUser.name,
                image: updatedUser.image,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
              }
            });
          }
          return ctx.json({
            status: true,
            token: null,
            user: {
              id: updatedUser.id,
              email: updatedUser.email,
              emailVerified: updatedUser.emailVerified,
              name: updatedUser.name,
              image: updatedUser.image,
              createdAt: updatedUser.createdAt,
              updatedAt: updatedUser.updatedAt
            }
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/sign-in/email-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.signInEmailOTP`
       *
       * **client:**
       * `authClient.signIn.emailOtp`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-sign-in-email-otp)
       */
      signInEmailOTP: createAuthEndpoint(
        "/sign-in/email-otp",
        {
          method: "POST",
          body: z.object({
            email: z.string({}).meta({
              description: "Email address to sign in"
            }),
            otp: z.string().meta({
              required: true,
              description: "OTP sent to the email"
            })
          }),
          metadata: {
            openapi: {
              description: "Sign in with OTP",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          token: {
                            type: "string",
                            description: "Session token for the authenticated session"
                          },
                          user: {
                            $ref: "#/components/schemas/User"
                          }
                        },
                        required: ["token", "user"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const email = ctx.body.email;
          const verificationValue = await ctx.context.internalAdapter.findVerificationValue(
            `sign-in-otp-${email}`
          );
          if (!verificationValue) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_OTP
            });
          }
          if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.OTP_EXPIRED
            });
          }
          const [otpValue, attempts] = splitAtLastColon(
            verificationValue.value
          );
          const allowedAttempts = options?.allowedAttempts || 3;
          if (attempts && parseInt(attempts) >= allowedAttempts) {
            await ctx.context.internalAdapter.deleteVerificationValue(
              verificationValue.id
            );
            throw new APIError("FORBIDDEN", {
              message: ERROR_CODES.TOO_MANY_ATTEMPTS
            });
          }
          const verified = await verifyStoredOTP(ctx, otpValue, ctx.body.otp);
          if (!verified) {
            await ctx.context.internalAdapter.updateVerificationValue(
              verificationValue.id,
              {
                value: `${otpValue}:${parseInt(attempts || "0") + 1}`
              }
            );
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_OTP
            });
          }
          await ctx.context.internalAdapter.deleteVerificationValue(
            verificationValue.id
          );
          const user = await ctx.context.internalAdapter.findUserByEmail(email);
          if (!user) {
            if (opts.disableSignUp) {
              throw new APIError("BAD_REQUEST", {
                message: ERROR_CODES.USER_NOT_FOUND
              });
            }
            const newUser = await ctx.context.internalAdapter.createUser(
              {
                email,
                emailVerified: true,
                name: ""
              },
              ctx
            );
            const session2 = await ctx.context.internalAdapter.createSession(
              newUser.id,
              ctx
            );
            await setSessionCookie(ctx, {
              session: session2,
              user: newUser
            });
            return ctx.json({
              token: session2.token,
              user: {
                id: newUser.id,
                email: newUser.email,
                emailVerified: newUser.emailVerified,
                name: newUser.name,
                image: newUser.image,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
              }
            });
          }
          if (!user.user.emailVerified) {
            await ctx.context.internalAdapter.updateUser(
              user.user.id,
              {
                emailVerified: true
              },
              ctx
            );
          }
          const session = await ctx.context.internalAdapter.createSession(
            user.user.id,
            ctx
          );
          await setSessionCookie(ctx, {
            session,
            user: user.user
          });
          return ctx.json({
            token: session.token,
            user: {
              id: user.user.id,
              email: user.user.email,
              emailVerified: user.user.emailVerified,
              name: user.user.name,
              image: user.user.image,
              createdAt: user.user.createdAt,
              updatedAt: user.user.updatedAt
            }
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/forget-password/email-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.forgetPasswordEmailOTP`
       *
       * **client:**
       * `authClient.forgetPassword.emailOtp`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-forget-password-email-otp)
       */
      forgetPasswordEmailOTP: createAuthEndpoint(
        "/forget-password/email-otp",
        {
          method: "POST",
          body: z.object({
            email: z.string().meta({
              description: "Email address to send the OTP"
            })
          }),
          metadata: {
            openapi: {
              description: "Send a password reset OTP to the user",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          success: {
                            type: "boolean",
                            description: "Indicates if the OTP was sent successfully"
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
          const email = ctx.body.email;
          const user = await ctx.context.internalAdapter.findUserByEmail(email);
          if (!user) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.USER_NOT_FOUND
            });
          }
          const otp = opts.generateOTP({ email, type: "forget-password" }, ctx.request) || defaultOTPGenerator(opts);
          let storedOTP = await storeOTP(ctx, otp);
          await ctx.context.internalAdapter.createVerificationValue(
            {
              value: `${storedOTP}:0`,
              identifier: `forget-password-otp-${email}`,
              expiresAt: getDate(opts.expiresIn, "sec")
            },
            ctx
          );
          await options.sendVerificationOTP(
            {
              email,
              otp,
              type: "forget-password"
            },
            ctx.request
          );
          return ctx.json({
            success: true
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/email-otp/reset-password`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.resetPasswordEmailOTP`
       *
       * **client:**
       * `authClient.emailOtp.resetPassword`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-reset-password)
       */
      resetPasswordEmailOTP: createAuthEndpoint(
        "/email-otp/reset-password",
        {
          method: "POST",
          body: z.object({
            email: z.string().meta({
              description: "Email address to reset the password"
            }),
            otp: z.string().meta({
              description: "OTP sent to the email"
            }),
            password: z.string().meta({
              description: "New password"
            })
          }),
          metadata: {
            openapi: {
              description: "Reset user password with OTP",
              responses: {
                200: {
                  description: "Success",
                  contnt: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          success: {
                            type: "boolean"
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
          const email = ctx.body.email;
          const user = await ctx.context.internalAdapter.findUserByEmail(
            email,
            {
              includeAccounts: true
            }
          );
          if (!user) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.USER_NOT_FOUND
            });
          }
          const verificationValue = await ctx.context.internalAdapter.findVerificationValue(
            `forget-password-otp-${email}`
          );
          if (!verificationValue) {
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_OTP
            });
          }
          if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
            await ctx.context.internalAdapter.deleteVerificationValue(
              verificationValue.id
            );
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.OTP_EXPIRED
            });
          }
          const [otpValue, attempts] = splitAtLastColon(
            verificationValue.value
          );
          const allowedAttempts = options?.allowedAttempts || 3;
          if (attempts && parseInt(attempts) >= allowedAttempts) {
            await ctx.context.internalAdapter.deleteVerificationValue(
              verificationValue.id
            );
            throw new APIError("FORBIDDEN", {
              message: ERROR_CODES.TOO_MANY_ATTEMPTS
            });
          }
          const verified = await verifyStoredOTP(ctx, otpValue, ctx.body.otp);
          if (!verified) {
            await ctx.context.internalAdapter.updateVerificationValue(
              verificationValue.id,
              {
                value: `${otpValue}:${parseInt(attempts || "0") + 1}`
              }
            );
            throw new APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_OTP
            });
          }
          await ctx.context.internalAdapter.deleteVerificationValue(
            verificationValue.id
          );
          const passwordHash = await ctx.context.password.hash(
            ctx.body.password
          );
          const account = user.accounts.find(
            (account2) => account2.providerId === "credential"
          );
          if (!account) {
            await ctx.context.internalAdapter.createAccount(
              {
                userId: user.user.id,
                providerId: "credential",
                accountId: user.user.id,
                password: passwordHash
              },
              ctx
            );
          } else {
            await ctx.context.internalAdapter.updatePassword(
              user.user.id,
              passwordHash,
              ctx
            );
          }
          if (ctx.context.options.emailAndPassword?.onPasswordReset) {
            await ctx.context.options.emailAndPassword.onPasswordReset(
              {
                user: user.user
              },
              ctx.request
            );
          }
          if (!user.user.emailVerified) {
            await ctx.context.internalAdapter.updateUser(
              user.user.id,
              {
                emailVerified: true
              },
              ctx
            );
          }
          return ctx.json({
            success: true
          });
        }
      )
    },
    hooks: {
      after: [
        {
          matcher(context) {
            return !!(context.path?.startsWith("/sign-up") && opts.sendVerificationOnSignUp);
          },
          handler: createAuthMiddleware(async (ctx) => {
            const response = await getEndpointResponse(ctx);
            const email = response?.user.email;
            if (email) {
              const otp = opts.generateOTP({ email, type: ctx.body.type }, ctx.request) || defaultOTPGenerator(opts);
              let storedOTP = await storeOTP(ctx, otp);
              await ctx.context.internalAdapter.createVerificationValue(
                {
                  value: `${storedOTP}:0`,
                  identifier: `email-verification-otp-${email}`,
                  expiresAt: getDate(opts.expiresIn, "sec")
                },
                ctx
              );
              await options.sendVerificationOTP(
                {
                  email,
                  otp,
                  type: "email-verification"
                },
                ctx.request
              );
            }
          })
        }
      ]
    },
    $ERROR_CODES: ERROR_CODES,
    rateLimit: [
      {
        pathMatcher(path) {
          return path === "/email-otp/send-verification-otp";
        },
        window: 60,
        max: 3
      },
      {
        pathMatcher(path) {
          return path === "/email-otp/check-verification-otp";
        },
        window: 60,
        max: 3
      },
      {
        pathMatcher(path) {
          return path === "/email-otp/verify-email";
        },
        window: 60,
        max: 3
      },
      {
        pathMatcher(path) {
          return path === "/sign-in/email-otp";
        },
        window: 60,
        max: 3
      }
    ]
  };
};

export { emailOTP };
