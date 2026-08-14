import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenShell from '../../components/ScreenShell';
import Card from '../../components/Card';
import SectionHeader from '../../components/SectionHeader';
import { theme } from '../../theme/colors';

const exercises = [
  { name: 'Push-up', muscleGroup: 'Chest', movementType: 'Compound' },
  { name: 'Squat', muscleGroup: 'Legs', movementType: 'Compound' },
  { name: 'Plank', muscleGroup: 'Core', movementType: 'Isometric' },
  { name: 'Jumping Jacks', muscleGroup: 'Full Body', movementType: 'Cardio' },
];

const CameraScreen = () => {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [detecting, setDetecting] = useState(false);
  const [detected, setDetected] = useState(null);

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission, requestPermission]);

  const startDetection = async () => {
    setDetecting(true);
    // Simple heuristic: cycle through known exercises to mimic detection pipeline
    let idx = 0;
    const interval = setInterval(() => {
      setDetected(exercises[idx % exercises.length]);
      idx += 1;
    }, 1800);

    setTimeout(() => {
      clearInterval(interval);
      setDetecting(false);
    }, 8000);
  };

  return (
    <ScreenShell scrollable={false}>
      <SectionHeader title="Exercise Detection" subtitle="Camera-assisted form checks" />
      <View style={styles.cameraWrap}>
        {permission?.granted ? (
          <Camera ref={cameraRef} style={StyleSheet.absoluteFill} type={CameraType.front} />
        ) : (
          <Text style={{ color: theme.muted }}>Camera permission needed.</Text>
        )}
      </View>
      <PrimaryButton title={detecting ? 'Analyzing...' : 'Start Detection'} onPress={startDetection} loading={detecting} />

      <Card>
        <SectionHeader title="Detected Exercise" />
        {detected ? (
          <>
            <Text style={styles.result}>{detected.name}</Text>
            <Text style={styles.detail}>Muscle: {detected.muscleGroup}</Text>
            <Text style={styles.detail}>Type: {detected.movementType}</Text>
          </>
        ) : (
          <Text style={styles.detail}>No movement detected yet.</Text>
        )}
      </Card>
    </ScreenShell>
  );
};

const styles = StyleSheet.create({
  cameraWrap: {
    height: 260,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2a2a33',
    marginBottom: 14,
    backgroundColor: '#111',
  },
  result: { color: theme.text, fontSize: 20, fontWeight: '800', marginBottom: 6 },
  detail: { color: theme.muted },
});

export default CameraScreen;


