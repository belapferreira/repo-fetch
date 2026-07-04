import { useGetUserReposByUsername } from '@/api/queries/get-user-repos-by-username';
import { api } from '@/lib/api';
import { renderHook, screen, waitFor } from '@testing-library/react';
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
    vi.clearAllMocks();
  });

  it('should render loading state when fetching repositories', async () => {
    renderWithRouter(<RepositoriesList />, '/:username', username);

    const mockGetUserRepos = vi.mocked(api.get);
    const mockGetUserDetails = vi.mocked(api.get);

    mockGetUserDetails.mockResolvedValue({ data: {}, isLoading: true });

    mockGetUserRepos.mockResolvedValue({ data: {}, isLoading: true });

    const { result } = renderHook(() => useGetUserReposByUsername({ username }), {
      wrapper: createQueryClientMock(),
    });

    await waitFor(() => {
      const userSidebarAvatarPlaceholder = screen.getByTestId('user-sidebar-placeholder-avatar');

      expect(result.current.isLoading).toBe(true);
      expect(userSidebarAvatarPlaceholder).toBeInTheDocument();
    });
  });

  it('should render repositories list when fetching is successful', async () => {
    const mockGetUserRepos = vi.mocked(api.get);
    const mockGetUserDetails = vi.mocked(api.get);

    mockGetUserDetails.mockResolvedValue({ data: mockUserDetails });

    mockGetUserRepos.mockResolvedValue({
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
