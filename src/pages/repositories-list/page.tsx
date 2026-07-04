import type { UserDetails, UserRepos } from '@/@types';
import { useGetUserDetailsByUsername } from '@/api/queries/get-user-details-by-username';
import { useGetUserReposByUsername } from '@/api/queries/get-user-repos-by-username';
import { UserRepositories } from '@/components/user-repositories/index';
import { UserSidebar } from '@/components/user-sidebar';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export const RepositoriesList = () => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [query, setQuery] = useState('');

  const { username } = useParams();
  const navigate = useNavigate();

  if (!username) {
    navigate(`/${username}/not-found`, { replace: true });
  }

  const { data: userDetails, isLoading: isLoadingUserDetails, isError: isErrorUserDetails } = useGetUserDetailsByUsername({ username: username as string }, { enabled: !!username });

  if (isErrorUserDetails) {
    navigate(`/${username}/not-found`, { replace: true });
  }

  const { data: userRepos, isLoading: isLoadingUserRepos } = useGetUserReposByUsername({ username: username as string, page, order, query }, { enabled: !!username });

  const totalPages = userRepos?.total_count ? Math.ceil(userRepos.total_count / 10) : 0; // 10 items per page

  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleOrderChange = (newOrder: 'asc' | 'desc') => {
    if (newOrder !== order) {
      setOrder(newOrder);
      setPage(1);
    }
  };

  const handleQueryChange = (newQuery: string) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
    }
  };

  return (
    <section className="d-flex flex-column align-items-center py-5 h-100 flex-grow-1">
      <Container className="mb-5 d-flex flex-column flex-md-row">
        <UserSidebar userDetails={userDetails as UserDetails} isLoading={isLoadingUserDetails} />

        <UserRepositories userRepos={userRepos?.items as UserRepos[]} currentOrder={order} isLoading={isLoadingUserRepos} hasPreviousPage={hasPreviousPage} hasNextPage={hasNextPage} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} handleQueryChange={handleQueryChange} handleOrderChange={handleOrderChange} />

      </Container>
    </section>
  );
};
