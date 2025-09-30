import { Breadcrumb } from "@/components/@shared/BreadCrumb/BreadCrumb";
import { PoliciesTable } from "@/components/admin/Tables/PoliciesTable";
import * as React from "react";

const BCrumb = [
  {
    title: "Admin",
    to: "admin/",
  },
  {
    title: "Políticas",
  },
];

const AdminPoliciesPage = async () => {
  return (
    <>
      <Breadcrumb items={BCrumb} title="Gestão de Políticas" />
      <PoliciesTable />
    </>
  );
};

export default AdminPoliciesPage;
