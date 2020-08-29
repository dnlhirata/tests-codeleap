import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import { Container, Form, Content } from './styles';

interface LoginData {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { signIn } = useAuth();

  const handleLogin = useCallback(
    (data: LoginData) => {
      console.log(data);
      signIn(data);

      history.push('/main');
    },
    [signIn, history],
  );

  return (
    <Container>
      <Content>
        <h2>Welcome to CodeLeap Network!</h2>
        <Form ref={formRef} onSubmit={handleLogin} id="login-form">
          <TextInput name="username" label="Username" />
          <TextInput name="password" label="Password" type="password" />
        </Form>

        <div>
          <Link to="/signup">Ainda não tenho conta</Link>
          <Button type="submit" form="login-form">
            Entrar
          </Button>
        </div>
      </Content>
    </Container>
  );
};

export default SignIn;
