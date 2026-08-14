import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/colors';

const PrimaryButton = ({ title, onPress, loading, style }) => (
  <TouchableOpacity disabled={loading} onPress={onPress} style={style}>
    <LinearGradient colors={[theme.accent, theme.accentSecondary]} style={styles.button}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{title}</Text>}
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  text: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default PrimaryButton;


