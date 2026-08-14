import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ScreenShell from '../../components/ScreenShell';
import Card from '../../components/Card';
import PrimaryButton from '../../components/PrimaryButton';
import SectionHeader from '../../components/SectionHeader';
import { theme } from '../../theme/colors';
import api from '../../services/api';

const MealPlanScreen = () => {
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadPlan = async () => {
    setLoading(true);
    try {
      const res = await api.get('/meals/latest');
      setMealPlan(res.data.mealPlan);
    } catch (e) {
      console.log('Meal fetch failed', e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlan();
  }, []);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await api.post('/meals/generate', { preference: mealPlan?.preference || 'Veg' });
      setMealPlan(res.data.mealPlan);
    } catch (e) {
      console.log('Meal generate failed', e?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenShell>
      <SectionHeader title="Meal Planner" subtitle="Indian, simple, protein-focused" />
      <PrimaryButton title={mealPlan ? 'Refresh Plan' : 'Generate Plan'} onPress={generate} loading={loading} />
      {mealPlan ? (
        <FlatList
          data={mealPlan.plan}
          keyExtractor={(item) => item.day}
          renderItem={({ item }) => (
            <Card style={{ marginTop: 10 }}>
              <Text style={styles.day}>{item.day}</Text>
              {item.meals.map((meal) => (
                <Text key={meal.name} style={styles.meal}>
                  • {meal.name} — {meal.calories} kcal · {meal.protein}g protein
                </Text>
              ))}
            </Card>
          )}
        />
      ) : (
        <Text style={styles.placeholder}>{loading ? 'Loading...' : 'No meal plan yet.'}</Text>
      )}
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  day: { color: theme.text, fontWeight: '800', marginBottom: 6 },
  meal: { color: theme.muted, marginBottom: 4 },
  placeholder: { color: theme.muted, marginTop: 12 },
});

export default MealPlanScreen;


