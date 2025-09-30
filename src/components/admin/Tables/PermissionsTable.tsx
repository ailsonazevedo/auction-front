"use client";
import { selectModels } from "@/constants/admin/policies";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

/* eslint-disable perfectionist/sort-objects */
const actionsMap = {
  "Listar Todos": "ListUsers,ListGroups,ListUnits,ListOrganizations,ListRoles",
  "Listar Um": "GetUser,GetGroup,GetUnit,GetOrganization,GetRole",
  Create: "CreateUser,CreateGroup,CreateUnit,CreateOrganization,CreateRole",
  Update: "UpdateUser,UpdateGroup,UpdateUnit,UpdateOrganization,UpdateRole",
  Remove: "RemoveUser,RemoveGroup,RemoveUnit,RemoveOrganization,RemoveRole",
};
interface IModel {
  label: string;
  value: string;
}
export default function BasicTable({ permissions = [] }: any) {
  const checkActionAvailable = (
    model: IModel,
    actionType: keyof typeof actionsMap,
  ) => {
    const actionKey = actionsMap[actionType];
    return permissions.some(
      (action: string) =>
        action.includes(model.value) &&
        actionKey.includes(action.split(":")[1]),
    );
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Tabela simples">
        <TableHead sx={{ backgroundColor: "primary.light" }}>
          <TableRow>
            <TableCell>Modelo</TableCell>
            <TableCell>Listar todos</TableCell>
            <TableCell>Listar um</TableCell>
            <TableCell>Criar</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectModels.map((model) => (
            <TableRow key={model.value}>
              <TableCell>{model.label}</TableCell>
              {Object.keys(actionsMap).map((actionType: any) => (
                <TableCell key={actionType}>
                  {checkActionAvailable(model, actionType) ? (
                    <CheckCircleOutline color="success" />
                  ) : (
                    <HighlightOff color="error" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
