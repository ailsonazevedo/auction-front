import { IPermission } from "@/@types/auth/IPermission";
import { API_URL_BASE } from "@/constants/services";
import { defineRulesFor } from "@/utils/ability/defineFor";
import { AnyAbility } from "@casl/ability";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

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
    return data ?? [];
  } catch (err) {
    return null;
  }
};

const checkPermissions = (perms: IPermission[], ability: AnyAbility) => {
  return perms.some((perm) => ability.can(perm.name, "all"));
};
const hasAuth = async (perms: IPermission[]) => {
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
