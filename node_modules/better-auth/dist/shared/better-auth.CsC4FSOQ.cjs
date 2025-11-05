'use strict';

const z = require('zod');

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
      schema2 = z__namespace.json ? z__namespace.json() : z__namespace.any();
    } else if (field.type === "string[]" || field.type === "number[]") {
      schema2 = z__namespace.array(field.type === "string[]" ? z__namespace.string() : z__namespace.number());
    } else if (Array.isArray(field.type)) {
      schema2 = z__namespace.any();
    } else {
      schema2 = z__namespace[field.type]();
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
  const schema = z__namespace.object(zodFields);
  return schema;
}

exports.toZodSchema = toZodSchema;
