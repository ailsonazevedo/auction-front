import { WrapperAuction } from "@/components/auction/Wrappers/WrapperAuction";

interface Props {
  params: {
    id: string;
  };
}

const Page = ({ params }: Props) => {
  return <WrapperAuction portfolioId={params.id} />;
};

export default Page;
