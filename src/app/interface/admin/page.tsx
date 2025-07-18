'use client';
import { UsersTable } from './components/users-table';
import { Button } from '@/components/ui/button';
import { useUsers } from '@/hooks/useUsers';

export default function AdminPage() {
  const { users, isLoading, refetch } = useUsers();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-start mt-10 px-2 ">
        <div className="w-full space-y-4  max-w-5xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Usuários</h2>
            <Button
              onClick={() => refetch()}
              disabled={isLoading}
              className="ml-auto"
              aria-label="Atualizar lista de usuários"
            >
              {'Atualizar'}
            </Button>
          </div>
          <UsersTable data={users} />
        </div>
      </main>
    </div>
  );
}
