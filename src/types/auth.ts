export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type Payload = {
  email: string;
  sub: string;
  role: Roles;
};

export type Session = {
  accessToken: string;
  refreshToken: string;
};

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
