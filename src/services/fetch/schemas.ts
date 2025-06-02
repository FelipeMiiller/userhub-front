// Exemplo de uso com schema (defina seus schemas conforme sua tipagem real)
import { Roles } from 'src/types/auth';
import { z } from 'zod';
export const UserSchema = z.object({
  Email: z.string(),
  Id: z.string(),
  Name: z.string(),
  LastName: z.string().nullable(),
  AvatarUrl: z.string().nullable(),
  Role: z.nativeEnum(Roles),
  Status: z.boolean(),
  LastLoginAt: z.date().nullable(),
  CreatedAt: z.date(),
  UpdatedAt: z.date(),
});
