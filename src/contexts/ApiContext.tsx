import React, { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Api } from '../api/Api';

interface ApiContextType {
  api: Api<unknown>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

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

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context.api;
};
