import { APIError } from 'better-call';
import '../../shared/better-auth.BX9UB8EP.mjs';
import '../../shared/better-auth.DEBtROF9.mjs';
import * as z from 'zod';
import { createAuthEndpoint } from '@better-auth/core/middleware';
import { s as setSessionCookie } from '../../shared/better-auth.D9_vQR83.mjs';
import '@better-auth/core/error';
import '@better-auth/core/env';
import '@better-auth/core/db';
import { m as mergeSchema } from '../../shared/better-auth.Cwj9dt6i.mjs';
import '@better-auth/utils/random';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import '@better-auth/utils/base64';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import { utf8ToBytes } from '@noble/hashes/utils.js';
import '../../shared/better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
import { g as getOrigin } from '../../shared/better-auth.DR3R5wdU.mjs';
import { keccak_256 } from '@noble/hashes/sha3.js';
import '@better-auth/core/social-providers';
import '../../shared/better-auth.BKEtEpt0.mjs';
import '../../shared/better-auth.CW6D9eSx.mjs';
import '../../shared/better-auth.BUPPRXfK.mjs';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import 'defu';
import '../../crypto/index.mjs';
import 'jose/errors';
import '../../shared/better-auth.Ih8C76Vo.mjs';

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
  const hash = [...keccak_256(utf8ToBytes(address))].map((v) => v.toString(16).padStart(2, "0")).join("");
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
  schema: mergeSchema(schema, options?.schema),
  endpoints: {
    getSiweNonce: createAuthEndpoint(
      "/siwe/nonce",
      {
        method: "POST",
        body: z.object({
          walletAddress: z.string().regex(/^0[xX][a-fA-F0-9]{40}$/i).length(42),
          chainId: z.number().int().positive().max(2147483647).optional().default(1)
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
    verifySiweMessage: createAuthEndpoint(
      "/siwe/verify",
      {
        method: "POST",
        body: z.object({
          message: z.string().min(1),
          signature: z.string().min(1),
          walletAddress: z.string().regex(/^0[xX][a-fA-F0-9]{40}$/i).length(42),
          chainId: z.number().int().positive().max(2147483647).optional().default(1),
          email: z.string().email().optional()
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
          throw new APIError("BAD_REQUEST", {
            message: "Email is required when anonymous is disabled.",
            status: 400
          });
        }
        try {
          const verification = await ctx.context.internalAdapter.findVerificationValue(
            `siwe:${walletAddress}:${chainId}`
          );
          if (!verification || /* @__PURE__ */ new Date() > verification.expiresAt) {
            throw new APIError("UNAUTHORIZED", {
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
            throw new APIError("UNAUTHORIZED", {
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
            const domain = options.emailDomainName ?? getOrigin(ctx.context.baseURL);
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
            throw new APIError("INTERNAL_SERVER_ERROR", {
              message: "Internal Server Error",
              status: 500
            });
          }
          await setSessionCookie(ctx, { session, user });
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
          if (error instanceof APIError) throw error;
          throw new APIError("UNAUTHORIZED", {
            message: "Something went wrong. Please try again later.",
            error: error instanceof Error ? error.message : "Unknown error",
            status: 401
          });
        }
      }
    )
  }
});

export { siwe };
