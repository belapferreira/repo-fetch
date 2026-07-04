import type { Repository } from '@/@types';
import { Star } from 'lucide-react';
import { Badge, Breadcrumb, Button, Card, Container, Image, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

interface RepositoryDetailsProps {
  repoDetails: Repository;
  isLoading: boolean;
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

  const { repoDetails, isLoading } = props;

  return (
    <Container className="d-flex flex-column w-100 placeholder-glow">
      <Breadcrumb className="d-flex flex-row align-items-center gap-2">
        <Breadcrumb.Item href={`/${username}`}>
          <Image src={`https://github.com/${username}.png`} alt={username} width={28} height={28} roundedCircle />
          {username}</Breadcrumb.Item>
        <Breadcrumb.Item active className="text-muted text-decoration-none">{repository}</Breadcrumb.Item>
      </Breadcrumb>

      <Card className="d-flex flex-column gap-3 p-4 border-0 bg-secondary bg-opacity-10 shadow-sm rounded-3">
        {isLoading ? (<RepositoryDetailsPlaceholder />) : (
          <Stack direction="horizontal" gap={3} className="align-items-center">
            <Stack direction="vertical" gap={3}>
              <Stack direction="horizontal" gap={2}>
                <Card.Title className="fs-4 fw-bold">{repoDetails?.name}</Card.Title>

                <Badge pill bg="dark">{repoDetails?.visibility === 'private' ? 'Privado' : 'Público'}</Badge>

                {
                  repoDetails?.language && (
                    <Badge bg="secondary" className="bg-opacity-25">{repoDetails?.language}</Badge>
                  )
                }

                {
                  !!repoDetails?.stargazers_count && (
                    <Badge className="d-flex flex-row align-items-center gap-1 bg-transparent text-warning text-opacity-75">
                      <Star size={16} fill="currentColor" />

                      {repoDetails?.stargazers_count}
                    </Badge>
                  )
                }
              </Stack >

              <Card.Text className="text-muted">{repoDetails?.description}</Card.Text>

              {
                !!repoDetails?.topics?.length && (
                  <Stack direction="horizontal" gap={2} className="d-flex flex-row flex-wrap mt-1">
                    {repoDetails?.topics.map((topic) => (
                      <Badge key={topic} pill bg="dark" className="text-truncate bg-opacity-25 border border-tertiary text-body">
                        {topic}
                      </Badge>
                    ))}
                  </Stack>
                )
              }
            </Stack >

            <a href={`https://github.com/${username}/${repository}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">

              <Button className="d-flex flex-row align-items-center gap-2">
                <img src="/src/assets/github.svg" width="20" height="20" alt="Repositório no GitHub" title="Repositório no GitHub" />

                Ver repositório no GitHub
              </Button>
            </a>
          </Stack >)}
      </Card >

    </Container>
  );
};
