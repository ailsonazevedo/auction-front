/**
 * Removes accents from a given string.
 *
 * This function normalizes the string to its decomposed form (NFD) and removes
 * all diacritical marks (accents) using a regular expression.
 *
 * @param {string} str - The string from which to remove accents.
 * @returns {string} - The normalized string without accents.
 */
export const normalizeText = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
