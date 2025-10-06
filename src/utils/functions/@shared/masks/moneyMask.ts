const moneyMask = (value: string) => {
  if (!value || value === "0") return "0,00";
  value = value
    .replace(/\D/g, "")
    .replace(/(\d)(\d{2})$/, "$1,$2")
    .replace(/(?=(\d{3})+(\D))\B/g, ".");
  if (!value.startsWith("R$")) {
    value = `R$ ${value}`;
  }
  return value;
};

const moneyMaskFromNumber = (value: number) => {
  if (typeof value !== "number" || isNaN(value)) return "R$ 0,00";
  return `R$ ${value
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export { moneyMask, moneyMaskFromNumber };
