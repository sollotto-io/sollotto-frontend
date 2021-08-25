export interface IUser {
  username: string;
  id: string;
}

export interface IAdminData {
  username: string;
  authenticated: boolean;
  error?: string;
}
