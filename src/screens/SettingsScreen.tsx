import React from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';
import GradientScreen from '../components/GradientScreen';
import RoundedCard from '../components/RoundedCard';
import { useSettings } from '../context/SettingsContext';
import { AppIdentifier, readableAppName } from '../utils/appBlocking';

const availableApps: AppIdentifier[] = ['tiktok', 'youtube', 'instagram', 'facebook', 'snapchat'];

const SettingsScreen: React.FC = () => {
  const { trackedApps, toggleApp, notificationsEnabled, setNotificationsEnabled } = useSettings();

  return (
    <GradientScreen>
      <View style={styles.container}>
        <RoundedCard>
          <Text style={styles.sectionTitle}>Блокируемые приложения</Text>
          <FlatList
            data={availableApps}
            scrollEnabled={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.appTitle}>{readableAppName[item]}</Text>
                <Switch value={trackedApps.includes(item)} onValueChange={() => toggleApp(item)} />
              </View>
            )}
          />
        </RoundedCard>
        <RoundedCard>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Уведомления</Text>
            <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
          </View>
          <Text style={styles.description}>Получай напоминания, когда осталось 5 минут экранного времени.</Text>
        </RoundedCard>
      </View>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  appTitle: {
    color: '#fff',
    fontSize: 16
  },
  description: {
    color: '#e5eeff'
  }
});

export default SettingsScreen;
