# Creem Better-Auth Integration

A Better-Auth plugin for seamless Creem payment and subscription management with **crystal-clear TypeScript support**.

## ✨ Key Features

- **Clean Type Hints**: No more messy generic types - see exactly what parameters are required/optional
- **Full JSDoc Documentation**: Hover over any method to see examples and parameter descriptions
- **Automatic User Integration**: Session user info automatically included in requests
- **Webhook Handlers**: Flattened webhook types for easy destructuring

## Installation

```typescript
import { betterAuth } from "better-auth";
import { creem } from "./lib/creem-betterauth";

export const auth = betterAuth({
  // ... other config
  plugins: [
    creem({
      apiKey: process.env.CREEM_API_KEY!,
      testMode: true, // Use test mode for development
      defaultSuccessUrl: "/success",
      
      // Webhook handlers (optional)
      onGrantAccess: async ({ customer, product, metadata }) => {
        const userId = metadata?.referenceId as string;
        console.log(`Granting access to ${customer.email}`);
        // Your database logic here
      },
      
      onRevokeAccess: async ({ customer, product, metadata }) => {
        const userId = metadata?.referenceId as string;
        console.log(`Revoking access from ${customer.email}`);
        // Your database logic here
      }
    })
  ]
});
```

## Client Setup

```typescript
import { createAuthClient } from "better-auth/client";
import { creemClient } from "./lib/creem-betterauth/client";

export const authClient = createAuthClient({
  // ... other config
  plugins: [creemClient()]
});
```

## Usage

### Create Checkout

Create a checkout session for a product. The plugin automatically includes the authenticated user's information.

```typescript
import { authClient } from "./lib/auth-client";
import type { CreateCheckoutInput } from "./lib/creem-betterauth";

const handleCheckout = async () => {
  const { data, error } = await authClient.creem.createCheckout({
    productId: "prod_abc123",  // Required
    units: 1,                  // Optional, defaults to 1
    successUrl: "/thank-you",  // Optional, uses defaultSuccessUrl if not provided
    discountCode: "SUMMER2024", // Optional
    metadata: {                // Optional, automatically includes user ID
      source: "web"
    }
  });
  
  if (data?.url) {
    window.location.href = data.url; // Redirect to checkout
  }
};
```

### Type Hints

The plugin now provides excellent TypeScript support with detailed JSDoc comments. When you use `authClient.creem.createCheckout()`, your IDE will show:

- Which parameters are **required** vs **optional**
- Detailed descriptions for each parameter
- Example values
- Default values

#### Required Parameters
- `productId` - The Creem product ID from your dashboard

#### Optional Parameters
- `requestId` - Idempotency key for duplicate prevention
- `units` - Number of units (default: 1)
- `discountCode` - Discount code to apply
- `customer` - Customer info (defaults to session user)
- `customField` - Up to 3 custom fields
- `successUrl` - Success redirect URL
- `metadata` - Additional metadata (auto-includes user ID)

### Explicit Type Imports

If you want explicit typing for your checkout parameters:

```typescript
import type { CreateCheckoutInput } from "./lib/creem-betterauth";

const checkoutParams: CreateCheckoutInput = {
  productId: "prod_abc123",
  units: 1,
  successUrl: "/success"
};

const { data, error } = await authClient.creem.createCheckout(checkoutParams);
```

### Create Customer Portal

Open the Creem customer portal where users can manage subscriptions:

```typescript
import { authClient } from "./lib/auth-client";

const handlePortal = async () => {
  // Use default customer from session
  const { data, error } = await authClient.creem.createPortal();

  // Or specify a customer ID
  const { data, error } = await authClient.creem.createPortal({
    customerId: "cust_abc123"
  });

  if (data?.url) {
    window.location.href = data.url;
  }
};
```

### Cancel Subscription

Cancel an active subscription:

