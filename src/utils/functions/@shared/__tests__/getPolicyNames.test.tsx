import { TPolicies } from "@/@types/auth/IPermission";

import { getPolicyNames } from "../getPolicyNames";

describe("getPolicyNames function", () => {
  it("returns an array of policy names based on provided IDs", () => {
    const mockData: TPolicies[] = [
      {
        _id: "123",
        actions: ["read"],
        effect: "allow",
        name: "Policy1",
        resources: ["resource1"],
      },
      {
        _id: "456",
        actions: ["write"],
        effect: "allow",
        name: "Policy2",
        resources: ["resource2"],
      },
      {
        _id: "789",
        actions: ["delete"],
        effect: "deny",
        name: "Policy3",
        resources: ["resource3"],
      },
    ];

    const result = getPolicyNames(["123", "789"], mockData);
    expect(result).toEqual(["Policy1", "Policy3"]);
  });

  it("filters out nulls when policy ID is not found", () => {
    const mockData: TPolicies[] = [
      {
        _id: "123",
        actions: ["read"],
        effect: "allow",
        name: "Policy1",
        resources: ["resource1"],
      },
      {
        _id: "456",
        actions: ["write"],
        effect: "allow",
        name: "Policy2",
        resources: ["resource2"],
      },
    ];

    const result = getPolicyNames(["000", "456"], mockData);
    expect(result).toEqual(["Policy2"]);
  });

  it("returns empty array when no matching policy IDs", () => {
    const mockData: TPolicies[] = [
      {
        _id: "123",
        actions: ["read"],
        effect: "allow",
        name: "Policy1",
        resources: ["resource1"],
      },
      {
        _id: "456",
        actions: ["write"],
        effect: "allow",
        name: "Policy2",
        resources: ["resource2"],
      },
    ];

    const result = getPolicyNames(["000", "111"], mockData);
    expect(result).toEqual([]);
  });
});
