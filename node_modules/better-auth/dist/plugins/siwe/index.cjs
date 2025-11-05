'use strict';

const betterCall = require('better-call');
require('../../shared/better-auth.b10rFcs4.cjs');
require('../../shared/better-auth.BimfmAGe.cjs');
const z = require('zod');
const middleware = require('@better-auth/core/middleware');
const cookies_index = require('../../shared/better-auth.CwvSb6A4.cjs');
require('@better-auth/core/error');
require('@better-auth/core/env');
require('@better-auth/core/db');
const schema$1 = require('../../shared/better-auth.D2XP_nbx.cjs');
require('@better-auth/utils/random');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('@better-auth/utils/base64');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
const utils_js = require('@noble/hashes/utils.js');
require('../../shared/better-auth.CYeOI8C-.cjs');
require('kysely');
require('@better-auth/core/db/adapter');
const url = require('../../shared/better-auth.Z-JVyRjt.cjs');
const sha3_js = require('@noble/hashes/sha3.js');
require('@better-auth/core/social-providers');
require('../../shared/better-auth.C7Ar55gj.cjs');
require('../../shared/better-auth.C1hdVENX.cjs');
require('../../shared/better-auth.Bg6iw3ig.cjs');
require('@better-auth/utils/hmac');
require('@better-auth/utils/binary');
require('defu');
require('../../crypto/index.cjs');
require('jose/errors');
require('../../shared/better-auth.CqgkAe9n.cjs');

function _interopNamespaceCompat(e) {
	if (e && typeof e === 'object' && 'default' in e) return e;
	const n = Object.create(null);
	if (e) {
		for (const k in e) {
			n[k] = e[k];
		}
	}
	n.default = e;
	return n;
}

const z__namespace = /*#__PURE__*/_interopNamespaceCompat(z);

const schema = {
  walletAddress: {
    fields: {
      userId: {
        type: "string",
        references: {
          model: "user",
          field: "id"
        },
        required: true
      },
      address: {
        type: "string",
        required: true
      },
      chainId: {
        type: "number",
        required: true
      },
      isPrimary: {
        type: "boolean",
        defaultValue: false
      },
      createdAt: {
        type: "date",
        required: true
      }
    }
  }
};

function toChecksumAddress(address) {
  address = address.toLowerCase().replace("0x", "");
  const hash = [...sha3_js.keccak_256(utils_js.utf8ToBytes(address))].map((v) => v.toString(16).padStart(2, "0")).join("");
  let ret = "0x";
  for (let i = 0; i < 40; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }
  return ret;
}

