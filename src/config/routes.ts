import { envPrivate } from './env.private';
import { envPublic } from './env.public';

export const routesBackend = {
  auth: {
    google: {
      login: `${envPrivate.backendUrl}/auth/google/signin`,
      callback: `${envPublic.appUrl}/api/auth/google/callback`,
    },
    signin: `${envPrivate.backendUrl}/auth/signin`,
    signout: `${envPrivate.backendUrl}/auth/signout`,
    signup: `${envPrivate.backendUrl}/auth/signup`,
    refresh: `${envPrivate.backendUrl}/auth/refresh`,
    forgotPassword: `${envPrivate.backendUrl}/auth/forgot-password`,
    me: `${envPrivate.backendUrl}/auth/me`,
  },

  users: {
    create: `${envPrivate.backendUrl}/users`,
    getAll: `${envPrivate.backendUrl}/users`,
    getOne: `${envPrivate.backendUrl}/users/:id`,
    update: `${envPrivate.backendUrl}/users/:id`,
    delete: `${envPrivate.backendUrl}/users/:id`,
  },
};
