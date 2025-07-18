'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { forgotPassword } from 'src/server/actions/auth.actions';
import { handleValidationZodToast } from '@/components/utils';
import { hrefs } from 'src/config/hrefs';
import HTTP_STATUS from 'src/lib/constants/http-status-codes';
import { cn } from '@/lib/utils';

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(forgotPassword, undefined);

  useEffect(() => {
    if (!state) return;

    if (state.status === HTTP_STATUS.ACCEPTED.code) {
      toast.success('E-mail enviado com sucesso!', {
        description: 'Verifique sua caixa de entrada para as instruções de recuperação de senha.',
      });
      router.push(hrefs.auth.signIn);
      return;
    }

    if (state.error) {
      handleValidationZodToast(state.error);
    } else if (state.message) {
      toast.error('Ocorreu um erro', {
        description: state.message,
      });
    }
  }, [state, router]);

  return (
    <form action={action} className={cn('space-y-4', className)} {...props}>
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-2xl font-bold">Recuperar senha</h1>
        <p className="text-sm text-balance text-muted-foreground">
          Digite seu e-mail para recuperação de senha
        </p>
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

        <Button type="submit" data-testid="login-button" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            'Enviar link de recuperação'
          )}
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Lembrou da senha?{' '}
        <a href={hrefs.auth.signIn} className="underline underline-offset-4 hover:text-primary">
          Voltar para o login
        </a>
      </div>
    </form>
  );
}
