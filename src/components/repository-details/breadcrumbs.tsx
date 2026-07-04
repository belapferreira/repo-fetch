import { Breadcrumb, Image } from 'react-bootstrap';

interface BreadcrumbsProps {
  username: string;
  repository: string;
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { username, repository } = props;

  return (
    <Breadcrumb className="d-flex flex-row align-items-center gap-2">
      <Breadcrumb.Item href={`/${username}`}>
        <Image src={`https://github.com/${username}.png`} alt={username} width={28} height={28} roundedCircle />
        {username}
      </Breadcrumb.Item>
      <Breadcrumb.Item active className="text-muted text-decoration-none">
        {repository}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};
