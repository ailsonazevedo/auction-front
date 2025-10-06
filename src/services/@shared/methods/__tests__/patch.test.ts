import { IResponseError } from "@/@types/erro/IResponseError";
import axios, { AxiosError, AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { patch } from "../patch";

describe("patch function", () => {
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

    mock.onPatch(path).reply(200, mockData);

    await expect(
      patch<typeof mockData>(instance, path, requestData),
    ).resolves.toEqual(mockData);
  });

  it("should throw an error when the request fails", async () => {
    const path = "/test-endpoint";
    const requestData = { id: 1, name: "Test" };
    const errorResponse: IResponseError = {
      error: "Erro no servidor",
      message: [
        {
          context: "Test Context",
          error: "Erro específico",
          message: "Ocorreu um erro no servidor",
          statusCode: 500,
        },
      ],
      statusCode: 500,
    };

    mock.onPatch(path).reply(500, errorResponse);
    await expect(patch(instance, path, requestData)).rejects.toEqual(
      errorResponse,
    );
  });

  it("should handle network errors", async () => {
    const path = "/network-error-endpoint";
    const requestData = { id: 1, name: "Test" };

    mock.onPatch(path).networkError();

    await expect(patch(instance, path, requestData)).rejects.toThrow(
      "Network Error",
    );
  });

  it("should handle timeout errors", async () => {
    const path = "/timeout-error-endpoint";
    const requestData = { id: 1, name: "Test" };

    mock.onPatch(path).timeout();

    await expect(patch(instance, path, requestData)).rejects.toThrowError(
      "timeout",
    );
  });
});
