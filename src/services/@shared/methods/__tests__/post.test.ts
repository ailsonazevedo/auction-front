import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { post } from "../post"; // Corrija o caminho conforme necessário
import { IResponseError } from "@/@types/erro/IResponseError";

describe("post function", () => {
  let mock: MockAdapter;
  let instance: AxiosInstance;

  beforeEach(() => {
    instance = axios.create();
    mock = new MockAdapter(instance);
  });

  it("should return data when the request is successful", async () => {
    const path = "/test-endpoint";
    const mockData = { message: "success" };
    const requestData = { id: 1, name: "Test" };

    mock.onPost(path).reply(200, mockData);

    await expect(
      post<typeof mockData>(instance, path, requestData),
    ).resolves.toEqual(mockData);
  });

  it("should throw an error when the request fails", async () => {
    const path = "/test-endpoint";
    const requestData = { id: 1, name: "Test" };

    const errorResponse: IResponseError = {
      error: "",
      statusCode: 500,
      message: [
        {
          context: "",
          error: "",
          message: "",
          statusCode: 0,
        },
      ],
    };

    mock.onPost(path).reply(500, errorResponse); // Simulando erro de servidor

    await expect(post(instance, path, requestData)).rejects.toEqual(
      errorResponse,
    ); // Agora espera uma exceção ser lançada com a estrutura de IResponseError
  });

  it("should handle network errors", async () => {
    const path = "/network-error-endpoint";
    const requestData = { id: 1, name: "Test" };

    mock.onPost(path).networkError(); // Simulando erro de rede

    await expect(post(instance, path, requestData)).rejects.toThrow(
      "Network Error",
    );
  });

  it("should handle timeout errors", async () => {
    const path = "/timeout-error-endpoint";
    const requestData = { id: 1, name: "Test" };

    mock.onPost(path).timeout(); // Simulando timeout

    await expect(post(instance, path, requestData)).rejects.toThrow("timeout");
  });
});
