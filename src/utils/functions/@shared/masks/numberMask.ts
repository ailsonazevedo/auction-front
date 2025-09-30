const numberMask = (value: string): string => {
  // Remove todos os caracteres que não são dígitos
  return value.replace(/\D/g, "");
};
export { numberMask };
