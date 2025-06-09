
import { envPublic } from './env.public';

export const routesBackend = {
  auth: {
    google: {
      login: `${envPublic.backendUrl}/auth/google/signin`,
      callback: `${envPublic.appUrl}/api/auth/google/callback`,
    },
    signin: `${envPublic.backendUrl}/auth/signin`,
    signout: `${envPublic.backendUrl}/auth/signout`,
    signup: `${envPublic.backendUrl}/auth/signup`,
    refreshToken: `${envPublic.backendUrl}/auth/refreshToken`,
    forgotPassword: `${envPublic.backendUrl}/auth/forgot-password`,
    me: `${envPublic.backendUrl}/auth/me`,
  },

  users: {
    create: `${envPublic.backendUrl}/users`,
    getAll: `${envPublic.backendUrl}/users`,
    getOne: `${envPublic.backendUrl}/users/:id`,
    update: `${envPublic.backendUrl}/users/:id`,
    delete: `${envPublic.backendUrl}/users/:id`,
    inactive: `${envPublic.backendUrl}/users/inactive/:days`,
  },
};
