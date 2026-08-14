import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../theme/colors';

const ScreenShell = ({ children, scrollable = true }) => {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
      </SafeAreaView>
    );
  }
  return <SafeAreaView style={styles.safe}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.background },
  container: { padding: 16, gap: 12 },
});

export default ScreenShell;


