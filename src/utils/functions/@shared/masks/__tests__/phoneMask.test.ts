import { applyPhoneMask } from "@/utils/functions/@shared/masks/phoneMask";

describe("applyPhoneMask", () => {
  test("should format a valid phone number with 11 digits", () => {
    const input = "11987654321";
    const expectedOutput = "(11) 98765-4321";
    const result = applyPhoneMask(input);
    expect(result).toEqual(expectedOutput);
  });

  test("should format a valid phone number with 10 digits", () => {
    const input = "1198765432";
    const expectedOutput = "(11) 9876-5432";
    const result = applyPhoneMask(input);
    expect(result).toEqual(expectedOutput);
  });

  test("should format a valid phone number with 6 digits", () => {
    const input = "119876";
    const expectedOutput = "(11) 9876";
    const result = applyPhoneMask(input);
    expect(result).toEqual(expectedOutput);
  });

  test("should format a valid phone number with 2 digits", () => {
    const input = "11";
    const expectedOutput = "(11";
    const result = applyPhoneMask(input);
    expect(result).toEqual(expectedOutput);
  });

  test("should format an empty string as an empty string", () => {
    const input = "";
    const expectedOutput = "";
    const result = applyPhoneMask(input);
    expect(result).toEqual(expectedOutput);
  });

  test("should remove non-digit characters and format the phone number", () => {
    const input = "(11) 98765-4321";
    const expectedOutput = "(11) 98765-4321";
    const result = applyPhoneMask(input);
    expect(result).toEqual(expectedOutput);
  });

  test("should format a string with extra characters correctly", () => {
    const input = "11abc98765-4321";
    const expectedOutput = "(11) 98765-4321";
    const result = applyPhoneMask(input);
    expect(result).toEqual(expectedOutput);
  });

  test("should handle phone numbers shorter than 2 digits", () => {
    const input = "1";
    const expectedOutput = "(1";
    const result = applyPhoneMask(input);
    expect(result).toEqual(expectedOutput);
  });
});
