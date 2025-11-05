export { createAdapter } from '../index.mjs';
import { BetterAuthError } from '@better-auth/core/error';
import { c as createAdapterFactory } from '../../shared/better-auth.EBxKeVNZ.mjs';
export * from '@better-auth/core/db/adapter';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '@better-auth/core/env';
import '../../shared/better-auth.pQjeRkzN.mjs';
import '../../shared/better-auth.BUPPRXfK.mjs';
import '@better-auth/utils/random';
import 'zod';
import 'better-call';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import '@better-auth/utils/base64';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import '../../shared/better-auth.B4Qoxdgc.mjs';

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
          throw new BetterAuthError(
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
          throw new BetterAuthError(
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
          throw new BetterAuthError(
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
          throw new BetterAuthError(
            `Model ${model} does not exist in the database. If you haven't generated the Prisma client, you need to run 'npx prisma generate'`
          );
        }
        return await db[model].count({
          where: whereClause
        });
      },
      async update({ model, where, update }) {
        if (!db[model]) {
          throw new BetterAuthError(
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
        const adapter2 = createAdapterFactory({
          config: adapterOptions.config,
          adapter: createCustomAdapter(tx)
        })(lazyOptions);
        return cb(adapter2);
      }) : false
    },
    adapter: createCustomAdapter(prisma)
  };
  const adapter = createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    return adapter(options);
  };
};

export { createAdapterFactory, prismaAdapter };
