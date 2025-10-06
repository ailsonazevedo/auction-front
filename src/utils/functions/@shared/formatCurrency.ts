const formatCurrency = (value: string): number => {
  return parseFloat(
    value
      .replace(/\s*R\$\s*/, "") // Remover símbolo de moeda
      .replace(/\./g, "") // Remover separadores de milhar
      .replace(",", "."), // Substituir vírgula decimal por ponto
  );
};

export { formatCurrency };
