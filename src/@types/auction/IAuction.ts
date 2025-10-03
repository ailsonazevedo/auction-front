import { IPortfolio } from "@/@types/portfolio/IPortfolio";

export interface IAuction {
  created_at: string;
  id: string;
  portfolio_id: string;
  status: string;
  updated_at: string;
}

export type TAuction = {
  portfolio: IPortfolio;
} & IAuction;
