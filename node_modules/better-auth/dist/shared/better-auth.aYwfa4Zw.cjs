'use strict';

const z = require('zod');
const betterCall = require('better-call');
require('./better-auth.b10rFcs4.cjs');
const session = require('./better-auth.BimfmAGe.cjs');
const middleware = require('@better-auth/core/middleware');
const cookies_index = require('./better-auth.CwvSb6A4.cjs');
const error = require('@better-auth/core/error');
require('@better-auth/core/env');
require('@better-auth/core/db');
const date = require('./better-auth.C1hdVENX.cjs');
const schema$1 = require('./better-auth.D2XP_nbx.cjs');
require('@better-auth/utils/random');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('@better-auth/utils/base64');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
require('./better-auth.CYeOI8C-.cjs');
require('kysely');
require('@better-auth/core/db/adapter');
const pluginHelper = require('./better-auth.DNqtHmvg.cjs');
const errorCodes = require('./better-auth.Zk899y_h.cjs');
const hasPermission = require('./better-auth.D1q5UHpO.cjs');

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
  const adminMiddleware = middleware.createAuthMiddleware(async (ctx) => {
    const session$1 = await session.getSessionFromCtx(ctx);
    if (!session$1) {
      throw new betterCall.APIError("UNAUTHORIZED");
    }
    return {
      session: session$1
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
                    throw new betterCall.APIError("FORBIDDEN", {
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
          handler: middleware.createAuthMiddleware(async (ctx) => {
            const response = await pluginHelper.getEndpointResponse(ctx);
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
      setRole: middleware.createAuthEndpoint(
        "/admin/set-role",
        {
          method: "POST",
          body: z__namespace.object({
            userId: z__namespace.coerce.string().meta({
              description: "The user id"
            }),
            role: z__namespace.union([
              z__namespace.string().meta({
                description: "The role to set. `admin` or `user` by default"
              }),
              z__namespace.array(
                z__namespace.string().meta({
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
          const canSetRole = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: ctx.context.session.user.role,
            options: opts,
            permissions: {
              user: ["set-role"]
            }
          });
          if (!canSetRole) {
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE
            });
          }
          const roles = opts.roles;
          if (roles) {
            const inputRoles = Array.isArray(ctx.body.role) ? ctx.body.role : [ctx.body.role];
            for (const role of inputRoles) {
              if (!roles[role]) {
                throw new betterCall.APIError("BAD_REQUEST", {
                  message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE
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
      getUser: middleware.createAuthEndpoint(
        "/admin/get-user",
        {
          method: "GET",
          query: z__namespace.object({
            id: z__namespace.string().meta({
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
          const canGetUser = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: ctx.context.session.user.role,
            options: opts,
            permissions: {
              user: ["get"]
            }
          });
          if (!canGetUser) {
            throw ctx.error("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_GET_USER,
              code: "YOU_ARE_NOT_ALLOWED_TO_GET_USER"
            });
          }
          const user = await ctx.context.internalAdapter.findUserById(id);
          if (!user) {
            throw new betterCall.APIError("NOT_FOUND", {
              message: error.BASE_ERROR_CODES.USER_NOT_FOUND
            });
          }
          return schema$1.parseUserOutput(ctx.context.options, user);
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
      createUser: middleware.createAuthEndpoint(
        "/admin/create-user",
        {
          method: "POST",
          body: z__namespace.object({
            email: z__namespace.string().meta({
              description: "The email of the user"
            }),
            password: z__namespace.string().meta({
              description: "The password of the user"
            }),
            name: z__namespace.string().meta({
              description: "The name of the user"
            }),
            role: z__namespace.union([
              z__namespace.string().meta({
                description: "The role of the user"
              }),
              z__namespace.array(
                z__namespace.string().meta({
                  description: "The roles of user"
                })
              )
            ]).optional().meta({
              description: `A string or array of strings representing the roles to apply to the new user. Eg: "user"`
            }),
            /**
             * extra fields for user
             */
            data: z__namespace.record(z__namespace.string(), z__namespace.any()).optional().meta({
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
          const session$1 = await session.getSessionFromCtx(ctx);
          if (!session$1 && (ctx.request || ctx.headers)) {
            throw ctx.error("UNAUTHORIZED");
          }
          if (session$1) {
            const canCreateUser = hasPermission.hasPermission({
              userId: session$1.user.id,
              role: session$1.user.role,
              options: opts,
              permissions: {
                user: ["create"]
              }
            });
            if (!canCreateUser) {
              throw new betterCall.APIError("FORBIDDEN", {
                message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS
              });
            }
          }
          const existUser = await ctx.context.internalAdapter.findUserByEmail(
            ctx.body.email
          );
          if (existUser) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: errorCodes.ADMIN_ERROR_CODES.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL
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
            throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
              message: errorCodes.ADMIN_ERROR_CODES.FAILED_TO_CREATE_USER
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
      adminUpdateUser: middleware.createAuthEndpoint(
        "/admin/update-user",
        {
          method: "POST",
          body: z__namespace.object({
            userId: z__namespace.coerce.string().meta({
              description: "The user id"
            }),
            data: z__namespace.record(z__namespace.any(), z__namespace.any()).meta({
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
          const canUpdateUser = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: ctx.context.session.user.role,
            options: opts,
            permissions: {
              user: ["update"]
            }
          });
          if (!canUpdateUser) {
            throw ctx.error("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS,
              code: "YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS"
            });
          }
          if (Object.keys(ctx.body.data).length === 0) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: errorCodes.ADMIN_ERROR_CODES.NO_DATA_TO_UPDATE
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
      listUsers: middleware.createAuthEndpoint(
        "/admin/list-users",
        {
          method: "GET",
          use: [adminMiddleware],
          query: z__namespace.object({
            searchValue: z__namespace.string().optional().meta({
              description: 'The value to search for. Eg: "some name"'
            }),
            searchField: z__namespace.enum(["email", "name"]).meta({
              description: 'The field to search in, defaults to email. Can be `email` or `name`. Eg: "name"'
            }).optional(),
            searchOperator: z__namespace.enum(["contains", "starts_with", "ends_with"]).meta({
              description: 'The operator to use for the search. Can be `contains`, `starts_with` or `ends_with`. Eg: "contains"'
            }).optional(),
            limit: z__namespace.string().meta({
              description: "The number of users to return"
            }).or(z__namespace.number()).optional(),
            offset: z__namespace.string().meta({
              description: "The offset to start from"
            }).or(z__namespace.number()).optional(),
            sortBy: z__namespace.string().meta({
              description: "The field to sort by"
            }).optional(),
            sortDirection: z__namespace.enum(["asc", "desc"]).meta({
              description: "The direction to sort by"
            }).optional(),
            filterField: z__namespace.string().meta({
              description: "The field to filter by"
            }).optional(),
            filterValue: z__namespace.string().meta({
              description: "The value to filter by"
            }).or(z__namespace.number()).or(z__namespace.boolean()).optional(),
            filterOperator: z__namespace.enum(["eq", "ne", "lt", "lte", "gt", "gte", "contains"]).meta({
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
          const canListUsers = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              user: ["list"]
            }
          });
          if (!canListUsers) {
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_USERS
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
      listUserSessions: middleware.createAuthEndpoint(
        "/admin/list-user-sessions",
        {
          method: "POST",
          use: [adminMiddleware],
          body: z__namespace.object({
            userId: z__namespace.coerce.string().meta({
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
          const canListSessions = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              session: ["list"]
            }
          });
          if (!canListSessions) {
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS
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
      unbanUser: middleware.createAuthEndpoint(
        "/admin/unban-user",
        {
          method: "POST",
          body: z__namespace.object({
            userId: z__namespace.coerce.string().meta({
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
          const canBanUser = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              user: ["ban"]
            }
          });
          if (!canBanUser) {
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_BAN_USERS
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
      banUser: middleware.createAuthEndpoint(
        "/admin/ban-user",
        {
          method: "POST",
          body: z__namespace.object({
            userId: z__namespace.coerce.string().meta({
              description: "The user id"
            }),
            /**
             * Reason for the ban
             */
            banReason: z__namespace.string().meta({
              description: "The reason for the ban"
            }).optional(),
            /**
             * Number of seconds until the ban expires
             */
            banExpiresIn: z__namespace.number().meta({
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
          const canBanUser = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              user: ["ban"]
            }
          });
          if (!canBanUser) {
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_BAN_USERS
            });
          }
          const foundUser = await ctx.context.internalAdapter.findUserById(
            ctx.body.userId
          );
          if (!foundUser) {
            throw new betterCall.APIError("NOT_FOUND", {
              message: error.BASE_ERROR_CODES.USER_NOT_FOUND
            });
          }
          if (ctx.body.userId === ctx.context.session.user.id) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_CANNOT_BAN_YOURSELF
            });
          }
          const user = await ctx.context.internalAdapter.updateUser(
            ctx.body.userId,
            {
              banned: true,
              banReason: ctx.body.banReason || options?.defaultBanReason || "No reason",
              banExpires: ctx.body.banExpiresIn ? date.getDate(ctx.body.banExpiresIn, "sec") : options?.defaultBanExpiresIn ? date.getDate(options.defaultBanExpiresIn, "sec") : void 0,
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
      impersonateUser: middleware.createAuthEndpoint(
        "/admin/impersonate-user",
        {
          method: "POST",
          body: z__namespace.object({
            userId: z__namespace.coerce.string().meta({
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
          const canImpersonateUser = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: ctx.context.session.user.role,
            options: opts,
            permissions: {
              user: ["impersonate"]
            }
          });
          if (!canImpersonateUser) {
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS
            });
          }
          const targetUser = await ctx.context.internalAdapter.findUserById(
            ctx.body.userId
          );
          if (!targetUser) {
            throw new betterCall.APIError("NOT_FOUND", {
              message: "User not found"
            });
          }
          const session = await ctx.context.internalAdapter.createSession(
            targetUser.id,
            ctx,
            true,
            {
              impersonatedBy: ctx.context.session.user.id,
              expiresAt: options?.impersonationSessionDuration ? date.getDate(options.impersonationSessionDuration, "sec") : date.getDate(60 * 60, "sec")
              // 1 hour
            },
            true
          );
          if (!session) {
            throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
              message: errorCodes.ADMIN_ERROR_CODES.FAILED_TO_CREATE_USER
            });
          }
          const authCookies = ctx.context.authCookies;
          cookies_index.deleteSessionCookie(ctx);
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
          await cookies_index.setSessionCookie(
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
      stopImpersonating: middleware.createAuthEndpoint(
        "/admin/stop-impersonating",
        {
          method: "POST",
          requireHeaders: true
        },
        async (ctx) => {
          const session$1 = await session.getSessionFromCtx(ctx);
          if (!session$1) {
            throw new betterCall.APIError("UNAUTHORIZED");
          }
          if (!session$1.session.impersonatedBy) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: "You are not impersonating anyone"
            });
          }
          const user = await ctx.context.internalAdapter.findUserById(
            session$1.session.impersonatedBy
          );
          if (!user) {
            throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to find user"
            });
          }
          const adminCookieName = ctx.context.createAuthCookie("admin_session").name;
          const adminCookie = await ctx.getSignedCookie(
            adminCookieName,
            ctx.context.secret
          );
          if (!adminCookie) {
            throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to find admin session"
            });
          }
          const [adminSessionToken, dontRememberMeCookie] = adminCookie?.split(":");
          const adminSession = await ctx.context.internalAdapter.findSession(
            adminSessionToken
          );
          if (!adminSession || adminSession.session.userId !== user.id) {
            throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
              message: "Failed to find admin session"
            });
          }
          await ctx.context.internalAdapter.deleteSession(
            session$1.session.token
          );
          await cookies_index.setSessionCookie(ctx, adminSession, !!dontRememberMeCookie);
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
      revokeUserSession: middleware.createAuthEndpoint(
        "/admin/revoke-user-session",
        {
          method: "POST",
          body: z__namespace.object({
            sessionToken: z__namespace.string().meta({
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
          const canRevokeSession = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              session: ["revoke"]
            }
          });
          if (!canRevokeSession) {
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS
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
      revokeUserSessions: middleware.createAuthEndpoint(
        "/admin/revoke-user-sessions",
        {
          method: "POST",
          body: z__namespace.object({
            userId: z__namespace.coerce.string().meta({
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
          const canRevokeSession = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              session: ["revoke"]
            }
          });
          if (!canRevokeSession) {
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS
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
      removeUser: middleware.createAuthEndpoint(
        "/admin/remove-user",
        {
          method: "POST",
          body: z__namespace.object({
            userId: z__namespace.coerce.string().meta({
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
          const canDeleteUser = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: session.user.role,
            options: opts,
            permissions: {
              user: ["delete"]
            }
          });
          if (!canDeleteUser) {
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS
            });
          }
          if (ctx.body.userId === ctx.context.session.user.id) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_CANNOT_REMOVE_YOURSELF
            });
          }
          const user = await ctx.context.internalAdapter.findUserById(
            ctx.body.userId
          );
          if (!user) {
            throw new betterCall.APIError("NOT_FOUND", {
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
      setUserPassword: middleware.createAuthEndpoint(
        "/admin/set-user-password",
        {
          method: "POST",
          body: z__namespace.object({
            newPassword: z__namespace.string().meta({
              description: "The new password"
            }),
            userId: z__namespace.coerce.string().meta({
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
          const canSetUserPassword = hasPermission.hasPermission({
            userId: ctx.context.session.user.id,
            role: ctx.context.session.user.role,
            options: opts,
            permissions: {
              user: ["set-password"]
            }
          });
          if (!canSetUserPassword) {
            throw new betterCall.APIError("FORBIDDEN", {
              message: errorCodes.ADMIN_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD
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
      userHasPermission: middleware.createAuthEndpoint(
        "/admin/has-permission",
        {
          method: "POST",
          body: z__namespace.object({
            userId: z__namespace.coerce.string().optional().meta({
              description: `The user id. Eg: "user-id"`
            }),
            role: z__namespace.string().optional().meta({
              description: `The role to check permission for. Eg: "admin"`
            })
          }).and(
            z__namespace.union([
              z__namespace.object({
                permission: z__namespace.record(z__namespace.string(), z__namespace.array(z__namespace.string())),
                permissions: z__namespace.undefined()
              }),
              z__namespace.object({
                permission: z__namespace.undefined(),
                permissions: z__namespace.record(z__namespace.string(), z__namespace.array(z__namespace.string()))
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
            throw new betterCall.APIError("BAD_REQUEST", {
              message: "invalid permission check. no permission(s) were passed."
            });
          }
          const session$1 = await session.getSessionFromCtx(ctx);
          if (!session$1 && (ctx.request || ctx.headers)) {
            throw new betterCall.APIError("UNAUTHORIZED");
          }
          if (!session$1 && !ctx.body.userId && !ctx.body.role) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: "user id or role is required"
            });
          }
          const user = session$1?.user || (ctx.body.role ? { id: ctx.body.userId || "", role: ctx.body.role } : null) || await ctx.context.internalAdapter.findUserById(
            ctx.body.userId
          );
          if (!user) {
            throw new betterCall.APIError("BAD_REQUEST", {
              message: "user not found"
            });
          }
          const result = hasPermission.hasPermission({
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
    $ERROR_CODES: errorCodes.ADMIN_ERROR_CODES,
    schema: schema$1.mergeSchema(schema, opts.schema),
    options
  };
};

exports.admin = admin;
