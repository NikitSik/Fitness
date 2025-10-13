import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { AppIdentifier } from '../utils/appBlocking';

export const toggleAppBlocking = async (apps: AppIdentifier[]) => {
  // Here you would integrate with native modules (Screen Time API / App Usage)
  // For iOS use familyControls / DeviceActivity frameworks via native modules.
  // For Android use UsageStatsManager + DevicePolicyManager to set app time limits.
  console.log('Apps to block', apps);
};

export const scheduleUsageWarning = async (enabled: boolean) => {
  if (!enabled) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    return;
  }

  await Notifications.requestPermissionsAsync();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Осталось 5 минут',
      body: 'Скорее прогуляйся, чтобы заработать больше экранного времени!'
    },
    trigger: { seconds: 60 * 55, repeats: true }
  });
};

export const enforceBlocking = async (minutesLeft: number, apps: AppIdentifier[]) => {
  if (minutesLeft > 0) return;
  // Trigger block logic when allowance hits zero
  await toggleAppBlocking(apps);
};
