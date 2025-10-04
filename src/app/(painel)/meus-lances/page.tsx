import type { Metadata } from "next";

import { USER_PERMISSIONS } from "@/constants/permissions";
import { hasAuth } from "@/utils/auth/auth";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Meus lances - Auction",
};

const Page = async () => {
  await hasAuth([{ name: USER_PERMISSIONS.VIEW_OWN_BID_HISTORY }]);

  return (
    <Suspense
      fallback={<Skeleton height="200px" variant="rounded" width="100%" />}
    >
      <h1>Meus lances</h1>
    </Suspense>
  );
};

export default Page;
