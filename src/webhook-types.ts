/**
 * Creem Webhook Types
 *
 * This file contains all the TypeScript types needed to work with Creem webhooks.
 */

import type {
	Checkbox as CheckboxFromSdk,
	CheckoutEntity as CheckoutEntityFromSdk,
	Status as CheckoutStatusFromSdk,
	CustomerEntity as CustomerEntityFromSdk,
	CustomField as CustomFieldFromSdk,
	FeatureEntity as FeatureEntityFromSdk,
	LicenseEntity as LicenseEntityFromSdk,
	OrderEntity as OrderEntityFromSdk,
	ProductEntity as ProductEntityFromSdk,
	ProductFeatureEntity as ProductFeatureEntityFromSdk,
	SubscriptionEntity as SubscriptionEntityFromSdk,
	SubscriptionItemEntity as SubscriptionItemEntityFromSdk,
	SubscriptionStatus as SubscriptionStatusFromSdk,
	Text as TextFromSdk,
	TransactionEntity as TransactionEntityFromSdk,
} from "creem/models/components";

type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
	? `${T extends Uncapitalize<T> ? T : `_${Lowercase<T>}`}${CamelToSnakeCase<U>}`
	: S;

type SnakeCaseKeys<T> = {
	[K in keyof T as CamelToSnakeCase<K & string>]: T[K];
};

type Checkbox = SnakeCaseKeys<CheckboxFromSdk>;
type CheckoutEntity = SnakeCaseKeys<CheckoutEntityFromSdk>;
type CheckoutStatus = SnakeCaseKeys<CheckoutStatusFromSdk>;
type CustomerEntity = SnakeCaseKeys<CustomerEntityFromSdk>;
type CustomField = SnakeCaseKeys<CustomFieldFromSdk>;
type FeatureEntity = SnakeCaseKeys<FeatureEntityFromSdk>;
type LicenseEntity = SnakeCaseKeys<LicenseEntityFromSdk>;
type OrderEntity = SnakeCaseKeys<OrderEntityFromSdk>;
type ProductEntity = SnakeCaseKeys<ProductEntityFromSdk>;
type ProductFeatureEntity = SnakeCaseKeys<ProductFeatureEntityFromSdk>;
type SubscriptionEntity = SnakeCaseKeys<SubscriptionEntityFromSdk> & {
	metadata?: Metadata;
};
type SubscriptionItemEntity = SnakeCaseKeys<SubscriptionItemEntityFromSdk>;
type SubscriptionStatus = SnakeCaseKeys<SubscriptionStatusFromSdk>;
type Text = SnakeCaseKeys<TextFromSdk>;
type TransactionEntity = SnakeCaseKeys<TransactionEntityFromSdk>;

export type {
	Checkbox,
	CheckoutEntity,
	CheckoutStatus,
	CustomerEntity,
	CustomField,
	FeatureEntity,
	LicenseEntity,
	OrderEntity,
	ProductEntity,
	ProductFeatureEntity,
	SubscriptionEntity,
	SubscriptionItemEntity,
	SubscriptionStatus,
	Text,
	TransactionEntity,
};

// ============================================================================
// Base Types
// ============================================================================

/**
 * Metadata type for storing arbitrary key-value pairs
 */
export type Metadata = Record<string, string | number | null>;

/**
 * Base entity interface that all webhook objects extend
 */
export interface BaseEntity {
	/** Unique identifier for the object */
	id: string;
	/** Environment mode: test, prod, or sandbox */
	mode: "test" | "prod" | "sandbox";
}

// ============================================================================
// License Entities
// ============================================================================

export interface LicenseInstanceEntity extends BaseEntity {
	/** String representing the object's type */
	object: "license-instance";
	/** The name of the license instance */
	name: string;
	/** The status of the license instance */
	status: "active" | "deactivated";
	/** The creation date of the license instance */
	created_at: Date;
}

// ============================================================================
// Refund Entity
// ============================================================================

