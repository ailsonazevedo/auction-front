import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { get } from "../get"; // Corrija o caminho conforme necessário

describe("get function", () => {
  let mock: MockAdapter;
  let instance: AxiosInstance;

  beforeEach(() => {
    instance = axios.create();
    mock = new MockAdapter(instance);
  });

  it("should return data when the request is successful", async () => {
    const path = "/test-endpoint";
    const mockData = { message: "success" };

    mock.onGet(path).reply(200, mockData);
    await expect(get<typeof mockData>(instance, path)).resolves.toEqual(
      mockData,
    ); // Corrigido o caminho do `get`
  });

  it("should throw an error when the request fails", async () => {
    const path = "/test-endpoint";

    // Simula uma resposta de erro com status 500
    mock.onGet(path).reply(500);

    // Verifica se a função `get` lança uma exceção quando a requisição falha
    await expect(get(instance, path)).rejects.toThrow();
  });

  it("should handle network errors", async () => {
    const path = "/network-error-endpoint";

    // Simula uma falha de rede
    mock.onGet(path).networkError();

    // Verifica se a função `get` lança uma exceção em caso de erro de rede
    await expect(get(instance, path)).rejects.toThrowError("Network Error");
  });

  it("should handle timeout errors", async () => {
    const path = "/timeout-error-endpoint";

    // Simula um erro de timeout
    mock.onGet(path).timeout();

    // Verifica se a função `get` lança uma exceção em caso de timeout
    await expect(get(instance, path)).rejects.toThrowError("timeout");
  });
});
