import { applyCnpjMask } from "../cnpjMask";

describe("cnpjMask function", () => {
  it("should correctly apply mask to a CNPJ number", () => {
    const rawCNPJ = "01234567890123";
    const maskedCNPJ = applyCnpjMask(rawCNPJ);
    expect(maskedCNPJ).toBe("01.234.567/8901-23");
  });

  it("should remove any non-numeric characters", () => {
    const rawCNPJ = "0a1b2c3d4e5f6g7h8i9j0k1l2m3";
    const maskedCNPJ = applyCnpjMask(rawCNPJ);
    expect(maskedCNPJ).toBe("01.234.567/8901-23");
  });

  it("should correctly handle CNPJ numbers less than 14 digits", () => {
    const rawCNPJ = "0123456789";
    const maskedCNPJ = applyCnpjMask(rawCNPJ);
    expect(maskedCNPJ).toBe("01.234.567/89");
  });

  it("should truncate CNPJ numbers more than 14 digits to 14", () => {
    const rawCNPJ = "0123456789012345";
    const maskedCNPJ = applyCnpjMask(rawCNPJ);
    expect(maskedCNPJ).toBe("01.234.567/8901-23");
  });
});
