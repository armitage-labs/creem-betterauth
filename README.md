# @creem_io/better-auth

Official Better-Auth plugin for seamless Creem payment and subscription management with **crystal-clear TypeScript support**.

## ✨ Key Features

- 🎯 **Clean Type Hints**: No more messy generic types - see exactly what parameters are required/optional
- 📚 **Full JSDoc Documentation**: Hover over any method to see examples and parameter descriptions
- 🔐 **Automatic User Integration**: Session user info automatically included in requests
- 🪝 **Webhook Handlers**: Flattened webhook types for easy destructuring
- 🎨 **TypeScript First**: Built with TypeScript for the best developer experience
- ⚡ **Zero Config**: Works out of the box with sensible defaults

## 📦 Installation

```bash
npm install @creem_io/better-auth better-auth creem
```

### Required Peer Dependencies

- `better-auth` ^1.3.34 (required)
- `creem` ^0.4.0 (included)
- `zod` ^3.23.8 (included)

**Note:** TypeScript types are automatically included via `.d.ts` declaration files - no additional `@types` packages needed!

## 🚀 Quick Start

### Server Setup

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { creem } from "@creem_io/better-auth";

export const auth = betterAuth({
  database: {
    // your database config
  },
  plugins: [
    creem({
      apiKey: process.env.CREEM_API_KEY!,
      testMode: true, // Use test mode for development
      defaultSuccessUrl: "/success",
      
      // Optional: Handle access grants/revokes
      onGrantAccess: async ({ customer, product, metadata, reason }) => {
        const userId = metadata?.referenceId as string;
        console.log(`Granting access (${reason}) to ${customer.email}`);
        // Update your database to grant access
      },
      
      onRevokeAccess: async ({ customer, product, metadata, reason }) => {
        const userId = metadata?.referenceId as string;
        console.log(`Revoking access (${reason}) from ${customer.email}`);
        // Update your database to revoke access
      }
    })
  ]
});
```

### Client Setup (Option 1: Standard)

```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { creemClient } from "@creem_io/better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [creemClient()]
});
```

### Client Setup (Option 2: Enhanced TypeScript)

For even better TypeScript support with cleaner IntelliSense, use the `createCreemAuthClient` helper:

```typescript
// lib/auth-client.ts
import { createCreemAuthClient } from "@creem_io/better-auth/create-creem-auth-client";
import { creemClient } from "@creem_io/better-auth/client";

export const authClient = createCreemAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [creemClient()]
});

// Now you get the cleanest possible type hints!
// authClient.creem.createCheckout() shows CreateCheckoutInput instead of generic types
```

The `createCreemAuthClient` wrapper provides:
- ✅ Cleaner parameter types in your IDE
- ✅ Better autocomplete
- ✅ Easier to understand method signatures
- ✅ Same runtime behavior as standard setup

## 📖 API Reference

### Client Methods

All methods are available via `authClient.creem.*` and return a Promise with `{ data, error }`:

#### `createCheckout(input: CreateCheckoutInput)`

Create a checkout session for a product. Automatically includes authenticated user info.

**Required Parameters:**
- `productId` - The Creem product ID

**Optional Parameters:**
- `units` - Number of units (default: 1)
- `successUrl` - Redirect URL after checkout (falls back to `defaultSuccessUrl`)
- `discountCode` - Discount code to apply
- `customer` - Customer info (defaults to session user)
- `metadata` - Additional metadata (auto-includes user ID as `referenceId`)
- `requestId` - Idempotency key
- `customField` - Up to 3 custom fields

**Example:**
```typescript
import { authClient } from "@/lib/auth-client";
import type { CreateCheckoutInput } from "@creem_io/better-auth";

