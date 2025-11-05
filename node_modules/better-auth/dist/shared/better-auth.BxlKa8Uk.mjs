import { APIError } from 'better-call';
import * as z from 'zod';
import { createAuthEndpoint } from '@better-auth/core/middleware';
import './better-auth.BX9UB8EP.mjs';
import { g as getSessionFromCtx, s as sessionMiddleware, h as requestOnlySessionMiddleware } from './better-auth.DEBtROF9.mjs';
import { BetterAuthError, BASE_ERROR_CODES } from '@better-auth/core/error';
import '@better-auth/core/env';
import '@better-auth/utils/base64';
import '@better-auth/utils/hmac';
import '@better-auth/utils/binary';
import '@better-auth/core/db';
import '@better-auth/utils/random';
import '@better-auth/utils/hash';
import '@noble/ciphers/chacha.js';
import '@noble/ciphers/utils.js';
import 'jose';
import '@noble/hashes/scrypt.js';
import '@better-auth/utils/hex';
import '@noble/hashes/utils.js';
import './better-auth.B4Qoxdgc.mjs';
import 'kysely';
import '@better-auth/core/db/adapter';
import { g as getDate } from './better-auth.CW6D9eSx.mjs';
import { p as parseJSON } from './better-auth.msGOU0m9.mjs';
import { o as orgMiddleware, a as orgSessionMiddleware, O as ORGANIZATION_ERROR_CODES, t as teamSchema } from './better-auth.BIQhnWWW.mjs';
import { s as setSessionCookie } from './better-auth.D9_vQR83.mjs';
import { t as toZodSchema } from './better-auth.BxexnJiR.mjs';
import { c as defaultRoles } from './better-auth.DevHHPLH.mjs';
import { c as cacheAllRoles, h as hasPermissionFn } from './better-auth.DaEBQJp_.mjs';

const shimContext = (originalObject, newContext) => {
  const shimmedObj = {};
  for (const [key, value] of Object.entries(originalObject)) {
    shimmedObj[key] = (ctx) => {
      return value({
        ...ctx,
        context: {
          ...newContext,
          ...ctx.context
        }
      });
    };
    shimmedObj[key].path = value.path;
    shimmedObj[key].method = value.method;
    shimmedObj[key].options = value.options;
    shimmedObj[key].headers = value.headers;
  }
  return shimmedObj;
};

const getOrgAdapter = (context, options) => {
  const adapter = context.adapter;
  return {
    findOrganizationBySlug: async (slug) => {
      const organization = await adapter.findOne({
        model: "organization",
        where: [
          {
            field: "slug",
            value: slug
          }
        ]
      });
      return organization;
    },
    createOrganization: async (data) => {
      const organization = await adapter.create({
        model: "organization",
        data: {
          ...data.organization,
          metadata: data.organization.metadata ? JSON.stringify(data.organization.metadata) : void 0
        },
        forceAllowId: true
      });
      return {
        ...organization,
        metadata: organization.metadata && typeof organization.metadata === "string" ? JSON.parse(organization.metadata) : void 0
      };
    },
    findMemberByEmail: async (data) => {
      const user = await adapter.findOne({
        model: "user",
        where: [
          {
            field: "email",
            value: data.email.toLowerCase()
          }
        ]
      });
      if (!user) {
        return null;
      }
      const member = await adapter.findOne({
        model: "member",
        where: [
          {
            field: "organizationId",
            value: data.organizationId
          },
          {
            field: "userId",
            value: user.id
          }
        ]
      });
      if (!member) {
        return null;
      }
      return {
        ...member,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        }
      };
    },
    listMembers: async (data) => {
      const members = await Promise.all([
        adapter.findMany({
          model: "member",
          where: [
            { field: "organizationId", value: data.organizationId },
            ...data.filter?.field ? [
              {
                field: data.filter?.field,
                value: data.filter?.value
              }
            ] : []
          ],
          limit: data.limit || options?.membershipLimit || 100,
          offset: data.offset || 0,
          sortBy: data.sortBy ? { field: data.sortBy, direction: data.sortOrder || "asc" } : void 0
        }),
        adapter.count({
          model: "member",
          where: [
            { field: "organizationId", value: data.organizationId },
            ...data.filter?.field ? [
              {
                field: data.filter?.field,
                value: data.filter?.value
              }
            ] : []
          ]
        })
      ]);
      const users = await adapter.findMany({
        model: "user",
        where: [
          {
            field: "id",
            value: members[0].map((member) => member.userId),
            operator: "in"
          }
        ]
      });
      return {
        members: members[0].map((member) => {
          const user = users.find((user2) => user2.id === member.userId);
          if (!user) {
            throw new BetterAuthError(
              "Unexpected error: User not found for member"
            );
          }
          return {
            ...member,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image
            }
          };
        }),
        total: members[1]
      };
    },
    findMemberByOrgId: async (data) => {
      const [member, user] = await Promise.all([
        await adapter.findOne({
          model: "member",
          where: [
            {
              field: "userId",
              value: data.userId
            },
            {
              field: "organizationId",
              value: data.organizationId
            }
          ]
        }),
        await adapter.findOne({
          model: "user",
          where: [
            {
              field: "id",
              value: data.userId
            }
          ]
        })
      ]);
      if (!user || !member) {
        return null;
      }
      return {
        ...member,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        }
      };
    },
    findMemberById: async (memberId) => {
      const member = await adapter.findOne({
        model: "member",
        where: [
          {
            field: "id",
            value: memberId
          }
        ]
      });
      if (!member) {
        return null;
      }
      const user = await adapter.findOne({
        model: "user",
        where: [
          {
            field: "id",
            value: member.userId
          }
        ]
      });
      if (!user) {
        return null;
      }
      return {
        ...member,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        }
      };
    },
    createMember: async (data) => {
      const member = await adapter.create({
        model: "member",
        data: {
          ...data,
          createdAt: /* @__PURE__ */ new Date()
        }
      });
      return member;
    },
    updateMember: async (memberId, role) => {
      const member = await adapter.update({
        model: "member",
        where: [
          {
            field: "id",
            value: memberId
          }
        ],
        update: {
          role
        }
      });
      return member;
    },
    deleteMember: async (memberId) => {
      const member = await adapter.delete({
        model: "member",
        where: [
          {
            field: "id",
            value: memberId
          }
        ]
      });
      return member;
    },
    updateOrganization: async (organizationId, data) => {
      const organization = await adapter.update({
        model: "organization",
        where: [
          {
            field: "id",
            value: organizationId
          }
        ],
        update: {
          ...data,
          metadata: typeof data.metadata === "object" ? JSON.stringify(data.metadata) : data.metadata
        }
      });
      if (!organization) {
        return null;
      }
      return {
        ...organization,
        metadata: organization.metadata ? parseJSON(organization.metadata) : void 0
      };
    },
    deleteOrganization: async (organizationId) => {
      await adapter.delete({
        model: "member",
        where: [
          {
            field: "organizationId",
            value: organizationId
          }
        ]
      });
      await adapter.delete({
        model: "invitation",
        where: [
          {
            field: "organizationId",
            value: organizationId
          }
        ]
      });
      await adapter.delete({
        model: "organization",
        where: [
          {
            field: "id",
            value: organizationId
          }
        ]
      });
      return organizationId;
    },
    setActiveOrganization: async (sessionToken, organizationId, ctx) => {
      const session = await context.internalAdapter.updateSession(
        sessionToken,
        {
          activeOrganizationId: organizationId
        },
        ctx
      );
      return session;
    },
    findOrganizationById: async (organizationId) => {
      const organization = await adapter.findOne({
        model: "organization",
        where: [
          {
            field: "id",
            value: organizationId
          }
        ]
      });
      return organization;
    },
    checkMembership: async ({
      userId,
      organizationId
    }) => {
      const member = await adapter.findOne({
        model: "member",
        where: [
          {
            field: "userId",
            value: userId
          },
          {
            field: "organizationId",
            value: organizationId
          }
        ]
      });
      return member;
    },
    /**
     * @requires db
     */
    findFullOrganization: async ({
      organizationId,
      isSlug,
      includeTeams,
      membersLimit
    }) => {
      const org = await adapter.findOne({
        model: "organization",
        where: [{ field: isSlug ? "slug" : "id", value: organizationId }]
      });
      if (!org) {
        return null;
      }
      const [invitations, members, teams] = await Promise.all([
        adapter.findMany({
          model: "invitation",
          where: [{ field: "organizationId", value: org.id }]
        }),
        adapter.findMany({
          model: "member",
          where: [{ field: "organizationId", value: org.id }],
          limit: membersLimit ?? options?.membershipLimit ?? 100
        }),
        includeTeams ? adapter.findMany({
          model: "team",
          where: [{ field: "organizationId", value: org.id }]
        }) : null
      ]);
      if (!org) return null;
      const userIds = members.map((member) => member.userId);
      const users = userIds.length > 0 ? await adapter.findMany({
        model: "user",
        where: [{ field: "id", value: userIds, operator: "in" }],
        limit: options?.membershipLimit || 100
      }) : [];
      const userMap = new Map(users.map((user) => [user.id, user]));
      const membersWithUsers = members.map((member) => {
        const user = userMap.get(member.userId);
        if (!user) {
          throw new BetterAuthError(
            "Unexpected error: User not found for member"
          );
        }
        return {
          ...member,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
          }
        };
      });
      return {
        ...org,
        invitations,
        members: membersWithUsers,
        teams
      };
    },
    listOrganizations: async (userId) => {
      const members = await adapter.findMany({
        model: "member",
        where: [
          {
            field: "userId",
            value: userId
          }
        ]
      });
      if (!members || members.length === 0) {
        return [];
      }
      const organizationIds = members.map((member) => member.organizationId);
      const organizations = await adapter.findMany({
        model: "organization",
        where: [
          {
            field: "id",
            value: organizationIds,
            operator: "in"
          }
        ]
      });
      return organizations;
    },
    createTeam: async (data) => {
      const team = await adapter.create({
        model: "team",
        data
      });
      return team;
    },
    findTeamById: async ({
      teamId,
      organizationId,
      includeTeamMembers
    }) => {
      const team = await adapter.findOne({
        model: "team",
        where: [
          {
            field: "id",
            value: teamId
          },
          ...organizationId ? [
            {
              field: "organizationId",
              value: organizationId
            }
          ] : []
        ]
      });
      if (!team) {
        return null;
      }
      let members = [];
      if (includeTeamMembers) {
        members = await adapter.findMany({
          model: "teamMember",
          where: [
            {
              field: "teamId",
              value: teamId
            }
          ],
          limit: options?.membershipLimit || 100
        });
        return {
          ...team,
          members
        };
      }
      return team;
    },
    updateTeam: async (teamId, data) => {
      if ("id" in data) data.id = void 0;
      const team = await adapter.update({
        model: "team",
        where: [
          {
            field: "id",
            value: teamId
          }
        ],
        update: {
          ...data
        }
      });
      return team;
    },
    deleteTeam: async (teamId) => {
      await adapter.deleteMany({
        model: "teamMember",
        where: [
          {
            field: "teamId",
            value: teamId
          }
        ]
      });
      const team = await adapter.delete({
        model: "team",
        where: [
          {
            field: "id",
            value: teamId
          }
        ]
      });
      return team;
    },
    listTeams: async (organizationId) => {
      const teams = await adapter.findMany({
        model: "team",
        where: [
          {
            field: "organizationId",
            value: organizationId
          }
        ]
      });
      return teams;
    },
    createTeamInvitation: async ({
      email,
      role,
      teamId,
      organizationId,
      inviterId,
      expiresIn = 1e3 * 60 * 60 * 48
      // Default expiration: 48 hours
    }) => {
      const expiresAt = getDate(expiresIn);
      const invitation = await adapter.create({
        model: "invitation",
        data: {
          email,
          role,
          organizationId,
          teamId,
          inviterId,
          status: "pending",
          expiresAt
        }
      });
      return invitation;
    },
    setActiveTeam: async (sessionToken, teamId, ctx) => {
      const session = await context.internalAdapter.updateSession(
        sessionToken,
        {
          activeTeamId: teamId
        },
        ctx
      );
      return session;
    },
    listTeamMembers: async (data) => {
      const members = await adapter.findMany({
        model: "teamMember",
        where: [
          {
            field: "teamId",
            value: data.teamId
          }
        ]
      });
      return members;
    },
    countTeamMembers: async (data) => {
      const count = await adapter.count({
        model: "teamMember",
        where: [{ field: "teamId", value: data.teamId }]
      });
      return count;
    },
    countMembers: async (data) => {
      const count = await adapter.count({
        model: "member",
        where: [{ field: "organizationId", value: data.organizationId }]
      });
      return count;
    },
    listTeamsByUser: async (data) => {
      const members = await adapter.findMany({
        model: "teamMember",
        where: [
          {
            field: "userId",
            value: data.userId
          }
        ]
      });
      const teams = await adapter.findMany({
        model: "team",
        where: [
          {
            field: "id",
            operator: "in",
            value: members.map((m) => m.teamId)
          }
        ]
      });
      return teams;
    },
    findTeamMember: async (data) => {
      const member = await adapter.findOne({
        model: "teamMember",
        where: [
          {
            field: "teamId",
            value: data.teamId
          },
          {
            field: "userId",
            value: data.userId
          }
        ]
      });
      return member;
    },
    findOrCreateTeamMember: async (data) => {
      const member = await adapter.findOne({
        model: "teamMember",
        where: [
          {
            field: "teamId",
            value: data.teamId
          },
          {
            field: "userId",
            value: data.userId
          }
        ]
      });
      if (member) return member;
      return await adapter.create({
        model: "teamMember",
        data: {
          teamId: data.teamId,
          userId: data.userId,
          createdAt: /* @__PURE__ */ new Date()
        }
      });
    },
    removeTeamMember: async (data) => {
      await adapter.delete({
        model: "teamMember",
        where: [
          {
            field: "teamId",
            value: data.teamId
          },
          {
            field: "userId",
            value: data.userId
          }
        ]
      });
    },
    findInvitationsByTeamId: async (teamId) => {
      const invitations = await adapter.findMany({
        model: "invitation",
        where: [
          {
            field: "teamId",
            value: teamId
          }
        ]
      });
      return invitations;
    },
    listUserInvitations: async (email) => {
      const invitations = await adapter.findMany({
        model: "invitation",
        where: [{ field: "email", value: email.toLowerCase() }]
      });
      return invitations;
    },
    createInvitation: async ({
      invitation,
      user
    }) => {
      const defaultExpiration = 60 * 60 * 48;
      const expiresAt = getDate(
        options?.invitationExpiresIn || defaultExpiration,
        "sec"
      );
      const invite = await adapter.create({
        model: "invitation",
        data: {
          status: "pending",
          expiresAt,
          inviterId: user.id,
          ...invitation,
          teamId: invitation.teamIds.length > 0 ? invitation.teamIds.join(",") : null
        }
      });
      return invite;
    },
    findInvitationById: async (id) => {
      const invitation = await adapter.findOne({
        model: "invitation",
        where: [
          {
            field: "id",
            value: id
          }
        ]
      });
      return invitation;
    },
    findPendingInvitation: async (data) => {
      const invitation = await adapter.findMany({
        model: "invitation",
        where: [
          {
            field: "email",
            value: data.email.toLowerCase()
          },
          {
            field: "organizationId",
            value: data.organizationId
          },
          {
            field: "status",
            value: "pending"
          }
        ]
      });
      return invitation.filter(
        (invite) => new Date(invite.expiresAt) > /* @__PURE__ */ new Date()
      );
    },
    findPendingInvitations: async (data) => {
      const invitations = await adapter.findMany({
        model: "invitation",
        where: [
          {
            field: "organizationId",
            value: data.organizationId
          },
          {
            field: "status",
            value: "pending"
          }
        ]
      });
      return invitations.filter(
        (invite) => new Date(invite.expiresAt) > /* @__PURE__ */ new Date()
      );
    },
    listInvitations: async (data) => {
      const invitations = await adapter.findMany({
        model: "invitation",
        where: [
          {
            field: "organizationId",
            value: data.organizationId
          }
        ]
      });
      return invitations;
    },
    updateInvitation: async (data) => {
      const invitation = await adapter.update({
        model: "invitation",
        where: [
          {
            field: "id",
            value: data.invitationId
          }
        ],
        update: {
          status: data.status
        }
      });
      return invitation;
    }
  };
};

