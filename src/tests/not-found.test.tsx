import { render, screen } from '@testing-library/react';
import { MemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { router } from '@/routes';
import { NotFound } from '@/pages/not-found/page';

const NotFoundPage = () => {
  return (
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );
};

const RouterProviderRender = () => {
  return <RouterProvider router={router} />;
};

describe('Not found page', () => {
  it('should render without crashing', async () => {
    render(<NotFoundPage />);

    const title = screen.getByText('Não encontrado');

    expect(title).toBeInTheDocument();
  });

  it('should navigate to the home when clicking on RepoFetch button', async () => {
    render(<NotFoundPage />);

    const user = userEvent.setup();

    render(<RouterProviderRender />);

    await user.click(screen.getByText(/RepoFetch/i));

    expect(router.state.location.pathname).toBe('/');
  });
});
