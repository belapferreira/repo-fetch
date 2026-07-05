import { useGetUserReposByUsername } from '@/api/queries/get-user-repos-by-username';
import { api } from '@/lib/api';
import { cleanup, renderHook, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { username, mockRepoDetails, mockUserDetails, createQueryClientMock, renderWithRouter } from './mocks';
import { RepositoriesList } from '@/pages/repositories-list/page';

vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('Repositories list page', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should render loading state when fetching repositories', async () => {
    const mockGetUserRepos = vi.mocked(api.get);
    const mockGetUserDetails = vi.mocked(api.get);

    mockGetUserDetails.mockResolvedValueOnce({ data: {}, isLoading: true });

    mockGetUserRepos.mockResolvedValueOnce({ data: {}, isLoading: true });

    renderWithRouter(<RepositoriesList />, '/:username', username);

    const { result } = renderHook(() => useGetUserReposByUsername({ username }), {
      wrapper: createQueryClientMock(),
    });

    await waitFor(() => {
      const userSidebarAvatarPlaceholder = screen.getByTestId('user-sidebar-placeholder-avatar');

      expect(result.current.isLoading).toBe(true);
      expect(userSidebarAvatarPlaceholder).toBeInTheDocument();
    });
  });

  it('should redirect to error page when user details return an error', async () => {
    const mockGetUserDetails = vi.mocked(api.get);

    mockGetUserDetails.mockResolvedValueOnce({ isError: true });

    const { router } = renderWithRouter(<RepositoriesList />, '/:username', username);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
      expect(router.state.location.pathname).toBe(`/user/${username}/not-found`);
    });
  });

  it('should render repositories list when fetching is successful', async () => {
    const mockGetUserRepos = vi.mocked(api.get);
    const mockGetUserDetails = vi.mocked(api.get);

    mockGetUserDetails.mockResolvedValueOnce({ data: mockUserDetails });

    mockGetUserRepos.mockResolvedValueOnce({
      data: {
        items: [mockRepoDetails],
        total_count: 1,
      },
    });

    renderWithRouter(<RepositoriesList />, '/:username', username);

    await waitFor(() => {
      const repoName = screen.getByText(mockRepoDetails.name);
      const repoDescription = screen.getByText(mockRepoDetails.description);

      expect(repoName).toBeInTheDocument();
      expect(repoDescription).toBeInTheDocument();
    });
  });
});
