'use client';
import { QueryKeys } from '@/lib/constants/query-keys';
import { GetMe, PutUser } from '@/services/fetch';
import { UpdateUser } from '@/types';

import { useMutation, useQuery } from '@tanstack/react-query';
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

  return {
    isLoading,
    session: user,
    refetch,
    error,
    updateSession,
    invalidateAll: () => invalidateQueries(),
    invalidateSession: () => invalidateQueries([QueryKeys.user.root]),
  };
}
