export { A as APIError, k as CookieOptions, C as CookiePrefixOptions, b as Endpoint, a as EndpointContext, E as EndpointOptions, H as HTTPMethod, W as HasRequiredKeys, v as InferBody, I as InferBodyInput, J as InferHeaders, K as InferHeadersInput, z as InferInputMethod, y as InferMethod, N as InferMiddlewareBody, Q as InferMiddlewareQuery, B as InferParam, D as InferParamInput, a0 as InferParamPath, a1 as InferParamWildCard, x as InferQuery, w as InferQueryInput, F as InferRequest, G as InferRequestInput, L as InferUse, T as InputContext, Y as IsEmptyObject, $ as MergeObject, u as Method, h as Middleware, e as MiddlewareContext, g as MiddlewareInputContext, M as MiddlewareOptions, d as MiddlewareResponse, n as OpenAPIParameter, O as OpenAPISchemaType, P as Path, X as Prettify, V as RequiredKeysOf, j as Router, R as RouterConfig, a2 as StandardSchemaV1, S as Status, Z as UnionToIntersection, _ as _statusCode, c as createEndpoint, U as createInternalContext, f as createMiddleware, i as createRouter, o as generator, l as getCookieKey, q as getHTML, r as hideInternalStackFrames, t as makeErrorForHideStackFrame, p as parseCookies, s as serializeCookie, m as serializeSignedCookie } from './router-DcqXHY8X.js';

type JSONResponse = {
    body: Record<string, any>;
    routerResponse: ResponseInit | undefined;
    status?: number;
    headers?: Record<string, string> | Headers;
    _flag: "json";
};
declare function toResponse(data?: any, init?: ResponseInit): Response;

export { type JSONResponse, toResponse };
