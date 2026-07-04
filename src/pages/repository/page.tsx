import type { Repository as RepositoryType } from '@/@types';
import { useGetRepositoryByName } from '@/api/queries/get-repo-details-by-name';
import { RepositoryDetails } from '@/components/repository-details';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export const Repository = () => {
  const { username, repository } = useParams();
  const navigate = useNavigate();

  if (!repository || !username) {
    navigate(`/${repository}/not-found`, { replace: true });
  }

  const { data: repoDetails, isLoading: isLoadingRepoDetails } = useGetRepositoryByName({ username: username as string, repository: repository as string }, { enabled: !!repository && !!username });

  return (
    <section className="d-flex flex-column align-items-center py-5 h-100 flex-grow-1">
      <Container className="mb-5">
        <RepositoryDetails repoDetails={repoDetails as RepositoryType} isLoading={isLoadingRepoDetails} />
      </Container>
    </section>
  );
};
