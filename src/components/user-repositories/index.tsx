import type { UserRepos } from '@/@types';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Badge, Button, Card, Container, Stack } from 'react-bootstrap';
import { RepositorySearchForm } from './repository-search.form';
import { StarsSortDropdown } from './stars-sort.dropdown';

type UserSidebarProps = {
  userRepos: UserRepos[];
  isLoading?: boolean;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  handlePreviousPage?: () => void;
  handleNextPage?: () => void;
};

export const UserRepositories = (props: UserSidebarProps) => {
  const { userRepos, isLoading, hasPreviousPage, hasNextPage, handlePreviousPage, handleNextPage } = props;

  return (
    <Container className="d-flex flex-column w-100">
      <Card className="d-flex p-4 align-items-center border-0 bg-secondary bg-opacity-10 shadow-sm rounded-3">
        <Container className="d-flex flex-row gap-4 w-100 p-0 mb-4">
          <RepositorySearchForm />

          <StarsSortDropdown />
        </Container>

        <Container className="d-flex flex-column gap-4 mt-3 w-100 p-0">
          <>
            {isLoading ? (
              <>
                {/* TODO: Placeholder */}
              </>
            ) : (
              <>
                {userRepos?.map((repo) => (
                  <Container key={repo.id} className="d-flex flex-column p-0 gap-2 border-bottom border-secondary border-opacity-25 pb-3">
                    <Stack direction="horizontal" gap={2}>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <strong className="fs-6">{repo.name}</strong>
                      </a>

                      <Badge pill bg="dark">{repo?.visibility === 'private' ? 'Privado' : 'Publico'}</Badge>

                      {repo.language && (
                        <Badge bg="secondary" className="bg-opacity-25">{repo.language}</Badge>
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
                          <Badge key={topic} pill bg="dark" className="text-truncate bg-opacity-25 border border-tertiary text-body">
                            {topic}
                          </Badge>
                        ))}
                      </Stack>
                    )}
                  </Container>
                ))}
              </>
            )}
          </>

        </Container>
      </Card>

      <Container className="d-flex gap-3 mt-2 p-0 justify-content-center flex-wrap">
        <Button variant="link" disabled={!hasPreviousPage} onClick={handlePreviousPage} className="d-flex gap-1 align-items-center text-decoration-none">
          <ChevronLeft size={16} />

          Anterior
        </Button>

        <Button variant="link" disabled={!hasNextPage} onClick={handleNextPage} className="d-flex gap-1 align-items-center text-decoration-none">
          Seguinte

          <ChevronRight size={16} />
        </Button>
      </Container>
    </Container>
  );
};
