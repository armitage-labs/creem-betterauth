'use strict';

const error = require('@better-auth/core/error');

function role(statements) {
  return {
    authorize(request, connector = "AND") {
      let success = false;
      for (const [requestedResource, requestedActions] of Object.entries(
        request
      )) {
        const allowedActions = statements[requestedResource];
        if (!allowedActions) {
          return {
            success: false,
            error: `You are not allowed to access resource: ${requestedResource}`
          };
        }
        if (Array.isArray(requestedActions)) {
          success = requestedActions.every(
            (requestedAction) => allowedActions.includes(requestedAction)
          );
        } else {
          if (typeof requestedActions === "object") {
            const actions = requestedActions;
            if (actions.connector === "OR") {
              success = actions.actions.some(
                (requestedAction) => allowedActions.includes(requestedAction)
              );
            } else {
              success = actions.actions.every(
                (requestedAction) => allowedActions.includes(requestedAction)
              );
            }
          } else {
            throw new error.BetterAuthError("Invalid access control request");
          }
        }
        if (success && connector === "OR") {
          return { success };
        }
        if (!success && connector === "AND") {
          return {
            success: false,
            error: `unauthorized to access resource "${requestedResource}"`
          };
        }
      }
      if (success) {
        return {
          success
        };
      }
      return {
        success: false,
        error: "Not authorized"
      };
    },
    statements
  };
}
function createAccessControl(s) {
  return {
    newRole(statements) {
      return role(statements);
    },
    statements: s
  };
}

exports.createAccessControl = createAccessControl;
exports.role = role;
