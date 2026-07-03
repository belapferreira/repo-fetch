import type { UserDetails } from '@/@types';
import { useGetUserDetailsByUsername } from '@/api/queries/get-user-details-by-username';
import { UserRepositories } from '@/components/user-repositories';
import { UserSidebar } from '@/components/user-sidebar';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export const RepositoriesList = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  if (!username) {
    navigate(`/${username}/not-found`, { replace: true });
  }

  const { data, isLoading, isError } = useGetUserDetailsByUsername({ username: username as string }, { enabled: !!username });

  if (isError) {
    navigate(`/${username}/not-found`, { replace: true });
  }

  return (
    <section className="d-flex flex-column align-items-center py-5 h-100 flex-grow-1">
      <Container className="mb-5 d-flex flex-column flex-md-row">
        <UserSidebar userDetails={data as UserDetails} isLoading={isLoading} />

        <UserRepositories />

      </Container>
    </section>
  );
};
