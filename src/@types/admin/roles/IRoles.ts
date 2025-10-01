import { TPolicies } from "@/@types/auth/IPermission";

interface IRole {
  name: string;
  policies: TPolicies[];
}

interface TRole extends IRole {
  _id: string;
}

export type { IRole, TRole };
