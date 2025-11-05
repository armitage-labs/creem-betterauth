'use strict';

const access = require('./better-auth.HiXxvark.cjs');

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
const defaultAc = access.createAccessControl(defaultStatements);
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

exports.adminAc = adminAc;
exports.defaultAc = defaultAc;
exports.defaultRoles = defaultRoles;
exports.defaultStatements = defaultStatements;
exports.userAc = userAc;
