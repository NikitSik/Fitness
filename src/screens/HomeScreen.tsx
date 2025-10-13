import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import GradientScreen from '../components/GradientScreen';
import RoundedCard from '../components/RoundedCard';
import ProgressBar from '../components/ProgressBar';
import { useActivity } from '../context/ActivityContext';
import { useSettings } from '../context/SettingsContext';
import { enforceBlocking } from '../services/app-limiter';

const HomeScreen: React.FC = () => {
  const { dailyMeters, goalMeters, earnedMinutes, remainingMinutes, walking, startWalk, stopWalk } = useActivity();
  const { trackedApps } = useSettings();

  const progress = goalMeters ? dailyMeters / goalMeters : 0;

  const handlePress = async () => {
    if (walking) {
      await stopWalk();
    } else {
      await startWalk();
    }
  };

  useEffect(() => {
    enforceBlocking(remainingMinutes, trackedApps);
  }, [remainingMinutes, trackedApps]);

  return (
    <GradientScreen>
      <View style={styles.container}>
        <Text style={styles.minutesLabel}>Осталось экранного времени</Text>
        <Text style={styles.minutesValue}>{Math.round(remainingMinutes)} мин</Text>
        <RoundedCard>
          <View style={styles.progressHeader}>
            <Text style={styles.cardTitle}>Сегодня</Text>
            <Text style={styles.cardValue}>{Math.round(dailyMeters)}/{goalMeters} м</Text>
          </View>
          <ProgressBar progress={progress} />
          <Text style={styles.smallText}>{earnedMinutes.toFixed(0)} мин заработано</Text>
        </RoundedCard>
        <Pressable style={[styles.walkButton, walking && styles.walkButtonActive]} onPress={handlePress}>
          <Text style={styles.walkButtonText}>{walking ? 'Стоп' : 'Go for a walk'}</Text>
        </Pressable>
        <RoundedCard background="rgba(255,255,255,0.25)">
          <Text style={styles.cardTitle}>Акция дня</Text>
          <Text style={styles.cardValue}>Сегодня: x2 минуты за шаги</Text>
        </RoundedCard>
      </View>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  minutesLabel: {
    color: '#dce9ff',
    fontSize: 16
  },
  minutesValue: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 24
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600'
  },
  cardValue: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600'
  },
  smallText: {
    marginTop: 12,
    color: '#f1f5ff'
  },
  walkButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 20
  },
  walkButtonActive: {
    backgroundColor: '#3ed598'
  },
  walkButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0a4bdc'
  }
});

export default HomeScreen;
