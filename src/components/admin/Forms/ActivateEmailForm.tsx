"use client";
import { ICreateUser } from "@/@types/user/IUser";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";

const ActivateEmailForm = () => {
  const formik = useFormik<Partial<ICreateUser>>({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: async (values) => {},
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Stack alignItems={"center"} direction={"row"} margin={2} spacing={2}>
        <FormGroup row>
          <FormControlLabel control={<Checkbox />} label="Stmp" />
          <FormControlLabel control={<Checkbox />} label="Sendpulse" />
        </FormGroup>
        <Box>
          <Button variant="contained">Salvar</Button>
        </Box>
      </Stack>
    </form>
  );
};

export { ActivateEmailForm };
