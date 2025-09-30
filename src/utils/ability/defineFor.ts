import { TPolicies } from "@/@types/auth/IPolicies";
import { AbilityBuilder, PureAbility, createMongoAbility } from "@casl/ability";

/**
 * Recebe um array de políticas, se for false retorna um ability vazio.
 * se for true, percorre o array de cada política, separa a política e
 * de acordo com o efeito, e o tipo de ação, define se o usuário pode ou não pode
 * fazer a ação. Se o efeito for Deny, o usuário não pode fazer a ação, caso contrário,
 * o usuário pode fazer a ação.
 * @param policies Array de políticas
 * @returns Retorna um Ability com as regras definidas.
 */

export const defineRulesFor = (policies: TPolicies[]) => {
  if (!Array.isArray(policies) || policies.length === 0) {
    return new PureAbility();
  }
  const { can, cannot, rules } = new AbilityBuilder(createMongoAbility);

  policies.forEach((policie: TPolicies) => {
    const { actions, effect, resources } = policie;
    if (actions.includes("*") && resources.includes("*")) {
      can("manage", "all");
    } else {
      actions.forEach((action: string) => {
        const [subject, actionType] = action.split(":");
        if (effect === "Allow") {
          can(actionType, subject);
        } else {
          cannot(actionType, subject);
        }
      });
    }
  });

  return new PureAbility<any>(rules);
};