export interface RefundEntity extends BaseEntity {
	/** String representing the object's type */
	object: "refund";
	/** Status of the refund */
	status: "pending" | "succeeded" | "canceled" | "failed";
	/** The refunded amount in cents. 1000 = $10.00 */
	refund_amount: number;
	/** Three-letter ISO currency code, in uppercase */
	refund_currency: string;
	/** Reason for the refund */
	reason: "duplicate" | "fraudulent" | "requested_by_customer" | "other";
	/** The transaction associated with the refund */
	transaction: TransactionEntity;
	/** The checkout associated with the refund */
	checkout?: CheckoutEntity | string;
	/** The order associated with the refund */
	order?: OrderEntity | string;
	/** The subscription associated with the refund */
	subscription?: SubscriptionEntity | string;
	/** The customer associated with the refund */
	customer?: CustomerEntity | string;
	/** Creation date as timestamp */
	created_at: number;
}

// ============================================================================
// Dispute Entity
// ============================================================================

export interface DisputeEntity extends BaseEntity {
	/** String representing the object's type */
	object: "dispute";
	/** The disputed amount in cents. 1000 = $10.00 */
	amount: number;
	/** Three-letter ISO currency code, in uppercase */
	currency: string;
	/** The transaction associated with the dispute */
	transaction: TransactionEntity;
	/** The checkout associated with the dispute */
	checkout?: CheckoutEntity | string;
	/** The order associated with the dispute */
	order?: OrderEntity | string;
	/** The subscription associated with the dispute */
	subscription?: SubscriptionEntity | string;
	/** The customer associated with the dispute */
	customer?: CustomerEntity | string;
	/** Creation date as timestamp */
	created_at: number;
}

// ============================================================================
// Webhook Event Types
// ============================================================================

/**
 * All possible webhook event types in Creem
 */
export type WebhookEventType =
	| "checkout.completed"
	| "refund.created"
	| "dispute.created"
	| "subscription.active"
	| "subscription.trialing"
	| "subscription.canceled"
	| "subscription.paid"
	| "subscription.expired"
	| "subscription.unpaid"
	| "subscription.update"
	| "subscription.past_due"
	| "subscription.paused";

/**
 * Main webhook event structure (generic)
 */
export interface WebhookEventEntity {
	/** The event name */
	eventType: WebhookEventType;
	/** Unique identifier for the event */
	id: string;
	/** Creation date of the event as timestamp */
	created_at: number;
	/** Object related to the event */
	object:
		| CheckoutEntity
		| CustomerEntity
		| OrderEntity
		| ProductEntity
		| SubscriptionEntity
		| RefundEntity
		| DisputeEntity
		| TransactionEntity;
}

// ============================================================================
// Discriminated Union Types (for type-safe webhook handling)
// ============================================================================

/**
 * Checkout completed event - contains a CheckoutEntity
 */
export interface CheckoutCompletedEvent {
	eventType: "checkout.completed";
	id: string;
	created_at: number;
	object: CheckoutEntity;
}

/**
 * Refund created event - contains a RefundEntity
 */
export interface RefundCreatedEvent {
	eventType: "refund.created";
	id: string;
	created_at: number;
	object: RefundEntity;
}

/**
 * Dispute created event - contains a DisputeEntity
 */
export interface DisputeCreatedEvent {
	eventType: "dispute.created";
	id: string;
	created_at: number;
	object: DisputeEntity;
}

/**
 * Subscription active event - contains a SubscriptionEntity
 */
export interface SubscriptionActiveEvent {
	eventType: "subscription.active";
	id: string;
	created_at: number;
	object: SubscriptionEntity;
}

/**
 * Subscription trialing event - contains a SubscriptionEntity
 */
export interface SubscriptionTrialingEvent {
	eventType: "subscription.trialing";
	id: string;
	created_at: number;
	object: SubscriptionEntity;
}

/**
 * Subscription canceled event - contains a SubscriptionEntity
 */
export interface SubscriptionCanceledEvent {
	eventType: "subscription.canceled";
	id: string;
	created_at: number;
	object: SubscriptionEntity;
}

