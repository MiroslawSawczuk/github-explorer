import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

type Props = {
  isLoading: boolean;
};
export const ListFooter = memo(({ isLoading }: Props) => {
  const styles = useStyles();

  return isLoading ? (
    <View testID="repository-list-footer" style={styles.container}>
      <ActivityIndicator style={styles.spinner} />
    </View>
  ) : null;
});

ListFooter.displayName = 'ListFooter';

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: 50,
    },
    spinner: {
      flex: 1,
    },
  });
