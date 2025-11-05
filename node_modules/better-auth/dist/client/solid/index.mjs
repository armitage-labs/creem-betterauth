import { g as getClientConfig, c as createDynamicPathProxy } from '../../shared/better-auth.RKafzlkP.mjs';
import { c as capitalizeFirstLetter } from '../../shared/better-auth.D-2CmEwz.mjs';
import { createStore, reconcile } from 'solid-js/store';
import { onCleanup } from 'solid-js';
import '@better-fetch/fetch';
import '../../shared/better-auth.DR3R5wdU.mjs';
import '@better-auth/core/env';
import '@better-auth/core/error';
import 'nanostores';
import '../../shared/better-auth.BYWGbmZ5.mjs';
import '../../shared/better-auth.msGOU0m9.mjs';

function useStore(store) {
  const unbindActivation = store.listen(() => {
  });
  const [state, setState] = createStore({
    value: store.get()
  });
  const unsubscribe = store.subscribe((newValue) => {
    setState("value", reconcile(newValue));
  });
  onCleanup(() => unsubscribe());
  unbindActivation();
  return () => state.value;
}

function getAtomKey(str) {
  return `use${capitalizeFirstLetter(str)}`;
}
function createAuthClient(options) {
  const {
    pluginPathMethods,
    pluginsActions,
    pluginsAtoms,
    $fetch,
    atomListeners
  } = getClientConfig(options);
  let resolvedHooks = {};
  for (const [key, value] of Object.entries(pluginsAtoms)) {
    resolvedHooks[getAtomKey(key)] = () => useStore(value);
  }
  const routes = {
    ...pluginsActions,
    ...resolvedHooks
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
