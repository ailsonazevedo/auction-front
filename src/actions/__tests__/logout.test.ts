// logout.test.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { logout } from "../logout";

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockReturnValue({
    delete: jest.fn().mockReturnValue(true),
  }),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("logout action", () => {
  it("deve deletar o cookie e redirecionar para /entrar", async () => {
    const mockedCookies = cookies();
    const mockedRedirect = redirect;

    await logout();

    expect(mockedCookies.delete).toHaveBeenCalledWith("access_token");
    expect(mockedCookies.delete).toHaveBeenCalledWith("refresh_token");
    expect(mockedRedirect).toHaveBeenCalledWith("/entrar");
  });
});
