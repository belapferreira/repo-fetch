import type { Repository } from '@/@types';
import { ChevronLeft, ChevronRight, CircleX, FolderOpen, Star } from 'lucide-react';
import { Badge, Button, Card, Container, Stack } from 'react-bootstrap';
import { RepositorySearchForm } from './repository-search.form';
import { StarsSortDropdown } from './stars-sort.dropdown';
import { generateArray } from '@/utils/generate-array';
import { Link, useParams } from 'react-router-dom';

type UserSidebarProps = {
  userRepos: Repository[];
  currentOrder?: 'asc' | 'desc';
  errorUserRepos?: unknown;
  isLoading?: boolean;
  hasQuery?: boolean;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  handlePreviousPage?: () => void;
  handleNextPage?: () => void;
  handleOrderChange?: (newOrder: 'asc' | 'desc') => void;
  handleQueryChange?: (newQuery: string) => void;
};

const UserRepositoriesPlaceholder = () => {
  return (
    <Container className="d-flex flex-column p-0 gap-2 border-bottom border-secondary border-opacity-25 pb-3 placeholder-glow">
      <div className="placeholder w-50 mb-2" />

      <div className="placeholder w-75 mb-2" />

      <div className="placeholder w-25 mb-2" />
    </Container>
  );
};

export const UserRepositories = (props: UserSidebarProps) => {
  const {
    userRepos,
    errorUserRepos,
    currentOrder,
    isLoading,
    hasQuery,
    hasPreviousPage,
    hasNextPage,
    handlePreviousPage,
    handleNextPage,
    handleOrderChange,
    handleQueryChange,
  } = props;

  const { username } = useParams();

  const isEmpty = !userRepos?.length && !isLoading && !errorUserRepos && !hasQuery;

  const userReposErrorMessage =
    (errorUserRepos as { response: { status: number } })?.response?.status === 404
      ? 'Nenhum repositório encontrado para o username informado'
      : 'Ocorreu um erro ao buscar os repositórios do usuário';

  const placeholderItems = generateArray(10);

  return (
    <Container className="d-flex flex-column w-100 p-0">
      <Card className="d-flex p-4 align-items-center border-0 bg-secondary bg-opacity-10 shadow-sm rounded-3">
        <Container className="d-flex flex-row gap-3 w-100 p-0 mb-4 flex-wrap flex-lg-nowrap">
          <RepositorySearchForm isDisabled={isEmpty || isLoading} onSearch={handleQueryChange} />

          <StarsSortDropdown
            currentOrder={currentOrder}
            isDisabled={isEmpty || isLoading}
            onOrderChange={handleOrderChange}
          />
        </Container>

        {isLoading ? (
          <Container className="d-flex flex-column gap-4 mt-3 w-100 p-0">
            {placeholderItems.map((item) => (
              <UserRepositoriesPlaceholder key={item} />
            ))}
          </Container>
        ) : (
          <>
            {!!errorUserRepos && (
              <Container className="d-flex flex-column align-items-center justify-content-center gap-2 w-100 text-muted p-5">
                <CircleX size={32} />
                <p>{userReposErrorMessage}</p>
              </Container>
            )}

            {isEmpty ? (
              <Container className="d-flex flex-column align-items-center justify-content-center gap-2 w-100 text-muted p-5">
                <FolderOpen size={32} />

                <p>Nenhum repositório encontrado para o username informado</p>
              </Container>
            ) : (
              <Container className="d-flex flex-column gap-4 mt-3 w-100 p-0">
                {userRepos?.map((repo) => (
                  <Container
                    key={repo.id}
                    className="d-flex flex-column p-0 gap-2 border-bottom border-secondary border-opacity-25 pb-3"
                  >
                    <Stack direction="horizontal" gap={2} className="flex-wrap">
                      <Link to={`/${username}/${repo.name}`} className="text-decoration-none">
                        <strong className="fs-6">{repo.name}</strong>
                      </Link>

                      <Badge pill bg="dark">
                        {repo?.visibility === 'private' ? 'Privado' : 'Público'}
                      </Badge>

                      {repo.language && (
                        <Badge bg="secondary" className="bg-opacity-25">
                          {repo.language}
                        </Badge>
                      )}

                      {!!repo.stargazers_count && (
                        <Badge className="d-flex flex-row align-items-center gap-1 bg-transparent text-warning text-opacity-75">
                          <Star size={16} fill="currentColor" />

                          {repo.stargazers_count}
                        </Badge>
                      )}
                    </Stack>

                    <small className="text-muted">{repo.description}</small>

                    {!!repo?.topics?.length && (
                      <Stack direction="horizontal" gap={2} className="d-flex flex-row flex-wrap mt-1">
                        {repo.topics.map((topic) => (
                          <Badge
                            key={topic}
                            pill
                            bg="dark"
                            className="text-truncate bg-opacity-25 border border-tertiary text-body"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </Stack>
                    )}
                  </Container>
                ))}
              </Container>
            )}
          </>
        )}
      </Card>

      {!isEmpty && (
        <Container className="d-flex gap-3 mt-2 p-0 justify-content-center flex-wrap">
          <Button
            variant="link"
            disabled={!hasPreviousPage}
            onClick={handlePreviousPage}
            className="d-flex gap-1 align-items-center text-decoration-none"
          >
            <ChevronLeft size={16} />
            Anterior
          </Button>

          <Button
            variant="link"
            disabled={!hasNextPage}
            onClick={handleNextPage}
            className="d-flex gap-1 align-items-center text-decoration-none"
          >
            Seguinte
            <ChevronRight size={16} />
          </Button>
        </Container>
      )}
    </Container>
  );
};
