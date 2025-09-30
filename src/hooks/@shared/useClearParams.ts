import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useClearParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const clearParams = (keysToRemove?: string[]) => {
    const params = new URLSearchParams(searchParams);

    if (pathname.includes("/criar")) return;
    if (!keysToRemove || keysToRemove.length === 0) {
      const keys = Array.from(params.keys());
      keys.forEach((key) => {
        params.delete(key);
      });
    } else {
      keysToRemove.forEach((key) => {
        params.delete(key);
      });
    }

    const newUrl =
      pathname + (params.toString() ? `?${params.toString()}` : "");
    router.replace(newUrl);
  };

  return clearParams;
};

export default useClearParams;
