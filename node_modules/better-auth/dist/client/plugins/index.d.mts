import { OrganizationOptions, organization, InferMember, InferInvitation, Team, Organization, Member, Invitation, TeamMember, OrganizationRole } from '../../plugins/organization/index.mjs';
import { AccessControl, Role, Statements } from '../../plugins/access/index.mjs';
import * as _better_auth_core from '@better-auth/core';
import { BetterAuthOptions, ClientStore, BetterAuthPlugin } from '@better-auth/core';
import { DBFieldAttribute, User } from '@better-auth/core/db';
import { a as Prettify } from '../../shared/better-auth.DNnBkMGu.mjs';
import { i as SessionQueryParams } from '../../shared/better-auth.DmhgGCZk.mjs';
import * as nanostores from 'nanostores';
import { atom } from 'nanostores';
import * as _better_fetch_fetch from '@better-fetch/fetch';
import { BetterFetch, BetterFetchOption } from '@better-fetch/fetch';
import { username } from '../../plugins/username/index.mjs';
import { Session } from 'inspector';
import { Passkey, passkey } from '../../plugins/passkey/index.mjs';
export { twoFactorClient } from '../../plugins/two-factor/index.mjs';
import { magicLink } from '../../plugins/magic-link/index.mjs';
import { phoneNumber } from '../../plugins/phone-number/index.mjs';
import { anonymous } from '../../plugins/anonymous/index.mjs';
import { admin } from '../../plugins/admin/index.mjs';
import { genericOAuth } from '../../plugins/generic-oauth/index.mjs';
import { jwt } from '../../plugins/jwt/index.mjs';
import { multiSession } from '../../plugins/multi-session/index.mjs';
import { emailOTP } from '../../plugins/email-otp/index.mjs';
import { Auth } from 'better-auth';
import { sso } from '../../plugins/sso/index.mjs';
import { oidcProvider } from '../../plugins/oidc-provider/index.mjs';
import { a as apiKey } from '../../shared/better-auth.C72lhegY.mjs';
import { oneTimeToken } from '../../plugins/one-time-token/index.mjs';
import { siwe } from '../../plugins/siwe/index.mjs';
export { deviceAuthorizationClient } from '../../plugins/device-authorization/index.mjs';
export * from '@simplewebauthn/server';
export { global } from '@simplewebauthn/server';
import 'zod';
import '../../shared/better-auth.kD29xbrE.mjs';
import 'better-call';
import 'packages/core/dist/db';
import 'packages/core/dist';
import '../../plugins/organization/access/index.mjs';
import '../../shared/better-auth.CafnB7YV.mjs';
import 'packages/core/dist/oauth2';
import '@better-auth/core/env';
import '../../shared/better-auth.5wJlMsTX.mjs';
import '@better-auth/core/error';
import 'zod/v4/core';
import '@better-auth/core/oauth2';
import '@better-auth/core/middleware';
import 'jose';

type PermissionExclusive = {
    /**
     * @deprecated Use `permissions` instead
     */
    permission: {
        [key: string]: string[];
    };
    permissions?: never;
} | {
    permissions: {
        [key: string]: string[];
    };
    permission?: never;
};
type HasPermissionBaseInput = {
    role: string;
    options: OrganizationOptions;
    allowCreatorAllPermissions?: boolean;
} & PermissionExclusive;

/**
 * Using the same `hasPermissionFn` function, but without the need for a `ctx` parameter or the `organizationId` parameter.
 */
