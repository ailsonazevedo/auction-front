const sigtapGrupoSubgrupoMask = (value: string): string => {
  const valueNum = value.replace(/\D/g, "");

  const valueWithouZeros = valueNum.replace(/^0+/, "");

  const pad = valueWithouZeros.padStart(4, "0");

  return `${pad.substring(0, 2)}.${pad.substring(2, 4)}`;
};

export { sigtapGrupoSubgrupoMask };
