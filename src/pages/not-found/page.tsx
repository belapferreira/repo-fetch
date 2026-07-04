import { Card, Container } from 'react-bootstrap';

export const NotFound = () => {
  return (
    <section className="d-flex flex-column align-items-center py-5 h-100 flex-grow-1">
      <Container className="mb-5">
        <Card
          style={{ maxWidth: '40rem', marginInline: 'auto' }}
          className="p-5 gap-4 d-flex flex-column align-items-center border-0 mt-5 bg-secondary bg-opacity-10 shadow-sm rounded-3"
        >
          <img src="/src/assets/not-found-404.svg" alt="404" width={194} height={85} />

          <h1 className="fs-3">Username não encontrado</h1>

          <p className="text-center">
            O usuário que você está procurando não existe ou não está disponível. Verifique o username e tente novamente
            em <a href="/">RepoFetch</a>.
          </p>
        </Card>
      </Container>
    </section>
  );
};
