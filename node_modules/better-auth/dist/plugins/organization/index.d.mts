import { L as LiteralString } from '../../shared/better-auth.DNnBkMGu.mjs';
import * as z from 'zod';
import * as _better_auth_core_db from '@better-auth/core/db';
import { User, Session, DBFieldAttribute } from '@better-auth/core/db';
import * as _better_auth_core from '@better-auth/core';
import { AuthContext } from '@better-auth/core';
import { AccessControl, Role, Subset, Statements } from '../access/index.mjs';
import { e as InferAdditionalFieldsFromPluginOptions } from '../../shared/better-auth.kD29xbrE.mjs';
import * as better_call from 'better-call';
import { Prettify } from 'better-call';
import * as packages_core_dist_db from 'packages/core/dist/db';
import * as packages_core_dist from 'packages/core/dist';
import { defaultRoles } from './access/index.mjs';
export { adminAc, defaultAc, defaultStatements, memberAc, ownerAc } from './access/index.mjs';

interface OrganizationOptions {
    /**
     * Configure whether new users are able to create new organizations.
     * You can also pass a function that returns a boolean.
     *
     * 	@example
     * ```ts
     * allowUserToCreateOrganization: async (user) => {
     * 		const plan = await getUserPlan(user);
     *      return plan.name === "pro";
     * }
     * ```
     * @default true
     */
    allowUserToCreateOrganization?: boolean | ((user: User & Record<string, any>) => Promise<boolean> | boolean);
    /**
     * The maximum number of organizations a user can create.
     *
     * You can also pass a function that returns a boolean
     */
    organizationLimit?: number | ((user: User) => Promise<boolean> | boolean);
    /**
     * The role that is assigned to the creator of the
     * organization.
     *
     * @default "owner"
     */
    creatorRole?: string;
    /**
     * The maximum number of members allowed in an organization.
     *
     * @default 100
     */
    membershipLimit?: number;
    /**
     * Configure the roles and permissions for the
     * organization plugin.
     */
    ac?: AccessControl;
    /**
     * Custom permissions for roles.
     */
    roles?: {
        [key in string]?: Role<any>;
    };
    /**
     * Dynamic access control for the organization plugin.
     */
    dynamicAccessControl?: {
        /**
         * Whether to enable dynamic access control for the organization plugin.
         *
         * @default false
         */
        enabled?: boolean;
        /**
         * The maximum number of roles that can be created for an organization.
         *
         * @default Infinite
         */
        maximumRolesPerOrganization?: number | ((organizationId: string) => Promise<number> | number);
    };
    /**
     * Support for team.
     */
    teams?: {
        /**
         * Enable team features.
         */
        enabled: boolean;
        /**
         * Default team configuration
         */
        defaultTeam?: {
            /**
             * Enable creating a default team when an organization is created
             *
             * @default true
             */
            enabled: boolean;
            /**
             * Pass a custom default team creator function
             */
            customCreateDefaultTeam?: (organization: Organization & Record<string, any>, request?: Request) => Promise<Team & Record<string, any>>;
        };
        /**
         * Maximum number of teams an organization can have.
         *
         * You can pass a number or a function that returns a number
         *
         * @default "unlimited"
         *
         * @param organization
         * @param request
         * @returns
         */
        maximumTeams?: ((data: {
            organizationId: string;
            session: {
                user: User;
                session: Session;
            } | null;
        }, request?: Request) => number | Promise<number>) | number;
        /**
         * The maximum number of members per team.
         *
         * if `undefined`, there is no limit.
         *
         * @default undefined
         */
        maximumMembersPerTeam?: number | ((data: {
            teamId: string;
            session: {
                user: User;
                session: Session;
            };
            organizationId: string;
        }) => Promise<number> | number) | undefined;
        /**
         * By default, if an organization does only have one team, they'll not be able to remove it.
         *
         * You can disable this behavior by setting this to `false.
         *
         * @default false
         */
        allowRemovingAllTeams?: boolean;
    };
    /**
     * The expiration time for the invitation link.
     *
     * @default 48 hours
     */
    invitationExpiresIn?: number;
    /**
     * The maximum invitation a user can send.
     *
     * @default 100
     */
    invitationLimit?: number | ((data: {
        user: User;
        organization: Organization;
        member: Member;
    }, ctx: AuthContext) => Promise<number> | number);
    /**
     * Cancel pending invitations on re-invite.
     *
     * @default false
     */
    cancelPendingInvitationsOnReInvite?: boolean;
    /**
     * Require email verification on accepting or rejecting an invitation
     *
     * @default false
     */
    requireEmailVerificationOnInvitation?: boolean;
    /**
     * Send an email with the
     * invitation link to the user.
     *
     * Note: Better Auth doesn't
     * generate invitation URLs.
     * You'll need to construct the
     * URL using the invitation ID
     * and pass it to the
     * acceptInvitation endpoint for
     * the user to accept the
     * invitation.
     *
     * @example
     * ```ts
     * sendInvitationEmail: async (data) => {
     * 	const url = `https://yourapp.com/organization/
     * accept-invitation?id=${data.id}`;
     * 	await sendEmail(data.email, "Invitation to join
     * organization", `Click the link to join the
     * organization: ${url}`);
     * }
     * ```
     */
    sendInvitationEmail?: (data: {
        /**
         * the invitation id
         */
        id: string;
        /**
         * the role of the user
         */
        role: string;
        /**
         * the email of the user
         */
        email: string;
        /**
         * the organization the user is invited to join
         */
        organization: Organization;
        /**
         * the invitation object
         */
        invitation: Invitation;
        /**
         * the member who is inviting the user
         */
        inviter: Member & {
            user: User;
        };
    }, 
    /**
     * The request object
     */
    request?: Request) => Promise<void>;
    /**
     * The schema for the organization plugin.
     */
    schema?: {
        session?: {
            fields?: {
                activeOrganizationId?: string;
                activeTeamId?: string;
            };
        };
        organization?: {
            modelName?: string;
            fields?: {
                [key in keyof Omit<Organization, "id">]?: string;
            };
            additionalFields?: {
                [key in string]: DBFieldAttribute;
            };
        };
        member?: {
            modelName?: string;
            fields?: {
                [key in keyof Omit<Member, "id">]?: string;
            };
            additionalFields?: {
                [key in string]: DBFieldAttribute;
            };
        };
        invitation?: {
            modelName?: string;
            fields?: {
                [key in keyof Omit<Invitation, "id">]?: string;
            };
            additionalFields?: {
                [key in string]: DBFieldAttribute;
            };
        };
        team?: {
            modelName?: string;
            fields?: {
                [key in keyof Omit<Team, "id">]?: string;
            };
            additionalFields?: {
                [key in string]: DBFieldAttribute;
            };
        };
        teamMember?: {
            modelName?: string;
            fields?: {
                [key in keyof Omit<TeamMember, "id">]?: string;
            };
        };
        organizationRole?: {
            modelName?: string;
            fields?: {
                [key in keyof Omit<OrganizationRole, "id">]?: string;
            };
            additionalFields?: {
                [key in string]: DBFieldAttribute;
            };
        };
    };
    /**
     * Disable organization deletion
     *
     * @default false
     */
    disableOrganizationDeletion?: boolean;
    /**
     * Configure how organization deletion is handled
     *
     * @deprecated Use `organizationHooks` instead
     */
    organizationDeletion?: {
        /**
         * disable deleting organization
         *
         * @deprecated Use `disableOrganizationDeletion` instead
         */
        disabled?: boolean;
        /**
         * A callback that runs before the organization is
         * deleted
         *
         * @deprecated Use `organizationHooks` instead
         * @param data - organization and user object
         * @param request - the request object
         * @returns
         */
        beforeDelete?: (data: {
            organization: Organization;
            user: User;
        }, request?: Request) => Promise<void>;
        /**
         * A callback that runs after the organization is
         * deleted
         *
         * @deprecated Use `organizationHooks` instead
         * @param data - organization and user object
         * @param request - the request object
         * @returns
         */
        afterDelete?: (data: {
            organization: Organization;
            user: User;
        }, request?: Request) => Promise<void>;
    };
    /**
     * @deprecated Use `organizationHooks` instead
     */
    organizationCreation?: {
        disabled?: boolean;
        beforeCreate?: (data: {
            organization: Omit<Organization, "id"> & Record<string, any>;
            user: User & Record<string, any>;
        }, request?: Request) => Promise<void | {
            data: Record<string, any>;
        }>;
        afterCreate?: (data: {
            organization: Organization & Record<string, any>;
            member: Member & Record<string, any>;
            user: User & Record<string, any>;
        }, request?: Request) => Promise<void>;
    };
    /**
     * Hooks for organization
     */
    organizationHooks?: {
        /**
         * A callback that runs before the organization is created
         *
         * You can return a `data` object to override the default data.
         *
         * @example
         * ```ts
         * beforeCreateOrganization: async (data) => {
         * 	return {
         * 		data: {
         * 			...data.organization,
         * 		},
         * 	};
         * }
         * ```
         *
         * You can also throw `new APIError` to stop the organization creation.
         *
         * @example
         * ```ts
         * beforeCreateOrganization: async (data) => {
         * 	throw new APIError("BAD_REQUEST", {
         * 		message: "Organization creation is disabled",
         * 	});
         * }
         */
        beforeCreateOrganization?: (data: {
            organization: {
                name?: string;
                slug?: string;
                logo?: string;
                metadata?: Record<string, any>;
                [key: string]: any;
            };
            user: User & Record<string, any>;
        }) => Promise<void | {
            data: Record<string, any>;
        }>;
        /**
         * A callback that runs after the organization is created
         */
        afterCreateOrganization?: (data: {
            organization: Organization & Record<string, any>;
            member: Member & Record<string, any>;
            user: User & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before the organization is updated
         *
         * You can return a `data` object to override the default data.
         *
         * @example
         * ```ts
         * beforeUpdateOrganization: async (data) => {
         * 	return { data: { ...data.organization } };
         * }
         */
        beforeUpdateOrganization?: (data: {
            organization: {
                name?: string;
                slug?: string;
                logo?: string;
                metadata?: Record<string, any>;
                [key: string]: any;
            };
            user: User & Record<string, any>;
            member: Member & Record<string, any>;
        }) => Promise<void | {
            data: {
                name?: string;
                slug?: string;
                logo?: string;
                metadata?: Record<string, any>;
                [key: string]: any;
            };
        }>;
        /**
         * A callback that runs after the organization is updated
         *
         * @example
         * ```ts
         * afterUpdateOrganization: async (data) => {
         * 	console.log(data.organization);
         * }
         * ```
         */
        afterUpdateOrganization?: (data: {
            /**
             * Updated organization object
             *
             * This could be `null` if an adapter doesn't return updated organization.
             */
            organization: (Organization & Record<string, any>) | null;
            user: User & Record<string, any>;
            member: Member & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before the organization is deleted
         */
        beforeDeleteOrganization?: (data: {
            organization: Organization & Record<string, any>;
            user: User & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs after the organization is deleted
         */
        afterDeleteOrganization?: (data: {
            organization: Organization & Record<string, any>;
            user: User & Record<string, any>;
        }) => Promise<void>;
        /**
         * Member hooks
         */
        /**
         * A callback that runs before a member is added to an organization
         *
         * You can return a `data` object to override the default data.
         *
         * @example
         * ```ts
         * beforeAddMember: async (data) => {
         * 	return {
         * 		data: {
         * 			...data.member,
         * 			role: "custom-role"
         * 		}
         * 	};
         * }
         * ```
         */
        beforeAddMember?: (data: {
            member: {
                userId: string;
                organizationId: string;
                role: string;
                [key: string]: any;
            };
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void | {
            data: Record<string, any>;
        }>;
        /**
         * A callback that runs after a member is added to an organization
         */
        afterAddMember?: (data: {
            member: Member & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before a member is removed from an organization
         */
        beforeRemoveMember?: (data: {
            member: Member & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs after a member is removed from an organization
         */
        afterRemoveMember?: (data: {
            member: Member & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before a member's role is updated
         *
         * You can return a `data` object to override the default data.
         */
        beforeUpdateMemberRole?: (data: {
            member: Member & Record<string, any>;
            newRole: string;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void | {
            data: {
                role: string;
                [key: string]: any;
            };
        }>;
        /**
         * A callback that runs after a member's role is updated
         */
        afterUpdateMemberRole?: (data: {
            member: Member & Record<string, any>;
            previousRole: string;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * Invitation hooks
         */
        /**
         * A callback that runs before an invitation is created
         *
         * You can return a `data` object to override the default data.
         *
         * @example
         * ```ts
         * beforeCreateInvitation: async (data) => {
         * 	return {
         * 		data: {
         * 			...data.invitation,
         * 			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
         * 		}
         * 	};
         * }
         * ```
         */
        beforeCreateInvitation?: (data: {
            invitation: {
                email: string;
                role: string;
                organizationId: string;
                inviterId: string;
                teamId?: string;
                [key: string]: any;
            };
            inviter: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void | {
            data: Record<string, any>;
        }>;
        /**
         * A callback that runs after an invitation is created
         */
        afterCreateInvitation?: (data: {
            invitation: Invitation & Record<string, any>;
            inviter: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before an invitation is accepted
         */
        beforeAcceptInvitation?: (data: {
            invitation: Invitation & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs after an invitation is accepted
         */
        afterAcceptInvitation?: (data: {
            invitation: Invitation & Record<string, any>;
            member: Member & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before an invitation is rejected
         */
        beforeRejectInvitation?: (data: {
            invitation: Invitation & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs after an invitation is rejected
         */
        afterRejectInvitation?: (data: {
            invitation: Invitation & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before an invitation is cancelled
         */
        beforeCancelInvitation?: (data: {
            invitation: Invitation & Record<string, any>;
            cancelledBy: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs after an invitation is cancelled
         */
        afterCancelInvitation?: (data: {
            invitation: Invitation & Record<string, any>;
            cancelledBy: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * Team hooks (when teams are enabled)
         */
        /**
         * A callback that runs before a team is created
         *
         * You can return a `data` object to override the default data.
         */
        beforeCreateTeam?: (data: {
            team: {
                name: string;
                organizationId: string;
                [key: string]: any;
            };
            user?: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void | {
            data: Record<string, any>;
        }>;
        /**
         * A callback that runs after a team is created
         */
        afterCreateTeam?: (data: {
            team: Team & Record<string, any>;
            user?: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before a team is updated
         *
         * You can return a `data` object to override the default data.
         */
        beforeUpdateTeam?: (data: {
            team: Team & Record<string, any>;
            updates: {
                name?: string;
                [key: string]: any;
            };
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void | {
            data: Record<string, any>;
        }>;
        /**
         * A callback that runs after a team is updated
         */
        afterUpdateTeam?: (data: {
            team: (Team & Record<string, any>) | null;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before a team is deleted
         */
        beforeDeleteTeam?: (data: {
            team: Team & Record<string, any>;
            user?: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs after a team is deleted
         */
        afterDeleteTeam?: (data: {
            team: Team & Record<string, any>;
            user?: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before a member is added to a team
         */
        beforeAddTeamMember?: (data: {
            teamMember: {
                teamId: string;
                userId: string;
                [key: string]: any;
            };
            team: Team & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void | {
            data: Record<string, any>;
        }>;
        /**
         * A callback that runs after a member is added to a team
         */
        afterAddTeamMember?: (data: {
            teamMember: TeamMember & Record<string, any>;
            team: Team & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs before a member is removed from a team
         */
        beforeRemoveTeamMember?: (data: {
            teamMember: TeamMember & Record<string, any>;
            team: Team & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
        /**
         * A callback that runs after a member is removed from a team
         */
        afterRemoveTeamMember?: (data: {
            teamMember: TeamMember & Record<string, any>;
            team: Team & Record<string, any>;
            user: User & Record<string, any>;
            organization: Organization & Record<string, any>;
        }) => Promise<void>;
    };
}

declare const role: z.ZodString;
declare const invitationStatus: z.ZodDefault<z.ZodEnum<{
    pending: "pending";
    accepted: "accepted";
    rejected: "rejected";
    canceled: "canceled";
}>>;
declare const organizationSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    slug: z.ZodString;
    logo: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    metadata: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>]>>;
    createdAt: z.ZodDate;
}, z.core.$strip>;
declare const memberSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
    organizationId: z.ZodString;
    userId: z.ZodCoercedString<unknown>;
    role: z.ZodString;
    createdAt: z.ZodDefault<z.ZodDate>;
}, z.core.$strip>;
declare const invitationSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
    organizationId: z.ZodString;
    email: z.ZodString;
    role: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        pending: "pending";
        accepted: "accepted";
        rejected: "rejected";
        canceled: "canceled";
    }>>;
    teamId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    inviterId: z.ZodString;
    expiresAt: z.ZodDate;
}, z.core.$strip>;
declare const teamSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
    name: z.ZodString;
    organizationId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
declare const teamMemberSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
    teamId: z.ZodString;
    userId: z.ZodString;
    createdAt: z.ZodDefault<z.ZodDate>;
}, z.core.$strip>;
declare const organizationRoleSchema: z.ZodObject<{
    id: z.ZodDefault<z.ZodString>;
    organizationId: z.ZodString;
    role: z.ZodString;
    permission: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
type Organization = z.infer<typeof organizationSchema>;
type Member = z.infer<typeof memberSchema>;
type TeamMember = z.infer<typeof teamMemberSchema>;
type Team = z.infer<typeof teamSchema>;
type Invitation = z.infer<typeof invitationSchema>;
type InvitationInput = z.input<typeof invitationSchema>;
type MemberInput = z.input<typeof memberSchema>;
type TeamMemberInput = z.input<typeof teamMemberSchema>;
type OrganizationInput = z.input<typeof organizationSchema>;
type TeamInput = z.infer<typeof teamSchema>;
type OrganizationRole = z.infer<typeof organizationRoleSchema>;
declare const defaultRolesSchema: z.ZodUnion<readonly [z.ZodEnum<{
    member: "member";
    admin: "admin";
    owner: "owner";
}>, z.ZodArray<z.ZodEnum<{
    member: "member";
    admin: "admin";
    owner: "owner";
}>>]>;
type CustomRolesSchema<O> = O extends {
    roles: {
        [key: string]: any;
    };
} ? z.ZodType<keyof O["roles"] | Array<keyof O["roles"]>> : typeof defaultRolesSchema;
type InferOrganizationZodRolesFromOption<O extends OrganizationOptions | undefined> = CustomRolesSchema<O>;
type InferOrganizationRolesFromOption<O extends OrganizationOptions | undefined> = O extends {
    roles: any;
} ? keyof O["roles"] : "admin" | "member" | "owner";
type InvitationStatus = "pending" | "accepted" | "rejected" | "canceled";
type InferMember<O extends OrganizationOptions> = O["teams"] extends {
    enabled: true;
} ? {
    id: string;
    organizationId: string;
    role: InferOrganizationRolesFromOption<O>;
    createdAt: Date;
    userId: string;
    teamId?: string;
    user: {
        email: string;
        name: string;
        image?: string;
    };
} : {
    id: string;
    organizationId: string;
    role: InferOrganizationRolesFromOption<O>;
    createdAt: Date;
    userId: string;
    user: {
        email: string;
        name: string;
        image?: string;
    };
};
type InferOrganization<O extends OrganizationOptions, isClientSide extends boolean = true> = Prettify<Organization & InferAdditionalFieldsFromPluginOptions<"organization", O, isClientSide>>;
type InferTeam<O extends OrganizationOptions> = Prettify<Team & InferAdditionalFieldsFromPluginOptions<"team", O>>;
type InferInvitation<O extends OrganizationOptions> = (O["teams"] extends {
    enabled: true;
} ? {
    id: string;
    organizationId: string;
    email: string;
    role: InferOrganizationRolesFromOption<O>;
    status: InvitationStatus;
    inviterId: string;
    expiresAt: Date;
    teamId?: string;
} : {
    id: string;
    organizationId: string;
    email: string;
    role: InferOrganizationRolesFromOption<O>;
    status: InvitationStatus;
    inviterId: string;
    expiresAt: Date;
}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;

declare const getFullOrganization: <O extends OrganizationOptions>(options: O) => {
    <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
        body?: undefined;
    } & {
        method?: "GET" | undefined;
    } & {
        query?: {
            organizationId?: string | undefined;
            organizationSlug?: string | undefined;
            membersLimit?: string | number | undefined;
        } | undefined;
    } & {
        params?: Record<string, any>;
    } & {
        request?: Request;
    } & {
        headers: HeadersInit;
    } & {
        asResponse?: boolean;
        returnHeaders?: boolean;
        use?: better_call.Middleware[];
        path?: string;
    } & {
        asResponse?: AsResponse | undefined;
        returnHeaders?: ReturnHeaders | undefined;
    }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
        headers: Headers;
        response: (O["teams"] extends {
            enabled: true;
        } ? {
            members: InferMember<O>[];
            invitations: InferInvitation<O>[];
            teams: Team[];
        } & ({
            id: string;
            name: string;
            slug: string;
            createdAt: Date;
            logo?: string | null | undefined;
            metadata?: any;
        } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never) : {
            members: InferMember<O>[];
            invitations: InferInvitation<O>[];
        } & ({
            id: string;
            name: string;
            slug: string;
            createdAt: Date;
            logo?: string | null | undefined;
            metadata?: any;
        } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never)) | null;
    } : (O["teams"] extends {
        enabled: true;
    } ? {
        members: InferMember<O>[];
        invitations: InferInvitation<O>[];
        teams: Team[];
    } & ({
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
        logo?: string | null | undefined;
        metadata?: any;
    } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) : {
        members: InferMember<O>[];
        invitations: InferInvitation<O>[];
    } & ({
        id: string;
        name: string;
        slug: string;
        createdAt: Date;
        logo?: string | null | undefined;
        metadata?: any;
    } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_3 ? { [K in keyof T_3]: T_3[K]; } : never)) | null>;
    options: {
        method: "GET";
        query: z.ZodOptional<z.ZodObject<{
            organizationId: z.ZodOptional<z.ZodString>;
            organizationSlug: z.ZodOptional<z.ZodString>;
            membersLimit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
        }, z.core.$strip>>;
        requireHeaders: true;
        use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
            orgOptions: OrganizationOptions;
            roles: typeof defaultRoles & {
                [key: string]: Role<{}>;
            };
            getSession: (context: packages_core_dist.GenericEndpointContext) => Promise<{
                session: packages_core_dist_db.Session & {
                    activeTeamId?: string;
                    activeOrganizationId?: string;
                };
                user: packages_core_dist_db.User;
            }>;
        }>) | ((inputContext: better_call.MiddlewareInputContext<{
            use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                session: {
                    session: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined;
                        userAgent?: string | null | undefined;
                    };
                    user: Record<string, any> & {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image?: string | null | undefined;
                    };
                };
            }>)[];
        }>) => Promise<{
            session: {
                session: packages_core_dist_db.Session & {
                    activeTeamId?: string;
                    activeOrganizationId?: string;
                };
                user: packages_core_dist_db.User;
            };
        }>))[];
        metadata: {
            openapi: {
                description: string;
                responses: {
                    "200": {
                        description: string;
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object";
                                    description: string;
                                    $ref: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    } & {
        use: any[];
    };
    path: "/organization/get-full-organization";
};

declare function parseRoles(roles: string | string[]): string;
/**
 * Organization plugin for Better Auth. Organization allows you to create teams, members,
 * and manage access control for your users.
 *
 * @example
 * ```ts
 * const auth = betterAuth({
 * 	plugins: [
 * 		organization({
 * 			allowUserToCreateOrganization: true,
 * 		}),
 * 	],
 * });
 * ```
 */
declare const organization: <O extends OrganizationOptions>(options?: O) => {
    id: "organization";
    endpoints: (O["dynamicAccessControl"] extends {
        enabled: true;
    } ? (O["teams"] extends {
        enabled: true;
    } ? {
        /**
         * ### Endpoint
         *
         * POST `/organization/create`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createOrganization`
         *
         * **client:**
         * `authClient.organization.create`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-create)
         */
        createOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/create", {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                name: string;
                slug: string;
                userId?: string | undefined;
                logo?: string | undefined;
                metadata?: Record<string, any> | undefined;
                keepCurrentActiveOrganization?: boolean | undefined;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                name: string;
                slug: string;
                userId?: string | undefined;
                logo?: string | undefined;
                metadata?: Record<string, any> | undefined;
                keepCurrentActiveOrganization?: boolean | undefined;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, false> extends infer T ? { [K in keyof T]: T[K]; } : never) & {
                    metadata: any;
                    members: (({
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | undefined)[];
                }) | null;
            } : (({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, false> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) & {
                metadata: any;
                members: (({
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | undefined)[];
            }) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/create";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/update`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateOrganization`
         *
         * **client:**
         * `authClient.organization.update`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-update)
         */
        updateOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    data: {
                        name?: string;
                        slug?: string;
                        logo?: string;
                        metadata?: Record<string, any>;
                    } & Partial<InferAdditionalFieldsFromPluginOptions<"organization", O, true>>;
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never) & {
                    metadata: Record<string, any> | undefined;
                }) | null;
            } : (({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) & {
                metadata: Record<string, any> | undefined;
            }) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    data: z.ZodObject<{
                        name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        logo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        metadata: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
                    }, z.core.$strip>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            data: {
                                name?: string;
                                slug?: string;
                                logo?: string;
                                metadata?: Record<string, any>;
                            } & Partial<InferAdditionalFieldsFromPluginOptions<"organization", O, true>>;
                            organizationId?: string | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/update";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/delete`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.deleteOrganization`
         *
         * **client:**
         * `authClient.organization.delete`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-delete)
         */
        deleteOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never) | null;
            } : ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodString;
                }, z.core.$strip>;
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "string";
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/delete";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/set-active`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.setActiveOrganization`
         *
         * **client:**
         * `authClient.organization.setActive`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-set-active)
         */
        setActiveOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId?: string | null | undefined;
                    organizationSlug?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                    teams: Team[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never) : {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never)) | null;
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
                teams: Team[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) : {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_3 ? { [K in keyof T_3]: T_3[K]; } : never)) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    organizationSlug: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/set-active";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-full-organization`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getFullOrganization`
         *
         * **client:**
         * `authClient.organization.getFullOrganization`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-full-organization)
         */
        getFullOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                    organizationSlug?: string | undefined;
                    membersLimit?: string | number | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                    teams: Team[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never) : {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never)) | null;
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
                teams: Team[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) : {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_3 ? { [K in keyof T_3]: T_3[K]; } : never)) | null>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                    organizationSlug: z.ZodOptional<z.ZodString>;
                    membersLimit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
                }, z.core.$strip>>;
                requireHeaders: true;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-full-organization";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listOrganizations`
         *
         * **client:**
         * `authClient.organization.list`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list)
         */
        listOrganizations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never)[];
            } : ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never)[]>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/list";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/invite-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createInvitation`
         *
         * **client:**
         * `authClient.organization.inviteMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-invite-member)
         */
        createInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/invite-member", {
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                email: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
                resend?: boolean;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | string[];
            } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                email: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
                resend?: boolean;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | string[];
            } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    expiresAt: Date;
                    id?: string | undefined;
                    organizationId?: string | undefined;
                    email?: string | undefined;
                    role?: InferOrganizationRolesFromOption<O> | undefined;
                    status?: InvitationStatus | undefined;
                    inviterId?: string | undefined;
                };
            } : {
                expiresAt: Date;
                id?: string | undefined;
                organizationId?: string | undefined;
                email?: string | undefined;
                role?: InferOrganizationRolesFromOption<O> | undefined;
                status?: InvitationStatus | undefined;
                inviterId?: string | undefined;
            }>;
            options: {
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/invite-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/cancel-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.cancelInvitation`
         *
         * **client:**
         * `authClient.organization.cancelInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-cancel-invitation)
         */
        cancelInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O> | null;
            } : InferInvitation<O> | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: string;
                                        properties: {
                                            invitation: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/cancel-invitation";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/accept-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.acceptInvitation`
         *
         * **client:**
         * `authClient.organization.acceptInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-accept-invitation)
         */
        acceptInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    invitation: InferInvitation<O>;
                    member: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } & InferAdditionalFieldsFromPluginOptions<"member", O, false>;
                } | null;
            } : {
                invitation: InferInvitation<O>;
                member: {
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>;
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                invitation: {
                                                    type: string;
                                                };
                                                member: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/accept-invitation";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getInvitation`
         *
         * **client:**
         * `authClient.organization.getInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-invitation)
         */
        getInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    id: string;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: InferOrganizationRolesFromOption<O>;
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                    teamId?: string;
                } : {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: InferOrganizationRolesFromOption<O>;
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                }) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> & {
                    organizationName: ({
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined;
                        metadata?: any;
                    } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["name"];
                    organizationSlug: ({
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined;
                        metadata?: any;
                    } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["slug"];
                    inviterEmail: string;
                };
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                id: string;
                organizationId: string;
                email: string;
                role: InferOrganizationRolesFromOption<O>;
                status: InvitationStatus;
                inviterId: string;
                expiresAt: Date;
                teamId?: string;
            } : {
                id: string;
                organizationId: string;
                email: string;
                role: InferOrganizationRolesFromOption<O>;
                status: InvitationStatus;
                inviterId: string;
                expiresAt: Date;
            }) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> & {
                organizationName: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["name"];
                organizationSlug: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["slug"];
                inviterEmail: string;
            }>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                requireHeaders: true;
                query: z.ZodObject<{
                    id: z.ZodString;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                                organizationName: {
                                                    type: string;
                                                };
                                                organizationSlug: {
                                                    type: string;
                                                };
                                                inviterEmail: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-invitation";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/reject-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.rejectInvitation`
         *
         * **client:**
         * `authClient.organization.rejectInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-reject-invitation)
         */
        rejectInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    invitation: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    } | null;
                    member: null;
                };
            } : {
                invitation: {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "member" | "admin" | "owner";
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                } | null;
                member: null;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                invitation: {
                                                    type: string;
                                                };
                                                member: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/reject-invitation";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-invitations`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listInvitations`
         *
         * **client:**
         * `authClient.organization.listInvitations`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list-invitations)
         */
        listInvitations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O>[];
            } : InferInvitation<O>[]>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
            } & {
                use: any[];
            };
            path: "/organization/list-invitations";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-active-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getActiveMember`
         *
         * **client:**
         * `authClient.organization.getActiveMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-active-member)
         */
        getActiveMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } | null;
            } : {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    image: string | null | undefined;
                };
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            } | null>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                userId: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-active-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/check-slug`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.checkOrganizationSlug`
         *
         * **client:**
         * `authClient.organization.checkSlug`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-check-slug)
         */
        checkOrganizationSlug: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    slug: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    slug: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    } | null;
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/check-slug";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/add-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.addMember`
         *
         * **client:**
         * `authClient.organization.addMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-add-member)
         */
        addMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/add-member", {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }, {
                userId: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | undefined;
            } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }, {
                userId: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | undefined;
            } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | null;
            } : ({
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/add-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/remove-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.removeMember`
         *
         * **client:**
         * `authClient.organization.removeMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-remove-member)
         */
        removeMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    memberIdOrEmail: string;
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    member: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    };
                } | null;
            } : {
                member: {
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                };
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    memberIdOrEmail: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                member: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        organizationId: {
                                                            type: string;
                                                        };
                                                        role: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/remove-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/update-member-role`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateMemberRole`
         *
         * **client:**
         * `authClient.organization.updateMemberRole`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-update-member-role)
         */
        updateMemberRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    role: LiteralString | LiteralString[] | InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                    memberId: string;
                    organizationId?: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    organizationId: string;
                    role: "member" | "admin" | "owner";
                    createdAt: Date;
                    userId: string;
                    user: {
                        email: string;
                        name: string;
                        image?: string;
                    };
                };
            } : {
                id: string;
                organizationId: string;
                role: "member" | "admin" | "owner";
                createdAt: Date;
                userId: string;
                user: {
                    email: string;
                    name: string;
                    image?: string;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    memberId: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    $Infer: {
                        body: {
                            role: LiteralString | LiteralString[] | InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            memberId: string;
                            organizationId?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                member: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        organizationId: {
                                                            type: string;
                                                        };
                                                        role: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/update-member-role";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/leave`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.leaveOrganization`
         *
         * **client:**
         * `authClient.organization.leave`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-leave)
         */
        leaveOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                };
            } : {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    image: string | null | undefined;
                };
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodString;
                }, z.core.$strip>;
                requireHeaders: true;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/leave";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-members`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listMembers`
         *
         * **client:**
         * `authClient.organization.listMembers`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list-members)
         */
        listUserInvitations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    email?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O>[];
            } : InferInvitation<O>[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                query: z.ZodOptional<z.ZodObject<{
                    email: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
            } & {
                use: any[];
            };
            path: "/organization/list-user-invitations";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-members`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listMembers`
         *
         * **client:**
         * `authClient.organization.listMembers`
         */
        listMembers: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    limit?: string | number | undefined;
                    offset?: string | number | undefined;
                    sortBy?: string | undefined;
                    sortDirection?: "asc" | "desc" | undefined;
                    filterField?: string | undefined;
                    filterValue?: string | number | boolean | undefined;
                    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    members: {
                        user: {
                            id: string;
                            name: string;
                            email: string;
                            image: string | null | undefined;
                        };
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    }[];
                    total: number;
                };
            } : {
                members: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                }[];
                total: number;
            }>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    limit: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                    offset: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                    sortBy: z.ZodOptional<z.ZodString>;
                    sortDirection: z.ZodOptional<z.ZodEnum<{
                        asc: "asc";
                        desc: "desc";
                    }>>;
                    filterField: z.ZodOptional<z.ZodString>;
                    filterValue: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber]>, z.ZodBoolean]>>;
                    filterOperator: z.ZodOptional<z.ZodEnum<{
                        eq: "eq";
                        ne: "ne";
                        lt: "lt";
                        lte: "lte";
                        gt: "gt";
                        gte: "gte";
                        contains: "contains";
                    }>>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/list-members";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-active-member-role`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getActiveMemberRole`
         *
         * **client:**
         * `authClient.organization.getActiveMemberRole`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-active-member-role)
         */
        getActiveMemberRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    userId?: string | undefined;
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    role: string;
                };
            } : {
                role: string;
            }>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    userId: z.ZodOptional<z.ZodString>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/get-active-member-role";
        };
    } & {
        /**
         * ### Endpoint
         *
         * POST `/organization/create-team`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createTeam`
         *
         * **client:**
         * `authClient.organization.createTeam`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-create-team)
         */
        createTeam: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/create-team", {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            organizationId?: string | undefined;
                        } & InferAdditionalFieldsFromPluginOptions<"team", O, true>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            organizationId?: string | undefined;
                        } & InferAdditionalFieldsFromPluginOptions<"team", O, true>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                name: string;
                organizationId?: string | undefined;
            } & InferAdditionalFieldsFromPluginOptions<"team", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            organizationId?: string | undefined;
                        } & InferAdditionalFieldsFromPluginOptions<"team", O, true>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                name: string;
                organizationId?: string | undefined;
            } & InferAdditionalFieldsFromPluginOptions<"team", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                } & InferAdditionalFieldsFromPluginOptions<"team", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never;
            } : {
                id: string;
                name: string;
                organizationId: string;
                createdAt: Date;
                updatedAt?: Date | undefined;
            } & InferAdditionalFieldsFromPluginOptions<"team", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            organizationId?: string | undefined;
                        } & InferAdditionalFieldsFromPluginOptions<"team", O, true>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/create-team";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-teams`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listOrganizationTeams`
         *
         * **client:**
         * `authClient.organization.listTeams`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list-teams)
         */
        listOrganizationTeams: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                }[];
            } : {
                id: string;
                name: string;
                organizationId: string;
                createdAt: Date;
                updatedAt?: Date | undefined;
            }[]>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    name: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    organizationId: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                    updatedAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/list-teams";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/remove-team`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.removeTeam`
         *
         * **client:**
         * `authClient.organization.removeTeam`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-remove-team)
         */
        removeTeam: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    teamId: string;
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    message: string;
                } | null;
            } : {
                message: string;
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    teamId: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                    description: string;
                                                    enum: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/remove-team";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/update-team`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateTeam`
         *
         * **client:**
         * `authClient.organization.updateTeam`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-update-team)
         */
        updateTeam: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    teamId: string;
                    data: Partial<{
                        name: string;
                        organizationId: string;
                    } & InferAdditionalFieldsFromPluginOptions<"team", O, true>>;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                } & InferAdditionalFieldsFromPluginOptions<"team", O, true>) | null;
            } : ({
                id: string;
                name: string;
                organizationId: string;
                createdAt: Date;
                updatedAt?: Date | undefined;
            } & InferAdditionalFieldsFromPluginOptions<"team", O, true>) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    teamId: z.ZodString;
                    data: z.ZodObject<{
                        id: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                        name: z.ZodOptional<z.ZodString>;
                        organizationId: z.ZodOptional<z.ZodString>;
                        createdAt: z.ZodOptional<z.ZodDate>;
                        updatedAt: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
                    }, z.core.$strip>;
                }, z.core.$strip>;
                requireHeaders: true;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    $Infer: {
                        body: {
                            teamId: string;
                            data: Partial<{
                                name: string;
                                organizationId: string;
                            } & InferAdditionalFieldsFromPluginOptions<"team", O, true>>;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/update-team";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/set-active-team`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.setActiveTeam`
         *
         * **client:**
         * `authClient.organization.setActiveTeam`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-set-active-team)
         */
        setActiveTeam: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    teamId?: string | null | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                } | null;
            } : {
                id: string;
                name: string;
                organizationId: string;
                createdAt: Date;
                updatedAt?: Date | undefined;
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    teamId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/set-active-team";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-user-teams`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listUserTeams`
         *
         * **client:**
         * `authClient.organization.listUserTeams`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-set-active-team)
         */
        listUserTeams: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                }[];
            } : {
                id: string;
                name: string;
                organizationId: string;
                createdAt: Date;
                updatedAt?: Date | undefined;
            }[]>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                description: string;
                                                $ref: string;
                                            };
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/list-user-teams";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/list-team-members`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listTeamMembers`
         *
         * **client:**
         * `authClient.organization.listTeamMembers`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-set-active-team)
         */
        listTeamMembers: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    teamId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    teamId: string;
                    userId: string;
                    createdAt: Date;
                }[];
            } : {
                id: string;
                teamId: string;
                userId: string;
                createdAt: Date;
            }[]>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                description: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    userId: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    teamId: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/list-team-members";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/add-team-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.addTeamMember`
         *
         * **client:**
         * `authClient.organization.addTeamMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-add-team-member)
         */
        addTeamMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    teamId: string;
                    userId: unknown;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    teamId: string;
                    userId: string;
                    createdAt: Date;
                };
            } : {
                id: string;
                teamId: string;
                userId: string;
                createdAt: Date;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    teamId: z.ZodString;
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                userId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                teamId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/add-team-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/remove-team-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.removeTeamMember`
         *
         * **client:**
         * `authClient.organization.removeTeamMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-remove-team-member)
         */
        removeTeamMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    teamId: string;
                    userId: unknown;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    message: string;
                };
            } : {
                message: string;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    teamId: z.ZodString;
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                    description: string;
                                                    enum: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/remove-team-member";
        };
    } : {
        /**
         * ### Endpoint
         *
         * POST `/organization/create`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createOrganization`
         *
         * **client:**
         * `authClient.organization.create`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-create)
         */
        createOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/create", {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                name: string;
                slug: string;
                userId?: string | undefined;
                logo?: string | undefined;
                metadata?: Record<string, any> | undefined;
                keepCurrentActiveOrganization?: boolean | undefined;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                name: string;
                slug: string;
                userId?: string | undefined;
                logo?: string | undefined;
                metadata?: Record<string, any> | undefined;
                keepCurrentActiveOrganization?: boolean | undefined;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, false> extends infer T ? { [K in keyof T]: T[K]; } : never) & {
                    metadata: any;
                    members: (({
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | undefined)[];
                }) | null;
            } : (({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, false> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) & {
                metadata: any;
                members: (({
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | undefined)[];
            }) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/create";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/update`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateOrganization`
         *
         * **client:**
         * `authClient.organization.update`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-update)
         */
        updateOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    data: {
                        name?: string;
                        slug?: string;
                        logo?: string;
                        metadata?: Record<string, any>;
                    } & Partial<InferAdditionalFieldsFromPluginOptions<"organization", O, true>>;
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never) & {
                    metadata: Record<string, any> | undefined;
                }) | null;
            } : (({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) & {
                metadata: Record<string, any> | undefined;
            }) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    data: z.ZodObject<{
                        name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        logo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        metadata: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
                    }, z.core.$strip>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            data: {
                                name?: string;
                                slug?: string;
                                logo?: string;
                                metadata?: Record<string, any>;
                            } & Partial<InferAdditionalFieldsFromPluginOptions<"organization", O, true>>;
                            organizationId?: string | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/update";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/delete`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.deleteOrganization`
         *
         * **client:**
         * `authClient.organization.delete`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-delete)
         */
        deleteOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never) | null;
            } : ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodString;
                }, z.core.$strip>;
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "string";
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/delete";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/set-active`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.setActiveOrganization`
         *
         * **client:**
         * `authClient.organization.setActive`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-set-active)
         */
        setActiveOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId?: string | null | undefined;
                    organizationSlug?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                    teams: Team[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never) : {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never)) | null;
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
                teams: Team[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) : {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_3 ? { [K in keyof T_3]: T_3[K]; } : never)) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    organizationSlug: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/set-active";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-full-organization`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getFullOrganization`
         *
         * **client:**
         * `authClient.organization.getFullOrganization`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-full-organization)
         */
        getFullOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                    organizationSlug?: string | undefined;
                    membersLimit?: string | number | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                    teams: Team[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never) : {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never)) | null;
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
                teams: Team[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) : {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_3 ? { [K in keyof T_3]: T_3[K]; } : never)) | null>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                    organizationSlug: z.ZodOptional<z.ZodString>;
                    membersLimit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
                }, z.core.$strip>>;
                requireHeaders: true;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-full-organization";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listOrganizations`
         *
         * **client:**
         * `authClient.organization.list`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list)
         */
        listOrganizations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T ? { [K in keyof T]: T[K]; } : never)[];
            } : ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never)[]>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/list";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/invite-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createInvitation`
         *
         * **client:**
         * `authClient.organization.inviteMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-invite-member)
         */
        createInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/invite-member", {
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                email: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
                resend?: boolean;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | string[];
            } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                email: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
                resend?: boolean;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | string[];
            } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    expiresAt: Date;
                    id?: string | undefined;
                    organizationId?: string | undefined;
                    email?: string | undefined;
                    role?: InferOrganizationRolesFromOption<O> | undefined;
                    status?: InvitationStatus | undefined;
                    inviterId?: string | undefined;
                };
            } : {
                expiresAt: Date;
                id?: string | undefined;
                organizationId?: string | undefined;
                email?: string | undefined;
                role?: InferOrganizationRolesFromOption<O> | undefined;
                status?: InvitationStatus | undefined;
                inviterId?: string | undefined;
            }>;
            options: {
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/invite-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/cancel-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.cancelInvitation`
         *
         * **client:**
         * `authClient.organization.cancelInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-cancel-invitation)
         */
        cancelInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O> | null;
            } : InferInvitation<O> | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: string;
                                        properties: {
                                            invitation: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/cancel-invitation";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/accept-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.acceptInvitation`
         *
         * **client:**
         * `authClient.organization.acceptInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-accept-invitation)
         */
        acceptInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    invitation: InferInvitation<O>;
                    member: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } & InferAdditionalFieldsFromPluginOptions<"member", O, false>;
                } | null;
            } : {
                invitation: InferInvitation<O>;
                member: {
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>;
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                invitation: {
                                                    type: string;
                                                };
                                                member: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/accept-invitation";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getInvitation`
         *
         * **client:**
         * `authClient.organization.getInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-invitation)
         */
        getInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    id: string;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: InferOrganizationRolesFromOption<O>;
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                    teamId?: string;
                } : {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: InferOrganizationRolesFromOption<O>;
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                }) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> & {
                    organizationName: ({
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined;
                        metadata?: any;
                    } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["name"];
                    organizationSlug: ({
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined;
                        metadata?: any;
                    } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["slug"];
                    inviterEmail: string;
                };
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                id: string;
                organizationId: string;
                email: string;
                role: InferOrganizationRolesFromOption<O>;
                status: InvitationStatus;
                inviterId: string;
                expiresAt: Date;
                teamId?: string;
            } : {
                id: string;
                organizationId: string;
                email: string;
                role: InferOrganizationRolesFromOption<O>;
                status: InvitationStatus;
                inviterId: string;
                expiresAt: Date;
            }) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> & {
                organizationName: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["name"];
                organizationSlug: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["slug"];
                inviterEmail: string;
            }>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                requireHeaders: true;
                query: z.ZodObject<{
                    id: z.ZodString;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                                organizationName: {
                                                    type: string;
                                                };
                                                organizationSlug: {
                                                    type: string;
                                                };
                                                inviterEmail: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-invitation";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/reject-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.rejectInvitation`
         *
         * **client:**
         * `authClient.organization.rejectInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-reject-invitation)
         */
        rejectInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    invitation: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    } | null;
                    member: null;
                };
            } : {
                invitation: {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "member" | "admin" | "owner";
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                } | null;
                member: null;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                invitation: {
                                                    type: string;
                                                };
                                                member: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/reject-invitation";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-invitations`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listInvitations`
         *
         * **client:**
         * `authClient.organization.listInvitations`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list-invitations)
         */
        listInvitations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O>[];
            } : InferInvitation<O>[]>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
            } & {
                use: any[];
            };
            path: "/organization/list-invitations";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-active-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getActiveMember`
         *
         * **client:**
         * `authClient.organization.getActiveMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-active-member)
         */
        getActiveMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } | null;
            } : {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    image: string | null | undefined;
                };
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            } | null>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                userId: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-active-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/check-slug`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.checkOrganizationSlug`
         *
         * **client:**
         * `authClient.organization.checkSlug`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-check-slug)
         */
        checkOrganizationSlug: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    slug: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    slug: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    } | null;
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/check-slug";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/add-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.addMember`
         *
         * **client:**
         * `authClient.organization.addMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-add-member)
         */
        addMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/add-member", {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }, {
                userId: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | undefined;
            } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }, {
                userId: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | undefined;
            } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | null;
            } : ({
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/add-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/remove-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.removeMember`
         *
         * **client:**
         * `authClient.organization.removeMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-remove-member)
         */
        removeMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    memberIdOrEmail: string;
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    member: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    };
                } | null;
            } : {
                member: {
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                };
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    memberIdOrEmail: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                member: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        organizationId: {
                                                            type: string;
                                                        };
                                                        role: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/remove-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/update-member-role`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateMemberRole`
         *
         * **client:**
         * `authClient.organization.updateMemberRole`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-update-member-role)
         */
        updateMemberRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    role: LiteralString | LiteralString[] | InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                    memberId: string;
                    organizationId?: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    organizationId: string;
                    role: "member" | "admin" | "owner";
                    createdAt: Date;
                    userId: string;
                    user: {
                        email: string;
                        name: string;
                        image?: string;
                    };
                };
            } : {
                id: string;
                organizationId: string;
                role: "member" | "admin" | "owner";
                createdAt: Date;
                userId: string;
                user: {
                    email: string;
                    name: string;
                    image?: string;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    memberId: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    $Infer: {
                        body: {
                            role: LiteralString | LiteralString[] | InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            memberId: string;
                            organizationId?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                member: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        organizationId: {
                                                            type: string;
                                                        };
                                                        role: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/update-member-role";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/leave`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.leaveOrganization`
         *
         * **client:**
         * `authClient.organization.leave`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-leave)
         */
        leaveOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                };
            } : {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    image: string | null | undefined;
                };
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodString;
                }, z.core.$strip>;
                requireHeaders: true;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/leave";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-members`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listMembers`
         *
         * **client:**
         * `authClient.organization.listMembers`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list-members)
         */
        listUserInvitations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    email?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O>[];
            } : InferInvitation<O>[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                query: z.ZodOptional<z.ZodObject<{
                    email: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
            } & {
                use: any[];
            };
            path: "/organization/list-user-invitations";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-members`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listMembers`
         *
         * **client:**
         * `authClient.organization.listMembers`
         */
        listMembers: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    limit?: string | number | undefined;
                    offset?: string | number | undefined;
                    sortBy?: string | undefined;
                    sortDirection?: "asc" | "desc" | undefined;
                    filterField?: string | undefined;
                    filterValue?: string | number | boolean | undefined;
                    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    members: {
                        user: {
                            id: string;
                            name: string;
                            email: string;
                            image: string | null | undefined;
                        };
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    }[];
                    total: number;
                };
            } : {
                members: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                }[];
                total: number;
            }>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    limit: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                    offset: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                    sortBy: z.ZodOptional<z.ZodString>;
                    sortDirection: z.ZodOptional<z.ZodEnum<{
                        asc: "asc";
                        desc: "desc";
                    }>>;
                    filterField: z.ZodOptional<z.ZodString>;
                    filterValue: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber]>, z.ZodBoolean]>>;
                    filterOperator: z.ZodOptional<z.ZodEnum<{
                        eq: "eq";
                        ne: "ne";
                        lt: "lt";
                        lte: "lte";
                        gt: "gt";
                        gte: "gte";
                        contains: "contains";
                    }>>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/list-members";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-active-member-role`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getActiveMemberRole`
         *
         * **client:**
         * `authClient.organization.getActiveMemberRole`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-active-member-role)
         */
        getActiveMemberRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    userId?: string | undefined;
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    role: string;
                };
            } : {
                role: string;
            }>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    userId: z.ZodOptional<z.ZodString>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/get-active-member-role";
        };
    }) & {
        createOrgRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/create-role", {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                    role: z.ZodString;
                    permission: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
                    additionalFields: z.ZodOptional<z.ZodObject<{
                        [x: string]: z.ZodOptional<z.ZodAny>;
                    }, z.core.$strip>>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            organizationId?: string | undefined;
                            role: string;
                            permission: Record<string, string[]>;
                        } & ((keyof InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends never ? InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends infer T ? T extends InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> ? T extends {} ? {} extends T ? true : false : false : never : never : false) extends true ? {
                            additionalFields?: {};
                        } : {
                            additionalFields: InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>;
                        });
                    };
                };
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>)[];
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                    role: z.ZodString;
                    permission: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
                    additionalFields: z.ZodOptional<z.ZodObject<{
                        [x: string]: z.ZodOptional<z.ZodAny>;
                    }, z.core.$strip>>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            organizationId?: string | undefined;
                            role: string;
                            permission: Record<string, string[]>;
                        } & ((keyof InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends never ? InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends infer T_1 ? T_1 extends InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> ? T_1 extends {} ? {} extends T_1 ? true : false : false : never : never : false) extends true ? {
                            additionalFields?: {};
                        } : {
                            additionalFields: InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>;
                        });
                    };
                };
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>)[];
            } & {
                use: any[];
            }, {
                organizationId?: string | undefined;
                role: string;
                permission: Record<string, string[]>;
            } & ((keyof InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends never ? InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends infer T_2 ? T_2 extends InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> ? T_2 extends {} ? {} extends T_2 ? true : false : false : never : never : false) extends true ? {
                additionalFields?: {};
            } : {
                additionalFields: InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>;
            })> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                    role: z.ZodString;
                    permission: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
                    additionalFields: z.ZodOptional<z.ZodObject<{
                        [x: string]: z.ZodOptional<z.ZodAny>;
                    }, z.core.$strip>>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            organizationId?: string | undefined;
                            role: string;
                            permission: Record<string, string[]>;
                        } & ((keyof InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends never ? InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends infer T_3 ? T_3 extends InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> ? T_3 extends {} ? {} extends T_3 ? true : false : false : never : never : false) extends true ? {
                            additionalFields?: {};
                        } : {
                            additionalFields: InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>;
                        });
                    };
                };
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>)[];
            } & {
                use: any[];
            }, {
                organizationId?: string | undefined;
                role: string;
                permission: Record<string, string[]>;
            } & ((keyof InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends never ? InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends infer T_4 ? T_4 extends InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> ? T_4 extends {} ? {} extends T_4 ? true : false : false : never : never : false) extends true ? {
                additionalFields?: {};
            } : {
                additionalFields: InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>;
            })> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    roleData: {
                        id: string;
                        organizationId: string;
                        role: string;
                        permission: Record<string, string[]>;
                        createdAt: Date;
                        updatedAt?: Date | undefined;
                    } & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>;
                    statements: Subset<string, Statements>;
                };
            } : {
                success: boolean;
                roleData: {
                    id: string;
                    organizationId: string;
                    role: string;
                    permission: Record<string, string[]>;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                } & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>;
                statements: Subset<string, Statements>;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                    role: z.ZodString;
                    permission: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
                    additionalFields: z.ZodOptional<z.ZodObject<{
                        [x: string]: z.ZodOptional<z.ZodAny>;
                    }, z.core.$strip>>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            organizationId?: string | undefined;
                            role: string;
                            permission: Record<string, string[]>;
                        } & ((keyof InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends never ? InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> extends infer T ? T extends InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true> ? T extends {} ? {} extends T ? true : false : false : never : never : false) extends true ? {
                            additionalFields?: {};
                        } : {
                            additionalFields: InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>;
                        });
                    };
                };
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>)[];
            } & {
                use: any[];
            };
            path: "/organization/create-role";
        };
        deleteOrgRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: ({
                    roleName: string;
                } | {
                    roleId: string;
                }) & {
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodIntersection<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>, z.ZodUnion<readonly [z.ZodObject<{
                    roleName: z.ZodString;
                }, z.core.$strip>, z.ZodObject<{
                    roleId: z.ZodString;
                }, z.core.$strip>]>>;
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: ({
                            roleName: string;
                        } | {
                            roleId: string;
                        }) & {
                            organizationId?: string | undefined;
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/delete-role";
        };
        listOrgRoles: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    organizationId: string;
                    role: string;
                    permission: Record<string, string[]>;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                } & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>)[];
            } : ({
                id: string;
                organizationId: string;
                role: string;
                permission: Record<string, string[]>;
                createdAt: Date;
                updatedAt?: Date | undefined;
            } & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>)[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>)[];
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                metadata: {
                    $Infer: {
                        query: {
                            organizationId?: string | undefined;
                        } | undefined;
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/list-roles";
        };
        getOrgRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    organizationId?: string | undefined;
                } & ({
                    roleName: string;
                } | {
                    roleId: string;
                });
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    organizationId: string;
                    role: string;
                    permission: Record<string, string[]>;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                } & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>;
            } : {
                id: string;
                organizationId: string;
                role: string;
                permission: Record<string, string[]>;
                createdAt: Date;
                updatedAt?: Date | undefined;
            } & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>)[];
                query: z.ZodOptional<z.ZodIntersection<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>, z.ZodUnion<readonly [z.ZodObject<{
                    roleName: z.ZodString;
                }, z.core.$strip>, z.ZodObject<{
                    roleId: z.ZodString;
                }, z.core.$strip>]>>>;
                metadata: {
                    $Infer: {
                        query: {
                            organizationId?: string | undefined;
                        } & ({
                            roleName: string;
                        } | {
                            roleId: string;
                        });
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-role";
        };
        updateOrgRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId?: string | undefined;
                    data: {
                        permission?: Record<string, string[]> | undefined;
                        roleName?: string | undefined;
                    } & Partial<InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>>;
                } & ({
                    roleName: string;
                } | {
                    roleId: string;
                });
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    roleData: {
                        id: string;
                        organizationId: string;
                        role: string;
                        permission: Record<string, string[]>;
                        createdAt: Date;
                        updatedAt?: Date | undefined;
                    } & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>;
                };
            } : {
                success: boolean;
                roleData: {
                    id: string;
                    organizationId: string;
                    role: string;
                    permission: Record<string, string[]>;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                } & InferAdditionalFieldsFromPluginOptions<"organizationRole", O, false>;
            }>;
            options: {
                method: "POST";
                body: z.ZodIntersection<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                    data: z.ZodObject<{
                        permission: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
                        roleName: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>;
                }, z.core.$strip>, z.ZodUnion<readonly [z.ZodObject<{
                    roleName: z.ZodString;
                }, z.core.$strip>, z.ZodObject<{
                    roleId: z.ZodString;
                }, z.core.$strip>]>>;
                metadata: {
                    $Infer: {
                        body: {
                            organizationId?: string | undefined;
                            data: {
                                permission?: Record<string, string[]> | undefined;
                                roleName?: string | undefined;
                            } & Partial<InferAdditionalFieldsFromPluginOptions<"organizationRole", O, true>>;
                        } & ({
                            roleName: string;
                        } | {
                            roleId: string;
                        });
                    };
                };
                use: ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>)[];
            } & {
                use: any[];
            };
            path: "/organization/update-role";
        };
    } : O["teams"] extends {
        enabled: true;
    } ? {
        /**
         * ### Endpoint
         *
         * POST `/organization/create`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createOrganization`
         *
         * **client:**
         * `authClient.organization.create`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-create)
         */
        createOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/create", {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                name: string;
                slug: string;
                userId?: string | undefined;
                logo?: string | undefined;
                metadata?: Record<string, any> | undefined;
                keepCurrentActiveOrganization?: boolean | undefined;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                name: string;
                slug: string;
                userId?: string | undefined;
                logo?: string | undefined;
                metadata?: Record<string, any> | undefined;
                keepCurrentActiveOrganization?: boolean | undefined;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, false> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) & {
                    metadata: any;
                    members: (({
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | undefined)[];
                }) | null;
            } : (({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, false> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) & {
                metadata: any;
                members: (({
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | undefined)[];
            }) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/create";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/update`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateOrganization`
         *
         * **client:**
         * `authClient.organization.update`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-update)
         */
        updateOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    data: {
                        name?: string;
                        slug?: string;
                        logo?: string;
                        metadata?: Record<string, any>;
                    } & Partial<InferAdditionalFieldsFromPluginOptions<"organization", O, true>>;
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) & {
                    metadata: Record<string, any> | undefined;
                }) | null;
            } : (({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) & {
                metadata: Record<string, any> | undefined;
            }) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    data: z.ZodObject<{
                        name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        logo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        metadata: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
                    }, z.core.$strip>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            data: {
                                name?: string;
                                slug?: string;
                                logo?: string;
                                metadata?: Record<string, any>;
                            } & Partial<InferAdditionalFieldsFromPluginOptions<"organization", O, true>>;
                            organizationId?: string | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/update";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/delete`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.deleteOrganization`
         *
         * **client:**
         * `authClient.organization.delete`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-delete)
         */
        deleteOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) | null;
            } : ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodString;
                }, z.core.$strip>;
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "string";
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/delete";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/set-active`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.setActiveOrganization`
         *
         * **client:**
         * `authClient.organization.setActive`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-set-active)
         */
        setActiveOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId?: string | null | undefined;
                    organizationSlug?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                    teams: Team[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) : {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never)) | null;
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
                teams: Team[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_3 ? { [K in keyof T_3]: T_3[K]; } : never) : {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_4 ? { [K in keyof T_4]: T_4[K]; } : never)) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    organizationSlug: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/set-active";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-full-organization`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getFullOrganization`
         *
         * **client:**
         * `authClient.organization.getFullOrganization`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-full-organization)
         */
        getFullOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                    organizationSlug?: string | undefined;
                    membersLimit?: string | number | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                    teams: Team[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) : {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never)) | null;
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
                teams: Team[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_3 ? { [K in keyof T_3]: T_3[K]; } : never) : {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_4 ? { [K in keyof T_4]: T_4[K]; } : never)) | null>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                    organizationSlug: z.ZodOptional<z.ZodString>;
                    membersLimit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
                }, z.core.$strip>>;
                requireHeaders: true;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-full-organization";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listOrganizations`
         *
         * **client:**
         * `authClient.organization.list`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list)
         */
        listOrganizations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never)[];
            } : ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never)[]>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/list";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/invite-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createInvitation`
         *
         * **client:**
         * `authClient.organization.inviteMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-invite-member)
         */
        createInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/invite-member", {
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                email: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
                resend?: boolean;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | string[];
            } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                email: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
                resend?: boolean;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | string[];
            } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    expiresAt: Date;
                    id?: string | undefined;
                    organizationId?: string | undefined;
                    email?: string | undefined;
                    role?: InferOrganizationRolesFromOption<O> | undefined;
                    status?: InvitationStatus | undefined;
                    inviterId?: string | undefined;
                };
            } : {
                expiresAt: Date;
                id?: string | undefined;
                organizationId?: string | undefined;
                email?: string | undefined;
                role?: InferOrganizationRolesFromOption<O> | undefined;
                status?: InvitationStatus | undefined;
                inviterId?: string | undefined;
            }>;
            options: {
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/invite-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/cancel-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.cancelInvitation`
         *
         * **client:**
         * `authClient.organization.cancelInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-cancel-invitation)
         */
        cancelInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O> | null;
            } : InferInvitation<O> | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: string;
                                        properties: {
                                            invitation: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/cancel-invitation";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/accept-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.acceptInvitation`
         *
         * **client:**
         * `authClient.organization.acceptInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-accept-invitation)
         */
        acceptInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    invitation: InferInvitation<O>;
                    member: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } & InferAdditionalFieldsFromPluginOptions<"member", O, false>;
                } | null;
            } : {
                invitation: InferInvitation<O>;
                member: {
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>;
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                invitation: {
                                                    type: string;
                                                };
                                                member: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/accept-invitation";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getInvitation`
         *
         * **client:**
         * `authClient.organization.getInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-invitation)
         */
        getInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    id: string;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: InferOrganizationRolesFromOption<O>;
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                    teamId?: string;
                } : {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: InferOrganizationRolesFromOption<O>;
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                }) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> & {
                    organizationName: ({
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined;
                        metadata?: any;
                    } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["name"];
                    organizationSlug: ({
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined;
                        metadata?: any;
                    } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["slug"];
                    inviterEmail: string;
                };
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                id: string;
                organizationId: string;
                email: string;
                role: InferOrganizationRolesFromOption<O>;
                status: InvitationStatus;
                inviterId: string;
                expiresAt: Date;
                teamId?: string;
            } : {
                id: string;
                organizationId: string;
                email: string;
                role: InferOrganizationRolesFromOption<O>;
                status: InvitationStatus;
                inviterId: string;
                expiresAt: Date;
            }) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> & {
                organizationName: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["name"];
                organizationSlug: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["slug"];
                inviterEmail: string;
            }>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                requireHeaders: true;
                query: z.ZodObject<{
                    id: z.ZodString;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                                organizationName: {
                                                    type: string;
                                                };
                                                organizationSlug: {
                                                    type: string;
                                                };
                                                inviterEmail: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-invitation";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/reject-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.rejectInvitation`
         *
         * **client:**
         * `authClient.organization.rejectInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-reject-invitation)
         */
        rejectInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    invitation: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    } | null;
                    member: null;
                };
            } : {
                invitation: {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "member" | "admin" | "owner";
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                } | null;
                member: null;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                invitation: {
                                                    type: string;
                                                };
                                                member: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/reject-invitation";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-invitations`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listInvitations`
         *
         * **client:**
         * `authClient.organization.listInvitations`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list-invitations)
         */
        listInvitations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O>[];
            } : InferInvitation<O>[]>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
            } & {
                use: any[];
            };
            path: "/organization/list-invitations";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-active-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getActiveMember`
         *
         * **client:**
         * `authClient.organization.getActiveMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-active-member)
         */
        getActiveMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } | null;
            } : {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    image: string | null | undefined;
                };
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            } | null>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                userId: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-active-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/check-slug`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.checkOrganizationSlug`
         *
         * **client:**
         * `authClient.organization.checkSlug`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-check-slug)
         */
        checkOrganizationSlug: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    slug: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    slug: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    } | null;
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/check-slug";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/add-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.addMember`
         *
         * **client:**
         * `authClient.organization.addMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-add-member)
         */
        addMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/add-member", {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }, {
                userId: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | undefined;
            } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }, {
                userId: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | undefined;
            } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | null;
            } : ({
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/add-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/remove-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.removeMember`
         *
         * **client:**
         * `authClient.organization.removeMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-remove-member)
         */
        removeMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    memberIdOrEmail: string;
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    member: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    };
                } | null;
            } : {
                member: {
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                };
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    memberIdOrEmail: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                member: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        organizationId: {
                                                            type: string;
                                                        };
                                                        role: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/remove-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/update-member-role`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateMemberRole`
         *
         * **client:**
         * `authClient.organization.updateMemberRole`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-update-member-role)
         */
        updateMemberRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    role: LiteralString | LiteralString[] | InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                    memberId: string;
                    organizationId?: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    organizationId: string;
                    role: "member" | "admin" | "owner";
                    createdAt: Date;
                    userId: string;
                    user: {
                        email: string;
                        name: string;
                        image?: string;
                    };
                };
            } : {
                id: string;
                organizationId: string;
                role: "member" | "admin" | "owner";
                createdAt: Date;
                userId: string;
                user: {
                    email: string;
                    name: string;
                    image?: string;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    memberId: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    $Infer: {
                        body: {
                            role: LiteralString | LiteralString[] | InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            memberId: string;
                            organizationId?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                member: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        organizationId: {
                                                            type: string;
                                                        };
                                                        role: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/update-member-role";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/leave`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.leaveOrganization`
         *
         * **client:**
         * `authClient.organization.leave`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-leave)
         */
        leaveOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                };
            } : {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    image: string | null | undefined;
                };
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodString;
                }, z.core.$strip>;
                requireHeaders: true;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/leave";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-members`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listMembers`
         *
         * **client:**
         * `authClient.organization.listMembers`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list-members)
         */
        listUserInvitations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    email?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O>[];
            } : InferInvitation<O>[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                query: z.ZodOptional<z.ZodObject<{
                    email: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
            } & {
                use: any[];
            };
            path: "/organization/list-user-invitations";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-members`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listMembers`
         *
         * **client:**
         * `authClient.organization.listMembers`
         */
        listMembers: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    limit?: string | number | undefined;
                    offset?: string | number | undefined;
                    sortBy?: string | undefined;
                    sortDirection?: "asc" | "desc" | undefined;
                    filterField?: string | undefined;
                    filterValue?: string | number | boolean | undefined;
                    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    members: {
                        user: {
                            id: string;
                            name: string;
                            email: string;
                            image: string | null | undefined;
                        };
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    }[];
                    total: number;
                };
            } : {
                members: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                }[];
                total: number;
            }>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    limit: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                    offset: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                    sortBy: z.ZodOptional<z.ZodString>;
                    sortDirection: z.ZodOptional<z.ZodEnum<{
                        asc: "asc";
                        desc: "desc";
                    }>>;
                    filterField: z.ZodOptional<z.ZodString>;
                    filterValue: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber]>, z.ZodBoolean]>>;
                    filterOperator: z.ZodOptional<z.ZodEnum<{
                        eq: "eq";
                        ne: "ne";
                        lt: "lt";
                        lte: "lte";
                        gt: "gt";
                        gte: "gte";
                        contains: "contains";
                    }>>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/list-members";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-active-member-role`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getActiveMemberRole`
         *
         * **client:**
         * `authClient.organization.getActiveMemberRole`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-active-member-role)
         */
        getActiveMemberRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    userId?: string | undefined;
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    role: string;
                };
            } : {
                role: string;
            }>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    userId: z.ZodOptional<z.ZodString>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/get-active-member-role";
        };
    } & {
        /**
         * ### Endpoint
         *
         * POST `/organization/create-team`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createTeam`
         *
         * **client:**
         * `authClient.organization.createTeam`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-create-team)
         */
        createTeam: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/create-team", {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            organizationId?: string | undefined;
                        } & InferAdditionalFieldsFromPluginOptions<"team", O, true>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            organizationId?: string | undefined;
                        } & InferAdditionalFieldsFromPluginOptions<"team", O, true>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                name: string;
                organizationId?: string | undefined;
            } & InferAdditionalFieldsFromPluginOptions<"team", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            organizationId?: string | undefined;
                        } & InferAdditionalFieldsFromPluginOptions<"team", O, true>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                name: string;
                organizationId?: string | undefined;
            } & InferAdditionalFieldsFromPluginOptions<"team", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                } & InferAdditionalFieldsFromPluginOptions<"team", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never;
            } : {
                id: string;
                name: string;
                organizationId: string;
                createdAt: Date;
                updatedAt?: Date | undefined;
            } & InferAdditionalFieldsFromPluginOptions<"team", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            organizationId?: string | undefined;
                        } & InferAdditionalFieldsFromPluginOptions<"team", O, true>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/create-team";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-teams`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listOrganizationTeams`
         *
         * **client:**
         * `authClient.organization.listTeams`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list-teams)
         */
        listOrganizationTeams: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                }[];
            } : {
                id: string;
                name: string;
                organizationId: string;
                createdAt: Date;
                updatedAt?: Date | undefined;
            }[]>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    name: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    organizationId: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                    updatedAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/list-teams";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/remove-team`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.removeTeam`
         *
         * **client:**
         * `authClient.organization.removeTeam`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-remove-team)
         */
        removeTeam: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    teamId: string;
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    message: string;
                } | null;
            } : {
                message: string;
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    teamId: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                    description: string;
                                                    enum: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/remove-team";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/update-team`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateTeam`
         *
         * **client:**
         * `authClient.organization.updateTeam`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-update-team)
         */
        updateTeam: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    teamId: string;
                    data: Partial<{
                        name: string;
                        organizationId: string;
                    } & InferAdditionalFieldsFromPluginOptions<"team", O, true>>;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                } & InferAdditionalFieldsFromPluginOptions<"team", O, true>) | null;
            } : ({
                id: string;
                name: string;
                organizationId: string;
                createdAt: Date;
                updatedAt?: Date | undefined;
            } & InferAdditionalFieldsFromPluginOptions<"team", O, true>) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    teamId: z.ZodString;
                    data: z.ZodObject<{
                        id: z.ZodOptional<z.ZodDefault<z.ZodString>>;
                        name: z.ZodOptional<z.ZodString>;
                        organizationId: z.ZodOptional<z.ZodString>;
                        createdAt: z.ZodOptional<z.ZodDate>;
                        updatedAt: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
                    }, z.core.$strip>;
                }, z.core.$strip>;
                requireHeaders: true;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    $Infer: {
                        body: {
                            teamId: string;
                            data: Partial<{
                                name: string;
                                organizationId: string;
                            } & InferAdditionalFieldsFromPluginOptions<"team", O, true>>;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                name: {
                                                    type: string;
                                                    description: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                                updatedAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/update-team";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/set-active-team`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.setActiveTeam`
         *
         * **client:**
         * `authClient.organization.setActiveTeam`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-set-active-team)
         */
        setActiveTeam: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    teamId?: string | null | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                } | null;
            } : {
                id: string;
                name: string;
                organizationId: string;
                createdAt: Date;
                updatedAt?: Date | undefined;
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    teamId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/set-active-team";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-user-teams`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listUserTeams`
         *
         * **client:**
         * `authClient.organization.listUserTeams`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-set-active-team)
         */
        listUserTeams: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    name: string;
                    organizationId: string;
                    createdAt: Date;
                    updatedAt?: Date | undefined;
                }[];
            } : {
                id: string;
                name: string;
                organizationId: string;
                createdAt: Date;
                updatedAt?: Date | undefined;
            }[]>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                description: string;
                                                $ref: string;
                                            };
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/list-user-teams";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/list-team-members`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listTeamMembers`
         *
         * **client:**
         * `authClient.organization.listTeamMembers`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-set-active-team)
         */
        listTeamMembers: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    teamId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    teamId: string;
                    userId: string;
                    createdAt: Date;
                }[];
            } : {
                id: string;
                teamId: string;
                userId: string;
                createdAt: Date;
            }[]>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                description: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    userId: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    teamId: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/list-team-members";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/add-team-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.addTeamMember`
         *
         * **client:**
         * `authClient.organization.addTeamMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-add-team-member)
         */
        addTeamMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    teamId: string;
                    userId: unknown;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    teamId: string;
                    userId: string;
                    createdAt: Date;
                };
            } : {
                id: string;
                teamId: string;
                userId: string;
                createdAt: Date;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    teamId: z.ZodString;
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            properties: {
                                                id: {
                                                    type: string;
                                                    description: string;
                                                };
                                                userId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                teamId: {
                                                    type: string;
                                                    description: string;
                                                };
                                                createdAt: {
                                                    type: string;
                                                    format: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/add-team-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/remove-team-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.removeTeamMember`
         *
         * **client:**
         * `authClient.organization.removeTeamMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-remove-team-member)
         */
        removeTeamMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    teamId: string;
                    userId: unknown;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    message: string;
                };
            } : {
                message: string;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    teamId: z.ZodString;
                    userId: z.ZodCoercedString<unknown>;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                    description: string;
                                                    enum: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/remove-team-member";
        };
    } : {
        /**
         * ### Endpoint
         *
         * POST `/organization/create`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createOrganization`
         *
         * **client:**
         * `authClient.organization.create`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-create)
         */
        createOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/create", {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                name: string;
                slug: string;
                userId?: string | undefined;
                logo?: string | undefined;
                metadata?: Record<string, any> | undefined;
                keepCurrentActiveOrganization?: boolean | undefined;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                name: string;
                slug: string;
                userId?: string | undefined;
                logo?: string | undefined;
                metadata?: Record<string, any> | undefined;
                keepCurrentActiveOrganization?: boolean | undefined;
            }> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, false> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) & {
                    metadata: any;
                    members: (({
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | undefined)[];
                }) | null;
            } : (({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, false> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) & {
                metadata: any;
                members: (({
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | undefined)[];
            }) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    name: z.ZodString;
                    slug: z.ZodString;
                    userId: z.ZodOptional<z.ZodCoercedString<unknown>>;
                    logo: z.ZodOptional<z.ZodString>;
                    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                    keepCurrentActiveOrganization: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: InferAdditionalFieldsFromPluginOptions<"organization", O, true> & {
                            name: string;
                            slug: string;
                            userId?: string | undefined;
                            logo?: string | undefined;
                            metadata?: Record<string, any> | undefined;
                            keepCurrentActiveOrganization?: boolean | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/create";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/update`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateOrganization`
         *
         * **client:**
         * `authClient.organization.update`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-update)
         */
        updateOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    data: {
                        name?: string;
                        slug?: string;
                        logo?: string;
                        metadata?: Record<string, any>;
                    } & Partial<InferAdditionalFieldsFromPluginOptions<"organization", O, true>>;
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) & {
                    metadata: Record<string, any> | undefined;
                }) | null;
            } : (({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) & {
                metadata: Record<string, any> | undefined;
            }) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    data: z.ZodObject<{
                        name: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        logo: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                        metadata: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
                    }, z.core.$strip>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    $Infer: {
                        body: {
                            data: {
                                name?: string;
                                slug?: string;
                                logo?: string;
                                metadata?: Record<string, any>;
                            } & Partial<InferAdditionalFieldsFromPluginOptions<"organization", O, true>>;
                            organizationId?: string | undefined;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/update";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/delete`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.deleteOrganization`
         *
         * **client:**
         * `authClient.organization.delete`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-delete)
         */
        deleteOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) | null;
            } : ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodString;
                }, z.core.$strip>;
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "string";
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/delete";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/set-active`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.setActiveOrganization`
         *
         * **client:**
         * `authClient.organization.setActive`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-set-active)
         */
        setActiveOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId?: string | null | undefined;
                    organizationSlug?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                    teams: Team[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) : {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never)) | null;
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
                teams: Team[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_3 ? { [K in keyof T_3]: T_3[K]; } : never) : {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_4 ? { [K in keyof T_4]: T_4[K]; } : never)) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                    organizationSlug: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/set-active";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-full-organization`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getFullOrganization`
         *
         * **client:**
         * `authClient.organization.getFullOrganization`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-full-organization)
         */
        getFullOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                    organizationSlug?: string | undefined;
                    membersLimit?: string | number | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                    teams: Team[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never) : {
                    members: InferMember<O>[];
                    invitations: InferInvitation<O>[];
                } & ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never)) | null;
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
                teams: Team[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_3 ? { [K in keyof T_3]: T_3[K]; } : never) : {
                members: InferMember<O>[];
                invitations: InferInvitation<O>[];
            } & ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_4 ? { [K in keyof T_4]: T_4[K]; } : never)) | null>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                    organizationSlug: z.ZodOptional<z.ZodString>;
                    membersLimit: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>]>>;
                }, z.core.$strip>>;
                requireHeaders: true;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            $ref: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-full-organization";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listOrganizations`
         *
         * **client:**
         * `authClient.organization.list`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list)
         */
        listOrganizations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_1 ? { [K in keyof T_1]: T_1[K]; } : never)[];
            } : ({
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            } & InferAdditionalFieldsFromPluginOptions<"organization", O, true> extends infer T_2 ? { [K in keyof T_2]: T_2[K]; } : never)[]>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/list";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/invite-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.createInvitation`
         *
         * **client:**
         * `authClient.organization.inviteMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-invite-member)
         */
        createInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/invite-member", {
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                email: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
                resend?: boolean;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | string[];
            } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }, {
                email: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
                resend?: boolean;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | string[];
            } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    expiresAt: Date;
                    id?: string | undefined;
                    organizationId?: string | undefined;
                    email?: string | undefined;
                    role?: InferOrganizationRolesFromOption<O> | undefined;
                    status?: InvitationStatus | undefined;
                    inviterId?: string | undefined;
                };
            } : {
                expiresAt: Date;
                id?: string | undefined;
                organizationId?: string | undefined;
                email?: string | undefined;
                role?: InferOrganizationRolesFromOption<O> | undefined;
                status?: InvitationStatus | undefined;
                inviterId?: string | undefined;
            }>;
            options: {
                method: "POST";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                body: z.ZodObject<{
                    email: z.ZodString;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    resend: z.ZodOptional<z.ZodBoolean>;
                    teamId: z.ZodUnion<readonly [z.ZodOptional<z.ZodString>, z.ZodOptional<z.ZodArray<z.ZodString>>]>;
                }, z.core.$strip>;
                metadata: {
                    $Infer: {
                        body: {
                            email: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                            resend?: boolean;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | string[];
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false>;
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/invite-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/cancel-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.cancelInvitation`
         *
         * **client:**
         * `authClient.organization.cancelInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-cancel-invitation)
         */
        cancelInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O> | null;
            } : InferInvitation<O> | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: string;
                                        properties: {
                                            invitation: {
                                                type: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/cancel-invitation";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/accept-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.acceptInvitation`
         *
         * **client:**
         * `authClient.organization.acceptInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-accept-invitation)
         */
        acceptInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    invitation: InferInvitation<O>;
                    member: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } & InferAdditionalFieldsFromPluginOptions<"member", O, false>;
                } | null;
            } : {
                invitation: InferInvitation<O>;
                member: {
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>;
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                invitation: {
                                                    type: string;
                                                };
                                                member: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/accept-invitation";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getInvitation`
         *
         * **client:**
         * `authClient.organization.getInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-invitation)
         */
        getInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    id: string;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: (O["teams"] extends {
                    enabled: true;
                } ? {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: InferOrganizationRolesFromOption<O>;
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                    teamId?: string;
                } : {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: InferOrganizationRolesFromOption<O>;
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                }) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> & {
                    organizationName: ({
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined;
                        metadata?: any;
                    } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["name"];
                    organizationSlug: ({
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined;
                        metadata?: any;
                    } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["slug"];
                    inviterEmail: string;
                };
            } : (O["teams"] extends {
                enabled: true;
            } ? {
                id: string;
                organizationId: string;
                email: string;
                role: InferOrganizationRolesFromOption<O>;
                status: InvitationStatus;
                inviterId: string;
                expiresAt: Date;
                teamId?: string;
            } : {
                id: string;
                organizationId: string;
                email: string;
                role: InferOrganizationRolesFromOption<O>;
                status: InvitationStatus;
                inviterId: string;
                expiresAt: Date;
            }) & InferAdditionalFieldsFromPluginOptions<"invitation", O, false> & {
                organizationName: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["name"];
                organizationSlug: ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined;
                    metadata?: any;
                } & InferAdditionalFieldsFromPluginOptions<"organization", O, true>)["slug"];
                inviterEmail: string;
            }>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                requireHeaders: true;
                query: z.ZodObject<{
                    id: z.ZodString;
                }, z.core.$strip>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                email: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                inviterId: {
                                                    type: string;
                                                };
                                                status: {
                                                    type: string;
                                                };
                                                expiresAt: {
                                                    type: string;
                                                };
                                                organizationName: {
                                                    type: string;
                                                };
                                                organizationSlug: {
                                                    type: string;
                                                };
                                                inviterEmail: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-invitation";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/reject-invitation`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.rejectInvitation`
         *
         * **client:**
         * `authClient.organization.rejectInvitation`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-reject-invitation)
         */
        rejectInvitation: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    invitationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    invitation: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    } | null;
                    member: null;
                };
            } : {
                invitation: {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "member" | "admin" | "owner";
                    status: InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                } | null;
                member: null;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    invitationId: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                invitation: {
                                                    type: string;
                                                };
                                                member: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/reject-invitation";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-invitations`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listInvitations`
         *
         * **client:**
         * `authClient.organization.listInvitations`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list-invitations)
         */
        listInvitations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O>[];
            } : InferInvitation<O>[]>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                query: z.ZodOptional<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
            } & {
                use: any[];
            };
            path: "/organization/list-invitations";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-active-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getActiveMember`
         *
         * **client:**
         * `authClient.organization.getActiveMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-active-member)
         */
        getActiveMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } | null;
            } : {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    image: string | null | undefined;
                };
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            } | null>;
            options: {
                method: "GET";
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                id: {
                                                    type: string;
                                                };
                                                userId: {
                                                    type: string;
                                                };
                                                organizationId: {
                                                    type: string;
                                                };
                                                role: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/get-active-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/check-slug`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.checkOrganizationSlug`
         *
         * **client:**
         * `authClient.organization.checkSlug`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-check-slug)
         */
        checkOrganizationSlug: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    slug: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    slug: z.ZodString;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    } | null;
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/check-slug";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/add-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.addMember`
         *
         * **client:**
         * `authClient.organization.addMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-add-member)
         */
        addMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/organization/add-member", {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }, {
                userId: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | undefined;
            } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }] : [((better_call.InferBodyInput<{
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            }, {
                userId: string;
                role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                organizationId?: string | undefined;
            } & (O extends {
                teams: {
                    enabled: true;
                };
            } ? {
                teamId?: string | undefined;
            } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>> & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: ({
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | null;
            } : ({
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            } & InferAdditionalFieldsFromPluginOptions<"member", O, false>) | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    userId: z.ZodCoercedString<unknown>;
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    organizationId: z.ZodOptional<z.ZodString>;
                    teamId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                metadata: {
                    SERVER_ONLY: true;
                    $Infer: {
                        body: {
                            userId: string;
                            role: InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            organizationId?: string | undefined;
                        } & (O extends {
                            teams: {
                                enabled: true;
                            };
                        } ? {
                            teamId?: string | undefined;
                        } : {}) & InferAdditionalFieldsFromPluginOptions<"member", O, true>;
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/add-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/remove-member`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.removeMember`
         *
         * **client:**
         * `authClient.organization.removeMember`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-remove-member)
         */
        removeMember: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    memberIdOrEmail: string;
                    organizationId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    member: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    };
                } | null;
            } : {
                member: {
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                };
            } | null>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    memberIdOrEmail: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                member: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        organizationId: {
                                                            type: string;
                                                        };
                                                        role: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/remove-member";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/update-member-role`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.updateMemberRole`
         *
         * **client:**
         * `authClient.organization.updateMemberRole`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-update-member-role)
         */
        updateMemberRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    role: LiteralString | LiteralString[] | InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                    memberId: string;
                    organizationId?: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    organizationId: string;
                    role: "member" | "admin" | "owner";
                    createdAt: Date;
                    userId: string;
                    user: {
                        email: string;
                        name: string;
                        image?: string;
                    };
                };
            } : {
                id: string;
                organizationId: string;
                role: "member" | "admin" | "owner";
                createdAt: Date;
                userId: string;
                user: {
                    email: string;
                    name: string;
                    image?: string;
                };
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    role: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
                    memberId: z.ZodString;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
                metadata: {
                    $Infer: {
                        body: {
                            role: LiteralString | LiteralString[] | InferOrganizationRolesFromOption<O> | InferOrganizationRolesFromOption<O>[];
                            memberId: string;
                            organizationId?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                member: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        userId: {
                                                            type: string;
                                                        };
                                                        organizationId: {
                                                            type: string;
                                                        };
                                                        role: {
                                                            type: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/update-member-role";
        };
        /**
         * ### Endpoint
         *
         * POST `/organization/leave`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.leaveOrganization`
         *
         * **client:**
         * `authClient.organization.leave`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-leave)
         */
        leaveOrganization: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    organizationId: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                };
            } : {
                user: {
                    id: string;
                    name: string;
                    email: string;
                    image: string | null | undefined;
                };
                id: string;
                organizationId: string;
                userId: string;
                role: string;
                createdAt: Date;
            }>;
            options: {
                method: "POST";
                body: z.ZodObject<{
                    organizationId: z.ZodString;
                }, z.core.$strip>;
                requireHeaders: true;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/leave";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-members`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listMembers`
         *
         * **client:**
         * `authClient.organization.listMembers`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-list-members)
         */
        listUserInvitations: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    email?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: InferInvitation<O>[];
            } : InferInvitation<O>[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>)[];
                query: z.ZodOptional<z.ZodObject<{
                    email: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
            } & {
                use: any[];
            };
            path: "/organization/list-user-invitations";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/list-members`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.listMembers`
         *
         * **client:**
         * `authClient.organization.listMembers`
         */
        listMembers: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    limit?: string | number | undefined;
                    offset?: string | number | undefined;
                    sortBy?: string | undefined;
                    sortDirection?: "asc" | "desc" | undefined;
                    filterField?: string | undefined;
                    filterValue?: string | number | boolean | undefined;
                    filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    members: {
                        user: {
                            id: string;
                            name: string;
                            email: string;
                            image: string | null | undefined;
                        };
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    }[];
                    total: number;
                };
            } : {
                members: {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                }[];
                total: number;
            }>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    limit: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                    offset: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
                    sortBy: z.ZodOptional<z.ZodString>;
                    sortDirection: z.ZodOptional<z.ZodEnum<{
                        asc: "asc";
                        desc: "desc";
                    }>>;
                    filterField: z.ZodOptional<z.ZodString>;
                    filterValue: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber]>, z.ZodBoolean]>>;
                    filterOperator: z.ZodOptional<z.ZodEnum<{
                        eq: "eq";
                        ne: "ne";
                        lt: "lt";
                        lte: "lte";
                        gt: "gt";
                        gte: "gte";
                        contains: "contains";
                    }>>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/list-members";
        };
        /**
         * ### Endpoint
         *
         * GET `/organization/get-active-member-role`
         *
         * ### API Methods
         *
         * **server:**
         * `auth.api.getActiveMemberRole`
         *
         * **client:**
         * `authClient.organization.getActiveMemberRole`
         *
         * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/organization#api-method-organization-get-active-member-role)
         */
        getActiveMemberRole: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    userId?: string | undefined;
                    organizationId?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    role: string;
                };
            } : {
                role: string;
            }>;
            options: {
                method: "GET";
                query: z.ZodOptional<z.ZodObject<{
                    userId: z.ZodOptional<z.ZodString>;
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                use: (((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    orgOptions: OrganizationOptions;
                    roles: typeof defaultRoles & {
                        [key: string]: Role<{}>;
                    };
                    getSession: (context: _better_auth_core.GenericEndpointContext) => Promise<{
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    }>;
                }>) | ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>))[];
            } & {
                use: any[];
            };
            path: "/organization/get-active-member-role";
        };
    }) & {
        hasPermission: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: ({
                    /**
                     * @deprecated Use `permissions` instead
                     */
                    permission: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly organization: readonly ["update", "delete"];
                        readonly member: readonly ["create", "update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly organization: readonly ["update", "delete"];
                        readonly member: readonly ["create", "update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly organization: readonly ["update", "delete"];
                        readonly member: readonly ["create", "update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    })[key][number] : never)[] | undefined; };
                    permissions?: never;
                } | {
                    permissions: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly organization: readonly ["update", "delete"];
                        readonly member: readonly ["create", "update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly organization: readonly ["update", "delete"];
                        readonly member: readonly ["create", "update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                        readonly organization: readonly ["update", "delete"];
                        readonly member: readonly ["create", "update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    })[key][number] : never)[] | undefined; };
                    permission?: never;
                }) & {
                    organizationId?: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    error: null;
                    success: boolean;
                };
            } : {
                error: null;
                success: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                body: z.ZodIntersection<z.ZodObject<{
                    organizationId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>, z.ZodUnion<readonly [z.ZodObject<{
                    permission: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
                    permissions: z.ZodUndefined;
                }, z.core.$strip>, z.ZodObject<{
                    permission: z.ZodUndefined;
                    permissions: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
                }, z.core.$strip>]>>;
                use: ((inputContext: better_call.MiddlewareInputContext<{
                    use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                }>) => Promise<{
                    session: {
                        session: _better_auth_core_db.Session & {
                            activeTeamId?: string;
                            activeOrganizationId?: string;
                        };
                        user: _better_auth_core_db.User;
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: ({
                            /**
                             * @deprecated Use `permissions` instead
                             */
                            permission: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly organization: readonly ["update", "delete"];
                                readonly member: readonly ["create", "update", "delete"];
                                readonly invitation: readonly ["create", "cancel"];
                                readonly team: readonly ["create", "update", "delete"];
                                readonly ac: readonly ["create", "read", "update", "delete"];
                            })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly organization: readonly ["update", "delete"];
                                readonly member: readonly ["create", "update", "delete"];
                                readonly invitation: readonly ["create", "cancel"];
                                readonly team: readonly ["create", "update", "delete"];
                                readonly ac: readonly ["create", "read", "update", "delete"];
                            })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly organization: readonly ["update", "delete"];
                                readonly member: readonly ["create", "update", "delete"];
                                readonly invitation: readonly ["create", "cancel"];
                                readonly team: readonly ["create", "update", "delete"];
                                readonly ac: readonly ["create", "read", "update", "delete"];
                            })[key][number] : never)[] | undefined; };
                            permissions?: never;
                        } | {
                            permissions: { [key in keyof (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly organization: readonly ["update", "delete"];
                                readonly member: readonly ["create", "update", "delete"];
                                readonly invitation: readonly ["create", "cancel"];
                                readonly team: readonly ["create", "update", "delete"];
                                readonly ac: readonly ["create", "read", "update", "delete"];
                            })]?: ((O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly organization: readonly ["update", "delete"];
                                readonly member: readonly ["create", "update", "delete"];
                                readonly invitation: readonly ["create", "cancel"];
                                readonly team: readonly ["create", "update", "delete"];
                                readonly ac: readonly ["create", "read", "update", "delete"];
                            })[key] extends readonly unknown[] ? (O["ac"] extends AccessControl<infer S extends Statements> ? S : {
                                readonly organization: readonly ["update", "delete"];
                                readonly member: readonly ["create", "update", "delete"];
                                readonly invitation: readonly ["create", "cancel"];
                                readonly team: readonly ["create", "update", "delete"];
                                readonly ac: readonly ["create", "read", "update", "delete"];
                            })[key][number] : never)[] | undefined; };
                            permission?: never;
                        }) & {
                            organizationId?: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            permission: {
                                                type: string;
                                                description: string;
                                                deprecated: boolean;
                                            };
                                            permissions: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                error: {
                                                    type: string;
                                                };
                                                success: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/organization/has-permission";
        };
    };
    schema: {
        session: {
            fields: O["teams"] extends {
                enabled: true;
            } ? {
                activeTeamId: {
                    type: "string";
                    required: false;
                };
                activeOrganizationId: {
                    type: "string";
                    required: false;
                };
            } : {
                activeOrganizationId: {
                    type: "string";
                    required: false;
                };
            };
        };
    };
    $Infer: {
        Organization: InferOrganization<O>;
        Invitation: InferInvitation<O>;
        Member: InferMember<O>;
        Team: any;
        TeamMember: any;
        ActiveOrganization: Awaited<ReturnType<ReturnType<typeof getFullOrganization<O>>>>;
    };
    $ERROR_CODES: {
        readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION: "You are not allowed to create a new organization";
        readonly YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS: "You have reached the maximum number of organizations";
        readonly ORGANIZATION_ALREADY_EXISTS: "Organization already exists";
        readonly ORGANIZATION_NOT_FOUND: "Organization not found";
        readonly USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: "User is not a member of the organization";
        readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION: "You are not allowed to update this organization";
        readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION: "You are not allowed to delete this organization";
        readonly NO_ACTIVE_ORGANIZATION: "No active organization";
        readonly USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION: "User is already a member of this organization";
        readonly MEMBER_NOT_FOUND: "Member not found";
        readonly ROLE_NOT_FOUND: "Role not found";
        readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM: "You are not allowed to create a new team";
        readonly TEAM_ALREADY_EXISTS: "Team already exists";
        readonly TEAM_NOT_FOUND: "Team not found";
        readonly YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER: "You cannot leave the organization as the only owner";
        readonly YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER: "You cannot leave the organization without an owner";
        readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER: "You are not allowed to delete this member";
        readonly YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION: "You are not allowed to invite users to this organization";
        readonly USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION: "User is already invited to this organization";
        readonly INVITATION_NOT_FOUND: "Invitation not found";
        readonly YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION: "You are not the recipient of the invitation";
        readonly EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION: "Email verification required before accepting or rejecting invitation";
        readonly YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION: "You are not allowed to cancel this invitation";
        readonly INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION: "Inviter is no longer a member of the organization";
        readonly YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE: "You are not allowed to invite a user with this role";
        readonly FAILED_TO_RETRIEVE_INVITATION: "Failed to retrieve invitation";
        readonly YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS: "You have reached the maximum number of teams";
        readonly UNABLE_TO_REMOVE_LAST_TEAM: "Unable to remove last team";
        readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER: "You are not allowed to update this member";
        readonly ORGANIZATION_MEMBERSHIP_LIMIT_REACHED: "Organization membership limit reached";
        readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to create teams in this organization";
        readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to delete teams in this organization";
        readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM: "You are not allowed to update this team";
        readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM: "You are not allowed to delete this team";
        readonly INVITATION_LIMIT_REACHED: "Invitation limit reached";
        readonly TEAM_MEMBER_LIMIT_REACHED: "Team member limit reached";
        readonly USER_IS_NOT_A_MEMBER_OF_THE_TEAM: "User is not a member of the team";
        readonly YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM: "You are not allowed to list the members of this team";
        readonly YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: "You do not have an active team";
        readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER: "You are not allowed to create a new member";
        readonly YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER: "You are not allowed to remove a team member";
        readonly YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION: "You are not allowed to access this organization as an owner";
        readonly YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION: "You are not a member of this organization";
        readonly MISSING_AC_INSTANCE: "Dynamic Access Control requires a pre-defined ac instance on the server auth plugin. Read server logs for more information";
        readonly YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE: "You must be in an organization to create a role";
        readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE: "You are not allowed to create a role";
        readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE: "You are not allowed to update a role";
        readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE: "You are not allowed to delete a role";
        readonly YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE: "You are not allowed to read a role";
        readonly YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE: "You are not allowed to list a role";
        readonly YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE: "You are not allowed to get a role";
        readonly TOO_MANY_ROLES: "This organization has too many roles";
        readonly INVALID_RESOURCE: "The provided permission includes an invalid resource";
        readonly ROLE_NAME_IS_ALREADY_TAKEN: "That role name is already taken";
        readonly CANNOT_DELETE_A_PRE_DEFINED_ROLE: "Cannot delete a pre-defined role";
    };
    options: O;
};

export { defaultRoles, defaultRolesSchema, invitationSchema, invitationStatus, memberSchema, organization, organizationRoleSchema, organizationSchema, parseRoles, role, teamMemberSchema, teamSchema };
export type { InferInvitation, InferMember, InferOrganization, InferOrganizationRolesFromOption, InferOrganizationZodRolesFromOption, InferTeam, Invitation, InvitationInput, InvitationStatus, Member, MemberInput, Organization, OrganizationInput, OrganizationOptions, OrganizationRole, Team, TeamInput, TeamMember, TeamMemberInput };
