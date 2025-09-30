import { TableLog } from "@/components/admin/Tables/TableLog";
import React, { Suspense } from "react";

const Page = async () => {
  return (
    <Suspense>
      <TableLog />
    </Suspense>
  );
};

export default Page;
