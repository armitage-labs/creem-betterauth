'use strict';

const adapters_index = require('../index.cjs');
const mongodbAdapter = require('../../shared/better-auth.1MXuH8OR.cjs');
const adapter = require('@better-auth/core/db/adapter');
const index = require('../../shared/better-auth.ucn9QAOT.cjs');
require('mongodb');
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
require('@better-auth/core/error');
require('../../shared/better-auth.CYeOI8C-.cjs');



exports.createAdapter = adapters_index.createAdapter;
exports.mongodbAdapter = mongodbAdapter.mongodbAdapter;
exports.createAdapterFactory = index.createAdapterFactory;
Object.prototype.hasOwnProperty.call(adapter, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: adapter['__proto__']
	});

Object.keys(adapter).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = adapter[k];
});
