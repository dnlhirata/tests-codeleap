import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

export interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CodeLeapNetwork:token');
    const user = localStorage.getItem('@CodeLeapNetwork:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('/user/api/v1/login/', {
      username,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@CodeLeapNetwork:token', token);
    localStorage.setItem('@CodeLeapNetwork:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@CodeLeapNetwork:token');
    localStorage.removeItem('@CodeLeapNetwork:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token, user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Must be used within and AuthProvider');
  }

  return context;
}
