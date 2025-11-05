import * as z from 'zod';

function toZodSchema({
  fields,
  isClientSide
}) {
  const zodFields = Object.keys(fields).reduce((acc, key) => {
    const field = fields[key];
    if (!field) {
      return acc;
    }
    if (isClientSide && field.input === false) {
      return acc;
    }
    let schema2;
    if (field.type === "json") {
      schema2 = z.json ? z.json() : z.any();
    } else if (field.type === "string[]" || field.type === "number[]") {
      schema2 = z.array(field.type === "string[]" ? z.string() : z.number());
    } else if (Array.isArray(field.type)) {
      schema2 = z.any();
    } else {
      schema2 = z[field.type]();
    }
    if (field?.required === false) {
      schema2 = schema2.optional();
    }
    if (field?.returned === false) {
      return acc;
    }
    return {
      ...acc,
      [key]: schema2
    };
  }, {});
  const schema = z.object(zodFields);
  return schema;
}

export { toZodSchema as t };
