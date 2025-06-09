'use client';
import { cn } from 'src/lib/utils';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';

import { Icons } from 'src/components/icons';

import { useActionState } from 'react';
import { signIn } from 'src/server/actions/auth.actions';
import { toast } from 'sonner';
import { routesBackend } from 'src/config/routes';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { hrefs } from 'src/config/hrefs';
import { redirect } from 'next/navigation';
import HTTP_STATUS from 'src/lib/constants/http-status-codes';
import { handleValidationZodToast } from '@/components/utils';
import { invalidateQueries } from '@/services/reactQuery/get-query-client';
import { QueryKeys } from '@/lib/constants/query-keys';

export function SignInForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const [state, action, isPending] = useActionState(signIn, undefined);

  useEffect(() => {
    invalidateQueries([QueryKeys.user.root]);
    if (!state) return;

    switch (state.status) {
      case HTTP_STATUS.OK.code:
        redirect(hrefs.interface.index);

      case HTTP_STATUS.NOT_FOUND.code:
        toast.error('Usuário não encontrado');
        redirect(hrefs.auth.signUp);

      case HTTP_STATUS.CONFLICT.code:
        toast.error('Senha não encontrada entre com Google');
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
    <form action={action} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-2xl font-bold">Entrar</h1>
        <p className="text-sm text-balance text-muted-foreground">Faça login para continuar</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            required
            disabled={isPending}
            aria-invalid={state?.error?.email ? 'true' : 'false'}
            aria-describedby="email-error"
            className={cn({
              'border-destructive focus-visible:ring-destructive': state?.error?.email,
            })}
          />
          {state?.error?.email && (
            <p id="email-error" className="text-sm font-medium text-destructive">
              {state.error.email.join(', ')}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground"
              aria-disabled={isPending}
            >
              Esqueceu a senha?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
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
        <Button type="submit" data-testid="login-button" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Entrar
            </>
          ) : (
            'Entrar'
          )}
        </Button>
        <div className="relative">
          <div className="flex absolute inset-0 items-center">
            <span className="w-full border-t" />
          </div>
          <div className="flex relative justify-center text-xs uppercase">
            <span className="px-2 bg-background text-muted-foreground">Ou continue com</span>
          </div>
        </div>
        <Button variant="outline" type="button" className="w-full" disabled={isPending} asChild>
          <a
            href={routesBackend.auth.google.login}
            className="flex gap-2 justify-center items-center"
          >
            <Icons.google className="w-4 h-4" />
            Google
          </a>
        </Button>
      </div>
      <div className="text-sm text-center">
        Não tem uma conta?{' '}
        <a href={hrefs.auth.signUp} className="underline underline-offset-4">
          Cadastre-se
        </a>
      </div>
    </form>
  );
}
