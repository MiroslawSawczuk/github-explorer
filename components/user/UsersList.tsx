import { View, StyleSheet, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useCallback } from 'react';
import { ListEmpty } from './ListEmpty';
import { UserItem } from './UserItem';
import { User } from '@/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListItemSeparator } from '../shared';

type Props = {
  users: User[] | undefined;
  searchValue: string;
  isFetching: boolean;
};
export const UsersList = ({ users, searchValue, isFetching }: Props) => {
  const styles = useStyles(!users?.length);

  const keyExtractor = useCallback((item: User) => item.login, []);
  const renderItem = useCallback(
    ({ item }: { item: User }) => <UserItem user={item} />,
    [],
  );

  if (!searchValue || users === undefined) return null;

  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator
          testID="activity-indicator"
          style={styles.container}
          size="large"
        />
      ) : (
        <FlatList
          testID="users-list"
          data={users}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={ListItemSeparator}
          ListEmptyComponent={ListEmpty}
          contentContainerStyle={styles.content}
          style={styles.container}
        />
      )}
    </View>
  );
};

const useStyles = (isEmpty: boolean) => {
  const { bottom } = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: isEmpty ? 1 : undefined,
      paddingBottom: bottom + 10,
    },
  });
};
