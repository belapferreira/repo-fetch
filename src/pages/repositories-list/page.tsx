import type { UserDetails, UserRepos } from '@/@types';
import { useGetUserDetailsByUsername } from '@/api/queries/get-user-details-by-username';
import { useGetUserReposByUsername } from '@/api/queries/get-user-repos-by-username';
import { UserRepositories } from '@/components/user-repositories/index';
import { UserSidebar } from '@/components/user-sidebar';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export const RepositoriesList = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  if (!username) {
    navigate(`/${username}/not-found`, { replace: true });
  }

  const { data: userDetails, isLoading: isLoadingUserDetails, isError: isErrorUserDetails } = useGetUserDetailsByUsername({ username: username as string }, { enabled: !!username });

  if (isErrorUserDetails) {
    navigate(`/${username}/not-found`, { replace: true });
  }

  const { data: userRepos, isLoading: isLoadingUserRepos } = useGetUserReposByUsername({ username: username as string, page: 1, order: 'desc' }, { enabled: !!username });

  const hasPreviousPage = true; // Implement logic to determine if there is a previous page
  const hasNextPage = true; // Implement logic to determine if there is a next page

  const handlePreviousPage = () => {
    // Implement logic to fetch previous page of repositories
  };

  const handleNextPage = () => {
    // Implement logic to fetch next page of repositories
  };

  return (
    <section className="d-flex flex-column align-items-center py-5 h-100 flex-grow-1">
      <Container className="mb-5 d-flex flex-column flex-md-row">
        <UserSidebar userDetails={userDetails as UserDetails} isLoading={isLoadingUserDetails} />

        <UserRepositories userRepos={userRepos?.items as UserRepos[]} isLoading={isLoadingUserRepos} hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />

      </Container>
    </section>
  );
};
