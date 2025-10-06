import { NotAuthorized } from "@/components/@shared/NotAuthorized/NotAuthorized";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Não autorizado",
};
const page = async () => {
  return <NotAuthorized />;
};
export default page;
