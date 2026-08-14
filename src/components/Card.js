import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme/colors';

const Card = ({ children, style }) => <View style={[styles.card, style]}>{children}</View>;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1f1f25',
  },
});

export default Card;


