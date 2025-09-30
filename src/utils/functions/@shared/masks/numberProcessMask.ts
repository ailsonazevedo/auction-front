/**
 * Aplica uma máscara ao número de processo sei do contrato no formato XXXXX.XXXXXX/XXXX-XX.
 *
 * A máscara segue o padrão:
 * - Os primeiros 5 números (XXXXX)
 * - Os próximos 6 números (XXXXXX)
 * - Os próximos 4 números (XXXX)
 * - Os últimos 2 números (XX)
 *
 * @param {string} value - Número do processo no formato puro (apenas números).
 * @returns {string} - Número do processo formatado com a máscara XXXXX.XXXXXX/XXXX-XX.
 *
 * @example
 * // Exemplo de uso
 * let value = "1234567890123456";
 * let numeroFormatado = numberProcessMask(value);
 * console.log(numeroFormatado);  // Saída: 12345.678901/2345-12
 */

const numberProcessMask = (value: string): string => {
  const limitedValue = value.replace(/\D/g, "").slice(0, 17);

  return limitedValue.replace(/(\d{5})(\d{6})(\d{4})(\d{2})/, "$1.$2/$3-$4");
};

export { numberProcessMask };
