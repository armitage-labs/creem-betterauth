export * from '@better-auth/core/env';
export * from '@better-auth/core';
export { BetterAuthAdvancedOptions, BetterAuthClientOptions, BetterAuthClientPlugin, BetterAuthCookies, BetterAuthOptions, BetterAuthPlugin, BetterAuthRateLimitOptions, ClientAtomListener, ClientStore } from '@better-auth/core';
export * from '@better-auth/core/oauth2';
export * from '@better-auth/core/error';
export * from '@better-auth/core/utils';
export { f as AdditionalSessionFieldsInput, g as AdditionalSessionFieldsOutput, d as AdditionalUserFieldsInput, e as AdditionalUserFieldsOutput, A as Auth, i as FilterActions, F as FilteredAPI, b as InferAPI, h as InferPluginTypes, a as InferSession, j as InferSessionAPI, I as InferUser, M as Models, W as WithJsDoc, c as betterAuth } from './shared/better-auth.BUpnjBGu.js';
export { HookEndpointContext, init } from './types/index.js';
export { I as InferOptionSchema, a as InferPluginErrorCodes } from './shared/better-auth.DyhDNJOb.js';
export { A as Adapter, b as AdapterInstance, a as AdapterSchemaCreation, T as TransactionAdapter } from './shared/better-auth.Bn2XUCG7.js';
export { A as AtomListener, C as ClientOptions, b as InferActions, h as InferAdditionalFromClient, a as InferClientAPI, c as InferErrorCodes, e as InferPluginsFromClient, f as InferSessionFromClient, g as InferUserFromClient, I as IsSignal, i as SessionQueryParams, S as Store } from './shared/better-auth.BNARIIb2.js';
export { H as HIDE_METADATA } from './shared/better-auth.DEHJp1rk.js';
export { g as generateState, p as parseState } from './shared/better-auth.ComctQAf.js';
export * from 'better-call';
export { APIError } from 'better-call';
export * from 'zod/v4';
export * from 'zod/v4/core';
export { A as Awaitable, D as DeepPartial, E as Expand, H as HasRequiredKeys, c as LiteralNumber, L as LiteralString, e as LiteralUnion, O as OmitId, d as PreserveJSDoc, a as Prettify, P as PrettifyDeep, b as Primitive, R as RequiredKeysOf, S as StripEmptyObjects, U as UnionToIntersection, W as WithoutEmpty } from './shared/better-auth.DNnBkMGu.js';
export { TelemetryEvent, createTelemetry, getTelemetryAuthConfig } from '@better-auth/telemetry';
export { Account, RateLimit, Session, User, Verification } from '@better-auth/core/db';
export { Where } from '@better-auth/core/db/adapter';
import 'packages/core/dist/oauth2';
import './shared/better-auth.kD29xbrE.js';
import 'zod';
import '@better-auth/core/middleware';
import '@better-fetch/fetch';

declare function capitalizeFirstLetter(str: string): string;

declare const generateId: (size?: number) => string;

export { capitalizeFirstLetter, generateId };