const hasPermission = async (input, ctx) => {
  let acRoles = { ...input.options.roles || defaultRoles };
  if (ctx && input.organizationId && input.options.dynamicAccessControl?.enabled && input.options.ac && !input.useMemoryCache) {
    const roles = await ctx.context.adapter.findMany({
      model: "organizationRole",
      where: [
        {
          field: "organizationId",
          value: input.organizationId
        }
      ]
    });
    for (const { role, permission: permissionsString } of roles) {
      if (role in acRoles) continue;
      const result = z.record(z.string(), z.array(z.string())).safeParse(JSON.parse(permissionsString));
      if (!result.success) {
        ctx.context.logger.error(
          "[hasPermission] Invalid permissions for role " + role,
          {
            permissions: JSON.parse(permissionsString)
          }
        );
        throw new APIError("INTERNAL_SERVER_ERROR", {
          message: "Invalid permissions for role " + role
        });
      }
      acRoles[role] = input.options.ac.newRole(result.data);
    }
  }
  if (input.useMemoryCache) {
    acRoles = cacheAllRoles.get(input.organizationId) || acRoles;
  }
  cacheAllRoles.set(input.organizationId, acRoles);
  return hasPermissionFn(input, acRoles);
};

const createInvitation = (option) => {
  const additionalFieldsSchema = toZodSchema({
    fields: option?.schema?.invitation?.additionalFields || {},
    isClientSide: true
  });
  const baseSchema = z.object({
    email: z.string().meta({
      description: "The email address of the user to invite"
    }),
    role: z.union([
      z.string().meta({
        description: "The role to assign to the user"
      }),
      z.array(
        z.string().meta({
          description: "The roles to assign to the user"
        })
      )
    ]).meta({
      description: 'The role(s) to assign to the user. It can be `admin`, `member`, or `guest`. Eg: "member"'
    }),
    organizationId: z.string().meta({
      description: "The organization ID to invite the user to"
    }).optional(),
    resend: z.boolean().meta({
      description: "Resend the invitation email, if the user is already invited. Eg: true"
    }).optional(),
    teamId: z.union([
      z.string().meta({
        description: "The team ID to invite the user to"
      }).optional(),
      z.array(z.string()).meta({
        description: "The team IDs to invite the user to"
      }).optional()
    ])
  });
  return createAuthEndpoint(
    "/organization/invite-member",
    {
      method: "POST",
      use: [orgMiddleware, orgSessionMiddleware],
      body: z.object({
        ...baseSchema.shape,
        ...additionalFieldsSchema.shape
      }),
      metadata: {
        $Infer: {
          body: {}
        },
        openapi: {
          description: "Invite a user to an organization",
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string"
                      },
                      email: {
                        type: "string"
                      },
                      role: {
                        type: "string"
                      },
                      organizationId: {
                        type: "string"
                      },
                      inviterId: {
                        type: "string"
                      },
                      status: {
                        type: "string"
                      },
                      expiresAt: {
                        type: "string"
                      }
                    },
                    required: [
                      "id",
                      "email",
                      "role",
                      "organizationId",
                      "inviterId",
                      "status",
                      "expiresAt"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      const session = ctx.context.session;
      const organizationId = ctx.body.organizationId || session.session.activeOrganizationId;
      if (!organizationId) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
        });
      }
      const adapter = getOrgAdapter(ctx.context, option);
      const member = await adapter.findMemberByOrgId({
        userId: session.user.id,
        organizationId
      });
      if (!member) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
        });
      }
      const canInvite = await hasPermission(
        {
          role: member.role,
          options: ctx.context.orgOptions,
          permissions: {
            invitation: ["create"]
          },
          organizationId
        },
        ctx
      );
      if (!canInvite) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION
        });
      }
      const creatorRole = ctx.context.orgOptions.creatorRole || "owner";
      const roles = parseRoles(ctx.body.role);
      if (member.role !== creatorRole && roles.split(",").includes(creatorRole)) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE
        });
      }
      const alreadyMember = await adapter.findMemberByEmail({
        email: ctx.body.email,
        organizationId
      });
      if (alreadyMember) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION
        });
      }
      const alreadyInvited = await adapter.findPendingInvitation({
        email: ctx.body.email,
        organizationId
      });
      if (alreadyInvited.length && !ctx.body.resend) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION
        });
      }
      const organization = await adapter.findOrganizationById(organizationId);
      if (!organization) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
        });
      }
      if (alreadyInvited.length && ctx.body.resend) {
        const existingInvitation = alreadyInvited[0];
        const defaultExpiration = 60 * 60 * 48;
        const newExpiresAt = getDate(
          ctx.context.orgOptions.invitationExpiresIn || defaultExpiration,
          "sec"
        );
        await ctx.context.adapter.update({
          model: "invitation",
          where: [
            {
              field: "id",
              value: existingInvitation.id
            }
          ],
          update: {
            expiresAt: newExpiresAt
          }
        });
        const updatedInvitation = {
          ...existingInvitation,
          expiresAt: newExpiresAt
        };
        await ctx.context.orgOptions.sendInvitationEmail?.(
          {
            id: updatedInvitation.id,
            role: updatedInvitation.role,
            email: updatedInvitation.email.toLowerCase(),
            organization,
            inviter: {
              ...member,
              user: session.user
            },
            invitation: updatedInvitation
          },
          ctx.request
        );
        return ctx.json(updatedInvitation);
      }
      if (alreadyInvited.length && ctx.context.orgOptions.cancelPendingInvitationsOnReInvite) {
        await adapter.updateInvitation({
          invitationId: alreadyInvited[0].id,
          status: "canceled"
        });
      }
      const invitationLimit = typeof ctx.context.orgOptions.invitationLimit === "function" ? await ctx.context.orgOptions.invitationLimit(
        {
          user: session.user,
          organization,
          member
        },
        ctx.context
      ) : ctx.context.orgOptions.invitationLimit ?? 100;
      const pendingInvitations = await adapter.findPendingInvitations({
        organizationId
      });
      if (pendingInvitations.length >= invitationLimit) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.INVITATION_LIMIT_REACHED
        });
      }
      if (ctx.context.orgOptions.teams && ctx.context.orgOptions.teams.enabled && typeof ctx.context.orgOptions.teams.maximumMembersPerTeam !== "undefined" && "teamId" in ctx.body && ctx.body.teamId) {
        const teamIds2 = typeof ctx.body.teamId === "string" ? [ctx.body.teamId] : ctx.body.teamId;
        for (const teamId of teamIds2) {
          const team = await adapter.findTeamById({
            teamId,
            organizationId,
            includeTeamMembers: true
          });
          if (!team) {
            throw new APIError("BAD_REQUEST", {
              message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND
            });
          }
          const maximumMembersPerTeam = typeof ctx.context.orgOptions.teams.maximumMembersPerTeam === "function" ? await ctx.context.orgOptions.teams.maximumMembersPerTeam({
            teamId,
            session,
            organizationId
          }) : ctx.context.orgOptions.teams.maximumMembersPerTeam;
          if (team.members.length >= maximumMembersPerTeam) {
            throw new APIError("FORBIDDEN", {
              message: ORGANIZATION_ERROR_CODES.TEAM_MEMBER_LIMIT_REACHED
            });
          }
        }
      }
      const teamIds = "teamId" in ctx.body ? typeof ctx.body.teamId === "string" ? [ctx.body.teamId] : ctx.body.teamId ?? [] : [];
      const {
        email: _,
        role: __,
        organizationId: ___,
        resend: ____,
        ...additionalFields
      } = ctx.body;
      let invitationData = {
        role: roles,
        email: ctx.body.email.toLowerCase(),
        organizationId,
        teamIds,
        ...additionalFields ? additionalFields : {}
      };
      if (option?.organizationHooks?.beforeCreateInvitation) {
        const response = await option?.organizationHooks.beforeCreateInvitation(
          {
            invitation: {
              ...invitationData,
              inviterId: session.user.id,
              teamId: teamIds.length > 0 ? teamIds[0] : void 0
            },
            inviter: session.user,
            organization
          }
        );
        if (response && typeof response === "object" && "data" in response) {
          invitationData = {
            ...invitationData,
            ...response.data
          };
        }
      }
      const invitation = await adapter.createInvitation({
        invitation: invitationData,
        user: session.user
      });
      await ctx.context.orgOptions.sendInvitationEmail?.(
        {
          id: invitation.id,
          role: invitation.role,
          email: invitation.email.toLowerCase(),
          organization,
          inviter: {
            ...member,
            user: session.user
          },
          //@ts-expect-error
          invitation
        },
        ctx.request
      );
      if (option?.organizationHooks?.afterCreateInvitation) {
        await option?.organizationHooks.afterCreateInvitation({
          invitation,
          inviter: session.user,
          organization
        });
      }
      return ctx.json(invitation);
    }
  );
};
const acceptInvitation = (options) => createAuthEndpoint(
  "/organization/accept-invitation",
  {
    method: "POST",
    body: z.object({
      invitationId: z.string().meta({
        description: "The ID of the invitation to accept"
      })
    }),
    use: [orgMiddleware, orgSessionMiddleware],
    metadata: {
      openapi: {
        description: "Accept an invitation to an organization",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    invitation: {
                      type: "object"
                    },
                    member: {
                      type: "object"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const session = ctx.context.session;
    const adapter = getOrgAdapter(ctx.context, options);
    const invitation = await adapter.findInvitationById(
      ctx.body.invitationId
    );
    if (!invitation || invitation.expiresAt < /* @__PURE__ */ new Date() || invitation.status !== "pending") {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.INVITATION_NOT_FOUND
      });
    }
    if (invitation.email.toLowerCase() !== session.user.email.toLowerCase()) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION
      });
    }
    if (ctx.context.orgOptions.requireEmailVerificationOnInvitation && !session.user.emailVerified) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION
      });
    }
    const membershipLimit = ctx.context.orgOptions?.membershipLimit || 100;
    const membersCount = await adapter.countMembers({
      organizationId: invitation.organizationId
    });
    if (membersCount >= membershipLimit) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_MEMBERSHIP_LIMIT_REACHED
      });
    }
    const organization = await adapter.findOrganizationById(
      invitation.organizationId
    );
    if (!organization) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
      });
    }
    if (options?.organizationHooks?.beforeAcceptInvitation) {
      await options?.organizationHooks.beforeAcceptInvitation({
        invitation,
        user: session.user,
        organization
      });
    }
    const acceptedI = await adapter.updateInvitation({
      invitationId: ctx.body.invitationId,
      status: "accepted"
    });
    if (!acceptedI) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.FAILED_TO_RETRIEVE_INVITATION
      });
    }
    if (ctx.context.orgOptions.teams && ctx.context.orgOptions.teams.enabled && "teamId" in acceptedI && acceptedI.teamId) {
      const teamIds = acceptedI.teamId.split(",");
      const onlyOne = teamIds.length === 1;
      for (const teamId of teamIds) {
        await adapter.findOrCreateTeamMember({
          teamId,
          userId: session.user.id
        });
        if (typeof ctx.context.orgOptions.teams.maximumMembersPerTeam !== "undefined") {
          const members = await adapter.countTeamMembers({ teamId });
          const maximumMembersPerTeam = typeof ctx.context.orgOptions.teams.maximumMembersPerTeam === "function" ? await ctx.context.orgOptions.teams.maximumMembersPerTeam({
            teamId,
            session,
            organizationId: invitation.organizationId
          }) : ctx.context.orgOptions.teams.maximumMembersPerTeam;
          if (members >= maximumMembersPerTeam) {
            throw new APIError("FORBIDDEN", {
              message: ORGANIZATION_ERROR_CODES.TEAM_MEMBER_LIMIT_REACHED
            });
          }
        }
      }
      if (onlyOne) {
        const teamId = teamIds[0];
        const updatedSession = await adapter.setActiveTeam(
          session.session.token,
          teamId,
          ctx
        );
        await setSessionCookie(ctx, {
          session: updatedSession,
          user: session.user
        });
      }
    }
    const member = await adapter.createMember({
      organizationId: invitation.organizationId,
      userId: session.user.id,
      role: invitation.role,
      createdAt: /* @__PURE__ */ new Date()
    });
    await adapter.setActiveOrganization(
      session.session.token,
      invitation.organizationId,
      ctx
    );
    if (!acceptedI) {
      return ctx.json(null, {
        status: 400,
        body: {
          message: ORGANIZATION_ERROR_CODES.INVITATION_NOT_FOUND
        }
      });
    }
    if (options?.organizationHooks?.afterAcceptInvitation) {
      await options?.organizationHooks.afterAcceptInvitation({
        invitation: acceptedI,
        member,
        user: session.user,
        organization
      });
    }
    return ctx.json({
      invitation: acceptedI,
      member
    });
  }
);
const rejectInvitation = (options) => createAuthEndpoint(
  "/organization/reject-invitation",
  {
    method: "POST",
    body: z.object({
      invitationId: z.string().meta({
        description: "The ID of the invitation to reject"
      })
    }),
    use: [orgMiddleware, orgSessionMiddleware],
    metadata: {
      openapi: {
        description: "Reject an invitation to an organization",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    invitation: {
                      type: "object"
                    },
                    member: {
                      type: "null"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const session = ctx.context.session;
    const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
    const invitation = await adapter.findInvitationById(
      ctx.body.invitationId
    );
    if (!invitation || invitation.expiresAt < /* @__PURE__ */ new Date() || invitation.status !== "pending") {
      throw new APIError("BAD_REQUEST", {
        message: "Invitation not found!"
      });
    }
    if (invitation.email.toLowerCase() !== session.user.email.toLowerCase()) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION
      });
    }
    if (ctx.context.orgOptions.requireEmailVerificationOnInvitation && !session.user.emailVerified) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION
      });
    }
    const organization = await adapter.findOrganizationById(
      invitation.organizationId
    );
    if (!organization) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
      });
    }
    if (options?.organizationHooks?.beforeRejectInvitation) {
      await options?.organizationHooks.beforeRejectInvitation({
        invitation,
        user: session.user,
        organization
      });
    }
    const rejectedI = await adapter.updateInvitation({
      invitationId: ctx.body.invitationId,
      status: "rejected"
    });
    if (options?.organizationHooks?.afterRejectInvitation) {
      await options?.organizationHooks.afterRejectInvitation({
        invitation: rejectedI || invitation,
        user: session.user,
        organization
      });
    }
    return ctx.json({
      invitation: rejectedI,
      member: null
    });
  }
);
const cancelInvitation = (options) => createAuthEndpoint(
  "/organization/cancel-invitation",
  {
    method: "POST",
    body: z.object({
      invitationId: z.string().meta({
        description: "The ID of the invitation to cancel"
      })
    }),
    use: [orgMiddleware, orgSessionMiddleware],
    openapi: {
      description: "Cancel an invitation to an organization",
      responses: {
        "200": {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  invitation: {
                    type: "object"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const session = ctx.context.session;
    const adapter = getOrgAdapter(ctx.context, options);
    const invitation = await adapter.findInvitationById(
      ctx.body.invitationId
    );
    if (!invitation) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.INVITATION_NOT_FOUND
      });
    }
    const member = await adapter.findMemberByOrgId({
      userId: session.user.id,
      organizationId: invitation.organizationId
    });
    if (!member) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
      });
    }
    const canCancel = await hasPermission(
      {
        role: member.role,
        options: ctx.context.orgOptions,
        permissions: {
          invitation: ["cancel"]
        },
        organizationId: invitation.organizationId
      },
      ctx
    );
    if (!canCancel) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION
      });
    }
    const organization = await adapter.findOrganizationById(
      invitation.organizationId
    );
    if (!organization) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
      });
    }
    if (options?.organizationHooks?.beforeCancelInvitation) {
      await options?.organizationHooks.beforeCancelInvitation({
        invitation,
        cancelledBy: session.user,
        organization
      });
    }
    const canceledI = await adapter.updateInvitation({
      invitationId: ctx.body.invitationId,
      status: "canceled"
    });
    if (options?.organizationHooks?.afterCancelInvitation) {
      await options?.organizationHooks.afterCancelInvitation({
        invitation: canceledI || invitation,
        cancelledBy: session.user,
        organization
      });
    }
    return ctx.json(canceledI);
  }
);
const getInvitation = (options) => createAuthEndpoint(
  "/organization/get-invitation",
  {
    method: "GET",
    use: [orgMiddleware],
    requireHeaders: true,
    query: z.object({
      id: z.string().meta({
        description: "The ID of the invitation to get"
      })
    }),
    metadata: {
      openapi: {
        description: "Get an invitation by ID",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string"
                    },
                    email: {
                      type: "string"
                    },
                    role: {
                      type: "string"
                    },
                    organizationId: {
                      type: "string"
                    },
                    inviterId: {
                      type: "string"
                    },
                    status: {
                      type: "string"
                    },
                    expiresAt: {
                      type: "string"
                    },
                    organizationName: {
                      type: "string"
                    },
                    organizationSlug: {
                      type: "string"
                    },
                    inviterEmail: {
                      type: "string"
                    }
                  },
                  required: [
                    "id",
                    "email",
                    "role",
                    "organizationId",
                    "inviterId",
                    "status",
                    "expiresAt",
                    "organizationName",
                    "organizationSlug",
                    "inviterEmail"
                  ]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const session = await getSessionFromCtx(ctx);
    if (!session) {
      throw new APIError("UNAUTHORIZED", {
        message: "Not authenticated"
      });
    }
    const adapter = getOrgAdapter(ctx.context, options);
    const invitation = await adapter.findInvitationById(ctx.query.id);
    if (!invitation || invitation.status !== "pending" || invitation.expiresAt < /* @__PURE__ */ new Date()) {
      throw new APIError("BAD_REQUEST", {
        message: "Invitation not found!"
      });
    }
    if (invitation.email.toLowerCase() !== session.user.email.toLowerCase()) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION
      });
    }
    const organization = await adapter.findOrganizationById(
      invitation.organizationId
    );
    if (!organization) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
      });
    }
    const member = await adapter.findMemberByOrgId({
      userId: invitation.inviterId,
      organizationId: invitation.organizationId
    });
    if (!member) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION
      });
    }
    return ctx.json({
      ...invitation,
      organizationName: organization.name,
      organizationSlug: organization.slug,
      inviterEmail: member.user.email
    });
  }
);
const listInvitations = (options) => createAuthEndpoint(
  "/organization/list-invitations",
  {
    method: "GET",
    use: [orgMiddleware, orgSessionMiddleware],
    query: z.object({
      organizationId: z.string().meta({
        description: "The ID of the organization to list invitations for"
      }).optional()
    }).optional()
  },
  async (ctx) => {
    const session = await getSessionFromCtx(ctx);
    if (!session) {
      throw new APIError("UNAUTHORIZED", {
        message: "Not authenticated"
      });
    }
    const orgId = ctx.query?.organizationId || session.session.activeOrganizationId;
    if (!orgId) {
      throw new APIError("BAD_REQUEST", {
        message: "Organization ID is required"
      });
    }
    const adapter = getOrgAdapter(ctx.context, options);
    const isMember = await adapter.findMemberByOrgId({
      userId: session.user.id,
      organizationId: orgId
    });
    if (!isMember) {
      throw new APIError("FORBIDDEN", {
        message: "You are not a member of this organization"
      });
    }
    const invitations = await adapter.listInvitations({
      organizationId: orgId
    });
    return ctx.json(invitations);
  }
);
const listUserInvitations = (options) => createAuthEndpoint(
  "/organization/list-user-invitations",
  {
    method: "GET",
    use: [orgMiddleware],
    query: z.object({
      email: z.string().meta({
        description: "The email of the user to list invitations for. This only works for server side API calls."
      }).optional()
    }).optional()
  },
  async (ctx) => {
    const session = await getSessionFromCtx(ctx);
    if (ctx.request && ctx.query?.email) {
      throw new APIError("BAD_REQUEST", {
        message: "User email cannot be passed for client side API calls."
      });
    }
    const userEmail = session?.user.email || ctx.query?.email;
    if (!userEmail) {
      throw new APIError("BAD_REQUEST", {
        message: "Missing session headers, or email query parameter."
      });
    }
    const adapter = getOrgAdapter(ctx.context, options);
    const invitations = await adapter.listUserInvitations(userEmail);
    return ctx.json(invitations);
  }
);

