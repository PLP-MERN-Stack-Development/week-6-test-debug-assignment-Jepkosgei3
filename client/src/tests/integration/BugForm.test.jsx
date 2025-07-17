// tests/integration/BugForm.test.jsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BugForm from '../../components/BugForm';

const mockMutate = jest.fn();

jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useMutation: () => ({ mutate: mockMutate, isPending: false }),
    useQueryClient: () => ({ invalidateQueries: jest.fn() }),
  };
});

const renderWithQueryClient = (component) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('BugForm Integration Tests', () => {
  beforeEach(() => {
    mockMutate.mockClear();
  });

  it('renders form and submits correct data', () => {
    renderWithQueryClient(<BugForm />);

    const titleInput = screen.getByPlaceholderText('Bug title');
    const descriptionInput = screen.getByPlaceholderText('Bug description');
    const submitButton = screen.getByRole('button', { name: /Submit Bug/i });

    fireEvent.change(titleInput, { target: { value: 'Login Error' } });
    fireEvent.change(descriptionInput, { target: { value: 'Fails on empty input' } });
    fireEvent.click(submitButton);

    expect(mockMutate).toHaveBeenCalledWith({
      title: 'Login Error',
      description: 'Fails on empty input',
    });
  });
});