declare const clientSideHasPermission: (input: HasPermissionBaseInput) => boolean;
interface OrganizationClientOptions {
    ac?: AccessControl;
    roles?: {
        [key in string]: Role;
    };
    teams?: {
        enabled: boolean;
    };
    schema?: {
        organization?: {
            additionalFields?: {
                [key: string]: DBFieldAttribute;
            };
        };
        member?: {
            additionalFields?: {
                [key: string]: DBFieldAttribute;
            };
        };
        invitation?: {
            additionalFields?: {
                [key: string]: DBFieldAttribute;
            };
        };
        team?: {
            additionalFields?: {
                [key: string]: DBFieldAttribute;
            };
        };
        organizationRole?: {
            additionalFields?: {
                [key: string]: DBFieldAttribute;
            };
        };
    };
    dynamicAccessControl?: {
        enabled: boolean;
    };
}
declare const organizationClient: <CO extends OrganizationClientOptions>(options?: CO) => {
    id: "organization";
    $InferServerPlugin: ReturnType<typeof organization<{
        ac: CO["ac"] extends AccessControl ? CO["ac"] : AccessControl<{
            readonly organization: readonly ["update", "delete"];
            readonly member: readonly ["create", "update", "delete"];
            readonly invitation: readonly ["create", "cancel"];
            readonly team: readonly ["create", "update", "delete"];
            readonly ac: readonly ["create", "read", "update", "delete"];
        }>;
        roles: CO["roles"] extends Record<string, Role> ? CO["roles"] : {
            admin: Role;
            member: Role;
            owner: Role;
        };
        teams: {
            enabled: CO["teams"] extends {
                enabled: true;
            } ? true : false;
        };
        schema: CO["schema"];
        dynamicAccessControl: {
            enabled: CO["dynamicAccessControl"] extends {
                enabled: true;
            } ? true : false;
        };
    }>>;
    getActions: ($fetch: _better_fetch_fetch.BetterFetch, _$store: _better_auth_core.ClientStore, co: _better_auth_core.BetterAuthClientOptions | undefined) => {
        $Infer: {
            ActiveOrganization: CO["teams"] extends {
                enabled: true;
            } ? {
                members: InferMember<CO>[];
                invitations: InferInvitation<CO>[];
                teams: Team[];
            } & {
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } : {
                members: InferMember<CO>[];
                invitations: InferInvitation<CO>[];
            } & {
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            };
            Organization: Organization;
            Invitation: InferInvitation<CO>;
            Member: InferMember<CO>;
            Team: Team;
        };
        organization: {
            checkRolePermission: <R extends CO extends {
                roles: any;
            } ? keyof CO["roles"] : "admin" | "member" | "owner">(data: ({
                /**
                 * @deprecated Use `permissions` instead
                 */
                permission: { [key in keyof (CO["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly organization: readonly ["update", "delete"];
                    readonly member: readonly ["create", "update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                })]?: ((CO["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly organization: readonly ["update", "delete"];
                    readonly member: readonly ["create", "update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                })[key] extends readonly unknown[] ? (CO["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly organization: readonly ["update", "delete"];
                    readonly member: readonly ["create", "update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                })[key][number] : never)[] | undefined; };
                permissions?: never;
            } | {
                permissions: { [key in keyof (CO["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly organization: readonly ["update", "delete"];
                    readonly member: readonly ["create", "update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                })]?: ((CO["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly organization: readonly ["update", "delete"];
                    readonly member: readonly ["create", "update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                })[key] extends readonly unknown[] ? (CO["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly organization: readonly ["update", "delete"];
                    readonly member: readonly ["create", "update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                })[key][number] : never)[] | undefined; };
                permission?: never;
            }) & {
                role: R;
            }) => boolean;
        };
    };
    getAtoms: ($fetch: _better_fetch_fetch.BetterFetch) => {
        $listOrg: nanostores.PreinitializedWritableAtom<boolean> & object;
        $activeOrgSignal: nanostores.PreinitializedWritableAtom<boolean> & object;
        $activeMemberSignal: nanostores.PreinitializedWritableAtom<boolean> & object;
        $activeMemberRoleSignal: nanostores.PreinitializedWritableAtom<boolean> & object;
        activeOrganization: nanostores.PreinitializedWritableAtom<{
            data: Prettify<{
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & {
                members: (Member & {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | undefined;
                    };
                })[];
                invitations: Invitation[];
            }> | null;
            error: null | _better_fetch_fetch.BetterFetchError;
            isPending: boolean;
            isRefetching: boolean;
            refetch: (queryParams?: {
                query?: SessionQueryParams;
            } | undefined) => void;
        }> & object;
        listOrganizations: nanostores.PreinitializedWritableAtom<{
            data: {
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            }[] | null;
            error: null | _better_fetch_fetch.BetterFetchError;
            isPending: boolean;
            isRefetching: boolean;
            refetch: (queryParams?: {
                query?: SessionQueryParams;
            } | undefined) => void;
        }> & object;
        activeMember: nanostores.PreinitializedWritableAtom<{
            data: {
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            } | null;
            error: null | _better_fetch_fetch.BetterFetchError;
            isPending: boolean;
            isRefetching: boolean;
            refetch: (queryParams?: {
                query?: SessionQueryParams;
            } | undefined) => void;
        }> & object;
        activeMemberRole: nanostores.PreinitializedWritableAtom<{
            data: {
                role: string;
            } | null;
            error: null | _better_fetch_fetch.BetterFetchError;
            isPending: boolean;
            isRefetching: boolean;
            refetch: (queryParams?: {
                query?: SessionQueryParams;
            } | undefined) => void;
        }> & object;
    };
    pathMethods: {
        "/organization/get-full-organization": "GET";
        "/organization/list-user-teams": "GET";
    };
    atomListeners: ({
        matcher(path: string): path is "/organization/create" | "/organization/update" | "/organization/delete";
        signal: "$listOrg";
    } | {
        matcher(path: string): boolean;
        signal: "$activeOrgSignal";
    } | {
        matcher(path: string): boolean;
        signal: "$sessionSignal";
    } | {
        matcher(path: string): boolean;
        signal: "$activeMemberSignal";
    } | {
        matcher(path: string): boolean;
        signal: "$activeMemberRoleSignal";
    })[];
};
declare const inferOrgAdditionalFields: <O extends {
    options: BetterAuthOptions;
}, S extends OrganizationOptions["schema"] = undefined>(schema?: S) => undefined extends S ? O extends Object ? O extends {
    session?: {
        fields?: {
            activeOrganizationId?: string;
            activeTeamId?: string;
        };
    };
    organization?: {
        modelName?: string;
        fields?: { [key in keyof Omit<Organization, "id">]?: string; };
        additionalFields?: { [key in string]: DBFieldAttribute; };
    };
    member?: {
        modelName?: string;
        fields?: { [key in keyof Omit<Member, "id">]?: string; };
        additionalFields?: { [key in string]: DBFieldAttribute; };
    };
    invitation?: {
        modelName?: string;
        fields?: { [key in keyof Omit<Invitation, "id">]?: string; };
        additionalFields?: { [key in string]: DBFieldAttribute; };
    };
    team?: {
        modelName?: string;
        fields?: { [key in keyof Omit<Team, "id">]?: string; };
        additionalFields?: { [key in string]: DBFieldAttribute; };
    };
    teamMember?: {
        modelName?: string;
        fields?: { [key in keyof Omit<TeamMember, "id">]?: string; };
    };
    organizationRole?: {
        modelName?: string;
        fields?: { [key in keyof Omit<OrganizationRole, "id">]?: string; };
        additionalFields?: { [key in string]: DBFieldAttribute; };
    };
} ? O : ((O extends {
    options: any;
} ? O : {
    options: {
        plugins: [];
    };
})["options"]["plugins"][number] extends infer T ? T extends (O extends {
    options: any;
} ? O : {
    options: {
        plugins: [];
    };
})["options"]["plugins"][number] ? T extends {
    id: "organization";
} ? T : never : never : never) extends {
    options: {
        schema: infer S_1;
    };
} ? S_1 extends {
    session?: {
        fields?: {
            activeOrganizationId?: string;
            activeTeamId?: string;
        };
    };
    organization?: {
        modelName?: string;
        fields?: { [key in keyof Omit<Organization, "id">]?: string; };
        additionalFields?: { [key in string]: DBFieldAttribute; };
    };
    member?: {
        modelName?: string;
        fields?: { [key in keyof Omit<Member, "id">]?: string; };
        additionalFields?: { [key in string]: DBFieldAttribute; };
    };
    invitation?: {
        modelName?: string;
        fields?: { [key in keyof Omit<Invitation, "id">]?: string; };
        additionalFields?: { [key in string]: DBFieldAttribute; };
    };
    team?: {
        modelName?: string;
        fields?: { [key in keyof Omit<Team, "id">]?: string; };
        additionalFields?: { [key in string]: DBFieldAttribute; };
    };
    teamMember?: {
        modelName?: string;
        fields?: { [key in keyof Omit<TeamMember, "id">]?: string; };
    };
    organizationRole?: {
        modelName?: string;
        fields?: { [key in keyof Omit<OrganizationRole, "id">]?: string; };
        additionalFields?: { [key in string]: DBFieldAttribute; };
    };
} | undefined ? S_1 : undefined : undefined : undefined : S;

declare const usernameClient: () => {
    id: "username";
    $InferServerPlugin: ReturnType<typeof username>;
};

declare const getPasskeyActions: ($fetch: BetterFetch, { $listPasskeys, $store, }: {
    $listPasskeys: ReturnType<typeof atom<any>>;
    $store: ClientStore;
}) => {
    signIn: {
        /**
         * Sign in with a registered passkey
         */
        passkey: (opts?: {
            autoFill?: boolean;
            fetchOptions?: BetterFetchOption;
        }, options?: BetterFetchOption) => Promise<{
            data: null;
            error: {
                message?: string | undefined;
                status: number;
                statusText: string;
            };
        } | {
            data: {
                session: Session;
                user: User;
            };
            error: null;
        } | {
            data: null;
            error: {
                code: string;
                message: string;
                status: number;
                statusText: string;
            };
        }>;
    };
    passkey: {
        /**
         * Add a passkey to the user account
         */
        addPasskey: (opts?: {
            fetchOptions?: BetterFetchOption;
            /**
             * The name of the passkey. This is used to
             * identify the passkey in the UI.
             */
            name?: string;
            /**
             * The type of attachment for the passkey. Defaults to both
             * platform and cross-platform allowed, with platform preferred.
             */
            authenticatorAttachment?: "platform" | "cross-platform";
            /**
             * Try to silently create a passkey with the password manager that the user just signed
             * in with.
             * @default false
             */
            useAutoRegister?: boolean;
        }, fetchOpts?: BetterFetchOption) => Promise<{
            data: null;
            error: {
                message?: string | undefined;
                status: number;
                statusText: string;
            };
        } | {
            data: null;
            error: {
                code: string;
                message: string;
                status: number;
                statusText: string;
            };
        } | undefined>;
    };
    /**
     * Inferred Internal Types
     */
    $Infer: {
        Passkey: Passkey;
    };
};
declare const passkeyClient: () => {
    id: "passkey";
    $InferServerPlugin: ReturnType<typeof passkey>;
    getActions: ($fetch: BetterFetch, $store: ClientStore) => {
        signIn: {
            /**
             * Sign in with a registered passkey
             */
            passkey: (opts?: {
                autoFill?: boolean;
                fetchOptions?: BetterFetchOption;
            }, options?: BetterFetchOption) => Promise<{
                data: null;
                error: {
                    message?: string | undefined;
                    status: number;
                    statusText: string;
                };
            } | {
                data: {
                    session: Session;
                    user: User;
                };
                error: null;
            } | {
                data: null;
                error: {
                    code: string;
                    message: string;
                    status: number;
                    statusText: string;
                };
            }>;
        };
        passkey: {
            /**
             * Add a passkey to the user account
             */
            addPasskey: (opts?: {
                fetchOptions?: BetterFetchOption;
                /**
                 * The name of the passkey. This is used to
                 * identify the passkey in the UI.
                 */
                name?: string;
                /**
                 * The type of attachment for the passkey. Defaults to both
                 * platform and cross-platform allowed, with platform preferred.
                 */
                authenticatorAttachment?: "platform" | "cross-platform";
                /**
                 * Try to silently create a passkey with the password manager that the user just signed
                 * in with.
                 * @default false
                 */
                useAutoRegister?: boolean;
            }, fetchOpts?: BetterFetchOption) => Promise<{
                data: null;
                error: {
                    message?: string | undefined;
                    status: number;
                    statusText: string;
                };
            } | {
                data: null;
                error: {
                    code: string;
                    message: string;
                    status: number;
                    statusText: string;
                };
            } | undefined>;
        };
        /**
         * Inferred Internal Types
         */
        $Infer: {
            Passkey: Passkey;
        };
    };
    getAtoms($fetch: BetterFetch): {
        listPasskeys: nanostores.PreinitializedWritableAtom<{
            data: Passkey[] | null;
            error: null | _better_fetch_fetch.BetterFetchError;
            isPending: boolean;
            isRefetching: boolean;
            refetch: (queryParams?: {
                query?: SessionQueryParams;
            } | undefined) => void;
        }> & object;
        $listPasskeys: nanostores.PreinitializedWritableAtom<any> & object;
    };
    pathMethods: {
        "/passkey/register": "POST";
        "/passkey/authenticate": "POST";
    };
    atomListeners: ({
        matcher(path: string): path is "/passkey/verify-registration" | "/passkey/delete-passkey" | "/passkey/update-passkey" | "/sign-out";
        signal: "$listPasskeys";
    } | {
        matcher: (path: string) => path is "/passkey/verify-authentication";
        signal: "$sessionSignal";
    })[];
};

declare const magicLinkClient: () => {
    id: "magic-link";
    $InferServerPlugin: ReturnType<typeof magicLink>;
};

declare const phoneNumberClient: () => {
    id: "phoneNumber";
    $InferServerPlugin: ReturnType<typeof phoneNumber>;
    atomListeners: {
        matcher(path: string): path is "/phone-number/verify" | "/phone-number/update";
        signal: "$sessionSignal";
    }[];
};

declare const anonymousClient: () => {
    id: "anonymous";
    $InferServerPlugin: ReturnType<typeof anonymous>;
    pathMethods: {
        "/sign-in/anonymous": "POST";
    };
};

declare const inferAdditionalFields: <T, S extends {
    user?: {
        [key: string]: DBFieldAttribute;
    };
    session?: {
        [key: string]: DBFieldAttribute;
    };
} = {}>(schema?: S) => {
    id: "additional-fields-client";
    $InferServerPlugin: ((T extends BetterAuthOptions ? T : T extends {
        options: BetterAuthOptions;
    } ? T["options"] : never) extends never ? S extends {
        user?: {
            [key: string]: DBFieldAttribute;
        };
        session?: {
            [key: string]: DBFieldAttribute;
        };
    } ? {
        id: "additional-fields-client";
        schema: {
            user: {
                fields: S["user"] extends object ? S["user"] : {};
            };
            session: {
                fields: S["session"] extends object ? S["session"] : {};
            };
        };
    } : never : (T extends BetterAuthOptions ? T : T extends {
        options: BetterAuthOptions;
    } ? T["options"] : never) extends BetterAuthOptions ? {
        id: "additional-fields";
        schema: {
            user: {
                fields: (T extends BetterAuthOptions ? T : T extends {
                    options: BetterAuthOptions;
                } ? T["options"] : never)["user"] extends {
                    additionalFields: infer U;
                } ? U : {};
            };
            session: {
                fields: (T extends BetterAuthOptions ? T : T extends {
                    options: BetterAuthOptions;
                } ? T["options"] : never)["session"] extends {
                    additionalFields: infer U;
                } ? U : {};
            };
        };
    } : never) extends BetterAuthPlugin ? (T extends BetterAuthOptions ? T : T extends {
        options: BetterAuthOptions;
    } ? T["options"] : never) extends never ? S extends {
        user?: {
            [key: string]: DBFieldAttribute;
        };
        session?: {
            [key: string]: DBFieldAttribute;
        };
    } ? {
        id: "additional-fields-client";
        schema: {
            user: {
                fields: S["user"] extends object ? S["user"] : {};
            };
            session: {
                fields: S["session"] extends object ? S["session"] : {};
            };
        };
    } : never : (T extends BetterAuthOptions ? T : T extends {
        options: BetterAuthOptions;
    } ? T["options"] : never) extends BetterAuthOptions ? {
        id: "additional-fields";
        schema: {
            user: {
                fields: (T extends BetterAuthOptions ? T : T extends {
                    options: BetterAuthOptions;
                } ? T["options"] : never)["user"] extends {
                    additionalFields: infer U;
                } ? U : {};
            };
            session: {
                fields: (T extends BetterAuthOptions ? T : T extends {
                    options: BetterAuthOptions;
                } ? T["options"] : never)["session"] extends {
                    additionalFields: infer U;
                } ? U : {};
            };
        };
    } : never : undefined;
};

interface AdminClientOptions {
    ac?: AccessControl;
    roles?: {
        [key in string]: Role;
    };
}
declare const adminClient: <O extends AdminClientOptions>(options?: O) => {
    id: "admin-client";
    $InferServerPlugin: ReturnType<typeof admin<{
        ac: O["ac"] extends AccessControl ? O["ac"] : AccessControl<{
            readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
            readonly session: readonly ["list", "revoke", "delete"];
        }>;
        roles: O["roles"] extends Record<string, Role> ? O["roles"] : {
            admin: Role;
            user: Role;
        };
    }>>;
    getActions: () => {
        admin: {
            checkRolePermission: <R extends O extends {
                roles: any;
            } ? keyof O["roles"] : "admin" | "user">(data: ({
                /**
                 * @deprecated Use `permissions` instead
                 */
                permission: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                    readonly session: readonly ["list", "revoke", "delete"];
                })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                    readonly session: readonly ["list", "revoke", "delete"];
                })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                    readonly session: readonly ["list", "revoke", "delete"];
                })[key][number] : never)[] | undefined; };
                permissions?: never;
            } | {
                permissions: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                    readonly session: readonly ["list", "revoke", "delete"];
                })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                    readonly session: readonly ["list", "revoke", "delete"];
                })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                    readonly user: readonly ["create", "list", "set-role", "ban", "impersonate", "delete", "set-password", "get", "update"];
                    readonly session: readonly ["list", "revoke", "delete"];
                })[key][number] : never)[] | undefined; };
                permission?: never;
            }) & {
                role: R;
            }) => boolean;
        };
    };
    pathMethods: {
        "/admin/list-users": "GET";
        "/admin/stop-impersonating": "POST";
    };
};

