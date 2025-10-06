import { Box } from "@mui/material";
import { ptBR } from "date-fns/locale";
import { DateRange, PickerBase } from "mui-daterange-picker-plus";
import { useEffect, useRef } from "react";

interface CustomDataRangePickerProps {
  footerRequired?: boolean;
  initialDateRange?: DateRange;
  onChange?: (range: DateRange) => void;
}

const CustomDataRangePicker = ({
  footerRequired = true,
  initialDateRange,
  onChange,
}: CustomDataRangePickerProps) => {
  const dataRangePickerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dataRangePickerContainerRef.current) {
      const dataRangePickerPreDefinedRangesEl =
        dataRangePickerContainerRef.current.firstChild?.firstChild
          ?.childNodes[1]?.firstChild;

      dataRangePickerPreDefinedRangesEl?.childNodes.forEach((li, key) => {
        let spanEl = (li as HTMLDataListElement).querySelector("span");
        if (spanEl) {
          spanEl.setAttribute(
            "style",
            "font-family: '__Plus_Jakarta_Sans_a182b8', '__Plus_Jakarta_Sans_Fallback_a182b8', Helvetica, Arial, sans-serif;",
          );
          switch (spanEl.innerHTML) {
            case "Today": {
              spanEl.innerHTML = "Hoje";
              break;
            }
            case "Yesterday": {
              spanEl.innerHTML = "Ontem";
              break;
            }
            case "This Week": {
              spanEl.innerHTML = "Essa Semana";
              break;
            }
            case "Last Week": {
              spanEl.innerHTML = "Última Semana";
              break;
            }
            case "Last 7 Days": {
              spanEl.innerHTML = "Últimos 7 Dias";
              break;
            }
            case "This Month": {
              spanEl.innerHTML = "Esse Mês";
              break;
            }
            case "Last Month": {
              spanEl.innerHTML = "Último Mês";
              break;
            }
            case "This Year": {
              spanEl.innerHTML = "Esse Ano";
              break;
            }
            case "Last Year": {
              spanEl.innerHTML = "Último Ano";
              break;
            }
          }
        }
      });
    }
  }, [dataRangePickerContainerRef.current]);

  return (
    <Box ref={dataRangePickerContainerRef}>
      <PickerBase
        // @ts-ignore
        initialDateRange={initialDateRange}
        labels={{
          actions: {
            apply: "Aplicar",
            cancel: "Cancelar",
          },
          footer: {
            endDate: "Fim",
            startDate: "Início",
          },
          predefinedRanges: "Intervalos predefinidos",
        }}
        locale={ptBR}
        onChange={onChange}
      />
    </Box>
  );
};

export { CustomDataRangePicker };
