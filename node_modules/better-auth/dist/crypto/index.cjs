'use strict';

const hash = require('@better-auth/utils/hash');
const chacha_js = require('@noble/ciphers/chacha.js');
const utils_js$1 = require('@noble/ciphers/utils.js');
const base64 = require('@better-auth/utils/base64');
const jose = require('jose');
const scrypt_js = require('@noble/hashes/scrypt.js');
const hex = require('@better-auth/utils/hex');
const utils_js = require('@noble/hashes/utils.js');
const error = require('@better-auth/core/error');
const random = require('../shared/better-auth.CYeOI8C-.cjs');
require('@better-auth/utils/random');

async function signJWT(payload, secret, expiresIn = 3600) {
  const jwt = await new jose.SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
  return jwt;
}

function constantTimeEqual(a, b) {
  const aBuffer = new Uint8Array(a);
  const bBuffer = new Uint8Array(b);
  let c = aBuffer.length ^ bBuffer.length;
  const length = Math.max(aBuffer.length, bBuffer.length);
  for (let i = 0; i < length; i++) {
    c |= (i < aBuffer.length ? aBuffer[i] : 0) ^ (i < bBuffer.length ? bBuffer[i] : 0);
  }
  return c === 0;
}

async function hashToBase64(data) {
  const buffer = await hash.createHash("SHA-256").digest(data);
  return base64.base64.encode(buffer);
}
async function compareHash(data, hash$1) {
  const buffer = await hash.createHash("SHA-256").digest(
    typeof data === "string" ? new TextEncoder().encode(data) : data
  );
  const hashBuffer = base64.base64.decode(hash$1);
  return constantTimeEqual(buffer, hashBuffer);
}

const config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64
};
async function generateKey(password, salt) {
  return await scrypt_js.scryptAsync(password.normalize("NFKC"), salt, {
    N: config.N,
    p: config.p,
    r: config.r,
    dkLen: config.dkLen,
    maxmem: 128 * config.N * config.r * 2
  });
}
const hashPassword = async (password) => {
  const salt = hex.hex.encode(crypto.getRandomValues(new Uint8Array(16)));
  const key = await generateKey(password, salt);
  return `${salt}:${hex.hex.encode(key)}`;
};
const verifyPassword = async ({
  hash,
  password
}) => {
  const [salt, key] = hash.split(":");
  if (!salt || !key) {
    throw new error.BetterAuthError("Invalid password hash");
  }
  const targetKey = await generateKey(password, salt);
  return constantTimeEqual(targetKey, utils_js.hexToBytes(key));
};

const symmetricEncrypt = async ({
  key,
  data
}) => {
  const keyAsBytes = await hash.createHash("SHA-256").digest(key);
  const dataAsBytes = utils_js$1.utf8ToBytes(data);
  const chacha = utils_js$1.managedNonce(chacha_js.xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return utils_js$1.bytesToHex(chacha.encrypt(dataAsBytes));
};
const symmetricDecrypt = async ({
  key,
  data
}) => {
  const keyAsBytes = await hash.createHash("SHA-256").digest(key);
  const dataAsBytes = utils_js$1.hexToBytes(data);
  const chacha = utils_js$1.managedNonce(chacha_js.xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
};

exports.generateRandomString = random.generateRandomString;
exports.compareHash = compareHash;
exports.constantTimeEqual = constantTimeEqual;
exports.hashPassword = hashPassword;
exports.hashToBase64 = hashToBase64;
exports.signJWT = signJWT;
exports.symmetricDecrypt = symmetricDecrypt;
exports.symmetricEncrypt = symmetricEncrypt;
exports.verifyPassword = verifyPassword;
