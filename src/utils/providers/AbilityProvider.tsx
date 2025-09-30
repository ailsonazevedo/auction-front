"use client";
import { useGetMePolicies } from "@/hooks/admin/policies/useGet/useGetMePolicies";
import { defineRulesFor } from "@/utils/ability/defineFor";
import { AnyAbility, PureAbility } from "@casl/ability";
import { createContextualCan } from "@casl/react";
import React, { createContext, useMemo } from "react";

export const AbilityContext = createContext({} as AnyAbility);
export const AbilityStatusContext = createContext({
  isError: false,
  isLoading: false,
});

export const Can = createContextualCan(AbilityContext.Consumer);

const AbilityProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: policies, isError, isLoading } = useGetMePolicies();

  const newAbility = useMemo(() => {
    if (policies) {
      return defineRulesFor(policies);
    }
    return new PureAbility();
  }, [policies]);

  const contextStatus = useMemo(
    () => ({ isError, isLoading }),
    [isError, isLoading],
  );

  return (
    <AbilityContext.Provider value={newAbility}>
      <AbilityStatusContext.Provider value={contextStatus}>
        {children}
      </AbilityStatusContext.Provider>
    </AbilityContext.Provider>
  );
};

export default AbilityProvider;
