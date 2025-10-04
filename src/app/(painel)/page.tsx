import type { Metadata } from "next";

import { WrapperListAuctions } from "@/components/auction/Wrappers/WrapperListAuctions";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Leilões ao vivo - Auction",
};

function Page() {
  return (
    <Suspense
      fallback={<Skeleton height="200px" variant="rounded" width="100%" />}
    >
      <WrapperListAuctions />
    </Suspense>
  );
}

export default Page;
