const hasPermissionFn = (input, acRoles) => {
  if (!input.permissions && !input.permission) return false;
  const roles = input.role.split(",");
  const creatorRole = input.options.creatorRole || "owner";
  const isCreator = roles.includes(creatorRole);
  const allowCreatorsAllPermissions = input.allowCreatorAllPermissions || false;
  if (isCreator && allowCreatorsAllPermissions) return true;
  for (const role of roles) {
    const _role = acRoles[role];
    const result = _role?.authorize(input.permissions ?? input.permission);
    if (result?.success) {
      return true;
    }
  }
  return false;
};
let cacheAllRoles = /* @__PURE__ */ new Map();

export { cacheAllRoles as c, hasPermissionFn as h };
