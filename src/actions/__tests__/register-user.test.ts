import { ICreateUser } from "@/@types/user/IUser";
import { API_RESOURCE_AUTH } from "@/constants/services";

import { registerUser } from "../register-user";

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe("registerUser", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("Deve registrar um novo usuário", async () => {
    const mockUserData = {
      cnpj: "",
      cpf: "",
      dateOfBirth: "",
      email: "",
      name: "testuser",
      password: "testpass",
      profilePhoto: "",
    } as ICreateUser;
    const mockResponse = {
      json: jest.fn().mockResolvedValue({ success: true }),
      ok: true,
    };
    mockFetch.mockResolvedValue(mockResponse);

    const response = await registerUser(mockUserData);
    expect(mockFetch).toHaveBeenCalledWith(API_RESOURCE_AUTH + "/iam/users", {
      body: JSON.stringify(mockUserData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    expect(response).toEqual({ success: true });
  });

  it("Deve retornar erro ao registrar usuário já existente", async () => {
    const mockUserData = {
      cnpj: "",
      cpf: "",
      dateOfBirth: "",
      email: "",
      name: "testuser",

      password: "testpass",
    } as ICreateUser;

    const mockErrorResponse = {
      json: jest.fn().mockResolvedValue({ error: "User already exists" }),
      ok: false,
    };
    mockFetch.mockResolvedValue(mockErrorResponse);

    const response = await registerUser(mockUserData);
    expect(mockFetch).toHaveBeenCalledWith(API_RESOURCE_AUTH + "/iam/users", {
      body: JSON.stringify(mockUserData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    expect(response).toEqual({ error: "User already exists" });
  });
});
