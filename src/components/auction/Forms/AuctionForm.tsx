import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithReload";
import { SubmitButtons } from "@/components/@shared/Button/SubmitButton";
import { CustomAutocomplete } from "@/components/@shared/CustomAutocomplete/CustomAutocomplete";
import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import { useCreateAuction } from "@/hooks/auctions/useCreate/useCreateAuction";
import { useGetOneAuction } from "@/hooks/auctions/useGet/useGetOneAuction";
import useUpdateAuction from "@/hooks/auctions/useUpdate/useUpdateAuction";
import { useGetAllPortfolios } from "@/hooks/portfolios/useGet/useGetAllPortfolios";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";

interface Props {
  auctionId?: string;
  onClose: () => void;
}

const AuctionForm = ({ auctionId, onClose }: Props) => {
  const { mutateAsync: createAuction } = useCreateAuction();
  const { mutateAsync: updateAuction } = useUpdateAuction();

  const {
    data: auctionData,
    isError: isErrorAuction,
    isLoading: isLoadingAuction,
  } = useGetOneAuction(auctionId ?? "");

  const {
    data: portfoliosResp,
    isError: isErrorPortfolios,
    isLoading: isLoadingPortfolios,
  } = useGetAllPortfolios({ page: 1, page_size: 999 });

  const statusOptions = [
    { label: "Aberto", value: "open" },
    { label: "Encerrado", value: "finished" },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      portfolio_id: "",
      status: "open",
    },
    onSubmit: async (values) => {
      if (auctionId) {
        await updateAuction({ data: values, id: auctionId });
      } else {
        await createAuction(values);
      }
      onClose();
    },
  });

  useEffect(() => {
    if (auctionData) {
      formik.setValues({
        portfolio_id: auctionData.portfolio.id,
        status: auctionData.status,
      });
    }
  }, [auctionData]);

  if (isLoadingAuction) {
    return <LoadingSkeleton />;
  }
  if (isErrorAuction) {
    return (
      <Box>
        <AlertErrorWithReload invalidateQuery={["auctions"]} />
      </Box>
    );
  }

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Stack margin={2} spacing={2}>
        <CustomAutocomplete
          data={portfoliosResp?.items ?? []}
          formikAndName={{ formik, name: "portfolio_id" }}
          invalidateQuery={["portfolios"]}
          label="Carteira"
          labelProp="name"
          statusData={{
            isError: isErrorPortfolios,
            isLoading: isLoadingPortfolios,
          }}
        />

        <TextField
          label="Status"
          name="status"
          onBlur={formik.handleBlur}
          onChange={(e) => {
            formik.setFieldValue("status", e.target.value);
          }}
          select
          size="small"
          value={formik.values.status}
        >
          {statusOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        <SubmitButtons
          formik={formik}
          handleCancelClick={() => onClose()}
          type="modal"
        />
      </Stack>
    </form>
  );
};

export { AuctionForm };
