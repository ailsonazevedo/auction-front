import type { Metadata } from "next";

import { WrapperBidsHistory } from "@/components/bid/Wrappers/WrapperBidsHistory";
import { USER_PERMISSIONS } from "@/constants/permissions";
import { hasAuth } from "@/utils/auth/auth";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Lances - Auction",
};

const Page = async () => {
  await hasAuth([{ name: USER_PERMISSIONS.VIEW_OWN_BID_HISTORY }]);

  return (
    <Suspense
      fallback={<Skeleton height="200px" variant="rounded" width="100%" />}
    >
      <WrapperBidsHistory />
    </Suspense>
  );
};

export default Page;
