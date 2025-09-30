/**
 * Formats a given string value as a Brazilian CNPJ (Cadastro Nacional da Pessoa Jurídica).
 * The CNPJ format is "XX.XXX.XXX/XXXX-XX".
 *
 * @param {string} value - The string value to be formatted as a CNPJ.
 * @returns {string} - The formatted CNPJ string.
 */
const applyCnpjMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+$/, "$1");
};

export { applyCnpjMask };
