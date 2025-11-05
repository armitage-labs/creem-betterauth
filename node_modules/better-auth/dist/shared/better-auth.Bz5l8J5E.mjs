import * as z from 'zod';
import { APIError } from 'better-call';
import './better-auth.BX9UB8EP.mjs';
import { g as getSessionFromCtx } from './better-auth.DEBtROF9.mjs';
import { createAuthMiddleware, createAuthEndpoint } from '@better-auth/core/middleware';
import { s as setSessionCookie, d as deleteSessionCookie } from './better-auth.D9_vQR83.mjs';
import { BASE_ERROR_CODES } from '@better-auth/core/error';
import '@better-auth/core/env';
import '@better-auth/core/db';
import { g as getDate } from './better-auth.CW6D9eSx.mjs';
import { m as mergeSchema, p as parseUserOutput } from './better-auth.Cwj9dt6i.mjs';
import '@better-auth/utils/random';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import '@better-auth/utils/base64';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import './better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
import { g as getEndpointResponse } from './better-auth.DQI8AD7d.mjs';
import { A as ADMIN_ERROR_CODES } from './better-auth.C4MGirLD.mjs';
import { h as hasPermission } from './better-auth.BjOWrlEY.mjs';

const schema = {
  user: {
    fields: {
      role: {
        type: "string",
        required: false,
        input: false
      },
      banned: {
        type: "boolean",
        defaultValue: false,
        required: false,
        input: false
      },
      banReason: {
        type: "string",
        required: false,
        input: false
      },
      banExpires: {
        type: "date",
        required: false,
        input: false
      }
    }
  },
  session: {
    fields: {
      impersonatedBy: {
        type: "string",
        required: false
      }
    }
  }
};

