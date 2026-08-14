import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/colors';

const StatBadge = ({ label, value, accent }) => (
  <View style={[styles.badge, accent && { borderColor: accent }]}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, accent && { color: accent }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderColor: '#2a2a33',
    borderRadius: 12,
    padding: 12,
    minWidth: 120,
  },
  label: { color: theme.muted, fontSize: 12, marginBottom: 4 },
  value: { color: theme.text, fontSize: 18, fontWeight: '700' },
});

export default StatBadge;


