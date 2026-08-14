import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenShell from '../../components/ScreenShell';
import Card from '../../components/Card';
import SectionHeader from '../../components/SectionHeader';
import StatBadge from '../../components/StatBadge';
import QuickAction from '../../components/QuickAction';
import { theme } from '../../theme/colors';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const buildRecommendation = (user) => {
  if (!user) return 'Tell us your goal to get a custom plan.';
  if (user.fitnessGoal === 'Powerlifting') return 'Focus on heavy triples for squat, bench, and deadlift. Rest 3-4 min.';
  if (user.fitnessGoal === 'Aesthetic Physique') return 'Push/Pull/Legs with controlled tempo and 8-12 reps. Prioritize volume.';
  if (user.fitnessGoal === 'Fat Loss') return 'Full-body circuits + 20 minutes of incline walk post session.';
  if (user.fitnessGoal === 'Muscle Gain') return '4-day Upper/Lower split with progressive overload and protein 1.6g/kg.';
  return 'Balanced training with steady-state cardio twice per week.';
};

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [progress, setProgress] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [wRes, pRes, mRes] = await Promise.all([
        api.get('/workouts'),
        api.get('/progress'),
        api.get('/meals/latest'),
      ]);
      setWorkouts(wRes.data.workouts || []);
      setProgress(pRes.data);
      setMealPlan(mRes.data.mealPlan);
    } catch (e) {
      console.log('Dashboard load failed', e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const todayWorkout = workouts.find((w) => new Date(w.scheduledFor).getDate() === new Date().getDate());

  return (
    <ScreenShell>
      <SectionHeader title="Welcome to KINETIX" subtitle={`Hi ${user?.fullName || ''}`} />

      <Card>
        <Text style={styles.sectionTitle}>Today’s Performance</Text>
        <View style={styles.badgeRow}>
          <StatBadge label="Steps" value={progress?.entries?.[0]?.steps || 5200} accent={theme.accent} />
          <StatBadge label="Calories" value={`${progress?.summary?.caloriesBurned || 420} kcal`} accent={theme.accentSecondary} />
        </View>
        <View style={styles.badgeRow}>
          <StatBadge label="Sleep" value="7h 10m" />
          <StatBadge
            label="Workout"
            value={todayWorkout?.completed ? 'Completed' : todayWorkout ? 'Scheduled' : 'Rest'}
            accent={todayWorkout?.completed ? theme.success : theme.warning}
          />
        </View>
      </Card>

      <Card>
        <SectionHeader title="AI Workout Recommendation" subtitle={user?.fitnessGoal} />
        <Text style={styles.body}>{buildRecommendation(user)}</Text>
        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('Workouts')}>
          <Text style={styles.ctaText}>View plan</Text>
        </TouchableOpacity>
      </Card>

      <SectionHeader title="Quick Actions" />
      <View style={styles.grid}>
        <QuickAction icon="play" label="Start Workout" onPress={() => navigation.navigate('Workouts')} />
        <QuickAction icon="camera" label="Exercise Detection" onPress={() => navigation.navigate('Camera')} />
        <QuickAction icon="restaurant" label="Meal Plan" onPress={() => navigation.navigate('Meals')} />
        <QuickAction icon="stats-chart" label="Progress" onPress={() => navigation.navigate('Progress')} />
      </View>

      <Card>
        <SectionHeader title="Motivation" subtitle="Own your session." />
        <Text style={styles.quote}>“The iron never lies. Earn every rep.”</Text>
      </Card>

      <Card>
        <SectionHeader title="Nutrition Snapshot" />
        <Text style={styles.body}>
          {mealPlan ? `${mealPlan.preference} plan · ${mealPlan.plan?.[0]?.meals?.[0]?.calories || 0} kcal breakfast idea.` : 'Generate your meal plan to see details.'}
        </Text>
      </Card>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { color: theme.text, fontWeight: '700', fontSize: 16, marginBottom: 8 },
  badgeRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  body: { color: theme.muted, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quote: { color: theme.text, fontSize: 16, fontWeight: '700' },
  cta: { marginTop: 10 },
  ctaText: { color: theme.accent, fontWeight: '700' },
});

export default DashboardScreen;