const handleCheckout = async () => {
  const { data, error } = await authClient.creem.createCheckout({
    productId: "prod_abc123",
    units: 1,
    successUrl: "/thank-you",
    discountCode: "SUMMER2024",
    metadata: {
      source: "web"
    }
  });
  
  if (data?.url) {
    window.location.href = data.url;
  }
};
```

#### `createPortal(input?: CreatePortalInput)`

Create a customer portal session. Opens Creem portal where users can manage subscriptions.

**Optional Parameters:**
- `customerId` - Override customer ID (defaults to session user's Creem customer ID)

**Example:**
```typescript
const handlePortal = async () => {
  // Use default customer from session
  const { data } = await authClient.creem.createPortal();

  // Or specify a customer ID
  const { data } = await authClient.creem.createPortal({
    customerId: "cust_abc123"
  });

  if (data?.url) window.location.href = data.url;
};
```

#### `cancelSubscription(input: CancelSubscriptionInput)`

Cancel an active subscription.

**Required Parameters:**
- `id` - The subscription ID to cancel

**Example:**
```typescript
const handleCancel = async (subscriptionId: string) => {
  const { data, error } = await authClient.creem.cancelSubscription({
    id: subscriptionId
  });

  if (data?.success) {
    console.log(data.message); // "Subscription cancelled successfully"
  }
};
```

#### `retrieveSubscription(input: RetrieveSubscriptionInput)`

Get detailed information about a subscription.

**Required Parameters:**
- `id` - The subscription ID

**Example:**
```typescript
const getSubscription = async (subscriptionId: string) => {
  const { data } = await authClient.creem.retrieveSubscription({
    id: subscriptionId
  });

  if (data) {
    console.log(`Status: ${data.status}`);
    console.log(`Product: ${data.product.name}`);
    console.log(`Price: ${data.product.price} ${data.product.currency}`);
    console.log(`Next billing: ${new Date(data.next_billing_date * 1000)}`);
  }
};
```

#### `searchTransactions(input?: SearchTransactionsInput)`

Search transaction history with filters and pagination.

**Optional Parameters:**
- `customerId` - Filter by customer ID (defaults to session user)
- `productId` - Filter by product ID
- `orderId` - Filter by order ID
- `pageNumber` - Page number (starts at 1)
- `pageSize` - Number of results per page

**Example:**
```typescript
  // Get all transactions for current user
  const { data } = await authClient.creem.searchTransactions();

  // Search with filters
  const { data } = await authClient.creem.searchTransactions({
    customerId: "cust_abc123",
    productId: "prod_xyz789",
    pageNumber: 2,
    pageSize: 50
  });

  if (data?.transactions) {
    data.transactions.forEach(tx => {
      console.log(`${tx.type}: ${tx.amount} ${tx.currency}`);
      console.log(`Status: ${tx.status}`);
      console.log(`Date: ${new Date(tx.created_at * 1000)}`);
    });
  }
```

#### `hasAccessGranted()`

Check if the current user has an active subscription or access.

**Example:**
```typescript
const { data } = await authClient.creem.hasAccessGranted();

if (data?.hasAccess) {
  console.log("User has active subscription");
}
```

## 📝 Type Imports

### Server-Side Types

```typescript
// Plugin configuration
import type { CreemOptions } from "@creem_io/better-auth";

// Access control types
import type {
  GrantAccessContext,
  RevokeAccessContext,
  GrantAccessReason,
  RevokeAccessReason
} from "@creem_io/better-auth";

// Webhook types
import type {
  FlatCheckoutCompleted,
  FlatRefundCreated,
  FlatDisputeCreated,
  FlatSubscriptionEvent
} from "@creem_io/better-auth";
```

### Client-Side Types

```typescript
// Checkout types
import type {
  CreateCheckoutInput,
  CreateCheckoutResponse,
  CheckoutCustomer
} from "@creem_io/better-auth";

// Portal types
import type {
  CreatePortalInput,
  CreatePortalResponse
} from "@creem_io/better-auth";

// Subscription types
import type {
  CancelSubscriptionInput,
  CancelSubscriptionResponse,
  RetrieveSubscriptionInput,
  SubscriptionData
} from "@creem_io/better-auth";

// Transaction types
import type {
  SearchTransactionsInput,
  SearchTransactionsResponse,
  TransactionData
} from "@creem_io/better-auth";

// Access check types
import type { HasAccessGrantedResponse } from "@creem_io/better-auth";
```

### Enhanced Client Types

```typescript
// When using createCreemAuthClient
import type { CreemClient } from "@creem_io/better-auth/create-creem-auth-client";
```

## ⚙️ Configuration Options

### `CreemOptions`

All available options for the `creem()` plugin:

```typescript
interface CreemOptions {
  // Required
  apiKey: string;                    // Your Creem API key
  
