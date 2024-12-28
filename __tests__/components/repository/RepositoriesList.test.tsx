import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { RepositoriesList } from '@/components/repository/RepositoriesList';
import { useGetRepositories } from '@/api/api/query/useGetRepositories';
import { Repository } from '@/types';

jest.mock('@/api/api/query/useGetRepositories');

const mockRepositories = [
  {
    id: 1,
    name: 'repository1',
    watchers_count: 10,
    description: 'description1',
  },
  {
    id: 2,
    name: 'repository2',
    watchers_count: 20,
    description: 'description2',
  },
] as Repository[];

const setup = () => {
  return render(<RepositoriesList userLogin="testuser" />);
};

describe('RepositoriesList component', () => {
  it('renders loading indicator when loading', () => {
    (useGetRepositories as jest.Mock).mockReturnValue({
      data: undefined,
      isFetching: true,
      isLoading: true,
      fetchNextPage: jest.fn(),
    });

    const { getByTestId } = setup();
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders repositories list when data is available', async () => {
    (useGetRepositories as jest.Mock).mockReturnValue({
      data: { pages: [{ items: mockRepositories }] },
      isFetching: false,
      isLoading: false,
      fetchNextPage: jest.fn(),
    });

    const { getByTestId } = setup();
    await waitFor(() => {
      expect(getByTestId('repositories-list')).toBeTruthy();
    });
  });

  it('renders empty list component when no repositories are found', async () => {
    (useGetRepositories as jest.Mock).mockReturnValue({
      data: { pages: [{ items: [] }] },
      isFetching: false,
      isLoading: false,
      fetchNextPage: jest.fn(),
    });

    const { getByText } = setup();

    await waitFor(() => {
      expect(getByText('No repositories found')).toBeTruthy();
    });
  });
});
