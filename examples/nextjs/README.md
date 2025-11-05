# Next.js Example

This directory will contain a complete Next.js example using the Creem Better-Auth plugin.

## Coming Soon

We're working on providing comprehensive examples including:

- App Router setup with Server Components
- Client-side checkout flow
- Server Actions for subscription management
- Middleware for access control
- Webhook handling
- Database persistence examples

## Quick Preview

### Server Setup

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { creem } from "@creem_io/better-auth";

export const auth = betterAuth({
  database: {
    provider: "pg",
    url: process.env.DATABASE_URL!
  },
  plugins: [
    creem({
      apiKey: process.env.CREEM_API_KEY!,
      testMode: true,
      defaultSuccessUrl: "/success",
      persistSubscriptions: true,
      onGrantAccess: async ({ customer, metadata }) => {
        // Grant user access
      }
    })
  ]
});
```

### Client Usage

```typescript
// components/subscribe-button.tsx
"use client";

import { authClient } from "@/lib/auth-client";

export function SubscribeButton({ productId }: { productId: string }) {
  const handleSubscribe = async () => {
    const { data } = await authClient.creem.createCheckout({
      productId,
      successUrl: "/success"
    });
    
    if (data?.url) {
      window.location.href = data.url;
    }
  };
  
  return <button onClick={handleSubscribe}>Subscribe</button>;
}
```

### Server Component

```typescript
// app/dashboard/page.tsx
import { checkSubscriptionAccess } from "@creem_io/better-auth/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  const status = await checkSubscriptionAccess(
    { apiKey: process.env.CREEM_API_KEY!, testMode: true },
    { database: auth.options.database, userId: session.user.id }
  );
  
  if (!status.hasAccess) redirect('/subscribe');
  
  return <Dashboard />;
}
```

## Contributing

Want to help create this example? Check out [CONTRIBUTING.md](../../CONTRIBUTING.md)!

