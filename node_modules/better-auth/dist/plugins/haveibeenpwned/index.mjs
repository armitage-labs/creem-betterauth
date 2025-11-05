import { APIError } from 'better-call';
import '../../shared/better-auth.BX9UB8EP.mjs';
import '../../shared/better-auth.DEBtROF9.mjs';
import 'zod';
import '@better-auth/core/middleware';
import '@better-auth/core/error';
import '@better-auth/core/env';
import '@better-auth/utils/base64';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import '@better-auth/core/db';
import '@better-auth/utils/random';
import { createHash } from '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import '../../shared/better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
import { betterFetch } from '@better-fetch/fetch';
import '../../shared/better-auth.D9_vQR83.mjs';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '../../shared/better-auth.DR3R5wdU.mjs';
import '../../shared/better-auth.Ih8C76Vo.mjs';
import '@better-auth/core/social-providers';
import '../../shared/better-auth.BUPPRXfK.mjs';
import '../../shared/better-auth.Cwj9dt6i.mjs';
import 'defu';
import '../../crypto/index.mjs';
import 'jose/errors';

const ERROR_CODES = {
  PASSWORD_COMPROMISED: "The password you entered has been compromised. Please choose a different password."
};
async function checkPasswordCompromise(password, customMessage) {
  if (!password) return;
  const sha1Hash = (await createHash("SHA-1", "hex").digest(password)).toUpperCase();
  const prefix = sha1Hash.substring(0, 5);
  const suffix = sha1Hash.substring(5);
  try {
    const { data, error } = await betterFetch(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        headers: {
          "Add-Padding": "true",
          "User-Agent": "BetterAuth Password Checker"
        }
      }
    );
    if (error) {
      throw new APIError("INTERNAL_SERVER_ERROR", {
        message: `Failed to check password. Status: ${error.status}`
      });
    }
    const lines = data.split("\n");
    const found = lines.some(
      (line) => line.split(":")[0].toUpperCase() === suffix.toUpperCase()
    );
    if (found) {
      throw new APIError("BAD_REQUEST", {
        message: customMessage || ERROR_CODES.PASSWORD_COMPROMISED,
        code: "PASSWORD_COMPROMISED"
      });
    }
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError("INTERNAL_SERVER_ERROR", {
      message: "Failed to check password. Please try again later."
    });
  }
}
const haveIBeenPwned = (options) => ({
  id: "haveIBeenPwned",
  init(ctx) {
    return {
      context: {
        password: {
          ...ctx.password,
          async hash(password) {
            await checkPasswordCompromise(
              password,
              options?.customPasswordCompromisedMessage
            );
            return ctx.password.hash(password);
          }
        }
      }
    };
  },
  $ERROR_CODES: ERROR_CODES
});

export { haveIBeenPwned };
