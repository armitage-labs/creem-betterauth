import { atom } from 'nanostores';
import '@better-fetch/fetch';
import '@better-auth/core/env';
import '@better-auth/core/error';
import { u as useAuthQuery } from '../../shared/better-auth.BYWGbmZ5.mjs';
import { c as defaultRoles, o as ownerAc, m as memberAc, b as adminAc } from '../../shared/better-auth.DevHHPLH.mjs';
import { h as hasPermissionFn } from '../../shared/better-auth.DaEBQJp_.mjs';
import { startRegistration, WebAuthnError, startAuthentication } from '@simplewebauthn/browser';
export { t as twoFactorClient } from '../../shared/better-auth.Ddw8bVyV.mjs';
import { u as userAc, b as adminAc$1 } from '../../shared/better-auth.CP-SWMbr.mjs';
import { h as hasPermission } from '../../shared/better-auth.BjOWrlEY.mjs';
export { d as deviceAuthorizationClient } from '../../shared/better-auth.BpA03GIs.mjs';
import '../../shared/better-auth.BLxPPg5G.mjs';

const clientSideHasPermission = (input) => {
  const acRoles = input.options.roles || defaultRoles;
  return hasPermissionFn(input, acRoles);
};
const organizationClient = (options) => {
  const $listOrg = atom(false);
  const $activeOrgSignal = atom(false);
  const $activeMemberSignal = atom(false);
  const $activeMemberRoleSignal = atom(false);
  const roles = {
    admin: adminAc,
    member: memberAc,
    owner: ownerAc,
    ...options?.roles
  };
  return {
    id: "organization",
    $InferServerPlugin: {},
    getActions: ($fetch, _$store, co) => ({
      $Infer: {
        ActiveOrganization: {},
        Organization: {},
        Invitation: {},
        Member: {},
        Team: {}
      },
      organization: {
        checkRolePermission: (data) => {
          const isAuthorized = clientSideHasPermission({
            role: data.role,
            options: {
              ac: options?.ac,
              roles
            },
            permissions: data.permissions ?? data.permission
          });
          return isAuthorized;
        }
      }
    }),
    getAtoms: ($fetch) => {
      const listOrganizations = useAuthQuery(
        $listOrg,
        "/organization/list",
        $fetch,
        {
          method: "GET"
        }
      );
      const activeOrganization = useAuthQuery(
        [$activeOrgSignal],
        "/organization/get-full-organization",
        $fetch,
        () => ({
          method: "GET"
        })
      );
      const activeMember = useAuthQuery(
        [$activeMemberSignal],
        "/organization/get-active-member",
        $fetch,
        {
          method: "GET"
        }
      );
      const activeMemberRole = useAuthQuery(
        [$activeMemberRoleSignal],
        "/organization/get-active-member-role",
        $fetch,
        {
          method: "GET"
        }
      );
      return {
        $listOrg,
        $activeOrgSignal,
        $activeMemberSignal,
        $activeMemberRoleSignal,
        activeOrganization,
        listOrganizations,
        activeMember,
        activeMemberRole
      };
    },
    pathMethods: {
      "/organization/get-full-organization": "GET",
      "/organization/list-user-teams": "GET"
    },
    atomListeners: [
      {
        matcher(path) {
          return path === "/organization/create" || path === "/organization/delete" || path === "/organization/update";
        },
        signal: "$listOrg"
      },
      {
        matcher(path) {
          return path.startsWith("/organization");
        },
        signal: "$activeOrgSignal"
      },
      {
        matcher(path) {
          return path.startsWith("/organization/set-active");
        },
        signal: "$sessionSignal"
      },
      {
        matcher(path) {
          return path.includes("/organization/update-member-role");
        },
        signal: "$activeMemberSignal"
      },
      {
        matcher(path) {
          return path.includes("/organization/update-member-role");
        },
        signal: "$activeMemberRoleSignal"
      }
    ]
  };
};
const inferOrgAdditionalFields = (schema) => {
  return {};
};

