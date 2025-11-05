'use strict';

const date = require('./better-auth.C1hdVENX.cjs');
const schema = require('./better-auth.D2XP_nbx.cjs');
const getRequestIp = require('./better-auth.Ga4lloSW.cjs');
const json = require('./better-auth.C7Ar55gj.cjs');
const id = require('./better-auth.Bg6iw3ig.cjs');
require('zod');
require('better-call');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('@better-auth/utils/base64');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
const error = require('@better-auth/core/error');
require('./better-auth.CYeOI8C-.cjs');
require('@better-auth/core/db');
const env = require('@better-auth/core/env');
require('@better-auth/utils/random');
const getTables = require('./better-auth.DAHECDyM.cjs');
const kyselyAdapter = require('./better-auth.p4oHeQgF.cjs');
require('@better-auth/core/db/adapter');
const memoryAdapter = require('./better-auth.BqdmLEYE.cjs');
const kysely = require('kysely');

function getWithHooks(adapter, ctx) {
  const hooks = ctx.hooks;
  async function createWithHooks(data, model, customCreateFn, context, trxAdapter) {
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.create?.before;
      if (toRun) {
        const result = await toRun(actualData, context);
        if (result === false) {
          return null;
        }
        const isObject = typeof result === "object" && "data" in result;
        if (isObject) {
          actualData = {
            ...actualData,
            ...result.data
          };
        }
      }
    }
    const customCreated = customCreateFn ? await customCreateFn.fn(actualData) : null;
    const created = !customCreateFn || customCreateFn.executeMainFn ? await (trxAdapter || adapter).create({
      model,
      data: actualData,
      forceAllowId: true
    }) : customCreated;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.create?.after;
      if (toRun) {
        await toRun(created, context);
      }
    }
    return created;
  }
  async function updateWithHooks(data, where, model, customUpdateFn, context, trxAdapter) {
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.before;
      if (toRun) {
        const result = await toRun(data, context);
        if (result === false) {
          return null;
        }
        const isObject = typeof result === "object";
        actualData = isObject ? result.data : result;
      }
    }
    const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
    const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (trxAdapter || adapter).update({
      model,
      update: actualData,
      where
    }) : customUpdated;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.after;
      if (toRun) {
        await toRun(updated, context);
      }
    }
    return updated;
  }
  async function updateManyWithHooks(data, where, model, customUpdateFn, context, trxAdapter) {
    let actualData = data;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.before;
      if (toRun) {
        const result = await toRun(data, context);
        if (result === false) {
          return null;
        }
        const isObject = typeof result === "object";
        actualData = isObject ? result.data : result;
      }
    }
    const customUpdated = customUpdateFn ? await customUpdateFn.fn(actualData) : null;
    const updated = !customUpdateFn || customUpdateFn.executeMainFn ? await (trxAdapter || adapter).updateMany({
      model,
      update: actualData,
      where
    }) : customUpdated;
    for (const hook of hooks || []) {
      const toRun = hook[model]?.update?.after;
      if (toRun) {
        await toRun(updated, context);
      }
    }
    return updated;
  }
  return {
    createWithHooks,
    updateWithHooks,
    updateManyWithHooks
  };
}

