export * from '@better-auth/core/db';
export { d as convertFromDB, b as convertToDB, c as createInternalAdapter, a as getAdapter, e as getMigrations, f as getSchema, g as getWithHooks, m as matchType } from '../shared/better-auth.BG42OQGC.mjs';
export { g as getAuthTables } from '../shared/better-auth.pQjeRkzN.mjs';
export { t as toZodSchema } from '../shared/better-auth.BxexnJiR.mjs';
export { m as mergeSchema, f as parseAccountInput, a as parseAccountOutput, e as parseAdditionalUserInput, c as parseInputData, g as parseSessionInput, b as parseSessionOutput, d as parseUserInput, p as parseUserOutput } from '../shared/better-auth.Cwj9dt6i.mjs';
import '../shared/better-auth.CW6D9eSx.mjs';
import '../shared/better-auth.ClH5r3NH.mjs';
import '@better-auth/core/env';
import 'zod';
import '../shared/better-auth.BKEtEpt0.mjs';
import '../shared/better-auth.BUPPRXfK.mjs';
import '@better-auth/utils/random';
import 'better-call';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import '@better-auth/utils/base64';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import '@better-auth/core/error';
import '../shared/better-auth.B4Qoxdgc.mjs';
import '../shared/better-auth.CBTS2OzX.mjs';
import 'kysely';
import '../shared/better-auth.EBxKeVNZ.mjs';
import '@better-auth/core/db/adapter';
import '../shared/better-auth.BNpIwq4C.mjs';

const createFieldAttribute = (type, config) => {
  return {
    type,
    ...config
  };
};

export { createFieldAttribute };
