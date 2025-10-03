import { WrapperAuction } from "@/components/auction/Wrappers/WrapperAuction";

interface Props {
  params: {
    id: string;
  };
}

const Page = ({ params }: Props) => {
  return <WrapperAuction auctionId={params.id} />;
};

export default Page;
