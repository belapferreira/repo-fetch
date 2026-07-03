import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export const Header = () => {
  return (
    <header className="navbar p-3 shadow-lg">
      <Container>
        <Link to="/" className="navbar-brand">
          <img src="./src/assets/repo-fetch-logo.svg" width="144" height="36" alt="Repo Fetch" className="logo" />
        </Link>
      </Container>
    </header>
  );
};
