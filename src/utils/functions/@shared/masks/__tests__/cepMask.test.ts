import { cepMask } from "../cepMask";

describe("cepMask function", () => {
  // Writing a test for cepMask function
  test("should apply the CEP mask correctly", () => {
    const maskedCep = cepMask("12345678");
    expect(maskedCep).toBe("12345-678");
  });

  // Writing a test for cepMask function with less digits than required
  test("should not apply mask to incomplete CEP", () => {
    const maskedCep = cepMask("123");
    expect(maskedCep).toBe("123");
  });

  // Writing a test for cepMask function with non-digit characters
  test("should remove non-digit characters", () => {
    const maskedCep = cepMask("12a!3b@45~678");
    expect(maskedCep).toBe("12345-678");
  });
});
