import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenShell from '../../components/ScreenShell';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuth } from '../../context/AuthContext';
import { theme } from '../../theme/colors';

const options = {
  gender: ['Male', 'Female', 'Other'],
  goal: ['Fat Loss', 'Muscle Gain', 'Maintenance', 'Powerlifting', 'Aesthetic Physique'],
  preference: ['Home Workout', 'Gym Workout'],
  activity: ['Low', 'Normal', 'Active', 'Very Active'],
};

const ChipRow = ({ values, selected, onSelect }) => (
  <View style={styles.row}>
    {values.map((val) => (
      <TouchableOpacity
        key={val}
        style={[styles.chip, selected === val && styles.chipActive]}
        onPress={() => onSelect(val)}
      >
        <Text style={[styles.chipText, selected === val && styles.chipTextActive]}>{val}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const SignupScreen = ({ navigation }) => {
  const { signup, authLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: 'Male',
    heightCm: '',
    weightKg: '',
    fitnessGoal: 'Fat Loss',
    workoutPreference: 'Home Workout',
    activityLevel: 'Normal',
  });

  const goNext = () => setStep((s) => Math.min(s + 1, 2));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setError('');
    try {
      await signup({ ...form, heightCm: Number(form.heightCm), weightKg: Number(form.weightKg) });
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <ScreenShell>
      <Text style={styles.title}>Create your KINETIX account</Text>
      <Text style={styles.subtitle}>3 quick steps to personalize your program.</Text>

      {step === 0 && (
        <>
          <Input label="Full Name" value={form.fullName} onChangeText={(v) => setForm({ ...form, fullName: v })} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={(v) => setForm({ ...form, email: v })}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(v) => setForm({ ...form, password: v })}
            secureTextEntry
            placeholder="********"
          />
          <Text style={styles.stepTag}>Step 1 of 3 · Account</Text>
        </>
      )}

      {step === 1 && (
        <>
          <Text style={styles.label}>Gender</Text>
          <ChipRow
            values={options.gender}
            selected={form.gender}
            onSelect={(gender) => setForm({ ...form, gender })}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Input
                label="Height (cm)"
                value={form.heightCm}
                keyboardType="numeric"
                onChangeText={(v) => setForm({ ...form, heightCm: v })}
              />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
              <Input
                label="Weight (kg)"
                value={form.weightKg}
                keyboardType="numeric"
                onChangeText={(v) => setForm({ ...form, weightKg: v })}
              />
            </View>
          </View>
          <Text style={styles.stepTag}>Step 2 of 3 · Body metrics</Text>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.label}>Fitness Goal</Text>
          <ChipRow
            values={options.goal}
            selected={form.fitnessGoal}
            onSelect={(fitnessGoal) => setForm({ ...form, fitnessGoal })}
          />
          <Text style={styles.label}>Workout Preference</Text>
          <ChipRow
            values={options.preference}
            selected={form.workoutPreference}
            onSelect={(workoutPreference) => setForm({ ...form, workoutPreference })}
          />
          <Text style={styles.label}>Activity Level</Text>
          <ChipRow
            values={options.activity}
            selected={form.activityLevel}
            onSelect={(activityLevel) => setForm({ ...form, activityLevel })}
          />
          <Text style={styles.stepTag}>Step 3 of 3 · Training style</Text>
        </>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.row}>
        {step > 0 ? <PrimaryButton title="Back" onPress={goBack} style={{ flex: 1 }} /> : null}
        <View style={{ width: step > 0 ? 12 : 0 }} />
        {step < 2 ? (
          <PrimaryButton title="Next" onPress={goNext} style={{ flex: step > 0 ? 1 : 1 }} />
        ) : (
          <PrimaryButton title="Finish & Train" onPress={handleSubmit} loading={authLoading} style={{ flex: 1 }} />
        )}
      </View>

      <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already registered? Login</Text>
      </TouchableOpacity>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '800', color: theme.text, marginTop: 6 },
  subtitle: { color: theme.muted, marginBottom: 12 },
  label: { color: theme.muted, marginBottom: 6, fontWeight: '700' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a33',
  },
  chipActive: { borderColor: theme.accent, backgroundColor: '#1c1c22' },
  chipText: { color: theme.muted },
  chipTextActive: { color: theme.text, fontWeight: '700' },
  stepTag: { color: theme.muted, marginTop: 8 },
  linkRow: { marginTop: 18, alignItems: 'center' },
  link: { color: theme.accent, fontWeight: '700' },
  error: { color: '#ff7b7b', marginVertical: 8 },
});

export default SignupScreen;