const usernameClient = () => {
  return {
    id: "username",
    $InferServerPlugin: {}
  };
};

const getPasskeyActions = ($fetch, {
  $listPasskeys,
  $store
}) => {
  const signInPasskey = async (opts, options) => {
    const response = await $fetch(
      "/passkey/generate-authenticate-options",
      {
        method: "POST",
        throw: false
      }
    );
    if (!response.data) {
      return response;
    }
    try {
      const res = await startAuthentication({
        optionsJSON: response.data,
        useBrowserAutofill: opts?.autoFill
      });
      const verified = await $fetch("/passkey/verify-authentication", {
        body: {
          response: res
        },
        ...opts?.fetchOptions,
        ...options,
        method: "POST",
        throw: false
      });
      $listPasskeys.set(Math.random());
      $store.notify("$sessionSignal");
      return verified;
    } catch (e) {
      return {
        data: null,
        error: {
          code: "AUTH_CANCELLED",
          message: "auth cancelled",
          status: 400,
          statusText: "BAD_REQUEST"
        }
      };
    }
  };
  const registerPasskey = async (opts, fetchOpts) => {
    const options = await $fetch(
      "/passkey/generate-register-options",
      {
        method: "GET",
        query: {
          ...opts?.authenticatorAttachment && {
            authenticatorAttachment: opts.authenticatorAttachment
          },
          ...opts?.name && {
            name: opts.name
          }
        },
        throw: false
      }
    );
    if (!options.data) {
      return options;
    }
    try {
      const res = await startRegistration({
        optionsJSON: options.data,
        useAutoRegister: opts?.useAutoRegister
      });
      const verified = await $fetch("/passkey/verify-registration", {
        ...opts?.fetchOptions,
        ...fetchOpts,
        body: {
          response: res,
          name: opts?.name
        },
        method: "POST",
        throw: false
      });
      if (!verified.data) {
        return verified;
      }
      $listPasskeys.set(Math.random());
    } catch (e) {
      if (e instanceof WebAuthnError) {
        if (e.code === "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED") {
          return {
            data: null,
            error: {
              code: e.code,
              message: "previously registered",
              status: 400,
              statusText: "BAD_REQUEST"
            }
          };
        }
        if (e.code === "ERROR_CEREMONY_ABORTED") {
          return {
            data: null,
            error: {
              code: e.code,
              message: "registration cancelled",
              status: 400,
              statusText: "BAD_REQUEST"
            }
          };
        }
        return {
          data: null,
          error: {
            code: e.code,
            message: e.message,
            status: 400,
            statusText: "BAD_REQUEST"
          }
        };
      }
      return {
        data: null,
        error: {
          code: "UNKNOWN_ERROR",
          message: e instanceof Error ? e.message : "unknown error",
          status: 500,
          statusText: "INTERNAL_SERVER_ERROR"
        }
      };
    }
  };
  return {
    signIn: {
      /**
       * Sign in with a registered passkey
       */
      passkey: signInPasskey
    },
    passkey: {
      /**
       * Add a passkey to the user account
       */
      addPasskey: registerPasskey
    },
    /**
     * Inferred Internal Types
     */
    $Infer: {}
  };
};
const passkeyClient = () => {
  const $listPasskeys = atom();
  return {
    id: "passkey",
    $InferServerPlugin: {},
    getActions: ($fetch, $store) => getPasskeyActions($fetch, {
      $listPasskeys,
      $store
    }),
    getAtoms($fetch) {
      const listPasskeys = useAuthQuery(
        $listPasskeys,
        "/passkey/list-user-passkeys",
        $fetch,
        {
          method: "GET"
        }
      );
      return {
        listPasskeys,
        $listPasskeys
      };
    },
    pathMethods: {
      "/passkey/register": "POST",
      "/passkey/authenticate": "POST"
    },
    atomListeners: [
      {
        matcher(path) {
          return path === "/passkey/verify-registration" || path === "/passkey/delete-passkey" || path === "/passkey/update-passkey" || path === "/sign-out";
        },
        signal: "$listPasskeys"
      },
      {
        matcher: (path) => path === "/passkey/verify-authentication",
        signal: "$sessionSignal"
      }
    ]
  };
};

