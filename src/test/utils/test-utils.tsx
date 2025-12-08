import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { ApiContext } from '@/contexts/ApiContextDefinition';
import { Api } from '@/api/Api';

/**
 * Custom render function that wraps components with necessary providers
 * Includes: Router, Theme, and API Context
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    apiClient,
    ...renderOptions
  }: RenderOptions & { apiClient?: Api } = {}
) {
  // Create a mock API client if not provided
  const mockApiClient = apiClient || new Api({ baseURL: 'http://localhost:3000' });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="test-theme">
          <ApiContext.Provider value={{ api: mockApiClient }}>
            {children}
          </ApiContext.Provider>
        </ThemeProvider>
      </BrowserRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
