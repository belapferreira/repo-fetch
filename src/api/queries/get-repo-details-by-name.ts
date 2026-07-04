import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { Repository, RepoDetailsByNamePayload } from '@/@types';
import { api } from '@/lib/api';
import { QueryKeys } from '@/constants/tanstack-query-keys';

type GetRepositoryByNameQueryOptions<TData = Repository, TError = unknown> = Omit<
  UseQueryOptions<Repository, TError, TData>,
  'queryKey' | 'queryFn'
>;

export async function getRepositoryByName(params: RepoDetailsByNamePayload) {
  const { username, repository } = params;

  const response = await api.get<Repository>(`/repos/${username}/${repository}`);
  return response.data;
}

export const useGetRepositoryByName = <TData = Repository, TError = unknown>(
  params: RepoDetailsByNamePayload,
  options?: GetRepositoryByNameQueryOptions<TData, TError>,
) => {
  return useQuery<Repository, TError, TData>({
    queryKey: [QueryKeys.RepoDetails, params],
    queryFn: () => getRepositoryByName(params),
    ...options,
  });
};
