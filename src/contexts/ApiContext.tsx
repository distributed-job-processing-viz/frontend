import React, { useMemo } from 'react';
import type { ReactNode } from 'react';
import { Api } from '../api/Api';
import { ApiContext } from './ApiContextDefinition';

interface ApiProviderProps {
  children: ReactNode;
  baseURL?: string;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({
  children,
  baseURL = 'http://localhost:8080'
}) => {
  const api = useMemo(() => {
    return new Api({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, [baseURL]);

  return (
    <ApiContext.Provider value={{ api }}>
      {children}
    </ApiContext.Provider>
  );
};
