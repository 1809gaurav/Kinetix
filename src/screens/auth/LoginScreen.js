import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenShell from '../../components/ScreenShell';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme/colors';

const LoginScreen = ({ navigation }) => {
  const { login, authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async () => {
    setError('');
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <ScreenShell>
      <View style={styles.hero}>
        <Text style={styles.title}>KINETIX</Text>
        <Text style={styles.subtitle}>High-energy training for your goals.</Text>
      </View>
      <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
      <Input label="Password" value={password} onChangeText={setPassword} placeholder="********" secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton title="Login & Enter" onPress={onSubmit} loading={authLoading} />
      <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>New here? Create your KINETIX account</Text>
      </TouchableOpacity>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  hero: { marginVertical: 20 },
  title: { fontSize: 32, fontWeight: '800', color: theme.text },
  subtitle: { color: theme.muted, marginTop: 6 },
  linkRow: { marginTop: 18, alignItems: 'center' },
  link: { color: theme.accent, fontWeight: '700' },
  error: { color: '#ff7b7b', marginBottom: 8 },
});

export default LoginScreen;


