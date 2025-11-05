import { g as getClientConfig, c as createDynamicPathProxy } from '../../shared/better-auth.RKafzlkP.mjs';
import { c as capitalizeFirstLetter } from '../../shared/better-auth.D-2CmEwz.mjs';
import '@better-fetch/fetch';
import '../../shared/better-auth.DR3R5wdU.mjs';
import '@better-auth/core/env';
import '@better-auth/core/error';
import 'nanostores';
import '../../shared/better-auth.BYWGbmZ5.mjs';
import '../../shared/better-auth.msGOU0m9.mjs';

function createAuthClient(options) {
  const {
    pluginPathMethods,
    pluginsActions,
    pluginsAtoms,
    $fetch,
    atomListeners,
    $store
  } = getClientConfig(options);
  let resolvedHooks = {};
  for (const [key, value] of Object.entries(pluginsAtoms)) {
    resolvedHooks[`use${capitalizeFirstLetter(key)}`] = () => value;
  }
  const routes = {
    ...pluginsActions,
    ...resolvedHooks,
    $fetch,
    $store
  };
  const proxy = createDynamicPathProxy(
    routes,
    $fetch,
    pluginPathMethods,
    pluginsAtoms,
    atomListeners
  );
  return proxy;
}

export { createAuthClient };
