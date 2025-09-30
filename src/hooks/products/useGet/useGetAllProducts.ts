import { IResponse } from "@/@types/IResponse";
import { IProduct } from "@/@types/products/IProduct";
import { PRODUCTS } from "@/services/apiService/endpoints/products";
import { useQuery } from "@tanstack/react-query";
import { MRT_PaginationState, MRT_SortingState } from "material-react-table";

export const PRODUCTS_QUERY_KEY = ["produtos"];

const mock = {
  count: 4,
  items: [
    {
      freeShipping: true,
      id: "skjdlaskjd312asdj",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      installments: 3,
      installmentsValue: 19.99,
      lastPrice: 79.99,
      name: "Camiseta Estampada",
      percentDiscount: 25,
      price: 59.99,
    },
    {
      freeShipping: false,
      id: "asdasd123123asdasd",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
      installments: 5,
      installmentsValue: 49.99,
      lastPrice: 249.99,
      name: "Tênis de Corrida",
      percentDiscount: 20,
      price: 199.99,
    },
    {
      freeShipping: true,
      id: "asdasd123123asdasd",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
      installments: 5,
      installmentsValue: 49.99,
      lastPrice: 249.99,
      name: "Tênis de Corrida",
      percentDiscount: 20,
      price: 199.99,
    },
    {
      freeShipping: true,
      id: "sdajdsklioia12",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_2X_692569-MLA79438432225_092024-F.webp",
      installments: 12,
      installmentsValue: 12.37,
      lastPrice: 179.0,
      name: "Mini drone LSRC LS-E88 com câmera HD preto 2.4GHz 2 baterias",
      percentDiscount: 17,
      price: 148.47,
    },
    {
      freeShipping: false,
      id: "asdasd123123asdasd",
      image:
        "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
      installments: 5,
      installmentsValue: 49.99,
      lastPrice: 249.99,
      name: "Tênis de Corrida",
      percentDiscount: 20,
      price: 199.99,
    },
    {
      freeShipping: true,
      id: "sdajdsklioia12",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_2X_692569-MLA79438432225_092024-F.webp",
      installments: 12,
      installmentsValue: 12.37,
      lastPrice: 179.0,
      name: "Mini drone LSRC LS-E88 com câmera HD preto 2.4GHz 2 baterias",
      percentDiscount: 17,
      price: 148.47,
    },
    {
      freeShipping: false,
      id: "asdasd123123asdasd",
      image:
        "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png",
      installments: 5,
      installmentsValue: 49.99,
      lastPrice: 249.99,
      name: "Tênis de Corrida",
      percentDiscount: 20,
      price: 199.99,
    },
    {
      freeShipping: true,
      id: "sdajdsklioia12",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_2X_692569-MLA79438432225_092024-F.webp",
      installments: 12,
      installmentsValue: 12.37,
      lastPrice: 179.0,
      name: "Mini drone LSRC LS-E88 com câmera HD preto 2.4GHz 2 baterias",
      percentDiscount: 17,
      price: 148.47,
    },
  ],
};

const useGetAllProducts = (
  pagination?: MRT_PaginationState,
  globalFilter?: string,
  sorting?: MRT_SortingState,
) => {
  const { getList } = PRODUCTS;

  const paginationFilter = pagination
    ? `&page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`
    : "";
  const globalSearch = globalFilter ? `&search=${globalFilter}` : "";
  const orderSort = sorting?.[0]?.desc ? "DESC" : "ASC";
  const propSort = sorting?.[0]?.id;
  const sortBy = `&sortBy=${propSort ?? "nome"}:${orderSort ?? "ASC"}`;
  const urlFilter = `?${paginationFilter}${globalSearch}${sortBy}`;

  return useQuery({
    queryFn: async (): Promise<IResponse<IProduct>> => {
      const requests = await getList(urlFilter);
      return mock;
    },
    queryKey: [...PRODUCTS_QUERY_KEY, pagination, globalFilter, sorting],
    refetchOnWindowFocus: false, // Não fazer o refetch involuntario quando a janela do browser for alterada e retornada
  });
};

export { useGetAllProducts };
