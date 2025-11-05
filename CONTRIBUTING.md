# Contributing to @creem_io/better-auth

Thank you for your interest in contributing to the Creem Better-Auth plugin! We appreciate your help in making this project better.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A Better-Auth project for testing (optional but recommended)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/creem-betterauth.git
   cd creem-betterauth
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Run type checking:
   ```bash
   npm run typecheck
   ```

## 💻 Development Workflow

### Project Structure

```
creem-betterauth/
├── src/                      # Source code
│   ├── index.ts             # Main plugin export
│   ├── client.ts            # Client plugin
│   ├── creem-server.ts      # Server utilities
│   ├── checkout.ts          # Checkout endpoint
│   ├── portal.ts            # Portal endpoint
│   ├── *-types.ts           # Type definitions
│   └── ...                  # Other endpoints
├── dist/                     # Compiled output (gitignored)
├── examples/                 # Example implementations
├── docs/                     # Additional documentation
├── .github/                  # GitHub configs
└── test/                     # Tests
```

### Development Scripts

```bash
# Build the project
npm run build

# Type check without building
npm run typecheck

# Watch mode (if implemented)
npm run dev
```

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Ensure your code builds:
   ```bash
   npm run build
   ```

4. Test your changes with the examples or in a real project

5. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

## 📁 Project Structure

### Source Files (`src/`)

- **`index.ts`** - Main plugin export with server-side plugin configuration
- **`client.ts`** - Client-side plugin for Better Auth React
- **`creem-server.ts`** - Server utilities that work without endpoints
- **`create-creem-auth-client.ts`** - Enhanced TypeScript client wrapper
- **Endpoint files** - `checkout.ts`, `portal.ts`, `cancel-subscription.ts`, etc.
- **Type files** - `*-types.ts` files for clean type exports
- **`schema.ts`** - Database schema definitions
- **`hooks.ts`** - Webhook event handlers
- **`utils.ts`** - Shared utility functions
- **`webhook.ts`** - Webhook endpoint handler
- **`webhook-types.ts`** - Webhook type definitions

### Output (`dist/`)

The `dist/` directory is automatically generated and should never be edited manually. It contains:
- Compiled JavaScript (`.js`)
- Type declarations (`.d.ts`)
- Source maps (`.js.map`, `.d.ts.map`)

## 📝 Coding Guidelines

### TypeScript

- Use TypeScript for all code
- Prefer `interface` over `type` for object types
- Use functional programming patterns
- Add JSDoc comments to all exported functions and types
- Use descriptive variable names

### Code Style

```typescript
// Good: Descriptive function with JSDoc
/**
 * Create a checkout session for a product.
 * 
 * @param config - Creem configuration
 * @param input - Checkout parameters
 * @returns Checkout URL and redirect flag
 */
export async function createCheckout(
  config: CreemServerConfig,
  input: CreateCheckoutInput
): Promise<CreateCheckoutResponse> {
  // Implementation
}

// Good: Clear type definitions
export interface CreemServerConfig {
  /** Creem API key */
  apiKey: string;
  /** Whether to use test mode */
  testMode?: boolean;
}
```

### Documentation

- Add JSDoc comments to all public APIs
- Include `@example` blocks for complex functions
- Document all parameters and return types
- Keep README.md updated with new features

### Commits

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add support for custom webhook endpoints
fix: correct type inference for checkout response
docs: update README with server utilities guide
```

## 🧪 Testing

Currently, the project uses manual testing with example projects. We welcome contributions to add automated testing!

### Manual Testing

1. Create a test Better-Auth project
2. Link your local package:
   ```bash
   npm run build
   npm link
   ```

3. In your test project:
   ```bash
   npm link @creem_io/better-auth
   ```

4. Test your changes in the test project

### Future: Automated Tests

We're looking to add:
- Unit tests with Jest or Vitest
- Integration tests with Better-Auth
- Type tests with tsd or similar

Contributions welcome!

## 📬 Submitting Changes

### Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the type definitions if you changed APIs
3. Ensure the code builds without errors
4. Create a Pull Request with a clear title and description

### PR Title Format

Use conventional commit format:
```
feat: add webhook retry mechanism
fix: correct subscription status check
docs: improve server utilities documentation
```

### PR Description Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Code builds successfully
- [ ] Types are correct
- [ ] Documentation updated
- [ ] Examples updated (if applicable)
```

## 🐛 Reporting Issues

### Bug Reports

Use the bug report template and include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Better-Auth version
- Package version
- Environment details

### Feature Requests

Use the feature request template and include:
- Clear description of the feature
- Use case / motivation
- Proposed API (if applicable)
- Alternatives considered

## 📚 Additional Resources

- [Better-Auth Documentation](https://better-auth.com)
- [Creem Documentation](https://docs.creem.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🙏 Thank You

Thank you for contributing to @creem_io/better-auth! Your efforts help make payment integration easier for everyone.

## 💬 Questions?

- Open a [Discussion](https://github.com/armitage-labs/creem-betterauth/discussions)
- File an [Issue](https://github.com/armitage-labs/creem-betterauth/issues)
- Contact us at support@creem.io

