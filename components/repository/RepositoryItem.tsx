import { View, StyleSheet } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';
import { memo } from 'react';
import { Repository } from '@/types';

type Props = {
  repository: Repository;
};
export const RepositoryItem = memo(({ repository }: Props) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text variant="titleSmall" style={styles.title}>
            {repository.name}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.watchers}>{repository.watchers_count}</Text>
          <Icon source={'star'} size={20} />
        </View>
      </View>

      <Text
        variant="bodySmall"
        style={styles.description}
        numberOfLines={4}
        ellipsizeMode="tail">
        {repository.description}
      </Text>
    </View>
  );
});

RepositoryItem.displayName = 'RepositoryItem';

const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      marginHorizontal: 16,
      backgroundColor: colors.surface,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontWeight: '600',
      fontSize: 18,
      color: colors.primary,
    },
    watchers: {
      marginRight: 5,
      fontSize: 16,
      color: colors.secondary,
    },
    header: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: colors.secondary,
    },
  });
};
