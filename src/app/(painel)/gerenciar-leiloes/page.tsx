import { ManageAuctionsWrapper } from "@/components/auction/Wrappers/ManageAuctionsWrapper";
import { ADMIN_PERMISSIONS } from "@/constants/permissions";
import { hasAuth } from "@/utils/auth/auth";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

export const metadata = {
  title: "Gerenciar leilões - Auction",
};

const Page = async () => {
  await hasAuth([{ name: ADMIN_PERMISSIONS.CREATE_AUCTION }]);
  return (
    <Suspense
      fallback={<Skeleton height="200px" variant="rounded" width="100%" />}
    >
      <ManageAuctionsWrapper />
    </Suspense>
  );
};

export default Page;
