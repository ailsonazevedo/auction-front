export interface IPortfolio {
  auction_end: string;
  description: string;
  minimum_bid: number;
  name: string;
  total_amount: number;
}

export type TPortfolio = {
  id: string;
} & IPortfolio;
