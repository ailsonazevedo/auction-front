import { Breadcrumb } from "@/components/@shared/BreadCrumb/BreadCrumb";
import { UsersTable } from "@/components/admin/Tables/UsersTable";
import * as React from "react";

const BCrumb = [
  {
    title: "Admin",
    to: "admin/",
  },
  {
    title: "Usuários",
  },
];

const AdminUsersPage = async () => {
  return (
    <>
      <Breadcrumb items={BCrumb} title="Gestão de Usuários" />
      <UsersTable />
    </>
  );
};

export default AdminUsersPage;
