import { logger } from '@better-auth/core/env';
import { c as createAdapterFactory } from './better-auth.EBxKeVNZ.mjs';

const memoryAdapter = (db, config) => {
  let lazyOptions = null;
  let adapterCreator = createAdapterFactory({
    config: {
      adapterId: "memory",
      adapterName: "Memory Adapter",
      usePlural: false,
      debugLogs: config?.debugLogs || false,
      customTransformInput(props) {
        if (props.options.advanced?.database?.useNumberId && props.field === "id" && props.action === "create") {
          return db[props.model].length + 1;
        }
        return props.data;
      },
      transaction: async (cb) => {
        let clone = structuredClone(db);
        try {
          const r = await cb(adapterCreator(lazyOptions));
          return r;
        } catch (error) {
          Object.keys(db).forEach((key) => {
            db[key] = clone[key];
          });
          throw error;
        }
      }
    },
    adapter: ({ getFieldName, options, debugLog }) => {
      function convertWhereClause(where, model) {
        const table = db[model];
        if (!table) {
          logger.error(
            `[MemoryAdapter] Model ${model} not found in the DB`,
            Object.keys(db)
          );
          throw new Error(`Model ${model} not found`);
        }
        const evalClause = (record, clause) => {
          const { field, value, operator } = clause;
          switch (operator) {
            case "in":
              if (!Array.isArray(value)) {
                throw new Error("Value must be an array");
              }
              return value.includes(record[field]);
            case "not_in":
              if (!Array.isArray(value)) {
                throw new Error("Value must be an array");
              }
              return !value.includes(record[field]);
            case "contains":
              return record[field].includes(value);
            case "starts_with":
              return record[field].startsWith(value);
            case "ends_with":
              return record[field].endsWith(value);
            case "ne":
              return record[field] !== value;
            case "gt":
              return value != null && Boolean(record[field] > value);
            case "gte":
              return value != null && Boolean(record[field] >= value);
            case "lt":
              return value != null && Boolean(record[field] < value);
            case "lte":
              return value != null && Boolean(record[field] <= value);
            default:
              return record[field] === value;
          }
        };
        return table.filter((record) => {
          if (!where.length || where.length === 0) {
            return true;
          }
          let result = evalClause(record, where[0]);
          for (const clause of where) {
            const clauseResult = evalClause(record, clause);
            if (clause.connector === "OR") {
              result = result || clauseResult;
            } else {
              result = result && clauseResult;
            }
          }
          return result;
        });
      }
      return {
        create: async ({ model, data }) => {
          if (options.advanced?.database?.useNumberId) {
            data.id = db[model].length + 1;
          }
          if (!db[model]) {
            db[model] = [];
          }
          db[model].push(data);
          return data;
        },
        findOne: async ({ model, where }) => {
          const res = convertWhereClause(where, model);
          const record = res[0] || null;
          return record;
        },
        findMany: async ({ model, where, sortBy, limit, offset }) => {
          let table = db[model];
          if (where) {
            table = convertWhereClause(where, model);
          }
          if (sortBy) {
            table = table.sort((a, b) => {
              const field = getFieldName({ model, field: sortBy.field });
              const aValue = a[field];
              const bValue = b[field];
              let comparison = 0;
              if (aValue == null && bValue == null) {
                comparison = 0;
              } else if (aValue == null) {
                comparison = -1;
              } else if (bValue == null) {
                comparison = 1;
              } else if (typeof aValue === "string" && typeof bValue === "string") {
                comparison = aValue.localeCompare(bValue);
              } else if (aValue instanceof Date && bValue instanceof Date) {
                comparison = aValue.getTime() - bValue.getTime();
              } else if (typeof aValue === "number" && typeof bValue === "number") {
                comparison = aValue - bValue;
              } else if (typeof aValue === "boolean" && typeof bValue === "boolean") {
                comparison = aValue === bValue ? 0 : aValue ? 1 : -1;
              } else {
                comparison = String(aValue).localeCompare(String(bValue));
              }
              return sortBy.direction === "asc" ? comparison : -comparison;
            });
          }
          if (offset !== void 0) {
            table = table.slice(offset);
          }
          if (limit !== void 0) {
            table = table.slice(0, limit);
          }
          return table || [];
        },
        count: async ({ model, where }) => {
          if (where) {
            const filteredRecords = convertWhereClause(where, model);
            return filteredRecords.length;
          }
          return db[model].length;
        },
        update: async ({ model, where, update }) => {
          const res = convertWhereClause(where, model);
          res.forEach((record) => {
            Object.assign(record, update);
          });
          return res[0] || null;
        },
        delete: async ({ model, where }) => {
          const table = db[model];
          const res = convertWhereClause(where, model);
          db[model] = table.filter((record) => !res.includes(record));
        },
        deleteMany: async ({ model, where }) => {
          const table = db[model];
          const res = convertWhereClause(where, model);
          let count = 0;
          db[model] = table.filter((record) => {
            if (res.includes(record)) {
              count++;
              return false;
            }
            return !res.includes(record);
          });
          return count;
        },
        updateMany({ model, where, update }) {
          const res = convertWhereClause(where, model);
          res.forEach((record) => {
            Object.assign(record, update);
          });
          return res[0] || null;
        }
      };
    }
  });
  return (options) => {
    lazyOptions = options;
    return adapterCreator(options);
  };
};

export { memoryAdapter as m };
