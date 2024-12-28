import { ListFooter } from '@/components/repository';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';

const setup = (isLoading: boolean) => {
  return render(<ListFooter isLoading={isLoading} />);
};

describe('ListFooter component', () => {
  it(' is visible when loading', async () => {
    const instance = setup(true);
    const component = await instance.findByTestId('repository-list-footer');
    expect(component).toBeTruthy();
  });

  it('is hidden when not loading', async () => {
    const instance = setup(false);
    const component = instance.toJSON();
    expect(component).toBeNull();
  });
});
