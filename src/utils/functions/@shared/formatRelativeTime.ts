/**
 * Formata uma data em tempo relativo usando a API nativa Intl.RelativeTimeFormat
 * @param date - Data a ser formatada (string ISO ou objeto Date)
 * @returns String com o tempo relativo (ex: "há 5 minutos", "há 2 horas", "há 1 dia")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const targetDate = typeof date === "string" ? new Date(date) : date;

  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000,
  );

  // Se a diferença é menor que 1 segundo, considera como "agora"
  if (diffInSeconds < 1) {
    return "agora";
  }

  // Configuração do formatador para português brasileiro
  const rtf = new Intl.RelativeTimeFormat("pt-BR", {
    numeric: "always",
    style: "long",
  });

  // Define os intervalos de tempo
  const timeIntervals = [
    { seconds: 31536000, unit: "year" as const }, // 365 dias
    { seconds: 2592000, unit: "month" as const }, // 30 dias
    { seconds: 604800, unit: "week" as const }, // 7 dias
    { seconds: 86400, unit: "day" as const }, // 24 horas
    { seconds: 3600, unit: "hour" as const }, // 60 minutos
    { seconds: 60, unit: "minute" as const }, // 60 segundos
    { seconds: 1, unit: "second" as const }, // 1 segundo
  ];

  // Encontra a unidade apropriada
  for (const interval of timeIntervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return rtf.format(-count, interval.unit);
    }
  }

  return "agora";
};
