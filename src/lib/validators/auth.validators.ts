import { z } from 'zod';

export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Nome deve ter pelo menos 2 caracteres.',
    })
    .trim(),
  lastname: z
    .string()
    .min(2, {
      message: 'Sobrenome deve ter pelo menos 2 caracteres.',
    })
    .trim(),
  email: z.string().email({ message: 'Por favor, insira um email válido.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
    .regex(/[a-zA-Z]/, {
      message: 'Senha deve conter pelo menos uma letra.',
    })
    .regex(/[0-9]/, {
      message: 'Senha deve conter pelo menos um número.',
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Senha deve conter pelo menos um caractere especial.',
    })
    .trim(),
});

export const SignInFormSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
    .regex(/[a-zA-Z]/, {
      message: 'Senha deve conter pelo menos uma letra.',
    })
    .regex(/[0-9]/, {
      message: 'Senha deve conter pelo menos um número.',
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Senha deve conter pelo menos um caractere especial.',
    })
    .trim(),
});
