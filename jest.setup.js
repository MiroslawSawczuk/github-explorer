/* eslint-env jest */

jest.mock('react-native-paper', () => ({
  ...jest.requireActual('react-native-paper'),
  Icon: () => <></>,
}));
