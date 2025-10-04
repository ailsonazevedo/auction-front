import { IPermission } from "@/@types/auth/IPermission";
import { AbilityBuilder, PureAbility, createMongoAbility } from "@casl/ability";

export const defineRulesFor = (permissions: IPermission[]) => {
  if (!Array.isArray(permissions) || permissions.length === 0) {
    return new PureAbility();
  }

  const { can, rules } = new AbilityBuilder(createMongoAbility);

  permissions.forEach((permission) => {
    if (permission) {
      if (permission.name === "manage") {
        can("manage", "all");
        return;
      }
      can(permission.name, "all");
    }
  });

  return new PureAbility<any>(rules);
};
