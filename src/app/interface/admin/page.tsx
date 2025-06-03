'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ColorModeSwitcher } from '@/components/color-mode-switcher';

import { useAuth } from '@/hooks/useAuth';
import { hrefs } from '@/config/hrefs';
import { UsersList } from './components/users-list';

export default function AdminPage() {
  const { session, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between gap-4 px-4 py-3 border-b bg-card/80">
        <div className="flex items-center gap-3">
          <Avatar>
            {session?.AvatarUrl ? (
              <AvatarImage src={session.AvatarUrl} alt={session.Name} />
            ) : (
              <AvatarFallback>{session?.Email?.[0]?.toUpperCase() ?? '?'}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-base font-medium text-foreground">
            {isLoading ? 'Carregando...' : session?.Email || '-'}
          </span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <ColorModeSwitcher />
          <form action={hrefs.auth.signOut} method="POST">
            <Button type="submit" variant="outline" size="sm">
              Sair
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-start mt-10 px-2 ">
        <div className="w-full max-w-5xl">
          <UsersList />
        </div>
      </main>
    </div>
  );
}
