'use strict';

const env = require('@better-auth/core/env');
const core = require('@better-auth/core');
const oauth2 = require('@better-auth/core/oauth2');
const error = require('@better-auth/core/error');
const utils = require('@better-auth/core/utils');
const auth = require('./shared/better-auth.Bm2ACBtW.cjs');
const misc = require('./shared/better-auth.BLDOwz3i.cjs');
const toAuthEndpoints = require('./shared/better-auth.b10rFcs4.cjs');
const id = require('./shared/better-auth.Bg6iw3ig.cjs');
const telemetry = require('@better-auth/telemetry');
const betterCall = require('better-call');
require('./shared/better-auth.BimfmAGe.cjs');
require('zod');
require('@better-auth/core/middleware');
require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
require('@better-auth/utils/binary');
require('@better-auth/core/db');
require('kysely');
require('@better-auth/core/db/adapter');
require('./api/index.cjs');
require('./shared/better-auth.CwvSb6A4.cjs');
require('./shared/better-auth.C1hdVENX.cjs');
require('./shared/better-auth.C7Ar55gj.cjs');
require('./shared/better-auth.Z-JVyRjt.cjs');
require('./shared/better-auth.CqgkAe9n.cjs');
require('./shared/better-auth.D2XP_nbx.cjs');
require('@better-auth/utils/random');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
require('./shared/better-auth.CYeOI8C-.cjs');
require('./shared/better-auth.Ga4lloSW.cjs');
require('defu');
require('./crypto/index.cjs');
require('./shared/better-auth.DhHADHGp.cjs');
require('./shared/better-auth.DAHECDyM.cjs');
require('./shared/better-auth.p4oHeQgF.cjs');
require('./shared/better-auth.ucn9QAOT.cjs');
require('./shared/better-auth.BqdmLEYE.cjs');
require('@better-auth/core/social-providers');
require('./shared/better-auth.CDXNofOe.cjs');
require('jose/errors');



exports.betterAuth = auth.betterAuth;
exports.capitalizeFirstLetter = misc.capitalizeFirstLetter;
exports.HIDE_METADATA = toAuthEndpoints.HIDE_METADATA;
exports.generateState = toAuthEndpoints.generateState;
exports.parseState = toAuthEndpoints.parseState;
exports.generateId = id.generateId;
exports.createTelemetry = telemetry.createTelemetry;
exports.getTelemetryAuthConfig = telemetry.getTelemetryAuthConfig;
exports.APIError = betterCall.APIError;
Object.prototype.hasOwnProperty.call(env, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: env['__proto__']
	});

Object.keys(env).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = env[k];
});
Object.prototype.hasOwnProperty.call(core, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: core['__proto__']
	});

Object.keys(core).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = core[k];
});
Object.prototype.hasOwnProperty.call(oauth2, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: oauth2['__proto__']
	});

Object.keys(oauth2).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = oauth2[k];
});
Object.prototype.hasOwnProperty.call(error, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: error['__proto__']
	});

Object.keys(error).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = error[k];
});
Object.prototype.hasOwnProperty.call(utils, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: utils['__proto__']
	});

Object.keys(utils).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = utils[k];
});