declare const genericOAuthClient: () => {
    id: "generic-oauth-client";
    $InferServerPlugin: ReturnType<typeof genericOAuth>;
};

declare const jwtClient: () => {
    id: "better-auth-client";
    $InferServerPlugin: ReturnType<typeof jwt>;
};

declare const multiSessionClient: () => {
    id: "multi-session";
    $InferServerPlugin: ReturnType<typeof multiSession>;
    atomListeners: {
        matcher(path: string): path is "/multi-session/set-active";
        signal: "$sessionSignal";
    }[];
};

declare const emailOTPClient: () => {
    id: "email-otp";
    $InferServerPlugin: ReturnType<typeof emailOTP>;
};

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    prompt: (callback?: (notification: any) => void) => void;
                };
            };
        };
        googleScriptInitialized?: boolean;
    }
}
interface GoogleOneTapOptions {
    /**
     * Google client ID
     */
    clientId: string;
    /**
     * Auto select the account if the user is already signed in
     */
    autoSelect?: boolean;
    /**
     * Cancel the flow when the user taps outside the prompt
     */
    cancelOnTapOutside?: boolean;
    /**
     * The mode to use for the Google One Tap flow
     *
     * popup: Use a popup window
     * redirect: Redirect the user to the Google One Tap flow
     *
     * @default "popup"
     */
    uxMode?: "popup" | "redirect";
    /**
     * The context to use for the Google One Tap flow. See https://developers.google.com/identity/gsi/web/reference/js-reference
     *
     * @default "signin"
     */
    context?: "signin" | "signup" | "use";
    /**
     * Additional configuration options to pass to the Google One Tap API.
     */
    additionalOptions?: Record<string, any>;
    /**
     * Configuration options for the prompt and exponential backoff behavior.
     */
    promptOptions?: {
        /**
         * Base delay (in milliseconds) for exponential backoff.
         * @default 1000
         */
        baseDelay?: number;
        /**
         * Maximum number of prompt attempts before calling onPromptNotification.
         * @default 5
         */
        maxAttempts?: number;
    };
}
interface GoogleOneTapActionOptions extends Omit<GoogleOneTapOptions, "clientId" | "promptOptions"> {
    fetchOptions?: BetterFetchOption;
    /**
     * Callback URL.
     */
    callbackURL?: string;
    /**
     * Optional callback that receives the prompt notification if (or when) the prompt is dismissed or skipped.
     * This lets you render an alternative UI (e.g. a Google Sign-In button) to restart the process.
     */
    onPromptNotification?: (notification: any) => void;
}
declare const oneTapClient: (options: GoogleOneTapOptions) => {
    id: "one-tap";
    getActions: ($fetch: _better_fetch_fetch.BetterFetch, _: _better_auth_core.ClientStore) => {
        oneTap: (opts?: GoogleOneTapActionOptions, fetchOptions?: BetterFetchOption) => Promise<void>;
    };
    getAtoms($fetch: _better_fetch_fetch.BetterFetch): {};
};

