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
