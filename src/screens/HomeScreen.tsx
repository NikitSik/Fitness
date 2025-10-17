import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import RoundedCard from '../components/RoundedCard';
import ProgressBar from '../components/ProgressBar';
import SectionHeading from '../components/SectionHeading';
import MetricTile from '../components/MetricTile';
import { useActivity } from '../context/ActivityContext';
import { useSettings } from '../context/SettingsContext';
import { useSubscription } from '../context/SubscriptionContext';
import { enforceBlocking } from '../services/app-limiter';

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
      <Text style={styles.caption}>Оставшееся экранное время</Text>
      <Text style={styles.minutesValue}>{Math.round(daily.remainingMinutes)} мин</Text>

      <RoundedCard>
        <SectionHeading
          title="Прогресс прогулки"
          subtitle={`Цель ${daily.goalMeters} м • Стрик ${streakDays} дн.`}
        />
        <View style={styles.progressRow}>
          <View style={styles.progressValues}>
            <Text style={styles.progressMain}>{Math.round(daily.meters)} м</Text>
            <Text style={styles.progressHint}>из {daily.goalMeters} м</Text>
          </View>
          <Text style={styles.progressSteps}>{todaySteps} шагов</Text>
        </View>
        <ProgressBar progress={progress} height={16} />
        <Text style={styles.progressInfo}>
          {daily.earnedMinutes.toFixed(0)} минут начислено · множитель х{daily.multiplier}
        </Text>
      </RoundedCard>

      <View style={styles.metricsRow}>
        <MetricTile
          label="Шаги"
          value={todaySteps.toLocaleString('ru-RU')}
          hint="за сегодня"
          accent="rgba(255,255,255,0.14)"
        />
        <View style={styles.metricSpacer} />
        <MetricTile
          label="Заработано"
          value={`${Math.round(daily.earnedMinutes)} мин`}
          hint={activeTier ? `Тариф: ${activeTier.title}` : 'Базовый тариф'}
          accent="rgba(255,255,255,0.14)"
        />
      </View>

      <Pressable
        onPress={handleWalkPress}
        style={[styles.walkButton, walking && styles.walkButtonActive]}
      >
        <Text style={styles.walkButtonText}>{walking ? 'Остановить прогулку' : 'Go for a walk'}</Text>
        <Text style={styles.walkButtonHint}>
          {walking ? 'Шаги синхронизируются...' : 'Apple HealthKit / Google Fit'}
        </Text>
      </Pressable>

      <RoundedCard background="rgba(255,255,255,0.22)">
        <SectionHeading title="Акция дня" subtitle={daily.challenge} />
        <Text style={styles.bonusText}>{daily.reward}</Text>
        <Text style={styles.bonusHint}>Сегодня минуты за шаги удваиваются после 3 000 шагов</Text>
      </RoundedCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  caption: {
    color: '#d8e6ff',
    fontSize: 16
  },
  minutesValue: {
    color: '#ffffff',
    fontSize: 52,
    fontWeight: '800',
    marginBottom: 24
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  progressValues: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  progressMain: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: '700',
    marginRight: 12
  },
  progressHint: {
    color: '#e6f1ff',
    fontSize: 16
  },
  progressSteps: {
    color: '#e6f1ff',
    fontSize: 16,
    fontWeight: '600'
  },
  progressInfo: {
    marginTop: 14,
    color: '#dce9ff',
    fontSize: 14
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 24
  },
  metricSpacer: {
    width: 16
  },
  walkButton: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#001040',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 8
  },
  walkButtonActive: {
    backgroundColor: '#3ed598'
  },
  walkButtonText: {
    color: '#0a4bdc',
    fontSize: 18,
    fontWeight: '700'
  },
  walkButtonHint: {
    color: '#1c5bd6',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500'
  },
  bonusText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6
  },
  bonusHint: {
    color: '#e6f1ff',
    fontSize: 14
  }
});

export default HomeScreen;
