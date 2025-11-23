import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WeeklyTrendPoint } from '../types/activity';

interface Props {
  data: WeeklyTrendPoint[];
  variant?: 'light' | 'dark';
}

const WeeklyTrend: React.FC<Props> = ({ data, variant = 'light' }) => {
  const maxSteps = Math.max(...data.map((item) => item.steps), 1);
  return (
    <View style={styles.wrapper}>
      {data.map((item) => {
        const ratio = item.steps / maxSteps;
        const reachedTarget = item.steps >= item.target;
        return (
          <View key={item.label} style={styles.barContainer}>
            <View
              style={[
                styles.barTrack,
                { backgroundColor: variant === 'dark' ? '#e5ecff' : 'rgba(255,255,255,0.18)' },
                reachedTarget &&
                  (variant === 'light' ? styles.barTrackSuccessLight : styles.barTrackSuccessDark)
              ]}
            >
              <View
                style={[
                  styles.barFill,
                  {
                    height: `${Math.max(ratio * 100, 6)}%`,
                    backgroundColor: variant === 'dark' ? '#1b63ff' : '#ffffff'
                  }
                ]}
              />
            </View>
            <Text style={[styles.label, variant === 'dark' && styles.labelDark]}>{item.label}</Text>
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
    justifyContent: 'flex-end',
    padding: 4
  },
  barTrackSuccessLight: {
    backgroundColor: 'rgba(74,222,128,0.28)'
  },
  barTrackSuccessDark: {
    backgroundColor: '#c9f5df'
  },
  barFill: {
    width: '100%',
    borderRadius: 12
  },
  label: {
    marginTop: 6,
    color: '#e8f1ff',
    fontSize: 12,
    fontWeight: '600'
  },
  labelDark: {
    color: '#5a6d9c'
  }
});

export default WeeklyTrend;
