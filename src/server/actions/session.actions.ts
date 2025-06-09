'use server';
import { Session } from 'src/types/auth';
import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';
import { Cookie_Keys } from 'src/lib/constants/cookies-keys';
import { routesBackend } from 'src/config/routes';
import { UnauthorizedException } from 'src/lib/exceptions/exceptions';

export async function createSession({ accessToken, refreshToken }: Session): Promise<void> {
  await setTokenCookie({ token: accessToken });
  await setRefreshTokenCookie({ token: refreshToken });
}

export async function deleteSession() {
  try {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get(Cookie_Keys.token)?.value;
    console.log('accessToken', accessToken);
    await fetch(routesBackend.auth.signout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${accessToken}`,
      },
    }).catch(() => {
      console.log('Erro ao deslogar');
    });
    // Limpar cookies
    cookiesStore.delete(Cookie_Keys.token);
    cookiesStore.delete(Cookie_Keys.refreshToken);
  } catch {}
}

export const revalidateToken = async (RefreshToken: string) => {
  try {
    const response = await fetch(routesBackend.auth.refreshToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: RefreshToken,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = errorData.message
        ? { message: errorData.message as string }
        : UnauthorizedException.INVALID_TOKEN;
      throw new UnauthorizedException(error);
    }

    const responseData = await response.json();
    if (!responseData.data || !responseData.data.accessToken) {
      console.error('[revalidateToken] Invalid response structure from backend:', responseData);
      throw new Error('Invalid response structure from backend: accessToken missing.');
    }
    const { accessToken } = responseData.data;

    await setTokenCookie({ token: accessToken });
    return accessToken;
  } catch (error) {
    console.error('[revalidateToken] Error during token revalidation:', error);
    await deleteSession();
  }
};
export async function getSession(): Promise<Session> {
  const cookiesStore = await cookies();
  let accessToken = cookiesStore.get(Cookie_Keys.token)?.value;
  const refreshToken = cookiesStore.get(Cookie_Keys.refreshToken)?.value;

  if (!accessToken && refreshToken) {
    try {
      accessToken = await revalidateToken(refreshToken);
    } catch (revalidationError) {
      console.error(
        '[getSession] Revalidation failed. Error propagated from revalidateToken:',
        revalidationError,
      );
      deleteSession();
    }
  }

  if (!accessToken || !refreshToken) {
    const currentAccessToken = cookiesStore.get(Cookie_Keys.token)?.value;
    const currentRefreshToken = cookiesStore.get(Cookie_Keys.refreshToken)?.value;
    if (currentAccessToken || currentRefreshToken) {
      await deleteSession();
    }
    throw new UnauthorizedException(UnauthorizedException.INVALID_TOKEN);
  }

  return { accessToken, refreshToken };
}

export async function setTokenCookie({ token }: { token: string }) {
  if (!token) {
    throw new UnauthorizedException(UnauthorizedException.INVALID_TOKEN);
  }

  const Payload = decodeJwt(token);
  if (!Payload.exp) {
    throw new UnauthorizedException(UnauthorizedException.INVALID_TOKEN);
  }
  const expiresDate = new Date(Payload.exp * 1000);

  (await cookies()).set(Cookie_Keys.token, token, {
    expires: expiresDate,
    path: '/',
    sameSite: 'lax',

    secure: process.env.NODE_ENV === 'production',
  });
}

export async function setRefreshTokenCookie({ token }: { token: string }) {
  if (!token) {
    throw new UnauthorizedException(UnauthorizedException.INVALID_TOKEN);
  }

  const Payload = decodeJwt(token);
  if (!Payload.exp) {
    throw new UnauthorizedException(UnauthorizedException.INVALID_TOKEN);
  }
  const expiresDate = new Date(Payload.exp * 1000);

  (await cookies()).set(Cookie_Keys.refreshToken, token, {
    expires: expiresDate,
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function getTokenCookie(key: string): Promise<string> {
  const cookiesStore = await cookies();

  const token = cookiesStore.get(key)?.value;

  if (!token) {
    throw new UnauthorizedException(UnauthorizedException.INVALID_TOKEN);
  }

  return token;
}
