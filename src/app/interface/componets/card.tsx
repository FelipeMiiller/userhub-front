'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'src/components/ui/card';
import { ReactLogo } from 'src/components/react-logo';

import { Button } from '@/components/ui/button';
import { hrefs } from '@/config/hrefs';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export function UserProfileCard({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { session, invalidateAll } = useAuth();

  return (
    <Card className={cn('w-full max-w-md', className)} {...props}>
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <ReactLogo size={80} className="animate-bounce" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          {session ? `${'Bem-vindo!'}, ${session.Name}` : 'Bem-vindo!'}
        </CardTitle>
        <CardDescription className="text-center">
          {session ? (
            <>
              <span className="block font-semibold">{session.Name}</span>
              <span className="block text-sm text-muted-foreground capitalize">{session.Role}</span>
              <span className="block mt-1">{'Você está logado em sua conta'}</span>
            </>
          ) : (
            'Você está logado em sua conta'
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
      {(() => {
    switch (session?.Role) {
      case 'ADMIN':
        return (
          <div className="flex justify-center mt-2">
            <Link href={hrefs.interface.admin} className="w-full">
              <Button variant="outline" className="w-full">
                {'Ver Painel'}
              </Button>
            </Link>
          </div>
        );
      case 'USER':
        return (
          <div className="flex justify-center mt-2">
            <Link href={hrefs.interface.profile} className="w-full">
              <Button variant="outline" className="w-full">
                {'Perfil'}
              </Button>
            </Link>
          </div>
        );
      default:
        return null;
    }
  })()}


        <form className="flex justify-center" action={hrefs.auth.signOut} method="POST">
          <Button
            type="submit"
            variant="destructive"
            onClick={() => invalidateAll()}
            className="mt-2 w-full"
          >
            {'Sair'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
