import type { BetterAuthPluginDBSchema } from "better-auth";
import { mergeSchema } from "better-auth/db";
import type { CreemOptions } from "./types.js";

export const subscriptions = {
	creem_subscription: {
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
			/**
			 * Tracks whether this user has ever used a trial period.
			 * Used for automatic trial abuse prevention - users can only
			 * receive one trial across all subscription plans.
			 *
			 * This field is:
			 * - Optional (required: false) for backward compatibility with existing users
			 * - Defaults to false for new users
			 * - Set to true when user enters a trialing subscription state
			 *
			 * @since 1.1.0
			 */
			hadTrial: {
				type: "boolean",
				required: false,
				defaultValue: false,
			},
		},
	},
} satisfies BetterAuthPluginDBSchema;

type GetSchemaResult<T extends CreemOptions> =
	T["persistSubscriptions"] extends false
		? undefined
		: typeof user & typeof subscriptions;

export function getSchema<T extends CreemOptions>(
	options: T,
): GetSchemaResult<T> {
	if (options.persistSubscriptions === false) {
		return undefined as GetSchemaResult<T>;
	}

	// Default persistSubscriptions to true if not specified
	return mergeSchema(
		{
			...subscriptions,
			...user,
		},
		options.schema,
	) as GetSchemaResult<T>;
}