```typescript
import { authClient } from "./lib/auth-client";

const handleCancel = async (subscriptionId: string) => {
  const { data, error } = await authClient.creem.cancelSubscription({
    id: subscriptionId
  });

  if (data?.success) {
    console.log(data.message); // "Subscription cancelled successfully"
  }
};
```

### Retrieve Subscription Details

Get detailed information about a subscription:

```typescript
import { authClient } from "./lib/auth-client";

const getSubscription = async (subscriptionId: string) => {
  const { data, error } = await authClient.creem.retrieveSubscription({
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

### Search Transactions

Search transaction history with filters and pagination:

```typescript
import { authClient } from "./lib/auth-client";

const searchTransactions = async () => {
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
};
```

## 🎯 Clean Type Hints - The Problem We Solved

### Before (Without Our Solution)
When hovering over `authClient.creem.createCheckout`, you'd see messy Better-Auth endpoint types:
```
createCheckout<FetchOptions extends { method?: string | undefined; 
  redirect?: RequestRedirect | undefined; headers?: ...
```

This makes it impossible to understand what parameters the function actually needs!

### After (With Our Solution)
Now when you hover over `authClient.creem.createCheckout`, you see:
```typescript
createCheckout(input: CreateCheckoutInput): Promise<...>
```

And when you hover over the `input` parameter or the CreateCheckoutInput type:
- ✅ Clear JSDoc documentation with examples
- ✅ Required vs optional parameters clearly marked
- ✅ Default values shown
- ✅ Example code snippets
- ✅ No generic type noise

### How We Achieved This

We use a **typed wrapper** in `auth-client.ts` that overrides the inferred types:

```typescript
interface CreemMethods {
  createCheckout(input: CreateCheckoutInput): AuthResponse<CreateCheckoutResponse>;
  // ... other methods with clean signatures
}

export const authClient = {
  ...baseAuthClient,
  creem: baseAuthClient.creem as unknown as CreemMethods,
};
```

This approach:
1. Keeps the runtime behavior unchanged
2. Provides clean types at the type-level only
3. Ensures IntelliSense shows what developers actually need to know

## Webhook Handlers

The plugin provides flattened webhook types for better developer experience:

```typescript
onCheckoutCompleted: async (data) => {
  // All properties are at the top level
  const { 
    webhookEventType,  // "checkout.completed"
    product,           // Product details
    customer,          // Customer info
    order,            // Order details
    subscription      // Subscription if applicable
  } = data;
  
  // Your logic here
}
```

## Type Exports

Available type exports from the plugin:

```typescript
// Checkout types
import type {
  CreateCheckoutInput,
  CreateCheckoutResponse,
  CheckoutCustomer,
} from "./lib/creem-betterauth";

// Portal types
import type {
  CreatePortalInput,
  CreatePortalResponse,
} from "./lib/creem-betterauth";

// Subscription types
import type {
  CancelSubscriptionInput,
  CancelSubscriptionResponse,
  RetrieveSubscriptionInput,
  SubscriptionData,
} from "./lib/creem-betterauth";

// Transaction types
import type {
  SearchTransactionsInput,
  SearchTransactionsResponse,
  TransactionData,
} from "./lib/creem-betterauth";

// Webhook types
import type {
  CreemOptions,
  FlatCheckoutCompleted,
  GrantAccessContext,
  RevokeAccessContext,
  // ... and more
} from "./lib/creem-betterauth";
```

## Development Tips

1. **Hover over methods** in your IDE to see full parameter documentation
2. **Use TypeScript's autocomplete** to discover available options
3. **Import types explicitly** when you need them for function parameters
4. **Check JSDoc comments** for examples and constraints
5. **Test in test mode** before going live with `testMode: true`

## Environment Variables

```env
CREEM_API_KEY=your_api_key_here
CREEM_WEBHOOK_SECRET=your_webhook_secret_here
```

## Support

For more information about Creem, visit [Creem Documentation](https://docs.creem.io)