/**
 * Subscription paid event - contains a SubscriptionEntity
 */
export interface SubscriptionPaidEvent {
	eventType: "subscription.paid";
	id: string;
	created_at: number;
	object: SubscriptionEntity;
}

/**
 * Subscription expired event - contains a SubscriptionEntity
 */
export interface SubscriptionExpiredEvent {
	eventType: "subscription.expired";
	id: string;
	created_at: number;
	object: SubscriptionEntity;
}

/**
 * Subscription unpaid event - contains a SubscriptionEntity
 */
export interface SubscriptionUnpaidEvent {
	eventType: "subscription.unpaid";
	id: string;
	created_at: number;
	object: SubscriptionEntity;
}

/**
 * Subscription update event - contains a SubscriptionEntity
 */
export interface SubscriptionUpdateEvent {
	eventType: "subscription.update";
	id: string;
	created_at: number;
	object: SubscriptionEntity;
}

/**
 * Subscription past due event - contains a SubscriptionEntity
 */
export interface SubscriptionPastDueEvent {
	eventType: "subscription.past_due";
	id: string;
	created_at: number;
	object: SubscriptionEntity;
}

/**
 * Subscription paused event - contains a SubscriptionEntity
 */
export interface SubscriptionPausedEvent {
	eventType: "subscription.paused";
	id: string;
	created_at: number;
	object: SubscriptionEntity;
}

/**
 * Discriminated union of all webhook events
 * Use this type for type-safe webhook handling with automatic type narrowing in switch statements
 */
export type WebhookEvent =
	| CheckoutCompletedEvent
	| RefundCreatedEvent
	| DisputeCreatedEvent
	| SubscriptionActiveEvent
	| SubscriptionTrialingEvent
	| SubscriptionCanceledEvent
	| SubscriptionPaidEvent
	| SubscriptionExpiredEvent
	| SubscriptionUnpaidEvent
	| SubscriptionUpdateEvent
	| SubscriptionPastDueEvent
	| SubscriptionPausedEvent;

// ============================================================================
// Normalized/Expanded Types for Webhook Events (Developer-Friendly)
// ============================================================================

/**
 * These types represent what webhooks ACTUALLY return based on Creem's documentation.
 * Unlike the generic entities above which use unions (Entity | string) to handle both
 * API responses and webhook payloads, these normalized types guarantee that nested
 * objects are always expanded in webhook events, providing a better developer experience.
 *
 * Reference: https://docs.creem.io/learn/webhooks/event-types
 */

/**
 * Subscription entity as returned in subscription webhook events.
 * The product and customer are always expanded (full objects, never just IDs).
 */
export interface NormalizedSubscriptionEntity
	extends Omit<SubscriptionEntity, "product" | "customer"> {
	/** The product associated with the subscription (always expanded in webhooks) */
	product: ProductEntity;
	/** The customer who owns the subscription (always expanded in webhooks) */
	customer: CustomerEntity;
}

/**
 * Subscription entity as nested in checkout.completed events.
 * Note: In checkout events, the nested subscription has product/customer as ID strings.
 */
export interface NestedSubscriptionInCheckout
	extends Omit<SubscriptionEntity, "product" | "customer"> {
	/** The product ID (string, not expanded in nested subscription) */
	product: string;
	/** The customer ID (string, not expanded in nested subscription) */
	customer: string;
}

/**
 * Checkout entity as returned in checkout.completed webhook events.
 * Product and customer are always expanded.
 * Subscription is also expanded but has product/customer as strings inside it.
 */
export interface NormalizedCheckoutEntity
	extends Omit<CheckoutEntity, "product" | "customer" | "subscription"> {
	/** The product associated with the checkout (always expanded in webhooks) */
	product: ProductEntity;
	/** The customer associated with the checkout (always expanded in webhooks) */
	customer?: CustomerEntity;
	/** The subscription associated with the checkout (expanded, but nested fields are IDs) */
	subscription?: NestedSubscriptionInCheckout;
}

