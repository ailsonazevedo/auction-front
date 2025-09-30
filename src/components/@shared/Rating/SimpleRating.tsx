"use client";
import {
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
  Star as StarIcon,
} from "@mui/icons-material";
import { Box, FormHelperText, Rating, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormikErrors } from "formik";
import * as React from "react";

const labels: { [index: string]: string } = {
  1: "Muito ruim",
  2: "ruim",
  3: "Ok",
  4: "Bom",
  5: "excelente",
};

const RadioRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));
const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfied color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfied color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfied color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAlt color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfied color="success" />,
    label: "Very Satisfied",
  },
};

interface Props {
  FormikErrorMsg:
    | FormikErrors<any>
    | FormikErrors<any>[]
    | string
    | string[]
    | undefined;
  colors?: { empty: string; filled: string };
  disabled?: boolean;
  emptyIcon?: JSX.Element | null;
  handleRating: (newValue: null | number) => void;
  icon?: React.ReactNode | null;
  isActiveLabel?: boolean;
  max?: number;
  size?: "large" | "medium" | "small";
  value: null | number;
}
const SimpleRating = ({
  FormikErrorMsg,
  colors,
  disabled = false,
  emptyIcon = <StarIcon fontSize="inherit" style={{ opacity: 0.55 }} />,
  handleRating,
  icon,
  isActiveLabel = false,
  max = 5,
  size = "medium",
  value = null,
}: Props) => {
  const [hover, setHover] = React.useState(-1);
  const errorMsg = typeof FormikErrorMsg === "string" ? FormikErrorMsg : "";
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: colors?.filled,
    },
    "& .MuiRating-iconHover": {
      color: colors?.empty,
    },
  });
  return (
    <Stack direction="column">
      <Stack alignItems={"center"} direction="row" spacing={2}>
        <StyledRating
          disabled={disabled}
          emptyIcon={emptyIcon}
          icon={icon}
          max={max}
          name="rating-simple"
          onChange={(e, newValue) => handleRating(newValue)}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          size={size}
          value={value}
        />
        {value !== null && isActiveLabel && (
          <Box>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Stack>
      <FormHelperText error>{errorMsg}</FormHelperText>
    </Stack>
  );
};

export { SimpleRating };
