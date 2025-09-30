"use client";

import { Pagination, PaginationItem, PaginationProps } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

interface Props extends Omit<PaginationProps, "count"> {
  countPages: number;
  route: string;
}

const CustomPagination = ({ countPages, route }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    if (value === 1) {
      params.delete("page");
    } else {
      params.set("page", value.toString());
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      count={countPages}
      onChange={handleChange}
      page={page}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`${route}${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
};

export { CustomPagination };