  // Optional
  webhookSecret?: string;            // For webhook signature verification
  testMode?: boolean;                // Use test environment (default: false)
  baseUrl?: string;                  // Custom base URL
  defaultSuccessUrl?: string;        // Default success redirect URL
  persistSubscriptions?: boolean;    // Persist to database (default: true)
  
  // Webhook Handlers
  onCheckoutCompleted?: (data: FlatCheckoutCompleted) => void;
  onRefundCreated?: (data: FlatRefundCreated) => void;
  onDisputeCreated?: (data: FlatDisputeCreated) => void;
  onSubscriptionActive?: (data: FlatSubscriptionEvent<"subscription.active">) => void;
  onSubscriptionTrialing?: (data: FlatSubscriptionEvent<"subscription.trialing">) => void;
  onSubscriptionCanceled?: (data: FlatSubscriptionEvent<"subscription.canceled">) => void;
  onSubscriptionPaid?: (data: FlatSubscriptionEvent<"subscription.paid">) => void;
  onSubscriptionExpired?: (data: FlatSubscriptionEvent<"subscription.expired">) => void;
  onSubscriptionUnpaid?: (data: FlatSubscriptionEvent<"subscription.unpaid">) => void;
  onSubscriptionUpdate?: (data: FlatSubscriptionEvent<"subscription.update">) => void;
  onSubscriptionPastDue?: (data: FlatSubscriptionEvent<"subscription.past_due">) => void;
  onSubscriptionPaused?: (data: FlatSubscriptionEvent<"subscription.paused">) => void;
  
  // Access Control (High-level handlers)
  onGrantAccess?: (context: GrantAccessContext) => void | Promise<void>;
  onRevokeAccess?: (context: RevokeAccessContext) => void | Promise<void>;
}
```

## 🪝 Webhook Handlers

The plugin provides two types of webhook handlers:

### 1. Event-Specific Handlers

Handle specific webhook events with all properties flattened:

```typescript
creem({
  apiKey: process.env.CREEM_API_KEY!,
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,
  
  onCheckoutCompleted: async (data) => {
    // All properties at top level
    const { 
      webhookEventType,  // "checkout.completed"
      webhookId,
      webhookCreatedAt,
      product,
      customer,
      order,
      subscription,
      status
    } = data;
    
    console.log(`${customer.email} purchased ${product.name}`);
  },
  
  onSubscriptionActive: async (data) => {
    const { product, customer, status, metadata } = data;
    console.log(`${customer.email} subscribed to ${product.name}`);
  }
})
```

### 2. Access Control Handlers (Recommended)

Use high-level `onGrantAccess` and `onRevokeAccess` for simpler access management:

```typescript
creem({
  apiKey: process.env.CREEM_API_KEY!,
  webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,
  
  // Triggered for: active, trialing, and paid subscriptions
  onGrantAccess: async ({ reason, product, customer, metadata }) => {
    const userId = metadata?.referenceId as string;
    
    // Update your database
    await db.user.update({
      where: { id: userId },
      data: { hasAccess: true, subscriptionStatus: reason }
    });
    
    console.log(`Granted ${reason} to ${customer.email}`);
  },
  
  // Triggered for: paused, expired, and canceled subscriptions
  onRevokeAccess: async ({ reason, product, customer, metadata }) => {
    const userId = metadata?.referenceId as string;
    
    // Update your database
    await db.user.update({
      where: { id: userId },
      data: { hasAccess: false, subscriptionStatus: reason }
    });
    
    console.log(`Revoked access (${reason}) from ${customer.email}`);
  }
})
```

**Grant Reasons:**
- `subscription_active` - Subscription is active
- `subscription_trialing` - Subscription is in trial
- `subscription_paid` - Subscription payment received

**Revoke Reasons:**
- `subscription_paused` - Subscription paused
- `subscription_expired` - Subscription expired

### Setting Up Webhooks

1. Add webhook endpoint to your Better-Auth configuration:

```typescript
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";

