import { AlertErrorWithReload } from "@/components/@shared/AlertErrorWithReload/AlertErrorWithReload";
import { SubmitButtons } from "@/components/@shared/Button/SubmitButton";
import { CustomDataTimePickerInput } from "@/components/@shared/CustomDataTimePickerInput/CustomDataTimePickerInput";
import { CustomTextField } from "@/components/@shared/CustomTextField/CustomTextField";
import LoadingSkeleton from "@/components/@shared/LoadingSkeleton/LoadingSkeleton";
import { portfolioSchema } from "@/components/portfolios/Forms/_yup/portfolioSchema";
import { useCreatePortfolio } from "@/hooks/portfolios/useCreate/useCreatePortfolio";
import { useGetOnePortfolio } from "@/hooks/portfolios/useGet/useGetOnePortfolio";
import useUpdatePortfolio from "@/hooks/portfolios/useUpdate/useUpdatePortfolio";
import { moneyMask } from "@/utils/functions/@shared/masks/moneyMask";
import { realUnmask } from "@/utils/functions/@shared/masks/realMask";
import { Box, Stack } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";

interface Props {
  onClose: () => void;
  portfolioId?: string;
}

const PortfolioForm = ({ onClose, portfolioId }: Props) => {
  const { mutateAsync: createPortfolio } = useCreatePortfolio(["portfolios"]);
  const { mutateAsync: updatePortfolio } = useUpdatePortfolio(["portfolios"]);
  const {
    data: portfolioData,
    isError: isErrorPortfolio,
    isLoading: isLoadingPortfolio,
  } = useGetOnePortfolio(portfolioId ?? "");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      auction_end: "",
      description: "",
      minimum_bid: "",
      name: "",
      total_amount: "",
    },
    onSubmit: async (values) => {
      if (portfolioId) {
        await updatePortfolio({
          data: {
            ...values,
            minimum_bid: Number(realUnmask(values.minimum_bid)),
            total_amount: Number(realUnmask(values.total_amount)),
          },
          id: portfolioId,
        });
      } else {
        await createPortfolio({
          ...values,
          minimum_bid: Number(realUnmask(values.minimum_bid)),
          total_amount: Number(realUnmask(values.total_amount)),
        });
      }
      onClose();
    },
    validationSchema: portfolioSchema,
  });

  useEffect(() => {
    if (portfolioData) {
      formik.setValues({
        auction_end: portfolioData.auction_end,
        description: portfolioData.description,
        minimum_bid: moneyMask(
          String(portfolioData.minimum_bid.toFixed(2).replace(".", ",")),
        ),
        name: portfolioData.name,
        total_amount: moneyMask(
          String(portfolioData.total_amount.toFixed(2).replace(".", ",")),
        ),
      });
    }
  }, [portfolioData]);

  if (isLoadingPortfolio) {
    return <LoadingSkeleton />;
  }
  if (portfolioId && isErrorPortfolio) {
    return (
      <Box>
        <AlertErrorWithReload invalidateQuery={["portfolio", portfolioId]} />
      </Box>
    );
  }
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Stack margin={2} spacing={2}>
        <CustomTextField
          enableUpperCase={true}
          formikAndName={{ formik, name: "name" }}
          label="Nome"
        />
        <CustomTextField
          formikAndName={{ formik, name: "description" }}
          label="Descrição"
          multiline
        />

        <Stack direction="row" spacing={2}>
          <CustomTextField
            formikAndName={{ formik, name: "minimum_bid" }}
            label="Lance Mínimo"
            mask={moneyMask}
            placeholder="Ex: R$ 1.000,00"
          />
          <CustomTextField
            formikAndName={{ formik, name: "total_amount" }}
            label="Valor Total"
            mask={moneyMask}
            placeholder="Ex: R$ 1.000,00"
          />
        </Stack>
        <CustomDataTimePickerInput
          formikAndName={{ formik, name: "auction_end" }}
          label="Data de Término do Leilão"
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

export { PortfolioForm };
