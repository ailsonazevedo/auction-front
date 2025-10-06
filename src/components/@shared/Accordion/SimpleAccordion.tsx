import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";

interface Props {
  accordionProps?: Partial<AccordionProps>;
  children: ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
  title: string;
}

const SimpleAccordion = ({
  accordionProps,
  children,
  defaultExpanded = false,
  disabled = false,
  title,
}: Props) => {
  return (
    <Accordion
      disabled={disabled}
      {...accordionProps}
      defaultExpanded={defaultExpanded}
    >
      <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export { SimpleAccordion };
