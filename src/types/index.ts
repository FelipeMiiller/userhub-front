import { Roles } from './auth';

export type User = {
  Id: string;
  Email: string;
  FirstName: string;
  LastName: string | null;
  Photo: string | null;
  Role: Roles;
  Status: boolean;
  LastLoginAt: Date | null;
  CreatedAt: Date;
  UpdatedAt: Date;
};

export type CreateUser = Omit<User, 'Id' | 'CreatedAt' | 'UpdatedAt' | 'LastLoginAt' | 'Status'>;
export type UpdateUser = Partial<Pick<User, 'FirstName' | 'LastName' | 'Photo'>> & {
  Password?: string;
};

export type Profile = Omit<User, 'CreatedAt' | 'UpdatedAt' | 'LastLoginAt'>;

export type ChangePassword = {
  password: string;
  newPassword: string;
};
