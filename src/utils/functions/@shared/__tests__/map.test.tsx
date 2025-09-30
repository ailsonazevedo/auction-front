import { IGroup } from "@/@types/admin/groups/IGroup";
import { TPolicies } from "@/@types/auth/IPolicies";

import { createGroupsMap, createPoliciesMap } from "../map";

describe("createPoliciesMap function", () => {
  // Test to ensure function correctly creates a Map from an array of policies
  test("should correctly convert array to Map", () => {
    const mockPolicies: TPolicies[] = [
      {
        _id: "123",
        actions: ["read"],
        effect: "allow",
        name: "Policy 1",
        resources: ["resource1"],
      },
      {
        _id: "456",
        actions: ["write"],
        effect: "deny",
        name: "Policy 2",
        resources: ["resource2"],
      },
    ];
    const result = createPoliciesMap(mockPolicies);
    // Check that the result is a Map
    expect(result instanceof Map).toBeTruthy();
    // Check that each policy is correctly inserted into the Map
    mockPolicies.forEach((policy) => {
      expect(result.get(policy._id)).toEqual(policy.name);
    });
  });

  // Test to ensure function correctly handles an empty array
  test("should handle empty array", () => {
    const mockPolicies: TPolicies[] = [];
    const result = createPoliciesMap(mockPolicies);
    // Check that the result is a Map
    expect(result instanceof Map).toBeTruthy();
    // Check that the Map is empty
    expect(result.size).toEqual(0);
  });
});

describe("createGroupsMap function", () => {
  // Test to ensure function correctly creates a Map from an array of groups
  test("should correctly convert array to Map", () => {
    const mockGroups: IGroup[] = [
      {
        __v: 1, // Adicionando a propriedade __v
        _id: "123",
        name: "Group 1",
        policies: [],
        unit: "Unit 1",
      },
      {
        __v: 1, // Adicionando a propriedade __v
        _id: "456",
        name: "Group 2",
        policies: [],
        unit: "Unit 2",
      },
    ];
    const result = createGroupsMap(mockGroups);
    // Check that the result is a Map
    expect(result instanceof Map).toBeTruthy();
    // Check that each group is correctly inserted into the Map
    mockGroups.forEach((group) => {
      expect(result.get(group._id)).toEqual(group.name);
    });
  });

  // Test to ensure function correctly handles an empty array
  test("should handle empty array", () => {
    const mockGroups: IGroup[] = [];
    const result = createGroupsMap(mockGroups);
    // Check that the result is a Map
    expect(result instanceof Map).toBeTruthy();
    // Check that the Map is empty
    expect(result.size).toEqual(0);
  });
});
