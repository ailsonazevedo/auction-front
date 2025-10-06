import { defineRulesFor } from "@/utils/ability/defineFor";
import { PureAbility } from "@casl/ability";

describe("defineRulesFor", () => {
  it("deve retornar um ability vazio se não houver políticas", () => {
    const result = defineRulesFor([]);
    expect(result).toBeInstanceOf(PureAbility);
    expect(result.rules.length).toBe(0);
  });

  it("deve retornar um ability vazio se o argumento não for um array", () => {
    const result = defineRulesFor(null as any);
    expect(result).toBeInstanceOf(PureAbility);
    expect(result.rules.length).toBe(0);
  });

  it("deve conceder todas as permissões se a ação e o recurso forem '*'", () => {
    const policies = [
      {
        _id: "1",
        actions: ["*"],
        effect: "Allow",
        name: "Admin Policy",
        resources: ["*"],
      },
    ];
    const result = defineRulesFor(policies);
    expect(result.can("manage", "all")).toBe(true);
  });

  it("deve negar a ação se o efeito for 'Deny'", () => {
    const policies = [
      {
        _id: "2",
        actions: ["post:create"],
        effect: "Deny",
        name: "Restrictive Policy",
        resources: ["post"],
      },
    ];
    const result = defineRulesFor(policies);
    expect(result.can("create", "post")).toBe(false);
  });

  it("deve permitir a ação se o efeito for 'Allow'", () => {
    const policies = [
      {
        _id: "3",
        actions: ["post:create"],
        effect: "Allow",
        name: "Allow Policy",
        resources: ["post"],
      },
    ];
    const result = defineRulesFor(policies);
    expect(result.can("create", "post")).toBe(true);
  });

  it("deve definir corretamente as regras com várias políticas", () => {
    const policies = [
      {
        _id: "4",
        actions: ["post:create"],
        effect: "Allow",
        name: "Create Policy",
        resources: ["post"],
      },
      {
        _id: "5",
        actions: ["post:delete"],
        effect: "Deny",
        name: "Delete Policy",
        resources: ["post"],
      },
    ];
    const result = defineRulesFor(policies);
    expect(result.can("create", "post")).toBe(true);
    expect(result.can("delete", "post")).toBe(false);
  });
});
