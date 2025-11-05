'use strict';

const vitest = require('vitest');
const id = require('../shared/better-auth.Bg6iw3ig.cjs');
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
require('@better-auth/core/error');
require('../shared/better-auth.CYeOI8C-.cjs');
require('@better-auth/utils/random');

const adapterTests = {
  CREATE_MODEL: "create model",
  CREATE_MODEL_SHOULD_ALWAYS_RETURN_AN_ID: "create model should always return an id",
  FIND_MODEL: "find model",
  FIND_MODEL_WITHOUT_ID: "find model without id",
  FIND_MODEL_WITH_SELECT: "find model with select",
  FIND_MODEL_WITH_MODIFIED_FIELD_NAME: "find model with modified field name",
  UPDATE_MODEL: "update model",
  SHOULD_FIND_MANY: "should find many",
  SHOULD_FIND_MANY_WITH_WHERE: "should find many with where",
  SHOULD_FIND_MANY_WITH_OPERATORS: "should find many with operators",
  SHOULD_WORK_WITH_REFERENCE_FIELDS: "should work with reference fields",
  SHOULD_FIND_MANY_WITH_NOT_IN_OPERATOR: "should find many with not in operator",
  SHOULD_FIND_MANY_WITH_SORT_BY: "should find many with sortBy",
  SHOULD_FIND_MANY_WITH_LIMIT: "should find many with limit",
  SHOULD_FIND_MANY_WITH_OFFSET: "should find many with offset",
  SHOULD_UPDATE_WITH_MULTIPLE_WHERE: "should update with multiple where",
  DELETE_MODEL: "delete model",
  SHOULD_DELETE_MANY: "should delete many",
  SHOULD_NOT_THROW_ON_DELETE_RECORD_NOT_FOUND: "shouldn't throw on delete record not found",
  SHOULD_NOT_THROW_ON_RECORD_NOT_FOUND: "shouldn't throw on record not found",
  SHOULD_FIND_MANY_WITH_CONTAINS_OPERATOR: "should find many with contains operator",
  SHOULD_SEARCH_USERS_WITH_STARTS_WITH: "should search users with startsWith",
  SHOULD_SEARCH_USERS_WITH_ENDS_WITH: "should search users with endsWith",
  SHOULD_PREFER_GENERATE_ID_IF_PROVIDED: "should prefer generateId if provided",
  SHOULD_ROLLBACK_FAILING_TRANSACTION: "should rollback failing transaction",
  SHOULD_RETURN_TRANSACTION_RESULT: "should return transaction result",
  SHOULD_FIND_MANY_WITH_CONNECTORS: "should find many with connectors"
};
const { ...numberIdAdapterTestsCopy } = adapterTests;
const numberIdAdapterTests = {
  ...numberIdAdapterTestsCopy,
  SHOULD_RETURN_A_NUMBER_ID_AS_A_RESULT: "Should return a number id as a result",
  SHOULD_INCREMENT_THE_ID_BY_1: "Should increment the id by 1"
};
delete numberIdAdapterTests.SHOULD_NOT_THROW_ON_DELETE_RECORD_NOT_FOUND;
function adapterTest({ getAdapter, disableTests: disabledTests, testPrefix }, internalOptions) {
  console.warn(
    "This test function is deprecated and will be removed in the future. Use `testAdapter` instead."
  );
  const adapter = async () => await getAdapter(internalOptions?.predefinedOptions);
  async function resetDebugLogs() {
    (await adapter())?.adapterTestDebugLogs?.resetDebugLogs();
  }
  async function printDebugLogs() {
    (await adapter())?.adapterTestDebugLogs?.printDebugLogs();
  }
  const testRunId = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
  const getUniqueEmail = (base) => `${testRunId}_${base}`;
  let user = {
    name: "user",
    email: getUniqueEmail("user@email.com"),
    emailVerified: true,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  };
  vitest.test.skipIf(disabledTests?.CREATE_MODEL)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.CREATE_MODEL}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const res = await (await adapter()).create({
        model: "user",
        data: user
      });
      user.id = res.id;
      vitest.expect({
        name: res.name,
        email: res.email
      }).toEqual({
        name: user.name,
        email: user.email
      });
    }
  );
  vitest.test.skipIf(disabledTests?.CREATE_MODEL_SHOULD_ALWAYS_RETURN_AN_ID)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.CREATE_MODEL_SHOULD_ALWAYS_RETURN_AN_ID}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const res = await (await adapter()).create({
        model: "user",
        data: {
          name: "test-name-without-id",
          email: getUniqueEmail("test-email-without-id@email.com")
        }
      });
      vitest.expect(res).toHaveProperty("id");
      vitest.expect(typeof res?.id).toEqual("string");
    }
  );
  vitest.test.skipIf(disabledTests?.FIND_MODEL)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.FIND_MODEL}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const res = await (await adapter()).findOne({
        model: "user",
        where: [
          {
            field: "id",
            value: user.id
          }
        ]
      });
      vitest.expect({
        name: res?.name,
        email: res?.email
      }).toEqual({
        name: user.name,
        email: user.email
      });
    }
  );
  vitest.test.skipIf(disabledTests?.FIND_MODEL_WITHOUT_ID)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.FIND_MODEL_WITHOUT_ID}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const res = await (await adapter()).findOne({
        model: "user",
        where: [
          {
            field: "email",
            value: user.email
          }
        ]
      });
      vitest.expect({
        name: res?.name,
        email: res?.email
      }).toEqual({
        name: user.name,
        email: user.email
      });
    }
  );
  vitest.test.skipIf(disabledTests?.FIND_MODEL_WITH_MODIFIED_FIELD_NAME)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.FIND_MODEL_WITH_MODIFIED_FIELD_NAME}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const email = getUniqueEmail("test-email-with-modified-field@email.com");
      const adapter2 = await getAdapter(
        Object.assign(
          {
            user: {
              fields: {
                email: "email_address"
              }
            }
          },
          internalOptions?.predefinedOptions
        )
      );
      const user2 = await adapter2.create({
        model: "user",
        data: {
          email,
          name: "test-name-with-modified-field",
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      vitest.expect(user2.email).toEqual(email);
      const res = await adapter2.findOne({
        model: "user",
        where: [
          {
            field: "email",
            value: email
          }
        ]
      });
      vitest.expect(res).not.toBeNull();
      vitest.expect(res?.email).toEqual(email);
    }
  );
  vitest.test.skipIf(disabledTests?.FIND_MODEL_WITH_SELECT)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.FIND_MODEL_WITH_SELECT}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const res = await (await adapter()).findOne({
        model: "user",
        where: [
          {
            field: "id",
            value: user.id
          }
        ],
        select: ["email"]
      });
      vitest.expect(res).toEqual({ email: user.email });
    }
  );
  vitest.test.skipIf(disabledTests?.UPDATE_MODEL)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.UPDATE_MODEL}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const newEmail = getUniqueEmail("updated@email.com");
      const res = await (await adapter()).update({
        model: "user",
        where: [
          {
            field: "id",
            value: user.id
          }
        ],
        update: {
          email: newEmail
        }
      });
      vitest.expect(res).toMatchObject({
        email: newEmail,
        name: user.name
      });
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_FIND_MANY)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_FIND_MANY}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const res = await (await adapter()).findMany({
        model: "user"
      });
      vitest.expect(res.length).toBe(3);
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_FIND_MANY_WITH_WHERE)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_FIND_MANY_WITH_WHERE}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const user2 = await (await adapter()).create({
        model: "user",
        data: {
          name: "user2",
          email: getUniqueEmail("test@email.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      const res = await (await adapter()).findMany({
        model: "user",
        where: [
          {
            field: "id",
            value: user2.id
          }
        ]
      });
      vitest.expect(res.length).toBe(1);
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_FIND_MANY_WITH_OPERATORS)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_FIND_MANY_WITH_OPERATORS}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const newUser = await (await adapter()).create({
        model: "user",
        data: {
          name: "user",
          email: getUniqueEmail("test-email2@email.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      const res = await (await adapter()).findMany({
        model: "user",
        where: [
          {
            field: "id",
            operator: "in",
            value: [user.id, newUser.id]
          }
        ]
      });
      vitest.expect(res.length).toBe(2);
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_FIND_MANY_WITH_NOT_IN_OPERATOR)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_FIND_MANY_WITH_NOT_IN_OPERATOR}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const newUser3 = await (await adapter()).create({
        model: "user",
        data: {
          name: "user",
          email: getUniqueEmail("test-email3@email.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      const allUsers = await (await adapter()).findMany({
        model: "user"
      });
      vitest.expect(allUsers.length).toBe(6);
      const usersWithoutNotIn = await (await adapter()).findMany({
        model: "user",
        where: [
          {
            field: "id",
            operator: "not_in",
            value: [user.id, newUser3.id]
          }
        ]
      });
      vitest.expect(usersWithoutNotIn.length).toBe(4);
      await (await adapter()).delete({
        model: "user",
        where: [
          {
            field: "id",
            value: newUser3.id
          }
        ]
      });
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_WORK_WITH_REFERENCE_FIELDS)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_WORK_WITH_REFERENCE_FIELDS}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      let token = null;
      const user2 = await (await adapter()).create({
        model: "user",
        data: {
          name: "user",
          email: getUniqueEmail("my-email@email.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      const session = await (await adapter()).create({
        model: "session",
        data: {
          token: id.generateId(),
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          userId: user2.id,
          expiresAt: /* @__PURE__ */ new Date()
        }
      });
      token = session.token;
      const res = await (await adapter()).findOne({
        model: "session",
        where: [
          {
            field: "userId",
            value: user2.id
          }
        ]
      });
      const resToken = await (await adapter()).findOne({
        model: "session",
        where: [
          {
            field: "token",
            value: token
          }
        ]
      });
      vitest.expect(res).toMatchObject({
        userId: user2.id
      });
      vitest.expect(resToken).toMatchObject({
        userId: user2.id
      });
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_FIND_MANY_WITH_SORT_BY)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_FIND_MANY_WITH_SORT_BY}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      await (await adapter()).create({
        model: "user",
        data: {
          name: "a",
          email: getUniqueEmail("a@email.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      const res = await (await adapter()).findMany({
        model: "user",
        sortBy: {
          field: "name",
          direction: "asc"
        }
      });
      vitest.expect(res[0].name).toBe("a");
      const res2 = await (await adapter()).findMany({
        model: "user",
        sortBy: {
          field: "name",
          direction: "desc"
        }
      });
      vitest.expect(res2[res2.length - 1].name).toBe("a");
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_FIND_MANY_WITH_LIMIT)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_FIND_MANY_WITH_LIMIT}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const res = await (await adapter()).findMany({
        model: "user",
        limit: 1
      });
      vitest.expect(res.length).toBe(1);
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_FIND_MANY_WITH_OFFSET)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_FIND_MANY_WITH_OFFSET}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const res = await (await adapter()).findMany({
        model: "user",
        offset: 2
      });
      vitest.expect(res.length).toBe(5);
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_UPDATE_WITH_MULTIPLE_WHERE)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_UPDATE_WITH_MULTIPLE_WHERE}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const currentEmail = getUniqueEmail("updated@email.com");
      await (await adapter()).updateMany({
        model: "user",
        where: [
          {
            field: "name",
            value: user.name
          },
          {
            field: "email",
            value: currentEmail
          }
        ],
        update: {
          email: getUniqueEmail("updated2@email.com")
        }
      });
      const updatedUser = await (await adapter()).findOne({
        model: "user",
        where: [
          {
            field: "email",
            value: getUniqueEmail("updated2@email.com")
          }
        ]
      });
      vitest.expect(updatedUser).toMatchObject({
        name: user.name,
        email: getUniqueEmail("updated2@email.com")
      });
    }
  );
  vitest.test.skipIf(disabledTests?.DELETE_MODEL)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.DELETE_MODEL}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      await (await adapter()).delete({
        model: "user",
        where: [
          {
            field: "id",
            value: user.id
          }
        ]
      });
      const findRes = await (await adapter()).findOne({
        model: "user",
        where: [
          {
            field: "id",
            value: user.id
          }
        ]
      });
      vitest.expect(findRes).toBeNull();
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_DELETE_MANY)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_DELETE_MANY}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      for (const i of ["to-be-delete-1", "to-be-delete-2", "to-be-delete-3"]) {
        await (await adapter()).create({
          model: "user",
          data: {
            name: "to-be-deleted",
            email: getUniqueEmail(`email@test-${i}.com`),
            emailVerified: true,
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          }
        });
      }
      const findResFirst = await (await adapter()).findMany({
        model: "user",
        where: [
          {
            field: "name",
            value: "to-be-deleted"
          }
        ]
      });
      vitest.expect(findResFirst.length).toBe(3);
      await (await adapter()).deleteMany({
        model: "user",
        where: [
          {
            field: "name",
            value: "to-be-deleted"
          }
        ]
      });
      const findRes = await (await adapter()).findMany({
        model: "user",
        where: [
          {
            field: "name",
            value: "to-be-deleted"
          }
        ]
      });
      vitest.expect(findRes.length).toBe(0);
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_NOT_THROW_ON_DELETE_RECORD_NOT_FOUND)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_NOT_THROW_ON_DELETE_RECORD_NOT_FOUND}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      await (await adapter()).delete({
        model: "user",
        where: [
          {
            field: "id",
            value: "100000"
          }
        ]
      });
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_NOT_THROW_ON_RECORD_NOT_FOUND)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_NOT_THROW_ON_RECORD_NOT_FOUND}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const res = await (await adapter()).findOne({
        model: "user",
        where: [
          {
            field: "id",
            value: "100000"
          }
        ]
      });
      vitest.expect(res).toBeNull();
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_FIND_MANY_WITH_CONTAINS_OPERATOR)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_FIND_MANY_WITH_CONTAINS_OPERATOR}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const res = await (await adapter()).findMany({
        model: "user",
        where: [
          {
            field: "name",
            operator: "contains",
            value: "user2"
          }
        ]
      });
      vitest.expect(res.length).toBe(1);
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_SEARCH_USERS_WITH_STARTS_WITH)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_SEARCH_USERS_WITH_STARTS_WITH}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      await (await adapter()).create({
        model: "user",
        data: {
          name: "user_starts",
          email: getUniqueEmail("startswith1@test.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      await (await adapter()).create({
        model: "user",
        data: {
          name: "user2_starts",
          email: getUniqueEmail("startswith2@test.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      await (await adapter()).create({
        model: "user",
        data: {
          name: "user3_starts",
          email: getUniqueEmail("startswith3@test.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      const res = await (await adapter()).findMany({
        model: "user",
        where: [
          {
            field: "name",
            operator: "starts_with",
            value: "user"
          }
        ]
      });
      vitest.expect(res.length).toBeGreaterThanOrEqual(3);
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_SEARCH_USERS_WITH_ENDS_WITH)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_SEARCH_USERS_WITH_ENDS_WITH}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      await (await adapter()).create({
        model: "user",
        data: {
          name: "tester2",
          email: getUniqueEmail("endswith@test.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      const res = await (await adapter()).findMany({
        model: "user",
        where: [
          {
            field: "name",
            operator: "ends_with",
            value: "ter2"
          }
        ]
      });
      vitest.expect(res.length).toBe(1);
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_PREFER_GENERATE_ID_IF_PROVIDED)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_PREFER_GENERATE_ID_IF_PROVIDED}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const customAdapter = await getAdapter(
        Object.assign(
          {
            advanced: {
              database: {
                generateId: () => "mocked-id"
              }
            }
          },
          internalOptions?.predefinedOptions
        )
      );
      const res = await customAdapter.create({
        model: "user",
        data: {
          name: "user4",
          email: getUniqueEmail("user4@email.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      vitest.expect(res.id).toBe("mocked-id");
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_ROLLBACK_FAILING_TRANSACTION)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_ROLLBACK_FAILING_TRANSACTION}`,
    async ({ onTestFailed, skip }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const customAdapter = await adapter();
      const enableTransaction = customAdapter?.options?.adapterConfig.transaction;
      if (!enableTransaction) {
        skip(
          `Skipping test: ${customAdapter?.options?.adapterConfig.adapterName || "Adapter"}
					 does not support transactions`
        );
        return;
      }
      const user5 = {
        name: "user5",
        email: getUniqueEmail("user5@email.com"),
        emailVerified: true,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
      const user6 = {
        email: getUniqueEmail("user6@email.com")};
      await vitest.expect(
        customAdapter.transaction(async (tx) => {
          await tx.create({ model: "user", data: user5 });
          throw new Error("Simulated failure");
        })
      ).rejects.toThrow("Simulated failure");
      await vitest.expect(
        customAdapter.findMany({
          model: "user",
          where: [
            {
              field: "email",
              value: user5.email,
              connector: "OR"
            },
            {
              field: "email",
              value: user6.email,
              connector: "OR"
            }
          ]
        })
      ).resolves.toEqual([]);
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_RETURN_TRANSACTION_RESULT)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_RETURN_TRANSACTION_RESULT}`,
    async ({ onTestFailed, skip }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      const customAdapter = await adapter();
      const enableTransaction = customAdapter?.options?.adapterConfig.transaction;
      if (!enableTransaction) {
        skip(
          `Skipping test: ${customAdapter?.options?.adapterConfig.adapterName || "Adapter"}
					 does not support transactions`
        );
        return;
      }
      const result = await customAdapter.transaction(async (tx) => {
        const createdUser = await tx.create({
          model: "user",
          data: {
            name: "user6",
            email: getUniqueEmail("user6@email.com"),
            emailVerified: true,
            createdAt: /* @__PURE__ */ new Date(),
            updatedAt: /* @__PURE__ */ new Date()
          }
        });
        return createdUser.email;
      });
      vitest.expect(result).toEqual(getUniqueEmail("user6@email.com"));
    }
  );
  vitest.test.skipIf(disabledTests?.SHOULD_FIND_MANY_WITH_CONNECTORS)(
    `${testPrefix ? `${testPrefix} - ` : ""}${adapterTests.SHOULD_FIND_MANY_WITH_CONNECTORS}`,
    async ({ onTestFailed }) => {
      await resetDebugLogs();
      onTestFailed(async () => {
        await printDebugLogs();
      });
      await (await adapter()).create({
        model: "user",
        data: {
          name: "connector-user1",
          email: getUniqueEmail("connector-user1@email.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      await (await adapter()).create({
        model: "user",
        data: {
          name: "con-user2",
          email: getUniqueEmail("connector-user2@email.com"),
          emailVerified: true,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        }
      });
      const andRes = await (await adapter()).findMany({
        model: "user",
        where: [
          {
            field: "name",
            value: "con-user2",
            connector: "AND"
          },
          {
            field: "email",
            value: getUniqueEmail("connector-user2@email.com"),
            connector: "AND"
          }
        ]
      });
      vitest.expect(andRes.length).toBe(1);
      const orRes = await (await adapter()).findMany({
        model: "user",
        where: [
          {
            field: "name",
            value: "connector-user1",
            connector: "OR"
          },
          {
            field: "name",
            value: "con-user2",
            connector: "OR"
          }
        ]
      });
      vitest.expect(orRes.length).toBe(2);
    }
  );
}
async function runAdapterTest(opts) {
  return adapterTest(opts);
}
async function runNumberIdAdapterTest(opts) {
  const cleanup = [];
  const testRunId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  const getUniqueEmail = (base) => `${testRunId}_${base}`;
  const adapter = async () => await opts.getAdapter({
    advanced: {
      database: {
        useNumberId: true
      }
    }
  });
  vitest.describe("Should run number id specific tests", async () => {
    let idNumber = -1;
    async function resetDebugLogs() {
      (await adapter())?.adapterTestDebugLogs?.resetDebugLogs();
    }
    async function printDebugLogs() {
      (await adapter())?.adapterTestDebugLogs?.printDebugLogs();
    }
    vitest.test.skipIf(opts.disableTests?.SHOULD_RETURN_A_NUMBER_ID_AS_A_RESULT)(
      `${opts.testPrefix ? `${opts.testPrefix} - ` : ""}${numberIdAdapterTests.SHOULD_RETURN_A_NUMBER_ID_AS_A_RESULT}`,
      async ({ onTestFailed }) => {
        await resetDebugLogs();
        onTestFailed(async () => {
          await printDebugLogs();
        });
        const res = await (await adapter()).create({
          model: "user",
          data: {
            name: "user",
            email: getUniqueEmail("number-user@email.com")
          }
        });
        cleanup.push({ modelName: "user", id: res.id });
        vitest.expect(typeof res.id).toBe("string");
        vitest.expect(parseInt(res.id)).toBeGreaterThan(0);
        idNumber = parseInt(res.id);
      }
    );
    vitest.test.skipIf(opts.disableTests?.SHOULD_INCREMENT_THE_ID_BY_1)(
      `${opts.testPrefix ? `${opts.testPrefix} - ` : ""}${numberIdAdapterTests.SHOULD_INCREMENT_THE_ID_BY_1}`,
      async ({ onTestFailed }) => {
        await resetDebugLogs();
        onTestFailed(async () => {
          console.log(`ID number from last create: ${idNumber}`);
          await printDebugLogs();
        });
        const res = await (await adapter()).create({
          model: "user",
          data: {
            name: "user2",
            email: getUniqueEmail("number-user2@email.com")
          }
        });
        cleanup.push({ modelName: "user", id: res.id });
        vitest.expect(parseInt(res.id)).toBe(idNumber + 1);
      }
    );
  });
  vitest.describe("Should run normal adapter tests with number id enabled", async () => {
    vitest.beforeAll(async () => {
      for (const { modelName, id } of cleanup) {
        await (await adapter()).delete({
          model: modelName,
          where: [{ field: "id", value: id }]
        });
      }
    });
    await adapterTest(
      {
        ...opts,
        disableTests: {
          ...opts.disableTests,
          SHOULD_PREFER_GENERATE_ID_IF_PROVIDED: true
        }
      },
      {
        predefinedOptions: {
          advanced: {
            database: {
              useNumberId: true
            }
          }
        }
      }
    );
  });
}
function recoverProcessTZ() {
  const originalTZ = process.env.TZ;
  return {
    [Symbol.dispose]: () => {
      process.env.TZ = originalTZ;
    }
  };
}

exports.recoverProcessTZ = recoverProcessTZ;
exports.runAdapterTest = runAdapterTest;
exports.runNumberIdAdapterTest = runNumberIdAdapterTest;
