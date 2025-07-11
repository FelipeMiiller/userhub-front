'use client';

import { useAuth } from '@/hooks/useAuth';
import { UsersTable } from './components/users-table';
export default function AdminPage() {
  const { session, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-start mt-10 px-2 ">
        <div className="w-full max-w-5xl">
          <UsersTable />
        </div>
      </main>
    </div>
  );
}
