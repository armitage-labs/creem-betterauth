import { c as createAccessControl } from './better-auth.BLxPPg5G.mjs';

const defaultStatements = {
  organization: ["update", "delete"],
  member: ["create", "update", "delete"],
  invitation: ["create", "cancel"],
  team: ["create", "update", "delete"],
  ac: ["create", "read", "update", "delete"]
};
const defaultAc = createAccessControl(defaultStatements);
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

export { defaultAc as a, adminAc as b, defaultRoles as c, defaultStatements as d, memberAc as m, ownerAc as o };
