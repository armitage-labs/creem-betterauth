# Architecture Documentation

## Overview

The `@creem_io/better-auth` plugin integrates Creem payment and subscription management with Better-Auth, providing a seamless experience for developers.

## Design Principles

### 1. Flexibility First
- Support both Better Auth endpoints AND direct server-side functions
- Allow database persistence OR direct API calls
- Multiple import patterns for different use cases

### 2. TypeScript Excellence
- Full type safety across all APIs
- Clean IntelliSense with no generic noise
- JSDoc comments for inline documentation
- Automatic type inference where possible

### 3. Developer Experience
- Sensible defaults
- Clear error messages
- Comprehensive examples
- Multiple usage patterns

## Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                     User Application                     │
├──────────────────────┬──────────────────────────────────┤
│   Client-Side        │        Server-Side               │
│                      │                                   │
│  Better Auth         │  Better Auth      Server Utils   │
│  Endpoints           │  API              (Direct)       │
│  (createCheckout)    │  (auth.api...)    (createCheckout)
│                      │                                   │
└──────────────┬───────┴──────────────┬───────────────────┘
               │                      │
               v                      v
      ┌────────────────────────────────────────┐
      │     Creem Better-Auth Plugin           │
      │                                        │
      │  ┌──────────┐  ┌──────────────────┐  │
      │  │ Endpoints│  │ Server Utilities │  │
      │  └──────────┘  └──────────────────┘  │
      │                                        │
      │  ┌──────────────────────────────────┐ │
      │  │        Webhook Handlers          │ │
      │  └──────────────────────────────────┘ │
      │                                        │
      │  ┌──────────────────────────────────┐ │
      │  │        Database Schema           │ │
      │  │  (Optional - persistSubscriptions)│ │
      │  └──────────────────────────────────┘ │
      └──────────────┬────────────────────────┘
                     │
                     v
              ┌─────────────┐
              │  Creem SDK  │
              └──────┬──────┘
                     │
                     v
              ┌─────────────┐
              │  Creem API  │
              └─────────────┘
```

## Core Components

### 1. Plugin (`src/index.ts`)

The main plugin export that integrates with Better-Auth:

```typescript
export const creem = (options: CreemOptions) => {
  return {
    id: "creem",
    endpoints: { /* Better Auth endpoints */ },
    schema: getSchema(options),
  } satisfies BetterAuthPlugin;
};
```

**Responsibilities:**
- Initialize Creem SDK
- Register Better Auth endpoints
- Define database schema
- Configure webhook handlers

### 2. Client Plugin (`src/client.ts`)

Client-side plugin for Better-Auth React:

```typescript
export const creemClient = () => {
  return {
    id: "creem",
    $InferServerPlugin: {} as ReturnType<typeof creem>,
  } satisfies BetterAuthClientPlugin;
};
```

**Responsibilities:**
- Type inference for client-side methods
- Connect to server-side plugin

### 3. Enhanced Client (`src/create-creem-auth-client.ts`)

Wrapper for cleaner TypeScript types:

```typescript
export function createCreemAuthClient(config) {
  const baseClient = createAuthClient(config);
  return baseClient as typeof baseClient & {
    creem: CreemClient;
  };
}
```

**Benefit:** Removes generic type noise, provides clean method signatures

### 4. Server Utilities (`src/creem-server.ts`)

Direct server-side functions that bypass Better Auth endpoints:

```typescript
export async function createCheckout(config, input) {
  const creem = createCreemClient(config);
  // Direct API call
}

