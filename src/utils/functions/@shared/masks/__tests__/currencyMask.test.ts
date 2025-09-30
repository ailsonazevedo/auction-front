import { currencyMask } from "../currencyMask";

describe("currencyMask", () => {
  it("deve formatar uma string numérica para moeda BRL", () => {
    expect(currencyMask("1234")).toBe("R$ 1.234,00");
  });

  it("deve remover caracteres não numéricos e formatar para moeda BRL", () => {
    expect(currencyMask("1a2b3c4")).toBe("R$ 1.234,00");
  });

  it("deve lidar corretamente com números grandes", () => {
    expect(currencyMask("123456789")).toBe("R$ 123.456.789,00");
  });

  it("deve lidar corretamente com números decimais", () => {
    expect(currencyMask("1234.56")).toBe("R$ 1.234,56");
  });

  it("deve lidar corretamente com números com zeros à esquerda", () => {
    expect(currencyMask("0001234")).toBe("R$ 1.234,00");
  });

  it("deve lidar corretamente com números muito grandes", () => {
    expect(currencyMask("123456789012345")).toBe("R$ 123.456.789.012.345,00");
  });
});
