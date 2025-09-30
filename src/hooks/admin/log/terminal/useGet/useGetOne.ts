import { useQuery } from "@tanstack/react-query";
const logEntries = {
  endpoint:
    "/undefined/api/connect/undefined/api/connect/undefined/api/connect/undefined/api/connect/undefined/api/connect/keycloak",
  environment: "production",
  flags: "Beta",
  function: "/src/middleware",
  host: "financeiro-v2-fg184xn9b-big-data-he",
  level: "Info",
  location: "San Francisco, USA (sfo1)",
  method: "GET",
  outgoingRequests: "No outgoing requests found",
  requestId: "gwt9w-1720547686552-f502bfdi...",
  requestMetrics: "Early Access",
  requestPath:
    "/undefined/api/connect/undefined/api/connect/undefined/api/connect/undefined/api/connect/undefined/api/connect/keycloak",
  requestUserAgent: "Mozilla/5.0 (Macintosh;...",
  statusCode: 302,
  statusText: "Found",
  time: "July 09 14:57:48.55 GMT-03:00",
  type: "Edge Middleware",
};

function UseGetOne() {
  return useQuery({
    //TODO: Definir tipagem do retorno
    queryFn: async (): Promise<any> => {
      const requests = logEntries;
      return requests;
    },

    queryKey: ["logRequest", "terminalLog", "id"], // Usado para identificar a chamada no cache
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do broterminalLoger for alterada e retornada
  });
}

export { UseGetOne };
