import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ScreenShell from '../../components/ScreenShell';
import Card from '../../components/Card';
import PrimaryButton from '../../components/PrimaryButton';
import SectionHeader from '../../components/SectionHeader';
import { theme } from '../../theme/colors';
import api from '../../services/api';

const WorkoutItem = ({ item, onComplete }) => (
  <Card style={{ marginBottom: 10 }}>
    <Text style={styles.title}>{item.title}</Text>
    {item.exercises?.map((ex) => (
      <Text key={ex.name} style={styles.exercise}>
        • {ex.name} · {ex.sets} x {ex.reps} · {ex.muscleGroup}
      </Text>
    ))}
    <TouchableOpacity onPress={() => onComplete(item._id)} style={styles.completeRow}>
      <Text style={[styles.status, { color: item.completed ? theme.success : theme.accent }]}>
        {item.completed ? 'Completed' : 'Mark complete'}
      </Text>
    </TouchableOpacity>
  </Card>
);

const WorkoutScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const loadWorkouts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/workouts');
      setWorkouts(res.data.workouts || []);
    } catch (e) {
      console.log('Workout load failed', e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const generate = async () => {
    setGenerating(true);
    try {
      const res = await api.post('/workouts/generate', { daysPerWeek: 5 });
      setWorkouts(res.data.workouts);
    } catch (e) {
      console.log('Generate failed', e?.message);
    } finally {
      setGenerating(false);
    }
  };

  const markComplete = async (id) => {
    await api.post(`/workouts/${id}/complete`);
    loadWorkouts();
  };

  return (
    <ScreenShell>
      <SectionHeader title="Your Workout Plan" subtitle="Personalized by KINETIX" />
      <PrimaryButton title="Generate / Refresh Plan" onPress={generate} loading={generating} />
      <FlatList
        data={workouts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <WorkoutItem item={item} onComplete={markComplete} />}
        style={{ marginTop: 12 }}
        ListEmptyComponent={<Text style={styles.empty}>{loading ? 'Loading...' : 'No workouts yet.'}</Text>}
      />
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  title: { color: theme.text, fontWeight: '700', fontSize: 16, marginBottom: 6 },
  exercise: { color: theme.muted, marginBottom: 4 },
  status: { fontWeight: '700' },
  completeRow: { marginTop: 8 },
  empty: { color: theme.muted, textAlign: 'center', marginTop: 12 },
});

export default WorkoutScreen;