export async function checkSubscriptionAccess(config, options) {
  // Database OR API mode
}
```

**Use Cases:**
- Server Components
- Server Actions
- API Routes
- Middleware
- Cron jobs

### 5. Endpoints (`src/*-endpoint.ts`)

Better Auth endpoint implementations:

- `checkout.ts` - Create checkout sessions
- `portal.ts` - Customer portal access
- `cancel-subscription.ts` - Cancel subscriptions
- `retrieve-subscription.ts` - Get subscription details
- `search-transactions.ts` - Search transactions
- `has-active-subscription.ts` - Check access

**Pattern:**
```typescript
export const createCheckoutEndpoint = (creem, options) => {
  return createAuthEndpoint(
    "/creem/create-checkout",
    { method: "POST", body: CheckoutParams },
    createCheckoutHandler(creem, options)
  );
};
```

### 6. Webhooks (`src/webhook.ts`, `src/hooks.ts`)

Webhook processing with signature verification:

```typescript
// webhook.ts - Main webhook endpoint
export const createWebhookEndpoint = (options) => {
  return createAuthEndpoint("/creem/webhook", ...);
};

// hooks.ts - Event handlers
export async function onSubscriptionActive(ctx, event, options) {
  // Update database
  // Call user callbacks
}
```

### 7. Database Schema (`src/schema.ts`)

Optional database tables for subscription persistence:

```typescript
export const subscriptions = {
  subscription: {
    fields: {
      productId: { type: "string", required: true },
      referenceId: { type: "string", required: true },
      status: { type: "string", defaultValue: "pending" },
      // ...
    }
  }
};
```

**Controlled by:** `persistSubscriptions` option (default: `true`)

## Data Flow

### Checkout Flow

```
1. User clicks "Subscribe"
   ↓
2. Client calls authClient.creem.createCheckout()
   ↓
3. POST /api/auth/creem/create-checkout
   ↓
4. Get session from Better-Auth
   ↓
5. Call Creem SDK createCheckout()
   ↓
6. Return checkout URL
   ↓
7. Redirect user to Creem checkout
   ↓
8. User completes payment
   ↓
9. Creem sends webhook
   ↓
10. Verify signature
    ↓
11. Update database (if persistSubscriptions: true)
    ↓
12. Call onGrantAccess callback
    ↓
13. Return success
```

### Access Check Flow (Database Mode)

```
1. Server Component needs to check access
   ↓
2. Call checkSubscriptionAccess()
   ↓
3. Query local database
   ↓
4. Check subscription status
   ↓
5. Return { hasAccess: true/false }
```

### Access Check Flow (API Mode)

```
1. Server Component needs to check access
   ↓
2. Call checkSubscriptionAccess()
   ↓
3. Call Creem API directly
   ↓
4. Check subscription status
   ↓
5. Return { hasAccess: true/false }
```

## Type System

### Type Organization

```
src/
├── *-types.ts        # Clean type exports for specific features
├── types.ts          # Plugin configuration types
└── webhook-types.ts  # Webhook event types
```

### Type Export Strategy

```typescript
// Main export (index.ts)
export type { CreemOptions } from "./types";
export type { CreateCheckoutInput } from "./checkout-types";

// Client export (client.ts)
export type { CreateCheckoutInput } from "./checkout-types";

// Server export (creem-server.ts)
export type { CreemServerConfig } from "./creem-server";
```

**Benefits:**
- Clean imports
- No circular dependencies
- Tree-shakeable
- IDE-friendly

## Modes of Operation

### Database Mode (Default)

```typescript
creem({
  apiKey: "...",
  persistSubscriptions: true, // default
})
```

**Features:**
- ✅ Fast access checks
- ✅ Offline data access
- ✅ SQL queries available
- ✅ Automatic sync via webhooks
- ✅ Full feature support

**Trade-offs:**
- Requires database schema
- Depends on webhook delivery
- Data slightly delayed

### API Mode

```typescript
creem({
  apiKey: "...",
  persistSubscriptions: false,
})
```

**Features:**
- ✅ No database needed
- ✅ Always fresh data
- ✅ Simpler setup

**Trade-offs:**
- API call required for checks
- Network dependency
- Some features limited

## Error Handling

### Pattern

```typescript
try {
  const result = await creem.createCheckout(...);
  return ctx.json(result);
} catch (error) {
  console.error("Creem error:", error);
  return ctx.json(
    { error: "Failed to create checkout" },
    { status: 500 }
  );
}
```

### User-Facing Errors

```typescript
if (!session?.user) {
  return ctx.json(
    { error: "User must be logged in" },
    { status: 400 }
  );
}
```

## Security

### Webhook Verification

```typescript
const signature = req.headers.get('creem-signature');
if (generateSignature(payload, secret) !== signature) {
  return ctx.json({ error: "Invalid signature" }, { status: 401 });
}
```

### Session Requirements

All endpoints require authenticated sessions via Better-Auth.

## Performance Considerations

### Database Queries

```typescript
// Fast: Single query to local database
const subscriptions = await db.select()
  .from("subscription")
  .where("referenceId", "=", userId);
```

### API Calls

```typescript
// Slower: External API call
const subscriptions = await creem.searchSubscriptions({
  xApiKey: apiKey,
  customerId
});
```

**Recommendation:** Use database mode for frequently accessed data.

## Extension Points

### Custom Webhooks

```typescript
creem({
  onCheckoutCompleted: async (ctx, data) => {
    // Custom logic
  },
  onSubscriptionActive: async (ctx, data) => {
    // Custom logic
  }
})
```

### Custom Server Functions

Users can create their own utilities using the Creem SDK:

```typescript
import { createCreemClient } from "@creem_io/better-auth/server";

export async function customFunction() {
  const creem = createCreemClient(config);
  // Custom logic with Creem SDK
}
```

## Future Enhancements

- [ ] Automated testing suite
- [ ] Subscription plan management
- [ ] Invoice generation helpers
- [ ] Usage-based billing support
- [ ] Multi-tenant support
- [ ] Subscription upgrades/downgrades
- [ ] Proration calculations
- [ ] Dunning management

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on contributing to this architecture.

