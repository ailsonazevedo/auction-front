import { getYupValidation } from "../getYupValidation";

describe("getYupValidation", () => {
  test("it should return proper validation schema for name", () => {
    const schema = getYupValidation("name");
    const isValid = schema.isValidSync("John Doe");
    expect(isValid).toBe(true);
  });

  test("it should return proper validation schema for cpf", () => {
    const schema = getYupValidation("cpf");
    const isValid = schema.isValidSync("123.456.789-00");
    expect(isValid).toBe(true);
  });

  test("it should return proper validation schema for password", () => {
    const schema = getYupValidation("password");
    const isValid = schema.isValidSync("Password1!");
    expect(isValid).toBe(true);
  });

  test("it should return proper validation schema for email", () => {
    const schema = getYupValidation("email");
    const isValid = schema.isValidSync("test@example.com");
    expect(isValid).toBe(true);
  });

  test("it should return a default validation schema if no type is matched", () => {
    const schema = getYupValidation("string"); // Utilizando um tipo válido que não tem caso no switch
    const isValid = schema.isValidSync("some value");
    expect(isValid).toBe(true);
  });
});
