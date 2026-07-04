import { Container, Form, InputGroup } from 'react-bootstrap';
import type z from 'zod';
import { Search } from 'lucide-react';
import { schema } from './repository-search.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

type SearchFormData = z.infer<typeof schema>;

interface RepositorySearchFormProps {
  onSearch?: (query: string) => void;
}

export const RepositorySearchForm = (props: RepositorySearchFormProps) => {
  const { onSearch } = props;

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      repository: '',
    },
  });

  const repositoryValue = watch('repository');

  const debouncedSearch = debounce(
    useCallback(
      (query: string) => {
        if (onSearch) {
          onSearch(query);
        }
      },
      [onSearch],
    ),
    300,
  );

  useEffect(() => {
    debouncedSearch(repositoryValue);
  }, [repositoryValue, debouncedSearch]);

  return (
    <Form className="w-100">
      <Form.Group>
        <Container className="d-flex gap-2 px-0">
          <InputGroup className={`input-group-${errors.repository ? 'is-invalid' : ''}`}>
            <InputGroup.Text>
              <Search size={20} />
            </InputGroup.Text>

            <Form.Control
              type="text"
              placeholder="Digite o repositório"
              {...register('repository')}
              className={errors.repository ? 'is-invalid' : ''}
            />
          </InputGroup>
        </Container>

        {errors.repository && (
          <Form.Control.Feedback className="Control.Feedback-danger">
            {errors.repository.message || 'É obrigatório informar um repositório'}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </Form>
  );
};
