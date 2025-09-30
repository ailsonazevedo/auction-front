const DIGIT_REGEX = /\D/g;

/**
 * An array of objects representing shorthand notations for formatting strings,
 * particularly phone numbers, based on specific regular expressions.
 *
 * Each object in the array contains the following properties:
 *
 * - `format`: A string that defines the format pattern used for the matched groups.
 * - `regex`: A regular expression that captures specific groups of digits to be formatted.
 *
 * The format property uses the captured groups from the regex property to structure
 * the formatted output.
 */
const FORMAT_SHORTHAND = [
  { format: "($1) $2-$3", regex: /^(\d{2})(\d{5})(\d{4}).*/ },
  { format: "($1) $2-$3", regex: /^(\d{2})(\d{4})(\d{0,4}).*/ },
  { format: "($1) $2", regex: /^(\d{2})(\d{0,5})/ },
  { format: "($1", regex: /^(\d*)/ },
];

/**
 * Applies a specified format to a string based on a regular expression.
 *
 * @param {string} value - The input string to be formatted.
 * @param {RegExp} regex - The regular expression that matches the part of the input string to be formatted.
 * @param {string} format - The format string that will replace the matched part of the input string.
 * @returns {string} - The formatted string.
 */
const applyFormat = (value: string, regex: RegExp, format: string): string => {
  return value.replace(regex, format);
};

/**
 * Formats a given string value as a phone number according to predefined formats based on string length.
 *
 * @param {string} value - The input string representing the phone number to be formatted.
 * @returns {string} - The formatted phone number string.
 */
const applyPhoneMask = (value: string): string => {
  value = value.replace(DIGIT_REGEX, "");

  if (value.length === 0) {
    return ""; // Retorna uma string vazia se não houver dígitos
  }

  if (value.length > 10) {
    value = applyFormat(
      value,
      FORMAT_SHORTHAND[0].regex,
      FORMAT_SHORTHAND[0].format,
    );
  } else if (value.length > 6) {
    value = applyFormat(
      value,
      FORMAT_SHORTHAND[1].regex,
      FORMAT_SHORTHAND[1].format,
    );
  } else if (value.length > 2) {
    value = applyFormat(
      value,
      FORMAT_SHORTHAND[2].regex,
      FORMAT_SHORTHAND[2].format,
    );
  } else {
    value = applyFormat(
      value,
      FORMAT_SHORTHAND[3].regex,
      FORMAT_SHORTHAND[3].format,
    );
  }

  return value;
};

const removePhoneMask = (value: string): string => {
  return value.replace(/\D/g, "");
};

export { applyPhoneMask, removePhoneMask };