const addMember = (option) => {
  const additionalFieldsSchema = toZodSchema({
    fields: option?.schema?.member?.additionalFields || {},
    isClientSide: true
  });
  const baseSchema = z.object({
    userId: z.coerce.string().meta({
      description: 'The user Id which represents the user to be added as a member. If `null` is provided, then it\'s expected to provide session headers. Eg: "user-id"'
    }),
    role: z.union([z.string(), z.array(z.string())]).meta({
      description: 'The role(s) to assign to the new member. Eg: ["admin", "sale"]'
    }),
    organizationId: z.string().meta({
      description: `An optional organization ID to pass. If not provided, will default to the user's active organization. Eg: "org-id"`
    }).optional(),
    teamId: z.string().meta({
      description: 'An optional team ID to add the member to. Eg: "team-id"'
    }).optional()
  });
  return createAuthEndpoint(
    "/organization/add-member",
    {
      method: "POST",
      body: z.object({
        ...baseSchema.shape,
        ...additionalFieldsSchema.shape
      }),
      use: [orgMiddleware],
      metadata: {
        SERVER_ONLY: true,
        $Infer: {
          body: {}
        }
      }
    },
    async (ctx) => {
      const session = ctx.body.userId ? await getSessionFromCtx(ctx).catch((e) => null) : null;
      const orgId = ctx.body.organizationId || session?.session.activeOrganizationId;
      if (!orgId) {
        return ctx.json(null, {
          status: 400,
          body: {
            message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
          }
        });
      }
      const teamId = "teamId" in ctx.body ? ctx.body.teamId : void 0;
      if (teamId && !ctx.context.orgOptions.teams?.enabled) {
        ctx.context.logger.error("Teams are not enabled");
        throw new APIError("BAD_REQUEST", {
          message: "Teams are not enabled"
        });
      }
      const adapter = getOrgAdapter(ctx.context, option);
      const user = await ctx.context.internalAdapter.findUserById(
        ctx.body.userId
      );
      if (!user) {
        throw new APIError("BAD_REQUEST", {
          message: BASE_ERROR_CODES.USER_NOT_FOUND
        });
      }
      const alreadyMember = await adapter.findMemberByEmail({
        email: user.email,
        organizationId: orgId
      });
      if (alreadyMember) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION
        });
      }
      if (teamId) {
        const team = await adapter.findTeamById({
          teamId,
          organizationId: orgId
        });
        if (!team || team.organizationId !== orgId) {
          throw new APIError("BAD_REQUEST", {
            message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND
          });
        }
      }
      const membershipLimit = ctx.context.orgOptions?.membershipLimit || 100;
      const count = await adapter.countMembers({ organizationId: orgId });
      if (count >= membershipLimit) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.ORGANIZATION_MEMBERSHIP_LIMIT_REACHED
        });
      }
      const {
        role: _,
        userId: __,
        organizationId: ___,
        ...additionalFields
      } = ctx.body;
      const organization = await adapter.findOrganizationById(orgId);
      if (!organization) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
        });
      }
      let memberData = {
        organizationId: orgId,
        userId: user.id,
        role: parseRoles(ctx.body.role),
        createdAt: /* @__PURE__ */ new Date(),
        ...additionalFields ? additionalFields : {}
      };
      if (option?.organizationHooks?.beforeAddMember) {
        const response = await option?.organizationHooks.beforeAddMember({
          member: {
            userId: user.id,
            organizationId: orgId,
            role: parseRoles(ctx.body.role),
            ...additionalFields
          },
          user,
          organization
        });
        if (response && typeof response === "object" && "data" in response) {
          memberData = {
            ...memberData,
            ...response.data
          };
        }
      }
      const createdMember = await adapter.createMember(memberData);
      if (teamId) {
        await adapter.findOrCreateTeamMember({
          userId: user.id,
          teamId
        });
      }
      if (option?.organizationHooks?.afterAddMember) {
        await option?.organizationHooks.afterAddMember({
          member: createdMember,
          user,
          organization
        });
      }
      return ctx.json(createdMember);
    }
  );
};
const removeMember = (options) => createAuthEndpoint(
  "/organization/remove-member",
  {
    method: "POST",
    body: z.object({
      memberIdOrEmail: z.string().meta({
        description: "The ID or email of the member to remove"
      }),
      /**
       * If not provided, the active organization will be used
       */
      organizationId: z.string().meta({
        description: 'The ID of the organization to remove the member from. If not provided, the active organization will be used. Eg: "org-id"'
      }).optional()
    }),
    use: [orgMiddleware, orgSessionMiddleware],
    metadata: {
      openapi: {
        description: "Remove a member from an organization",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    member: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string"
                        },
                        userId: {
                          type: "string"
                        },
                        organizationId: {
                          type: "string"
                        },
                        role: {
                          type: "string"
                        }
                      },
                      required: ["id", "userId", "organizationId", "role"]
                    }
                  },
                  required: ["member"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const session = ctx.context.session;
    const organizationId = ctx.body.organizationId || session.session.activeOrganizationId;
    if (!organizationId) {
      return ctx.json(null, {
        status: 400,
        body: {
          message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
        }
      });
    }
    const adapter = getOrgAdapter(ctx.context, options);
    const member = await adapter.findMemberByOrgId({
      userId: session.user.id,
      organizationId
    });
    if (!member) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
      });
    }
    let toBeRemovedMember = null;
    if (ctx.body.memberIdOrEmail.includes("@")) {
      toBeRemovedMember = await adapter.findMemberByEmail({
        email: ctx.body.memberIdOrEmail,
        organizationId
      });
    } else {
      toBeRemovedMember = await adapter.findMemberById(
        ctx.body.memberIdOrEmail
      );
    }
    if (!toBeRemovedMember) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
      });
    }
    const roles = toBeRemovedMember.role.split(",");
    const creatorRole = ctx.context.orgOptions?.creatorRole || "owner";
    const isOwner = roles.includes(creatorRole);
    if (isOwner) {
      if (member.role !== creatorRole) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER
        });
      }
      const { members } = await adapter.listMembers({
        organizationId
      });
      const owners = members.filter((member2) => {
        const roles2 = member2.role.split(",");
        return roles2.includes(creatorRole);
      });
      if (owners.length <= 1) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER
        });
      }
    }
    const canDeleteMember = await hasPermission(
      {
        role: member.role,
        options: ctx.context.orgOptions,
        permissions: {
          member: ["delete"]
        },
        organizationId
      },
      ctx
    );
    if (!canDeleteMember) {
      throw new APIError("UNAUTHORIZED", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER
      });
    }
    if (toBeRemovedMember?.organizationId !== organizationId) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
      });
    }
    const organization = await adapter.findOrganizationById(organizationId);
    if (!organization) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
      });
    }
    const userBeingRemoved = await ctx.context.internalAdapter.findUserById(
      toBeRemovedMember.userId
    );
    if (!userBeingRemoved) {
      throw new APIError("BAD_REQUEST", {
        message: "User not found"
      });
    }
    if (options?.organizationHooks?.beforeRemoveMember) {
      await options?.organizationHooks.beforeRemoveMember({
        member: toBeRemovedMember,
        user: userBeingRemoved,
        organization
      });
    }
    await adapter.deleteMember(toBeRemovedMember.id);
    if (session.user.id === toBeRemovedMember.userId && session.session.activeOrganizationId === toBeRemovedMember.organizationId) {
      await adapter.setActiveOrganization(session.session.token, null, ctx);
    }
    if (options?.organizationHooks?.afterRemoveMember) {
      await options?.organizationHooks.afterRemoveMember({
        member: toBeRemovedMember,
        user: userBeingRemoved,
        organization
      });
    }
    return ctx.json({
      member: toBeRemovedMember
    });
  }
);
const updateMemberRole = (option) => createAuthEndpoint(
  "/organization/update-member-role",
  {
    method: "POST",
    body: z.object({
      role: z.union([z.string(), z.array(z.string())]).meta({
        description: 'The new role to be applied. This can be a string or array of strings representing the roles. Eg: ["admin", "sale"]'
      }),
      memberId: z.string().meta({
        description: 'The member id to apply the role update to. Eg: "member-id"'
      }),
      organizationId: z.string().meta({
        description: 'An optional organization ID which the member is a part of to apply the role update. If not provided, you must provide session headers to get the active organization. Eg: "organization-id"'
      }).optional()
    }),
    use: [orgMiddleware, orgSessionMiddleware],
    metadata: {
      $Infer: {
        body: {}
      },
      openapi: {
        description: "Update the role of a member in an organization",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    member: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string"
                        },
                        userId: {
                          type: "string"
                        },
                        organizationId: {
                          type: "string"
                        },
                        role: {
                          type: "string"
                        }
                      },
                      required: ["id", "userId", "organizationId", "role"]
                    }
                  },
                  required: ["member"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const session = ctx.context.session;
    if (!ctx.body.role) {
      throw new APIError("BAD_REQUEST");
    }
    const organizationId = ctx.body.organizationId || session.session.activeOrganizationId;
    if (!organizationId) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
      });
    }
    const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
    const roleToSet = Array.isArray(ctx.body.role) ? ctx.body.role : ctx.body.role ? [ctx.body.role] : [];
    const member = await adapter.findMemberByOrgId({
      userId: session.user.id,
      organizationId
    });
    if (!member) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
      });
    }
    const toBeUpdatedMember = member.id !== ctx.body.memberId ? await adapter.findMemberById(ctx.body.memberId) : member;
    if (!toBeUpdatedMember) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
      });
    }
    const memberBelongsToOrganization = toBeUpdatedMember.organizationId === organizationId;
    if (!memberBelongsToOrganization) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER
      });
    }
    const creatorRole = ctx.context.orgOptions?.creatorRole || "owner";
    const updatingMemberRoles = member.role.split(",");
    const toBeUpdatedMemberRoles = toBeUpdatedMember.role.split(",");
    const isUpdatingCreator = toBeUpdatedMemberRoles.includes(creatorRole);
    const updaterIsCreator = updatingMemberRoles.includes(creatorRole);
    const isSettingCreatorRole = roleToSet.includes(creatorRole);
    const memberIsUpdatingThemselves = member.id === toBeUpdatedMember.id;
    if (isUpdatingCreator && !updaterIsCreator || isSettingCreatorRole && !updaterIsCreator) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER
      });
    }
    if (updaterIsCreator && memberIsUpdatingThemselves) {
      const members = await ctx.context.adapter.findMany({
        model: "member",
        where: [
          {
            field: "organizationId",
            value: organizationId
          }
        ]
      });
      const owners = members.filter((member2) => {
        const roles = member2.role.split(",");
        return roles.includes(creatorRole);
      });
      if (owners.length <= 1 && !isSettingCreatorRole) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER
        });
      }
    }
    const canUpdateMember = await hasPermission(
      {
        role: member.role,
        options: ctx.context.orgOptions,
        permissions: {
          member: ["update"]
        },
        allowCreatorAllPermissions: true,
        organizationId
      },
      ctx
    );
    if (!canUpdateMember) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER
      });
    }
    const organization = await adapter.findOrganizationById(organizationId);
    if (!organization) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
      });
    }
    const userBeingUpdated = await ctx.context.internalAdapter.findUserById(
      toBeUpdatedMember.userId
    );
    if (!userBeingUpdated) {
      throw new APIError("BAD_REQUEST", {
        message: "User not found"
      });
    }
    const previousRole = toBeUpdatedMember.role;
    const newRole = parseRoles(ctx.body.role);
    if (option?.organizationHooks?.beforeUpdateMemberRole) {
      const response = await option?.organizationHooks.beforeUpdateMemberRole(
        {
          member: toBeUpdatedMember,
          newRole,
          user: userBeingUpdated,
          organization
        }
      );
      if (response && typeof response === "object" && "data" in response) {
        const updatedMember2 = await adapter.updateMember(
          ctx.body.memberId,
          response.data.role || newRole
        );
        if (!updatedMember2) {
          throw new APIError("BAD_REQUEST", {
            message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
          });
        }
        if (option?.organizationHooks?.afterUpdateMemberRole) {
          await option?.organizationHooks.afterUpdateMemberRole({
            member: updatedMember2,
            previousRole,
            user: userBeingUpdated,
            organization
          });
        }
        return ctx.json(updatedMember2);
      }
    }
    const updatedMember = await adapter.updateMember(
      ctx.body.memberId,
      newRole
    );
    if (!updatedMember) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
      });
    }
    if (option?.organizationHooks?.afterUpdateMemberRole) {
      await option?.organizationHooks.afterUpdateMemberRole({
        member: updatedMember,
        previousRole,
        user: userBeingUpdated,
        organization
      });
    }
    return ctx.json(updatedMember);
  }
);
const getActiveMember = (options) => createAuthEndpoint(
  "/organization/get-active-member",
  {
    method: "GET",
    use: [orgMiddleware, orgSessionMiddleware],
    requireHeaders: true,
    metadata: {
      openapi: {
        description: "Get the member details of the active organization",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string"
                    },
                    userId: {
                      type: "string"
                    },
                    organizationId: {
                      type: "string"
                    },
                    role: {
                      type: "string"
                    }
                  },
                  required: ["id", "userId", "organizationId", "role"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const session = ctx.context.session;
    const organizationId = session.session.activeOrganizationId;
    if (!organizationId) {
      return ctx.json(null, {
        status: 400,
        body: {
          message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
        }
      });
    }
    const adapter = getOrgAdapter(ctx.context, options);
    const member = await adapter.findMemberByOrgId({
      userId: session.user.id,
      organizationId
    });
    if (!member) {
      return ctx.json(null, {
        status: 400,
        body: {
          message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
        }
      });
    }
    return ctx.json(member);
  }
);
const leaveOrganization = (options) => createAuthEndpoint(
  "/organization/leave",
  {
    method: "POST",
    body: z.object({
      organizationId: z.string().meta({
        description: 'The organization Id for the member to leave. Eg: "organization-id"'
      })
    }),
    requireHeaders: true,
    use: [sessionMiddleware, orgMiddleware]
  },
  async (ctx) => {
    const session = ctx.context.session;
    const adapter = getOrgAdapter(ctx.context, options);
    const member = await adapter.findMemberByOrgId({
      userId: session.user.id,
      organizationId: ctx.body.organizationId
    });
    if (!member) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.MEMBER_NOT_FOUND
      });
    }
    const creatorRole = ctx.context.orgOptions?.creatorRole || "owner";
    const isOwnerLeaving = member.role.split(",").includes(creatorRole);
    if (isOwnerLeaving) {
      const members = await ctx.context.adapter.findMany({
        model: "member",
        where: [
          {
            field: "organizationId",
            value: ctx.body.organizationId
          }
        ]
      });
      const owners = members.filter(
        (member2) => member2.role.split(",").includes(creatorRole)
      );
      if (owners.length <= 1) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER
        });
      }
    }
    await adapter.deleteMember(member.id);
    if (session.session.activeOrganizationId === ctx.body.organizationId) {
      await adapter.setActiveOrganization(session.session.token, null, ctx);
    }
    return ctx.json(member);
  }
);
const listMembers = (options) => createAuthEndpoint(
  "/organization/list-members",
  {
    method: "GET",
    query: z.object({
      limit: z.string().meta({
        description: "The number of users to return"
      }).or(z.number()).optional(),
      offset: z.string().meta({
        description: "The offset to start from"
      }).or(z.number()).optional(),
      sortBy: z.string().meta({
        description: "The field to sort by"
      }).optional(),
      sortDirection: z.enum(["asc", "desc"]).meta({
        description: "The direction to sort by"
      }).optional(),
      filterField: z.string().meta({
        description: "The field to filter by"
      }).optional(),
      filterValue: z.string().meta({
        description: "The value to filter by"
      }).or(z.number()).or(z.boolean()).optional(),
      filterOperator: z.enum(["eq", "ne", "lt", "lte", "gt", "gte", "contains"]).meta({
        description: "The operator to use for the filter"
      }).optional(),
      organizationId: z.string().meta({
        description: `The organization ID to list members for. If not provided, will default to the user's active organization. Eg: "organization-id"`
      }).optional()
    }).optional(),
    use: [orgMiddleware, orgSessionMiddleware]
  },
  async (ctx) => {
    const session = ctx.context.session;
    const organizationId = ctx.query?.organizationId || session.session.activeOrganizationId;
    if (!organizationId) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
      });
    }
    const adapter = getOrgAdapter(ctx.context, options);
    const isMember = await adapter.findMemberByOrgId({
      userId: session.user.id,
      organizationId
    });
    if (!isMember) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION
      });
    }
    const { members, total } = await adapter.listMembers({
      organizationId,
      limit: ctx.query?.limit ? Number(ctx.query.limit) : void 0,
      offset: ctx.query?.offset ? Number(ctx.query.offset) : void 0,
      sortBy: ctx.query?.sortBy,
      sortOrder: ctx.query?.sortDirection,
      filter: ctx.query?.filterField ? {
        field: ctx.query?.filterField,
        operator: ctx.query.filterOperator,
        value: ctx.query.filterValue
      } : void 0
    });
    return ctx.json({
      members,
      total
    });
  }
);
const getActiveMemberRole = (options) => createAuthEndpoint(
  "/organization/get-active-member-role",
  {
    method: "GET",
    query: z.object({
      userId: z.string().meta({
        description: "The user ID to get the role for. If not provided, will default to the current user's"
      }).optional(),
      organizationId: z.string().meta({
        description: `The organization ID to list members for. If not provided, will default to the user's active organization. Eg: "organization-id"`
      }).optional()
    }).optional(),
    use: [orgMiddleware, orgSessionMiddleware]
  },
  async (ctx) => {
    const session = ctx.context.session;
    const organizationId = ctx.query?.organizationId || session.session.activeOrganizationId;
    if (!organizationId) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
      });
    }
    const userId = ctx.query?.userId || session.user.id;
    const adapter = getOrgAdapter(ctx.context, options);
    const member = await adapter.findMemberByOrgId({
      userId,
      organizationId
    });
    if (!member) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION
      });
    }
    return ctx.json({
      role: member?.role
    });
  }
);