const siwe = (options) => ({
  id: "siwe",
  schema: schema$1.mergeSchema(schema, options?.schema),
  endpoints: {
    getSiweNonce: middleware.createAuthEndpoint(
      "/siwe/nonce",
      {
        method: "POST",
        body: z__namespace.object({
          walletAddress: z__namespace.string().regex(/^0[xX][a-fA-F0-9]{40}$/i).length(42),
          chainId: z__namespace.number().int().positive().max(2147483647).optional().default(1)
          // Default to Ethereum mainnet
        })
      },
      async (ctx) => {
        const { walletAddress: rawWalletAddress, chainId } = ctx.body;
        const walletAddress = toChecksumAddress(rawWalletAddress);
        const nonce = await options.getNonce();
        await ctx.context.internalAdapter.createVerificationValue({
          identifier: `siwe:${walletAddress}:${chainId}`,
          value: nonce,
          expiresAt: new Date(Date.now() + 15 * 60 * 1e3)
        });
        return ctx.json({ nonce });
      }
    ),
    verifySiweMessage: middleware.createAuthEndpoint(
      "/siwe/verify",
      {
        method: "POST",
        body: z__namespace.object({
          message: z__namespace.string().min(1),
          signature: z__namespace.string().min(1),
          walletAddress: z__namespace.string().regex(/^0[xX][a-fA-F0-9]{40}$/i).length(42),
          chainId: z__namespace.number().int().positive().max(2147483647).optional().default(1),
          email: z__namespace.string().email().optional()
        }).refine((data) => options.anonymous !== false || !!data.email, {
          message: "Email is required when the anonymous plugin option is disabled.",
          path: ["email"]
        }),
        requireRequest: true
      },
      async (ctx) => {
        const {
          message,
          signature,
          walletAddress: rawWalletAddress,
          chainId,
          email
        } = ctx.body;
        const walletAddress = toChecksumAddress(rawWalletAddress);
        const isAnon = options.anonymous ?? true;
        if (!isAnon && !email) {
          throw new betterCall.APIError("BAD_REQUEST", {
            message: "Email is required when anonymous is disabled.",
            status: 400
          });
        }
        try {
          const verification = await ctx.context.internalAdapter.findVerificationValue(
            `siwe:${walletAddress}:${chainId}`
          );
          if (!verification || /* @__PURE__ */ new Date() > verification.expiresAt) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: "Unauthorized: Invalid or expired nonce",
              status: 401,
              code: "UNAUTHORIZED_INVALID_OR_EXPIRED_NONCE"
            });
          }
          const { value: nonce } = verification;
          const verified = await options.verifyMessage({
            message,
            signature,
            address: walletAddress,
            chainId,
            cacao: {
              h: { t: "caip122" },
              p: {
                domain: options.domain,
                aud: options.domain,
                nonce,
                iss: options.domain,
                version: "1"
              },
              s: { t: "eip191", s: signature }
            }
          });
          if (!verified) {
            throw new betterCall.APIError("UNAUTHORIZED", {
              message: "Unauthorized: Invalid SIWE signature",
              status: 401
            });
          }
          await ctx.context.internalAdapter.deleteVerificationValue(
            verification.id
          );
          let user = null;
          const existingWalletAddress = await ctx.context.adapter.findOne({
            model: "walletAddress",
            where: [
              { field: "address", operator: "eq", value: walletAddress },
              { field: "chainId", operator: "eq", value: chainId }
            ]
          });
          if (existingWalletAddress) {
            user = await ctx.context.adapter.findOne({
              model: "user",
              where: [
                {
                  field: "id",
                  operator: "eq",
                  value: existingWalletAddress.userId
                }
              ]
            });
          } else {
            const anyWalletAddress = await ctx.context.adapter.findOne({
              model: "walletAddress",
              where: [
                { field: "address", operator: "eq", value: walletAddress }
              ]
            });
            if (anyWalletAddress) {
              user = await ctx.context.adapter.findOne({
                model: "user",
                where: [
                  {
                    field: "id",
                    operator: "eq",
                    value: anyWalletAddress.userId
                  }
                ]
              });
            }
          }
          if (!user) {
            const domain = options.emailDomainName ?? url.getOrigin(ctx.context.baseURL);
            const userEmail = !isAnon && email ? email : `${walletAddress}@${domain}`;
            const { name, avatar } = await options.ensLookup?.({ walletAddress }) ?? {};
            user = await ctx.context.internalAdapter.createUser({
              name: name ?? walletAddress,
              email: userEmail,
              image: avatar ?? ""
            });
            await ctx.context.adapter.create({
              model: "walletAddress",
              data: {
                userId: user.id,
                address: walletAddress,
                chainId,
                isPrimary: true,
                // First address is primary
                createdAt: /* @__PURE__ */ new Date()
              }
            });
            await ctx.context.internalAdapter.createAccount({
              userId: user.id,
              providerId: "siwe",
              accountId: `${walletAddress}:${chainId}`,
              createdAt: /* @__PURE__ */ new Date(),
              updatedAt: /* @__PURE__ */ new Date()
            });
          } else {
            if (!existingWalletAddress) {
              await ctx.context.adapter.create({
                model: "walletAddress",
                data: {
                  userId: user.id,
                  address: walletAddress,
                  chainId,
                  isPrimary: false,
                  // Additional addresses are not primary by default
                  createdAt: /* @__PURE__ */ new Date()
                }
              });
              await ctx.context.internalAdapter.createAccount({
                userId: user.id,
                providerId: "siwe",
                accountId: `${walletAddress}:${chainId}`,
                createdAt: /* @__PURE__ */ new Date(),
                updatedAt: /* @__PURE__ */ new Date()
              });
            }
          }
          const session = await ctx.context.internalAdapter.createSession(
            user.id,
            ctx
          );
          if (!session) {
            throw new betterCall.APIError("INTERNAL_SERVER_ERROR", {
              message: "Internal Server Error",
              status: 500
            });
          }
          await cookies_index.setSessionCookie(ctx, { session, user });
          return ctx.json({
            token: session.token,
            success: true,
            user: {
              id: user.id,
              walletAddress,
              chainId
            }
          });
        } catch (error) {
          if (error instanceof betterCall.APIError) throw error;
          throw new betterCall.APIError("UNAUTHORIZED", {
            message: "Something went wrong. Please try again later.",
            error: error instanceof Error ? error.message : "Unknown error",
            status: 401
          });
        }
      }
    )
  }
});

exports.siwe = siwe;
