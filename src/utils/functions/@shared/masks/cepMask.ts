const cepMask = (value: string) => {
  value = value.replace(/\D/g, "");
  if (value.length > 5) {
    value = value.replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9);
  }

  return value;
};

export { cepMask };