/**
 * Refund entity as returned in refund.created webhook events.
 * Based on the API structure, we keep transaction expanded and others as flexible.
 */
export interface NormalizedRefundEntity extends RefundEntity {
	/** The transaction is always expanded */
	transaction: TransactionEntity;
}

/**
 * Dispute entity as returned in dispute.created webhook events.
 * Based on the API structure, we keep transaction expanded.
 */
export interface NormalizedDisputeEntity extends DisputeEntity {
	/** The transaction is always expanded */
	transaction: TransactionEntity;
}

// ============================================================================
// Normalized Webhook Event Types (for better-auth plugin consumers)
// ============================================================================

/**
 * Checkout completed event with normalized/expanded objects.
 * Use this in your webhook handlers for a seamless developer experience.
 */
export interface NormalizedCheckoutCompletedEvent {
	eventType: "checkout.completed";
	id: string;
	created_at: number;
	object: NormalizedCheckoutEntity;
}

/**
 * Refund created event with normalized/expanded objects.
 */
export interface NormalizedRefundCreatedEvent {
	eventType: "refund.created";
	id: string;
	created_at: number;
	object: NormalizedRefundEntity;
}

/**
 * Dispute created event with normalized/expanded objects.
 */
export interface NormalizedDisputeCreatedEvent {
	eventType: "dispute.created";
	id: string;
	created_at: number;
	object: NormalizedDisputeEntity;
}

/**
 * Subscription active event with normalized/expanded objects.
 * Product and customer are always full objects.
 */
export interface NormalizedSubscriptionActiveEvent {
	eventType: "subscription.active";
	id: string;
	created_at: number;
	object: NormalizedSubscriptionEntity;
}

/**
 * Subscription trialing event with normalized/expanded objects.
 * Product and customer are always full objects.
 */
export interface NormalizedSubscriptionTrialingEvent {
	eventType: "subscription.trialing";
	id: string;
	created_at: number;
	object: NormalizedSubscriptionEntity;
}

/**
 * Subscription canceled event with normalized/expanded objects.
 * Product and customer are always full objects.
 */
export interface NormalizedSubscriptionCanceledEvent {
	eventType: "subscription.canceled";
	id: string;
	created_at: number;
	object: NormalizedSubscriptionEntity;
}

/**
 * Subscription paid event with normalized/expanded objects.
 * Product and customer are always full objects.
 */
export interface NormalizedSubscriptionPaidEvent {
	eventType: "subscription.paid";
	id: string;
	created_at: number;
	object: NormalizedSubscriptionEntity;
}

/**
 * Subscription expired event with normalized/expanded objects.
 * Product and customer are always full objects.
 */
export interface NormalizedSubscriptionExpiredEvent {
	eventType: "subscription.expired";
	id: string;
	created_at: number;
	object: NormalizedSubscriptionEntity;
}

/**
 * Subscription unpaid event with normalized/expanded objects.
 * Product and customer are always full objects.
 */
export interface NormalizedSubscriptionUnpaidEvent {
	eventType: "subscription.unpaid";
	id: string;
	created_at: number;
	object: NormalizedSubscriptionEntity;
}

/**
 * Subscription update event with normalized/expanded objects.
 * Product and customer are always full objects.
 */
export interface NormalizedSubscriptionUpdateEvent {
	eventType: "subscription.update";
	id: string;
	created_at: number;
	object: NormalizedSubscriptionEntity;
}

/**
 * Subscription past due event with normalized/expanded objects.
 * Product and customer are always full objects.
 */
export interface NormalizedSubscriptionPastDueEvent {
	eventType: "subscription.past_due";
	id: string;
	created_at: number;
	object: NormalizedSubscriptionEntity;
}

/**
 * Subscription paused event with normalized/expanded objects.
 * Product and customer are always full objects.
 */
export interface NormalizedSubscriptionPausedEvent {
	eventType: "subscription.paused";
	id: string;
	created_at: number;
	object: NormalizedSubscriptionEntity;
}

