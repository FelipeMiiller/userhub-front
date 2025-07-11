'use client';
import { hrefs } from '@/config/hrefs';
import { QueryKeys } from '@/lib/constants/query-keys';
import { GetMe, PutUser, SignOut } from '@/services/fetch';
import { UpdateUser } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { invalidateQueries } from 'src/services/reactQuery/get-query-client';
export function useAuth() {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QueryKeys.user.root],
    queryFn: async () => await GetMe(),
    retry: 3,
  });
  const updateSession = useMutation({
    mutationFn: async ({ data }: { data: UpdateUser }) =>
      await PutUser({ id: user?.Id as string, user: data }),
    onSuccess: () => {
      invalidateQueries([QueryKeys.user.root]);
    },
  });

  const signOut = useMutation({
    mutationFn: async () => await SignOut(),
    onSuccess: () => {
      invalidateQueries();
      redirect(hrefs.home);
    },
  }).mutate;

  return {
    isLoading,
    signOut,
    session: user,
    refetch,
    error,
    updateSession,
    invalidateAll: () => invalidateQueries(),
    invalidateSession: () => invalidateQueries([QueryKeys.user.root]),
  };
}
