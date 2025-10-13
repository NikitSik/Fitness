import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import GradientScreen from '../components/GradientScreen';
import RoundedCard from '../components/RoundedCard';
import { useActivity } from '../context/ActivityContext';
import { Dimensions } from 'react-native';

const StepsScreen: React.FC = () => {
  const { weeklySteps, dailySteps, dailyMeters, earnedMinutes } = useActivity();
  const width = Dimensions.get('window').width - 40;
  const labels = weeklySteps.map((s) => new Date(s.date).toLocaleDateString('ru-RU', { weekday: 'short' }));
  const data = weeklySteps.map((s) => s.steps);

  return (
    <GradientScreen>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <RoundedCard>
          <Text style={styles.title}>Статистика</Text>
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statValue}>{dailySteps}</Text>
              <Text style={styles.statLabel}>шагов</Text>
            </View>
            <View>
              <Text style={styles.statValue}>{Math.round(dailyMeters)}</Text>
              <Text style={styles.statLabel}>метров</Text>
            </View>
            <View>
              <Text style={styles.statValue}>{Math.round(earnedMinutes)}</Text>
              <Text style={styles.statLabel}>минут</Text>
            </View>
          </View>
        </RoundedCard>
        <RoundedCard>
          <Text style={styles.title}>Шаги за неделю</Text>
          <LineChart
            data={{ labels, datasets: [{ data }] }}
            width={width}
            height={220}
            bezier
            chartConfig={{
              backgroundGradientFrom: '#0a4bdc',
              backgroundGradientTo: '#6bc1ff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
              labelColor: () => '#fff'
            }}
            withDots
            withInnerLines={false}
            style={styles.chart}
          />
        </RoundedCard>
      </ScrollView>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700'
  },
  statLabel: {
    color: '#e5eeff'
  },
  chart: {
    marginTop: 12,
    borderRadius: 16
  }
});

export default StepsScreen;
