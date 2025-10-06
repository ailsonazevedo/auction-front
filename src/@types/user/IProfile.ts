interface IUser {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

interface IProfile {
  cpf: string;
  id: string;
  role: string;
  user: IUser;
}

interface IUpdateProfile {
  cpf: string;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
  role: string;
}

export type { IProfile, IUpdateProfile };
