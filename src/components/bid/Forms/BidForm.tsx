import { SubmitButtons } from "@/components/@shared/Button/SubmitButton";
import { CustomTextField } from "@/components/@shared/CustomTextField/CustomTextField";
import { useCreateBid } from "@/hooks/bids/useCreate/useCreateBid";
import { moneyMask } from "@/utils/functions/@shared/masks/moneyMask";
import { realUnmask } from "@/utils/functions/@shared/masks/realMask";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

interface Props {
  auctionId: string;
  onClose: () => void;
}

const BidForm = ({ auctionId, onClose }: Props) => {
  const { mutateAsync: createBid } = useCreateBid();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      auction_id: auctionId,
      bid_amount: "",
    },
    onSubmit: async (values) => {
      await createBid({
        ...values,
        bid_amount: Number(realUnmask(values.bid_amount)),
      });
      onClose();
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
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
