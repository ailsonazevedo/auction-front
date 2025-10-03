import { IAuction } from "@/@types/auction/IAuction";
import { IProfile } from "@/@types/user/IProfile";

export interface IBid {
  auction_id: string;
  bid_amount: number;
}

export type TBid = {
  auction: IAuction;
  created_at: string;
  id: string;
  profile: IProfile;
  updated_at: string;
};
