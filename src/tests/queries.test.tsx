import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/providers/query-client.provider';
import { api } from '@/lib/api';
import { renderHook, waitFor } from '@testing-library/react';
import { useGetUserDetailsByUsername } from '@/api/queries/get-user-details-by-username';
import { useGetUserReposByUsername } from '@/api/queries/get-user-repos-by-username';
import { useGetRepositoryByName } from '@/api/queries/get-repo-details-by-name';
import { useGetRepositoryReadmeByName } from '@/api/queries/get-repo-readme-by-name';

vi.mock('../lib/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

const username = 'octocat';

const mockRepoDetails = {
  id: 123456,
  name: 'Hello-World',
  html_url: 'https://github.com/octocat/Hello-World',
  description: 'This your first repo!',
  stargazers_count: 0,
  language: null,
  private: false,
  topics: [],
  visibility: 'public',
  license: null,
};

const createQueryClientMock = () => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Queries testing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get the user details from the API', async () => {
    const mockUserDetails = {
      login: 'octocat',
      avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
      html_url: 'https://github.com/octocat',
      name: 'The Octocat',
      bio: 'There once was...',
      followers: 42,
      following: 13,
      email: null,
    };

    const mockGetUserDetails = vi.mocked(api.get);
    mockGetUserDetails.mockResolvedValue({ data: mockUserDetails });

    const { result } = renderHook(() => useGetUserDetailsByUsername({ username }), {
      wrapper: createQueryClientMock(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockUserDetails);
    });
  });

  it('should get the user repositories from the API', async () => {
    const mockUserRepos = {
      items: [mockRepoDetails],
      total_count: 1,
    };

    const mockGetUserRepos = vi.mocked(api.get);
    mockGetUserRepos.mockResolvedValue({ data: mockUserRepos });

    const { result } = renderHook(() => useGetUserReposByUsername({ username, page: 1, order: 'desc' }), {
      wrapper: createQueryClientMock(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockUserRepos);
    });
  });

  it('should get the repository details from the API', async () => {
    const mockGetRepoDetails = vi.mocked(api.get);
    mockGetRepoDetails.mockResolvedValue({ data: mockRepoDetails });

    const { result } = renderHook(() => useGetRepositoryByName({ username, repository: 'Hello-World' }), {
      wrapper: createQueryClientMock(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockRepoDetails);
    });
  });

  it('should get the repository readme from the API', async () => {
    const mockGetRepoReadme = vi.mocked(api.get);
    mockGetRepoReadme.mockResolvedValue({ data: { content: 'SGVsbG8gV29ybGQ=' } }); // Base64 for "Hello World"

    const { result } = renderHook(() => useGetRepositoryReadmeByName({ username, repository: 'Hello-World' }), {
      wrapper: createQueryClientMock(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual({ content: 'Hello World' });
    });
  });
});
