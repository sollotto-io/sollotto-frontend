export interface IAdminUser {
  username: string;
  admin: boolean;
  id: string;
}

export interface IAdminData {
  username: string;
  authenticated: boolean;
  authErr: boolean;
  error?: string;
  admin: boolean;
}
