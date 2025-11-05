import { APIError } from 'better-call';

const cache = /* @__PURE__ */ new WeakMap();
function parseOutputData(data, schema) {
  const fields = schema.fields;
  const parsedData = {};
  for (const key in data) {
    const field = fields[key];
    if (!field) {
      parsedData[key] = data[key];
      continue;
    }
    if (field.returned === false) {
      continue;
    }
    parsedData[key] = data[key];
  }
  return parsedData;
}
function getAllFields(options, table) {
  if (!cache.has(options)) {
    cache.set(options, /* @__PURE__ */ new Map());
  }
  const tableCache = cache.get(options);
  if (tableCache.has(table)) {
    return tableCache.get(table);
  }
  let schema = {
    ...table === "user" ? options.user?.additionalFields : {},
    ...table === "session" ? options.session?.additionalFields : {}
  };
  for (const plugin of options.plugins || []) {
    if (plugin.schema && plugin.schema[table]) {
      schema = {
        ...schema,
        ...plugin.schema[table].fields
      };
    }
  }
  cache.get(options).set(table, schema);
  return schema;
}
function parseUserOutput(options, user) {
  const schema = getAllFields(options, "user");
  return parseOutputData(user, { fields: schema });
}
function parseAccountOutput(options, account) {
  const schema = getAllFields(options, "account");
  return parseOutputData(account, { fields: schema });
}
function parseSessionOutput(options, session) {
  const schema = getAllFields(options, "session");
  return parseOutputData(session, { fields: schema });
}
function parseInputData(data, schema) {
  const action = schema.action || "create";
  const fields = schema.fields;
  const parsedData = Object.assign(
    /* @__PURE__ */ Object.create(null),
    null
  );
  for (const key in fields) {
    if (key in data) {
      if (fields[key].input === false) {
        if (fields[key].defaultValue !== void 0) {
          if (action !== "update") {
            parsedData[key] = fields[key].defaultValue;
            continue;
          }
        }
        if (data[key]) {
          throw new APIError("BAD_REQUEST", {
            message: `${key} is not allowed to be set`
          });
        }
        continue;
      }
      if (fields[key].validator?.input && data[key] !== void 0) {
        parsedData[key] = fields[key].validator.input.parse(data[key]);
        continue;
      }
      if (fields[key].transform?.input && data[key] !== void 0) {
        parsedData[key] = fields[key].transform?.input(data[key]);
        continue;
      }
      parsedData[key] = data[key];
      continue;
    }
    if (fields[key].defaultValue !== void 0 && action === "create") {
      parsedData[key] = fields[key].defaultValue;
      continue;
    }
    if (fields[key].required && action === "create") {
      throw new APIError("BAD_REQUEST", {
        message: `${key} is required`
      });
    }
  }
  return parsedData;
}
function parseUserInput(options, user = {}, action) {
  const schema = getAllFields(options, "user");
  return parseInputData(user, { fields: schema, action });
}
function parseAdditionalUserInput(options, user) {
  const schema = getAllFields(options, "user");
  return parseInputData(user || {}, { fields: schema });
}
function parseAccountInput(options, account) {
  const schema = getAllFields(options, "account");
  return parseInputData(account, { fields: schema });
}
function parseSessionInput(options, session) {
  const schema = getAllFields(options, "session");
  return parseInputData(session, { fields: schema });
}
function mergeSchema(schema, newSchema) {
  if (!newSchema) {
    return schema;
  }
  for (const table in newSchema) {
    const newModelName = newSchema[table]?.modelName;
    if (newModelName) {
      schema[table].modelName = newModelName;
    }
    for (const field in schema[table].fields) {
      const newField = newSchema[table]?.fields?.[field];
      if (!newField) {
        continue;
      }
      schema[table].fields[field].fieldName = newField;
    }
  }
  return schema;
}

export { parseAccountOutput as a, parseSessionOutput as b, parseInputData as c, parseUserInput as d, parseAdditionalUserInput as e, parseAccountInput as f, parseSessionInput as g, mergeSchema as m, parseUserOutput as p };