const magicLinkClient = () => {
  return {
    id: "magic-link",
    $InferServerPlugin: {}
  };
};

const phoneNumberClient = () => {
  return {
    id: "phoneNumber",
    $InferServerPlugin: {},
    atomListeners: [
      {
        matcher(path) {
          return path === "/phone-number/update" || path === "/phone-number/verify";
        },
        signal: "$sessionSignal"
      }
    ]
  };
};

const anonymousClient = () => {
  return {
    id: "anonymous",
    $InferServerPlugin: {},
    pathMethods: {
      "/sign-in/anonymous": "POST"
    }
  };
};

const inferAdditionalFields = (schema) => {
  return {
    id: "additional-fields-client",
    $InferServerPlugin: {}
  };
};

const adminClient = (options) => {
  const roles = {
    admin: adminAc$1,
    user: userAc,
    ...options?.roles
  };
  return {
    id: "admin-client",
    $InferServerPlugin: {},
    getActions: () => ({
      admin: {
        checkRolePermission: (data) => {
          const isAuthorized = hasPermission({
            role: data.role,
            options: {
              ac: options?.ac,
              roles
            },
            permissions: data.permissions ?? data.permission
          });
          return isAuthorized;
        }
      }
    }),
    pathMethods: {
      "/admin/list-users": "GET",
      "/admin/stop-impersonating": "POST"
    }
  };
};

const genericOAuthClient = () => {
  return {
    id: "generic-oauth-client",
    $InferServerPlugin: {}
  };
};

const jwtClient = () => {
  return {
    id: "better-auth-client",
    $InferServerPlugin: {}
  };
};

const multiSessionClient = () => {
  return {
    id: "multi-session",
    $InferServerPlugin: {},
    atomListeners: [
      {
        matcher(path) {
          return path === "/multi-session/set-active";
        },
        signal: "$sessionSignal"
      }
    ]
  };
};

const emailOTPClient = () => {
  return {
    id: "email-otp",
    $InferServerPlugin: {}
  };
};

let isRequestInProgress = false;
const oneTapClient = (options) => {
  return {
    id: "one-tap",
    getActions: ($fetch, _) => ({
      oneTap: async (opts, fetchOptions) => {
        if (isRequestInProgress) {
          console.warn(
            "A Google One Tap request is already in progress. Please wait."
          );
          return;
        }
        isRequestInProgress = true;
        try {
          if (typeof window === "undefined" || !window.document) {
            console.warn(
              "Google One Tap is only available in browser environments"
            );
            return;
          }
          const { autoSelect, cancelOnTapOutside, context } = opts ?? {};
          const contextValue = context ?? options.context ?? "signin";
          await loadGoogleScript();
          await new Promise((resolve, reject) => {
            let isResolved = false;
            const baseDelay = options.promptOptions?.baseDelay ?? 1e3;
            const maxAttempts = options.promptOptions?.maxAttempts ?? 5;
            window.google?.accounts.id.initialize({
              client_id: options.clientId,
              callback: async (response) => {
                isResolved = true;
                try {
                  await $fetch("/one-tap/callback", {
                    method: "POST",
                    body: { idToken: response.credential },
                    ...opts?.fetchOptions,
                    ...fetchOptions
                  });
                  if (!opts?.fetchOptions && !fetchOptions || opts?.callbackURL) {
                    window.location.href = opts?.callbackURL ?? "/";
                  }
                  resolve();
                } catch (error) {
                  console.error("Error during One Tap callback:", error);
                  reject(error);
                }
              },
              auto_select: autoSelect,
              cancel_on_tap_outside: cancelOnTapOutside,
              context: contextValue,
              ...options.additionalOptions
            });
            const handlePrompt = (attempt) => {
              if (isResolved) return;
              window.google?.accounts.id.prompt((notification) => {
                if (isResolved) return;
                if (notification.isDismissedMoment && notification.isDismissedMoment()) {
                  if (attempt < maxAttempts) {
                    const delay = Math.pow(2, attempt) * baseDelay;
                    setTimeout(() => handlePrompt(attempt + 1), delay);
                  } else {
                    opts?.onPromptNotification?.(notification);
                  }
                } else if (notification.isSkippedMoment && notification.isSkippedMoment()) {
                  if (attempt < maxAttempts) {
                    const delay = Math.pow(2, attempt) * baseDelay;
                    setTimeout(() => handlePrompt(attempt + 1), delay);
                  } else {
                    opts?.onPromptNotification?.(notification);
                  }
                }
              });
            };
            handlePrompt(0);
          });
        } catch (error) {
          console.error("Error during Google One Tap flow:", error);
          throw error;
        } finally {
          isRequestInProgress = false;
        }
      }
    }),
    getAtoms($fetch) {
      return {};
    }
  };
};
const loadGoogleScript = () => {
  return new Promise((resolve) => {
    if (window.googleScriptInitialized) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.googleScriptInitialized = true;
      resolve();
    };
    document.head.appendChild(script);
  });
};

