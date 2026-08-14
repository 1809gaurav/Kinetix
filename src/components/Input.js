import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/colors';

const Input = ({ label, ...props }) => (
  <View style={styles.container}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <TextInput placeholderTextColor={theme.muted} style={styles.input} {...props} />
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { color: theme.muted, marginBottom: 6, fontWeight: '600' },
  input: {
    backgroundColor: theme.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: theme.text,
    borderWidth: 1,
    borderColor: '#24242c',
  },
});

export default Input;


