'use strict';

const utils = require('@better-auth/core/utils');

const EXTERNAL_ERROR_CODES = utils.defineErrorCodes({
  VERIFICATION_FAILED: "Captcha verification failed",
  MISSING_RESPONSE: "Missing CAPTCHA response",
  UNKNOWN_ERROR: "Something went wrong"
});
const INTERNAL_ERROR_CODES = utils.defineErrorCodes({
  MISSING_SECRET_KEY: "Missing secret key",
  SERVICE_UNAVAILABLE: "CAPTCHA service unavailable"
});

exports.EXTERNAL_ERROR_CODES = EXTERNAL_ERROR_CODES;
exports.INTERNAL_ERROR_CODES = INTERNAL_ERROR_CODES;
