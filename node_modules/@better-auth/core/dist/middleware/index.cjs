'use strict';

const betterCall = require('better-call');

const optionsMiddleware = betterCall.createMiddleware(async () => {
  return {};
});
const createAuthMiddleware = betterCall.createMiddleware.create({
  use: [
    optionsMiddleware,
    /**
     * Only use for post hooks
     */
    betterCall.createMiddleware(async () => {
      return {};
    })
  ]
});
const createAuthEndpoint = betterCall.createEndpoint.create({
  use: [optionsMiddleware]
});

exports.createAuthEndpoint = createAuthEndpoint;
exports.createAuthMiddleware = createAuthMiddleware;
exports.optionsMiddleware = optionsMiddleware;
