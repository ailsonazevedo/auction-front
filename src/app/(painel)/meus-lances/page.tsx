import { WrapperBids } from "@/components/bid/Wrappers/WrapperBids";
import { hasAuth } from "@/utils/auth/auth";
import { Box } from "@mui/material";

const Page = async () => {
  await hasAuth(["view_own_bid_history"]);

  return (
    <Box>
      <h1>Meus lances</h1>
      <WrapperBids />
    </Box>
  );
};

export default Page;
