import { Skeleton, Stack } from "@mui/material";

interface Props {
  height?: number | string;
  padding?: number | string;
  width?: number | string;
}

const SimpleLoadingSkeleton = ({ height, padding, width }: Props) => {
  return (
    <Stack justifyContent={"center"} sx={{ padding: padding ?? "20px" }}>
      <Stack width={"100%"}>
        <Skeleton height={height ?? "100%"} width={width ?? "100%"} />
      </Stack>
    </Stack>
  );
};

export default SimpleLoadingSkeleton;
