export interface IPolicies {
  __v?: number;
  actions: string[];
  effect: string;
  name: string;
  resources: string[];
  unit?: string;
}

export type TPolicies = { _id: string } & IPolicies;
