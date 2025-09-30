import { API_RESOURCE_AUTH, API_URL_BASE } from "@/constants/services";
import { AnyAbility } from "@casl/ability";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

import { defineRulesFor } from "../ability/defineFor";

/**
 * Faz uma requisição para buscar as políticas do usuário atual.
 * @returns um array de políticas do usuário atual ou null caso tenha dado erro
 */

const getPolicies = async () => {
  const token = await cookies().get("access_token");
  const accessToken = token?.value ?? "";
  try {
    const response = await fetch(
      `${API_URL_BASE}${API_RESOURCE_AUTH}/iam/policies/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken ?? ""}`,
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 120,
        },
      },
    );
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (err) {
    return null;
  }
};

/**
 * Percorre um array de permissões, e se caso for true em alguma, interrompe for.
 * @param perms array de permissões
 * @param subject o assunto a ser verificado. Ex: user, group, unit, organization, policy
 * @param ability o objeto de capacidade do casl
 * @returns true se o usuário tem a permissão, false caso contrário.
 */
const checkPermissions = (
  perms: string[],
  subject: string,
  ability: AnyAbility,
) => {
  return perms.some((perm) => ability.can(perm, subject));
};
/**
 * faz requisição para buscar as políticas do usuário atual, e verifica se o usuário tem a permissão.
 * utilizando defineRulesFor e checkPermissions.
 * @param perms array de permissões
 * @param subject o assunto a ser verificado. Ex: user, group, unit, organization, policy
 * @returns true se o usuário tem a permissão, false caso contrário.
 */
const hasAuth = async (perms: string[], subject: string) => {
  const policies = await getPolicies();
  if (policies === null) return null;

  const ability = defineRulesFor(policies);
  const result = checkPermissions(perms, subject, ability);
  checkIsAuthorized(result);
};

/**
 * Function to check user authorization and handle redirection based on the status.
 *
 * @param {boolean | null} isAuthorized - The authorization status of the user.
 *    If the value is `false`, the user will be redirected to the not authorized page.
 *    If the value is `null`, the user will be logged out by redirecting to the logout API.
 *    If the value is `true`, the function returns without any action.
 *
 * @returns {void}
 */
const checkIsAuthorized = (isAuthorized: boolean | null): void => {
  if (isAuthorized) return;
  if (isAuthorized === false) redirect("/nao-autorizado");
  if (isAuthorized === null) redirect("/api/auth/logout");
};
export { checkIsAuthorized, checkPermissions, getPolicies, hasAuth };
