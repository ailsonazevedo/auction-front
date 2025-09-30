import { TRole } from "../admin/roles/IRoles";
import { TPolicies } from "../auth/IPolicies";

interface IUser {
  _id: string;
  dateOfBirth: string;
  docId: string;
  email: string;
  exp: number;
  groups: string[];
  iat: number;
  isTwoFactorAuthenticationEnabled?: boolean;
  name: string;
  organization: string;
  policies: TPolicies[];
  profilePhoto: string;
  roles: TRole[];
  sub: string;
  twoFactorAuthentication: boolean;
  unit: string;
}

interface ICreateUser extends IUser {
  password: string;
}

interface IUpdateUser extends Partial<IUser> {
  password?: string;
}

export type { ICreateUser, IUpdateUser, IUser };
