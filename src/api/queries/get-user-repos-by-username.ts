import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { UserReposSearchResponse, UserReposByUsernamePayload } from '@/@types';
import { api } from '@/lib/api';
import { QueryKeys } from '@/constants/tanstack-query-keys';

type GetUserReposByUsernameQueryOptions<TData = UserReposSearchResponse, TError = unknown> = Omit<
  UseQueryOptions<UserReposSearchResponse, TError, TData>,
  'queryKey' | 'queryFn'
>;

export async function getUserReposByUsername(params: UserReposByUsernamePayload) {
  const { username, page, order, query } = params;

  const response = await api.get<UserReposSearchResponse>(
    `/search/repositories?q=${query ? `${query}+` : ''}user:${username}&sort=stars&order=${order}&per_page=10&page=${page}`,
  );
  return response.data;
}

export const useGetUserReposByUsername = <TData = UserReposSearchResponse, TError = unknown>(
  params: UserReposByUsernamePayload,
  options?: GetUserReposByUsernameQueryOptions<TData, TError>,
) => {
  return useQuery<UserReposSearchResponse, TError, TData>({
    queryKey: [QueryKeys.UserRepos, params],
    queryFn: () => getUserReposByUsername(params),
    ...options,
  });
};
