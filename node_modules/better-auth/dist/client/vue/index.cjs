'use strict';

const vue = require('vue');
const proxy = require('../../shared/better-auth.8HJ5v58s.cjs');
const misc = require('../../shared/better-auth.BLDOwz3i.cjs');
require('@better-fetch/fetch');
require('../../shared/better-auth.Z-JVyRjt.cjs');
require('@better-auth/core/env');
require('@better-auth/core/error');
require('nanostores');
require('../../shared/better-auth.D9AYOecd.cjs');
require('../../shared/better-auth.DUNU0obG.cjs');

function registerStore(store) {
  let instance = vue.getCurrentInstance();
  if (instance && instance.proxy) {
    let vm = instance.proxy;
    let cache = "_nanostores" in vm ? vm._nanostores : vm._nanostores = [];
    cache.push(store);
  }
}
function useStore(store) {
  let state = vue.shallowRef();
  let unsubscribe = store.subscribe((value) => {
    state.value = value;
  });
  vue.getCurrentScope() && vue.onScopeDispose(unsubscribe);
  if (process.env.NODE_ENV !== "production") {
    registerStore(store);
    return vue.readonly(state);
  }
  return state;
}

function getAtomKey(str) {
  return `use${misc.capitalizeFirstLetter(str)}`;
}
function createAuthClient(options) {
  const {
    baseURL,
    pluginPathMethods,
    pluginsActions,
    pluginsAtoms,
    $fetch,
    $store,
    atomListeners
  } = proxy.getClientConfig(options, false);
  let resolvedHooks = {};
  for (const [key, value] of Object.entries(pluginsAtoms)) {
    resolvedHooks[getAtomKey(key)] = () => useStore(value);
  }
  function useSession(useFetch) {
    if (useFetch) {
      const ref = useStore(pluginsAtoms.$sessionSignal);
      return useFetch(`${baseURL}/get-session`, {
        ref
      }).then((res) => {
        return {
          data: res.data,
          isPending: false,
          error: res.error
        };
      });
    }
    return resolvedHooks.useSession();
  }
  const routes = {
    ...pluginsActions,
    ...resolvedHooks,
    useSession,
    $fetch,
    $store
  };
  const proxy$1 = proxy.createDynamicPathProxy(
    routes,
    $fetch,
    pluginPathMethods,
    pluginsAtoms,
    atomListeners
  );
  return proxy$1;
}

exports.createAuthClient = createAuthClient;
