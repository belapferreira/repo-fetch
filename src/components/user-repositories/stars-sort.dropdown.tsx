import { ArrowDownUp } from 'lucide-react';
import { Dropdown } from 'react-bootstrap';

export const StarsSortDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-stars-sort" className="bg-dark border-dark">
        <ArrowDownUp size={16} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Mais estrelas</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Menos estrelas</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