const createOrganization = (options) => {
  const additionalFieldsSchema = toZodSchema({
    fields: options?.schema?.organization?.additionalFields || {},
    isClientSide: true
  });
  const baseSchema = z.object({
    name: z.string().min(1).meta({
      description: "The name of the organization"
    }),
    slug: z.string().min(1).meta({
      description: "The slug of the organization"
    }),
    userId: z.coerce.string().meta({
      description: 'The user id of the organization creator. If not provided, the current user will be used. Should only be used by admins or when called by the server. server-only. Eg: "user-id"'
    }).optional(),
    logo: z.string().meta({
      description: "The logo of the organization"
    }).optional(),
    metadata: z.record(z.string(), z.any()).meta({
      description: "The metadata of the organization"
    }).optional(),
    keepCurrentActiveOrganization: z.boolean().meta({
      description: "Whether to keep the current active organization active after creating a new one. Eg: true"
    }).optional()
  });
  return createAuthEndpoint(
    "/organization/create",
    {
      method: "POST",
      body: z.object({
        ...baseSchema.shape,
        ...additionalFieldsSchema.shape
      }),
      use: [orgMiddleware],
      metadata: {
        $Infer: {
          body: {}
        },
        openapi: {
          description: "Create an organization",
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    description: "The organization that was created",
                    $ref: "#/components/schemas/Organization"
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      const session = await getSessionFromCtx(ctx);
      if (!session && (ctx.request || ctx.headers)) {
        throw new APIError("UNAUTHORIZED");
      }
      let user = session?.user || null;
      if (!user) {
        if (!ctx.body.userId) {
          throw new APIError("UNAUTHORIZED");
        }
        user = await ctx.context.internalAdapter.findUserById(ctx.body.userId);
      }
      if (!user) {
        return ctx.json(null, {
          status: 401
        });
      }
      const options2 = ctx.context.orgOptions;
      const canCreateOrg = typeof options2?.allowUserToCreateOrganization === "function" ? await options2.allowUserToCreateOrganization(user) : options2?.allowUserToCreateOrganization === void 0 ? true : options2.allowUserToCreateOrganization;
      if (!canCreateOrg) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION
        });
      }
      const adapter = getOrgAdapter(ctx.context, options2);
      const userOrganizations = await adapter.listOrganizations(user.id);
      const hasReachedOrgLimit = typeof options2.organizationLimit === "number" ? userOrganizations.length >= options2.organizationLimit : typeof options2.organizationLimit === "function" ? await options2.organizationLimit(user) : false;
      if (hasReachedOrgLimit) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS
        });
      }
      const existingOrganization = await adapter.findOrganizationBySlug(
        ctx.body.slug
      );
      if (existingOrganization) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ORGANIZATION_ALREADY_EXISTS
        });
      }
      let {
        keepCurrentActiveOrganization: _,
        userId: __,
        ...orgData
      } = ctx.body;
      if (options2.organizationCreation?.beforeCreate) {
        const response = await options2.organizationCreation.beforeCreate(
          {
            organization: {
              ...orgData,
              createdAt: /* @__PURE__ */ new Date()
            },
            user
          },
          ctx.request
        );
        if (response && typeof response === "object" && "data" in response) {
          orgData = {
            ...ctx.body,
            ...response.data
          };
        }
      }
      if (options2?.organizationHooks?.beforeCreateOrganization) {
        const response = await options2?.organizationHooks.beforeCreateOrganization({
          organization: orgData,
          user
        });
        if (response && typeof response === "object" && "data" in response) {
          orgData = {
            ...ctx.body,
            ...response.data
          };
        }
      }
      const organization = await adapter.createOrganization({
        organization: {
          ...orgData,
          createdAt: /* @__PURE__ */ new Date()
        }
      });
      let member;
      let teamMember = null;
      let data = {
        userId: user.id,
        organizationId: organization.id,
        role: ctx.context.orgOptions.creatorRole || "owner"
      };
      if (options2?.organizationHooks?.beforeAddMember) {
        const response = await options2?.organizationHooks.beforeAddMember({
          member: {
            userId: user.id,
            organizationId: organization.id,
            role: ctx.context.orgOptions.creatorRole || "owner"
          },
          user,
          organization
        });
        if (response && typeof response === "object" && "data" in response) {
          data = {
            ...data,
            ...response.data
          };
        }
      }
      member = await adapter.createMember(data);
      if (options2?.organizationHooks?.afterAddMember) {
        await options2?.organizationHooks.afterAddMember({
          member,
          user,
          organization
        });
      }
      if (options2?.teams?.enabled && options2.teams.defaultTeam?.enabled !== false) {
        let teamData = {
          organizationId: organization.id,
          name: `${organization.name}`,
          createdAt: /* @__PURE__ */ new Date()
        };
        if (options2?.organizationHooks?.beforeCreateTeam) {
          const response = await options2?.organizationHooks.beforeCreateTeam({
            team: {
              organizationId: organization.id,
              name: `${organization.name}`
            },
            user,
            organization
          });
          if (response && typeof response === "object" && "data" in response) {
            teamData = {
              ...teamData,
              ...response.data
            };
          }
        }
        const defaultTeam = await options2.teams.defaultTeam?.customCreateDefaultTeam?.(
          organization,
          ctx.request
        ) || await adapter.createTeam(teamData);
        teamMember = await adapter.findOrCreateTeamMember({
          teamId: defaultTeam.id,
          userId: user.id
        });
        if (options2?.organizationHooks?.afterCreateTeam) {
          await options2?.organizationHooks.afterCreateTeam({
            team: defaultTeam,
            user,
            organization
          });
        }
      }
      if (options2.organizationCreation?.afterCreate) {
        await options2.organizationCreation.afterCreate(
          {
            organization,
            user,
            member
          },
          ctx.request
        );
      }
      if (options2?.organizationHooks?.afterCreateOrganization) {
        await options2?.organizationHooks.afterCreateOrganization({
          organization,
          user,
          member
        });
      }
      if (ctx.context.session && !ctx.body.keepCurrentActiveOrganization) {
        await adapter.setActiveOrganization(
          ctx.context.session.session.token,
          organization.id,
          ctx
        );
      }
      if (teamMember && ctx.context.session && !ctx.body.keepCurrentActiveOrganization) {
        await adapter.setActiveTeam(
          ctx.context.session.session.token,
          teamMember.teamId,
          ctx
        );
      }
      return ctx.json({
        ...organization,
        metadata: organization.metadata && typeof organization.metadata === "string" ? JSON.parse(organization.metadata) : organization.metadata,
        members: [member]
      });
    }
  );
};
const checkOrganizationSlug = (options) => createAuthEndpoint(
  "/organization/check-slug",
  {
    method: "POST",
    body: z.object({
      slug: z.string().meta({
        description: 'The organization slug to check. Eg: "my-org"'
      })
    }),
    use: [requestOnlySessionMiddleware, orgMiddleware]
  },
  async (ctx) => {
    const orgAdapter = getOrgAdapter(ctx.context, options);
    const org = await orgAdapter.findOrganizationBySlug(ctx.body.slug);
    if (!org) {
      return ctx.json({
        status: true
      });
    }
    throw new APIError("BAD_REQUEST", {
      message: "slug is taken"
    });
  }
);
const updateOrganization = (options) => {
  const additionalFieldsSchema = toZodSchema({
    fields: options?.schema?.organization?.additionalFields || {},
    isClientSide: true
  });
  return createAuthEndpoint(
    "/organization/update",
    {
      method: "POST",
      body: z.object({
        data: z.object({
          ...additionalFieldsSchema.shape,
          name: z.string().min(1).meta({
            description: "The name of the organization"
          }).optional(),
          slug: z.string().min(1).meta({
            description: "The slug of the organization"
          }).optional(),
          logo: z.string().meta({
            description: "The logo of the organization"
          }).optional(),
          metadata: z.record(z.string(), z.any()).meta({
            description: "The metadata of the organization"
          }).optional()
        }).partial(),
        organizationId: z.string().meta({
          description: 'The organization ID. Eg: "org-id"'
        }).optional()
      }),
      requireHeaders: true,
      use: [orgMiddleware],
      metadata: {
        $Infer: {
          body: {}
        },
        openapi: {
          description: "Update an organization",
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    description: "The updated organization",
                    $ref: "#/components/schemas/Organization"
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      const session = await ctx.context.getSession(ctx);
      if (!session) {
        throw new APIError("UNAUTHORIZED", {
          message: "User not found"
        });
      }
      const organizationId = ctx.body.organizationId || session.session.activeOrganizationId;
      if (!organizationId) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
        });
      }
      const adapter = getOrgAdapter(ctx.context, options);
      const member = await adapter.findMemberByOrgId({
        userId: session.user.id,
        organizationId
      });
      if (!member) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION
        });
      }
      const canUpdateOrg = await hasPermission(
        {
          permissions: {
            organization: ["update"]
          },
          role: member.role,
          options: ctx.context.orgOptions,
          organizationId
        },
        ctx
      );
      if (!canUpdateOrg) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION
        });
      }
      if (options?.organizationHooks?.beforeUpdateOrganization) {
        const response = await options.organizationHooks.beforeUpdateOrganization({
          organization: ctx.body.data,
          user: session.user,
          member
        });
        if (response && typeof response === "object" && "data" in response) {
          ctx.body.data = {
            ...ctx.body.data,
            ...response.data
          };
        }
      }
      const updatedOrg = await adapter.updateOrganization(
        organizationId,
        ctx.body.data
      );
      if (options?.organizationHooks?.afterUpdateOrganization) {
        await options.organizationHooks.afterUpdateOrganization({
          organization: updatedOrg,
          user: session.user,
          member
        });
      }
      return ctx.json(updatedOrg);
    }
  );
};
const deleteOrganization = (options) => {
  return createAuthEndpoint(
    "/organization/delete",
    {
      method: "POST",
      body: z.object({
        organizationId: z.string().meta({
          description: "The organization id to delete"
        })
      }),
      requireHeaders: true,
      use: [orgMiddleware],
      metadata: {
        openapi: {
          description: "Delete an organization",
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "string",
                    description: "The organization id that was deleted"
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      const disableOrganizationDeletion = ctx.context.orgOptions.organizationDeletion?.disabled || ctx.context.orgOptions.disableOrganizationDeletion;
      if (disableOrganizationDeletion) {
        if (ctx.context.orgOptions.organizationDeletion?.disabled) {
          ctx.context.logger.info(
            "`organizationDeletion.disabled` is deprecated. Use `disableOrganizationDeletion` instead"
          );
        }
        throw new APIError("NOT_FOUND", {
          message: "Organization deletion is disabled"
        });
      }
      const session = await ctx.context.getSession(ctx);
      if (!session) {
        throw new APIError("UNAUTHORIZED", { status: 401 });
      }
      const organizationId = ctx.body.organizationId;
      if (!organizationId) {
        return ctx.json(null, {
          status: 400,
          body: {
            message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
          }
        });
      }
      const adapter = getOrgAdapter(ctx.context, options);
      const member = await adapter.findMemberByOrgId({
        userId: session.user.id,
        organizationId
      });
      if (!member) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION
        });
      }
      const canDeleteOrg = await hasPermission(
        {
          role: member.role,
          permissions: {
            organization: ["delete"]
          },
          organizationId,
          options: ctx.context.orgOptions
        },
        ctx
      );
      if (!canDeleteOrg) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION
        });
      }
      if (organizationId === session.session.activeOrganizationId) {
        await adapter.setActiveOrganization(session.session.token, null, ctx);
      }
      const org = await adapter.findOrganizationById(organizationId);
      if (!org) {
        throw new APIError("BAD_REQUEST");
      }
      if (options?.organizationHooks?.beforeDeleteOrganization) {
        await options.organizationHooks.beforeDeleteOrganization({
          organization: org,
          user: session.user
        });
      }
      await adapter.deleteOrganization(organizationId);
      if (options?.organizationHooks?.afterDeleteOrganization) {
        await options.organizationHooks.afterDeleteOrganization({
          organization: org,
          user: session.user
        });
      }
      return ctx.json(org);
    }
  );
};
const getFullOrganization = (options) => createAuthEndpoint(
  "/organization/get-full-organization",
  {
    method: "GET",
    query: z.optional(
      z.object({
        organizationId: z.string().meta({
          description: "The organization id to get"
        }).optional(),
        organizationSlug: z.string().meta({
          description: "The organization slug to get"
        }).optional(),
        membersLimit: z.number().or(z.string().transform((val) => parseInt(val))).meta({
          description: "The limit of members to get. By default, it uses the membershipLimit option which defaults to 100."
        }).optional()
      })
    ),
    requireHeaders: true,
    use: [orgMiddleware, orgSessionMiddleware],
    metadata: {
      openapi: {
        description: "Get the full organization",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  description: "The organization",
                  $ref: "#/components/schemas/Organization"
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const session = ctx.context.session;
    const organizationId = ctx.query?.organizationSlug || ctx.query?.organizationId || session.session.activeOrganizationId;
    if (!organizationId) {
      ctx.context.logger.info("No active organization found, returning null");
      return ctx.json(null, {
        status: 200
      });
    }
    const adapter = getOrgAdapter(ctx.context, options);
    const organization = await adapter.findFullOrganization({
      organizationId,
      isSlug: !!ctx.query?.organizationSlug,
      includeTeams: ctx.context.orgOptions.teams?.enabled,
      membersLimit: ctx.query?.membersLimit
    });
    if (!organization) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
      });
    }
    const isMember = await adapter.checkMembership({
      userId: session.user.id,
      organizationId: organization.id
    });
    if (!isMember) {
      await adapter.setActiveOrganization(session.session.token, null, ctx);
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION
      });
    }
    return ctx.json(organization);
  }
);
const setActiveOrganization = (options) => {
  return createAuthEndpoint(
    "/organization/set-active",
    {
      method: "POST",
      body: z.object({
        organizationId: z.string().meta({
          description: 'The organization id to set as active. It can be null to unset the active organization. Eg: "org-id"'
        }).nullable().optional(),
        organizationSlug: z.string().meta({
          description: 'The organization slug to set as active. It can be null to unset the active organization if organizationId is not provided. Eg: "org-slug"'
        }).optional()
      }),
      use: [orgSessionMiddleware, orgMiddleware],
      metadata: {
        openapi: {
          description: "Set the active organization",
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    description: "The organization",
                    $ref: "#/components/schemas/Organization"
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      const adapter = getOrgAdapter(ctx.context, options);
      const session = ctx.context.session;
      let organizationId = ctx.body.organizationId;
      let organizationSlug = ctx.body.organizationSlug;
      if (organizationId === null) {
        const sessionOrgId = session.session.activeOrganizationId;
        if (!sessionOrgId) {
          return ctx.json(null);
        }
        const updatedSession2 = await adapter.setActiveOrganization(
          session.session.token,
          null,
          ctx
        );
        await setSessionCookie(ctx, {
          session: updatedSession2,
          user: session.user
        });
        return ctx.json(null);
      }
      if (!organizationId && !organizationSlug) {
        const sessionOrgId = session.session.activeOrganizationId;
        if (!sessionOrgId) {
          return ctx.json(null);
        }
        organizationId = sessionOrgId;
      }
      if (organizationSlug && !organizationId) {
        const organization2 = await adapter.findOrganizationBySlug(organizationSlug);
        if (!organization2) {
          throw new APIError("BAD_REQUEST", {
            message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
          });
        }
        organizationId = organization2.id;
      }
      if (!organizationId) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
        });
      }
      const isMember = await adapter.checkMembership({
        userId: session.user.id,
        organizationId
      });
      if (!isMember) {
        await adapter.setActiveOrganization(session.session.token, null, ctx);
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION
        });
      }
      let organization = await adapter.findOrganizationById(organizationId);
      if (!organization) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
        });
      }
      const updatedSession = await adapter.setActiveOrganization(
        session.session.token,
        organization.id,
        ctx
      );
      await setSessionCookie(ctx, {
        session: updatedSession,
        user: session.user
      });
      return ctx.json(organization);
    }
  );
};
const listOrganizations = (options) => createAuthEndpoint(
  "/organization/list",
  {
    method: "GET",
    use: [orgMiddleware, orgSessionMiddleware],
    metadata: {
      openapi: {
        description: "List all organizations",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Organization"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const adapter = getOrgAdapter(ctx.context, options);
    const organizations = await adapter.listOrganizations(
      ctx.context.session.user.id
    );
    return ctx.json(organizations);
  }
);

const createTeam = (options) => {
  const additionalFieldsSchema = toZodSchema({
    fields: options?.schema?.team?.additionalFields ?? {},
    isClientSide: true
  });
  const baseSchema = z.object({
    name: z.string().meta({
      description: 'The name of the team. Eg: "my-team"'
    }),
    organizationId: z.string().meta({
      description: 'The organization ID which the team will be created in. Defaults to the active organization. Eg: "organization-id"'
    }).optional()
  });
  return createAuthEndpoint(
    "/organization/create-team",
    {
      method: "POST",
      body: z.object({
        ...baseSchema.shape,
        ...additionalFieldsSchema.shape
      }),
      use: [orgMiddleware],
      metadata: {
        $Infer: {
          body: {}
        },
        openapi: {
          description: "Create a new team within an organization",
          responses: {
            "200": {
              description: "Team created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "Unique identifier of the created team"
                      },
                      name: {
                        type: "string",
                        description: "Name of the team"
                      },
                      organizationId: {
                        type: "string",
                        description: "ID of the organization the team belongs to"
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        description: "Timestamp when the team was created"
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        description: "Timestamp when the team was last updated"
                      }
                    },
                    required: [
                      "id",
                      "name",
                      "organizationId",
                      "createdAt",
                      "updatedAt"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      const session = await getSessionFromCtx(ctx);
      const organizationId = ctx.body.organizationId || session?.session.activeOrganizationId;
      if (!session && (ctx.request || ctx.headers)) {
        throw new APIError("UNAUTHORIZED");
      }
      if (!organizationId) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
        });
      }
      const adapter = getOrgAdapter(ctx.context, options);
      if (session) {
        const member = await adapter.findMemberByOrgId({
          userId: session.user.id,
          organizationId
        });
        if (!member) {
          throw new APIError("FORBIDDEN", {
            message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION
          });
        }
        const canCreate = await hasPermission(
          {
            role: member.role,
            options: ctx.context.orgOptions,
            permissions: {
              team: ["create"]
            },
            organizationId
          },
          ctx
        );
        if (!canCreate) {
          throw new APIError("FORBIDDEN", {
            message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION
          });
        }
      }
      const existingTeams = await adapter.listTeams(organizationId);
      const maximum = typeof ctx.context.orgOptions.teams?.maximumTeams === "function" ? await ctx.context.orgOptions.teams?.maximumTeams(
        {
          organizationId,
          session
        },
        ctx.request
      ) : ctx.context.orgOptions.teams?.maximumTeams;
      const maxTeamsReached = maximum ? existingTeams.length >= maximum : false;
      if (maxTeamsReached) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS
        });
      }
      const { name, organizationId: _, ...additionalFields } = ctx.body;
      const organization = await adapter.findOrganizationById(organizationId);
      if (!organization) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
        });
      }
      let teamData = {
        name,
        organizationId,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        ...additionalFields
      };
      if (options?.organizationHooks?.beforeCreateTeam) {
        const response = await options?.organizationHooks.beforeCreateTeam({
          team: {
            name,
            organizationId,
            ...additionalFields
          },
          user: session?.user,
          organization
        });
        if (response && typeof response === "object" && "data" in response) {
          teamData = {
            ...teamData,
            ...response.data
          };
        }
      }
      const createdTeam = await adapter.createTeam(teamData);
      if (options?.organizationHooks?.afterCreateTeam) {
        await options?.organizationHooks.afterCreateTeam({
          team: createdTeam,
          user: session?.user,
          organization
        });
      }
      return ctx.json(createdTeam);
    }
  );
};
const removeTeam = (options) => createAuthEndpoint(
  "/organization/remove-team",
  {
    method: "POST",
    body: z.object({
      teamId: z.string().meta({
        description: `The team ID of the team to remove. Eg: "team-id"`
      }),
      organizationId: z.string().meta({
        description: `The organization ID which the team falls under. If not provided, it will default to the user's active organization. Eg: "organization-id"`
      }).optional()
    }),
    use: [orgMiddleware],
    metadata: {
      openapi: {
        description: "Remove a team from an organization",
        responses: {
          "200": {
            description: "Team removed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      description: "Confirmation message indicating successful removal",
                      enum: ["Team removed successfully."]
                    }
                  },
                  required: ["message"]
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const session = await getSessionFromCtx(ctx);
    const organizationId = ctx.body.organizationId || session?.session.activeOrganizationId;
    if (!organizationId) {
      return ctx.json(null, {
        status: 400,
        body: {
          message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
        }
      });
    }
    if (!session && (ctx.request || ctx.headers)) {
      throw new APIError("UNAUTHORIZED");
    }
    const adapter = getOrgAdapter(ctx.context, options);
    if (session) {
      const member = await adapter.findMemberByOrgId({
        userId: session.user.id,
        organizationId
      });
      if (!member || session.session?.activeTeamId === ctx.body.teamId) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM
        });
      }
      const canRemove = await hasPermission(
        {
          role: member.role,
          options: ctx.context.orgOptions,
          permissions: {
            team: ["delete"]
          },
          organizationId
        },
        ctx
      );
      if (!canRemove) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION
        });
      }
    }
    const team = await adapter.findTeamById({
      teamId: ctx.body.teamId,
      organizationId
    });
    if (!team || team.organizationId !== organizationId) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND
      });
    }
    if (!ctx.context.orgOptions.teams?.allowRemovingAllTeams) {
      const teams = await adapter.listTeams(organizationId);
      if (teams.length <= 1) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.UNABLE_TO_REMOVE_LAST_TEAM
        });
      }
    }
    const organization = await adapter.findOrganizationById(organizationId);
    if (!organization) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
      });
    }
    if (options?.organizationHooks?.beforeDeleteTeam) {
      await options?.organizationHooks.beforeDeleteTeam({
        team,
        user: session?.user,
        organization
      });
    }
    await adapter.deleteTeam(team.id);
    if (options?.organizationHooks?.afterDeleteTeam) {
      await options?.organizationHooks.afterDeleteTeam({
        team,
        user: session?.user,
        organization
      });
    }
    return ctx.json({ message: "Team removed successfully." });
  }
);
const updateTeam = (options) => {
  const additionalFieldsSchema = toZodSchema({
    fields: options?.schema?.team?.additionalFields ?? {},
    isClientSide: true
  });
  return createAuthEndpoint(
    "/organization/update-team",
    {
      method: "POST",
      body: z.object({
        teamId: z.string().meta({
          description: `The ID of the team to be updated. Eg: "team-id"`
        }),
        data: z.object({
          ...teamSchema.shape,
          ...additionalFieldsSchema.shape
        }).partial()
      }),
      requireHeaders: true,
      use: [orgMiddleware, orgSessionMiddleware],
      metadata: {
        $Infer: { body: {} },
        openapi: {
          description: "Update an existing team in an organization",
          responses: {
            "200": {
              description: "Team updated successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "Unique identifier of the updated team"
                      },
                      name: {
                        type: "string",
                        description: "Updated name of the team"
                      },
                      organizationId: {
                        type: "string",
                        description: "ID of the organization the team belongs to"
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        description: "Timestamp when the team was created"
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        description: "Timestamp when the team was last updated"
                      }
                    },
                    required: [
                      "id",
                      "name",
                      "organizationId",
                      "createdAt",
                      "updatedAt"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    },
    async (ctx) => {
      const session = ctx.context.session;
      const organizationId = ctx.body.data.organizationId || session.session.activeOrganizationId;
      if (!organizationId) {
        return ctx.json(null, {
          status: 400,
          body: {
            message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
          }
        });
      }
      const adapter = getOrgAdapter(ctx.context, options);
      const member = await adapter.findMemberByOrgId({
        userId: session.user.id,
        organizationId
      });
      if (!member) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM
        });
      }
      const canUpdate = await hasPermission(
        {
          role: member.role,
          options: ctx.context.orgOptions,
          permissions: {
            team: ["update"]
          },
          organizationId
        },
        ctx
      );
      if (!canUpdate) {
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM
        });
      }
      const team = await adapter.findTeamById({
        teamId: ctx.body.teamId,
        organizationId
      });
      if (!team || team.organizationId !== organizationId) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND
        });
      }
      const { name, organizationId: __, ...additionalFields } = ctx.body.data;
      const organization = await adapter.findOrganizationById(organizationId);
      if (!organization) {
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
        });
      }
      const updates = {
        name,
        ...additionalFields
      };
      if (options?.organizationHooks?.beforeUpdateTeam) {
        const response = await options?.organizationHooks.beforeUpdateTeam({
          team,
          updates,
          user: session.user,
          organization
        });
        if (response && typeof response === "object" && "data" in response) {
          const modifiedUpdates = response.data;
          const updatedTeam2 = await adapter.updateTeam(
            team.id,
            modifiedUpdates
          );
          if (options?.organizationHooks?.afterUpdateTeam) {
            await options?.organizationHooks.afterUpdateTeam({
              team: updatedTeam2,
              user: session.user,
              organization
            });
          }
          return ctx.json(updatedTeam2);
        }
      }
      const updatedTeam = await adapter.updateTeam(team.id, updates);
      if (options?.organizationHooks?.afterUpdateTeam) {
        await options?.organizationHooks.afterUpdateTeam({
          team: updatedTeam,
          user: session.user,
          organization
        });
      }
      return ctx.json(updatedTeam);
    }
  );
};
const listOrganizationTeams = (options) => createAuthEndpoint(
  "/organization/list-teams",
  {
    method: "GET",
    query: z.optional(
      z.object({
        organizationId: z.string().meta({
          description: `The organization ID which the teams are under to list. Defaults to the users active organization. Eg: "organziation-id"`
        }).optional()
      })
    ),
    requireHeaders: true,
    metadata: {
      openapi: {
        description: "List all teams in an organization",
        responses: {
          "200": {
            description: "Teams retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "Unique identifier of the team"
                      },
                      name: {
                        type: "string",
                        description: "Name of the team"
                      },
                      organizationId: {
                        type: "string",
                        description: "ID of the organization the team belongs to"
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        description: "Timestamp when the team was created"
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        description: "Timestamp when the team was last updated"
                      }
                    },
                    required: [
                      "id",
                      "name",
                      "organizationId",
                      "createdAt",
                      "updatedAt"
                    ]
                  },
                  description: "Array of team objects within the organization"
                }
              }
            }
          }
        }
      }
    },
    use: [orgMiddleware, orgSessionMiddleware]
  },
  async (ctx) => {
    const session = ctx.context.session;
    const organizationId = ctx.query?.organizationId || session?.session.activeOrganizationId;
    if (!organizationId) {
      throw ctx.error("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
      });
    }
    const adapter = getOrgAdapter(ctx.context, options);
    const member = await adapter.findMemberByOrgId({
      userId: session.user.id,
      organizationId: organizationId || ""
    });
    if (!member) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION
      });
    }
    const teams = await adapter.listTeams(organizationId);
    return ctx.json(teams);
  }
);
const setActiveTeam = (options) => createAuthEndpoint(
  "/organization/set-active-team",
  {
    method: "POST",
    body: z.object({
      teamId: z.string().meta({
        description: "The team id to set as active. It can be null to unset the active team"
      }).nullable().optional()
    }),
    use: [orgSessionMiddleware, orgMiddleware],
    metadata: {
      openapi: {
        description: "Set the active team",
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  description: "The team",
                  $ref: "#/components/schemas/Team"
                }
              }
            }
          }
        }
      }
    }
  },
  async (ctx) => {
    const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
    const session = ctx.context.session;
    if (ctx.body.teamId === null) {
      const sessionTeamId = session.session.activeTeamId;
      if (!sessionTeamId) {
        return ctx.json(null);
      }
      const updatedSession2 = await adapter.setActiveTeam(
        session.session.token,
        null,
        ctx
      );
      await setSessionCookie(ctx, {
        session: updatedSession2,
        user: session.user
      });
      return ctx.json(null);
    }
    let teamId;
    if (!ctx.body.teamId) {
      const sessionTeamId = session.session.activeTeamId;
      if (!sessionTeamId) {
        return ctx.json(null);
      } else {
        teamId = sessionTeamId;
      }
    } else {
      teamId = ctx.body.teamId;
    }
    const team = await adapter.findTeamById({ teamId });
    if (!team) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND
      });
    }
    const member = await adapter.findTeamMember({
      teamId,
      userId: session.user.id
    });
    if (!member) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_TEAM
      });
    }
    const updatedSession = await adapter.setActiveTeam(
      session.session.token,
      team.id,
      ctx
    );
    await setSessionCookie(ctx, {
      session: updatedSession,
      user: session.user
    });
    return ctx.json(team);
  }
);
const listUserTeams = (options) => createAuthEndpoint(
  "/organization/list-user-teams",
  {
    method: "GET",
    metadata: {
      openapi: {
        description: "List all teams that the current user is a part of.",
        responses: {
          "200": {
            description: "Teams retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    description: "The team",
                    $ref: "#/components/schemas/Team"
                  },
                  description: "Array of team objects within the organization"
                }
              }
            }
          }
        }
      }
    },
    use: [orgMiddleware, orgSessionMiddleware]
  },
  async (ctx) => {
    const session = ctx.context.session;
    const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
    const teams = await adapter.listTeamsByUser({
      userId: session.user.id
    });
    return ctx.json(teams);
  }
);
const listTeamMembers = (options) => createAuthEndpoint(
  "/organization/list-team-members",
  {
    method: "GET",
    query: z.optional(
      z.object({
        teamId: z.string().optional().meta({
          description: "The team whose members we should return. If this is not provided the members of the current active team get returned."
        })
      })
    ),
    metadata: {
      openapi: {
        description: "List the members of the given team.",
        responses: {
          "200": {
            description: "Teams retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    description: "The team member",
                    properties: {
                      id: {
                        type: "string",
                        description: "Unique identifier of the team member"
                      },
                      userId: {
                        type: "string",
                        description: "The user ID of the team member"
                      },
                      teamId: {
                        type: "string",
                        description: "The team ID of the team the team member is in"
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        description: "Timestamp when the team member was created"
                      }
                    },
                    required: ["id", "userId", "teamId", "createdAt"]
                  },
                  description: "Array of team member objects within the team"
                }
              }
            }
          }
        }
      }
    },
    use: [orgMiddleware, orgSessionMiddleware]
  },
  async (ctx) => {
    const session = ctx.context.session;
    const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
    let teamId = ctx.query?.teamId || session?.session.activeTeamId;
    if (!teamId) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM
      });
    }
    const member = await adapter.findTeamMember({
      userId: session.user.id,
      teamId
    });
    if (!member) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_TEAM
      });
    }
    const members = await adapter.listTeamMembers({
      teamId
    });
    return ctx.json(members);
  }
);
const addTeamMember = (options) => createAuthEndpoint(
  "/organization/add-team-member",
  {
    method: "POST",
    body: z.object({
      teamId: z.string().meta({
        description: "The team the user should be a member of."
      }),
      userId: z.coerce.string().meta({
        description: "The user Id which represents the user to be added as a member."
      })
    }),
    metadata: {
      openapi: {
        description: "The newly created member",
        responses: {
          "200": {
            description: "Team member created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  description: "The team member",
                  properties: {
                    id: {
                      type: "string",
                      description: "Unique identifier of the team member"
                    },
                    userId: {
                      type: "string",
                      description: "The user ID of the team member"
                    },
                    teamId: {
                      type: "string",
                      description: "The team ID of the team the team member is in"
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      description: "Timestamp when the team member was created"
                    }
                  },
                  required: ["id", "userId", "teamId", "createdAt"]
                }
              }
            }
          }
        }
      }
    },
    use: [orgMiddleware, orgSessionMiddleware]
  },
  async (ctx) => {
    const session = ctx.context.session;
    const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
    if (!session.session.activeOrganizationId) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
      });
    }
    const currentMember = await adapter.findMemberByOrgId({
      userId: session.user.id,
      organizationId: session.session.activeOrganizationId
    });
    if (!currentMember) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION
      });
    }
    const canUpdateMember = await hasPermission(
      {
        role: currentMember.role,
        options: ctx.context.orgOptions,
        permissions: {
          member: ["update"]
        },
        organizationId: session.session.activeOrganizationId
      },
      ctx
    );
    if (!canUpdateMember) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER
      });
    }
    const toBeAddedMember = await adapter.findMemberByOrgId({
      userId: ctx.body.userId,
      organizationId: session.session.activeOrganizationId
    });
    if (!toBeAddedMember) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION
      });
    }
    const team = await adapter.findTeamById({
      teamId: ctx.body.teamId,
      organizationId: session.session.activeOrganizationId
    });
    if (!team) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND
      });
    }
    const organization = await adapter.findOrganizationById(
      session.session.activeOrganizationId
    );
    if (!organization) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
      });
    }
    const userBeingAdded = await ctx.context.internalAdapter.findUserById(
      ctx.body.userId
    );
    if (!userBeingAdded) {
      throw new APIError("BAD_REQUEST", {
        message: "User not found"
      });
    }
    if (options?.organizationHooks?.beforeAddTeamMember) {
      await options?.organizationHooks.beforeAddTeamMember({
        teamMember: {
          teamId: ctx.body.teamId,
          userId: ctx.body.userId
        },
        team,
        user: userBeingAdded,
        organization
      });
    }
    const teamMember = await adapter.findOrCreateTeamMember({
      teamId: ctx.body.teamId,
      userId: ctx.body.userId
    });
    if (options?.organizationHooks?.afterAddTeamMember) {
      await options?.organizationHooks.afterAddTeamMember({
        teamMember,
        team,
        user: userBeingAdded,
        organization
      });
    }
    return ctx.json(teamMember);
  }
);
const removeTeamMember = (options) => createAuthEndpoint(
  "/organization/remove-team-member",
  {
    method: "POST",
    body: z.object({
      teamId: z.string().meta({
        description: "The team the user should be removed from."
      }),
      userId: z.coerce.string().meta({
        description: "The user which should be removed from the team."
      })
    }),
    metadata: {
      openapi: {
        description: "Remove a member from a team",
        responses: {
          "200": {
            description: "Team member removed successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      description: "Confirmation message indicating successful removal",
                      enum: ["Team member removed successfully."]
                    }
                  },
                  required: ["message"]
                }
              }
            }
          }
        }
      }
    },
    use: [orgMiddleware, orgSessionMiddleware]
  },
  async (ctx) => {
    const session = ctx.context.session;
    const adapter = getOrgAdapter(ctx.context, ctx.context.orgOptions);
    if (!session.session.activeOrganizationId) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
      });
    }
    const currentMember = await adapter.findMemberByOrgId({
      userId: session.user.id,
      organizationId: session.session.activeOrganizationId
    });
    if (!currentMember) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION
      });
    }
    const canDeleteMember = await hasPermission(
      {
        role: currentMember.role,
        options: ctx.context.orgOptions,
        permissions: {
          member: ["delete"]
        },
        organizationId: session.session.activeOrganizationId
      },
      ctx
    );
    if (!canDeleteMember) {
      throw new APIError("FORBIDDEN", {
        message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER
      });
    }
    const toBeAddedMember = await adapter.findMemberByOrgId({
      userId: ctx.body.userId,
      organizationId: session.session.activeOrganizationId
    });
    if (!toBeAddedMember) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION
      });
    }
    const team = await adapter.findTeamById({
      teamId: ctx.body.teamId,
      organizationId: session.session.activeOrganizationId
    });
    if (!team) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.TEAM_NOT_FOUND
      });
    }
    const organization = await adapter.findOrganizationById(
      session.session.activeOrganizationId
    );
    if (!organization) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.ORGANIZATION_NOT_FOUND
      });
    }
    const userBeingRemoved = await ctx.context.internalAdapter.findUserById(
      ctx.body.userId
    );
    if (!userBeingRemoved) {
      throw new APIError("BAD_REQUEST", {
        message: "User not found"
      });
    }
    const teamMember = await adapter.findTeamMember({
      teamId: ctx.body.teamId,
      userId: ctx.body.userId
    });
    if (!teamMember) {
      throw new APIError("BAD_REQUEST", {
        message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_TEAM
      });
    }
    if (options?.organizationHooks?.beforeRemoveTeamMember) {
      await options?.organizationHooks.beforeRemoveTeamMember({
        teamMember,
        team,
        user: userBeingRemoved,
        organization
      });
    }
    await adapter.removeTeamMember({
      teamId: ctx.body.teamId,
      userId: ctx.body.userId
    });
    if (options?.organizationHooks?.afterRemoveTeamMember) {
      await options?.organizationHooks.afterRemoveTeamMember({
        teamMember,
        team,
        user: userBeingRemoved,
        organization
      });
    }
    return ctx.json({ message: "Team member removed successfully." });
  }
);

