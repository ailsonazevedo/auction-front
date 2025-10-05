import { SubmitButtons } from "@/components/@shared/Button/SubmitButton";
import { CustomTextField } from "@/components/@shared/CustomTextField/CustomTextField";
import { bidSchema } from "@/components/bid/Forms/_yup/bidSchema";
import { useCreateBid } from "@/hooks/bids/useCreate/useCreateBid";
import { moneyMask } from "@/utils/functions/@shared/masks/moneyMask";
import { realUnmask } from "@/utils/functions/@shared/masks/realMask";
import { Alert, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

interface Props {
  auctionId: string;
  increment?: number;
  onClose: () => void;
}

const BidForm = ({ auctionId, increment, onClose }: Props) => {
  const { mutateAsync: createBid } = useCreateBid();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      auction_id: auctionId,
      bid_amount: increment ? moneyMask(String(increment)) : "",
    },
    onSubmit: async (values) => {
      await createBid({
        ...values,
        bid_amount: Number(realUnmask(values.bid_amount)),
      });
      onClose();
    },
    validationSchema: bidSchema(increment),
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Alert severity="warning" sx={{ m: 1 }}>
        <Typography>
          Por padrão, o incremento será de pelo menos 20% a mais que o valor do
          lance atual.
        </Typography>
      </Alert>
      <Stack margin={2} spacing={2}>
        <CustomTextField
          formikAndName={{ formik, name: "bid_amount" }}
          label={"Valor do Lance"}
          mask={moneyMask}
          placeholder="Ex: R$ 1.000,00"
        />

        <SubmitButtons
          formik={formik}
          handleCancelClick={() => onClose()}
          type="modal"
        />
      </Stack>
    </form>
  );
};

export { BidForm };
