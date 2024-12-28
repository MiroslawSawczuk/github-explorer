import React from 'react';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { User } from '@/types';
import { UserItem } from '@/components/user';

const mockUser = {
  id: 1,
  login: 'user1',
} as User;

const setup = () => {
  return render(<UserItem user={mockUser} />);
};

describe('UserItem component', () => {
  it('login is visible', async () => {
    const instance = setup();
    const component = await instance.findByText(mockUser.login);
    expect(component).toBeTruthy();
  });
});
