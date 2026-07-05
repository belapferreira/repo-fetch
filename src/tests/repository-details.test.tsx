import { api } from '@/lib/api';
import { renderHook, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { username, repository, mockRepoDetails, createQueryClientMock, renderWithRouter } from './mocks';
import { Repository } from '@/pages/repository/page';
import { useGetRepositoryByName } from '@/api/queries/get-repo-details-by-name';

vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('Repository details page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state when fetching details', async () => {
    renderWithRouter(<Repository />, '/:username/:repository', `${username}/${repository}`);

    const mockGetRepositoryByName = vi.mocked(api.get);
    const mockGetRepositoryReadmeByName = vi.mocked(api.get);

    mockGetRepositoryByName.mockResolvedValue({ data: {}, isLoading: true });
    mockGetRepositoryReadmeByName.mockResolvedValue({ data: {}, isLoading: false });

    const { result } = renderHook(() => useGetRepositoryByName({ username, repository }), {
      wrapper: createQueryClientMock(),
    });

    await waitFor(() => {
      const repoDetailsPlaceholder = screen.getByTestId('repo-details-placeholder');

      expect(result.current.isLoading).toBe(true);
      expect(repoDetailsPlaceholder).toBeInTheDocument();
    });
  });

  it('should redirect to error page when repository details return an error', async () => {
    const mockGetRepositoryByName = vi.mocked(api.get);

    mockGetRepositoryByName.mockResolvedValueOnce({ isError: true });

    const { router } = renderWithRouter(<Repository />, '/:username/:repository', `${username}/${repository}`);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalled();
      expect(router.state.location.pathname).toBe(`/${username}/${repository}/not-found`);
    });
  });

  it('should render the repository details when fetching is successful', async () => {
    const mockGetRepositoryByName = vi.mocked(api.get);
    const mockGetRepoReadme = vi.mocked(api.get);

    mockGetRepositoryByName.mockResolvedValue({ data: mockRepoDetails, isLoading: false });
    mockGetRepoReadme.mockResolvedValue({ data: { content: 'SGVsbG8gV29ybGQ=' }, isLoading: false }); // Base64 for "Hello World"

    renderWithRouter(<Repository />, '/:username/:repository', `${username}/${repository}`);

    await waitFor(() => {
      const repoName = screen.getByTestId('repository-name');
      const repoDescription = screen.getByTestId('repository-description');
      const repoReadme = screen.getByText('Hello World');

      expect(repoName).toBeInTheDocument();
      expect(repoDescription).toBeInTheDocument();
      expect(repoReadme).toBeInTheDocument();
    });
  });
});
