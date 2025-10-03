import { TPortfolio } from "@/@types/portfolio/IPortfolio";

export interface IAuction {
  created_at: string;
  id: string;
  portfolio_id: string;
  status: string;
  updated_at: string;
}

export type TAuction = {
  portfolio: TPortfolio;
} & IAuction;

export type TCreateAuction = Pick<IAuction, "portfolio_id" | "status">;
