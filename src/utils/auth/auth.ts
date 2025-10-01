import { API_URL_BASE } from "@/constants/services";
import { AnyAbility } from "@casl/ability";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

import { defineRulesFor } from "../ability/defineFor";

const getPermissions = async () => {
  const token = await cookies().get("access_token");
  const accessToken = token?.value ?? "";
  try {
    const response = await fetch(`${API_URL_BASE}/profiles/permissions`, {
      headers: {
        Authorization: `Bearer ${accessToken ?? ""}`,
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 120,
      },
    });
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data.permissions ?? [];
  } catch (err) {
    return null;
  }
};

const checkPermissions = (perms: string[], ability: AnyAbility) => {
  return perms.some((perm) => ability.can(perm, "all"));
};
const hasAuth = async (perms: string[]) => {
  const permissions = await getPermissions();
  if (permissions === null) return null;

  const ability = defineRulesFor(permissions);
  const result = checkPermissions(perms, ability);
  checkIsAuthorized(result);
};

const checkIsAuthorized = (isAuthorized: boolean | null): void => {
  if (isAuthorized) return;
  if (isAuthorized === false) redirect("/nao-autorizado");
  if (isAuthorized === null) redirect("/api/auth/logout");
};
export { checkIsAuthorized, checkPermissions, getPermissions, hasAuth };
