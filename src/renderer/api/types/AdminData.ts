export interface IUser {
  username: string;
  id: string;
}

export interface IAdminData {
  user: IUser;
  authenticated: boolean;
}
