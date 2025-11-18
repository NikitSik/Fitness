import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import RoundedCard from '../components/RoundedCard';
import SectionHeading from '../components/SectionHeading';
import WeeklyTrend from '../components/WeeklyTrend';
import MetricTile from '../components/MetricTile';
import { useActivity } from '../context/ActivityContext';

const StepsScreen: React.FC = () => {
  const { daily, weekly } = useActivity();
  const averageSteps = weekly.reduce((sum, item) => sum + item.steps, 0) / weekly.length;

  return (
    <ScreenContainer>
      <RoundedCard background="#ffffff">
        <SectionHeading variant="dark" title="Сегодня" subtitle="Статистика активности" />
        <View style={styles.metricsRow}>
          <MetricTile label="Шаги" value={daily.steps.toLocaleString('ru-RU')} hint="синхронизировано" />
          <View style={styles.metricSpacer} />
          <MetricTile
            label="Минуты"
            value={`${Math.round(daily.earnedMinutes)} мин`}
            hint={daily.multiplier > 1 ? `Множитель x${daily.multiplier}` : 'Базовое начисление'}
          />
        </View>
        <View style={styles.metricsRow}>
          <MetricTile
            label="Дистанция"
            value={`${daily.meters.toFixed(0)} м`}
            hint={`Цель ${daily.goalMeters} м`}
          />
          <View style={styles.metricSpacer} />
          <MetricTile label="Статус" value={`${daily.challenge}`} hint={daily.reward} />
        </View>
      </RoundedCard>

      <RoundedCard background="#ffffff">
        <SectionHeading variant="dark" title="Неделя" subtitle="Прогресс за последние 7 дней" />
        <WeeklyTrend data={weekly} variant="dark" />
        <View style={styles.weekSummaryRow}>
          <Text style={styles.weekSummaryLabel}>Среднее</Text>
          <Text style={styles.weekSummaryValue}>{Math.round(averageSteps).toLocaleString('ru-RU')} шагов</Text>
        </View>
        <Text style={styles.weekHint}>Цель: {weekly[0]?.target.toLocaleString('ru-RU')} шагов в день</Text>
      </RoundedCard>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  metricsRow: {
    flexDirection: 'row',
    marginBottom: 16
  },
  metricSpacer: {
    width: 16
  },
  weekSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    alignItems: 'center'
  },
  weekSummaryLabel: {
    color: '#5a6d9c',
    fontSize: 14,
    fontWeight: '600'
  },
  weekSummaryValue: {
    color: '#112d60',
    fontSize: 18,
    fontWeight: '700'
  },
  weekHint: {
    color: '#7d8db5',
    fontSize: 13,
    marginTop: 6
  }
});

export default StepsScreen;
