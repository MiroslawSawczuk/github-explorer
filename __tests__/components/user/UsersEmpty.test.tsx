import { ListEmpty } from '@/components/user';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';

const setup = () => {
  return render(<ListEmpty />);
};

describe('ListEmpty component', () => {
  it('renders without crashing', () => {
    const component = setup().toJSON();
    expect(component).toMatchSnapshot();
  });
});
