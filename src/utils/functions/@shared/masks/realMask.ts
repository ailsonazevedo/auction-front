const realMask = (value: string): string => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^0+/, "");

  if (value === "") {
    return "R$ 0,00";
  }

  if (value.length <= 2) {
    return `R$ 0,${value.padStart(2, "0")}`;
  } else {
    value = value.replace(/(\d{2})$/, ",$1");
  }

  value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  if (!value.startsWith("R$")) {
    value = `R$ ${value}`;
  }

  return value;
};

const realUnmask = (value: string): string => {
  value = value.replace(/[^\d,-]/g, "");
  value = value.replace(",", ".");
  value = value.replace(/^0+(?=\d)/, "");

  return value;
};

const realStringMask = (value: string): string => {
  // Deve receber no formato R$ X.XXX,XX

  value = value.replace(/[^\d.,]/g, ""); // Resultado: "X.XXX,XX"

  let [inteiro, decimal = ""] = value.split(","); // Resultado: "X.XXX], [XX"

  if (decimal.length === 1) {
    const parteInicial = inteiro.slice(0, -1);
    const parteFinal = inteiro.slice(-1);

    inteiro = parteInicial;
    decimal = parteFinal + decimal;
  } else if (decimal.length > 2) {
    const parteInicial = decimal.slice(0, -2);
    const parteFinal = decimal.slice(-2);

    inteiro = inteiro + parteInicial;
    decimal = parteFinal;
  }

  inteiro = inteiro.replace(".", "");
  inteiro = inteiro.replace(/^0+/, "");
  if (inteiro === "") inteiro = "0";

  return `R$ ${inteiro},${decimal}`;
};

const realStringUnmask = (value: string): string => {
  // Deve receber no formato R$ X.XXX,XX

  value = value.replace(/[^\d.,]/g, ""); // Resultado: "X.XXX,XX"
  value = value.replace(/\./g, ""); // Resultado: "XXXX,XX"
  value = value.replace(",", ".");

  return value;
};

const numberToRealStringMask = (value: number): string => {
  let valueString = String(`R$ ${value.toFixed(2)}`);
  valueString = valueString.replace(".", ",");

  return `${valueString}`;
};

export {
  numberToRealStringMask,
  realMask,
  realStringMask,
  realStringUnmask,
  realUnmask,
};
