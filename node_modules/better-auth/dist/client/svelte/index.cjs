'use strict';

const proxy = require('../../shared/better-auth.8HJ5v58s.cjs');
const misc = require('../../shared/better-auth.BLDOwz3i.cjs');
require('@better-fetch/fetch');
require('../../shared/better-auth.Z-JVyRjt.cjs');
require('@better-auth/core/env');
require('@better-auth/core/error');
require('nanostores');
require('../../shared/better-auth.D9AYOecd.cjs');
require('../../shared/better-auth.DUNU0obG.cjs');

function createAuthClient(options) {
  const {
    pluginPathMethods,
    pluginsActions,
    pluginsAtoms,
    $fetch,
    atomListeners,
    $store
  } = proxy.getClientConfig(options);
  let resolvedHooks = {};
  for (const [key, value] of Object.entries(pluginsAtoms)) {
    resolvedHooks[`use${misc.capitalizeFirstLetter(key)}`] = () => value;
  }
  const routes = {
    ...pluginsActions,
    ...resolvedHooks,
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
