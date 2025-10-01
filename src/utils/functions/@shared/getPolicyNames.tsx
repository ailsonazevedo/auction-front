import { TPolicies } from "@/@types/auth/IPermission";

const getPolicyNames = (policyIds: string[], policiesData: TPolicies[]) => {
  return policyIds
    .map((policyId) => {
      const policy = policiesData.find((item) => item._id === policyId);
      return policy ? policy.name : null;
    })
    .filter((name) => name !== null); // Remove os nulls do array final
};

export { getPolicyNames };
