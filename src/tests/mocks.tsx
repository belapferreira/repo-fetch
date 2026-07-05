import { AppLayout } from '@/layouts/app.layout';
import { router } from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

export const username = 'octocat';
export const repository = 'Hello-World';

export const mockUserDetails = {
  login: 'octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  html_url: 'https://github.com/octocat',
  name: 'The Octocat',
  bio: 'There once was...',
  followers: 42,
  following: 13,
  email: null,
};

export const mockRepoDetails = {
  id: 123456,
  name: 'Hello-World',
  html_url: 'https://github.com/octocat/Hello-World',
  description: 'This your first repo!',
  stargazers_count: 0,
  language: null,
  private: false,
  topics: [],
  visibility: 'public',
  license: null,
};

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const createQueryClientMock = () => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={createQueryClient()}>{children}</QueryClientProvider>
  );
};

export const renderWithRouter = (ui: ReactNode, path: string, route: string) => {
  const router = createMemoryRouter(
    [
      {
        element: <AppLayout />,
        children: [
          {
            path,
            element: ui,
          },
        ],
      },
    ],
    {
      initialEntries: [`/${route}`],
    },
  );

  return {
    router,
    ...render(
      <QueryClientProvider client={createQueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    ),
  };
};

export const RouterProviderRender = () => {
  return <RouterProvider router={router} />;
};
