import { routesBackend } from 'src/config/routes';

import { toast } from 'sonner';
import { hrefs } from 'src/config/hrefs';
import { CACHE_TAGS } from './cache-keys';
import { Cookie_Keys } from '@/lib/constants/cookies-keys';
import Cookies from 'js-cookie';
import { ChangePassword as ChangePasswordType, CreateUser, UpdateUser, User } from '@/types';
import { envPublic } from '@/config/env.public';

export async function fetchClient<T>(args: { input: URL | RequestInfo; init?: RequestInit }) {
  const headers = new Headers(args.init?.headers || {});
  try {
    const token = Cookies.get(Cookie_Keys.token);
    if (!token) {
      throw new Error('Erro na requisição HTTP: token não encontrado');
    }

    headers.set('Authorization', `bearer ${token}`);
  } catch {
    toast('Erro na requisição HTTP: token não encontrado');
    window.location.href = hrefs.auth.signIn;
  }
  const initWithAuth: RequestInit = { ...args.init, headers };

  try {
    const response = await fetch(args.input, initWithAuth);
    if (!response.ok) {
      const status = response.status;

      switch (status) {
        case 400:
          toast.error('Requisição Inválida', {
            description: 'Os dados enviados são inválidos. Verifique e tente novamente.',
          });
          console.error(`Erro 400: Requisição inválida`);
          break;
        case 401:
          window.location.href = hrefs.auth.signIn;
          console.error(`Não autenticado: ${status}`);
          break;
        case 403:
          toast.error('Acesso Negado', {
            description: 'Você não tem permissão para acessar este recurso.',
          });
          console.error(`Acesso negado: ${status}`);
          break;
        case 404:
          toast.error('Não Encontrado', {
            description: 'O recurso solicitado não foi encontrado.',
          });
          console.error(`Recurso não encontrado: ${status}`);
          break;

        case 409:
          toast.error('Conflito', {
            description: 'Já existe um recurso com os mesmos dados. Verifique e tente novamente.',
          });
          console.error(`Conflito de dados: ${status}`);
          break;
        case 422:
          toast.error('Erro de Validação', {
            description: 'Os dados enviados são inválidos. Verifique e tente novamente.',
          });
          console.error(`Erro de validação: ${status}`);
          break;

        case 429:
          toast.error('Muitas Tentativas', {
            description: 'Você excedeu o limite de tentativas. Tente novamente mais tarde.',
          });
          console.error(`Muitas tentativas: ${status}`);
          break;

        case 500:
          toast.error('Erro do Servidor', {
            description: 'Ocorreu um erro no servidor. Tente novamente mais tarde.',
          });
          console.error(`Erro interno do servidor: ${status}`);
          break;
        default:
          toast.error('Erro na Requisição', {
            description: `Ocorreu um erro (${status}). Tente novamente mais tarde.`,
          });
          console.error(`Erro na requisição HTTP: ${status}`);
      }
    }

    const responseData = await response.json();
    return responseData.data as unknown as T;
  } catch (error) {
    if (!(error instanceof Error && error.message.startsWith('Erro'))) {
      console.error('Erro de rede ou desconhecido:', error);
      toast('Erro de Conexão', {
        description: 'Não foi possível conectar ao servidor. Verifique sua conexão.',
      });
    }
    console.error('Erro na requisição HTTP:', error);
    throw error;
  }
}

export const SignOut = async () => {
  await fetchClient({
    input: hrefs.auth.signOut,
    init: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
  });
  return true;
};

export const GetMe = async () =>
  await fetchClient<User>({
    input: routesBackend.auth.me,
    init: { method: 'GET' },
  });

export const GetUsers = async () =>
  await fetchClient<User[]>({
    input: routesBackend.users.getAll,
    init: {
      method: 'GET',
      next: { tags: [CACHE_TAGS.USERS], revalidate: envPublic.revalidateSeconds },
    },
  });

export const PostUser = async (user: CreateUser): Promise<User> =>
  await fetchClient<User>({
    input: routesBackend.users.create,
    init: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    },
  });

export const PutUser = async ({ id, user }: { id: string; user: UpdateUser }): Promise<User> =>
  await fetchClient<User>({
    input: routesBackend.users.update.replace(':id', id),
    init: {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    },
  });

export const DeleteUser = async (userId: string) => {
  await fetchClient({
    input: routesBackend.users.delete.replace(':id', userId),
    init: {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    },
  });
  return true;
};

export const GetInactiveUsers = async (days: number) =>
  await fetchClient<User[]>({
    input: routesBackend.users.inactive.replace(':days', days.toString()),
    init: {
      method: 'GET',
      next: { tags: [CACHE_TAGS.USERS], revalidate: envPublic.revalidateSeconds },
    },
  });
