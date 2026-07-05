import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import logo from '@/assets/repo-fetch-logo.svg';
import github from '@/assets/github.svg';

export const Header = () => {
  return (
    <header className="navbar p-3 shadow-lg">
      <Container>
        <Link to="/" className="navbar-brand">
          <img src={logo} width="114" height="36" alt="Repo Fetch" className="logo" />
        </Link>

        <a href="https://github.com/belapferreira/repo-fetch" target="_blank" rel="noopener noreferrer">
          <img src={github} width="36" height="36" alt="Repositório no GitHub" title="Repositório no GitHub" />
        </a>
      </Container>
    </header>
  );
};
