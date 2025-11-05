'use strict';

const adapters_index = require('../index.cjs');
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

const prismaAdapter = (prisma, config) => {
  let lazyOptions = null;
  const createCustomAdapter = (prisma2) => ({ getFieldName }) => {
    const db = prisma2;
    const convertSelect = (select, model) => {
      if (!select || !model) return void 0;
      return select.reduce((prev, cur) => {
        return {
          ...prev,
          [getFieldName({ model, field: cur })]: true
        };
      }, {});
    };
    function operatorToPrismaOperator(operator) {
      switch (operator) {
        case "starts_with":
          return "startsWith";
        case "ends_with":
          return "endsWith";
        case "ne":
          return "not";
        case "not_in":
          return "notIn";
        default:
          return operator;
      }
    }
    const convertWhereClause = (model, where) => {
      if (!where || !where.length) return {};
      if (where.length === 1) {
        const w = where[0];
        if (!w) {
          return;
        }
        return {
          [getFieldName({ model, field: w.field })]: w.operator === "eq" || !w.operator ? w.value : {
            [operatorToPrismaOperator(w.operator)]: w.value
          }
        };
      }
      const and = where.filter((w) => w.connector === "AND" || !w.connector);
      const or = where.filter((w) => w.connector === "OR");
      const andClause = and.map((w) => {
        return {
          [getFieldName({ model, field: w.field })]: w.operator === "eq" || !w.operator ? w.value : {
            [operatorToPrismaOperator(w.operator)]: w.value
          }
        };
      });
      const orClause = or.map((w) => {
        return {
          [getFieldName({ model, field: w.field })]: w.operator === "eq" || !w.operator ? w.value : {
            [operatorToPrismaOperator(w.operator)]: w.value
          }
        };
      });
      return {
        ...andClause.length ? { AND: andClause } : {},
        ...orClause.length ? { OR: orClause } : {}
      };
    };
    return {
      async create({ model, data: values, select }) {
        if (!db[model]) {
          throw new error.BetterAuthError(
            `Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`
          );
        }
        return await db[model].create({
          data: values,
          select: convertSelect(select, model)
        });
      },
      async findOne({ model, where, select }) {
        const whereClause = convertWhereClause(model, where);
        if (!db[model]) {
          throw new error.BetterAuthError(
            `Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`
          );
        }
        return await db[model].findFirst({
          where: whereClause,
          select: convertSelect(select, model)
        });
      },
      async findMany({ model, where, limit, offset, sortBy }) {
        const whereClause = convertWhereClause(model, where);
        if (!db[model]) {
          throw new error.BetterAuthError(
            `Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`
          );
        }
        return await db[model].findMany({
          where: whereClause,
          take: limit || 100,
          skip: offset || 0,
          ...sortBy?.field ? {
            orderBy: {
              [getFieldName({ model, field: sortBy.field })]: sortBy.direction === "desc" ? "desc" : "asc"
            }
          } : {}
        });
      },
      async count({ model, where }) {
        const whereClause = convertWhereClause(model, where);
        if (!db[model]) {
          throw new error.BetterAuthError(
            `Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`
          );
        }
        return await db[model].count({
          where: whereClause
        });
      },
      async update({ model, where, update }) {
        if (!db[model]) {
          throw new error.BetterAuthError(
            `Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`
          );
        }
        const whereClause = convertWhereClause(model, where);
        return await db[model].update({
          where: whereClause,
          data: update
        });
      },
      async updateMany({ model, where, update }) {
        const whereClause = convertWhereClause(model, where);
        const result = await db[model].updateMany({
          where: whereClause,
          data: update
        });
        return result ? result.count : 0;
      },
      async delete({ model, where }) {
        const whereClause = convertWhereClause(model, where);
        try {
          await db[model].delete({
            where: whereClause
          });
        } catch (e) {
        }
      },
      async deleteMany({ model, where }) {
        const whereClause = convertWhereClause(model, where);
        const result = await db[model].deleteMany({
          where: whereClause
        });
        return result ? result.count : 0;
      },
      options: config
    };
  };
  let adapterOptions = null;
  adapterOptions = {
    config: {
      adapterId: "prisma",
      adapterName: "Prisma Adapter",
      usePlural: config.usePlural ?? false,
      debugLogs: config.debugLogs ?? false,
      transaction: config.transaction ?? false ? (cb) => prisma.$transaction((tx) => {
        const adapter2 = index.createAdapterFactory({
          config: adapterOptions.config,
          adapter: createCustomAdapter(tx)
        })(lazyOptions);
        return cb(adapter2);
      }) : false
    },
    adapter: createCustomAdapter(prisma)
  };
  const adapter = index.createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    return adapter(options);
  };
};

exports.createAdapter = adapters_index.createAdapter;
exports.createAdapterFactory = index.createAdapterFactory;
exports.prismaAdapter = prismaAdapter;
Object.prototype.hasOwnProperty.call(adapter, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: adapter['__proto__']
	});

Object.keys(adapter).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = adapter[k];
});