const normalizeRoleName = (role) => role.toLowerCase();
const DEFAULT_MAXIMUM_ROLES_PER_ORGANIZATION = Number.POSITIVE_INFINITY;
const getAdditionalFields = (options, shouldBePartial = false) => {
  let additionalFields = options?.schema?.organizationRole?.additionalFields || {};
  if (shouldBePartial) {
    for (const key in additionalFields) {
      additionalFields[key].required = false;
    }
  }
  const additionalFieldsSchema = toZodSchema({
    fields: additionalFields,
    isClientSide: true
  });
  return {
    additionalFieldsSchema,
    $AdditionalFields: {},
    $ReturnAdditionalFields: {}
  };
};
const createOrgRole = (options) => {
  const { additionalFieldsSchema} = getAdditionalFields(options, false);
  return createAuthEndpoint(
    "/organization/create-role",
    {
      method: "POST",
      body: z.object({
        organizationId: z.string().optional().meta({
          description: "The id of the organization to create the role in. If not provided, the user's active organization will be used."
        }),
        role: z.string().meta({
          description: "The name of the role to create"
        }),
        permission: z.record(z.string(), z.array(z.string())).meta({
          description: "The permission to assign to the role"
        }),
        additionalFields: z.object({ ...additionalFieldsSchema.shape }).optional()
      }),
      metadata: {
        $Infer: {
          body: {}
        }
      },
      requireHeaders: true,
      use: [orgSessionMiddleware]
    },
    async (ctx) => {
      const { session, user } = ctx.context.session;
      let roleName = ctx.body.role;
      const permission = ctx.body.permission;
      const additionalFields = ctx.body.additionalFields;
      const ac = options.ac;
      if (!ac) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The organization plugin is missing a pre-defined ac instance.`,
          `
Please refer to the documentation here: https://better-auth.com/docs/plugins/organization#dynamic-access-control`
        );
        throw new APIError("NOT_IMPLEMENTED", {
          message: ORGANIZATION_ERROR_CODES.MISSING_AC_INSTANCE
        });
      }
      const organizationId = ctx.body.organizationId ?? session.activeOrganizationId;
      if (!organizationId) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The session is missing an active organization id to create a role. Either set an active org id, or pass an organizationId in the request body.`
        );
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE
        });
      }
      roleName = normalizeRoleName(roleName);
      await checkIfRoleNameIsTakenByPreDefinedRole({
        role: roleName,
        organizationId,
        options,
        ctx
      });
      const member = await ctx.context.adapter.findOne({
        model: "member",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          },
          {
            field: "userId",
            value: user.id,
            operator: "eq",
            connector: "AND"
          }
        ]
      });
      if (!member) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The user is not a member of the organization to create a role.`,
          {
            userId: user.id,
            organizationId
          }
        );
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION
        });
      }
      const canCreateRole = await hasPermission(
        {
          options,
          organizationId,
          permissions: {
            ac: ["create"]
          },
          role: member.role
        },
        ctx
      );
      if (!canCreateRole) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The user is not permitted to create a role. If this is unexpected, please make sure the role associated to that member has the "ac" resource with the "create" permission.`,
          {
            userId: user.id,
            organizationId,
            role: member.role
          }
        );
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE
        });
      }
      const maximumRolesPerOrganization = typeof options.dynamicAccessControl?.maximumRolesPerOrganization === "function" ? await options.dynamicAccessControl.maximumRolesPerOrganization(
        organizationId
      ) : options.dynamicAccessControl?.maximumRolesPerOrganization ?? DEFAULT_MAXIMUM_ROLES_PER_ORGANIZATION;
      const rolesInDB = await ctx.context.adapter.count({
        model: "organizationRole",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          }
        ]
      });
      if (rolesInDB >= maximumRolesPerOrganization) {
        ctx.context.logger.error(
          `[Dynamic Access Control] Failed to create a new role, the organization has too many roles. Maximum allowed roles is ${maximumRolesPerOrganization}.`,
          {
            organizationId,
            maximumRolesPerOrganization,
            rolesInDB
          }
        );
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.TOO_MANY_ROLES
        });
      }
      await checkForInvalidResources({ ac, ctx, permission });
      await checkIfMemberHasPermission({
        ctx,
        member,
        options,
        organizationId,
        permissionRequired: permission,
        user,
        action: "create"
      });
      await checkIfRoleNameIsTakenByRoleInDB({
        ctx,
        organizationId,
        role: roleName
      });
      const newRole = ac.newRole(permission);
      const newRoleInDB = await ctx.context.adapter.create({
        model: "organizationRole",
        data: {
          createdAt: /* @__PURE__ */ new Date(),
          organizationId,
          permission: JSON.stringify(permission),
          role: roleName,
          ...additionalFields
        }
      });
      const data = {
        ...newRoleInDB,
        permission
      };
      return ctx.json({
        success: true,
        roleData: data,
        statements: newRole.statements
      });
    }
  );
};
const deleteOrgRole = (options) => {
  return createAuthEndpoint(
    "/organization/delete-role",
    {
      method: "POST",
      body: z.object({
        organizationId: z.string().optional().meta({
          description: "The id of the organization to create the role in. If not provided, the user's active organization will be used."
        })
      }).and(
        z.union([
          z.object({
            roleName: z.string().meta({
              description: "The name of the role to delete"
            })
          }),
          z.object({
            roleId: z.string().meta({
              description: "The id of the role to delete"
            })
          })
        ])
      ),
      requireHeaders: true,
      use: [orgSessionMiddleware],
      metadata: {
        $Infer: {
          body: {}
        }
      }
    },
    async (ctx) => {
      const { session, user } = ctx.context.session;
      const organizationId = ctx.body.organizationId ?? session.activeOrganizationId;
      if (!organizationId) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The session is missing an active organization id to delete a role. Either set an active org id, or pass an organizationId in the request body.`
        );
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
        });
      }
      const member = await ctx.context.adapter.findOne({
        model: "member",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          },
          {
            field: "userId",
            value: user.id,
            operator: "eq",
            connector: "AND"
          }
        ]
      });
      if (!member) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The user is not a member of the organization to delete a role.`,
          {
            userId: user.id,
            organizationId
          }
        );
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION
        });
      }
      const canDeleteRole = await hasPermission(
        {
          options,
          organizationId,
          permissions: {
            ac: ["delete"]
          },
          role: member.role
        },
        ctx
      );
      if (!canDeleteRole) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The user is not permitted to delete a role. If this is unexpected, please make sure the role associated to that member has the "ac" resource with the "delete" permission.`,
          {
            userId: user.id,
            organizationId,
            role: member.role
          }
        );
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE
        });
      }
      if ("roleName" in ctx.body) {
        const roleName = ctx.body.roleName;
        const defaultRoles = options.roles ? Object.keys(options.roles) : ["owner", "admin", "member"];
        if (defaultRoles.includes(roleName)) {
          ctx.context.logger.error(
            `[Dynamic Access Control] Cannot delete a pre-defined role.`,
            {
              roleName,
              organizationId,
              defaultRoles
            }
          );
          throw new APIError("BAD_REQUEST", {
            message: ORGANIZATION_ERROR_CODES.CANNOT_DELETE_A_PRE_DEFINED_ROLE
          });
        }
      }
      let condition;
      if ("roleName" in ctx.body) {
        condition = {
          field: "role",
          value: ctx.body.roleName,
          operator: "eq",
          connector: "AND"
        };
      } else {
        condition = {
          field: "id",
          value: ctx.body.roleId,
          operator: "eq",
          connector: "AND"
        };
      }
      const existingRoleInDB = await ctx.context.adapter.findOne({
        model: "organizationRole",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          },
          condition
        ]
      });
      if (!existingRoleInDB) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The role name/id does not exist in the database.`,
          {
            ..."roleName" in ctx.body ? { roleName: ctx.body.roleName } : { roleId: ctx.body.roleId },
            organizationId
          }
        );
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ROLE_NOT_FOUND
        });
      }
      existingRoleInDB.permission = JSON.parse(
        existingRoleInDB.permission
      );
      await ctx.context.adapter.delete({
        model: "organizationRole",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          },
          condition
        ]
      });
      return ctx.json({
        success: true
      });
    }
  );
};
const listOrgRoles = (options) => {
  getAdditionalFields(options, false);
  return createAuthEndpoint(
    "/organization/list-roles",
    {
      method: "GET",
      use: [orgSessionMiddleware],
      query: z.object({
        organizationId: z.string().optional().meta({
          description: "The id of the organization to list roles for. If not provided, the user's active organization will be used."
        })
      }).optional(),
      metadata: {
        $Infer: {
          query: {}
        }
      }
    },
    async (ctx) => {
      const { session, user } = ctx.context.session;
      const organizationId = ctx.query?.organizationId ?? session.activeOrganizationId;
      if (!organizationId) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The session is missing an active organization id to list roles. Either set an active org id, or pass an organizationId in the request query.`
        );
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
        });
      }
      const member = await ctx.context.adapter.findOne({
        model: "member",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          },
          {
            field: "userId",
            value: user.id,
            operator: "eq",
            connector: "AND"
          }
        ]
      });
      if (!member) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The user is not a member of the organization to list roles.`,
          {
            userId: user.id,
            organizationId
          }
        );
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION
        });
      }
      const canListRoles = await hasPermission(
        {
          options,
          organizationId,
          permissions: {
            ac: ["read"]
          },
          role: member.role
        },
        ctx
      );
      if (!canListRoles) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The user is not permitted to list roles.`,
          {
            userId: user.id,
            organizationId,
            role: member.role
          }
        );
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE
        });
      }
      let roles = await ctx.context.adapter.findMany({
        model: "organizationRole",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          }
        ]
      });
      roles = roles.map((x) => ({
        ...x,
        permission: JSON.parse(x.permission)
      }));
      return ctx.json(roles);
    }
  );
};
const getOrgRole = (options) => {
  getAdditionalFields(options, false);
  return createAuthEndpoint(
    "/organization/get-role",
    {
      method: "GET",
      use: [orgSessionMiddleware],
      query: z.object({
        organizationId: z.string().optional().meta({
          description: "The id of the organization to read a role for. If not provided, the user's active organization will be used."
        })
      }).and(
        z.union([
          z.object({
            roleName: z.string().meta({
              description: "The name of the role to read"
            })
          }),
          z.object({
            roleId: z.string().meta({
              description: "The id of the role to read"
            })
          })
        ])
      ).optional(),
      metadata: {
        $Infer: {
          query: {}
        }
      }
    },
    async (ctx) => {
      const { session, user } = ctx.context.session;
      const organizationId = ctx.query?.organizationId ?? session.activeOrganizationId;
      if (!organizationId) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The session is missing an active organization id to read a role. Either set an active org id, or pass an organizationId in the request query.`
        );
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
        });
      }
      const member = await ctx.context.adapter.findOne({
        model: "member",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          },
          {
            field: "userId",
            value: user.id,
            operator: "eq",
            connector: "AND"
          }
        ]
      });
      if (!member) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The user is not a member of the organization to read a role.`,
          {
            userId: user.id,
            organizationId
          }
        );
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION
        });
      }
      const canListRoles = await hasPermission(
        {
          options,
          organizationId,
          permissions: {
            ac: ["read"]
          },
          role: member.role
        },
        ctx
      );
      if (!canListRoles) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The user is not permitted to read a role.`,
          {
            userId: user.id,
            organizationId,
            role: member.role
          }
        );
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE
        });
      }
      let condition;
      if ("roleName" in ctx.query) {
        condition = {
          field: "role",
          value: ctx.query.roleName,
          operator: "eq",
          connector: "AND"
        };
      } else {
        condition = {
          field: "id",
          value: ctx.query.roleId,
          operator: "eq",
          connector: "AND"
        };
      }
      let role = await ctx.context.adapter.findOne({
        model: "organizationRole",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          },
          condition
        ]
      });
      if (!role) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The role name/id does not exist in the database.`,
          {
            ..."roleName" in ctx.query ? { roleName: ctx.query.roleName } : { roleId: ctx.query.roleId },
            organizationId
          }
        );
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ROLE_NOT_FOUND
        });
      }
      role.permission = JSON.parse(role.permission);
      return ctx.json(role);
    }
  );
};
const updateOrgRole = (options) => {
  const { additionalFieldsSchema} = getAdditionalFields(options, true);
  return createAuthEndpoint(
    "/organization/update-role",
    {
      method: "POST",
      body: z.object({
        organizationId: z.string().optional().meta({
          description: "The id of the organization to update the role in. If not provided, the user's active organization will be used."
        }),
        data: z.object({
          permission: z.record(z.string(), z.array(z.string())).optional().meta({
            description: "The permission to update the role with"
          }),
          roleName: z.string().optional().meta({
            description: "The name of the role to update"
          }),
          ...additionalFieldsSchema.shape
        })
      }).and(
        z.union([
          z.object({
            roleName: z.string().meta({
              description: "The name of the role to update"
            })
          }),
          z.object({
            roleId: z.string().meta({
              description: "The id of the role to update"
            })
          })
        ])
      ),
      metadata: {
        $Infer: {
          body: {}
        }
      },
      use: [orgSessionMiddleware]
    },
    async (ctx) => {
      const { session, user } = ctx.context.session;
      const ac = options.ac;
      if (!ac) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The organization plugin is missing a pre-defined ac instance.`,
          `
Please refer to the documentation here: https://better-auth.com/docs/plugins/organization#dynamic-access-control`
        );
        throw new APIError("NOT_IMPLEMENTED", {
          message: ORGANIZATION_ERROR_CODES.MISSING_AC_INSTANCE
        });
      }
      const organizationId = ctx.body.organizationId ?? session.activeOrganizationId;
      if (!organizationId) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The session is missing an active organization id to update a role. Either set an active org id, or pass an organizationId in the request body.`
        );
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
        });
      }
      const member = await ctx.context.adapter.findOne({
        model: "member",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          },
          {
            field: "userId",
            value: user.id,
            operator: "eq",
            connector: "AND"
          }
        ]
      });
      if (!member) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The user is not a member of the organization to update a role.`,
          {
            userId: user.id,
            organizationId
          }
        );
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION
        });
      }
      const canUpdateRole = await hasPermission(
        {
          options,
          organizationId,
          role: member.role,
          permissions: {
            ac: ["update"]
          }
        },
        ctx
      );
      if (!canUpdateRole) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The user is not permitted to update a role.`
        );
        throw new APIError("FORBIDDEN", {
          message: ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE
        });
      }
      let condition;
      if ("roleName" in ctx.body) {
        condition = {
          field: "role",
          value: ctx.body.roleName,
          operator: "eq",
          connector: "AND"
        };
      } else {
        condition = {
          field: "id",
          value: ctx.body.roleId,
          operator: "eq",
          connector: "AND"
        };
      }
      let role = await ctx.context.adapter.findOne({
        model: "organizationRole",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          },
          condition
        ]
      });
      if (!role) {
        ctx.context.logger.error(
          `[Dynamic Access Control] The role name/id does not exist in the database.`,
          {
            ..."roleName" in ctx.body ? { roleName: ctx.body.roleName } : { roleId: ctx.body.roleId },
            organizationId
          }
        );
        throw new APIError("BAD_REQUEST", {
          message: ORGANIZATION_ERROR_CODES.ROLE_NOT_FOUND
        });
      }
      role.permission = role.permission ? JSON.parse(role.permission) : void 0;
      const {
        permission: _,
        roleName: __,
        ...additionalFields
      } = ctx.body.data;
      let updateData = {
        ...additionalFields
      };
      if (ctx.body.data.permission) {
        let newPermission = ctx.body.data.permission;
        await checkForInvalidResources({ ac, ctx, permission: newPermission });
        await checkIfMemberHasPermission({
          ctx,
          member,
          options,
          organizationId,
          permissionRequired: newPermission,
          user,
          action: "update"
        });
        updateData.permission = newPermission;
      }
      if (ctx.body.data.roleName) {
        let newRoleName = ctx.body.data.roleName;
        newRoleName = normalizeRoleName(newRoleName);
        await checkIfRoleNameIsTakenByPreDefinedRole({
          role: newRoleName,
          organizationId,
          options,
          ctx
        });
        await checkIfRoleNameIsTakenByRoleInDB({
          role: newRoleName,
          organizationId,
          ctx
        });
        updateData.role = newRoleName;
      }
      const update = {
        ...updateData,
        ...updateData.permission ? { permission: JSON.stringify(updateData.permission) } : {}
      };
      await ctx.context.adapter.update({
        model: "organizationRole",
        where: [
          {
            field: "organizationId",
            value: organizationId,
            operator: "eq",
            connector: "AND"
          },
          condition
        ],
        update
      });
      return ctx.json({
        success: true,
        roleData: {
          ...role,
          ...update,
          permission: updateData.permission || role.permission || null
        }
      });
    }
  );
};
async function checkForInvalidResources({
  ac,
  ctx,
  permission
}) {
  const validResources = Object.keys(ac.statements);
  const providedResources = Object.keys(permission);
  const hasInvalidResource = providedResources.some(
    (r) => !validResources.includes(r)
  );
  if (hasInvalidResource) {
    ctx.context.logger.error(
      `[Dynamic Access Control] The provided permission includes an invalid resource.`,
      {
        providedResources,
        validResources
      }
    );
    throw new APIError("BAD_REQUEST", {
      message: ORGANIZATION_ERROR_CODES.INVALID_RESOURCE
    });
  }
}
async function checkIfMemberHasPermission({
  ctx,
  permissionRequired: permission,
  options,
  organizationId,
  member,
  user,
  action
}) {
  const hasNecessaryPermissions = [];
  const permissionEntries = Object.entries(permission);
  for await (const [resource, permissions] of permissionEntries) {
    for await (const perm of permissions) {
      hasNecessaryPermissions.push({
        resource: { [resource]: [perm] },
        hasPermission: await hasPermission(
          {
            options,
            organizationId,
            permissions: { [resource]: [perm] },
            useMemoryCache: true,
            role: member.role
          },
          ctx
        )
      });
    }
  }
  const missingPermissions = hasNecessaryPermissions.filter((x) => x.hasPermission === false).map((x) => {
    const key = Object.keys(x.resource)[0];
    return `${key}:${x.resource[key][0]}`;
  });
  if (missingPermissions.length > 0) {
    ctx.context.logger.error(
      `[Dynamic Access Control] The user is missing permissions nessesary to ${action} a role with those set of permissions.
