import { useRef, useState } from "react";

import { useControlParamsUrl } from "./useControlParamsUrl";

/**
 * Hook customizado para gerenciar inputs de busca com debounce
 * Elimina a necessidade de estados locais e useEffect
 */
export const useSearchFormDebounce = () => {
  const { getOne, remove, setParam } = useControlParamsUrl();
  const timeoutRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const [resetKey, setResetKey] = useState(0);

  const debouncedSetParam = (paramKey: string, value: string, delay = 300) => {
    if (timeoutRefs.current[paramKey]) {
      clearTimeout(timeoutRefs.current[paramKey]);
    }
    timeoutRefs.current[paramKey] = setTimeout(() => {
      if (value) {
        setParam(paramKey, value);
      } else {
        remove(paramKey);
      }
    }, delay);
  };

  const clearTimeoutsAndReset = () => {
    Object.values(timeoutRefs.current).forEach(clearTimeout);
    timeoutRefs.current = {};
    setResetKey((prev) => prev + 1);
  };
  const getInputKey = (paramKey: string, paramValue?: null | string) => {
    return `${paramKey}-${resetKey}`;
  };

  const getParamValue = (paramKey: string) => {
    return getOne(paramKey);
  };
  return {
    clearTimeoutsAndReset,
    debouncedSetParam,
    getInputKey,
    getParamValue,
    resetKey,
  };
};
