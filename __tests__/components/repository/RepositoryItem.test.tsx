import React from 'react';
import { RepositoryItem } from '@/components/repository';
import { Repository } from '@/types/repository';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';

const mockRepository = {
  name: 'repository name',
  watchers_count: 10,
  description: 'repository description',
} as Repository;

const setup = () => {
  return render(<RepositoryItem repository={mockRepository} />);
};

describe('RepositoryItem component', () => {
  it('title is visible', async () => {
    const instance = setup();
    const component = await instance.findByText(mockRepository.name);
    expect(component).toBeTruthy();
  });

  it('watchers_count is visible', async () => {
    const instance = setup();
    const component = await instance.findByText(
      mockRepository.watchers_count.toString(),
    );
    expect(component).toBeTruthy();
  });

  it('description is visible', async () => {
    const instance = setup();
    const component = await instance.findByText(mockRepository.description);
    expect(component).toBeTruthy();
  });
});
