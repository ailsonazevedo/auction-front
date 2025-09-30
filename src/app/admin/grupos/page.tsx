import { Breadcrumb } from "@/components/@shared/BreadCrumb/BreadCrumb";
import GroupsTables from "@/components/admin/Tables/GroupsTables";
import * as React from "react";

const BCrumb = [
  {
    title: "Admin",
    to: "admin/",
  },
  {
    title: "Grupos",
  },
];

const AdminGroupsPage = async () => {
  return (
    <>
      <Breadcrumb items={BCrumb} title="Gestão de Grupos" />
      <GroupsTables />
    </>
  );
};

export default AdminGroupsPage;
