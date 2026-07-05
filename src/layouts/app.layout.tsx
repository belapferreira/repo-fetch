import { Header } from '@/components/header';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="d-flex flex-column flex-grow-1 h-100 main-background px-3">
        <Outlet />
      </main>
    </div>
  );
};
