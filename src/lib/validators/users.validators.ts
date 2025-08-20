import { Roles } from '@/types/auth';
import { z } from 'zod';

export const CreateUserSchema = z.object({
  FirstName: z
    .string()
    .min(3, {
      message: 'Nome deve ter pelo menos 3 caracteres.',
    })
    .trim(),
  LastName: z
    .string()
    .min(2, {
      message: 'Sobrenome deve ter pelo menos 2 caracteres.',
    })
    .trim(),
  Email: z.string().email({ message: 'Por favor, insira um email válido.' }).trim(),
  Password: z
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
 Photo: z
    .string()
    .trim()
    .refine((val) => !val || /^https?:\/\/.+\..+/.test(val), { message: 'URL inválida' })
    .optional(),
  Role: z.enum(['ADMIN', 'USER'], {
    required_error: 'Por favor selecione um perfil',
  }),
});

// Tipo para o formulário
export type CreateUserFormValues = z.infer<typeof CreateUserSchema>;

// Schema de validação para edição de usuário
export const EditUserSchema = z.object({
  FirstName: z
    .string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'Nome deve ter no máximo 50 caracteres' })
    .trim()
    .optional(),
  LastName: z
    .string()
    .min(2, { message: 'Sobrenome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'Sobrenome deve ter no máximo 50 caracteres' })
    .trim()
    .optional(),
  Photo: z
    .string()
    .trim()
    .refine((val) => !val || /^https?:\/\/.+\..+/.test(val), { message: 'URL inválida' })
    .optional(),
  Password: z
    .string()
    .trim()
    .refine(
      (value) => {
        // Se a string estiver vazia, ignora as validações
        return value === '' || value.length >= 8;
      },
      { message: 'Senha deve ter pelo menos 8 caracteres' },
    )
    .refine(
      (value) => {
        // Se a string estiver vazia, ignora as validações
        return value === '' || /[a-zA-Z]/.test(value);
      },
      { message: 'Senha deve conter pelo menos uma letra.' },
    )
    .refine(
      (value) => {
        // Se a string estiver vazia, ignora as validações
        return value === '' || /[0-9]/.test(value);
      },
      { message: 'Senha deve conter pelo menos um número.' },
    )
    .refine(
      (value) => {
        // Se a string estiver vazia, ignora as validações
        return value === '' || /[^a-zA-Z0-9]/.test(value);
      },
      { message: 'Senha deve conter pelo menos um caractere especial.' },
    ),
  Role: z
    .enum(['ADMIN', 'USER'], {
      required_error: 'Por favor selecione um perfil',
    })
    .optional(),
});

export type EditUserFormValues = z.infer<typeof EditUserSchema>;

export const profileFormSchema = z.object({
  FirstName: z
    .string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'Nome deve ter no máximo 50 caracteres' })
    .trim()
    .optional(),
  LastName: z
    .string()
    .min(2, { message: 'Sobrenome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'Sobrenome deve ter no máximo 50 caracteres' })
    .trim()
    .optional(),
  Photo: z
    .string()
    .trim()
    .refine((val) => !val || /^https?:\/\/.+\..+/.test(val), { message: 'URL inválida' })
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
