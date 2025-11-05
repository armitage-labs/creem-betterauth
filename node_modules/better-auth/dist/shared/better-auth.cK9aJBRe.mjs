import { defineErrorCodes } from '@better-auth/core/utils';

const EXTERNAL_ERROR_CODES = defineErrorCodes({
  VERIFICATION_FAILED: "Captcha verification failed",
  MISSING_RESPONSE: "Missing CAPTCHA response",
  UNKNOWN_ERROR: "Something went wrong"
});
const INTERNAL_ERROR_CODES = defineErrorCodes({
  MISSING_SECRET_KEY: "Missing secret key",
  SERVICE_UNAVAILABLE: "CAPTCHA service unavailable"
});

export { EXTERNAL_ERROR_CODES as E, INTERNAL_ERROR_CODES as I };
