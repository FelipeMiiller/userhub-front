import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { deleteSession, getSession } from './server/actions/session.actions';
import { hrefs } from './config/hrefs';
import { decodeJwt } from 'jose';
import { Roles } from './types/auth';

// Rotas que requerem permissão de administrador
const adminRoutes = [
  '/interface/admin',

  // Adicione outras rotas administrativas aqui
];
const userRoutes = ['/interface/profile'];

export async function middleware(request: NextRequest) {
  try {
    // Verificar se existe uma sessão
    const session = await getSession();

    const currentPath = request.nextUrl.pathname;
    const isAdminRoute = adminRoutes.some((route) => currentPath.startsWith(route));
    const isUserRoute = userRoutes.some((route) => currentPath.startsWith(route));

    if (!session) {
      return NextResponse.redirect(new URL(hrefs.auth.signIn, request.nextUrl.origin));
    }

    if (isUserRoute) {
      try {
        const payload = decodeJwt(session.accessToken);
        const userRole = payload.role as Roles;

        if (userRole !== Roles.USER) {
          return NextResponse.redirect(new URL(hrefs.auth.signIn, request.nextUrl.origin));
        }
      } catch (error) {
        console.error('Erro ao verificar permissões:', error);
        await deleteSession();
        return NextResponse.redirect(new URL(hrefs.auth.signIn, request.nextUrl.origin));
      }
    }

    if (isAdminRoute) {
      try {
        const payload = decodeJwt(session.accessToken);
        const userRole = payload.role as Roles;

        if (userRole !== Roles.ADMIN) {
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

    // await deleteSession();
    return NextResponse.redirect(new URL(hrefs.auth.signIn, request.nextUrl.origin));
  }
}

export const config = {
  matcher: ['/interface', '/interface/:path*'],
};
