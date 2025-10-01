interface IUser {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

export interface IProfile {
  cpf: string;
  id: string;
  role: string;
  user: IUser;
}

interface ICreateUser extends IUser {
  password: string;
}

interface IUpdateUser extends Partial<IUser> {
  password?: string;
}

export type { ICreateUser, IUpdateUser, IUser };
