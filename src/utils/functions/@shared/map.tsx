import { IGroup } from "@/@types/admin/groups/IGroup";
import { TPolicies } from "@/@types/auth/IPolicies";

const createPoliciesMap = (policiesData: TPolicies[]) => {
  return new Map(policiesData.map((policy) => [policy._id, policy.name]));
};

const createGroupsMap = (groupsData: IGroup[]) => {
  return new Map(groupsData.map((group) => [group._id, group.name]));
};

export { createGroupsMap, createPoliciesMap };
