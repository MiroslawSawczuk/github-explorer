import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const ListEmpty = memo(() => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>No results found</Text>
    </View>
  );
});

ListEmpty.displayName = 'ListEmpty';

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
