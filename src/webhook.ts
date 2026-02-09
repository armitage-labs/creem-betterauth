import type { GenericEndpointContext } from "better-auth";
import { createAuthEndpoint } from "better-auth/api";
import {
	onCheckoutCompleted,
	onSubscriptionActive,
	onSubscriptionCanceled,
	onSubscriptionExpired,
	onSubscriptionPaid,
	onSubscriptionPastDue,
	onSubscriptionPaused,
	onSubscriptionTrialing,
	onSubscriptionUnpaid,
	onSubscriptionUpdate,
} from "./hooks.js";
import type { CreemOptions } from "./types.js";
import { generateSignature, parseWebhookEvent } from "./utils.js";

const createWebhookHandler = (options: CreemOptions) => {
	return async (ctx: GenericEndpointContext) => {
		try {
			if (!ctx.request) {
				return ctx.json({ error: "Request is required" }, { status: 400 });
			}

			const buf = await ctx.request.text();

			const signature = ctx.request.headers.get("creem-signature");

			if (!options.webhookSecret) {
				return ctx.json({ error: "Invalid signature" }, { status: 400 });
			}

			const computedSignature = await generateSignature(
				buf,
				options.webhookSecret,
			);
			if (computedSignature !== signature) {
				return ctx.json({ error: "Invalid signature" }, { status: 400 });
			}

			const event = parseWebhookEvent(buf);

			// TypeScript now knows the exact event type in each case
			// The parsed event from Creem webhooks always has expanded objects
			// We flatten the structure for easier destructuring in callbacks
			switch (event.eventType) {
				case "checkout.completed":
					await onCheckoutCompleted(ctx, event, options);
					await options.onCheckoutCompleted?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				case "refund.created":
					await options.onRefundCreated?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				case "dispute.created":
					await options.onDisputeCreated?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				case "subscription.active":
					await onSubscriptionActive(ctx, event, options);
					await options.onGrantAccess?.(ctx, {
						reason: "subscription_active",
						...event.object,
					});
					await options.onSubscriptionActive?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				case "subscription.trialing":
					await onSubscriptionTrialing(ctx, event, options);
					await options.onGrantAccess?.(ctx, {
						reason: "subscription_trialing",
						...event.object,
					});
					await options.onSubscriptionTrialing?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});

					break;
				case "subscription.canceled":
					await onSubscriptionCanceled(ctx, event, options);
					await options.onSubscriptionCanceled?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				case "subscription.paid":
					await onSubscriptionPaid(ctx, event, options);
					await options.onGrantAccess?.(ctx, {
						reason: "subscription_paid",
						...event.object,
					});
					await options.onSubscriptionPaid?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				case "subscription.expired":
					await onSubscriptionExpired(ctx, event, options);
					await options.onRevokeAccess?.(ctx, {
						reason: "subscription_expired",
						...event.object,
					});
					await options.onSubscriptionExpired?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				case "subscription.unpaid":
					await onSubscriptionUnpaid(ctx, event, options);
					await options.onSubscriptionUnpaid?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				case "subscription.update":
					await onSubscriptionUpdate(ctx, event, options);
					await options.onSubscriptionUpdate?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				case "subscription.past_due":
					await onSubscriptionPastDue(ctx, event, options);
					await options.onSubscriptionPastDue?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				case "subscription.paused":
					await onSubscriptionPaused(ctx, event, options);
					await options.onRevokeAccess?.(ctx, {
						reason: "subscription_paused",
						...event.object,
					});
					await options.onSubscriptionPaused?.(ctx, {
						webhookEventType: event.eventType,
						webhookId: event.id,
						webhookCreatedAt: event.created_at,
						...event.object,
					});
					break;

				default:
					ctx.json({ error: "Unknown event type" }, { status: 400 });
					break;
			}

			return ctx.json({ message: "Webhook received" });
		} catch {
			return ctx.json({ error: "Failed to process webhook" }, { status: 500 });
		}
	};
};

export const createWebhookEndpoint = (options: CreemOptions) => {
	return createAuthEndpoint(
		"/creem/webhook",
		{
			method: "POST",
			requireRequest: true,
			requireHeaders: true,
			disableBody: true,
		},
		createWebhookHandler(options),
	);
};