/**
 * Discriminated union of all normalized webhook events.
 * Use this type in your better-auth plugin options for clean, type-safe webhook handlers.
 *
 * Unlike the generic WebhookEvent type, this guarantees that nested objects are expanded,
 * eliminating the need for type guards and providing perfect autocomplete.
 */
export type NormalizedWebhookEvent =
	| NormalizedCheckoutCompletedEvent
	| NormalizedRefundCreatedEvent
	| NormalizedDisputeCreatedEvent
	| NormalizedSubscriptionActiveEvent
	| NormalizedSubscriptionTrialingEvent
	| NormalizedSubscriptionCanceledEvent
	| NormalizedSubscriptionPaidEvent
	| NormalizedSubscriptionExpiredEvent
	| NormalizedSubscriptionUnpaidEvent
	| NormalizedSubscriptionUpdateEvent
	| NormalizedSubscriptionPastDueEvent
	| NormalizedSubscriptionPausedEvent;

// ============================================================================
// Type Guards (Helper functions to determine object types)
// ============================================================================

/**
 * Union type of all webhook entities
 */
export type WebhookEntity =
	| CheckoutEntity
	| CustomerEntity
	| OrderEntity
	| ProductEntity
	| SubscriptionEntity
	| RefundEntity
	| DisputeEntity
	| TransactionEntity;

/**
 * Type guard to check if an object is a valid webhook entity
 */
export function isWebhookEntity(obj: unknown): obj is WebhookEntity {
	if (!obj || typeof obj !== "object") return false;
	const entity = obj as Record<string, unknown>;
	return (
		typeof entity.object === "string" &&
		[
			"checkout",
			"customer",
			"order",
			"product",
			"subscription",
			"refund",
			"dispute",
			"transaction",
		].includes(entity.object)
	);
}

/**
 * Type guard to check if an object is a valid webhook event entity
 */
export function isWebhookEventEntity(obj: unknown): obj is WebhookEventEntity {
	if (!obj || typeof obj !== "object") return false;
	const event = obj as Record<string, unknown>;
	return (
		typeof event.eventType === "string" &&
		typeof event.id === "string" &&
		typeof event.created_at === "number" &&
		"object" in event &&
		isWebhookEntity(event.object)
	);
}

export function isCheckoutEntity(obj: unknown): obj is CheckoutEntity {
	return (
		obj !== null &&
		typeof obj === "object" &&
		"object" in obj &&
		obj.object === "checkout"
	);
}

export function isCustomerEntity(obj: unknown): obj is CustomerEntity {
	return (
		obj !== null &&
		typeof obj === "object" &&
		"object" in obj &&
		obj.object === "customer"
	);
}

export function isOrderEntity(obj: unknown): obj is OrderEntity {
	return (
		obj !== null &&
		typeof obj === "object" &&
		"object" in obj &&
		obj.object === "order"
	);
}

export function isProductEntity(obj: unknown): obj is ProductEntity {
	return (
		obj !== null &&
		typeof obj === "object" &&
		"object" in obj &&
		obj.object === "product"
	);
}

export function isSubscriptionEntity(obj: unknown): obj is SubscriptionEntity {
	return (
		obj !== null &&
		typeof obj === "object" &&
		"object" in obj &&
		obj.object === "subscription"
	);
}

export function isRefundEntity(obj: unknown): obj is RefundEntity {
	return (
		obj !== null &&
		typeof obj === "object" &&
		"object" in obj &&
		obj.object === "refund"
	);
}

export function isDisputeEntity(obj: unknown): obj is DisputeEntity {
	return (
		obj !== null &&
		typeof obj === "object" &&
		"object" in obj &&
		obj.object === "dispute"
	);
}

export function isTransactionEntity(obj: unknown): obj is TransactionEntity {
	return (
		obj !== null &&
		typeof obj === "object" &&
		"object" in obj &&
		obj.object === "transaction"
	);
}
