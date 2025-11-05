import type { BetterAuthPluginDBSchema } from "@better-auth/core/db";
import { mergeSchema } from "better-auth/db";
import { CreemOptions } from "./types";

export const subscriptions = {
  subscription: {
    fields: {
      productId: {
        type: "string",
        required: true,
      },
      referenceId: {
        type: "string",
        required: true,
      },
      creemCustomerId: {
        type: "string",
        required: false,
      },
      creemSubscriptionId: {
        type: "string",
        required: false,
      },
      creemOrderId: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "pending",
      },
      periodStart: {
        type: "date",
        required: false,
      },
      periodEnd: {
        type: "date",
        required: false,
      },
      cancelAtPeriodEnd: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
    },
  },
} satisfies BetterAuthPluginDBSchema;

export const user = {
  user: {
    fields: {
      creemCustomerId: {
        type: "string",
        required: false,
      },
    },
  },
} satisfies BetterAuthPluginDBSchema;

export const getSchema = (options: CreemOptions) => {
  // Default persistSubscriptions to true if not specified
  const shouldPersist = options.persistSubscriptions !== false;

  // Only include schema if persistSubscriptions is enabled
  const baseSchema = shouldPersist
    ? {
        ...subscriptions,
        ...user,
      }
    : {};

  return mergeSchema(baseSchema, options.schema);
};
