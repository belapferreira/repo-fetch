import { Home } from '@/pages/home/page';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { router } from '@/routes';
import { RouterProviderRender } from './mocks';

const HomePage = () => {
  return (
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe('Home page', () => {
  it('should render without crashing', () => {
    render(<HomePage />);

    const title = screen.getByText('Explore repositórios do GitHub');

    expect(title).toBeInTheDocument();
  });

  it('should navigate to the repositories list page after submitting the form', async () => {
    const user = userEvent.setup();

    render(<RouterProviderRender />);

    await user.type(screen.getByPlaceholderText('Username do usuário no Github'), 'octocat');
    await user.click(screen.getByRole('button', { name: /buscar/i }));

    expect(router.state.location.pathname).toBe('/octocat');
  });
});
