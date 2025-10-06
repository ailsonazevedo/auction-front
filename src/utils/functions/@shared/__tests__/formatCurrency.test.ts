import { formatCurrency } from "../formatCurrency";

describe("formatCurrency function", () => {
  test("formats a numeric string correctly", () => {
    const result = formatCurrency("1234");
    expect(result).toEqual(1234.0);
  });

  test("formats a string with points and commas correctly", () => {
    const result = formatCurrency("1.234,56");
    expect(result).toEqual(1234.56);
  });

  test("handles empty string correctly", () => {
    const result = formatCurrency("");
    expect(result).toEqual(NaN);
  });

  test("handles non-numeric string correctly", () => {
    const result = formatCurrency("abc");
    expect(result).toEqual(NaN);
  });

  test("formats a string with currency symbol correctly", () => {
    const result = formatCurrency("R$ 1.234,56");
    expect(result).toEqual(1234.56);
  });
});
