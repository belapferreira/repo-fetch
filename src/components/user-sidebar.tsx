import type { UserDetails } from '@/@types';
import { Users } from 'lucide-react';
import { Card, Container, Image } from 'react-bootstrap';

type UserSidebarProps = {
  userDetails: UserDetails;
  isLoading?: boolean;
};

const UserSidebarPlaceholder = () => {
  return (
    <>
      <div
        className="placeholder rounded-circle mb-3"
        style={{
          width: 160,
          height: 160,
        }}
      />

      <div className="placeholder col-6 mb-2" />

      <div className="placeholder col-4 mb-3" />

      <div className="placeholder col-12 mb-2" />

      <div className="placeholder col-10 mb-2" />

      <div className="placeholder col-12 mb-2" />

      <div className="placeholder col-10 mb-2" />
    </>
  );
};

export const UserSidebar = (props: UserSidebarProps) => {
  const { userDetails, isLoading } = props;

  return (
    <Container as="aside" className="d-flex flex-column w-100" style={{ maxWidth: '20rem' }}>
      <Card className="p-4 align-items-center border-0 bg-secondary bg-opacity-10 shadow-sm rounded-3 placeholder-glow">
        {isLoading ? (
          <UserSidebarPlaceholder />
        ) : (
          <>
            <a href={userDetails?.html_url} title={userDetails?.html_url} target="_blank" rel="noopener noreferrer">
              <Image src={userDetails?.avatar_url} alt={userDetails?.name} width={160} height={160} roundedCircle />
            </a>

            <a
              href={userDetails?.html_url}
              title={userDetails?.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex flex-column align-items-center text-decoration-none text-body"
            >
              <strong className="fs-5">{userDetails?.name}</strong>
              <small>{userDetails?.email}</small>
              <small>{userDetails?.login}</small>
            </a>

            {userDetails?.bio && (
              <p className="text-muted mt-3">
                <small>{userDetails?.bio}</small>
              </p>
            )}

            <Container className="d-flex mt-1 p-0 gap-2 align-items-center">
              <div className="d-flex align-items-center gap-1 p-0">
                <Users size={14} />
                <strong>
                  <small>{userDetails?.followers || 0}</small>
                </strong>
                <small className="text-muted">Seguidores</small>
              </div>

              <small className="text-muted">•</small>

              <div className="d-flex align-items-center gap-1 p-0">
                <strong>
                  <small>{userDetails?.following || 0}</small>
                </strong>
                <small className="text-muted">Seguindo</small>
              </div>
            </Container>
          </>
        )}
      </Card>
    </Container>
  );
};
