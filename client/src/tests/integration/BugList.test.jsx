// src/tests/unit/BugForm.test.jsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BugForm from '../../components/BugForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const renderWithQueryClient = (ui) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('BugForm Unit Tests', () => {
  it('renders form elements correctly', () => {
    const mockOnBugCreated = jest.fn();
    renderWithQueryClient(<BugForm onBugCreated={mockOnBugCreated} />);

    expect(screen.getByPlaceholderText('Bug title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bug description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Bug/i })).toBeInTheDocument();
  });
});
