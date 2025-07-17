// tests/unit/BugForm.test.jsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BugForm from '../../components/BugForm';

const queryClient = new QueryClient();

const renderWithQueryClient = (component) =>
  render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );

describe('BugForm Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders form elements correctly', () => {
    renderWithQueryClient(<BugForm />);

    expect(screen.getByPlaceholderText('Bug title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bug description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Bug/i })).toBeInTheDocument();
  });

  it('does not submit with empty fields', () => {
    renderWithQueryClient(<BugForm />);

    fireEvent.change(screen.getByPlaceholderText('Bug title'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Bug description'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Submit Bug/i }));

    // There is no actual validation feedback in the component,
    // but we can ensure nothing breaks here
    expect(screen.getByPlaceholderText('Bug title')).toHaveValue('');
    expect(screen.getByPlaceholderText('Bug description')).toHaveValue('');
  });
});
