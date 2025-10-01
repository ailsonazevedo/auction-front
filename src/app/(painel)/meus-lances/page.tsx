import { defineRulesFor } from "@/utils/ability/defineFor";
import { getPermissions } from "@/utils/auth/auth";

const Page = async () => {
  const permissions = await getPermissions();
  const ability = defineRulesFor(permissions ?? []);

  return (
    <div>
      <h1>Meus lances</h1>
      {ability.can("view_own_bid_history", "all") ? (
        <p>Você tem permissão para ver esta seção.</p>
      ) : (
        <p>Você não tem permissão para ver esta seção.</p>
      )}
    </div>
  );
};

export default Page;
