"use client";

import { createCreemAuthClient } from "@creem_io/better-auth/create-creem-auth-client";
import { creemClient } from "@creem_io/better-auth/client";

export const authClient = createCreemAuthClient({
  baseURL: typeof window !== "undefined" 
    ? window.location.origin 
    : "http://localhost:3000",
  plugins: [creemClient()],
});

