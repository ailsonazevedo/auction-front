const currencyMask = (value: string): string => {
  value = value.replace(/[^\d.]/g, "");

  const numberValue = parseFloat(value);

  if (isNaN(numberValue)) {
    return "0,00";
  }

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(numberValue);

  return formattedValue;
};

export { currencyMask };
