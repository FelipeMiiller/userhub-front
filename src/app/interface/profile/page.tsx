'use client';

import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ColorModeSwitcher } from '@/components/color-mode-switcher';
import { useAuth } from '@/hooks/useAuth';
import { hrefs } from '@/config/hrefs';
import { EditProfileForm } from './components/edit-profile-form';

export default function ProfilePage() {
  const { session, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Usuário não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between gap-4 px-4 py-3 border-b bg-card/80">
        <div className="flex items-center gap-3">
          <Avatar>
            {session.AvatarUrl ? (
              <AvatarImage src={session.AvatarUrl} alt={session.Name} />
            ) : (
              <AvatarFallback>{session.Email?.[0]?.toUpperCase() ?? '?'}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-base font-medium text-foreground">{session.Email || '-'}</span>
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

      <main className="flex-1 flex flex-col items-center justify-start mt-10 px-4">
        <div className="w-full max-w-xl">
          {isEditing ? (
            <EditProfileForm
              user={session}
              onCancel={() => setIsEditing(false)}
              onSuccess={() => setIsEditing(false)}
            />
          ) : (
            <Card className="w-full shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Meu Perfil</CardTitle>
                <CardDescription>Visualize e gerencie suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-6">
                  <Avatar className="h-24 w-24">
                    {session.AvatarUrl ? (
                      <AvatarImage src={session.AvatarUrl} alt={session.Name} />
                    ) : (
                      <AvatarFallback className="text-2xl">
                        {session.Name?.[0]?.toUpperCase() ?? '?'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Nome</p>
                    <p className="font-medium">{session.Name}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Sobrenome</p>
                    <p className="font-medium">{session.LastName || '-'}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="font-medium">{session.Email}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Papel</p>
                    <p className="font-medium">
                      {session.Role == 'ADMIN' ? 'Administrador' : 'Usuário'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Último acesso</p>
                    <p className="font-medium">
                      {session.LastLoginAt
                        ? new Date(session.LastLoginAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Nunca'}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  Editar Perfil
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
