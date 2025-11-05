'use strict';

const oauth2 = require('@better-auth/core/oauth2');
const toAuthEndpoints = require('../shared/better-auth.b10rFcs4.cjs');
require('zod');
require('../shared/better-auth.CwvSb6A4.cjs');
require('@better-auth/core/error');
require('../shared/better-auth.C1hdVENX.cjs');
require('@better-auth/core/env');
require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
require('../shared/better-auth.C7Ar55gj.cjs');
require('../shared/better-auth.Z-JVyRjt.cjs');
require('@better-auth/utils/binary');
require('../shared/better-auth.CqgkAe9n.cjs');
require('better-call');
require('@better-auth/core/middleware');
require('@better-auth/utils/random');
require('@better-auth/core/social-providers');
require('../shared/better-auth.BimfmAGe.cjs');
require('../shared/better-auth.Bg6iw3ig.cjs');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
require('../shared/better-auth.CYeOI8C-.cjs');
require('../shared/better-auth.D2XP_nbx.cjs');
require('@better-auth/core/db');
require('kysely');
require('@better-auth/core/db/adapter');
require('defu');
require('../crypto/index.cjs');
require('jose/errors');



exports.decryptOAuthToken = toAuthEndpoints.decryptOAuthToken;
exports.generateState = toAuthEndpoints.generateState;
exports.handleOAuthUserInfo = toAuthEndpoints.handleOAuthUserInfo;
exports.parseState = toAuthEndpoints.parseState;
exports.setTokenUtil = toAuthEndpoints.setTokenUtil;
Object.prototype.hasOwnProperty.call(oauth2, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: oauth2['__proto__']
	});

Object.keys(oauth2).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = oauth2[k];
});
