'use strict';

const z = require('zod');
const middleware = require('@better-auth/core/middleware');
const betterCall = require('better-call');
const schema$1 = require('../../shared/better-auth.D2XP_nbx.cjs');
const random = require('../../shared/better-auth.CYeOI8C-.cjs');
require('../../shared/better-auth.b10rFcs4.cjs');
const session = require('../../shared/better-auth.BimfmAGe.cjs');
const cookies_index = require('../../shared/better-auth.CwvSb6A4.cjs');
const error = require('@better-auth/core/error');
require('@better-auth/core/env');
require('@better-auth/core/db');
const date = require('../../shared/better-auth.C1hdVENX.cjs');
require('@better-auth/utils/random');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('@better-auth/utils/base64');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
require('kysely');
require('@better-auth/core/db/adapter');
require('@better-auth/core/social-providers');
require('../../shared/better-auth.C7Ar55gj.cjs');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('@better-auth/utils/hmac');
require('@better-auth/utils/binary');
require('defu');
require('../../crypto/index.cjs');
require('../../shared/better-auth.Z-JVyRjt.cjs');
require('jose/errors');
require('../../shared/better-auth.CqgkAe9n.cjs');

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

const ERROR_CODES = {
  INVALID_PHONE_NUMBER: "Invalid phone number",
  PHONE_NUMBER_EXIST: "Phone number already exists",
  INVALID_PHONE_NUMBER_OR_PASSWORD: "Invalid phone number or password",
  UNEXPECTED_ERROR: "Unexpected error",
  OTP_NOT_FOUND: "OTP not found",
  OTP_EXPIRED: "OTP expired",
  INVALID_OTP: "Invalid OTP",
  PHONE_NUMBER_NOT_VERIFIED: "Phone number not verified"
};

