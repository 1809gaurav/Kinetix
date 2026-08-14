import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenShell from '../../components/ScreenShell';
import Card from '../../components/Card';
import SectionHeader from '../../components/SectionHeader';
import PrimaryButton from '../../components/PrimaryButton';
import Input from '../../components/Input';
import { theme } from '../../theme/colors';
import api from '../../services/api';

const ProgressScreen = () => {
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState({});
  const [weight, setWeight] = useState('');
  const [steps, setSteps] = useState('');
  const [loading, setLoading] = useState(false);

  const loadProgress = async () => {
    setLoading(true);
    try {
      const res = await api.get('/progress');
      setEntries(res.data.entries || []);
      setSummary(res.data.summary || {});
    } catch (e) {
      console.log('Progress fetch failed', e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const addEntry = async () => {
    try {
      await api.post('/progress/weight', { weightKg: Number(weight), steps: Number(steps || 0) });
      setWeight('');
      setSteps('');
      loadProgress();
    } catch (e) {
      console.log('Add entry failed', e?.message);
    }
  };

  return (
    <ScreenShell>
      <SectionHeader title="Progress" subtitle="Track weight and steps" />
      <Card>
        <Text style={styles.summary}>Completion rate: {summary.completionRate || 0}%</Text>
        <Text style={styles.summary}>Avg weight (7d): {summary.avgWeight || '—'} kg</Text>
        <Text style={styles.summary}>Calories burned est.: {summary.caloriesBurned || 0} kcal</Text>
      </Card>

      <Card>
        <Text style={styles.label}>Log today</Text>
        <Input label="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
        <Input label="Steps" value={steps} onChangeText={setSteps} keyboardType="numeric" />
        <PrimaryButton title="Save entry" onPress={addEntry} />
      </Card>

      <Text style={styles.section}>History</Text>
      <FlatList
        data={entries}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Text style={styles.entry}>Weight: {item.weightKg} kg</Text>
            <Text style={styles.entry}>Steps: {item.steps}</Text>
            <Text style={styles.entry}>On: {new Date(item.createdAt).toDateString()}</Text>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.placeholder}>{loading ? 'Loading...' : 'No entries yet.'}</Text>}
      />
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  summary: { color: theme.text, marginBottom: 4 },
  label: { color: theme.text, fontWeight: '700', marginBottom: 6 },
  section: { color: theme.text, fontSize: 16, fontWeight: '700', marginTop: 12 },
  entry: { color: theme.muted },
  placeholder: { color: theme.muted, marginTop: 10 },
});

export default ProgressScreen;


