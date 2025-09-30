import { ErrorSimpleText } from "@/components/@shared/ErrorMessages/ErrorSimpleText";
import SimpleTextArea from "@/components/@shared/TextArea/SimpleTextArea";
import { UseGetOne } from "@/hooks/admin/log/terminal/useGet/useGetOne";
import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

const styleOfMethods = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
};
const styleLabelMethods = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
const styleBoldInMethods = { fontWeight: "bold" };

export const ListInfoDetailsLogs = () => {
  const { data = {}, isError, isLoading } = UseGetOne();
  const skeletonTextForDetailsLogs = () => {
    let arrayOfSkeleton = [];
    for (let i = 0; i < 10; i++) {
      arrayOfSkeleton.push(
        <Skeleton height="5%" key={i} variant="text" width="100%" />,
      );
    }
    return arrayOfSkeleton;
  };
  //TODO testar depois com jest

  return (
    <>
      {isError && <ErrorSimpleText />}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            padding: "10px",
            width: "100%",
          }}
        >
          {skeletonTextForDetailsLogs()}
        </Box>
      ) : (
        <div>
          <Box sx={{ ...styleOfMethods, width: "100%" }}>
            <SimpleTextArea disabled={true} value={data?.endpoint || ""} />
          </Box>
          <Box sx={styleOfMethods}>
            <Typography sx={styleBoldInMethods}>Metodo: </Typography>
            <Typography sx={styleLabelMethods}>
              {data?.method || ""}{" "}
            </Typography>
          </Box>
          <Box sx={styleOfMethods}>
            <Typography sx={styleBoldInMethods}>Status code: </Typography>
            <Typography sx={styleLabelMethods}>
              {data?.statusCode || ""}{" "}
            </Typography>
          </Box>
          <Box sx={styleOfMethods}>
            <Typography sx={styleBoldInMethods}>RequestPath: </Typography>
            <Typography sx={styleLabelMethods}>{data?.requestPath} </Typography>
          </Box>
          <Box sx={styleOfMethods}>
            <Typography sx={styleBoldInMethods}>RequestUserAgent: </Typography>
            <Typography sx={styleLabelMethods}>
              {data?.requestUserAgent}{" "}
            </Typography>
          </Box>
          <Box sx={styleOfMethods}>
            <Typography sx={styleBoldInMethods}>Level: </Typography>
            <Typography sx={styleLabelMethods}>{data?.level} </Typography>
          </Box>
          <Box sx={styleOfMethods}>
            <Typography sx={styleBoldInMethods}>Environment: </Typography>
            <Typography sx={styleLabelMethods}>
              {data.environment || ""}{" "}
            </Typography>
          </Box>
          <Box sx={styleOfMethods}>
            <Typography sx={styleBoldInMethods}>Type: </Typography>
            <Typography sx={styleLabelMethods}>{data.type || ""} </Typography>
          </Box>
          <Box sx={styleOfMethods}>
            <Typography sx={styleBoldInMethods}>Função: </Typography>
            <Typography sx={styleLabelMethods}>
              {data.function || ""}{" "}
            </Typography>
          </Box>
          <Box sx={styleOfMethods}>
            <Typography sx={styleBoldInMethods}>Localização: </Typography>
            <Typography sx={styleLabelMethods}>
              {data.location || ""}{" "}
            </Typography>
          </Box>
        </div>
      )}
    </>
  );
};
