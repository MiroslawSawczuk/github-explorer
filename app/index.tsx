import { Alert, StyleSheet } from 'react-native';
import { useSearchUser } from '@/api/api';
import { Button, Searchbar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/shared/Layout';
import { User } from '@/types';
import { UsersList } from '@/components/user/UsersList';

const Home = () => {
  const styles = useStyles();
  const [searchValue, setSearchValue] = useState<string>('');
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const { data, isFetching, refetch, isError } = useSearchUser(
    searchValue.toLocaleLowerCase(),
  );

  const onPressSearch = () => refetch();
  const onPressClearSearch = () => setUsers(undefined);

  useEffect(() => {
    if (!isFetching) {
      setUsers(data?.items);
    }
  }, [data, isFetching]);

  useEffect(() => {
    if (!searchValue.length) {
      setUsers(undefined);
    }
  }, [searchValue]);

  if (isError) {
    Alert.alert('Error', 'Something went wrong');
  }

  return (
    <Layout>
      <Searchbar
        value={searchValue}
        onChangeText={text => setSearchValue(text)}
        placeholder="eg. Kowalsky"
        returnKeyType="done"
        onIconPress={onPressClearSearch}
      />
      <Button
        mode="contained"
        disabled={!searchValue || isFetching}
        style={styles.button}
        loading={isFetching}
        onPress={onPressSearch}>
        Search
      </Button>

      <UsersList
        users={users}
        searchValue={searchValue}
        isFetching={isFetching}
      />
    </Layout>
  );
};

const useStyles = () =>
  StyleSheet.create({
    button: {
      marginTop: 10,
      marginBottom: 10,
    },
  });

export default Home;
