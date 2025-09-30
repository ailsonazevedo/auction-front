import { logout } from "@/actions/logout";
import DeleteUserForm from "@/components/account/Forms/DeleteUserForm";
import { useGetUserInfo } from "@/hooks/auth/useGet/useGetUserInfo";
import { useDeleteUser } from "@/hooks/user/useDelete/useDeleteUser";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

const queryClient = new QueryClient();
jest.mock("react-secure-storage", () => ({
  clear: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock("@/hooks/auth/useGet/useGetUserInfo");
jest.mock("@/hooks/user/useDelete/useDeleteUser");
jest.mock("@/actions/logout");

const mockedUseGetUserInfo = useGetUserInfo as jest.MockedFunction<
  typeof useGetUserInfo
>;
const mockedUseDeleteUser = useDeleteUser as jest.Mock;
const mockedLogout = logout as jest.Mock;

describe("DeleteUserForm", () => {
  beforeEach(() => {
    mockedUseGetUserInfo.mockReturnValue({
      userData: jest.fn().mockReturnValue({
        sub: "1",
      }),
    });
    mockedUseDeleteUser.mockReturnValue({
      mutateAsync: jest.fn(),
    });
    mockedLogout.mockReturnValue(jest.fn());
  });

  it("Deve renderizar botão de submit", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeleteUserForm />
      </QueryClientProvider>,
    );
    const submitButton = screen.getByRole("button", {
      name: /Excluir conta/i,
    });

    expect(submitButton).toBeInTheDocument();
  });
  it("Deve chamar o hook de delete", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <DeleteUserForm />
      </QueryClientProvider>,
    );
    const submitButton = screen.getByRole("button", {
      name: /Excluir conta/i,
    });
    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(mockedUseDeleteUser).toHaveBeenCalledWith([]);
    expect(mockedLogout).toHaveBeenCalled();
  });
});
