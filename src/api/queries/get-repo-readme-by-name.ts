import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { RepositoryReadme, RepoDetailsByNamePayload } from '@/@types';
import { api } from '@/lib/api';
import { QueryKeys } from '@/constants/tanstack-query-keys';

type GetRepositoryReadmeByNameQueryOptions<TData = RepositoryReadme, TError = unknown> = Omit<
  UseQueryOptions<RepositoryReadme, TError, TData>,
  'queryKey' | 'queryFn'
>;

export async function getRepositoryReadmeByName(params: RepoDetailsByNamePayload) {
  const { username, repository } = params;

  const response = await api.get<RepositoryReadme>(`/repos/${username}/${repository}/readme`);

  const { content } = response.data;

  // Decode the Base64 content to a UTF-8 string
  const decodedContent = decodeURIComponent(
    atob(content.replace(/\n/g, ''))
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  return { ...response.data, content: decodedContent };
}

export const useGetRepositoryReadmeByName = <TData = RepositoryReadme, TError = unknown>(
  params: RepoDetailsByNamePayload,
  options?: GetRepositoryReadmeByNameQueryOptions<TData, TError>,
) => {
  return useQuery<RepositoryReadme, TError, TData>({
    queryKey: [QueryKeys.RepoReadme, params],
    queryFn: () => getRepositoryReadmeByName(params),
    ...options,
  });
};
