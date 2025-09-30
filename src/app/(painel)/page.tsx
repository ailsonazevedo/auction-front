import { Skeleton } from "@mui/material";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense
      fallback={<Skeleton height="200px" variant="rounded" width="100%" />}
    >
      <h1>Tela inicial</h1>
    </Suspense>
  );
}

export default Page;
