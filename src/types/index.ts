import { Roles } from './auth';

export type User = {
  Id: string;
  Email: string;
  Name: string;
  LastName: string | null;
  AvatarUrl: string | null;
  Role: Roles;
  Status: boolean;
  LastLoginAt: Date | null;
  CreatedAt: Date;
  UpdatedAt: Date;
};

export type CreateUser = Omit<User, 'Id' | 'CreatedAt' | 'UpdatedAt' | 'LastLoginAt' | 'Status'>;
export type UpdateUser = Partial<Pick<User, 'Name' | 'LastName' | 'AvatarUrl'>> & {
  Password?: string;
};
