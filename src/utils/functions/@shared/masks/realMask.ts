const realUnmask = (value: string): string => {
  value = value.replace(/[^\d,-]/g, "");
  value = value.replace(",", ".");
  value = value.replace(/^0+(?=\d)/, "");

  return value;
};

export { realUnmask };
