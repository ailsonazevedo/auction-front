import type { Metadata } from "next";

import { PortfoliosWrappers } from "@/components/portfolios/Wrappers/PortfoliosWrappers";
import { ADMIN_PERMISSIONS } from "@/constants/permissions";
import { hasAuth } from "@/utils/auth/auth";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Gerenciar Carteiras - Auction",
};

const Page = async () => {
  await hasAuth([{ name: ADMIN_PERMISSIONS.CREATE_PORTFOLIO }]);
  return (
    <Suspense
      fallback={<Skeleton height="200px" variant="rounded" width="100%" />}
    >
      <PortfoliosWrappers />
    </Suspense>
  );
};

export default Page;
