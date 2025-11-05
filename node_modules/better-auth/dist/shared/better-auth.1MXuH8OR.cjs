'use strict';

const mongodb = require('mongodb');
const index = require('./better-auth.ucn9QAOT.cjs');

const mongodbAdapter = (db, config) => {
  let lazyOptions;
  const createCustomAdapter = (db2, session) => ({ options, getFieldName, schema, getDefaultModelName }) => {
    function serializeID({
      field,
      value,
      model
    }) {
      model = getDefaultModelName(model);
      if (field === "id" || field === "_id" || schema[model].fields[field]?.references?.field === "id") {
        if (typeof value !== "string") {
          if (value instanceof mongodb.ObjectId) {
            return value;
          }
          if (Array.isArray(value)) {
            return value.map((v) => {
              if (typeof v === "string") {
                try {
                  return new mongodb.ObjectId(v);
                } catch (e) {
                  return v;
                }
              }
              if (v instanceof mongodb.ObjectId) {
                return v;
              }
              throw new Error("Invalid id value");
            });
          }
          throw new Error("Invalid id value");
        }
        try {
          return new mongodb.ObjectId(value);
        } catch (e) {
          return value;
        }
      }
      return value;
    }
    function convertWhereClause({
      where,
      model
    }) {
      if (!where.length) return {};
      const conditions = where.map((w) => {
        const {
          field: field_,
          value,
          operator = "eq",
          connector = "AND"
        } = w;
        let condition;
        let field = getFieldName({ model, field: field_ });
        if (field === "id") field = "_id";
        switch (operator.toLowerCase()) {
          case "eq":
            condition = {
              [field]: serializeID({
                field,
                value,
                model
              })
            };
            break;
          case "in":
            condition = {
              [field]: {
                $in: Array.isArray(value) ? value.map((v) => serializeID({ field, value: v, model })) : [serializeID({ field, value, model })]
              }
            };
            break;
          case "not_in":
            condition = {
              [field]: {
                $nin: Array.isArray(value) ? value.map((v) => serializeID({ field, value: v, model })) : [serializeID({ field, value, model })]
              }
            };
            break;
          case "gt":
            condition = { [field]: { $gt: value } };
            break;
          case "gte":
            condition = { [field]: { $gte: value } };
            break;
          case "lt":
            condition = { [field]: { $lt: value } };
            break;
          case "lte":
            condition = { [field]: { $lte: value } };
            break;
          case "ne":
            condition = { [field]: { $ne: value } };
            break;
          case "contains":
            condition = { [field]: { $regex: `.*${value}.*` } };
            break;
          case "starts_with":
            condition = { [field]: { $regex: `${value}.*` } };
            break;
          case "ends_with":
            condition = { [field]: { $regex: `.*${value}` } };
            break;
          default:
            throw new Error(`Unsupported operator: ${operator}`);
        }
        return { condition, connector };
      });
      if (conditions.length === 1) {
        return conditions[0].condition;
      }
      const andConditions = conditions.filter((c) => c.connector === "AND").map((c) => c.condition);
      const orConditions = conditions.filter((c) => c.connector === "OR").map((c) => c.condition);
      let clause = {};
      if (andConditions.length) {
        clause = { ...clause, $and: andConditions };
      }
      if (orConditions.length) {
        clause = { ...clause, $or: orConditions };
      }
      return clause;
    }
    return {
      async create({ model, data: values }) {
        const res = await db2.collection(model).insertOne(values, { session });
        const insertedData = { _id: res.insertedId.toString(), ...values };
        return insertedData;
      },
      async findOne({ model, where, select }) {
        const clause = convertWhereClause({ where, model });
        const projection = select ? Object.fromEntries(
          select.map((field) => [getFieldName({ field, model }), 1])
        ) : void 0;
        const res = await db2.collection(model).findOne(clause, { session, projection });
        if (!res) return null;
        return res;
      },
      async findMany({ model, where, limit, offset, sortBy }) {
        const clause = where ? convertWhereClause({ where, model }) : {};
        const cursor = db2.collection(model).find(clause, { session });
        if (limit) cursor.limit(limit);
        if (offset) cursor.skip(offset);
        if (sortBy)
          cursor.sort(
            getFieldName({ field: sortBy.field, model }),
            sortBy.direction === "desc" ? -1 : 1
          );
        const res = await cursor.toArray();
        return res;
      },
      async count({ model, where }) {
        const clause = where ? convertWhereClause({ where, model }) : {};
        const res = await db2.collection(model).countDocuments(clause, { session });
        return res;
      },
      async update({ model, where, update: values }) {
        const clause = convertWhereClause({ where, model });
        const res = await db2.collection(model).findOneAndUpdate(
          clause,
          { $set: values },
          {
            session,
            returnDocument: "after"
          }
        );
        if (!res) return null;
        return res;
      },
      async updateMany({ model, where, update: values }) {
        const clause = convertWhereClause({ where, model });
        const res = await db2.collection(model).updateMany(
          clause,
          {
            $set: values
          },
          { session }
        );
        return res.modifiedCount;
      },
      async delete({ model, where }) {
        const clause = convertWhereClause({ where, model });
        await db2.collection(model).deleteOne(clause, { session });
      },
      async deleteMany({ model, where }) {
        const clause = convertWhereClause({ where, model });
        const res = await db2.collection(model).deleteMany(clause, { session });
        return res.deletedCount;
      }
    };
  };
  let lazyAdapter = null;
  let adapterOptions = null;
  adapterOptions = {
    config: {
      adapterId: "mongodb-adapter",
      adapterName: "MongoDB Adapter",
      usePlural: config?.usePlural ?? false,
      debugLogs: config?.debugLogs ?? false,
      mapKeysTransformInput: {
        id: "_id"
      },
      mapKeysTransformOutput: {
        _id: "id"
      },
      supportsNumericIds: false,
      transaction: config?.client && (config?.transaction ?? false) ? async (cb) => {
        if (!config.client) {
          return cb(lazyAdapter(lazyOptions));
        }
        const session = config.client.startSession();
        try {
          session.startTransaction();
          const adapter = index.createAdapterFactory({
            config: adapterOptions.config,
            adapter: createCustomAdapter(db, session)
          })(lazyOptions);
          const result = await cb(adapter);
          await session.commitTransaction();
          return result;
        } catch (err) {
          await session.abortTransaction();
          throw err;
        } finally {
          await session.endSession();
        }
      } : false,
      customTransformInput({
        action,
        data,
        field,
        fieldAttributes,
        schema,
        model,
        options
      }) {
        if (field === "_id" || fieldAttributes.references?.field === "id") {
          if (action === "update") {
            if (typeof data === "string") {
              try {
                return new mongodb.ObjectId(data);
              } catch (error) {
                return data;
              }
            }
            return data;
          }
          if (Array.isArray(data)) {
            return data.map((v) => {
              if (typeof v === "string") {
                try {
                  return new mongodb.ObjectId(v);
                } catch (error) {
                  return v;
                }
              }
              return v;
            });
          }
          if (typeof data === "string") {
            try {
              return new mongodb.ObjectId(data);
            } catch (error) {
              return new mongodb.ObjectId();
            }
          }
          if (data === null && fieldAttributes.references?.field === "id") {
            return null;
          }
          return new mongodb.ObjectId();
        }
        return data;
      },
      customTransformOutput({ data, field, fieldAttributes }) {
        if (field === "id" || fieldAttributes.references?.field === "id") {
          if (data instanceof mongodb.ObjectId) {
            return data.toHexString();
          }
          if (Array.isArray(data)) {
            return data.map((v) => {
              if (v instanceof mongodb.ObjectId) {
                return v.toHexString();
              }
              return v;
            });
          }
          return data;
        }
        return data;
      },
      customIdGenerator(props) {
        return new mongodb.ObjectId().toString();
      }
    },
    adapter: createCustomAdapter(db)
  };
  lazyAdapter = index.createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    return lazyAdapter(options);
  };
};

exports.mongodbAdapter = mongodbAdapter;