declare const customSessionClient: <A extends Auth | {
    options: BetterAuthOptions;
}>() => {
    id: "infer-server-plugin";
    $InferServerPlugin: (A extends {
        options: infer O;
    } ? O : A)["plugins"] extends (infer P)[] ? P extends {
        id: "custom-session";
    } ? P : never : never;
};

declare const InferServerPlugin: <AuthOrOption extends BetterAuthOptions | {
    options: BetterAuthOptions;
}, ID extends string>() => {
    id: "infer-server-plugin";
    $InferServerPlugin: (AuthOrOption extends {
        options: infer O;
    } ? O : AuthOrOption)["plugins"] extends (infer P)[] ? P extends {
        id: ID;
    } ? P : never : never;
};

declare const ssoClient: () => {
    id: "sso-client";
    $InferServerPlugin: ReturnType<typeof sso>;
};

declare const oidcClient: () => {
    id: "oidc-client";
    $InferServerPlugin: ReturnType<typeof oidcProvider>;
};

declare const apiKeyClient: () => {
    id: "api-key";
    $InferServerPlugin: ReturnType<typeof apiKey>;
    pathMethods: {
        "/api-key/create": "POST";
        "/api-key/delete": "POST";
        "/api-key/delete-all-expired-api-keys": "POST";
    };
};

