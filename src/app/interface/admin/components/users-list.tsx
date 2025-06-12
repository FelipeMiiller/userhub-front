'use client';
import { useUsers } from '@/hooks/useUsers';
import { UsersDataTable } from '@/components/tables/users-data-table';
import { Button } from '@/components/ui/button';

export function UsersList() {
  const { users, refetch, isLoading } = useUsers();

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Usuários</h2>
        <Button onClick={() => refetch()} disabled={isLoading} className="ml-auto">
          Atualizar
        </Button>
      </div>
      <UsersDataTable data={users} />
    </div>
  );
}
