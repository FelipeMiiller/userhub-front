'use client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ColorModeSwitcher } from '@/components/color-mode-switcher';
import { useAuth } from '@/hooks/useAuth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGlobalDialog } from '@/hooks/use-global-dialog';
import { EditUserSession } from '@/components/tabs/edit-user-session';
export default function Header() {
  const { session, isLoading, signOut } = useAuth();
  const { open: openDialog } = useGlobalDialog();
  return (
    <header className="flex items-center justify-between gap-4 px-4 py-3 border-b bg-card/80">
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              {session?.AvatarUrl ? (
                <AvatarImage src={session.AvatarUrl} alt={session.Name} />
              ) : (
                <AvatarFallback>{session?.Email?.[0]?.toUpperCase() ?? '?'}</AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Sessão</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={() =>
                  openDialog({
                    title: 'Editar Perfil',
                    description: 'Editar Perfil',
                    children: <EditUserSession />,
                  })
                }
              >
                Perfil
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem onSelect={() => signOut()}>
                Sair
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="text-base font-medium text-foreground">
          {isLoading ? 'Carregando...' : session?.Email || '-'}
        </span>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <ColorModeSwitcher />
      </div>
    </header>
  );
}
