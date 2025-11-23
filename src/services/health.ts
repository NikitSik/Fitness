import { Platform } from 'react-native';
import * as AppleHealthKit from 'react-native-health';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { startOfDay, subDays } from 'date-fns';

export interface StepDailySummary {
  steps: number;
  meters: number;
  minutesEarned: number;
  minutesSpent: number;
}

export interface StepsResponse {
  daily: StepDailySummary;
  weekly: { date: string; steps: number }[];
}

const METER_TO_MINUTES = 10 / 100; // 100 m = 10 minutes

export const requestHealthPermissions = async (startTracking = false) => {
  if (Platform.OS === 'ios') {
    const permissions = {
      permissions: {
        read: [AppleHealthKit.Constants.Permissions.StepCount, AppleHealthKit.Constants.Permissions.DistanceWalkingRunning],
        write: []
      }
    };

    return new Promise<void>((resolve, reject) => {
      AppleHealthKit.initHealthKit(permissions, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  if (Platform.OS === 'android') {
    const options = { scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_LOCATION_READ] };
    const granted = await GoogleFit.authorize(options);
    if (!granted.success) {
      throw new Error('Google Fit authorization failed');
    }
  }
};

export const subscribeToSteps = async (): Promise<StepsResponse> => {
  const start = startOfDay(new Date());
  if (Platform.OS === 'ios') {
    const options = { date: start.toISOString() };
    const samples = await new Promise<AppleHealthKit.StepCountPerDay[]>((resolve, reject) => {
      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err || !results) reject(err);
        else resolve(results);
      });
    });
    const totalSteps = samples.reduce((acc, sample) => acc + sample.value, 0);
    const meters = totalSteps * 0.8;
    return {
      daily: {
        steps: totalSteps,
        meters,
        minutesEarned: meters * METER_TO_MINUTES,
        minutesSpent: 0
      },
      weekly: samples.map((sample) => ({ date: sample.startDate, steps: sample.value }))
    };
  }

  if (Platform.OS === 'android') {
    const options = {
      startDate: start.toISOString(),
      endDate: new Date().toISOString()
    };
    const res = await GoogleFit.getDailyStepCountSamples(options);
    const today = res.find((item) => item.source === 'com.google.android.gms:estimated_steps');
    const steps = today?.steps?.[0]?.value ?? 0;
    const meters = steps * 0.8;
    const weekly: { date: string; steps: number }[] = [];
    const weekStart = subDays(new Date(), 6);
    const weeklyRes = await GoogleFit.getDailyDistanceSamples({ startDate: weekStart.toISOString(), endDate: new Date().toISOString() });
    weeklyRes.forEach((item) => {
      item.distance?.forEach((entry) => {
        weekly.push({ date: entry.date, steps: Math.round(entry.value / 0.8) });
      });
    });
    return {
      daily: { steps, meters, minutesEarned: meters * METER_TO_MINUTES, minutesSpent: 0 },
      weekly
    };
  }

  return {
    daily: { steps: 0, meters: 0, minutesEarned: 0, minutesSpent: 0 },
    weekly: []
  };
};
