import { useFilterStore } from "@/stores/filterStore/filter-store";
import { useRouter } from "next/navigation";

export const useNavigateWithFilters = () => {
  const router = useRouter();
  const filterStore = useFilterStore();

  const navigateBack = (basePath: string) => {
    const savedFilters = filterStore.currentFilters;
    if (savedFilters) {
      // Os filtros já estão no formato correto (ex: "status=APROVADO&codigo=123")
      // Adiciona parâmetro especial para indicar que veio de navegação com filtros
      router.push(`${basePath}?${savedFilters}&from_navigation=true`);
    } else {
      router.push(basePath);
    }
  };

  return { navigateBack };
};
