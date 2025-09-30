const formatCurrency = (value: string): number => {
  return parseFloat(
    value
      .replace(/\s*R\$\s*/, "") // Remover símbolo de moeda
      .replace(/\./g, "") // Remover separadores de milhar
      .replace(",", "."), // Substituir vírgula decimal por ponto
  );
};

const formatCurrencyIntl = (valor: number) => {
  if (!valor) {
    return "R$ 0,00";
  }
  if (valor === 0) {
    return "---";
  }
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(valor);
};

export { formatCurrency, formatCurrencyIntl };
