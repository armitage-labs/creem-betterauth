import { createHash } from '@better-auth/utils/hash';
import { xchacha20poly1305 } from '@noble/ciphers/chacha.js';
import { utf8ToBytes, managedNonce, bytesToHex, hexToBytes as hexToBytes$1 } from '@noble/ciphers/utils.js';
import { base64 } from '@better-auth/utils/base64';
import { SignJWT } from 'jose';
import { scryptAsync } from '@noble/hashes/scrypt.js';
import { hex } from '@better-auth/utils/hex';
import { hexToBytes } from '@noble/hashes/utils.js';
import { BetterAuthError } from '@better-auth/core/error';
export { g as generateRandomString } from '../shared/better-auth.B4Qoxdgc.mjs';
import '@better-auth/utils/random';

async function signJWT(payload, secret, expiresIn = 3600) {
  const jwt = await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + expiresIn).sign(new TextEncoder().encode(secret));
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
  const buffer = await createHash("SHA-256").digest(data);
  return base64.encode(buffer);
}
async function compareHash(data, hash) {
  const buffer = await createHash("SHA-256").digest(
    typeof data === "string" ? new TextEncoder().encode(data) : data
  );
  const hashBuffer = base64.decode(hash);
  return constantTimeEqual(buffer, hashBuffer);
}

const config = {
  N: 16384,
  r: 16,
  p: 1,
  dkLen: 64
};
async function generateKey(password, salt) {
  return await scryptAsync(password.normalize("NFKC"), salt, {
    N: config.N,
    p: config.p,
    r: config.r,
    dkLen: config.dkLen,
    maxmem: 128 * config.N * config.r * 2
  });
}
const hashPassword = async (password) => {
  const salt = hex.encode(crypto.getRandomValues(new Uint8Array(16)));
  const key = await generateKey(password, salt);
  return `${salt}:${hex.encode(key)}`;
};
const verifyPassword = async ({
  hash,
  password
}) => {
  const [salt, key] = hash.split(":");
  if (!salt || !key) {
    throw new BetterAuthError("Invalid password hash");
  }
  const targetKey = await generateKey(password, salt);
  return constantTimeEqual(targetKey, hexToBytes(key));
};

const symmetricEncrypt = async ({
  key,
  data
}) => {
  const keyAsBytes = await createHash("SHA-256").digest(key);
  const dataAsBytes = utf8ToBytes(data);
  const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return bytesToHex(chacha.encrypt(dataAsBytes));
};
const symmetricDecrypt = async ({
  key,
  data
}) => {
  const keyAsBytes = await createHash("SHA-256").digest(key);
  const dataAsBytes = hexToBytes$1(data);
  const chacha = managedNonce(xchacha20poly1305)(new Uint8Array(keyAsBytes));
  return new TextDecoder().decode(chacha.decrypt(dataAsBytes));
};

export { compareHash, constantTimeEqual, hashPassword, hashToBase64, signJWT, symmetricDecrypt, symmetricEncrypt, verifyPassword };
