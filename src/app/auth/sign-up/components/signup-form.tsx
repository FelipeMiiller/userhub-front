'use client';
import { cn } from 'src/lib/utils';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import { Icons } from 'src/components/icons';
import { hrefs } from 'src/config/hrefs';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { signUp } from 'src/server/actions/auth.actions';
import { toast } from 'sonner';
import { routesBackend } from 'src/config/routes';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import HTTP_STATUS from 'src/lib/constants/http-status-codes';
import { handleValidationZodToast } from '@/components/utils';

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const [state, action, isPending] = useActionState(signUp, undefined);

  useEffect(() => {
    if (!state) return;

    if (state.status == HTTP_STATUS.CONFLICT.code) {
      toast.error('Email já cadastrado');
      redirect(hrefs.auth.signIn);
    }
    if (state.message && !state.error) {
      toast.error(state.message);
    }

    if (state.error) {
      handleValidationZodToast(state.error);
    }
  }, [state]);
  return (
    <form action={action} className={cn('flex flex-col gap-6', className)} {...props}>
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-2xl font-bold">Cadastrar</h1>
        <p className="text-sm text-balance text-muted-foreground">Faça login para continuar</p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Nome"
            required
            disabled={isPending}
            aria-invalid={state?.error?.name ? 'true' : 'false'}
            aria-describedby="name-error"
            className={cn({
              'border-destructive focus-visible:ring-destructive': state?.error?.name,
            })}
          />
          {state?.error?.name && (
            <p id="name-error" className="text-sm font-medium text-destructive">
              {state.error.name.join(', ')}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastname">Sobrenome</Label>
          <Input
            id="lastname"
            type="text"
            name="lastname"
            placeholder="Sobrenome"
            required
            disabled={isPending}
            aria-invalid={state?.error?.lastname ? 'true' : 'false'}
            aria-describedby="lastname-error"
            className={cn({
              'border-destructive focus-visible:ring-destructive': state?.error?.lastname,
            })}
          />
          {state?.error?.lastname && (
            <p id="lastname-error" className="text-sm font-medium text-destructive">
              {state.error.lastname.join(', ')}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
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
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Senha"
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

        <Button type="submit" className="mt-2 w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Cadastrar
            </>
          ) : (
            'Cadastrar'
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
        Já tem uma conta?{' '}
        <Link href={hrefs.auth.signIn} className="underline underline-offset-4 hover:text-primary">
          Entrar
        </Link>
      </div>
    </form>
  );
}
