import { getLoggedUserId } from "@/actions/get-logged-user-id";
import { Breadcrumb } from "@/components/@shared/BreadCrumb/BreadCrumb";
import { WrapperProfile } from "@/components/profile/Wrappers/WrapperProfile";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";

const BCrumb = [
  {
    title: "Início",
    to: "/",
  },
  {
    title: "Meu Perfil",
  },
];

const Page = async () => {
  const profileId = await getLoggedUserId();
  return (
    <Suspense
      fallback={<Skeleton height="200px" variant="rounded" width="100%" />}
    >
      <Breadcrumb items={BCrumb} title="Informações da Conta" />
      <WrapperProfile profileId={profileId} />
    </Suspense>
  );
};

export default Page;
