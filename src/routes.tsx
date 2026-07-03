import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { AppLayout } from './layouts/app.layout';
import { Home } from './pages/home/page';
import { RepositoriesList } from './pages/repositories-list/page';
import { NotFound } from './pages/not-found/page';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />

      <Route path="/:username" element={<RepositoriesList />} />

      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);
