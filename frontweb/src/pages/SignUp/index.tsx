import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, Form, Content } from './styles';

interface RegisterFormData {
  username: string;
  password: string;
  email: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef(null);

  const history = useHistory();

  const handleRegister = useCallback(
    async (data: RegisterFormData) => {
      await api.post('/user/api/v1/create/', data);

      history.push('/');
    },
    [history],
  );

  return (
    <Container>
      <Content>
        <h2>Welcome to CodeLeap Network!</h2>
        <Form ref={formRef} onSubmit={handleRegister} id="register-form">
          <TextInput name="username" label="Username" />
          <TextInput name="password" label="Password" type="password" />
          <TextInput name="email" label="Email" type="email" />
        </Form>

        <div>
          <Link to="/">Já tenho conta</Link>
          <Button type="submit" form="register-form">
            Registar
          </Button>
        </div>
      </Content>
    </Container>
  );
};

export default SignUp;
