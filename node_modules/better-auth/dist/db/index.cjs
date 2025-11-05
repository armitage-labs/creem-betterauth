'use strict';

const db = require('@better-auth/core/db');
const getMigration = require('../shared/better-auth.DhHADHGp.cjs');
const getTables = require('../shared/better-auth.DAHECDyM.cjs');
const toZod = require('../shared/better-auth.CsC4FSOQ.cjs');
const schema = require('../shared/better-auth.D2XP_nbx.cjs');
require('../shared/better-auth.C1hdVENX.cjs');
require('../shared/better-auth.Ga4lloSW.cjs');
require('@better-auth/core/env');
require('zod');
require('../shared/better-auth.C7Ar55gj.cjs');
require('../shared/better-auth.Bg6iw3ig.cjs');
require('@better-auth/utils/random');
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
require('../shared/better-auth.p4oHeQgF.cjs');
require('kysely');
require('../shared/better-auth.ucn9QAOT.cjs');
require('@better-auth/core/db/adapter');
require('../shared/better-auth.BqdmLEYE.cjs');

const createFieldAttribute = (type, config) => {
  return {
    type,
    ...config
  };
};

exports.convertFromDB = getMigration.convertFromDB;
exports.convertToDB = getMigration.convertToDB;
exports.createInternalAdapter = getMigration.createInternalAdapter;
exports.getAdapter = getMigration.getAdapter;
exports.getMigrations = getMigration.getMigrations;
exports.getSchema = getMigration.getSchema;
exports.getWithHooks = getMigration.getWithHooks;
exports.matchType = getMigration.matchType;
exports.getAuthTables = getTables.getAuthTables;
exports.toZodSchema = toZod.toZodSchema;
exports.mergeSchema = schema.mergeSchema;
exports.parseAccountInput = schema.parseAccountInput;
exports.parseAccountOutput = schema.parseAccountOutput;
exports.parseAdditionalUserInput = schema.parseAdditionalUserInput;
exports.parseInputData = schema.parseInputData;
exports.parseSessionInput = schema.parseSessionInput;
exports.parseSessionOutput = schema.parseSessionOutput;
exports.parseUserInput = schema.parseUserInput;
exports.parseUserOutput = schema.parseUserOutput;
exports.createFieldAttribute = createFieldAttribute;
Object.prototype.hasOwnProperty.call(db, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: db['__proto__']
	});

Object.keys(db).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = db[k];
});
