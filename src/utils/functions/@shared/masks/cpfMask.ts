const DIGITS_ONLY = /\D/g;
const FIRST_SEGMENT = /(\d{3})(\d)/;
const SECOND_SEGMENT = /(\d{3})(\d)/;
const THIRD_SEGMENT = /(\d{3})(\d{1,2})/;
const EXCESS_DIGITS = /(-\d{2})\d+$/;

/**
 * Formats a given string to match the CPF (Cadastro de Pessoas Físicas) mask used in Brazil.
 *
 * The CPF is a Brazilian individual taxpayer registry identification, and its standard format
 * is `XXX.XXX.XXX-XX`, where `X` is a digit. This function ensures the input string is
 * formatted to this pattern by applying a series of regex replacements.
 *
 * @param {string} value - The input string to be formatted.
 * @return {string} The formatted string in the CPF standard.
 */
const applyCpfMask = (value: string): string => {
  return value
    .replace(DIGITS_ONLY, "")
    .replace(FIRST_SEGMENT, "$1.$2")
    .replace(SECOND_SEGMENT, "$1.$2")
    .replace(THIRD_SEGMENT, "$1-$2")
    .replace(EXCESS_DIGITS, "$1");
};

const hideMiddleCpfMask = (cpf: string): string => {
  const firstPart = cpf.substring(0, 3);
  const lastPart = cpf.substring(cpf.length - 2, cpf.length);
  return firstPart + ".***.***-" + lastPart;
};
export { applyCpfMask, hideMiddleCpfMask };
