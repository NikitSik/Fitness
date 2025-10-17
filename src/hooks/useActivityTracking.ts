import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';
import { format, subDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { requestHealthPermissions, subscribeToSteps } from '../services/health';
import { ActivitySnapshot, AchievementSnapshot, WeeklyTrendPoint } from '../types/activity';

const STEP_LENGTH_METERS = 0.8;
const METERS_PER_MINUTE_RATE = 10 / 100; // 100 м = 10 минут
const DAILY_GOAL_METERS = 500;
const DEFAULT_ALLOWANCE_MINUTES = 45;
const PLACEHOLDER_SPENT_MINUTES = 18;
const LIFETIME_OFFSET_METERS = 12000;

const metersToMinutes = (meters: number, multiplier: number) => meters * METERS_PER_MINUTE_RATE * multiplier;
const metersToSteps = (meters: number) => Math.round(meters / STEP_LENGTH_METERS);

const createAchievementSnapshot = (totalMeters: number): AchievementSnapshot[] => {
  const milestones = [
    { id: '1k', meters: 1000, label: '1 км — Новичок' },
    { id: '10k', meters: 10000, label: '10 км — Исследователь' },
    { id: '50k', meters: 50000, label: '50 км — Чемпион' },
    { id: '100k', meters: 100000, label: '100 км — Легенда' }
  ];

  return milestones.map((milestone) => {
    const progress = Math.min(1, totalMeters / milestone.meters);
    return {
      id: milestone.id,
      label: milestone.label,
      metersRequired: milestone.meters,
      completed: progress >= 1,
      progress
    };
  });
};

const mapWeeklyTrend = (
  weeklyRaw: { date: string; steps: number }[],
  previous: WeeklyTrendPoint[]
): WeeklyTrendPoint[] => {
  const today = new Date();
  const goalSteps = metersToSteps(DAILY_GOAL_METERS);

  return Array.from({ length: 7 }).map((_, index) => {
    const dayDate = subDays(today, 6 - index);
    const isoDate = dayDate.toISOString().slice(0, 10);
    const match = weeklyRaw.find((entry) => entry.date.slice(0, 10) === isoDate);
    const fallback = previous[index]?.steps ?? goalSteps;
    const steps = match?.steps ?? fallback;

    return {
      label: format(dayDate, 'EE', { locale: ru }).toUpperCase(),
      steps,
      target: goalSteps
    };
  });
};

const useActivityTracking = () => {
  const [snapshot, setSnapshot] = useState<ActivitySnapshot>({
    daily: {
      steps: 0,
      meters: 0,
      goalMeters: DAILY_GOAL_METERS,
      baseAllowanceMinutes: DEFAULT_ALLOWANCE_MINUTES,
      earnedMinutes: 0,
      spentMinutes: PLACEHOLDER_SPENT_MINUTES,
      remainingMinutes: DEFAULT_ALLOWANCE_MINUTES - PLACEHOLDER_SPENT_MINUTES,
      multiplier: 1,
      challenge: 'Пройди 4 000 шагов сегодня',
      reward: '+15 минут бонуса'
    },
    weekly: Array.from({ length: 7 }).map((_, index) => ({
      label: format(subDays(new Date(), 6 - index), 'EE', { locale: ru }).toUpperCase(),
      steps: 0,
      target: metersToSteps(DAILY_GOAL_METERS)
    })),
    achievements: createAchievementSnapshot(LIFETIME_OFFSET_METERS),
    walking: false,
    streakDays: 0,
    lifetimeMeters: LIFETIME_OFFSET_METERS
  });

  const hydrateSteps = useCallback(async () => {
    try {
      await requestHealthPermissions();
      const { daily, weekly } = await subscribeToSteps();

      setSnapshot((prev) => {
        const multiplier = daily.steps > 3000 ? 2 : 1;
        const earned = metersToMinutes(daily.meters, multiplier);
        const remaining = Math.max(
          0,
          prev.daily.baseAllowanceMinutes + earned - prev.daily.spentMinutes
        );

        const challengeCompleted = daily.steps >= 4000;
        const weeklyTrend = mapWeeklyTrend(weekly, prev.weekly);
        const totalMeters = LIFETIME_OFFSET_METERS + daily.meters;
        const streak = daily.meters >= prev.daily.goalMeters ? prev.streakDays + 1 : 0;

        return {
          daily: {
            steps: daily.steps,
            meters: daily.meters,
            goalMeters: prev.daily.goalMeters,
            baseAllowanceMinutes: prev.daily.baseAllowanceMinutes,
            earnedMinutes: earned,
            spentMinutes: prev.daily.spentMinutes,
            remainingMinutes: remaining,
            multiplier,
            challenge: challengeCompleted ? 'Челлендж выполнен' : 'Пройди 4 000 шагов сегодня',
            reward: challengeCompleted ? '+15 минут начислено' : '+15 минут бонуса'
          },
          weekly: weeklyTrend,
          achievements: createAchievementSnapshot(totalMeters),
          walking: prev.walking,
          streakDays: streak,
          lifetimeMeters: totalMeters
        };
      });
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
