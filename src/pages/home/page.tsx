import { HomeSearchForm } from '@/components/home-search-form';
import { Container } from 'react-bootstrap';

export const Home = () => {
  return (
    <section className="d-flex flex-column align-items-center py-5 h-100 flex-grow-1">
      <Container className="mb-5">
        <h1 className="h5">Explore repositórios do GitHub</h1>
        <p>Consultar repositórios hospedados no GitHub através de um username</p>
      </Container>

      <HomeSearchForm />
    </section>
  );
};
