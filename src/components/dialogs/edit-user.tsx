'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUsers } from '@/hooks/useUsers';
import { UpdateUser, User } from '@/types';
import { cleanObject } from '@/lib/utils/clean';
import { EditUserSchema, EditUserFormValues } from '@/lib/validators/users.validators';

type EditUserFormDialogProps = {
  user: User;
  trigger?: React.ReactNode;
};

export function EditUser({ user, trigger }: EditUserFormDialogProps) {
  const { updateUser } = useUsers();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserFormValues>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      Name: user.Name,
      LastName: user.LastName || '',
      AvatarUrl: user.AvatarUrl || '',
      Password: '',
      Role: user.Role,
    },
  });

  const onSubmit = async (data: EditUserFormValues) => {
    setIsSubmitting(true);
    try {
      const userData = {
        ...cleanObject(data),
      } as UpdateUser;

      await updateUser.mutateAsync({ id: user.Id, data: userData });
      reset();
      window.document.getElementById('edit-user-dialog')?.click();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger id={`edit-user-dialog-${user.Id}`} asChild>
        {trigger || <Button variant="outline">Editar</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>Atualize os dados do usuário {user.Name}.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
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

          <div className="grid gap-2">
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

          <div className="grid gap-2">
            <Label htmlFor="Password">Senha</Label>
            <Input
              id="Password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
              {...register('Password')}
              className={errors.Password ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.Password && (
              <p className="text-sm font-medium text-destructive">{errors.Password.message}</p>
            )}
          </div>

          <div className="grid gap-2">
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
          <div className="grid gap-2">
            <Label htmlFor="Role">Perfil</Label>
            <select
              id="Role"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register('Role')}
            >
              <option value="USER">Usuário</option>
              <option value="ADMIN">Administrador</option>
            </select>
            {errors.Role && (
              <p className="text-sm font-medium text-destructive">{errors.Role.message}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
