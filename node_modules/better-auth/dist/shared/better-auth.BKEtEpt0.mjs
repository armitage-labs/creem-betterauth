import { logger } from '@better-auth/core/env';

function safeJSONParse(data) {
  function reviver(_, value) {
    if (typeof value === "string") {
      const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
      if (iso8601Regex.test(value)) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
    }
    return value;
  }
  try {
    if (typeof data !== "string") {
      return data;
    }
    return JSON.parse(data, reviver);
  } catch (e) {
    logger.error("Error parsing JSON", { error: e });
    return null;
  }
}

export { safeJSONParse as s };
