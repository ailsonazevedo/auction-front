"use client";
import { useGetMePermissions } from "@/hooks/user/useGet/useGetMePermissions";
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
  const { data: permissions, isError, isLoading } = useGetMePermissions();

  const newAbility = useMemo(() => {
    if (permissions) {
      return defineRulesFor(permissions);
    }
    return new PureAbility();
  }, [permissions]);

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