`,
      {
        userId: user.id,
        organizationId,
        role: member.role,
        missingPermissions
      }
    );
    let errorMessage;
    if (action === "create")
      errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE;
    else if (action === "update")
      errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE;
    else if (action === "delete")
      errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE;
    else if (action === "read")
      errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE;
    else if (action === "list")
      errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE;
    else
      errorMessage = ORGANIZATION_ERROR_CODES.YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE;
    throw new APIError("FORBIDDEN", {
      message: errorMessage,
      missingPermissions
    });
  }
}
async function checkIfRoleNameIsTakenByPreDefinedRole({
  options,
  organizationId,
  role,
  ctx
}) {
  const defaultRoles = options.roles ? Object.keys(options.roles) : ["owner", "admin", "member"];
  if (defaultRoles.includes(role)) {
    ctx.context.logger.error(
      `[Dynamic Access Control] The role name "${role}" is already taken by a pre-defined role.`,
      {
        role,
        organizationId,
        defaultRoles
      }
    );
    throw new APIError("BAD_REQUEST", {
      message: ORGANIZATION_ERROR_CODES.ROLE_NAME_IS_ALREADY_TAKEN
    });
  }
}
async function checkIfRoleNameIsTakenByRoleInDB({
  organizationId,
  role,
  ctx
}) {
  const existingRoleInDB = await ctx.context.adapter.findOne({
    model: "organizationRole",
    where: [
      {
        field: "organizationId",
        value: organizationId,
        operator: "eq",
        connector: "AND"
      },
      {
        field: "role",
        value: role,
        operator: "eq",
        connector: "AND"
      }
    ]
  });
  if (existingRoleInDB) {
    ctx.context.logger.error(
      `[Dynamic Access Control] The role name "${role}" is already taken by a role in the database.`,
      {
        role,
        organizationId
      }
    );
    throw new APIError("BAD_REQUEST", {
      message: ORGANIZATION_ERROR_CODES.ROLE_NAME_IS_ALREADY_TAKEN
    });
  }
}

function parseRoles(roles) {
  return Array.isArray(roles) ? roles.join(",") : roles;
}
const organization = (options) => {
  let endpoints = {
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
    createOrganization: createOrganization(options),
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
    updateOrganization: updateOrganization(options),
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
    deleteOrganization: deleteOrganization(options),
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
    setActiveOrganization: setActiveOrganization(options),
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
    getFullOrganization: getFullOrganization(options),
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
    listOrganizations: listOrganizations(options),
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
    createInvitation: createInvitation(options),
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
    cancelInvitation: cancelInvitation(options),
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
    acceptInvitation: acceptInvitation(options),
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
    getInvitation: getInvitation(options),
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
    rejectInvitation: rejectInvitation(options),
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
    listInvitations: listInvitations(options),
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
    getActiveMember: getActiveMember(options),
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
    checkOrganizationSlug: checkOrganizationSlug(options),
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
    addMember: addMember(options),
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
    removeMember: removeMember(options),
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
    updateMemberRole: updateMemberRole(options),
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
    leaveOrganization: leaveOrganization(options),
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
    listUserInvitations: listUserInvitations(options),
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
    listMembers: listMembers(options),
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
    getActiveMemberRole: getActiveMemberRole(options)
  };
  const teamSupport = options?.teams?.enabled;
  const teamEndpoints = {
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
    createTeam: createTeam(options),
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
    listOrganizationTeams: listOrganizationTeams(options),
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
    removeTeam: removeTeam(options),
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
    updateTeam: updateTeam(options),
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
    setActiveTeam: setActiveTeam(),
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
    listUserTeams: listUserTeams(),
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
    listTeamMembers: listTeamMembers(),
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
    addTeamMember: addTeamMember(options),
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
    removeTeamMember: removeTeamMember(options)
  };
  if (teamSupport) {
    endpoints = {
      ...endpoints,
      ...teamEndpoints
    };
  }
  const dynamicAccessControlEndpoints = {
    createOrgRole: createOrgRole(options),
    deleteOrgRole: deleteOrgRole(options),
    listOrgRoles: listOrgRoles(options),
    getOrgRole: getOrgRole(options),
    updateOrgRole: updateOrgRole(options)
  };
  if (options?.dynamicAccessControl?.enabled) {
    endpoints = {
      ...endpoints,
      ...dynamicAccessControlEndpoints
    };
  }
  const roles = {
    ...defaultRoles,
    ...options?.roles
  };
  const teamSchema = teamSupport ? {
    team: {
      modelName: options?.schema?.team?.modelName,
      fields: {
        name: {
          type: "string",
          required: true,
          fieldName: options?.schema?.team?.fields?.name
        },
        organizationId: {
          type: "string",
          required: true,
          references: {
            model: "organization",
            field: "id"
          },
          fieldName: options?.schema?.team?.fields?.organizationId
        },
        createdAt: {
          type: "date",
          required: true,
          fieldName: options?.schema?.team?.fields?.createdAt
        },
        updatedAt: {
          type: "date",
          required: false,
          fieldName: options?.schema?.team?.fields?.updatedAt,
          onUpdate: () => /* @__PURE__ */ new Date()
        },
        ...options?.schema?.team?.additionalFields || {}
      }
    },
    teamMember: {
      modelName: options?.schema?.teamMember?.modelName,
      fields: {
        teamId: {
          type: "string",
          required: true,
          references: {
            model: "team",
            field: "id"
          },
          fieldName: options?.schema?.teamMember?.fields?.teamId
        },
        userId: {
          type: "string",
          required: true,
          references: {
            model: "user",
            field: "id"
          },
          fieldName: options?.schema?.teamMember?.fields?.userId
        },
        createdAt: {
          type: "date",
          required: false,
          fieldName: options?.schema?.teamMember?.fields?.createdAt
        }
      }
    }
  } : {};
  const organizationRoleSchema = options?.dynamicAccessControl?.enabled ? {
    organizationRole: {
      fields: {
        organizationId: {
          type: "string",
          required: true,
          references: {
            model: "organization",
            field: "id"
          },
          fieldName: options?.schema?.organizationRole?.fields?.organizationId
        },
        role: {
          type: "string",
          required: true,
          fieldName: options?.schema?.organizationRole?.fields?.role
        },
        permission: {
          type: "string",
          required: true,
          fieldName: options?.schema?.organizationRole?.fields?.permission
        },
        createdAt: {
          type: "date",
          required: true,
          defaultValue: () => /* @__PURE__ */ new Date(),
          fieldName: options?.schema?.organizationRole?.fields?.createdAt
        },
        updatedAt: {
          type: "date",
          required: false,
          fieldName: options?.schema?.organizationRole?.fields?.updatedAt,
          onUpdate: () => /* @__PURE__ */ new Date()
        },
        ...options?.schema?.organizationRole?.additionalFields || {}
      },
      modelName: options?.schema?.organizationRole?.modelName
    }
  } : {};
  const schema = {
    ...organizationRoleSchema,
    ...teamSchema,
    ...{
      organization: {
        modelName: options?.schema?.organization?.modelName,
        fields: {
          name: {
            type: "string",
            required: true,
            sortable: true,
            fieldName: options?.schema?.organization?.fields?.name
          },
          slug: {
            type: "string",
            required: true,
            unique: true,
            sortable: true,
            fieldName: options?.schema?.organization?.fields?.slug
          },
          logo: {
            type: "string",
            required: false,
            fieldName: options?.schema?.organization?.fields?.logo
          },
          createdAt: {
            type: "date",
            required: true,
            fieldName: options?.schema?.organization?.fields?.createdAt
          },
          metadata: {
            type: "string",
            required: false,
            fieldName: options?.schema?.organization?.fields?.metadata
          },
          ...options?.schema?.organization?.additionalFields || {}
        }
      },
      member: {
        modelName: options?.schema?.member?.modelName,
        fields: {
          organizationId: {
            type: "string",
            required: true,
            references: {
              model: "organization",
              field: "id"
            },
            fieldName: options?.schema?.member?.fields?.organizationId
          },
          userId: {
            type: "string",
            required: true,
            fieldName: options?.schema?.member?.fields?.userId,
            references: {
              model: "user",
              field: "id"
            }
          },
          role: {
            type: "string",
            required: true,
            sortable: true,
            defaultValue: "member",
            fieldName: options?.schema?.member?.fields?.role
          },
          createdAt: {
            type: "date",
            required: true,
            fieldName: options?.schema?.member?.fields?.createdAt
          },
          ...options?.schema?.member?.additionalFields || {}
        }
      },
      invitation: {
        modelName: options?.schema?.invitation?.modelName,
        fields: {
          organizationId: {
            type: "string",
            required: true,
            references: {
              model: "organization",
              field: "id"
            },
            fieldName: options?.schema?.invitation?.fields?.organizationId
          },
          email: {
            type: "string",
            required: true,
            sortable: true,
            fieldName: options?.schema?.invitation?.fields?.email
          },
          role: {
            type: "string",
            required: false,
            sortable: true,
            fieldName: options?.schema?.invitation?.fields?.role
          },
          ...teamSupport ? {
            teamId: {
              type: "string",
              required: false,
              sortable: true,
              fieldName: options?.schema?.invitation?.fields?.teamId
            }
          } : {},
          status: {
            type: "string",
            required: true,
            sortable: true,
            defaultValue: "pending",
            fieldName: options?.schema?.invitation?.fields?.status
          },
          expiresAt: {
            type: "date",
            required: true,
            fieldName: options?.schema?.invitation?.fields?.expiresAt
          },
          inviterId: {
            type: "string",
            references: {
              model: "user",
              field: "id"
            },
            fieldName: options?.schema?.invitation?.fields?.inviterId,
            required: true
          },
          ...options?.schema?.invitation?.additionalFields || {}
        }
      }
    }
  };
  const api = shimContext(endpoints, {
    orgOptions: options || {},
    roles,
    getSession: async (context) => {
      return await getSessionFromCtx(context);
    }
  });
  return {
    id: "organization",
    endpoints: {
      ...api,
      hasPermission: createAuthEndpoint(
        "/organization/has-permission",
        {
          method: "POST",
          requireHeaders: true,
          body: z.object({
            organizationId: z.string().optional()
          }).and(
            z.union([
              z.object({
                permission: z.record(z.string(), z.array(z.string())),
                permissions: z.undefined()
              }),
              z.object({
                permission: z.undefined(),
                permissions: z.record(z.string(), z.array(z.string()))
              })
            ])
          ),
          use: [orgSessionMiddleware],
          metadata: {
            $Infer: {
              body: {}
            },
            openapi: {
              description: "Check if the user has permission",
              requestBody: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        permission: {
                          type: "object",
                          description: "The permission to check",
                          deprecated: true
                        },
                        permissions: {
                          type: "object",
                          description: "The permission to check"
                        }
                      },
                      required: ["permissions"]
                    }
                  }
                }
              },
              responses: {
                "200": {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          error: {
                            type: "string"
                          },
                          success: {
                            type: "boolean"
                          }
                        },
                        required: ["success"]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        async (ctx) => {
          const activeOrganizationId = ctx.body.organizationId || ctx.context.session.session.activeOrganizationId;
          if (!activeOrganizationId) {
            throw new APIError("BAD_REQUEST", {
              message: ORGANIZATION_ERROR_CODES.NO_ACTIVE_ORGANIZATION
            });
          }
          const adapter = getOrgAdapter(ctx.context, options);
          const member = await adapter.findMemberByOrgId({
            userId: ctx.context.session.user.id,
            organizationId: activeOrganizationId
          });
          if (!member) {
            throw new APIError("UNAUTHORIZED", {
              message: ORGANIZATION_ERROR_CODES.USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION
            });
          }
          const result = await hasPermission(
            {
              role: member.role,
              options: options || {},
              permissions: ctx.body.permissions ?? ctx.body.permission,
              organizationId: activeOrganizationId
            },
            ctx
          );
          return ctx.json({
            error: null,
            success: result
          });
        }
      )
    },
    schema: {
      ...schema,
      session: {
        fields: {
          activeOrganizationId: {
            type: "string",
            required: false,
            fieldName: options?.schema?.session?.fields?.activeOrganizationId
          },
          ...teamSupport ? {
            activeTeamId: {
              type: "string",
              required: false,
              fieldName: options?.schema?.session?.fields?.activeTeamId
            }
          } : {}
        }
      }
    },
    $Infer: {
      Organization: {},
      Invitation: {},
      Member: {},
      Team: teamSupport ? {} : {},
      TeamMember: teamSupport ? {} : {},
      ActiveOrganization: {}
    },
    $ERROR_CODES: ORGANIZATION_ERROR_CODES,
    options
  };
};

export { organization as o, parseRoles as p };
