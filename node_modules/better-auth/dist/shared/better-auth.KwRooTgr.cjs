'use strict';

const middleware = require('@better-auth/core/middleware');
require('better-call');
require('./better-auth.b10rFcs4.cjs');
const session = require('./better-auth.BimfmAGe.cjs');
const z = require('zod');
require('@better-auth/core/error');
require('@better-auth/core/env');
require('@better-auth/utils/base64');
require('@better-auth/utils/hmac');
require('@better-auth/utils/binary');
require('@better-auth/core/db');
require('@better-auth/utils/random');
require('@better-auth/utils/hash');
require('@noble/ciphers/chacha.js');
require('@noble/ciphers/utils.js');
require('jose');
require('@noble/hashes/scrypt.js');
require('@better-auth/utils/hex');
require('@noble/hashes/utils.js');
require('./better-auth.CYeOI8C-.cjs');
require('kysely');
require('@better-auth/core/db/adapter');
const utils = require('@better-auth/core/utils');
const id = require('./better-auth.Bg6iw3ig.cjs');

function _interopNamespaceCompat(e) {
	if (e && typeof e === 'object' && 'default' in e) return e;
	const n = Object.create(null);
	if (e) {
		for (const k in e) {
			n[k] = e[k];
		}
	}
	n.default = e;
	return n;
}

const z__namespace = /*#__PURE__*/_interopNamespaceCompat(z);

const orgMiddleware = middleware.createAuthMiddleware(async () => {
  return {};
});
const orgSessionMiddleware = middleware.createAuthMiddleware(
  {
    use: [session.sessionMiddleware]
  },
  async (ctx) => {
    const session = ctx.context.session;
    return {
      session
    };
  }
);

const ORGANIZATION_ERROR_CODES = utils.defineErrorCodes({
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION: "You are not allowed to create a new organization",
  YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS: "You have reached the maximum number of organizations",
  ORGANIZATION_ALREADY_EXISTS: "Organization already exists",
  ORGANIZATION_NOT_FOUND: "Organization not found",
  USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: "User is not a member of the organization",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION: "You are not allowed to update this organization",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION: "You are not allowed to delete this organization",
  NO_ACTIVE_ORGANIZATION: "No active organization",
  USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION: "User is already a member of this organization",
  MEMBER_NOT_FOUND: "Member not found",
  ROLE_NOT_FOUND: "Role not found",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM: "You are not allowed to create a new team",
  TEAM_ALREADY_EXISTS: "Team already exists",
  TEAM_NOT_FOUND: "Team not found",
  YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER: "You cannot leave the organization as the only owner",
  YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER: "You cannot leave the organization without an owner",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER: "You are not allowed to delete this member",
  YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION: "You are not allowed to invite users to this organization",
  USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION: "User is already invited to this organization",
  INVITATION_NOT_FOUND: "Invitation not found",
  YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION: "You are not the recipient of the invitation",
  EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION: "Email verification required before accepting or rejecting invitation",
  YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION: "You are not allowed to cancel this invitation",
  INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION: "Inviter is no longer a member of the organization",
  YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE: "You are not allowed to invite a user with this role",
  FAILED_TO_RETRIEVE_INVITATION: "Failed to retrieve invitation",
  YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS: "You have reached the maximum number of teams",
  UNABLE_TO_REMOVE_LAST_TEAM: "Unable to remove last team",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER: "You are not allowed to update this member",
  ORGANIZATION_MEMBERSHIP_LIMIT_REACHED: "Organization membership limit reached",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to create teams in this organization",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to delete teams in this organization",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM: "You are not allowed to update this team",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM: "You are not allowed to delete this team",
  INVITATION_LIMIT_REACHED: "Invitation limit reached",
  TEAM_MEMBER_LIMIT_REACHED: "Team member limit reached",
  USER_IS_NOT_A_MEMBER_OF_THE_TEAM: "User is not a member of the team",
  YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM: "You are not allowed to list the members of this team",
  YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: "You do not have an active team",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER: "You are not allowed to create a new member",
  YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER: "You are not allowed to remove a team member",
  YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION: "You are not allowed to access this organization as an owner",
  YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION: "You are not a member of this organization",
  MISSING_AC_INSTANCE: "Dynamic Access Control requires a pre-defined ac instance on the server auth plugin. Read server logs for more information",
  YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE: "You must be in an organization to create a role",
  YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE: "You are not allowed to create a role",
  YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE: "You are not allowed to update a role",
  YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE: "You are not allowed to delete a role",
  YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE: "You are not allowed to read a role",
  YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE: "You are not allowed to list a role",
  YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE: "You are not allowed to get a role",
  TOO_MANY_ROLES: "This organization has too many roles",
  INVALID_RESOURCE: "The provided permission includes an invalid resource",
  ROLE_NAME_IS_ALREADY_TAKEN: "That role name is already taken",
  CANNOT_DELETE_A_PRE_DEFINED_ROLE: "Cannot delete a pre-defined role"
});

const role = z__namespace.string();
const invitationStatus = z__namespace.enum(["pending", "accepted", "rejected", "canceled"]).default("pending");
z__namespace.object({
  id: z__namespace.string().default(id.generateId),
  name: z__namespace.string(),
  slug: z__namespace.string(),
  logo: z__namespace.string().nullish().optional(),
  metadata: z__namespace.record(z__namespace.string(), z__namespace.unknown()).or(z__namespace.string().transform((v) => JSON.parse(v))).optional(),
  createdAt: z__namespace.date()
});
z__namespace.object({
  id: z__namespace.string().default(id.generateId),
  organizationId: z__namespace.string(),
  userId: z__namespace.coerce.string(),
  role,
  createdAt: z__namespace.date().default(() => /* @__PURE__ */ new Date())
});
z__namespace.object({
  id: z__namespace.string().default(id.generateId),
  organizationId: z__namespace.string(),
  email: z__namespace.string(),
  role,
  status: invitationStatus,
  teamId: z__namespace.string().nullish(),
  inviterId: z__namespace.string(),
  expiresAt: z__namespace.date()
});
const teamSchema = z__namespace.object({
  id: z__namespace.string().default(id.generateId),
  name: z__namespace.string().min(1),
  organizationId: z__namespace.string(),
  createdAt: z__namespace.date(),
  updatedAt: z__namespace.date().optional()
});
z__namespace.object({
  id: z__namespace.string().default(id.generateId),
  teamId: z__namespace.string(),
  userId: z__namespace.string(),
  createdAt: z__namespace.date().default(() => /* @__PURE__ */ new Date())
});
z__namespace.object({
  id: z__namespace.string().default(id.generateId),
  organizationId: z__namespace.string(),
  role: z__namespace.string(),
  permission: z__namespace.record(z__namespace.string(), z__namespace.array(z__namespace.string())),
  createdAt: z__namespace.date().default(() => /* @__PURE__ */ new Date()),
  updatedAt: z__namespace.date().optional()
});
const defaultRoles = ["admin", "member", "owner"];
z__namespace.union([
  z__namespace.enum(defaultRoles),
  z__namespace.array(z__namespace.enum(defaultRoles))
]);

exports.ORGANIZATION_ERROR_CODES = ORGANIZATION_ERROR_CODES;
exports.orgMiddleware = orgMiddleware;
exports.orgSessionMiddleware = orgSessionMiddleware;
exports.teamSchema = teamSchema;
