import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import type z from 'zod';
import { Search } from 'lucide-react';
import { schema } from './repository-search.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type SearchFormData = z.infer<typeof schema>

export const RepositorySearchForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      repository: '',
    },
  });

  const repositoryValue = watch('repository');
  const isSubmitButtonDisabled = !repositoryValue || repositoryValue.trim().length === 0;

  const handleFormSubmit = (data: SearchFormData) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)} className="w-100">
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

          <Button type="submit" variant="primary" disabled={isSubmitButtonDisabled}>
            Buscar
          </Button>
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
