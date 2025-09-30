const sigtapProcedimentoMask = (value: string): string => {
  const valueNum = value.replace(/\D/g, "");

  const valueWithouZeros = valueNum.replace(/^0+/, "");

  const pad = valueWithouZeros.padStart(11, "0");

  return `${pad.substring(0, 2)}.${pad.substring(2, 4)}.${pad.substring(4, 6)}.${pad.substring(6, 9)}-${pad.substring(9, 11)}`;
};

export { sigtapProcedimentoMask };
