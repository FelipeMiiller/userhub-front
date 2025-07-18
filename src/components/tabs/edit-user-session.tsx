import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { ProfileFormValues, profileFormSchema } from '@/lib/validators/users.validators';
import { PutUser } from '@/services/fetch';
import { Profile, UpdateUser } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { cleanObject } from '@/lib/utils/clean';

import { ChangePassword } from '@/server/actions/auth.actions';
import HTTP_STATUS from 'src/lib/constants/http-status-codes';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { handleValidationZodToast } from '../utils';

export function EditUserSession() {
  const { session, refetch } = useAuth();

  if (!session) {
    return null;
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Dados Pessoais</TabsTrigger>
          <TabsTrigger value="password">Alterar Senha</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <TabContentAccount user={session} refetch={refetch} />
        </TabsContent>
        <TabsContent value="password">
          <TabContentPassword email={session?.Email} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TabContentAccount({ user, refetch }: { user: Profile; refetch: () => void }) {
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      Name: user.Name,
      LastName: user.LastName || '',
      AvatarUrl: user.AvatarUrl || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsPending(true);
    try {
      const userData = {
        ...cleanObject(data),
      } as UpdateUser;
      // Enviar atualização para a API
      await PutUser({ id: user.Id as string, user: userData });

      refetch();
      reset();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);

      toast.error('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados Pessoais</CardTitle>
        <CardDescription>
          Faça alterações em seus dados aqui. Clique em salvar quando terminar.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="Name">Nome</Label>
            <Input
              id="Name"
              placeholder="Nome do usuário"
              autoComplete="given-name"
              {...register('Name')}
              className={errors.Name ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.Name && (
              <p className="text-sm font-medium text-destructive">{errors.Name.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="LastName">Sobrenome</Label>
            <Input
              id="LastName"
              placeholder="Sobrenome do usuário"
              autoComplete="family-name"
              {...register('LastName')}
              className={errors.LastName ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.LastName && (
              <p className="text-sm font-medium text-destructive">{errors.LastName.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="AvatarUrl">URL do Avatar</Label>
            <Input
              id="AvatarUrl"
              placeholder="https://exemplo.com/avatar.jpg"
              {...register('AvatarUrl')}
              className={
                errors.AvatarUrl ? 'border-destructive focus-visible:ring-destructive' : ''
              }
            />
            {errors.AvatarUrl && (
              <p className="text-sm font-medium text-destructive">{errors.AvatarUrl.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Alterando...
              </>
            ) : (
              'Alterar dados'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function TabContentPassword({ email }: { email: string }) {
  const [state, action, isPending] = useActionState(ChangePassword, undefined);

  useEffect(() => {
    if (!state) return;

    switch (state.status) {
      case HTTP_STATUS.ACCEPTED.code:
        toast.success('Senha alterada com sucesso');
        break;
      case HTTP_STATUS.CONFLICT.code:
        toast.error('Senha não encontrada ');
        break;
      case HTTP_STATUS.UNAUTHORIZED.code:
        toast.error('Credenciais inválidas');
        break;
    }
    if (state.message && !state.error) {
      toast.error(state.message);
    }

    if (state.error) {
      handleValidationZodToast(state.error);
      return;
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Senha</CardTitle>
        <CardDescription>
          Altere sua senha aqui. Depois de salvar, você será deslogado.
        </CardDescription>
      </CardHeader>
      <form action={action} className="grid gap-2">
        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="password">Senha atual</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              disabled={isPending}
              aria-invalid={state?.error?.password ? 'true' : 'false'}
              aria-describedby="password-error"
              className={cn({
                'border-destructive focus-visible:ring-destructive': state?.error?.password,
              })}
            />
            {state?.error?.password && (
              <p id="password-error" className="text-sm font-medium text-destructive">
                {state.error.password.join(', ')}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="newPassword">Nova senha</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              disabled={isPending}
              aria-invalid={state?.error?.newPassword ? 'true' : 'false'}
              aria-describedby="newPassword-error"
              className={cn({
                'border-destructive focus-visible:ring-destructive': state?.error?.newPassword,
              })}
            />
            {state?.error?.newPassword && (
              <p id="newPassword-error" className="text-sm font-medium text-destructive">
                {state.error.newPassword.join(', ')}
              </p>
            )}
          </div>
          <Input hidden id="email" name="email" type="email" required defaultValue={email} />
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Alterando...
              </>
            ) : (
              'Alterar senha'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
