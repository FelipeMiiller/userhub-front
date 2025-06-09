import { QueryKeys } from '@/lib/constants/query-keys';
import { GetUsers } from '@/services/fetch';
import { invalidateQueries } from '@/services/reactQuery/get-query-client';
import { User } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useInactives() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: [QueryKeys.user.inactives],
    queryFn: async () => await GetUsers(),
    retry: 3,
  });

  return {
    users: users || [],
    error,
    isLoading,

    invalidateUser: () => invalidateQueries([QueryKeys.user.list]),
  };
}
