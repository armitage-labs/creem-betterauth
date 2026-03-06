# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Improved developer experience: Plugin now logs a warning instead of throwing a fatal error when Creem API key is missing during initialization
- API endpoints (`createCheckout`, `createPortal`, `cancelSubscription`, `retrieveSubscription`, `searchTransactions`) now return clear error messages when called without an API key configured
- Projects can now run without a Creem API key until Creem functionality is actually used, improving developer velocity
- Replaced duplicate `Subscription` interface across 4 files with shared `SubscriptionRecord` in `types.ts`
- Removed unused `baseUrl` option from `CreemOptions`
- Structured logging: all log messages use Better Auth's logger with `[creem]` prefix instead of `console.error`

### Fixed

- Client plugin missing `pathMethods` for `cancel-subscription`, `retrieve-subscription`, and `search-transactions` endpoints (caused 404 errors when called from the client)
- `has-active-subscription` endpoint now checks `past_due` status for period-end grace access
- `has-active-subscription` endpoint no longer leaks internal error messages in 500 responses
- `createCheckout` server utility now throws an error instead of returning empty string when Creem API returns no checkout URL
- Fixed JSDoc import path from `"./lib/creem-betterauth"` to `"@creem_io/better-auth"`

### Added

- Initial release of `@creem_io/better-auth`
- Better Auth plugin for Creem payment integration
- Client-side methods for checkout, portal, subscriptions, and transactions
- Server-side utilities for direct API access
- Database persistence mode for fast access checks
- API mode for database-free operation
- Webhook handlers with signature verification
- Comprehensive TypeScript types and JSDoc documentation
- Enhanced client wrapper for cleaner type hints
- Dual-mode support (database vs API)
- Access control handlers (onGrantAccess, onRevokeAccess)
- 183 unit and integration tests with Vitest
- Runnable Next.js example app in `examples/nextjs/`
- pnpm workspace support for local development

## [0.0.1] - 2024-11-05

### Added

- Initial release
