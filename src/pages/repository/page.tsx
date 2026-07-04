import type { RepositoryReadme, Repository as RepositoryType } from '@/@types';
import { useGetRepositoryByName } from '@/api/queries/get-repo-details-by-name';
import { useGetRepositoryReadmeByName } from '@/api/queries/get-repo-readme-by-name';
import { RepositoryDetails } from '@/components/repository-details';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export const Repository = () => {
  const { username, repository } = useParams();
  const navigate = useNavigate();

  if (!repository || !username) {
    navigate(`/repository/${repository}/not-found`, { replace: true });
  }

  const {
    data: repoDetails,
    isLoading: isLoadingRepoDetails,
    isError: isErrorRepoDetails,
  } = useGetRepositoryByName(
    { username: username as string, repository: repository as string },
    { enabled: !!repository && !!username },
  );

  if (isErrorRepoDetails) {
    navigate(`/repository/${username}/not-found`, { replace: true });
  }

  const { data: readme, isLoading: isLoadingReadme } = useGetRepositoryReadmeByName(
    { username: username as string, repository: repository as string },
    { enabled: !!repository && !!username },
  );

  return (
    <section className="d-flex flex-column align-items-center pt-3 pb-5 h-100 flex-grow-1">
      <Container className="mb-5 p-0">
        <RepositoryDetails
          repoDetails={repoDetails as RepositoryType}
          isLoadingDetails={isLoadingRepoDetails}
          isLoadingReadme={isLoadingReadme}
          repoReadme={readme as RepositoryReadme}
        />
      </Container>
    </section>
  );
};
