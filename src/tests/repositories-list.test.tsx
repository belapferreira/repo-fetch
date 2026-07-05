import { useGetUserReposByUsername } from '@/api/queries/get-user-repos-by-username';
import { api } from '@/lib/api';
import { cleanup, renderHook, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { username, mockRepoDetails, mockUserDetails, createQueryClientMock, renderWithRouter } from './mocks';
import { RepositoriesList } from '@/pages/repositories-list/page';
import userEvent from '@testing-library/user-event';

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

  it('should navigate to the next page when the "Seguinte" button is clicked', async () => {
    const mockGetUserDetails = vi.mocked(api.get);
    const mockGetUserRepos = vi.mocked(api.get);

    mockGetUserDetails.mockResolvedValueOnce({ data: mockUserDetails });

    mockGetUserRepos.mockResolvedValueOnce({
      data: {
        items: [mockRepoDetails],
        total_count: 20,
      },
    });

    renderWithRouter(<RepositoriesList />, '/:username', username);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /seguinte/i }));

    await waitFor(() => {
      expect(api.get).toHaveBeenLastCalledWith(
        `/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=10&page=2`,
      );
    });
  });

  it('should navigate to the previous page when the "Anterior" button is clicked', async () => {
    const mockGetUserDetails = vi.mocked(api.get);
    const mockGetUserRepos = vi.mocked(api.get);

    mockGetUserDetails.mockResolvedValueOnce({ data: mockUserDetails });

    // Initial request
    mockGetUserRepos.mockResolvedValueOnce({
      data: {
        items: [mockRepoDetails],
        total_count: 20,
      },
    });

    // Second request for the next page
    mockGetUserRepos.mockResolvedValueOnce({
      data: {
        items: [mockRepoDetails],
        total_count: 20,
      },
    });

    // Third request for the previous page
    mockGetUserRepos.mockResolvedValueOnce({
      data: {
        items: [mockRepoDetails],
        total_count: 20,
      },
    });

    renderWithRouter(<RepositoriesList />, '/:username', username);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /seguinte/i }));

    await waitFor(() => {
      expect(api.get).toHaveBeenLastCalledWith(
        `/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=10&page=2`,
      );
    });

    await user.click(screen.getByRole('button', { name: /anterior/i }));

    await waitFor(() => {
      expect(api.get).toHaveBeenLastCalledWith(
        `/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=10&page=1`,
      );
    });
  });
});
