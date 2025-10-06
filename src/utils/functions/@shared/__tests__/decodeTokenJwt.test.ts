import jose from "jose";

import { decodeToken } from "../decodeTokenJwt";

jest.mock("jose", () => ({
  decodeJwt: jest.fn(),
}));

describe("decodeToken", () => {
  afterEach(() => {
    (jose.decodeJwt as jest.Mock).mockReset();
  });

  it("calls decodeJwt function with correct token", () => {
    const token = "token";
    decodeToken(token);
    expect(jose.decodeJwt).toHaveBeenCalledWith(token);
  });

  it("returns the result of decodeJwt function", () => {
    const token = "token";
    const expectedResult = "result";
    (jose.decodeJwt as jest.Mock).mockReturnValue(expectedResult);
    const result = decodeToken(token);
    expect(result).toEqual(expectedResult);
  });
});
