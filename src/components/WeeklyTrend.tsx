import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeeklyTrendPoint } from '../types/activity';

interface Props {
  data: WeeklyTrendPoint[];
}

const WeeklyTrend: React.FC<Props> = ({ data }) => {
  const maxSteps = Math.max(...data.map((item) => item.steps), 1);
  return (
    <View style={styles.wrapper}>
      {data.map((item) => {
        const ratio = item.steps / maxSteps;
        const reachedTarget = item.steps >= item.target;
        return (
          <View key={item.label} style={styles.barContainer}>
            <View style={[styles.barTrack, reachedTarget && styles.barTrackSuccess]}>
              <View style={[styles.barFill, { height: `${Math.max(ratio * 100, 6)}%` }]} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12
  },
  barContainer: {
    flex: 1,
    alignItems: 'center'
  },
  barTrack: {
    width: 26,
    height: 120,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'flex-end',
    padding: 4
  },
  barTrackSuccess: {
    backgroundColor: 'rgba(74,222,128,0.28)'
  },
  barFill: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12
  },
  label: {
    marginTop: 6,
    color: '#e8f1ff',
    fontSize: 12,
    fontWeight: '600'
  }
});

export default WeeklyTrend;
