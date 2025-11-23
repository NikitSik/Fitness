import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import RoundedCard from '../components/RoundedCard';
import SectionHeading from '../components/SectionHeading';
import MetricTile from '../components/MetricTile';
import { useActivity } from '../context/ActivityContext';
import { useSettings } from '../context/SettingsContext';
import { useSubscription } from '../context/SubscriptionContext';
import { enforceBlocking } from '../services/app-limiter';
import CircularProgress from '../components/CircularProgress';
import ProgressBar from '../components/ProgressBar';

const HomeScreen: React.FC = () => {
  const { daily, walking, startWalk, stopWalk, weekly, streakDays } = useActivity();
  const { trackedApps } = useSettings();
  const { activeTier } = useSubscription();

  useEffect(() => {
    enforceBlocking(daily.remainingMinutes, trackedApps);
  }, [daily.remainingMinutes, trackedApps]);

  const progress = daily.goalMeters ? Math.min(1, daily.meters / daily.goalMeters) : 0;
  const handleWalkPress = async () => {
    if (walking) {
      await stopWalk();
    } else {
      await startWalk();
    }
  };

  const todaySteps = weekly[weekly.length - 1]?.steps ?? daily.steps;

  return (
    <ScreenContainer>
      <RoundedCard gradientColors={[ '#1b63ff', '#4f9dff' ]} style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.heroCaption}>Экранное время</Text>
            <Text style={styles.heroMinutes}>{Math.round(daily.remainingMinutes)} мин</Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Стрик {streakDays} дн.</Text>
          </View>
        </View>
        <View style={styles.heroContent}>
          <CircularProgress
            progress={progress}
            value={`${Math.round(daily.meters)} м`}
            caption={`из ${daily.goalMeters} м`}
          />
          <View style={styles.heroDetails}>
            <Text style={styles.heroDetailsLabel}>Сегодня</Text>
            <Text style={styles.heroDetailsValue}>{todaySteps.toLocaleString('ru-RU')} шагов</Text>
            <Text style={styles.heroDetailsHint}>
              {daily.earnedMinutes.toFixed(0)} минут · множитель х{daily.multiplier}
            </Text>
            <Pressable
              onPress={handleWalkPress}
              style={[styles.walkButton, walking && styles.walkButtonActive]}
            >
              <Text style={[styles.walkButtonText, walking && styles.walkButtonTextActive]}>
                {walking ? 'Остановить' : 'Go for a walk'}
              </Text>
              <Text style={[styles.walkButtonHint, walking && styles.walkButtonHintActive]}>
                {walking ? 'Шаги синхронизируются...' : 'Apple HealthKit / Google Fit'}
              </Text>
            </Pressable>
          </View>
        </View>
      </RoundedCard>

      <RoundedCard background="#ffffff">
        <SectionHeading
          variant="dark"
          title="Статистика"
          subtitle={activeTier ? `Тариф: ${activeTier.title}` : 'Бесплатный тариф'}
        />
        <View style={styles.metricsRow}>
          <MetricTile
            label="Сегодня"
            value={`${Math.round(daily.earnedMinutes)} мин`}
            hint="Начислено за прогулки"
          />
          <View style={styles.metricSpacer} />
          <MetricTile
            label="Осталось"
            value={`${Math.round(daily.remainingMinutes)} мин`}
            hint={`${Math.max(0, Math.round(daily.goalMeters - daily.meters))} м до цели`}
          />
        </View>
        <ProgressBar
          progress={progress}
          height={12}
          trackColor="#e5ecff"
          fillColor="#1b63ff"
          style={styles.progressBar}
        />
      </RoundedCard>

      <RoundedCard background="#ffffff">
        <SectionHeading variant="dark" title="Акция дня" subtitle={daily.challenge} />
        <Text style={styles.bonusText}>{daily.reward}</Text>
        <Text style={styles.bonusHint}>Сегодня минуты за шаги удваиваются после 3 000 шагов</Text>
      </RoundedCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    paddingBottom: 28
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  heroCaption: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 16,
    fontWeight: '600'
  },
  heroMinutes: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '800',
    marginTop: 6
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999
  },
  heroBadgeText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 13
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heroDetails: {
    flex: 1,
    marginLeft: 24
  },
  heroDetailsLabel: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    fontWeight: '600'
  },
  heroDetailsValue: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4
  },
  heroDetailsHint: {
    color: 'rgba(255,255,255,0.75)',
    marginTop: 8,
    fontSize: 14
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 16
  },
  metricSpacer: {
    width: 16
  },
  walkButton: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    shadowColor: '#1f5fff',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 6
  },
  walkButtonActive: {
    backgroundColor: '#3ed598'
  },
  walkButtonText: {
    color: '#1b63ff',
    fontSize: 16,
    fontWeight: '700'
  },
  walkButtonTextActive: {
    color: '#08463b'
  },
  walkButtonHint: {
    color: '#5a6d9c',
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500'
  },
  walkButtonHintActive: {
    color: '#0f2d23'
  },
  progressBar: {
    marginTop: 12
  },
  bonusText: {
    color: '#112d60',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6
  },
  bonusHint: {
    color: '#5a6d9c',
    fontSize: 14
  }
});

export default HomeScreen;
