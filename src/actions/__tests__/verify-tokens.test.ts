import { API_RESOURCE_AUTH } from "@/constants/services";
import { decodeToken as mockDecodeToken } from "@/utils/functions/@shared/decodeTokenJwt";
import { cookies } from "next/headers";

import { verifyTokens } from "../verify-tokens";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

jest.mock("@/utils/functions/@shared/decodeTokenJwt", () => ({
  decodeToken: jest.fn(),
}));
describe("verifyTokens", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar result false se os tokens forem inválidos e deletar os tokens", async () => {
    const mockAccessToken = "mockAccessToken";
    const mockRefreshToken = "mockRefreshToken";
    const mockTimestamp = Math.floor(Date.now() / 1000);

    (mockDecodeToken as jest.Mock).mockImplementation((token) => {
      if (token === mockRefreshToken) {
        return { exp: mockTimestamp - 10 };
      }
      return { exp: mockTimestamp + 1000 };
    });

    const mockDelete = jest.fn();
    (cookies as jest.Mock).mockReturnValue({
      delete: mockDelete,
    });

    const result = await verifyTokens(mockAccessToken, mockRefreshToken);

    expect(mockDelete).toHaveBeenCalledWith("access_token");
    expect(mockDelete).toHaveBeenCalledWith("refresh_token");
    expect(result).toEqual({
      result: false,
    });
  });
  it("Deve retornar result true se o access token nao estiver expirado", async () => {
    const mockAccessToken = "mockAccessToken";
    const mockRefreshToken = "mockRefreshToken";
    const mockTimestamp = Math.floor(Date.now() / 1000);

    (mockDecodeToken as jest.Mock).mockImplementation((token) => {
      if (token === mockRefreshToken) {
        return { exp: mockTimestamp + 1000 };
      }
      return { exp: mockTimestamp + 10 };
    });

    const result = await verifyTokens(mockAccessToken, mockRefreshToken);
    expect(result).toEqual({
      access_token: mockAccessToken,
      refresh_token: mockRefreshToken,
      result: true,
    });
  });
  it("Deve fazer o refresh de tokens se o access token estiver expirado", async () => {
    const mockAccessToken = "mockAccessToken";
    const mockRefreshToken = "mockRefreshToken";
    const mockNewAccessToken = "mockNewAccessToken";
    const mockNewRefreshToken = "mockNewRefreshToken";
    const mockTimestamp = Math.floor(Date.now() / 1000);

    (mockDecodeToken as jest.Mock).mockImplementation((token) => {
      if (token === mockRefreshToken) {
        return { exp: mockTimestamp + 1000 };
      }
      return { exp: mockTimestamp - 10 };
    });

    const mockSet = jest.fn();
    (cookies as jest.Mock).mockReturnValue({
      set: mockSet,
    });

    const mockResponse = {
      json: jest.fn().mockResolvedValue({
        access_token: mockNewAccessToken,
        refresh_token: mockNewRefreshToken,
      }),
      ok: true,
    };

    mockFetch.mockResolvedValue(mockResponse);

    const result = await verifyTokens(mockAccessToken, mockRefreshToken);

    expect(mockFetch).toHaveBeenCalledWith(
      `${API_RESOURCE_AUTH}/auth/refresh-tokens`,
      {
        body: JSON.stringify({
          refresh_token: mockRefreshToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      },
    );

    expect(mockSet).toHaveBeenCalledWith({
      httpOnly: true,
      name: "access_token",
      sameSite: "strict",
      secure: true,
      value: mockNewAccessToken,
    });

    expect(mockSet).toHaveBeenCalledWith({
      httpOnly: true,
      name: "refresh_token",
      sameSite: "strict",
      secure: true,
      value: mockNewRefreshToken,
    });

    expect(result).toEqual({
      access_token: mockNewAccessToken,
      refresh_token: mockNewRefreshToken,
      result: true,
      userData: mockDecodeToken(mockNewAccessToken),
    });
  });
  it("Deve retornar result false se o token de refresh falhar", async () => {
    const mockAccessToken = "mockAccessToken";
    const mockRefreshToken = "mockRefreshToken";
    const mockTimestamp = Math.floor(Date.now() / 1000);

    (mockDecodeToken as jest.Mock).mockImplementation((token) => {
      if (token === mockRefreshToken) {
        return { exp: mockTimestamp + 1000 };
      }
      return { exp: mockTimestamp - 10 };
    });

    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ error: "Error refreshing token" }),
      ok: false,
    });

    const result = await verifyTokens(mockAccessToken, mockRefreshToken);

    expect(result).toEqual({
      result: false,
    });
  });
});
