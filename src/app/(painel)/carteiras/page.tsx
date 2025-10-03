import { PortfoliosWrappers } from "@/components/portfolios/Wrappers/PortfoliosWrappers";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

const Page = async () => {
  // await hasAuth(["create_portfolio"]);
  return (
    <Suspense
      fallback={<Skeleton height="200px" variant="rounded" width="100%" />}
    >
      <PortfoliosWrappers />
    </Suspense>
  );
};

export default Page;
