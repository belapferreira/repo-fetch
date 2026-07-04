import { ArrowDownUp } from 'lucide-react';
import { Dropdown } from 'react-bootstrap';

interface StarsSortDropdownProps {
  onOrderChange?: (newOrder: 'asc' | 'desc') => void;
  currentOrder?: 'asc' | 'desc';
  isDisabled?: boolean;
}

export const StarsSortDropdown = (props: StarsSortDropdownProps) => {
  const { currentOrder, onOrderChange, isDisabled } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle
        disabled={isDisabled}
        variant="secondary"
        id="dropdown-stars-sort"
        className="bg-dark border-dark"
      >
        <ArrowDownUp size={16} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onOrderChange?.('desc')} active={currentOrder === 'desc'}>
          Mais estrelas
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onOrderChange?.('asc')} active={currentOrder === 'asc'}>
          Menos estrelas
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
