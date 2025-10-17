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
      <RoundedCard>
        <SectionHeading title="Уровень" subtitle="Повышайте активность" />
        <Text style={styles.levelValue}>LVL {currentLevel}</Text>
        <Text style={styles.levelHint}>Всего пройдено {metersToKilometers(lifetimeMeters)} км</Text>
        <ProgressBar progress={levelProgress} height={14} />
        <Text style={styles.levelProgress}>Следующий уровень через {(nextLevelMeters - lifetimeMeters).toFixed(0)} м</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakBadgeText}>Серия {streakDays} дн.</Text>
        </View>
      </RoundedCard>

      <SectionHeading title="Бейджи" subtitle="Соберите всю коллекцию" />
      {achievements.map((achievement) => (
        <RoundedCard
          key={achievement.id}
          background={achievement.completed ? 'rgba(62,213,152,0.35)' : 'rgba(255,255,255,0.18)'}
        >
          <View style={styles.badgeHeader}>
            <Text style={styles.badgeTitle}>{achievement.label}</Text>
            <Text style={styles.badgeTarget}>{achievement.metersRequired / 1000} км</Text>
          </View>
          <ProgressBar progress={achievement.progress} height={12} />
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
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 12
  },
  levelHint: {
    color: '#d8e6ff',
    marginBottom: 16
  },
  levelProgress: {
    color: '#e6f1ff',
    fontSize: 14,
    marginTop: 12
  },
  streakBadge: {
    marginTop: 16,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  streakBadgeText: {
    color: '#ffffff',
    fontWeight: '700'
  },
  badgeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  badgeTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700'
  },
  badgeTarget: {
    color: '#e6f1ff',
    fontSize: 14
  },
  badgeHint: {
    color: '#d8e6ff',
    fontSize: 13,
    marginTop: 10
  }
});

export default AchievementsScreen;
