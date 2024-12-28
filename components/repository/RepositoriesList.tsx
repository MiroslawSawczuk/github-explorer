import React, { useCallback, useMemo } from 'react';
import { StyleSheet, FlatList, View, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { ListItemSeparator } from '../shared/ListItemSeparator';
import { useGetRepositories } from '@/api/api/query/useGetRepositories';
import { Repository } from '@/types';
import { RepositoryItem } from './RepositoryItem';
import { ListEmpty } from './ListEmpty';
import { ListFooter } from './ListFooter';

type Props = {
  userLogin: string;
};
export const RepositoriesList = ({ userLogin }: Props) => {
  const styles = useStyles();
  const { data, isFetching, isLoading, isError, fetchNextPage } =
    useGetRepositories(userLogin);

  const repositories = useMemo(
    () => data?.pages.flatMap(page => page.items) || [],
    [data],
  );

  const isLoadingMore = useMemo(
    () => isFetching && !!repositories.length,
    [isFetching, repositories],
  );

  const keyExtractor = useCallback(
    (item: Repository) => item.id.toString(),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: Repository }) => <RepositoryItem repository={item} />,
    [],
  );

  const onEndReached = useCallback(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetching]);

  if (isError) {
    Alert.alert('Error', 'Something went wrong');
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator testID="activity-indicator" style={styles.spinner} />
      ) : (
        <FlatList
          testID="repositories-list"
          data={repositories}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={ListItemSeparator}
          ListEmptyComponent={ListEmpty}
          ListFooterComponent={<ListFooter isLoading={isLoadingMore} />}
          style={styles.content}
          initialNumToRender={5}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          windowSize={10}
        />
      )}
    </View>
  );
};

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      minHeight: 50,
      marginTop: 15,
    },
    content: {
      flex: 1,
      marginLeft: 40,
    },
    spinner: {
      flex: 1,
    },
  });
