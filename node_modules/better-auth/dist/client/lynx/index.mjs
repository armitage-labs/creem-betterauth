import { g as getClientConfig, c as createDynamicPathProxy } from '../../shared/better-auth.RKafzlkP.mjs';
import { listenKeys } from 'nanostores';
import { useRef, useCallback, useSyncExternalStore } from '@lynx-js/react';
import '@better-fetch/fetch';
import '../../shared/better-auth.DR3R5wdU.mjs';
import '@better-auth/core/env';
import '@better-auth/core/error';
import '../../shared/better-auth.BYWGbmZ5.mjs';
import '../../shared/better-auth.msGOU0m9.mjs';

function useStore(store, options = {}) {
  let snapshotRef = useRef(store.get());
  const { keys, deps = [store, keys] } = options;
  let subscribe = useCallback((onChange) => {
    const emitChange = (value) => {
      if (snapshotRef.current === value) return;
      snapshotRef.current = value;
      onChange();
    };
    emitChange(store.value);
    if (keys?.length) {
      return listenKeys(store, keys, emitChange);
    }
    return store.listen(emitChange);
  }, deps);
  let get = () => snapshotRef.current;
  return useSyncExternalStore(subscribe, get, get);
}

function getAtomKey(str) {
  return `use${capitalizeFirstLetter(str)}`;
}
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function createAuthClient(options) {
  const {
    pluginPathMethods,
    pluginsActions,
    pluginsAtoms,
    $fetch,
    $store,
    atomListeners
  } = getClientConfig(options);
  let resolvedHooks = {};
  for (const [key, value] of Object.entries(pluginsAtoms)) {
    resolvedHooks[getAtomKey(key)] = () => useStore(value);
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

export { capitalizeFirstLetter, createAuthClient, useStore };
