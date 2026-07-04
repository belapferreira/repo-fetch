import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import type z from 'zod';
import { Search } from 'lucide-react';
import { schema } from './search.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

type SearchFormData = z.infer<typeof schema>;

export const SearchForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
    },
  });

  const usernameValue = watch('username');
  const isSubmitButtonDisabled = !usernameValue || usernameValue.trim().length === 0;

  const handleFormSubmit = (data: SearchFormData) => {
    navigate(`/${data.username}`);
  };

  return (
    <Container className="bg-secondary p-4 rounded-3 shadow-sm bg-opacity-10">
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Label>Username do usuário</Form.Label>

        <Form.Group>
          <Container className="d-flex gap-2 px-0 flex-column flex-sm-row">
            <InputGroup className={`input-group-${errors.username ? 'is-invalid' : ''}`}>
              <InputGroup.Text>
                <Search size={20} />
              </InputGroup.Text>

              <Form.Control
                type="text"
                placeholder="Username do usuário no Github"
                {...register('username')}
                className={errors.username ? 'is-invalid' : ''}
              />
            </InputGroup>

            <Button type="submit" variant="primary" disabled={isSubmitButtonDisabled}>
              Buscar
            </Button>
          </Container>

          {errors.username && (
            <Form.Control.Feedback className="Control.Feedback-danger">
              {errors.username.message || 'É obrigatório informar um nome de usuário'}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Form>
    </Container>
  );
};
