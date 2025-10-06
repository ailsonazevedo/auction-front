import { moneyMask } from "@/utils/functions/@shared/masks/moneyMask";
import { realUnmask } from "@/utils/functions/@shared/masks/realMask";
import * as yup from "yup";

const bidSchema = (minValue?: number) =>
  yup.object({
    bid_amount: yup
      .string()
      .trim()
      .required("Campo obrigatório")
      .test(
        "min-value",
        () =>
          minValue != null
            ? `O valor não pode ser menor que ${moneyMask(String(minValue))}`
            : "Campo obrigatório",
        function (value) {
          if (minValue == null) return true;
          if (!value) return false;
          const current = Number(realUnmask(value));
          return current >= minValue;
        },
      ),
  });

export { bidSchema };
