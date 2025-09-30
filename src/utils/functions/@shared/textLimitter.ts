export const applyTextLimiter = (text: string, size: number) => {
  if (text?.length > size) {
    return text.substring(0, size) + "...";
  }
  return text;
};
