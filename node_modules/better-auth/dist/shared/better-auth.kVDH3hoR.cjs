'use strict';

const access = require('./better-auth.HiXxvark.cjs');

const defaultStatements = {
  organization: ["update", "delete"],
  member: ["create", "update", "delete"],
  invitation: ["create", "cancel"],
  team: ["create", "update", "delete"],
  ac: ["create", "read", "update", "delete"]
};
const defaultAc = access.createAccessControl(defaultStatements);
const adminAc = defaultAc.newRole({
  organization: ["update"],
  invitation: ["create", "cancel"],
  member: ["create", "update", "delete"],
  team: ["create", "update", "delete"],
  ac: ["create", "read", "update", "delete"]
});
const ownerAc = defaultAc.newRole({
  organization: ["update", "delete"],
  member: ["create", "update", "delete"],
  invitation: ["create", "cancel"],
  team: ["create", "update", "delete"],
  ac: ["create", "read", "update", "delete"]
});
const memberAc = defaultAc.newRole({
  organization: [],
  member: [],
  invitation: [],
  team: [],
  ac: ["read"]
  // Allow members to see all roles for their org.
});
const defaultRoles = {
  admin: adminAc,
  owner: ownerAc,
  member: memberAc
};

exports.adminAc = adminAc;
exports.defaultAc = defaultAc;
exports.defaultRoles = defaultRoles;
exports.defaultStatements = defaultStatements;
exports.memberAc = memberAc;
exports.ownerAc = ownerAc;
