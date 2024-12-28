import React, { memo, useState } from 'react';
import { StyleSheet, Pressable, View, Image } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';
import { RepositoriesList } from '../repository/RepositoriesList';
import { User } from '@/types/user';

type Props = {
  user: User;
};
export const UserItem = memo(({ user }: Props) => {
  const styles = useStyles();
  const [expanded, setExpanded] = useState(false);

  const onPress = () => setExpanded(prev => !prev);

  return (
    <>
      <Pressable style={styles.container} onPress={onPress}>
        <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text variant="titleSmall" style={styles.username}>
            {user.login}
          </Text>
          <Text variant="bodySmall" style={styles.url}>
            {user.html_url}
          </Text>
        </View>

        <Icon source={expanded ? 'chevron-up' : 'chevron-down'} size={30} />
      </Pressable>

      {expanded && <RepositoriesList userLogin={user.login} />}
    </>
  );
});

UserItem.displayName = 'UserItem';

const useStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginHorizontal: 16,
      backgroundColor: colors.surfaceVariant,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    infoContainer: {
      flex: 1,
    },
    username: {
      fontWeight: '600',
      fontSize: 18,
      color: colors.primary,
    },
    url: {
      fontSize: 14,
      color: colors.secondary,
    },
  });
};
