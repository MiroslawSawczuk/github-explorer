import { memo } from 'react';
import { View, StyleSheet } from 'react-native';

export const ListItemSeparator = memo(() => {
  const styles = useStyles();

  return <View style={styles.container} />;
});

ListItemSeparator.displayName = 'ListItemSeparator';

const useStyles = () =>
  StyleSheet.create({
    container: {
      height: 15,
    },
  });
