'use strict';

const socialProviders = require('@better-auth/core/social-providers');



Object.prototype.hasOwnProperty.call(socialProviders, '__proto__') &&
	!Object.prototype.hasOwnProperty.call(exports, '__proto__') &&
	Object.defineProperty(exports, '__proto__', {
		enumerable: true,
		value: socialProviders['__proto__']
	});

Object.keys(socialProviders).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = socialProviders[k];
});
