import { c as createAccessControl } from './better-auth.BLxPPg5G.mjs';

const defaultStatements = {
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "get",
    "update"
  ],
  session: ["list", "revoke", "delete"]
};
const defaultAc = createAccessControl(defaultStatements);
const adminAc = defaultAc.newRole({
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "get",
    "update"
  ],
  session: ["list", "revoke", "delete"]
});
const userAc = defaultAc.newRole({
  user: [],
  session: []
});
const defaultRoles = {
  admin: adminAc,
  user: userAc
};

export { defaultAc as a, adminAc as b, defaultRoles as c, defaultStatements as d, userAc as u };
