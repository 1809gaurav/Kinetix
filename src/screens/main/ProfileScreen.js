import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenShell from '../../components/ScreenShell';
import Card from '../../components/Card';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import SectionHeader from '../../components/SectionHeader';
import { theme } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = () => {
  const { user, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    weightKg: String(user?.weightKg || ''),
    heightCm: String(user?.heightCm || ''),
  });

  const save = async () => {
    await updateProfile({ ...form, weightKg: Number(form.weightKg), heightCm: Number(form.heightCm) });
    setEditing(false);
  };

  return (
    <ScreenShell>
      <SectionHeader title="Profile" subtitle="Your stats" />
      <Card>
        <Text style={styles.label}>Name</Text>
        <Input value={form.fullName} onChangeText={(v) => setForm({ ...form, fullName: v })} editable={editing} />
        <Text style={styles.label}>Height (cm)</Text>
        <Input
          value={form.heightCm}
          onChangeText={(v) => setForm({ ...form, heightCm: v })}
          editable={editing}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Weight (kg)</Text>
        <Input
          value={form.weightKg}
          onChangeText={(v) => setForm({ ...form, weightKg: v })}
          editable={editing}
          keyboardType="numeric"
        />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <PrimaryButton title={editing ? 'Save' : 'Edit'} onPress={editing ? save : () => setEditing(true)} style={{ flex: 1 }} />
          <PrimaryButton title="Logout" onPress={logout} style={{ flex: 1 }} />
        </View>
      </Card>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  label: { color: theme.muted, marginTop: 6 },
});

export default ProfileScreen;


