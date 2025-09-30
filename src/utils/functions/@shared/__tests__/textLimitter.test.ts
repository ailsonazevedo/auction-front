import { applyTextLimiter } from "../textLimitter";

describe("applyTextLimiter function", () => {
  test('returns a string truncated to a given size with "..." at the end when the text exceeds the given size', () => {
    const result = applyTextLimiter("abcdefghijklm", 10);
    expect(result).toEqual("abcdefghij...");
  });

  test("returns the same string when the text does not exceed the given size", () => {
    const result = applyTextLimiter("abc", 10);
    expect(result).toEqual("abc");
  });

  test("handles empty string correctly", () => {
    const result = applyTextLimiter("", 10);
    expect(result).toEqual("");
  });

  test('returns the text truncated to the size of 0 and appends "..." when size is set to 0', () => {
    const result = applyTextLimiter("abc", 0);
    expect(result).toEqual("...");
  });
});
