import { USER_LOCAL_STORAGE } from "@/constants/localStorage";
import { renderHook } from "@testing-library/react";
import secureLocalStorage from "react-secure-storage";

import { useGetUserInfo } from "../useGet/useGetUserInfo";

jest.mock("react-secure-storage", () => ({
  getItem: jest.fn(),
}));

describe("useGetUserInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar os dados do usuário do localstorage", () => {
    const mockUserData = {
      email: "john.doe@example.com",
      id: 1,
      name: "John Doe",
    };
    (secureLocalStorage.getItem as jest.Mock).mockReturnValue(mockUserData);

    const { result } = renderHook(() => useGetUserInfo());

    expect(result.current.userData()).toEqual(mockUserData);
    expect(secureLocalStorage.getItem).toHaveBeenCalledWith(USER_LOCAL_STORAGE);
  });

  it("Deve retornar undefined se os dados do usuário não forem encontrados no localstorage", () => {
    (secureLocalStorage.getItem as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useGetUserInfo());

    expect(result.current.userData()).toBeUndefined();
    expect(secureLocalStorage.getItem).toHaveBeenCalledWith(USER_LOCAL_STORAGE);
  });
});