function generateOTP(size) {
  return random.generateRandomString(size, "0-9");
}
const phoneNumber = (options) => {
  const opts = {
    expiresIn: options?.expiresIn || 300,
    otpLength: options?.otpLength || 6,
    ...options,
    phoneNumber: "phoneNumber",
    phoneNumberVerified: "phoneNumberVerified",
    code: "code",
    createdAt: "createdAt"
  };
  return {
    id: "phone-number",
    endpoints: {
      /**
       * ### Endpoint
       *
       * POST `/sign-in/phone-number`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.signInPhoneNumber`
       *
       * **client:**
       * `authClient.signIn.phoneNumber`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/phone-number#api-method-sign-in-phone-number)
       */
      signInPhoneNumber: middleware.createAuthEndpoint(
        "/sign-in/phone-number",
        {
          method: "POST",
          body: z__namespace.object({
            phoneNumber: z__namespace.string().meta({
              description: 'Phone number to sign in. Eg: "+1234567890"'
            }),
            password: z__namespace.string().meta({
              description: "Password to use for sign in."
            }),
            rememberMe: z__namespace.boolean().meta({
              description: "Remember the session. Eg: true"
            }).optional()
          }),
          metadata: {
            openapi: {
              summary: "Sign in with phone number",
              description: "Use this endpoint to sign in with phone number",
              responses: {
                200: {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          user: {
                            $ref: "#/components/schemas/User"
                          },
                          session: {
                            $ref: "#/components/schemas/Session"
                          }
                        }
                      }
                    }
                  }
                },
                400: {
                  description: "Invalid phone number or password"
                }
              }
            }
          }
        },
        async (ctx) => {
          const { password, phoneNumber: phoneNumber2 } = ctx.body;
          if (opts.phoneNumberValidator) {
            const isValidNumber = await opts.phoneNumberValidator(
              ctx.body.phoneNumber
            );
            if (!isValidNumber) {
              throw new betterCall.APIError("BAD_REQUEST", {
                message: ERROR_CODES.INVALID_PHONE_NUMBER
              });
            }
          }
          const user = await ctx.context.adapter.findOne({
            model: "user",
            where: [
              {
                field: "phoneNumber",
                value: phoneNumber2
              }
            ]
          });
          if (!user) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: ERROR_CODES.INVALID_PHONE_NUMBER_OR_PASSWORD
            });
          }
          if (opts.requireVerification) {
            if (!user.phoneNumberVerified) {
              const otp = generateOTP(opts.otpLength);
              await ctx.context.internalAdapter.createVerificationValue(
                {
                  value: otp,
                  identifier: phoneNumber2,
                  expiresAt: date.getDate(opts.expiresIn, "sec")
                },
                ctx
              );
              await opts.sendOTP?.(
                {
                  phoneNumber: phoneNumber2,
                  code: otp
                },
                ctx.request
              );
              throw new betterCall.APIError("UNAUTHORIZED", {
                message: ERROR_CODES.PHONE_NUMBER_NOT_VERIFIED
              });
            }
          }
          const accounts = await ctx.context.internalAdapter.findAccountByUserId(user.id);
          const credentialAccount = accounts.find(
            (a) => a.providerId === "credential"
          );
          if (!credentialAccount) {
            ctx.context.logger.error("Credential account not found", {
              phoneNumber: phoneNumber2
            });
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: ERROR_CODES.INVALID_PHONE_NUMBER_OR_PASSWORD
            });
          }
          const currentPassword = credentialAccount?.password;
          if (!currentPassword) {
            ctx.context.logger.error("Password not found", { phoneNumber: phoneNumber2 });
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: ERROR_CODES.UNEXPECTED_ERROR
            });
          }
          const validPassword = await ctx.context.password.verify({
            hash: currentPassword,
            password
          });
          if (!validPassword) {
            ctx.context.logger.error("Invalid password");
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: ERROR_CODES.INVALID_PHONE_NUMBER_OR_PASSWORD
            });
          }
          const session = await ctx.context.internalAdapter.createSession(
            user.id,
            ctx,
            ctx.body.rememberMe === false
          );
          if (!session) {
            ctx.context.logger.error("Failed to create session");
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: error.BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION
            });
          }
          await cookies_index.setSessionCookie(
            ctx,
            {
              session,
              user
            },
            ctx.body.rememberMe === false
          );
          return ctx.json({
            token: session.token,
            user: {
              id: user.id,
              email: user.email,
              emailVerified: user.emailVerified,
              name: user.name,
              image: user.image,
              phoneNumber: user.phoneNumber,
              phoneNumberVerified: user.phoneNumberVerified,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            }
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/phone-number/send-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.sendPhoneNumberOTP`
       *
       * **client:**
       * `authClient.phoneNumber.sendOtp`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/phone-number#api-method-phone-number-send-otp)
       */
      sendPhoneNumberOTP: middleware.createAuthEndpoint(
        "/phone-number/send-otp",
        {
          method: "POST",
          body: z__namespace.object({
            phoneNumber: z__namespace.string().meta({
              description: 'Phone number to send OTP. Eg: "+1234567890"'
            })
          }),
          metadata: {
            openapi: {
              summary: "Send OTP to phone number",
              description: "Use this endpoint to send OTP to phone number",
              responses: {
                200: {
                  description: "Success",
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
          if (!options?.sendOTP) {
            ctx.context.logger.warn("sendOTP not implemented");
            throw new betterCall.APIError("NOT_IMPLEMENTED", {
              message: "sendOTP not implemented"
            });
          }
          if (opts.phoneNumberValidator) {
            const isValidNumber = await opts.phoneNumberValidator(
              ctx.body.phoneNumber
            );
            if (!isValidNumber) {
              throw new betterCall.APIError("BAD_REQUEST", {
                message: ERROR_CODES.INVALID_PHONE_NUMBER
              });
            }
          }
          const code = generateOTP(opts.otpLength);
          await ctx.context.internalAdapter.createVerificationValue(
            {
              value: `${code}:0`,
              identifier: ctx.body.phoneNumber,
              expiresAt: date.getDate(opts.expiresIn, "sec")
            },
            ctx
          );
          await options.sendOTP(
            {
              phoneNumber: ctx.body.phoneNumber,
              code
            },
            ctx.request
          );
          return ctx.json({ message: "code sent" });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/phone-number/verify`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.verifyPhoneNumber`
       *
       * **client:**
       * `authClient.phoneNumber.verify`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/phone-number#api-method-phone-number-verify)
       */
      verifyPhoneNumber: middleware.createAuthEndpoint(
        "/phone-number/verify",
        {
          method: "POST",
          body: z__namespace.object({
            /**
             * Phone number
             */
            phoneNumber: z__namespace.string().meta({
              description: 'Phone number to verify. Eg: "+1234567890"'
            }),
            /**
             * OTP code
             */
            code: z__namespace.string().meta({
              description: 'OTP code. Eg: "123456"'
            }),
            /**
             * Disable session creation after verification
             * @default false
             */
            disableSession: z__namespace.boolean().meta({
              description: "Disable session creation after verification. Eg: false"
            }).optional(),
            /**
             * This checks if there is a session already
             * and updates the phone number with the provided
             * phone number
             */
            updatePhoneNumber: z__namespace.boolean().meta({
              description: "Check if there is a session and update the phone number. Eg: true"
            }).optional()
          }),
          metadata: {
            openapi: {
              summary: "Verify phone number",
              description: "Use this endpoint to verify phone number",
              responses: {
                "200": {
                  description: "Phone number verified successfully",
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
                            description: "Session token if session is created, null if disableSession is true or no session is created"
                          },
                          user: {
                            type: "object",
                            nullable: true,
                            properties: {
                              id: {
                                type: "string",
                                description: "Unique identifier of the user"
                              },
                              email: {
                                type: "string",
                                format: "email",
                                nullable: true,
                                description: "User's email address"
                              },
                              emailVerified: {
                                type: "boolean",
                                nullable: true,
                                description: "Whether the email is verified"
                              },
                              name: {
                                type: "string",
                                nullable: true,
                                description: "User's name"
                              },
                              image: {
                                type: "string",
                                format: "uri",
                                nullable: true,
                                description: "User's profile image URL"
                              },
                              phoneNumber: {
                                type: "string",
                                description: "User's phone number"
                              },
                              phoneNumberVerified: {
                                type: "boolean",
                                description: "Whether the phone number is verified"
                              },
                              createdAt: {
                                type: "string",
                                format: "date-time",
                                description: "Timestamp when the user was created"
                              },
                              updatedAt: {
                                type: "string",
                                format: "date-time",
                                description: "Timestamp when the user was last updated"
                              }
                            },
                            required: [
                              "id",
                              "phoneNumber",
                              "phoneNumberVerified",
                              "createdAt",
                              "updatedAt"
                            ],
                            description: "User object with phone number details, null if no user is created or found"
                          }
                        },
                        required: ["status"]
                      }
                    }
                  }
                },
                400: {
                  description: "Invalid OTP"
                }
              }
            }
          }
        },
        async (ctx) => {
          const otp = await ctx.context.internalAdapter.findVerificationValue(
            ctx.body.phoneNumber
          );
          if (!otp || otp.expiresAt < /* @__PURE__ */ new Date()) {
            if (otp && otp.expiresAt < /* @__PURE__ */ new Date()) {
              throw new betterCall.APIError("BAD_REQUEST", {
                message: "OTP expired"
              });
            }
            throw new betterCall.APIError("BAD_REQUEST", {
              message: ERROR_CODES.OTP_NOT_FOUND
            });
          }
          const [otpValue, attempts] = otp.value.split(":");
          const allowedAttempts = options?.allowedAttempts || 3;
          if (attempts && parseInt(attempts) >= allowedAttempts) {
            await ctx.context.internalAdapter.deleteVerificationValue(otp.id);
            throw new betterCall.APIError("FORBIDDEN", {
              message: "Too many attempts"
            });
          }
          if (otpValue !== ctx.body.code) {
            await ctx.context.internalAdapter.updateVerificationValue(otp.id, {
              value: `${otpValue}:${parseInt(attempts || "0") + 1}`
            });
            throw new betterCall.APIError("BAD_REQUEST", {
              message: "Invalid OTP"
            });
          }
          await ctx.context.internalAdapter.deleteVerificationValue(otp.id);
          if (ctx.body.updatePhoneNumber) {
            const session$1 = await session.getSessionFromCtx(ctx);
            if (!session$1) {
              throw new betterCall.APIError("UNAUTHORIZED", {
                message: error.BASE_ERROR_CODES.USER_NOT_FOUND
              });
            }
            const existingUser = await ctx.context.adapter.findMany({
              model: "user",
              where: [
                {
                  field: "phoneNumber",
                  value: ctx.body.phoneNumber
                }
              ]
            });
            if (existingUser.length) {
              throw ctx.error("BAD_REQUEST", {
                message: ERROR_CODES.PHONE_NUMBER_EXIST
              });
            }
            let user2 = await ctx.context.internalAdapter.updateUser(
              session$1.user.id,
              {
                [opts.phoneNumber]: ctx.body.phoneNumber,
                [opts.phoneNumberVerified]: true
              },
              ctx
            );
            return ctx.json({
              status: true,
              token: session$1.session.token,
              user: {
                id: user2.id,
                email: user2.email,
                emailVerified: user2.emailVerified,
                name: user2.name,
                image: user2.image,
                phoneNumber: user2.phoneNumber,
                phoneNumberVerified: user2.phoneNumberVerified,
                createdAt: user2.createdAt,
                updatedAt: user2.updatedAt
              }
            });
          }
          let user = await ctx.context.adapter.findOne({
            model: "user",
            where: [
              {
                value: ctx.body.phoneNumber,
                field: opts.phoneNumber
              }
            ]
          });
          if (!user) {
            if (options?.signUpOnVerification) {
              user = await ctx.context.internalAdapter.createUser(
                {
                  email: options.signUpOnVerification.getTempEmail(
                    ctx.body.phoneNumber
                  ),
                  name: options.signUpOnVerification.getTempName ? options.signUpOnVerification.getTempName(
                    ctx.body.phoneNumber
                  ) : ctx.body.phoneNumber,
                  [opts.phoneNumber]: ctx.body.phoneNumber,
                  [opts.phoneNumberVerified]: true
                },
                ctx
              );
              if (!user) {
                throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
                  message: error.BASE_ERROR_CODES.FAILED_TO_CREATE_USER
                });
              }
            }
          } else {
            user = await ctx.context.internalAdapter.updateUser(
              user.id,
              {
                [opts.phoneNumberVerified]: true
              },
              ctx
            );
          }
          if (!user) {
            throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
              message: error.BASE_ERROR_CODES.FAILED_TO_UPDATE_USER
            });
          }
          await options?.callbackOnVerification?.(
            {
              phoneNumber: ctx.body.phoneNumber,
              user
            },
            ctx.request
          );
          if (!ctx.body.disableSession) {
            const session = await ctx.context.internalAdapter.createSession(
              user.id,
              ctx
            );
            if (!session) {
              throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
                message: error.BASE_ERROR_CODES.FAILED_TO_CREATE_SESSION
              });
            }
            await cookies_index.setSessionCookie(ctx, {
              session,
              user
            });
            return ctx.json({
              status: true,
              token: session.token,
              user: {
                id: user.id,
                email: user.email,
                emailVerified: user.emailVerified,
                name: user.name,
                image: user.image,
                phoneNumber: user.phoneNumber,
                phoneNumberVerified: user.phoneNumberVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
              }
            });
          }
          return ctx.json({
            status: true,
            token: null,
            user: {
              id: user.id,
              email: user.email,
              emailVerified: user.emailVerified,
              name: user.name,
              image: user.image,
              phoneNumber: user.phoneNumber,
              phoneNumberVerified: user.phoneNumberVerified,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            }
          });
        }
      ),
      /**
       * @deprecated Use requestPasswordResetPhoneNumber instead. This endpoint will be removed in the next major version.
       */
      forgetPasswordPhoneNumber: middleware.createAuthEndpoint(
        "/phone-number/forget-password",
        {
          method: "POST",
          body: z__namespace.object({
            phoneNumber: z__namespace.string().meta({
              description: `The phone number which is associated with the user. Eg: "+1234567890"`
            })
          }),
          metadata: {
            openapi: {
              description: "Request OTP for password reset via phone number",
              responses: {
                "200": {
                  description: "OTP sent successfully for password reset",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: {
                            type: "boolean",
                            description: "Indicates if the OTP was sent successfully",
                            enum: [true]
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
          const user = await ctx.context.adapter.findOne({
            model: "user",
            where: [
              {
                value: ctx.body.phoneNumber,
                field: opts.phoneNumber
              }
            ]
          });
          if (!user) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: "phone number isn't registered"
            });
          }
          const code = generateOTP(opts.otpLength);
          await ctx.context.internalAdapter.createVerificationValue(
            {
              value: `${code}:0`,
              identifier: `${ctx.body.phoneNumber}-request-password-reset`,
              expiresAt: date.getDate(opts.expiresIn, "sec")
            },
            ctx
          );
          await options?.sendForgetPasswordOTP?.(
            {
              phoneNumber: ctx.body.phoneNumber,
              code
            },
            ctx.request
          );
          return ctx.json({
            status: true
          });
        }
      ),
      requestPasswordResetPhoneNumber: middleware.createAuthEndpoint(
        "/phone-number/request-password-reset",
        {
          method: "POST",
          body: z__namespace.object({
            phoneNumber: z__namespace.string()
          }),
          metadata: {
            openapi: {
              description: "Request OTP for password reset via phone number",
              responses: {
                "200": {
                  description: "OTP sent successfully for password reset",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: {
                            type: "boolean",
                            description: "Indicates if the OTP was sent successfully",
                            enum: [true]
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
          const user = await ctx.context.adapter.findOne({
            model: "user",
            where: [
              {
                value: ctx.body.phoneNumber,
                field: opts.phoneNumber
              }
            ]
          });
          if (!user) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: "phone number isn't registered"
            });
          }
          const code = generateOTP(opts.otpLength);
          await ctx.context.internalAdapter.createVerificationValue(
            {
              value: `${code}:0`,
              identifier: `${ctx.body.phoneNumber}-request-password-reset`,
              expiresAt: date.getDate(opts.expiresIn, "sec")
            },
            ctx
          );
          await options?.sendPasswordResetOTP?.(
            {
              phoneNumber: ctx.body.phoneNumber,
              code
            },
            ctx.request
          );
          return ctx.json({
            status: true
          });
        }
      ),
      resetPasswordPhoneNumber: middleware.createAuthEndpoint(
        "/phone-number/reset-password",
        {
          method: "POST",
          body: z__namespace.object({
            otp: z__namespace.string().meta({
              description: 'The one time password to reset the password. Eg: "123456"'
            }),
            phoneNumber: z__namespace.string().meta({
              description: 'The phone number to the account which intends to reset the password for. Eg: "+1234567890"'
            }),
            newPassword: z__namespace.string().meta({
              description: `The new password. Eg: "new-and-secure-password"`
            })
          }),
          metadata: {
            openapi: {
              description: "Reset password using phone number OTP",
              responses: {
                "200": {
                  description: "Password reset successfully",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: {
                            type: "boolean",
                            description: "Indicates if the password was reset successfully",
                            enum: [true]
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
          const verification = await ctx.context.internalAdapter.findVerificationValue(
            `${ctx.body.phoneNumber}-request-password-reset`
          );
          if (!verification) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: ERROR_CODES.OTP_NOT_FOUND
            });
          }
          if (verification.expiresAt < /* @__PURE__ */ new Date()) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: ERROR_CODES.OTP_EXPIRED
            });
          }
          const [otpValue, attempts] = verification.value.split(":");
          const allowedAttempts = options?.allowedAttempts || 3;
          if (attempts && parseInt(attempts) >= allowedAttempts) {
            await ctx.context.internalAdapter.deleteVerificationValue(
              verification.id
            );
            throw new betterCall.APIError("FORBIDDEN", {
              message: "Too many attempts"
            });
          }
          if (ctx.body.otp !== otpValue) {
            await ctx.context.internalAdapter.updateVerificationValue(
              verification.id,
              {
                value: `${otpValue}:${parseInt(attempts || "0") + 1}`
              }
            );
            throw new betterCall.APIError("BAD_REQUEST", {
              message: ERROR_CODES.INVALID_OTP
            });
          }
          const user = await ctx.context.adapter.findOne({
            model: "user",
            where: [
              {
                field: "phoneNumber",
                value: ctx.body.phoneNumber
              }
            ]
          });
          if (!user) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: ERROR_CODES.UNEXPECTED_ERROR
            });
          }
          const hashedPassword = await ctx.context.password.hash(
            ctx.body.newPassword
          );
          await ctx.context.internalAdapter.updatePassword(
            user.id,
            hashedPassword
          );
          await ctx.context.internalAdapter.deleteVerificationValue(
            verification.id
          );
          return ctx.json({
            status: true
          });
        }
      )
    },
    schema: schema$1.mergeSchema(schema, options?.schema),
    rateLimit: [
      {
        pathMatcher(path) {
          return path.startsWith("/phone-number");
        },
        window: 60 * 1e3,
        max: 10
      }
    ],
    $ERROR_CODES: ERROR_CODES
  };
};
const schema = {
  user: {
    fields: {
      phoneNumber: {
        type: "string",
        required: false,
        unique: true,
        sortable: true,
        returned: true
      },
      phoneNumberVerified: {
        type: "boolean",
        required: false,
        returned: true,
        input: false
      }
    }
  }
};

exports.phoneNumber = phoneNumber;
