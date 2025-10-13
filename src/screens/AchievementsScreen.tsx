import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import GradientScreen from '../components/GradientScreen';
import RoundedCard from '../components/RoundedCard';
import { useActivity } from '../context/ActivityContext';

const badges = [
  { distance: 1_000, title: 'Первый километр' },
  { distance: 10_000, title: '10 км путешественник' },
  { distance: 100_000, title: '100 км герой' },
  { distance: 500_000, title: 'Полтысячи км' }
];

const AchievementsScreen: React.FC = () => {
  const { weeklySteps } = useActivity();
  const totalDistance = useMemo(() => weeklySteps.reduce((acc, entry) => acc + entry.steps * 0.8, 0), [weeklySteps]);
  const level = Math.floor(totalDistance / 5000) + 1;
  const nextLevelDistance = level * 5000;
  const progressToNextLevel = (totalDistance % 5000) / 5000;

  return (
    <GradientScreen>
      <View style={styles.container}>
        <RoundedCard>
          <Text style={styles.levelTitle}>Уровень {level}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(progressToNextLevel, 1) * 100}%` }]} />
          </View>
          <Text style={styles.levelText}>
            Осталось {Math.max(0, Math.round(nextLevelDistance - (totalDistance % 5000)))} м до следующего уровня
          </Text>
        </RoundedCard>
        <Text style={styles.sectionTitle}>Бейджи</Text>
        <FlatList
          data={badges}
          keyExtractor={(item) => item.distance.toString()}
          renderItem={({ item }) => {
            const unlocked = totalDistance >= item.distance;
            return (
              <RoundedCard background={unlocked ? 'rgba(62,213,152,0.35)' : 'rgba(255,255,255,0.18)'}>
                <Text style={styles.badgeTitle}>{item.title}</Text>
                <Text style={styles.badgeDescription}>{item.distance / 1000} км</Text>
                <Text style={[styles.badgeStatus, unlocked ? styles.unlocked : styles.locked]}>
                  {unlocked ? 'Открыто' : 'Заблокировано'}
                </Text>
              </RoundedCard>
            );
          }}
        />
      </View>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  levelTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700'
  },
  levelText: {
    color: '#eaf2ff',
    marginTop: 8
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
    overflow: 'hidden',
    marginVertical: 12
  },
  progressFill: {
    backgroundColor: '#fff',
    height: '100%'
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 12
  },
  badgeTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  badgeDescription: {
    color: '#e5eeff'
  },
  badgeStatus: {
    marginTop: 6,
    fontWeight: '600'
  },
  unlocked: {
    color: '#3ed598'
  },
  locked: {
    color: '#ffbdbd'
  }
});

export default AchievementsScreen;
