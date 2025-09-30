import { getPoliciesAuth } from "@/services/apiService/axiosConfig/server";
import { defineRulesFor } from "@/utils/ability/defineFor";
import {
  checkIsAuthorized,
  checkPermissions,
  getPolicies,
  hasAuth,
} from "@/utils/auth/auth";
import { AnyAbility } from "@casl/ability";
import { redirect } from "next/navigation";

jest.mock("@/services/apiService/axiosConfigAuthorization", () => ({
  getPoliciesAuth: {
    get: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/utils/ability/defineFor", () => ({
  defineRulesFor: jest.fn(),
}));

describe("getPolicies", () => {
  it("deve retornar os dados de políticas quando a requisição for bem-sucedida", async () => {
    const mockData = {
      data: [{ actions: ["read"], effect: "Allow", resources: ["post"] }],
    };
    (getPoliciesAuth.get as jest.Mock).mockResolvedValue(mockData);

    const result = await getPolicies();
    expect(result).toEqual(mockData.data);
  });

  it("deve retornar null quando a requisição falhar", async () => {
    (getPoliciesAuth.get as jest.Mock).mockRejectedValue(new Error("Erro"));

    const result = await getPolicies();
    expect(result).toBeNull();
  });
});

describe("checkPermissions", () => {
  let mockAbility: AnyAbility;

  beforeEach(() => {
    mockAbility = {
      can: jest.fn(),
    } as unknown as AnyAbility;
  });

  it("deve retornar true se o usuário tiver permissão para listar o plural", () => {
    (mockAbility.can as jest.Mock).mockReturnValueOnce(true);

    const result = checkPermissions(["List"], "user:users", mockAbility);
    expect(result).toBe(true);
    expect(mockAbility.can).toHaveBeenCalledWith("Listusers", "user");
  });

  it("deve retornar false se o usuário não tiver permissão", () => {
    (mockAbility.can as jest.Mock).mockReturnValueOnce(false);

    const result = checkPermissions(["Edit"], "user:users", mockAbility);
    expect(result).toBe(false);
    expect(mockAbility.can).toHaveBeenCalledWith("Edituser", "user");
  });
});

describe("hasAuth", () => {
  it("deve retornar null se getPolicies retornar null", async () => {
    (getPoliciesAuth.get as jest.Mock).mockResolvedValueOnce(null);

    const result = await hasAuth(["Read"], "user:users");
    expect(result).toBeNull();
  });

  it("deve retornar true se o usuário tiver a permissão", async () => {
    const mockPolicies = [
      { actions: ["read"], effect: "Allow", resources: ["post"] },
    ];
    (getPoliciesAuth.get as jest.Mock).mockResolvedValueOnce({
      data: mockPolicies,
    });
    const mockAbility = { can: jest.fn().mockReturnValue(true) };
    (defineRulesFor as jest.Mock).mockReturnValue(mockAbility);

    const result = await hasAuth(["Read"], "user:users");
  });

  it("deve retornar false se o usuário não tiver a permissão", async () => {
    const mockPolicies = [
      { actions: ["read"], effect: "Allow", resources: ["post"] },
    ];
    (getPoliciesAuth.get as jest.Mock).mockResolvedValueOnce({
      data: mockPolicies,
    });
    const mockAbility = { can: jest.fn().mockReturnValue(false) };
    (defineRulesFor as jest.Mock).mockReturnValue(mockAbility);

    const result = await hasAuth(["Read"], "user:users");
  });
});

describe("checkIsAuthorized", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve redirecionar para logout se isAuthorized for null", () => {
    checkIsAuthorized(null);
    expect(redirect).toHaveBeenCalledWith("/api/auth/logout");
  });

  it("deve redirecionar para 'não autorizado' se isAuthorized for false", () => {
    checkIsAuthorized(false);
    expect(redirect).toHaveBeenCalledWith("/nao-autorizado");
  });

  it("não deve redirecionar se isAuthorized for true", () => {
    checkIsAuthorized(true);
    expect(redirect).not.toHaveBeenCalled();
  });
});
