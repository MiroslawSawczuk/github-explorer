import React, { PropsWithChildren, FC } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  isScrollView?: boolean;
};

export const Layout: FC<PropsWithChildren<Props>> = ({
  isScrollView = false,
  children,
}) => {
  const styles = useStyles();
  const Container = isScrollView ? ScrollView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container style={styles.container}>{children}</Container>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const { top, bottom } = useSafeAreaInsets();

  return StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingTop: top,
      paddingBottom: bottom,
      paddingHorizontal: 10,
    },
  });
};
