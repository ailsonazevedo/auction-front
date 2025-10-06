import { getTokens } from "@/actions/get-token";
import { cookies } from "next/headers";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

describe("getTokens", () => {
  it("deve retornar os tokens corretos", async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: (name: string) => {
        if (name === "access_token") {
          return { value: "realAccessToken" };
        }
        if (name === "refresh_token") {
          return { value: "realRefreshToken" };
        }
        return null;
      },
    });

    const tokens = await getTokens();
    expect(tokens).toEqual({
      access_token: "realAccessToken",
      refresh_token: "realRefreshToken",
    });
  });
  it("deve retornar undefined se os tokens não forem encontrados", async () => {
    (cookies as jest.Mock).mockReturnValue({
      get: (name: string) => {
        if (name === "access_token") {
          return undefined;
        }
        if (name === "refresh_token") {
          return undefined;
        }
        return null;
      },
    });

    const tokens = await getTokens();
    expect(tokens).toEqual({
      access_token: undefined,
      refresh_token: undefined,
    });
  });
});
