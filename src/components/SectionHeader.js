import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/colors';

const SectionHeader = ({ title, subtitle }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 6 },
  title: { color: theme.text, fontSize: 18, fontWeight: '700' },
  subtitle: { color: theme.muted, marginTop: 2 },
});

export default SectionHeader;


