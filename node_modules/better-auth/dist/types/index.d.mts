import { BetterAuthOptions, AuthContext } from '@better-auth/core';
export { BetterAuthAdvancedOptions, BetterAuthClientOptions, BetterAuthClientPlugin, BetterAuthCookies, BetterAuthOptions, BetterAuthPlugin, BetterAuthRateLimitOptions, ClientAtomListener, ClientStore } from '@better-auth/core';
export { f as AdditionalSessionFieldsInput, g as AdditionalSessionFieldsOutput, d as AdditionalUserFieldsInput, e as AdditionalUserFieldsOutput, i as FilterActions, F as FilteredAPI, b as InferAPI, h as InferPluginTypes, a as InferSession, j as InferSessionAPI, I as InferUser, M as Models } from '../shared/better-auth.CafnB7YV.mjs';
export { I as InferOptionSchema, a as InferPluginErrorCodes } from '../shared/better-auth.5wJlMsTX.mjs';
import { EndpointContext, InputContext } from 'better-call';
export { A as Adapter, b as AdapterInstance, a as AdapterSchemaCreation, T as TransactionAdapter } from '../shared/better-auth.Bn2XUCG7.mjs';
export { A as AtomListener, C as ClientOptions, b as InferActions, h as InferAdditionalFromClient, a as InferClientAPI, c as InferErrorCodes, e as InferPluginsFromClient, f as InferSessionFromClient, g as InferUserFromClient, I as IsSignal, i as SessionQueryParams, S as Store } from '../shared/better-auth.DmhgGCZk.mjs';
export { Account, RateLimit, Session, User, Verification } from '@better-auth/core/db';
export { Where } from '@better-auth/core/db/adapter';
import 'packages/core/dist/oauth2';
import '@better-auth/core/env';
import '../shared/better-auth.kD29xbrE.mjs';
import 'zod';
import '../shared/better-auth.DNnBkMGu.mjs';
import '@better-auth/core/error';
import 'zod/v4/core';
import '@better-auth/core/oauth2';
import '@better-auth/core/middleware';
import '@better-fetch/fetch';

declare const init: (options: BetterAuthOptions) => Promise<AuthContext>;

type HookEndpointContext = EndpointContext<string, any> & Omit<InputContext<string, any>, "method"> & {
    context: AuthContext & {
        returned?: unknown;
        responseHeaders?: Headers;
    };
    headers?: Headers;
};

export { init };
export type { HookEndpointContext };
