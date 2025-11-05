import * as http from 'http';
import { IncomingHttpHeaders } from 'http';
import { A as Auth } from '../shared/better-auth.BUpnjBGu.js';
import 'packages/core/dist/oauth2';
import 'better-call';
import '@better-auth/core';
import '@better-auth/core/env';
import '../shared/better-auth.kD29xbrE.js';
import 'zod';
import '@better-auth/core/db';
import '../shared/better-auth.DyhDNJOb.js';
import '../shared/better-auth.DNnBkMGu.js';
import '@better-auth/core/error';
import 'zod/v4/core';
import '@better-auth/core/oauth2';
import '@better-auth/core/middleware';

declare const toNodeHandler: (auth: {
    handler: Auth["handler"];
} | Auth["handler"]) => (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void>;
declare function fromNodeHeaders(nodeHeaders: IncomingHttpHeaders): Headers;

export { fromNodeHeaders, toNodeHandler };