const createInternalAdapter = (adapter, ctx) => {
  const logger = ctx.logger;
  const options = ctx.options;
  const secondaryStorage = options.secondaryStorage;
  const sessionExpiration = options.session?.expiresIn || 60 * 60 * 24 * 7;
  const { createWithHooks, updateWithHooks, updateManyWithHooks } = getWithHooks(adapter, ctx);
  async function refreshUserSessions(user) {
    if (!secondaryStorage) return;
    const listRaw = await secondaryStorage.get(`active-sessions-${user.id}`);
    if (!listRaw) return;
    const now = Date.now();
    const list = json.safeJSONParse(listRaw) || [];
    const validSessions = list.filter((s) => s.expiresAt > now);
    await Promise.all(
      validSessions.map(async ({ token }) => {
        const cached = await secondaryStorage.get(token);
        if (!cached) return;
        const parsed = json.safeJSONParse(cached);
        if (!parsed) return;
        const sessionTTL = Math.max(
          Math.floor(new Date(parsed.session.expiresAt).getTime() - now) / 1e3,
          0
        );
        await secondaryStorage.set(
          token,
          JSON.stringify({
            session: parsed.session,
            user
          }),
          Math.floor(sessionTTL)
        );
      })
    );
  }
  return {
    createOAuthUser: async (user, account, context) => {
      return adapter.transaction(async (trxAdapter) => {
        const createdUser = await createWithHooks(
          {
            // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date(),
            ...user
          },
          "user",
          void 0,
          context,
          trxAdapter
        );
        const createdAccount = await createWithHooks(
          {
            ...account,
            userId: createdUser.id,
            // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          },
          "account",
          void 0,
          context,
          trxAdapter
        );
        return {
          user: createdUser,
          account: createdAccount
        };
      });
    },
    createUser: async (user, context, trxAdapter) => {
      const createdUser = await createWithHooks(
        {
          // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...user,
          email: user.email?.toLowerCase()
        },
        "user",
        void 0,
        context,
        trxAdapter
      );
      return createdUser;
    },
    createAccount: async (account, context, trxAdapter) => {
      const createdAccount = await createWithHooks(
        {
          // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...account
        },
        "account",
        void 0,
        context,
        trxAdapter
      );
      return createdAccount;
    },
    listSessions: async (userId, trxAdapter) => {
      if (secondaryStorage) {
        const currentList = await secondaryStorage.get(
          `active-sessions-${userId}`
        );
        if (!currentList) return [];
        const list = json.safeJSONParse(currentList) || [];
        const now = Date.now();
        const validSessions = list.filter((s) => s.expiresAt > now);
        const sessions2 = [];
        for (const session of validSessions) {
          const sessionStringified = await secondaryStorage.get(session.token);
          if (sessionStringified) {
            const s = json.safeJSONParse(sessionStringified);
            if (!s) return [];
            const parsedSession = schema.parseSessionOutput(ctx.options, {
              ...s.session,
              expiresAt: new Date(s.session.expiresAt)
            });
            sessions2.push(parsedSession);
          }
        }
        return sessions2;
      }
      const sessions = await (trxAdapter || adapter).findMany({
        model: "session",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
      return sessions;
    },
    listUsers: async (limit, offset, sortBy, where, trxAdapter) => {
      const users = await (trxAdapter || adapter).findMany({
        model: "user",
        limit,
        offset,
        sortBy,
        where
      });
      return users;
    },
    countTotalUsers: async (where, trxAdapter) => {
      const total = await (trxAdapter || adapter).count({
        model: "user",
        where
      });
      if (typeof total === "string") {
        return parseInt(total);
      }
      return total;
    },
    deleteUser: async (userId, trxAdapter) => {
      if (secondaryStorage) {
        await secondaryStorage.delete(`active-sessions-${userId}`);
      }
      if (!secondaryStorage || options.session?.storeSessionInDatabase) {
        await (trxAdapter || adapter).deleteMany({
          model: "session",
          where: [
            {
              field: "userId",
              value: userId
            }
          ]
        });
      }
      await (trxAdapter || adapter).deleteMany({
        model: "account",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
      await (trxAdapter || adapter).delete({
        model: "user",
        where: [
          {
            field: "id",
            value: userId
          }
        ]
      });
    },
    createSession: async (userId, ctx2, dontRememberMe, override, overrideAll, trxAdapter) => {
      const headers = ctx2.headers || ctx2.request?.headers;
      const { id: _, ...rest } = override || {};
      const data = {
        ipAddress: ctx2.request || ctx2.headers ? getRequestIp.getIp(ctx2.request || ctx2.headers, ctx2.context.options) || "" : "",
        userAgent: headers?.get("user-agent") || "",
        ...rest,
        /**
         * If the user doesn't want to be remembered
         * set the session to expire in 1 day.
         * The cookie will be set to expire at the end of the session
         */
        expiresAt: dontRememberMe ? date.getDate(60 * 60 * 24, "sec") : date.getDate(sessionExpiration, "sec"),
        userId,
        token: id.generateId(32),
        // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...overrideAll ? rest : {}
      };
      const res = await createWithHooks(
        data,
        "session",
        secondaryStorage ? {
          fn: async (sessionData) => {
            const currentList = await secondaryStorage.get(
              `active-sessions-${userId}`
            );
            let list = [];
            const now = Date.now();
            if (currentList) {
              list = json.safeJSONParse(currentList) || [];
              list = list.filter((session) => session.expiresAt > now);
            }
            const sorted = list.sort((a, b) => a.expiresAt - b.expiresAt);
            let furthestSessionExp = sorted.at(-1)?.expiresAt;
            sorted.push({
              token: data.token,
              expiresAt: data.expiresAt.getTime()
            });
            if (!furthestSessionExp || furthestSessionExp < data.expiresAt.getTime()) {
              furthestSessionExp = data.expiresAt.getTime();
            }
            const furthestSessionTTL = Math.max(
              Math.floor((furthestSessionExp - now) / 1e3),
              0
            );
            if (furthestSessionTTL > 0) {
              await secondaryStorage.set(
                `active-sessions-${userId}`,
                JSON.stringify(sorted),
                furthestSessionTTL
              );
            }
            const user = await adapter.findOne({
              model: "user",
              where: [
                {
                  field: "id",
                  value: userId
                }
              ]
            });
            const sessionTTL = Math.max(
              Math.floor((data.expiresAt.getTime() - now) / 1e3),
              0
            );
            if (sessionTTL > 0) {
              await secondaryStorage.set(
                data.token,
                JSON.stringify({
                  session: sessionData,
                  user
                }),
                sessionTTL
              );
            }
            return sessionData;
          },
          executeMainFn: options.session?.storeSessionInDatabase
        } : void 0,
        ctx2,
        trxAdapter
      );
      return res;
    },
    findSession: async (token, trxAdapter) => {
      if (secondaryStorage) {
        const sessionStringified = await secondaryStorage.get(token);
        if (!sessionStringified && !options.session?.storeSessionInDatabase) {
          return null;
        }
        if (sessionStringified) {
          const s = json.safeJSONParse(sessionStringified);
          if (!s) return null;
          const parsedSession2 = schema.parseSessionOutput(ctx.options, {
            ...s.session,
            expiresAt: new Date(s.session.expiresAt),
            createdAt: new Date(s.session.createdAt),
            updatedAt: new Date(s.session.updatedAt)
          });
          const parsedUser2 = schema.parseUserOutput(ctx.options, {
            ...s.user,
            createdAt: new Date(s.user.createdAt),
            updatedAt: new Date(s.user.updatedAt)
          });
          return {
            session: parsedSession2,
            user: parsedUser2
          };
        }
      }
      const session = await (trxAdapter || adapter).findOne({
        model: "session",
        where: [
          {
            value: token,
            field: "token"
          }
        ]
      });
      if (!session) {
        return null;
      }
      const user = await (trxAdapter || adapter).findOne({
        model: "user",
        where: [
          {
            value: session.userId,
            field: "id"
          }
        ]
      });
      if (!user) {
        return null;
      }
      const parsedSession = schema.parseSessionOutput(ctx.options, session);
      const parsedUser = schema.parseUserOutput(ctx.options, user);
      return {
        session: parsedSession,
        user: parsedUser
      };
    },
    findSessions: async (sessionTokens, trxAdapter) => {
      if (secondaryStorage) {
        const sessions2 = [];
        for (const sessionToken of sessionTokens) {
          const sessionStringified = await secondaryStorage.get(sessionToken);
          if (sessionStringified) {
            const s = json.safeJSONParse(sessionStringified);
            if (!s) return [];
            const session = {
              session: {
                ...s.session,
                expiresAt: new Date(s.session.expiresAt)
              },
              user: {
                ...s.user,
                createdAt: new Date(s.user.createdAt),
                updatedAt: new Date(s.user.updatedAt)
              }
            };
            sessions2.push(session);
          }
        }
        return sessions2;
      }
      const sessions = await (trxAdapter || adapter).findMany({
        model: "session",
        where: [
          {
            field: "token",
            value: sessionTokens,
            operator: "in"
          }
        ]
      });
      const userIds = sessions.map((session) => {
        return session.userId;
      });
      if (!userIds.length) return [];
      const users = await (trxAdapter || adapter).findMany({
        model: "user",
        where: [
          {
            field: "id",
            value: userIds,
            operator: "in"
          }
        ]
      });
      return sessions.map((session) => {
        const user = users.find((u) => u.id === session.userId);
        if (!user) return null;
        return {
          session,
          user
        };
      });
    },
    updateSession: async (sessionToken, session, context, trxAdapter) => {
      const updatedSession = await updateWithHooks(
        session,
        [{ field: "token", value: sessionToken }],
        "session",
        secondaryStorage ? {
          async fn(data) {
            const currentSession = await secondaryStorage.get(sessionToken);
            let updatedSession2 = null;
            if (currentSession) {
              const parsedSession = json.safeJSONParse(currentSession);
              if (!parsedSession) return null;
              updatedSession2 = {
                ...parsedSession.session,
                ...data
              };
              return updatedSession2;
            } else {
              return null;
            }
          },
          executeMainFn: options.session?.storeSessionInDatabase
        } : void 0,
        context,
        trxAdapter
      );
      return updatedSession;
    },
    deleteSession: async (token, trxAdapter) => {
      if (secondaryStorage) {
        const data = await secondaryStorage.get(token);
        if (data) {
          const { session } = json.safeJSONParse(data) ?? {};
          if (!session) {
            logger.error("Session not found in secondary storage");
            return;
          }
          const userId = session.userId;
          const currentList = await secondaryStorage.get(
            `active-sessions-${userId}`
          );
          if (currentList) {
            let list = json.safeJSONParse(currentList) || [];
            const now = Date.now();
            const filtered = list.filter(
              (session2) => session2.expiresAt > now && session2.token !== token
            );
            const sorted = filtered.sort((a, b) => a.expiresAt - b.expiresAt);
            const furthestSessionExp = sorted.at(-1)?.expiresAt;
            if (filtered.length > 0 && furthestSessionExp && furthestSessionExp > Date.now()) {
              await secondaryStorage.set(
                `active-sessions-${userId}`,
                JSON.stringify(filtered),
                Math.floor((furthestSessionExp - now) / 1e3)
              );
            } else {
              await secondaryStorage.delete(`active-sessions-${userId}`);
            }
          } else {
            logger.error("Active sessions list not found in secondary storage");
          }
        }
        await secondaryStorage.delete(token);
        if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) {
          return;
        }
      }
      await (trxAdapter || adapter).delete({
        model: "session",
        where: [
          {
            field: "token",
            value: token
          }
        ]
      });
    },
    deleteAccounts: async (userId, trxAdapter) => {
      await (trxAdapter || adapter).deleteMany({
        model: "account",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
    },
    deleteAccount: async (accountId, trxAdapter) => {
      await (trxAdapter || adapter).delete({
        model: "account",
        where: [
          {
            field: "id",
            value: accountId
          }
        ]
      });
    },
    deleteSessions: async (userIdOrSessionTokens, trxAdapter) => {
      if (secondaryStorage) {
        if (typeof userIdOrSessionTokens === "string") {
          const activeSession = await secondaryStorage.get(
            `active-sessions-${userIdOrSessionTokens}`
          );
          const sessions = activeSession ? json.safeJSONParse(activeSession) : [];
          if (!sessions) return;
          for (const session of sessions) {
            await secondaryStorage.delete(session.token);
          }
        } else {
          for (const sessionToken of userIdOrSessionTokens) {
            const session = await secondaryStorage.get(sessionToken);
            if (session) {
              await secondaryStorage.delete(sessionToken);
            }
          }
        }
        if (!options.session?.storeSessionInDatabase || ctx.options.session?.preserveSessionInDatabase) {
          return;
        }
      }
      await (trxAdapter || adapter).deleteMany({
        model: "session",
        where: [
          {
            field: Array.isArray(userIdOrSessionTokens) ? "token" : "userId",
            value: userIdOrSessionTokens,
            operator: Array.isArray(userIdOrSessionTokens) ? "in" : void 0
          }
        ]
      });
    },
    findOAuthUser: async (email, accountId, providerId, trxAdapter) => {
      const account = await (trxAdapter || adapter).findMany({
        model: "account",
        where: [
          {
            value: accountId,
            field: "accountId"
          }
        ]
      }).then((accounts) => {
        return accounts.find((a) => a.providerId === providerId);
      });
      if (account) {
        const user = await (trxAdapter || adapter).findOne({
          model: "user",
          where: [
            {
              value: account.userId,
              field: "id"
            }
          ]
        });
        if (user) {
          return {
            user,
            accounts: [account]
          };
        } else {
          const user2 = await (trxAdapter || adapter).findOne({
            model: "user",
            where: [
              {
                value: email.toLowerCase(),
                field: "email"
              }
            ]
          });
          if (user2) {
            return {
              user: user2,
              accounts: [account]
            };
          }
          return null;
        }
      } else {
        const user = await (trxAdapter || adapter).findOne({
          model: "user",
          where: [
            {
              value: email.toLowerCase(),
              field: "email"
            }
          ]
        });
        if (user) {
          const accounts = await (trxAdapter || adapter).findMany({
            model: "account",
            where: [
              {
                value: user.id,
                field: "userId"
              }
            ]
          });
          return {
            user,
            accounts: accounts || []
          };
        } else {
          return null;
        }
      }
    },
    findUserByEmail: async (email, options2, trxAdapter) => {
      const user = await (trxAdapter || adapter).findOne({
        model: "user",
        where: [
          {
            value: email.toLowerCase(),
            field: "email"
          }
        ]
      });
      if (!user) return null;
      if (options2?.includeAccounts) {
        const accounts = await (trxAdapter || adapter).findMany({
          model: "account",
          where: [
            {
              value: user.id,
              field: "userId"
            }
          ]
        });
        return {
          user,
          accounts
        };
      }
      return {
        user,
        accounts: []
      };
    },
    findUserById: async (userId, trxAdapter) => {
      const user = await (trxAdapter || adapter).findOne({
        model: "user",
        where: [
          {
            field: "id",
            value: userId
          }
        ]
      });
      return user;
    },
    linkAccount: async (account, context, trxAdapter) => {
      const _account = await createWithHooks(
        {
          // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...account
        },
        "account",
        void 0,
        context,
        trxAdapter
      );
      return _account;
    },
    updateUser: async (userId, data, context, trxAdapter) => {
      const user = await updateWithHooks(
        data,
        [
          {
            field: "id",
            value: userId
          }
        ],
        "user",
        void 0,
        context,
        trxAdapter
      );
      await refreshUserSessions(user);
      await refreshUserSessions(user);
      return user;
    },
    updateUserByEmail: async (email, data, context, trxAdapter) => {
      const user = await updateWithHooks(
        data,
        [
          {
            field: "email",
            value: email.toLowerCase()
          }
        ],
        "user",
        void 0,
        context,
        trxAdapter
      );
      await refreshUserSessions(user);
      await refreshUserSessions(user);
      return user;
    },
    updatePassword: async (userId, password, context, trxAdapter) => {
      await updateManyWithHooks(
        {
          password
        },
        [
          {
            field: "userId",
            value: userId
          },
          {
            field: "providerId",
            value: "credential"
          }
        ],
        "account",
        void 0,
        context,
        trxAdapter
      );
    },
    findAccounts: async (userId, trxAdapter) => {
      const accounts = await (trxAdapter || adapter).findMany({
        model: "account",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
      return accounts;
    },
    findAccount: async (accountId, trxAdapter) => {
      const account = await (trxAdapter || adapter).findOne({
        model: "account",
        where: [
          {
            field: "accountId",
            value: accountId
          }
        ]
      });
      return account;
    },
    findAccountByProviderId: async (accountId, providerId, trxAdapter) => {
      const account = await (trxAdapter || adapter).findOne({
        model: "account",
        where: [
          {
            field: "accountId",
            value: accountId
          },
          {
            field: "providerId",
            value: providerId
          }
        ]
      });
      return account;
    },
    findAccountByUserId: async (userId, trxAdapter) => {
      const account = await (trxAdapter || adapter).findMany({
        model: "account",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
      return account;
    },
    updateAccount: async (id, data, context, trxAdapter) => {
      const account = await updateWithHooks(
        data,
        [{ field: "id", value: id }],
        "account",
        void 0,
        context,
        trxAdapter
      );
      return account;
    },
    createVerificationValue: async (data, context, trxAdapter) => {
      const verification = await createWithHooks(
        {
          // todo: we should remove auto setting createdAt and updatedAt in the next major release, since the db generators already handle that
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          ...data
        },
        "verification",
        void 0,
        context,
        trxAdapter
      );
      return verification;
    },
    findVerificationValue: async (identifier, trxAdapter) => {
      const verification = await (trxAdapter || adapter).findMany(
        {
          model: "verification",
          where: [
            {
              field: "identifier",
              value: identifier
            }
          ],
          sortBy: {
            field: "createdAt",
            direction: "desc"
          },
          limit: 1
        }
      );
      if (!options.verification?.disableCleanup) {
        await (trxAdapter || adapter).deleteMany({
          model: "verification",
          where: [
            {
              field: "expiresAt",
              value: /* @__PURE__ */ new Date(),
              operator: "lt"
            }
          ]
        });
      }
      const lastVerification = verification[0];
      return lastVerification;
    },
    deleteVerificationValue: async (id, trxAdapter) => {
      await (trxAdapter || adapter).delete({
        model: "verification",
        where: [
          {
            field: "id",
            value: id
          }
        ]
      });
    },
    deleteVerificationByIdentifier: async (identifier, trxAdapter) => {
      await (trxAdapter || adapter).delete({
        model: "verification",
        where: [
          {
            field: "identifier",
            value: identifier
          }
        ]
      });
    },
    updateVerificationValue: async (id, data, context, trxAdapter) => {
      const verification = await updateWithHooks(
        data,
        [{ field: "id", value: id }],
        "verification",
        void 0,
        context,
        trxAdapter
      );
      return verification;
    }
  };
};

async function getAdapter(options) {
  if (!options.database) {
    const tables = getTables.getAuthTables(options);
    const memoryDB = Object.keys(tables).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    env.logger.warn(
      "No database configuration provided. Using memory adapter in development"
    );
    return memoryAdapter.memoryAdapter(memoryDB)(options);
  }
  if (typeof options.database === "function") {
    return options.database(options);
  }
  const { kysely, databaseType, transaction } = await kyselyAdapter.createKyselyAdapter(options);
  if (!kysely) {
    throw new error.BetterAuthError("Failed to initialize database adapter");
  }
  return kyselyAdapter.kyselyAdapter(kysely, {
    type: databaseType || "sqlite",
    debugLogs: "debugLogs" in options.database ? options.database.debugLogs : false,
    transaction
  })(options);
}
function convertToDB(fields, values) {
  let result = values.id ? {
    id: values.id
  } : {};
  for (const key in fields) {
    const field = fields[key];
    const value = values[key];
    if (value === void 0) {
      continue;
    }
    result[field.fieldName || key] = value;
  }
  return result;
}
function convertFromDB(fields, values) {
  if (!values) {
    return null;
  }
  let result = {
    id: values.id
  };
  for (const [key, value] of Object.entries(fields)) {
    result[key] = values[value.fieldName || key];
  }
  return result;
}

function getSchema(config) {
  const tables = getTables.getAuthTables(config);
  let schema = {};
  for (const key in tables) {
    const table = tables[key];
    const fields = table.fields;
    let actualFields = {};
    Object.entries(fields).forEach(([key2, field]) => {
      actualFields[field.fieldName || key2] = field;
      if (field.references) {
        const refTable = tables[field.references.model];
        if (refTable) {
          actualFields[field.fieldName || key2].references = {
            ...field.references,
            model: refTable.modelName,
            field: field.references.field
          };
        }
      }
    });
    if (schema[table.modelName]) {
      schema[table.modelName].fields = {
        ...schema[table.modelName].fields,
        ...actualFields
      };
      continue;
    }
    schema[table.modelName] = {
      fields: actualFields,
      order: table.order || Infinity
    };
  }
  return schema;
}

const postgresMap = {
  string: ["character varying", "varchar", "text"],
  number: [
    "int4",
    "integer",
    "bigint",
    "smallint",
    "numeric",
    "real",
    "double precision"
  ],
  boolean: ["bool", "boolean"],
  date: ["timestamptz", "timestamp", "date"],
  json: ["json", "jsonb"]
};
const mysqlMap = {
  string: ["varchar", "text"],
  number: [
    "integer",
    "int",
    "bigint",
    "smallint",
    "decimal",
    "float",
    "double"
  ],
  boolean: ["boolean", "tinyint"],
  date: ["timestamp", "datetime", "date"],
  json: ["json"]
};
const sqliteMap = {
  string: ["TEXT"],
  number: ["INTEGER", "REAL"],
  boolean: ["INTEGER", "BOOLEAN"],
  // 0 or 1
  date: ["DATE", "INTEGER"],
  json: ["TEXT"]
};
const mssqlMap = {
  string: ["varchar", "nvarchar"],
  number: ["int", "bigint", "smallint", "decimal", "float", "double"],
  boolean: ["bit", "smallint"],
  date: ["datetime2", "date", "datetime"],
  json: ["varchar", "nvarchar"]
};
const map = {
  postgres: postgresMap,
  mysql: mysqlMap,
  sqlite: sqliteMap,
  mssql: mssqlMap
};
function matchType(columnDataType, fieldType, dbType) {
  function normalize(type) {
    return type.toLowerCase().split("(")[0].trim();
  }
  if (fieldType === "string[]" || fieldType === "number[]") {
    return columnDataType.toLowerCase().includes("json");
  }
  const types = map[dbType];
  const expected = Array.isArray(fieldType) ? types["string"].map((t) => t.toLowerCase()) : types[fieldType].map((t) => t.toLowerCase());
  return expected.includes(normalize(columnDataType));
}
async function getPostgresSchema(db) {
  try {
    const result = await kysely.sql`SHOW search_path`.execute(
      db
    );
    if (result.rows[0]?.search_path) {
      const schemas = result.rows[0].search_path.split(",").map((s) => s.trim()).map((s) => s.replace(/^["']|["']$/g, "")).filter((s) => !s.startsWith("$"));
      return schemas[0] || "public";
    }
  } catch (error) {
  }
  return "public";
}
async function getMigrations(config) {
  const betterAuthSchema = getSchema(config);
  const logger = env.createLogger(config.logger);
  let { kysely: db, databaseType: dbType } = await kyselyAdapter.createKyselyAdapter(config);
  if (!dbType) {
    logger.warn(
      "Could not determine database type, defaulting to sqlite. Please provide a type in the database options to avoid this."
    );
    dbType = "sqlite";
  }
  if (!db) {
    logger.error(
      "Only kysely adapter is supported for migrations. You can use `generate` command to generate the schema, if you're using a different adapter."
    );
    process.exit(1);
  }
  let currentSchema = "public";
  if (dbType === "postgres") {
    currentSchema = await getPostgresSchema(db);
    logger.debug(
      `PostgreSQL migration: Using schema '${currentSchema}' (from search_path)`
    );
    try {
      const schemaCheck = await kysely.sql`
				SELECT schema_name 
				FROM information_schema.schemata 
				WHERE schema_name = ${currentSchema}
			`.execute(db);
      if (!schemaCheck.rows[0]) {
        logger.warn(
          `Schema '${currentSchema}' does not exist. Tables will be inspected from available schemas. Consider creating the schema first or checking your database configuration.`
        );
      }
    } catch (error) {
      logger.debug(
        `Could not verify schema existence: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
  const allTableMetadata = await db.introspection.getTables();
  let tableMetadata = allTableMetadata;
  if (dbType === "postgres") {
    try {
      const tablesInSchema = await kysely.sql`
				SELECT table_name 
				FROM information_schema.tables 
				WHERE table_schema = ${currentSchema}
				AND table_type = 'BASE TABLE'
			`.execute(db);
      const tableNamesInSchema = new Set(
        tablesInSchema.rows.map((row) => row.table_name)
      );
      tableMetadata = allTableMetadata.filter(
        (table) => table.schema === currentSchema && tableNamesInSchema.has(table.name)
      );
      logger.debug(
        `Found ${tableMetadata.length} table(s) in schema '${currentSchema}': ${tableMetadata.map((t) => t.name).join(", ") || "(none)"}`
      );
    } catch (error) {
      logger.warn(
        `Could not filter tables by schema. Using all discovered tables. Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
  const toBeCreated = [];
  const toBeAdded = [];
  for (const [key, value] of Object.entries(betterAuthSchema)) {
    const table = tableMetadata.find((t) => t.name === key);
    if (!table) {
      const tIndex = toBeCreated.findIndex((t) => t.table === key);
      const tableData = {
        table: key,
        fields: value.fields,
        order: value.order || Infinity
      };
      const insertIndex = toBeCreated.findIndex(
        (t) => (t.order || Infinity) > tableData.order
      );
      if (insertIndex === -1) {
        if (tIndex === -1) {
          toBeCreated.push(tableData);
        } else {
          toBeCreated[tIndex].fields = {
            ...toBeCreated[tIndex].fields,
            ...value.fields
          };
        }
      } else {
        toBeCreated.splice(insertIndex, 0, tableData);
      }
      continue;
    }
    let toBeAddedFields = {};
    for (const [fieldName, field] of Object.entries(value.fields)) {
      const column = table.columns.find((c) => c.name === fieldName);
      if (!column) {
        toBeAddedFields[fieldName] = field;
        continue;
      }
      if (matchType(column.dataType, field.type, dbType)) {
        continue;
      } else {
        logger.warn(
          `Field ${fieldName} in table ${key} has a different type in the database. Expected ${field.type} but got ${column.dataType}.`
        );
      }
    }
    if (Object.keys(toBeAddedFields).length > 0) {
      toBeAdded.push({
        table: key,
        fields: toBeAddedFields,
        order: value.order || Infinity
      });
    }
  }
  const migrations = [];
  function getType(field, fieldName) {
    const type = field.type;
    const typeMap = {
      string: {
        sqlite: "text",
        postgres: "text",
        mysql: field.unique ? "varchar(255)" : field.references ? "varchar(36)" : "text",
        mssql: field.unique || field.sortable ? "varchar(255)" : field.references ? "varchar(36)" : (
          // mssql deprecated `text`, and the alternative is `varchar(max)`.
          // Kysely type interface doesn't support `text`, so we set this to `varchar(8000)` as
          // that's the max length for `varchar`
          "varchar(8000)"
        )
      },
      boolean: {
        sqlite: "integer",
        postgres: "boolean",
        mysql: "boolean",
        mssql: "smallint"
      },
      number: {
        sqlite: field.bigint ? "bigint" : "integer",
        postgres: field.bigint ? "bigint" : "integer",
        mysql: field.bigint ? "bigint" : "integer",
        mssql: field.bigint ? "bigint" : "integer"
      },
      date: {
        sqlite: "date",
        postgres: "timestamptz",
        mysql: "timestamp(3)",
        mssql: kysely.sql`datetime2(3)`
      },
      json: {
        sqlite: "text",
        postgres: "jsonb",
        mysql: "json",
        mssql: "varchar(8000)"
      },
      id: {
        postgres: config.advanced?.database?.useNumberId ? "serial" : "text",
        mysql: config.advanced?.database?.useNumberId ? "integer" : "varchar(36)",
        mssql: config.advanced?.database?.useNumberId ? "integer" : "varchar(36)",
        sqlite: config.advanced?.database?.useNumberId ? "integer" : "text"
      },
      foreignKeyId: {
        postgres: config.advanced?.database?.useNumberId ? "integer" : "text",
        mysql: config.advanced?.database?.useNumberId ? "integer" : "varchar(36)",
        mssql: config.advanced?.database?.useNumberId ? "integer" : "varchar(36)",
        sqlite: config.advanced?.database?.useNumberId ? "integer" : "text"
      }
    };
    if (fieldName === "id" || field.references?.field === "id") {
      if (fieldName === "id") {
        return typeMap.id[dbType];
      }
      return typeMap.foreignKeyId[dbType];
    }
    if (dbType === "sqlite" && (type === "string[]" || type === "number[]")) {
      return "text";
    }
    if (type === "string[]" || type === "number[]") {
      return "jsonb";
    }
    if (Array.isArray(type)) {
      return "text";
    }
    return typeMap[type][dbType || "sqlite"];
  }
  if (toBeAdded.length) {
    for (const table of toBeAdded) {
      for (const [fieldName, field] of Object.entries(table.fields)) {
        const type = getType(field, fieldName);
        const exec = db.schema.alterTable(table.table).addColumn(fieldName, type, (col) => {
          col = field.required !== false ? col.notNull() : col;
          if (field.references) {
            col = col.references(
              `${field.references.model}.${field.references.field}`
            ).onDelete(field.references.onDelete || "cascade");
          }
          if (field.unique) {
            col = col.unique();
          }
          if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) {
            if (dbType === "mysql") {
              col = col.defaultTo(kysely.sql`CURRENT_TIMESTAMP(3)`);
            } else {
              col = col.defaultTo(kysely.sql`CURRENT_TIMESTAMP`);
            }
          }
          return col;
        });
        migrations.push(exec);
      }
    }
  }
  if (toBeCreated.length) {
    for (const table of toBeCreated) {
      let dbT = db.schema.createTable(table.table).addColumn(
        "id",
        config.advanced?.database?.useNumberId ? dbType === "postgres" ? "serial" : "integer" : dbType === "mysql" || dbType === "mssql" ? "varchar(36)" : "text",
        (col) => {
          if (config.advanced?.database?.useNumberId) {
            if (dbType === "postgres" || dbType === "sqlite") {
              return col.primaryKey().notNull();
            } else if (dbType === "mssql") {
              return col.identity().primaryKey().notNull();
            }
            return col.autoIncrement().primaryKey().notNull();
          }
          return col.primaryKey().notNull();
        }
      );
      for (const [fieldName, field] of Object.entries(table.fields)) {
        const type = getType(field, fieldName);
        dbT = dbT.addColumn(fieldName, type, (col) => {
          col = field.required !== false ? col.notNull() : col;
          if (field.references) {
            col = col.references(`${field.references.model}.${field.references.field}`).onDelete(field.references.onDelete || "cascade");
          }
          if (field.unique) {
            col = col.unique();
          }
          if (field.type === "date" && typeof field.defaultValue === "function" && (dbType === "postgres" || dbType === "mysql" || dbType === "mssql")) {
            if (dbType === "mysql") {
              col = col.defaultTo(kysely.sql`CURRENT_TIMESTAMP(3)`);
            } else {
              col = col.defaultTo(kysely.sql`CURRENT_TIMESTAMP`);
            }
          }
          return col;
        });
      }
      migrations.push(dbT);
    }
  }
  async function runMigrations() {
    for (const migration of migrations) {
      await migration.execute();
    }
  }
  async function compileMigrations() {
    const compiled = migrations.map((m) => m.compile().sql);
    return compiled.join(";\n\n") + ";";
  }
  return { toBeCreated, toBeAdded, runMigrations, compileMigrations };
}

exports.convertFromDB = convertFromDB;
exports.convertToDB = convertToDB;
exports.createInternalAdapter = createInternalAdapter;
exports.getAdapter = getAdapter;
exports.getMigrations = getMigrations;
exports.getSchema = getSchema;
exports.getWithHooks = getWithHooks;
exports.matchType = matchType;
