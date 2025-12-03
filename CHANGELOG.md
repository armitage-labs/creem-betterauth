# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Improved developer experience: Plugin now logs a warning instead of throwing a fatal error when Creem API key is missing during initialization
- API endpoints (`createCheckout`, `createPortal`, `cancelSubscription`, `retrieveSubscription`, `searchTransactions`) now return clear error messages when called without an API key configured
- Projects can now run without a Creem API key until Creem functionality is actually used, improving developer velocity

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

## [0.0.1] - 2024-11-05

### Added

- Initial release
