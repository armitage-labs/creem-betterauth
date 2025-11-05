import { AsyncLocalStorage } from 'node:async_hooks';
export { AsyncLocalStorage } from 'node:async_hooks';

/**
 * AsyncLocalStorage will be import directly in 1.5.x
 */

declare function getAsyncLocalStorage(): Promise<typeof AsyncLocalStorage>;

export { getAsyncLocalStorage };
