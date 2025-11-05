'use strict';

const adapters_index = require('../index.cjs');
const drizzleOrm = require('drizzle-orm');
const error = require('@better-auth/core/error');
const index = require('../../shared/better-auth.ucn9QAOT.cjs');
const adapter = require('@better-auth/core/db/adapter');
require('../../shared/better-auth.C7Ar55gj.cjs');
require('@better-auth/core/env');
require('../../shared/better-auth.DAHECDyM.cjs');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('@better-auth/utils/random');
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
require('../../shared/better-auth.CYeOI8C-.cjs');

const drizzleAdapter = (db, config) => {
  let lazyOptions = null;
  const createCustomAdapter = (db2) => ({ getFieldName, debugLog }) => {
    function getSchema(model) {
      const schema = config.schema || db2._.fullSchema;
      if (!schema) {
        throw new error.BetterAuthError(
          "Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object."
        );
      }
      const schemaModel = schema[model];
      if (!schemaModel) {
        throw new error.BetterAuthError(
          `[# Drizzle Adapter]: The model "${model}" was not found in the schema object. Please pass the schema directly to the adapter options.`
        );
      }
      return schemaModel;
    }
    const withReturning = async (model, builder, data, where) => {
      if (config.provider !== "mysql") {
        const c = await builder.returning();
        return c[0];
      }
      await builder.execute();
      const schemaModel = getSchema(model);
      const builderVal = builder.config?.values;
      if (where?.length) {
        const updatedWhere = where.map((w) => {
          if (data[w.field] !== void 0) {
            return { ...w, value: data[w.field] };
          }
          return w;
        });
        const clause = convertWhereClause(updatedWhere, model);
        const res = await db2.select().from(schemaModel).where(...clause);
        return res[0];
      } else if (builderVal && builderVal[0]?.id?.value) {
        let tId = builderVal[0]?.id?.value;
        if (!tId) {
          const lastInsertId = await db2.select({ id: drizzleOrm.sql`LAST_INSERT_ID()` }).from(schemaModel).orderBy(drizzleOrm.desc(schemaModel.id)).limit(1);
          tId = lastInsertId[0].id;
        }
        const res = await db2.select().from(schemaModel).where(drizzleOrm.eq(schemaModel.id, tId)).limit(1).execute();
        return res[0];
      } else if (data.id) {
        const res = await db2.select().from(schemaModel).where(drizzleOrm.eq(schemaModel.id, data.id)).limit(1).execute();
        return res[0];
      } else {
        if (!("id" in schemaModel)) {
          throw new error.BetterAuthError(
            `The model "${model}" does not have an "id" field. Please use the "id" field as your primary key.`
          );
        }
        const res = await db2.select().from(schemaModel).orderBy(drizzleOrm.desc(schemaModel.id)).limit(1).execute();
        return res[0];
      }
    };
    function convertWhereClause(where, model) {
      const schemaModel = getSchema(model);
      if (!where) return [];
      if (where.length === 1) {
        const w = where[0];
        if (!w) {
          return [];
        }
        const field = getFieldName({ model, field: w.field });
        if (!schemaModel[field]) {
          throw new error.BetterAuthError(
            `The field "${w.field}" does not exist in the schema for the model "${model}". Please update your schema.`
          );
        }
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) {
            throw new error.BetterAuthError(
              `The value for the field "${w.field}" must be an array when using the "in" operator.`
            );
          }
          return [drizzleOrm.inArray(schemaModel[field], w.value)];
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) {
            throw new error.BetterAuthError(
              `The value for the field "${w.field}" must be an array when using the "not_in" operator.`
            );
          }
          return [drizzleOrm.notInArray(schemaModel[field], w.value)];
        }
        if (w.operator === "contains") {
          return [drizzleOrm.like(schemaModel[field], `%${w.value}%`)];
        }
        if (w.operator === "starts_with") {
          return [drizzleOrm.like(schemaModel[field], `${w.value}%`)];
        }
        if (w.operator === "ends_with") {
          return [drizzleOrm.like(schemaModel[field], `%${w.value}`)];
        }
        if (w.operator === "lt") {
          return [drizzleOrm.lt(schemaModel[field], w.value)];
        }
        if (w.operator === "lte") {
          return [drizzleOrm.lte(schemaModel[field], w.value)];
        }
        if (w.operator === "ne") {
          return [drizzleOrm.ne(schemaModel[field], w.value)];
        }
        if (w.operator === "gt") {
          return [drizzleOrm.gt(schemaModel[field], w.value)];
        }
        if (w.operator === "gte") {
          return [drizzleOrm.gte(schemaModel[field], w.value)];
        }
        return [drizzleOrm.eq(schemaModel[field], w.value)];
      }
      const andGroup = where.filter(
        (w) => w.connector === "AND" || !w.connector
      );
      const orGroup = where.filter((w) => w.connector === "OR");
      const andClause = drizzleOrm.and(
        ...andGroup.map((w) => {
          const field = getFieldName({ model, field: w.field });
          if (w.operator === "in") {
            if (!Array.isArray(w.value)) {
              throw new error.BetterAuthError(
                `The value for the field "${w.field}" must be an array when using the "in" operator.`
              );
            }
            return drizzleOrm.inArray(schemaModel[field], w.value);
          }
          if (w.operator === "not_in") {
            if (!Array.isArray(w.value)) {
              throw new error.BetterAuthError(
                `The value for the field "${w.field}" must be an array when using the "not_in" operator.`
              );
            }
            return drizzleOrm.notInArray(schemaModel[field], w.value);
          }
          return drizzleOrm.eq(schemaModel[field], w.value);
        })
      );
      const orClause = drizzleOrm.or(
        ...orGroup.map((w) => {
          const field = getFieldName({ model, field: w.field });
          return drizzleOrm.eq(schemaModel[field], w.value);
        })
      );
      const clause = [];
      if (andGroup.length) clause.push(andClause);
      if (orGroup.length) clause.push(orClause);
      return clause;
    }
    function checkMissingFields(schema, model, values) {
      if (!schema) {
        throw new error.BetterAuthError(
          "Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object."
        );
      }
      for (const key in values) {
        if (!schema[key]) {
          throw new error.BetterAuthError(
            `The field "${key}" does not exist in the "${model}" schema. Please update your drizzle schema or re-generate using "npx @better-auth/cli generate".`
          );
        }
      }
    }
    return {
      async create({ model, data: values }) {
        const schemaModel = getSchema(model);
        checkMissingFields(schemaModel, model, values);
        const builder = db2.insert(schemaModel).values(values);
        const returned = await withReturning(model, builder, values);
        return returned;
      },
      async findOne({ model, where }) {
        const schemaModel = getSchema(model);
        const clause = convertWhereClause(where, model);
        const res = await db2.select().from(schemaModel).where(...clause);
        if (!res.length) return null;
        return res[0];
      },
      async findMany({ model, where, sortBy, limit, offset }) {
        const schemaModel = getSchema(model);
        const clause = where ? convertWhereClause(where, model) : [];
        const sortFn = sortBy?.direction === "desc" ? drizzleOrm.desc : drizzleOrm.asc;
        const builder = db2.select().from(schemaModel).limit(limit || 100).offset(offset || 0);
        if (sortBy?.field) {
          builder.orderBy(
            sortFn(
              schemaModel[getFieldName({ model, field: sortBy?.field })]
            )
          );
        }
        return await builder.where(...clause);
      },
      async count({ model, where }) {
        const schemaModel = getSchema(model);
        const clause = where ? convertWhereClause(where, model) : [];
        const res = await db2.select({ count: drizzleOrm.count() }).from(schemaModel).where(...clause);
        return res[0].count;
      },
      async update({ model, where, update: values }) {
        const schemaModel = getSchema(model);
        const clause = convertWhereClause(where, model);
        const builder = db2.update(schemaModel).set(values).where(...clause);
        return await withReturning(model, builder, values, where);
      },
      async updateMany({ model, where, update: values }) {
        const schemaModel = getSchema(model);
        const clause = convertWhereClause(where, model);
        const builder = db2.update(schemaModel).set(values).where(...clause);
        return await builder;
      },
      async delete({ model, where }) {
        const schemaModel = getSchema(model);
        const clause = convertWhereClause(where, model);
        const builder = db2.delete(schemaModel).where(...clause);
        return await builder;
      },
      async deleteMany({ model, where }) {
        const schemaModel = getSchema(model);
        const clause = convertWhereClause(where, model);
        const builder = db2.delete(schemaModel).where(...clause);
        return await builder;
      },
      options: config
    };
  };
  let adapterOptions = null;
  adapterOptions = {
    config: {
      adapterId: "drizzle",
      adapterName: "Drizzle Adapter",
      usePlural: config.usePlural ?? false,
      debugLogs: config.debugLogs ?? false,
      transaction: config.transaction ?? false ? (cb) => db.transaction((tx) => {
        const adapter2 = index.createAdapterFactory({
          config: adapterOptions.config,
          adapter: createCustomAdapter(tx)
        })(lazyOptions);
        return cb(adapter2);
      }) : false
    },
    adapter: createCustomAdapter(db)
  };
  const adapter = index.createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    return adapter(options);
  };
};

exports.createAdapter = adapters_index.createAdapter;
exports.createAdapterFactory = index.createAdapterFactory;
exports.drizzleAdapter = drizzleAdapter;
Object.prototype.hasOwnProperty.call(adapter, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: adapter['__proto__']
	});

Object.keys(adapter).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = adapter[k];
});
