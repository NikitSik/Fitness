import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';
import { requestHealthPermissions, subscribeToSteps } from '../services/health';

export interface ActivitySnapshot {
  dailySteps: number;
  dailyMeters: number;
  goalMeters: number;
  earnedMinutes: number;
  remainingMinutes: number;
  walking: boolean;
  weeklySteps: { date: string; steps: number }[];
}

const DAILY_GOAL = 500;
const DEFAULT_ALLOWANCE_MINUTES = 45;

const useActivityTracking = () => {
  const [snapshot, setSnapshot] = useState<ActivitySnapshot>({
    dailySteps: 0,
    dailyMeters: 0,
    goalMeters: DAILY_GOAL,
    earnedMinutes: 0,
    remainingMinutes: DEFAULT_ALLOWANCE_MINUTES,
    walking: false,
    weeklySteps: []
  });

  const hydrateSteps = useCallback(async () => {
    try {
      await requestHealthPermissions();
      const { daily, weekly } = await subscribeToSteps();
      setSnapshot((prev) => ({
        ...prev,
        dailySteps: daily.steps,
        dailyMeters: daily.meters,
        earnedMinutes: daily.minutesEarned,
        remainingMinutes: Math.max(0, daily.minutesEarned - daily.minutesSpent + DEFAULT_ALLOWANCE_MINUTES),
        weeklySteps: weekly
      }));
    } catch (error) {
      console.error('Failed to hydrate steps', error);
      Alert.alert('Ошибка', 'Не удалось получить данные шагов. Проверьте разрешения.');
    }
  }, []);

  useEffect(() => {
    hydrateSteps();
  }, [hydrateSteps]);

  const startTracking = useCallback(async () => {
    try {
      await requestHealthPermissions(true);
      setSnapshot((prev) => ({ ...prev, walking: true }));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      Alert.alert('Ошибка', 'Нужно разрешение на чтение шагов.');
    }
  }, []);

  const stopTracking = useCallback(async () => {
    setSnapshot((prev) => ({ ...prev, walking: false }));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  return useMemo(
    () => ({
      snapshot,
      startTracking,
      stopTracking
    }),
    [snapshot, startTracking, stopTracking]
  );
};

export default useActivityTracking;