declare const oneTimeTokenClient: () => {
    id: "one-time-token";
    $InferServerPlugin: ReturnType<typeof oneTimeToken>;
};

declare const siweClient: () => {
    id: "siwe";
    $InferServerPlugin: ReturnType<typeof siwe>;
};

/**
 * Configuration for the client-side last login method plugin
 */
interface LastLoginMethodClientConfig {
    /**
     * Name of the cookie to read the last login method from
     * @default "better-auth.last_used_login_method"
     */
    cookieName?: string;
}
/**
 * Client-side plugin to retrieve the last used login method
 */
declare const lastLoginMethodClient: (config?: LastLoginMethodClientConfig) => {
    id: "last-login-method-client";
    getActions(): {
        /**
         * Get the last used login method from cookies
         * @returns The last used login method or null if not found
         */
        getLastUsedLoginMethod: () => string | null;
        /**
         * Clear the last used login method cookie
         * This sets the cookie with an expiration date in the past
         */
        clearLastUsedLoginMethod: () => void;
        /**
         * Check if a specific login method was the last used
         * @param method The method to check
         * @returns True if the method was the last used, false otherwise
         */
        isLastUsedLoginMethod: (method: string) => boolean;
    };
};

export { InferServerPlugin, adminClient, anonymousClient, apiKeyClient, clientSideHasPermission, customSessionClient, emailOTPClient, genericOAuthClient, getPasskeyActions, inferAdditionalFields, inferOrgAdditionalFields, jwtClient, lastLoginMethodClient, magicLinkClient, multiSessionClient, oidcClient, oneTapClient, oneTimeTokenClient, organizationClient, passkeyClient, phoneNumberClient, siweClient, ssoClient, usernameClient };
export type { GoogleOneTapActionOptions, GoogleOneTapOptions, LastLoginMethodClientConfig };
