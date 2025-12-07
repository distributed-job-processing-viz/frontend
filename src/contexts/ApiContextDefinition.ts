import { createContext } from 'react';
import { Api } from '../api/Api';

export interface ApiContextType {
  api: Api<unknown>;
}

export const ApiContext = createContext<ApiContextType | undefined>(undefined);
