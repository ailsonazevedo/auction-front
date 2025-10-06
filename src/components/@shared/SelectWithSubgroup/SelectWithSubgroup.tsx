import { LoadingIconsErros } from "@/components/@shared/Error/LoadingIconsErros";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  TextField,
  Tooltip,
} from "@mui/material";
import { FormikProps } from "formik";
import { debounce } from "lodash";
import { useMemo } from "react";

interface Props {
  acessoOpcoesSelect: string;
  data: any[] | undefined;
  disabled?: boolean;
  formikAndName: { formik: FormikProps<any>; name: string };
  fullLabel?: boolean;
  invalidateQuery: string[];
  isGroupSelectable?: boolean;
  label?: string;
  labelAcessoTituloGrupo: string;
  setSearch?: (value: string) => void;
  showGroupAndSubGroup?: boolean;
  statusData: { isError: boolean; isLoading: boolean };
  subCategoria?: string;
}
interface Categoria {
  id: string;
  nome: string;
  subcategorias: {
    id: string;
    nome: string;
  }[];
}
interface opcoaoCategoriaSubCategoria {
  id: string;
  labelOpcaoSubCategoria: string;
  nomeGrupo: string;
}

/**
 * SelectWithSubgroup component.
 *
 * @param {Object} props - As propriedades do componente.
 * @param {Array<Object>} props.data - Os dados para o autocomplete, contendo categorias e subcategorias.
 * @param {Object} props.formikAndName - Objeto contendo o formik e o nome do campo no formik.
 * @param {string} [props.label] - O rótulo exibido no campo de entrada.
 * @param {string} [props.labelAcessoTituloGrupo=''] - A propriedade do objeto `data` que será usada como título do grupo.
 * @param {string} [props.acessoOpcoesSelect=''] - A propriedade do objeto `subcategorias` que será usada como rótulo das opções.
 * @returns {JSX.Element} O componente SelectWithSubgroup.
 */

/**
 * Formata os dados das categorias e subcategorias.
 *
 * - `categoriasFormatadas`: Mapeia os dados recebidos para incluir `id`, `nome` e subcategorias formatadas.
 * - `options`: Transforma as categorias e subcategorias em uma lista plana de opções para o autocomplete.
 *- `subcategorias`: Mapeia as subcategorias para incluir `id` e `nome` que é recebida de uma prop .
 */
export const SelectWithSubgroup = ({
  acessoOpcoesSelect = "",
  data,
  disabled = false,
  formikAndName,
  fullLabel = false,
  invalidateQuery,
  label,
  labelAcessoTituloGrupo = "",
  setSearch,
  showGroupAndSubGroup = false,
  statusData,
  subCategoria = "subcategorias",
}: Props) => {
  const { isError, isLoading } = statusData;

  const { formik, name } = formikAndName;
  const categoriasFormatadas = useMemo(() => {
    return data?.map((item) => ({
      id: item.id,
      nome: item[labelAcessoTituloGrupo],
      subcategorias:
        item[subCategoria]?.map(
          (sub: { [key: string]: string; id: string; nome: string }) => ({
            id: sub.id,
            nome: sub[acessoOpcoesSelect],
          }),
        ) || [],
    }));
  }, [data, labelAcessoTituloGrupo, subCategoria, acessoOpcoesSelect]);

  const options: opcoaoCategoriaSubCategoria[] | undefined = useMemo(() => {
    return categoriasFormatadas?.flatMap((categoria) =>
      categoria.subcategorias?.map((subcategoria: Categoria) => ({
        id: subcategoria?.id,
        labelOpcaoSubCategoria: subcategoria?.nome,
        nomeGrupo: categoria?.nome,
      })),
    );
  }, [categoriasFormatadas]);

  const value = options?.find((el) => el.id === formik.values[name]) ?? null;
  const debouncedName = useMemo(() => {
    const debounced = debounce(
      (filterName: string) => setSearch?.(filterName),
      500,
    );
    return (filterName: string) => debounced(filterName);
  }, []);
  return (
    <FormControl fullWidth variant="outlined">
      <Autocomplete
        disabled={disabled}
        filterOptions={(options, { inputValue }) => {
          const normalizedInput = inputValue.toLowerCase();
          return options.filter(
            (option) =>
              option.labelOpcaoSubCategoria
                .toLowerCase()
                .includes(normalizedInput) ||
              option.nomeGrupo.toLowerCase().includes(normalizedInput),
          ); // pega o filtro tanto para nome grupo quanto para subcategoria
        }}
        getOptionLabel={(option) => {
          if (!option) return "";
          if (fullLabel) {
            return `${option.nomeGrupo} - ${option.labelOpcaoSubCategoria}`;
          }
          return option.labelOpcaoSubCategoria || formik.values[name] || "";
        }}
        groupBy={(option) => option.nomeGrupo}
        id="grouped-demo"
        isOptionEqualToValue={(option, value) => {
          return option.id === value?.id;
        }}
        noOptionsText="Nenhum resultado encontrado"
        onChange={(event, value) => {
          formik.setFieldValue(name, value?.id || "");
        }}
        onInputChange={(e, value) => {
          if (setSearch) {
            debouncedName(value || "");
          }
        }}
        options={options || []}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                  {isError && (
                    <Tooltip title="Erro ao buscar os dados">
                      <LoadingIconsErros invalidateQuery={invalidateQuery} />
                    </Tooltip>
                  )}
                </>
              ),
            }}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]?.toString()}
            label={isLoading ? "Buscando..." : label}
            onBlur={() => formik.setFieldTouched(name, true)}
            placeholder="Selecionar"
          />
        )}
        renderOption={(props, option) => (
          <li {...props} style={{ paddingLeft: "6vh" }}>
            {option.labelOpcaoSubCategoria}
          </li>
        )}
        value={value}
      />
    </FormControl>
  );
};
