import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import RoundedCard from '../components/RoundedCard';
import SectionHeading from '../components/SectionHeading';
import { useSettings } from '../context/SettingsContext';
import { AppIdentifier, readableAppName } from '../utils/appBlocking';

const availableApps: AppIdentifier[] = ['tiktok', 'youtube', 'instagram', 'facebook', 'snapchat'];

const SettingsScreen: React.FC = () => {
  const { trackedApps, toggleApp, notificationsEnabled, setNotificationsEnabled } = useSettings();

  return (
    <ScreenContainer>
      <RoundedCard background="#ffffff">
        <SectionHeading
          variant="dark"
          title="Блокировка приложений"
          subtitle="Выберите, что ограничивать"
        />
        {availableApps.map((app) => (
          <View key={app} style={styles.row}>
            <Text style={styles.appTitle}>{readableAppName[app]}</Text>
            <Switch value={trackedApps.includes(app)} onValueChange={() => toggleApp(app)} />
          </View>
        ))}
      </RoundedCard>

      <RoundedCard background="#ffffff">
        <SectionHeading
          variant="dark"
          title="Уведомления"
          subtitle="Напоминания о конце лимита"
        />
        <View style={styles.row}>
          <Text style={styles.appTitle}>Напомнить за 5 минут</Text>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>
        <Text style={styles.description}>
          Получай push-уведомления, когда экранное время подходит к концу.
        </Text>
      </RoundedCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  appTitle: {
    color: '#112d60',
    fontSize: 16,
    fontWeight: '600'
  },
  description: {
    color: '#5a6d9c',
    fontSize: 13,
    marginTop: 4
  }
});

export default SettingsScreen;
