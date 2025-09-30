// Array de enums

import { ALL_ENUMS } from "@/constants/allEnums";

// Separe os enums por contexto

//Concatena todos os arrays de enums em um único array para busca
function getAllEnums() {
  return Object.values(ALL_ENUMS).flat(); // Combina todos os arrays de enums em um só
}

/**
 *
 * @param enumValue Valor do ENUM recebido pela API
 * @returns Retorna o valor formatado para ser exibido ao usuário
 */
function enumFormatter(enumValue: string) {
  const allEnums = getAllEnums(); // Enums concatenados
  const enumFormatted = allEnums.find((item) => item.value === enumValue);
  return enumFormatted?.label ?? "Não informado";
}

export { enumFormatter };
