import { logout } from "@/actions/logout";
import { useGetUserInfo } from "@/hooks/auth/useGet/useGetUserInfo";
import { renderWithClient } from "@/utils/tests/functions";
import "@testing-library/jest-dom";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import secureLocalStorage from "react-secure-storage";

import { Profile } from "../Profile/Profile";

jest.mock("@/hooks/auth/useGet/useGetUserInfo");

jest.mock("@/hooks/auth/useGet/useGetUserInfo");
jest.mock("react-secure-storage", () => ({
  clear: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock("@/actions/logout", () => ({
  logout: jest.fn(),
}));

const mockedUseGetUserInfo = useGetUserInfo as jest.MockedFunction<
  typeof useGetUserInfo
>;

describe("Profile test", () => {
  beforeEach(() => {
    mockedUseGetUserInfo.mockReturnValue({
      userData: jest.fn().mockReturnValue({
        email: "test@example.com",
      }),
    });
  });
  it("deve renderizar o componente sem erros", async () => {
    renderWithClient(<Profile />);
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
  });
  it("Deve chamar o logout quando o botão for clicado e limpar o secureStorage", async () => {
    renderWithClient(<Profile />);
    await act(async () => {
      fireEvent.click(screen.getByTestId("logout-button"));
    });
    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
    expect(secureLocalStorage.clear).toHaveBeenCalled();
  });
});
