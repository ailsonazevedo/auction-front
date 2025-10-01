import { TPolicies } from "@/@types/auth/IPermission";

interface IGroup {
  __v: number;
  _id: string;
  name: string;
  policies: TPolicies[];
  unit: string;
}

export type { IGroup };
