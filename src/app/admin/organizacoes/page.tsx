import { Breadcrumb } from "@/components/@shared/BreadCrumb/BreadCrumb";
import { OrganizationsTable } from "@/components/admin/Tables/OrganizationsTable";
import * as React from "react";

const BCrumb = [
  {
    title: "Admin",
    to: "admin/",
  },
  {
    title: "Organizações",
  },
];

const AdminOrganizationsPage = async () => {
  return (
    <>
      <Breadcrumb items={BCrumb} title="Gestão de Organizações" />
      <OrganizationsTable />
    </>
  );
};

export default AdminOrganizationsPage;
