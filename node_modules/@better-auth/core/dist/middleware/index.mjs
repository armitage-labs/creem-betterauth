import { createMiddleware, createEndpoint } from 'better-call';

const optionsMiddleware = createMiddleware(async () => {
  return {};
});
const createAuthMiddleware = createMiddleware.create({
  use: [
    optionsMiddleware,
    /**
     * Only use for post hooks
     */
    createMiddleware(async () => {
      return {};
    })
  ]
});
const createAuthEndpoint = createEndpoint.create({
  use: [optionsMiddleware]
});

export { createAuthEndpoint, createAuthMiddleware, optionsMiddleware };
