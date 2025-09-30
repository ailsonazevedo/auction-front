import { Breadcrumb } from "@/components/@shared/BreadCrumb/BreadCrumb";
import { UnitsTable } from "@/components/admin/Tables/UnitsTable";
import * as React from "react";

const BCrumb = [
  {
    title: "Admin",
    to: "admin/",
  },
  {
    title: "Unidades",
  },
];

const AdminCargosPage = async () => {
  return (
    <>
      <Breadcrumb items={BCrumb} title="Gestão de Unidades" />
      <UnitsTable />
    </>
  );
};

export default AdminCargosPage;
