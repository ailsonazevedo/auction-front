import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { del } from "../del";

describe("del function", () => {
  let mock: MockAdapter;
  let instance: AxiosInstance;

  beforeEach(() => {
    instance = axios.create();
    mock = new MockAdapter(instance);
  });

  it("deletes and returns the response data", async () => {
    const expectedData = { success: true };
    mock.onDelete("/test").reply(200, expectedData);

    await expect(del<typeof expectedData>(instance, "/test")).resolves.toEqual(
      expectedData,
    );
  });

  it("throws an error when the request fails", async () => {
    mock.onDelete("/test").reply(500);

    await expect(del(instance, "/test")).rejects.toThrow();
  });
});