export const { GET, POST } = auth.handler;
```

2. Configure webhook URL in Creem dashboard:
```
https://yourdomain.com/api/auth/creem/webhook
```

3. Add webhook secret to environment variables:
```env
CREEM_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

## 💾 Database Persistence

By default, the plugin creates database tables to persist subscription data:

### Schema Tables

**`subscription` table:**
- `productId` - Creem product ID
- `referenceId` - Your user ID
- `creemCustomerId` - Creem customer ID
- `creemSubscriptionId` - Creem subscription ID
- `creemOrderId` - Creem order ID
- `status` - Subscription status
- `periodStart` - Period start date
- `periodEnd` - Period end date
- `cancelAtPeriodEnd` - Cancel flag

**`user` table extension:**
- `creemCustomerId` - Links user to Creem customer

### Disable Persistence

If you want to manage subscription data yourself:

```typescript
creem({
  apiKey: process.env.CREEM_API_KEY!,
  persistSubscriptions: false, // Disable database operations
})
```

## 🎯 Usage Examples

### React Component

```typescript
"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import type { CreateCheckoutInput } from "@creem_io/better-auth";

export function SubscribeButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  
  const handleSubscribe = async () => {
    setLoading(true);
    
    const { data, error } = await authClient.creem.createCheckout({
      productId,
      successUrl: "/dashboard",
      metadata: {
        source: "pricing-page"
      }
    });
    
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    
    if (data?.url) {
      window.location.href = data.url;
    }
  };
  
  return (
    <button onClick={handleSubscribe} disabled={loading}>
      {loading ? "Loading..." : "Subscribe Now"}
    </button>
  );
}
```

### Next.js Server Action

```typescript
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createCheckoutSession(productId: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session) {
    return { error: "Not authenticated" };
  }
  
  // Use auth endpoint directly on server
  const result = await auth.api.creem.createCheckout({
    body: {
      productId,
      successUrl: "/success"
    },
    headers: await headers()
  });
  
  return result;
}
```

### Check Access in Middleware

```typescript
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
  });
  
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Check subscription access
  const { data } = await auth.api.creem.hasAccessGranted({
    headers: request.headers
  });
  
  if (!data?.hasAccess) {
    return NextResponse.redirect(new URL("/subscribe", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};
```

## 🎨 TypeScript Tips

### 1. Hover for Documentation
Hover over any method to see full JSDoc documentation with examples:

```typescript
authClient.creem.createCheckout(/* hover here for docs */);
```

### 2. Autocomplete
Let TypeScript autocomplete show you available options:

```typescript
const { data } = await authClient.creem.createCheckout({
  productId: "prod_123",
  // Ctrl+Space here to see all available options
});
```

### 3. Type Inference
TypeScript automatically infers response types:

```typescript
const { data } = await authClient.creem.retrieveSubscription({ id: "sub_123" });
// data is typed as SubscriptionData | null
if (data) {
  // TypeScript knows all properties of SubscriptionData
  console.log(data.status);
  console.log(data.product.name);
}
```

## 🌍 Environment Variables

```env
# Required
CREEM_API_KEY=your_api_key_here

# Optional
CREEM_WEBHOOK_SECRET=your_webhook_secret_here
CREEM_TEST_MODE=true
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔧 Troubleshooting

### "Invalid signature" error
Make sure your webhook secret matches the one in your Creem dashboard.

### TypeScript errors with generic types
Use `createCreemAuthClient` instead of `createAuthClient` for cleaner types.

### Database errors
If you don't want database persistence, set `persistSubscriptions: false`.

### Checkout URL not redirecting
Make sure to check for `data?.url` before redirecting:
```typescript
if (data?.url) {
  window.location.href = data.url;
}
```

## 📚 Additional Resources

- [Creem Documentation](https://docs.creem.io)
- [Better-Auth Documentation](https://better-auth.com)
- [GitHub Repository](https://github.com/armitage-labs/creem-betterauth)

## 📄 License

MIT

## 🤝 Support

For issues or questions:
- Open an issue on [GitHub](https://github.com/armitage-labs/creem-betterauth/issues)
- Contact Creem support at [support@creem.io](mailto:support@creem.io)