function parseRoles(roles) {
  return Array.isArray(roles) ? roles.join(",") : roles;
}
const admin = (options) => {
  const opts = {
    defaultRole: options?.defaultRole ?? "user",
    adminRoles: options?.adminRoles ?? ["admin"],
    bannedUserMessage: options?.bannedUserMessage ?? "You have been banned from this application. Please contact support if you believe this is an error.",
    ...options
  };
  const adminMiddleware = createAuthMiddleware(async (ctx) => {
    const session = await getSessionFromCtx(ctx);
    if (!session) {
      throw new APIError("UNAUTHORIZED");
    }
    return {
      session
    };
  });
  return {
    id: "admin",
    init() {
      return {
        options: {
          databaseHooks: {
            user: {
              create: {
                async before(user) {
                  return {
                    data: {
                      role: options?.defaultRole ?? "user",
                      ...user
                    }
                  };
                }
              }
            },
            session: {
              create: {
                async before(session, ctx) {
                  if (!ctx) {
                    return;
                  }
                  const user = await ctx.context.internalAdapter.findUserById(
                    session.userId
                  );
                  if (user.banned) {
                    if (user.banExpires && new Date(user.banExpires).getTime() < Date.now()) {
                      await ctx.context.internalAdapter.updateUser(
                        session.userId,
                        {
                          banned: false,
                          banReason: null,
                          banExpires: null
                        }
                      );
                      return;
                    }
                    if (ctx && (ctx.path.startsWith("/callback") || ctx.path.startsWith("/oauth2/callback"))) {
                      const redirectURI = ctx.context.options.onAPIError?.errorURL || `${ctx.context.baseURL}/error`;
                      throw ctx.redirect(
                        `${redirectURI}?error=banned&error_description=${opts.bannedUserMessage}`
                      );
                    }
                    throw new APIError("FORBIDDEN", {
                      message: opts.bannedUserMessage,
                      code: "BANNED_USER"
                    });
                  }
                }
              }
            }
          }
        }
      };
    },
    hooks: {
      after: [
        {
          matcher(context) {
            return context.path === "/list-sessions";
          },
          handler: createAuthMiddleware(async (ctx) => {
            const response = await getEndpointResponse(ctx);
            if (!response) {
              return;
            }
            const newJson = response.filter((session) => {
              return !session.impersonatedBy;
            });
            return ctx.json(newJson);
          })
        }
      ]
    },
    endpoints: {
      /**
       * ### Endpoint
       *
       * POST `/admin/set-role`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.setRole`
       *
       * **client:**
       * `authClient.admin.setRole`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-set-role)
       */
      setRole: createAuthEndpoint(
        "/admin/set-role",
        {
          method: "POST",
          body: z.object({
            userId: z.coerce.string().meta({
              description: "The user id"
            }),
            role: z.union([
              z.string().meta({
                description: "The role to set. `admin` or `user` by default"
              }),
              z.array(
                z.string().meta({
                  description: "The roles to set. `admin` or `user` by default"
                })
              )
            ]).meta({
              description: "The role to set, this can be a string or an array of strings. Eg: `admin` or `[admin, user]`"
            })
          }),
          requireHeaders: true,
          use: [adminMiddleware],
          metadata: {
            openapi: {
              operationId: "setRole",
              summary: "Set the role of a user",
              description: "Set the role of a user",
              responses: {
                200: {
                  description: "User role updated",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
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
          const canSetRole = hasPermission({
            userId: ctx.context.session.user.id,
            role: ctx.context.session.user.role,
            options: opts,
            permissions: {
              user: ["set-role"]
            }
          });
          if (!canSetRole) {
            throw new APIError("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE
            });
          }
          const roles = opts.roles;
          if (roles) {
            const inputRoles = Array.isArray(ctx.body.role) ? ctx.body.role : [ctx.body.role];
            for (const role of inputRoles) {
              if (!roles[role]) {
                throw new APIError("BAD_REQUEST", {
                  message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE
                });
              }
            }
          }
          const updatedUser = await ctx.context.internalAdapter.updateUser(
            ctx.body.userId,
            {
              role: parseRoles(ctx.body.role)
            },
            ctx
          );
          return ctx.json({
            user: updatedUser
          });
        }
      ),
      getUser: createAuthEndpoint(
        "/admin/get-user",
        {
          method: "GET",
          query: z.object({
            id: z.string().meta({
              description: "The id of the User"
            })
          }),
          use: [adminMiddleware],
          metadata: {
            openapi: {
              operationId: "getUser",
              summary: "Get an existing user",
              description: "Get an existing user",
              responses: {
                200: {
                  description: "User",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          user: {
                            $ref: "#/components/schemas/User"
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
          const { id } = ctx.query;
          const canGetUser = hasPermission({
            userId: ctx.context.session.user.id,
            role: ctx.context.session.user.role,
            options: opts,
            permissions: {
              user: ["get"]
            }
          });
          if (!canGetUser) {
            throw ctx.error("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_GET_USER,
              code: "YOU_ARE_NOT_ALLOWED_TO_GET_USER"
            });
          }
          const user = await ctx.context.internalAdapter.findUserById(id);
          if (!user) {
            throw new APIError("NOT_FOUND", {
              message: BASE_ERROR_CODES.USER_NOT_FOUND
            });
          }
          return parseUserOutput(ctx.context.options, user);
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/create-user`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.createUser`
       *
       * **client:**
       * `authClient.admin.createUser`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-create-user)
       */
      createUser: createAuthEndpoint(
        "/admin/create-user",
        {
          method: "POST",
          body: z.object({
            email: z.string().meta({
              description: "The email of the user"
            }),
            password: z.string().meta({
              description: "The password of the user"
            }),
            name: z.string().meta({
              description: "The name of the user"
            }),
            role: z.union([
              z.string().meta({
                description: "The role of the user"
              }),
              z.array(
                z.string().meta({
                  description: "The roles of user"
                })
              )
            ]).optional().meta({
              description: `A string or array of strings representing the roles to apply to the new user. Eg: "user"`
            }),
            /**
             * extra fields for user
             */
            data: z.record(z.string(), z.any()).optional().meta({
              description: "Extra fields for the user. Including custom additional fields."
            })
          }),
          metadata: {
            openapi: {
              operationId: "createUser",
              summary: "Create a new user",
              description: "Create a new user",
              responses: {
                200: {
                  description: "User created",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
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
          const session = await getSessionFromCtx(ctx);
          if (!session && (ctx.request || ctx.headers)) {
            throw ctx.error("UNAUTHORIZED");
          }
          if (session) {
            const canCreateUser = hasPermission({
              userId: session.user.id,
              role: session.user.role,
              options: opts,
              permissions: {
                user: ["create"]
              }
            });
            if (!canCreateUser) {
              throw new APIError("FORBIDDEN", {
                message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS
              });
            }
          }
          const existUser = await ctx.context.internalAdapter.findUserByEmail(
            ctx.body.email
          );
          if (existUser) {
            throw new APIError("BAD_REQUEST", {
              message: ADMIN_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL
            });
          }
          const user = await ctx.context.internalAdapter.createUser(
            {
              email: ctx.body.email,
              name: ctx.body.name,
              role: (ctx.body.role && parseRoles(ctx.body.role)) ?? options?.defaultRole ?? "user",
              ...ctx.body.data
            },
            ctx
          );
          if (!user) {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: ADMIN_ERROR_CODES.FAILED_TO_CREATE_USER
            });
          }
          const hashedPassword = await ctx.context.password.hash(
            ctx.body.password
          );
          await ctx.context.internalAdapter.linkAccount(
            {
              accountId: user.id,
              providerId: "credential",
              password: hashedPassword,
              userId: user.id
            },
            ctx
          );
          return ctx.json({
            user
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/update-user`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.adminUpdateUser`
       *
       * **client:**
       * `authClient.admin.updateUser`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-update-user)
       */
      adminUpdateUser: createAuthEndpoint(
        "/admin/update-user",
        {
          method: "POST",
          body: z.object({
            userId: z.coerce.string().meta({
              description: "The user id"
            }),
            data: z.record(z.any(), z.any()).meta({
              description: "The user data to update"
            })
          }),
          use: [adminMiddleware],
          metadata: {
            openapi: {
              operationId: "updateUser",
              summary: "Update a user",
              description: "Update a user's details",
              responses: {
                200: {
                  description: "User updated",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          user: {
                            $ref: "#/components/schemas/User"
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
          const canUpdateUser = hasPermission({
            userId: ctx.context.session.user.id,
            role: ctx.context.session.user.role,
            options: opts,
            permissions: {
              user: ["update"]
            }
          });
          if (!canUpdateUser) {
            throw ctx.error("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS,
              code: "YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS"
            });
          }
          if (Object.keys(ctx.body.data).length === 0) {
            throw new APIError("BAD_REQUEST", {
              message: ADMIN_ERROR_CODES.NO_DATA_TO_UPDATE
            });
          }
          if (ctx.body.data?.role) {
            ctx.body.data.role = parseRoles(ctx.body.data.role);
          }
          const updatedUser = await ctx.context.internalAdapter.updateUser(
            ctx.body.userId,
            ctx.body.data,
            ctx
          );
          return ctx.json(updatedUser);
        }
      ),
      listUsers: createAuthEndpoint(
        "/admin/list-users",
        {
          method: "GET",
          use: [adminMiddleware],
          query: z.object({
            searchValue: z.string().optional().meta({
              description: 'The value to search for. Eg: "some name"'
            }),
            searchField: z.enum(["email", "name"]).meta({
              description: 'The field to search in, defaults to email. Can be `email` or `name`. Eg: "name"'
            }).optional(),
            searchOperator: z.enum(["contains", "starts_with", "ends_with"]).meta({
              description: 'The operator to use for the search. Can be `contains`, `starts_with` or `ends_with`. Eg: "contains"'
            }).optional(),
            limit: z.string().meta({
              description: "The number of users to return"
            }).or(z.number()).optional(),
            offset: z.string().meta({
              description: "The offset to start from"
            }).or(z.number()).optional(),
            sortBy: z.string().meta({
              description: "The field to sort by"
            }).optional(),
            sortDirection: z.enum(["asc", "desc"]).meta({
              description: "The direction to sort by"
            }).optional(),
            filterField: z.string().meta({
              description: "The field to filter by"
            }).optional(),
            filterValue: z.string().meta({
              description: "The value to filter by"
            }).or(z.number()).or(z.boolean()).optional(),
            filterOperator: z.enum(["eq", "ne", "lt", "lte", "gt", "gte", "contains"]).meta({
              description: "The operator to use for the filter"
            }).optional()
          }),
          metadata: {
            openapi: {
              operationId: "listUsers",
              summary: "List users",
              description: "List users",
              responses: {
                200: {
                  description: "List of users",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          users: {
                            type: "array",
                            items: {
                              $ref: "#/components/schemas/User"
                            }
                          },
                          total: {
                            type: "number"
                          },
                          limit: {
                            type: "number"
                          },
                          offset: {
                            type: "number"
                          }
                        },
                        required: ["users", "total"]
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
          const canListUsers = hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              user: ["list"]
            }
          });
          if (!canListUsers) {
            throw new APIError("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_USERS
            });
          }
          const where = [];
          if (ctx.query?.searchValue) {
            where.push({
              field: ctx.query.searchField || "email",
              operator: ctx.query.searchOperator || "contains",
              value: ctx.query.searchValue
            });
          }
          if (ctx.query?.filterValue) {
            where.push({
              field: ctx.query.filterField || "email",
              operator: ctx.query.filterOperator || "eq",
              value: ctx.query.filterValue
            });
          }
          try {
            const users = await ctx.context.internalAdapter.listUsers(
              Number(ctx.query?.limit) || void 0,
              Number(ctx.query?.offset) || void 0,
              ctx.query?.sortBy ? {
                field: ctx.query.sortBy,
                direction: ctx.query.sortDirection || "asc"
              } : void 0,
              where.length ? where : void 0
            );
            const total = await ctx.context.internalAdapter.countTotalUsers(
              where.length ? where : void 0
            );
            return ctx.json({
              users,
              total,
              limit: Number(ctx.query?.limit) || void 0,
              offset: Number(ctx.query?.offset) || void 0
            });
          } catch (e) {
            return ctx.json({
              users: [],
              total: 0
            });
          }
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/list-user-sessions`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.listUserSessions`
       *
       * **client:**
       * `authClient.admin.listUserSessions`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-list-user-sessions)
       */
      listUserSessions: createAuthEndpoint(
        "/admin/list-user-sessions",
        {
          method: "POST",
          use: [adminMiddleware],
          body: z.object({
            userId: z.coerce.string().meta({
              description: "The user id"
            })
          }),
          metadata: {
            openapi: {
              operationId: "listUserSessions",
              summary: "List user sessions",
              description: "List user sessions",
              responses: {
                200: {
                  description: "List of user sessions",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          sessions: {
                            type: "array",
                            items: {
                              $ref: "#/components/schemas/Session"
                            }
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
          const session = ctx.context.session;
          const canListSessions = hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              session: ["list"]
            }
          });
          if (!canListSessions) {
            throw new APIError("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS
            });
          }
          const sessions = await ctx.context.internalAdapter.listSessions(ctx.body.userId);
          return {
            sessions
          };
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/unban-user`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.unbanUser`
       *
       * **client:**
       * `authClient.admin.unbanUser`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-unban-user)
       */
      unbanUser: createAuthEndpoint(
        "/admin/unban-user",
        {
          method: "POST",
          body: z.object({
            userId: z.coerce.string().meta({
              description: "The user id"
            })
          }),
          use: [adminMiddleware],
          metadata: {
            openapi: {
              operationId: "unbanUser",
              summary: "Unban a user",
              description: "Unban a user",
              responses: {
                200: {
                  description: "User unbanned",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          user: {
                            $ref: "#/components/schemas/User"
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
          const session = ctx.context.session;
          const canBanUser = hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              user: ["ban"]
            }
          });
          if (!canBanUser) {
            throw new APIError("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_BAN_USERS
            });
          }
          const user = await ctx.context.internalAdapter.updateUser(
            ctx.body.userId,
            {
              banned: false,
              banExpires: null,
              banReason: null,
              updatedAt: /* @__PURE__ */ new Date()
            }
          );
          return ctx.json({
            user
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/ban-user`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.banUser`
       *
       * **client:**
       * `authClient.admin.banUser`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-ban-user)
       */
      banUser: createAuthEndpoint(
        "/admin/ban-user",
        {
          method: "POST",
          body: z.object({
            userId: z.coerce.string().meta({
              description: "The user id"
            }),
            /**
             * Reason for the ban
             */
            banReason: z.string().meta({
              description: "The reason for the ban"
            }).optional(),
            /**
             * Number of seconds until the ban expires
             */
            banExpiresIn: z.number().meta({
              description: "The number of seconds until the ban expires"
            }).optional()
          }),
          use: [adminMiddleware],
          metadata: {
            openapi: {
              operationId: "banUser",
              summary: "Ban a user",
              description: "Ban a user",
              responses: {
                200: {
                  description: "User banned",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          user: {
                            $ref: "#/components/schemas/User"
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
          const session = ctx.context.session;
          const canBanUser = hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              user: ["ban"]
            }
          });
          if (!canBanUser) {
            throw new APIError("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_BAN_USERS
            });
          }
          const foundUser = await ctx.context.internalAdapter.findUserById(
            ctx.body.userId
          );
          if (!foundUser) {
            throw new APIError("NOT_FOUND", {
              message: BASE_ERROR_CODES.USER_NOT_FOUND
            });
          }
          if (ctx.body.userId === ctx.context.session.user.id) {
            throw new APIError("BAD_REQUEST", {
              message: ADMIN_ERROR_CODES.YOU_CANNOT_BAN_YOURSELF
            });
          }
          const user = await ctx.context.internalAdapter.updateUser(
            ctx.body.userId,
            {
              banned: true,
              banReason: ctx.body.banReason || options?.defaultBanReason || "No reason",
              banExpires: ctx.body.banExpiresIn ? getDate(ctx.body.banExpiresIn, "sec") : options?.defaultBanExpiresIn ? getDate(options.defaultBanExpiresIn, "sec") : void 0,
              updatedAt: /* @__PURE__ */ new Date()
            },
            ctx
          );
          await ctx.context.internalAdapter.deleteSessions(ctx.body.userId);
          return ctx.json({
            user
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/impersonate-user`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.impersonateUser`
       *
       * **client:**
       * `authClient.admin.impersonateUser`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-impersonate-user)
       */
      impersonateUser: createAuthEndpoint(
        "/admin/impersonate-user",
        {
          method: "POST",
          body: z.object({
            userId: z.coerce.string().meta({
              description: "The user id"
            })
          }),
          use: [adminMiddleware],
          metadata: {
            openapi: {
              operationId: "impersonateUser",
              summary: "Impersonate a user",
              description: "Impersonate a user",
              responses: {
                200: {
                  description: "Impersonation session created",
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
            }
          }
        },
        async (ctx) => {
          const canImpersonateUser = hasPermission({
            userId: ctx.context.session.user.id,
            role: ctx.context.session.user.role,
            options: opts,
            permissions: {
              user: ["impersonate"]
            }
          });
          if (!canImpersonateUser) {
            throw new APIError("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS
            });
          }
          const targetUser = await ctx.context.internalAdapter.findUserById(
            ctx.body.userId
          );
          if (!targetUser) {
            throw new APIError("NOT_FOUND", {
              message: "User not found"
            });
          }
          const session = await ctx.context.internalAdapter.createSession(
            targetUser.id,
            ctx,
            true,
            {
              impersonatedBy: ctx.context.session.user.id,
              expiresAt: options?.impersonationSessionDuration ? getDate(options.impersonationSessionDuration, "sec") : getDate(60 * 60, "sec")
              // 1 hour
            },
            true
          );
          if (!session) {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: ADMIN_ERROR_CODES.FAILED_TO_CREATE_USER
            });
          }
          const authCookies = ctx.context.authCookies;
          deleteSessionCookie(ctx);
          const dontRememberMeCookie = await ctx.getSignedCookie(
            ctx.context.authCookies.dontRememberToken.name,
            ctx.context.secret
          );
          const adminCookieProp = ctx.context.createAuthCookie("admin_session");
          await ctx.setSignedCookie(
            adminCookieProp.name,
            `${ctx.context.session.session.token}:${dontRememberMeCookie || ""}`,
            ctx.context.secret,
            authCookies.sessionToken.options
          );
          await setSessionCookie(
            ctx,
            {
              session,
              user: targetUser
            },
            true
          );
          return ctx.json({
            session,
            user: targetUser
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/stop-impersonating`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.stopImpersonating`
       *
       * **client:**
       * `authClient.admin.stopImpersonating`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-stop-impersonating)
       */
      stopImpersonating: createAuthEndpoint(
        "/admin/stop-impersonating",
        {
          method: "POST",
          requireHeaders: true
        },
        async (ctx) => {
          const session = await getSessionFromCtx(ctx);
          if (!session) {
            throw new APIError("UNAUTHORIZED");
          }
          if (!session.session.impersonatedBy) {
            throw new APIError("BAD_REQUEST", {
              message: "You are not impersonating anyone"
            });
          }
          const user = await ctx.context.internalAdapter.findUserById(
            session.session.impersonatedBy
          );
          if (!user) {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to find user"
            });
          }
          const adminCookieName = ctx.context.createAuthCookie("admin_session").name;
          const adminCookie = await ctx.getSignedCookie(
            adminCookieName,
            ctx.context.secret
          );
          if (!adminCookie) {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to find admin session"
            });
          }
          const [adminSessionToken, dontRememberMeCookie] = adminCookie?.split(":");
          const adminSession = await ctx.context.internalAdapter.findSession(
            adminSessionToken
          );
          if (!adminSession || adminSession.session.userId !== user.id) {
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to find admin session"
            });
          }
          await ctx.context.internalAdapter.deleteSession(
            session.session.token
          );
          await setSessionCookie(ctx, adminSession, !!dontRememberMeCookie);
          return ctx.json(adminSession);
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/revoke-user-session`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.revokeUserSession`
       *
       * **client:**
       * `authClient.admin.revokeUserSession`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-revoke-user-session)
       */
      revokeUserSession: createAuthEndpoint(
        "/admin/revoke-user-session",
        {
          method: "POST",
          body: z.object({
            sessionToken: z.string().meta({
              description: "The session token"
            })
          }),
          use: [adminMiddleware],
          metadata: {
            openapi: {
              operationId: "revokeUserSession",
              summary: "Revoke a user session",
              description: "Revoke a user session",
              responses: {
                200: {
                  description: "Session revoked",
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
          const session = ctx.context.session;
          const canRevokeSession = hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              session: ["revoke"]
            }
          });
          if (!canRevokeSession) {
            throw new APIError("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS
            });
          }
          await ctx.context.internalAdapter.deleteSession(
            ctx.body.sessionToken
          );
          return ctx.json({
            success: true
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/revoke-user-sessions`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.revokeUserSessions`
       *
       * **client:**
       * `authClient.admin.revokeUserSessions`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-revoke-user-sessions)
       */
      revokeUserSessions: createAuthEndpoint(
        "/admin/revoke-user-sessions",
        {
          method: "POST",
          body: z.object({
            userId: z.coerce.string().meta({
              description: "The user id"
            })
          }),
          use: [adminMiddleware],
          metadata: {
            openapi: {
              operationId: "revokeUserSessions",
              summary: "Revoke all user sessions",
              description: "Revoke all user sessions",
              responses: {
                200: {
                  description: "Sessions revoked",
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
          const session = ctx.context.session;
          const canRevokeSession = hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              session: ["revoke"]
            }
          });
          if (!canRevokeSession) {
            throw new APIError("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS
            });
          }
          await ctx.context.internalAdapter.deleteSessions(ctx.body.userId);
          return ctx.json({
            success: true
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/remove-user`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.removeUser`
       *
       * **client:**
       * `authClient.admin.removeUser`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-remove-user)
       */
      removeUser: createAuthEndpoint(
        "/admin/remove-user",
        {
          method: "POST",
          body: z.object({
            userId: z.coerce.string().meta({
              description: "The user id"
            })
          }),
          use: [adminMiddleware],
          metadata: {
            openapi: {
              operationId: "removeUser",
              summary: "Remove a user",
              description: "Delete a user and all their sessions and accounts. Cannot be undone.",
              responses: {
                200: {
                  description: "User removed",
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
          const session = ctx.context.session;
          const canDeleteUser = hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              user: ["delete"]
            }
          });
          if (!canDeleteUser) {
            throw new APIError("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS
            });
          }
          if (ctx.body.userId === ctx.context.session.user.id) {
            throw new APIError("BAD_REQUEST", {
              message: ADMIN_ERROR_CODES.YOU_CANNOT_REMOVE_YOURSELF
            });
          }
          const user = await ctx.context.internalAdapter.findUserById(
            ctx.body.userId
          );
          if (!user) {
            throw new APIError("NOT_FOUND", {
              message: "User not found"
            });
          }
          await ctx.context.internalAdapter.deleteUser(ctx.body.userId);
          return ctx.json({
            success: true
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/set-user-password`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.setUserPassword`
       *
       * **client:**
       * `authClient.admin.setUserPassword`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-set-user-password)
       */
      setUserPassword: createAuthEndpoint(
        "/admin/set-user-password",
        {
          method: "POST",
          body: z.object({
            newPassword: z.string().meta({
              description: "The new password"
            }),
            userId: z.coerce.string().meta({
              description: "The user id"
            })
          }),
          use: [adminMiddleware],
          metadata: {
            openapi: {
              operationId: "setUserPassword",
              summary: "Set a user's password",
              description: "Set a user's password",
              responses: {
                200: {
                  description: "Password set",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          status: {
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
          const canSetUserPassword = hasPermission({
            userId: ctx.context.session.user.id,
            role: ctx.context.session.user.role,
            options: opts,
            permissions: {
              user: ["set-password"]
            }
          });
          if (!canSetUserPassword) {
            throw new APIError("FORBIDDEN", {
              message: ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD
            });
          }
          const hashedPassword = await ctx.context.password.hash(
            ctx.body.newPassword
          );
          await ctx.context.internalAdapter.updatePassword(
            ctx.body.userId,
            hashedPassword
          );
          return ctx.json({
            status: true
          });
        }
      ),
      /**
       * ### Endpoint
       *
       * POST `/admin/has-permission`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.userHasPermission`
       *
       * **client:**
       * `authClient.admin.hasPermission`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/admin#api-method-admin-has-permission)
       */
      userHasPermission: createAuthEndpoint(
        "/admin/has-permission",
        {
          method: "POST",
          body: z.object({
            userId: z.coerce.string().optional().meta({
              description: `The user id. Eg: "user-id"`
            }),
            role: z.string().optional().meta({
              description: `The role to check permission for. Eg: "admin"`
            })
          }).and(
            z.union([
              z.object({
                permission: z.record(z.string(), z.array(z.string())),
                permissions: z.undefined()
              }),
              z.object({
                permission: z.undefined(),
                permissions: z.record(z.string(), z.array(z.string()))
              })
            ])
          ),
          metadata: {
            openapi: {
              description: "Check if the user has permission",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        permission: {
                          type: "object",
                          description: "The permission to check",
                          deprecated: true
                        },
                        permissions: {
                          type: "object",
                          description: "The permission to check"
                        }
                      },
                      required: ["permissions"]
                    }
                  }
                }
              },
              responses: {
                "200": {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          error: {
                            type: "string"
                          },
                          success: {
                            type: "boolean"
                          }
                        },
                        required: ["success"]
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
          if (!ctx.body?.permission && !ctx.body?.permissions) {
            throw new APIError("BAD_REQUEST", {
              message: "invalid permission check. no permission(s) were passed."
            });
          }
          const session = await getSessionFromCtx(ctx);
          if (!session && (ctx.request || ctx.headers)) {
            throw new APIError("UNAUTHORIZED");
          }
          if (!session && !ctx.body.userId && !ctx.body.role) {
            throw new APIError("BAD_REQUEST", {
              message: "user id or role is required"
            });
          }
          const user = session?.user || (ctx.body.role ? { id: ctx.body.userId || "", role: ctx.body.role } : null) || await ctx.context.internalAdapter.findUserById(
            ctx.body.userId
          );
          if (!user) {
            throw new APIError("BAD_REQUEST", {
              message: "user not found"
            });
          }
          const result = hasPermission({
            userId: user.id,
            role: user.role,
            options,
            permissions: ctx.body.permissions ?? ctx.body.permission
          });
          return ctx.json({
            error: null,
            success: result
          });
        }
      )
    },
    $ERROR_CODES: ADMIN_ERROR_CODES,
    schema: mergeSchema(schema, opts.schema),
    options
  };
};

export { admin as a };
