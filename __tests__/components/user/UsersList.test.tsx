import React from 'react';
import { render } from '@testing-library/react-native';
import { User } from '@/types';
import { UsersList } from '@/components/user';

jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  useSafeAreaInsets: () => ({ bottom: 10 }),
}));

const mockUsers = [
  {
    id: 1,
    login: 'user1',
  },
  {
    id: 2,
    name: 'user2',
    watchers_count: 20,
    description: 'description2',
  },
] as User[];

const setup = (users: User[] | undefined, isFetching: boolean) => {
  return render(
    <UsersList
      users={users}
      searchValue="testSearch"
      isFetching={isFetching}
    />,
  );
};

describe('UsersList component', () => {
  it('renders loading indicator when loading', async () => {
    const { findByTestId } = setup([], true);
    const usersList = await findByTestId('activity-indicator');
    expect(usersList).toBeTruthy();
  });

  it('renders users list when data is available', async () => {
    const { findByTestId } = setup(mockUsers, false);
    const usersList = await findByTestId('users-list');
    expect(usersList).toBeTruthy();
  });

  it('renders empty list component when no users are found', async () => {
    const { findByText } = setup([], false);
    const usersList = await findByText('No results found');
    expect(usersList).toBeTruthy();
  });
});
