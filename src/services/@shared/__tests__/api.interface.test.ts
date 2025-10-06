import axios, { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";

import { IApiMethods, apiMethods } from "../api.interface";

describe("apiMethods", () => {
  let mock: MockAdapter;
  let instance: AxiosInstance;
  let api: IApiMethods;
  const path = "/test-endpoint";

  beforeEach(() => {
    instance = axios.create();
    mock = new MockAdapter(instance);
    api = apiMethods(instance, path);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should make a POST request when calling create", async () => {
    const requestData = { name: "Test" };
    const mockData = { id: 1, name: "Test" };

    mock.onPost(path).reply(200, mockData);

    const result = await api.create(requestData);
    expect(result).toEqual(mockData);
  });

  it("should make a DELETE request when calling deleteOne", async () => {
    const id = "1";

    mock.onDelete(`${path}/${id}`).reply(200);

    const result = await api.deleteOne(id);
    expect(result).toBeUndefined();
  });

  it("should make a GET request when calling getList without params", async () => {
    const mockData = [{ id: 1, name: "Item 1" }];

    mock.onGet(path).reply(200, mockData);

    const result = await api.getList();
    expect(result).toEqual(mockData);
  });

  it("should make a GET request when calling getList with params", async () => {
    const params = "?page=1";
    const mockData = [{ id: 1, name: "Item 1" }];

    mock.onGet(`${path}${params}`).reply(200, mockData);

    const result = await api.getList(params);
    expect(result).toEqual(mockData);
  });

  it("should make a GET request when calling getOne without params", async () => {
    const id = "1";
    const mockData = { id: 1, name: "Item 1" };

    mock.onGet(`${path}/${id}`).reply(200, mockData);

    const result = await api.getOne(id);
    expect(result).toEqual(mockData);
  });

  it("should make a GET request when calling getOne with params", async () => {
    const id = "1";
    const params = "?detail=true";
    const mockData = { id: 1, name: "Item 1" };

    mock.onGet(`${path}/${id}${params}`).reply(200, mockData);

    const result = await api.getOne(id, params);
    expect(result).toEqual(mockData);
  });

  it("should make a PATCH request when calling patch", async () => {
    const id = "1";
    const requestData = { name: "Updated Item" };
    const mockData = { id: 1, name: "Updated Item" };

    mock.onPatch(`${path}/${id}`).reply(200, mockData);

    const result = await api.patch(requestData, id);
    expect(result).toEqual(mockData);
  });

  it("should make a PUT request when calling update", async () => {
    const id = "1";
    const requestData = { name: "Updated Item" };
    const mockData = { id: 1, name: "Updated Item" };

    mock.onPut(`${path}/${id}`).reply(200, mockData);

    const result = await api.update(requestData, id);
    expect(result).toEqual(mockData);
  });

  it("should make a PUT request when calling updatePut", async () => {
    const id = "1";
    const requestData = { name: "Updated Item" };
    const mockData = { id: 1, name: "Updated Item" };

    mock.onPut(`${path}/${id}`).reply(200, mockData);

    const result = await api.updatePut(requestData, id);
    expect(result).toEqual(mockData);
  });
});