const customSessionClient = () => {
  return InferServerPlugin();
};

const InferServerPlugin = () => {
  return {
    id: "infer-server-plugin",
    $InferServerPlugin: {}
  };
};

const ssoClient = () => {
  return {
    id: "sso-client",
    $InferServerPlugin: {}
  };
};

const oidcClient = () => {
  return {
    id: "oidc-client",
    $InferServerPlugin: {}
  };
};

const apiKeyClient = () => {
  return {
    id: "api-key",
    $InferServerPlugin: {},
    pathMethods: {
      "/api-key/create": "POST",
      "/api-key/delete": "POST",
      "/api-key/delete-all-expired-api-keys": "POST"
    }
  };
};

const oneTimeTokenClient = () => {
  return {
    id: "one-time-token",
    $InferServerPlugin: {}
  };
};

const siweClient = () => {
  return {
    id: "siwe",
    $InferServerPlugin: {}
  };
};

function getCookieValue(name) {
  if (typeof document === "undefined") {
    return null;
  }
  const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : null;
}
const lastLoginMethodClient = (config = {}) => {
  const cookieName = config.cookieName || "better-auth.last_used_login_method";
  return {
    id: "last-login-method-client",
    getActions() {
      return {
        /**
         * Get the last used login method from cookies
         * @returns The last used login method or null if not found
         */
        getLastUsedLoginMethod: () => {
          return getCookieValue(cookieName);
        },
        /**
         * Clear the last used login method cookie
         * This sets the cookie with an expiration date in the past
         */
        clearLastUsedLoginMethod: () => {
          if (typeof document !== "undefined") {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          }
        },
        /**
         * Check if a specific login method was the last used
         * @param method The method to check
         * @returns True if the method was the last used, false otherwise
         */
        isLastUsedLoginMethod: (method) => {
          const lastMethod = getCookieValue(cookieName);
          return lastMethod === method;
        }
      };
    }
  };
};

export { InferServerPlugin, adminClient, anonymousClient, apiKeyClient, clientSideHasPermission, customSessionClient, emailOTPClient, genericOAuthClient, getPasskeyActions, inferAdditionalFields, inferOrgAdditionalFields, jwtClient, lastLoginMethodClient, magicLinkClient, multiSessionClient, oidcClient, oneTapClient, oneTimeTokenClient, organizationClient, passkeyClient, phoneNumberClient, siweClient, ssoClient, usernameClient };
