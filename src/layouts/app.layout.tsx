import { Header } from '@/components/header';
import { queryClient } from '@/providers/query-client.provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main
          className="d-flex flex-column flex-grow-1 h-100"
          style={
            {
              backgroundImage: 'url(./src/assets/background-with-github-symbol.png)',
              backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
              backgroundPosition: 'right',
            }
          }>

          <Outlet />
        </main>
      </div>
    </QueryClientProvider >
  );
};
