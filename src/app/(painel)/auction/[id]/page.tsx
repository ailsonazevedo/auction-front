import type { Metadata } from "next";

import { WrapperAuction } from "@/components/auction/Wrappers/WrapperAuction";
import { USER_PERMISSIONS } from "@/constants/permissions";
import { hasAuth } from "@/utils/auth/auth";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

interface Props {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Leilão ao vivo",
};

const Page = async ({ params }: Props) => {
  await hasAuth([{ name: USER_PERMISSIONS.PLACE_BID }]);
  return (
    <Suspense
      fallback={<Skeleton height="200px" variant="rounded" width="100%" />}
    >
      <WrapperAuction auctionId={params.id} />
    </Suspense>
  );
};

export default Page;
