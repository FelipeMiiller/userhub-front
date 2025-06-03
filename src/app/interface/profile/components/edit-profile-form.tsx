'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

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

import { User, UpdateUser } from '@/types';
import { PutUser } from '@/services/fetch';
import { cleanObject } from '@/lib/utils/clean';
import { useAuth } from '@/hooks/useAuth';
import { ProfileFormValues, profileFormSchema } from '@/lib/validators/users.validators';

interface EditProfileFormProps {
  user: User;
  onCancel: () => void;
  onSuccess: () => void;
}

export function EditProfileForm({ user, onCancel, onSuccess }: EditProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { invalidateSession } = useAuth();

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
      Password: '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      // Preparar dados para atualização
      const userData = {
        ...cleanObject(data),
      } as UpdateUser;

      // Enviar atualização para a API
      await PutUser({ id: user.Id, user: userData });

      invalidateSession();
      toast.success('Perfil atualizado com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Editar Perfil</CardTitle>
        <CardDescription>Atualize suas informações pessoais</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CardContent className="space-y-4">
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
            <Label htmlFor="Password">Nova Senha (opcional)</Label>
            <Input
              id="Password"
              type="password"
              placeholder="Deixe em branco para manter a senha atual"
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
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
