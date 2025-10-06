import { applyCpfMask } from "../cpfMask";

describe("cpfMask function", () => {
  test("should mask CPF correctly", () => {
    const originalCpf = "12345678900";
    const expectedMaskedCpf = "123.456.789-00";
    expect(applyCpfMask(originalCpf)).toBe(expectedMaskedCpf);
  });

  test("should handle CPF with existing periods and hyphen", () => {
    const originalCpf = "123.456.789-00";
    expect(applyCpfMask(originalCpf)).toBe(originalCpf);
  });

  test("should handle CPF with other non-digit characters", () => {
    const originalCpf = "123a456b789c00d";
    const expectedMaskedCpf = "123.456.789-00";
    expect(applyCpfMask(originalCpf)).toBe(expectedMaskedCpf);
  });

  test("should handle empty string", () => {
    const originalCpf = "";
    expect(applyCpfMask(originalCpf)).toBe("");
  });
});
