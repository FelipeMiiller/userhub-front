import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { deleteSession, getSession, refreshToken } from './server/actions/session.actions';
import { hrefs } from './config/hrefs';
import { decodeJwt } from 'jose';
import { Roles } from './types/auth';

import { logError } from './server/logger';

// Rotas que requerem permissão de administrador
const adminRoutes = [
  '/interface/admin',
  // Adicione outras rotas administrativas aqui
];

export async function middleware(request: NextRequest) {
  try {
    // Verificar se existe uma sessão
    const session = await getSession();

    if (!session?.refreshToken) {
      await deleteSession();
      return NextResponse.redirect(new URL(hrefs.auth.signIn, request.nextUrl.origin));
    }


    if (!session?.accessToken) {
      try {
        const accessToken = await refreshToken(session.refreshToken);
        if (!accessToken) {
          await deleteSession();
          return NextResponse.redirect(new URL(hrefs.auth.signIn, request.nextUrl.origin));
        }
      } catch (error) {
        console.error('Erro ao renovar token:', error);
        await deleteSession();
        return NextResponse.redirect(new URL(hrefs.auth.signIn, request.nextUrl.origin));
      }
    }


    const currentPath = request.nextUrl.pathname;
    const isAdminRoute = adminRoutes.some((route) => currentPath.startsWith(route));

    if (isAdminRoute) {
      try {
        // Decodificar o token para verificar o papel do usuário
        const payload = decodeJwt(session.accessToken);
        const userRole = payload.role as Roles;

        if (userRole !== Roles.ADMIN) {
          // Redirecionar usuários comuns para a página de perfil
          console.log('Acesso negado: usuário não é administrador');
          return NextResponse.redirect(new URL(hrefs.interface.profile, request.nextUrl.origin));
        }
      } catch (error) {
        console.error('Erro ao verificar permissões:', error);
        await deleteSession();
        return NextResponse.redirect(new URL(hrefs.auth.signIn, request.nextUrl.origin));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // Tratamento global de erros
    console.error('Erro no middleware:', error);
    logError('Erro no middleware:', error);
    // await deleteSession();
    return NextResponse.redirect(new URL(hrefs.auth.signIn, request.nextUrl.origin));
  }
}

export const config = {
  matcher: ['/interface', '/interface/:path*'],
};
