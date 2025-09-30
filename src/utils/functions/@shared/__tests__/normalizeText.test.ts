import { normalizeText } from "@/utils/functions/@shared/normalizeText";

describe("normalizeText function", () => {
  test("removes accents from a string", () => {
    const result = normalizeText("áéíóú");
    expect(result).toEqual("aeiou");
  });

  test("returns the same string when there are no accents", () => {
    const result = normalizeText("aeiou");
    expect(result).toEqual("aeiou");
  });

  test("handles empty string correctly", () => {
    const result = normalizeText("");
    expect(result).toEqual("");
  });

  test("removes mixed accents and keeps other characters intact", () => {
    const result = normalizeText("café com açúcar");
    expect(result).toEqual("cafe com acucar");
  });
});
