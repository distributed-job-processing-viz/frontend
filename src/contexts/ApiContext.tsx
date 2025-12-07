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
  baseURL = import.meta.env.VITE_API || 'http://localhost:8080'
}) => {
  const api = useMemo(() => {
    // Add https:// protocol if VITE_API is set but doesn't include protocol
    const apiUrl = baseURL.startsWith('http') ? baseURL : `https://${baseURL}`;

    return new Api({
      baseURL: apiUrl,
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
