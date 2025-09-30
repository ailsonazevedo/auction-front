import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { Formik, FormikProps } from "formik";
import React from "react";
import { CustomAutocomplete } from "../CustomAutocomplete";

const queryClient = new QueryClient();

let formik: FormikProps<any>;
beforeAll(() => {
  formik = {
    dirty: false,
    errors: {},
    getFieldHelpers: jest.fn(),
    getFieldMeta: jest.fn(),
    getFieldProps: jest.fn(),
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleReset: jest.fn(),
    handleSubmit: jest.fn(),
    initialErrors: {},
    initialStatus: "",
    initialTouched: {},
    initialValues: {},
    isSubmitting: false,
    isValid: false,
    isValidating: false,
    registerField: jest.fn(),
    resetForm: jest.fn(),
    setErrors: jest.fn(),
    setFieldError: jest.fn(),
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn(),
    setFormikState: jest.fn(),
    setStatus: jest.fn(),
    setSubmitting: jest.fn(),
    setTouched: jest.fn(),
    setValues: jest.fn(),
    status: "",
    submitCount: 0,
    submitForm: jest.fn(),
    touched: {},
    unregisterField: jest.fn(),
    validateField: jest.fn(),
    validateForm: jest.fn(),
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    values: {},
  };
});

describe("CustomAutocomplete", () => {
  const mockData = [
    { id: "1", name: "Opção 1" },
    { id: "2", name: "Opção 2" },
  ];

  const renderComponent = (props = {}) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <Formik initialValues={{ fieldName: "" }} onSubmit={jest.fn()}>
          {() => (
            <CustomAutocomplete
              data={mockData}
              formikAndName={{ formik: formik, name: "fieldName" }}
              invalidateQuery={[]}
              label="Test Autocomplete"
              labelProp="name"
              statusData={{ isError: false, isLoading: false }}
              testId="autocomplete"
              {...props}
            />
          )}
        </Formik>
      </QueryClientProvider>,
    );
  };

  it("deve renderizar corretamente", () => {
    renderComponent();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByLabelText("Test Autocomplete")).toBeInTheDocument();
  });

  it("deve exibir o indicador de carregamento quando isLoading for verdadeiro", () => {
    renderComponent({
      statusData: { isError: false, isLoading: true },
    });
    expect(screen.getByLabelText("Buscando...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("deve exibir mensagem de erro quando isError for verdadeiro", () => {
    renderComponent({
      statusData: { isError: true },
    });
    const input = screen.getByRole("combobox");
    expect(input).toBeDisabled();
  });

  it("deve desabilitar o campo quando estiver carregando", () => {
    renderComponent({
      statusData: { isLoading: true },
    });

    const input = screen.getByRole("combobox");
    expect(input).toBeDisabled();
  });
});
