import { QueryKeys } from '@/lib/constants/query-keys';
import { GetUsers, PostUser, PutUser } from '@/services/fetch';
import { invalidateQueries } from '@/services/reactQuery/get-query-client';
import { CreateUser, UpdateUser, User } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useUsers() {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: [QueryKeys.user.list],
    queryFn: async () => await GetUsers(),
  });

  const updateUser = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUser }) =>
      await PutUser({ id, user: data }),
    onSuccess: (newUser: User) => {
      queryClient.setQueryData([QueryKeys.user.list], (old: User[] | undefined) => {
        return old ? old.map((user) => (user.Id === newUser.Id ? newUser : user)) : [newUser];
      });
    },
  });

  const createUser = useMutation({
    mutationFn: async (data: CreateUser) => await PostUser(data),
    onSuccess: (newUser: User) => {
      queryClient.setQueryData([QueryKeys.user.list], (old: User[] | undefined) => {
        return old ? [...old, newUser] : [newUser];
      });
    },
  });

  return {
    users: users || [],
    error,
    isLoading,
    updateUser,
    createUser,

    invalidateUser: () => invalidateQueries([QueryKeys.user.list]),
  };
}
