import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { queryClient } from './providers/query-client.provider';
import { QueryClientProvider } from '@tanstack/react-query';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
