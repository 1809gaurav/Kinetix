import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

const QuickAction = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.action} onPress={onPress}>
    <Ionicons name={icon} color={theme.accent} size={22} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.surface,
    padding: 12,
    borderRadius: 12,
    borderColor: '#23232b',
    borderWidth: 1,
  },
  label: { color: theme.text, fontWeight: '600', fontSize: 14 },
});

export default QuickAction;


