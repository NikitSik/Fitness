import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import RoundedCard from '../components/RoundedCard';
import SectionHeading from '../components/SectionHeading';
import ProgressBar from '../components/ProgressBar';
import { useActivity } from '../context/ActivityContext';

const metersToKilometers = (meters: number) => (meters / 1000).toFixed(1);

const AchievementsScreen: React.FC = () => {
  const { achievements, streakDays, lifetimeMeters } = useActivity();
  const levelSize = 5000;
  const currentLevel = Math.floor(lifetimeMeters / levelSize) + 1;
  const nextLevelMeters = currentLevel * levelSize;
  const levelProgress = (lifetimeMeters % levelSize) / levelSize;

  return (
    <ScreenContainer>
      <RoundedCard background="#ffffff">
        <SectionHeading variant="dark" title="Уровень" subtitle="Повышайте активность" />
        <Text style={styles.levelValue}>LVL {currentLevel}</Text>
        <Text style={styles.levelHint}>Всего пройдено {metersToKilometers(lifetimeMeters)} км</Text>
        <ProgressBar
          progress={levelProgress}
          height={14}
          trackColor="#e5ecff"
          fillColor="#1b63ff"
        />
        <Text style={styles.levelProgress}>
          Следующий уровень через {(nextLevelMeters - lifetimeMeters).toFixed(0)} м
        </Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakBadgeText}>Серия {streakDays} дн.</Text>
        </View>
      </RoundedCard>

      <SectionHeading variant="dark" title="Бейджи" subtitle="Соберите всю коллекцию" />
      {achievements.map((achievement) => (
        <RoundedCard
          key={achievement.id}
          background={achievement.completed ? '#e6fbf0' : '#f4f7ff'}
        >
          <View style={styles.badgeHeader}>
            <Text style={styles.badgeTitle}>{achievement.label}</Text>
            <Text style={styles.badgeTarget}>{achievement.metersRequired / 1000} км</Text>
          </View>
          <ProgressBar
            progress={achievement.progress}
            height={12}
            trackColor="#e5ecff"
            fillColor={achievement.completed ? '#3ed598' : '#1b63ff'}
          />
          <Text style={styles.badgeHint}>
            {achievement.completed
              ? 'Получено!'
              : `Осталось ${Math.max(0, (1 - achievement.progress) * achievement.metersRequired).toFixed(0)} м`}
          </Text>
        </RoundedCard>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  levelValue: {
    color: '#112d60',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12
  },
  levelHint: {
    color: '#5a6d9c',
    marginBottom: 16
  },
  levelProgress: {
    color: '#7d8db5',
    fontSize: 14,
    marginTop: 12
  },
  streakBadge: {
    marginTop: 16,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#f1f5ff'
  },
  streakBadgeText: {
    color: '#1b63ff',
    fontWeight: '700'
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  badgeTitle: {
    color: '#112d60',
    fontSize: 18,
    fontWeight: '700'
  },
  badgeTarget: {
    color: '#5a6d9c',
    fontSize: 14
  },
  badgeHint: {
    color: '#7d8db5',
    fontSize: 13,
    marginTop: 10
  }
});

export default AchievementsScreen;
