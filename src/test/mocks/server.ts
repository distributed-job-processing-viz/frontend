import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * MSW server for Node environment (Vitest tests)
 */
export const server = setupServer(...handlers);
