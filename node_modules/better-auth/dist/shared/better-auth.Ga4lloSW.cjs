'use strict';

const env = require('@better-auth/core/env');
const z = require('zod');

function getIp(req, options) {
  if (options.advanced?.ipAddress?.disableIpTracking) {
    return null;
  }
  if (env.isTest()) {
    return "127.0.0.1";
  }
  if (env.isDevelopment()) {
    return "127.0.0.1";
  }
  const headers = "headers" in req ? req.headers : req;
  const defaultHeaders = ["x-forwarded-for"];
  const ipHeaders = options.advanced?.ipAddress?.ipAddressHeaders || defaultHeaders;
  for (const key of ipHeaders) {
    const value = "get" in headers ? headers.get(key) : headers[key];
    if (typeof value === "string") {
      const ip = value.split(",")[0].trim();
      if (isValidIP(ip)) {
        return ip;
      }
    }
  }
  return null;
}
function isValidIP(ip) {
  const ipv4 = z.z.ipv4().safeParse(ip);
  if (ipv4.success) {
    return true;
  }
  const ipv6 = z.z.ipv6().safeParse(ip);
  if (ipv6.success) {
    return true;
  }
  return false;
}

exports.getIp = getIp;
