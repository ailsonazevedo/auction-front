import { Skeleton } from "@mui/material";

import { AlertErrorWithReload } from "../AlertErrorWithReload/AlertErrorWithRealod";
import { Breadcrumb } from "./BreadCrumb";

interface BCrumbItemProps {
  title: string;
  to?: string;
}

interface Props<T> {
  data: T;
  invalidateQuery: string[];
  isError: boolean;
  isLoading: boolean;
  items: BCrumbItemProps[];
  propsStylesBreadcrumb?: {};
  subtitle?: string;
  title: string;
}
const DynamicBreadCrumb = <T,>({
  data,
  invalidateQuery,
  isError,
  isLoading,
  items,
  propsStylesBreadcrumb,
  subtitle,
  title,
}: Props<T>) => {
  if (isLoading) {
    return <Skeleton height={110} sx={{ mt: 2 }} variant="rectangular" />;
  }
  if (isError) {
    return <AlertErrorWithReload invalidateQuery={invalidateQuery} />;
  }
  if (!isLoading && data) {
    return (
      <Breadcrumb
        items={items}
        propsStyles={propsStylesBreadcrumb}
        subtitle={subtitle ?? ""}
        title={title}
      />
    );
  }
};

export { DynamicBreadCrumb };
