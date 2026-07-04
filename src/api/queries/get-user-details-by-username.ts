import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { UserDetails, UserDetailsByUsernamePayload } from '@/@types';
import { api } from '@/lib/api';
import { QueryKeys } from '@/constants/tanstack-query-keys';

type GetUserDetailsByUsernameQueryOptions<TData = UserDetails, TError = unknown> = Omit<
  UseQueryOptions<UserDetails, TError, TData>,
  'queryKey' | 'queryFn'
>;

export async function getUserDetailsByUsername(params: UserDetailsByUsernamePayload) {
  const { username } = params;

  const response = await api.get<UserDetails>(`/users/${username}`);
  return response.data;
}

export const useGetUserDetailsByUsername = <TData = UserDetails, TError = unknown>(
  params: UserDetailsByUsernamePayload,
  options?: GetUserDetailsByUsernameQueryOptions<TData, TError>,
) => {
  return useQuery<UserDetails, TError, TData>({
    queryKey: [QueryKeys.UserDetails, params],
    queryFn: () => getUserDetailsByUsername(params),
    ...options,
  });
};
