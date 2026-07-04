import type { Repository, RepositoryReadme as RepositoryReadmeType } from '@/@types';
import { FolderOpen, Star } from 'lucide-react';
import { Badge, Button, Card, Container, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { RepositoryReadme } from './repository-readme';
import { Breadcrumbs } from './breadcrumbs';

interface RepositoryDetailsProps {
  repoDetails: Repository;
  repoReadme?: RepositoryReadmeType;
  isLoadingDetails: boolean;
  isLoadingReadme: boolean;
}

const RepositoryDetailsPlaceholder = () => {
  return (
    <Container className="d-flex flex-column p-0 gap-3 placeholder-glow">
      <div className="placeholder w-50 mb-2" style={{ height: '2.25rem' }} />

      <div className="placeholder w-75 mb-2" style={{ height: '1.5rem' }} />

      <div className="placeholder w-25 mb-2" style={{ height: '1.5rem' }} />
    </Container>
  );
};

export const RepositoryDetails = (props: RepositoryDetailsProps) => {
  const { username, repository } = useParams();

  const { repoDetails, repoReadme, isLoadingDetails, isLoadingReadme } = props;

  return (
    <Container className="d-flex flex-column w-100 placeholder-glow p-0">
      <Breadcrumbs username={username as string} repository={repository as string} />

      <Card className="d-flex flex-column gap-3 p-4 border-0 bg-secondary bg-opacity-10 shadow-sm rounded-3">
        {isLoadingDetails ? (
          <RepositoryDetailsPlaceholder />
        ) : (
          <Stack direction="horizontal" gap={3} className="align-items-center flex-wrap">
            <Stack direction="vertical" gap={3}>
              <Stack direction="horizontal" gap={2} className="flex-wrap">
                <Card.Title className="fs-4 fw-bold">{repoDetails?.name}</Card.Title>

                <Badge pill bg="dark">
                  {repoDetails?.visibility === 'private' ? 'Privado' : 'Público'}
                </Badge>

                {repoDetails?.language && (
                  <Badge bg="secondary" className="bg-opacity-25">
                    {repoDetails?.language}
                  </Badge>
                )}

                {!!repoDetails?.stargazers_count && (
                  <Badge className="d-flex flex-row align-items-center gap-1 bg-transparent text-warning text-opacity-75">
                    <Star size={16} fill="currentColor" />

                    {repoDetails?.stargazers_count}
                  </Badge>
                )}
              </Stack>

              <Card.Text className="text-muted mb-0">{repoDetails?.description}</Card.Text>

              {!!repoDetails?.topics?.length && (
                <Stack direction="horizontal" gap={2} className="d-flex flex-row flex-wrap mt-1">
                  {repoDetails?.topics.map((topic) => (
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
            </Stack>

            <a
              href={`https://github.com/${username}/${repository}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <Button className="d-flex flex-row align-items-center gap-2">
                <img
                  src="/src/assets/github.svg"
                  width="20"
                  height="20"
                  alt="Repositório no GitHub"
                  title="Repositório no GitHub"
                />
                Ver repo
              </Button>
            </a>
          </Stack>
        )}
      </Card>

      <Card className="d-flex flex-column gap-3 p-4 border-0 bg-secondary bg-opacity-10 shadow-sm rounded-3 mt-3">
        <Card.Title className="fs-6 pb-3 border-bottom border-secondary border-opacity-25">README</Card.Title>
        {isLoadingReadme ? (
          <div className="placeholder w-100 mb-2" style={{ height: '40rem' }} />
        ) : (
          <>
            {repoReadme?.content ? (
              <RepositoryReadme
                content={repoReadme.content}
                username={username as string}
                repository={repository as string}
              />
            ) : (
              <Container className="d-flex flex-column align-items-center justify-content-center gap-2 w-100 text-muted p-5">
                <FolderOpen size={32} />

                <p>README do repositório indisponível</p>
              </Container>
            )}
          </>
        )}
      </Card>
    </Container>
  );
};
