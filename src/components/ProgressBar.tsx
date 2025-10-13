import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  progress: number; // 0-1
}

const ProgressBar: React.FC<Props> = ({ progress }) => (
  <View style={styles.container}>
    <View style={[styles.fill, { width: `${Math.min(progress, 1) * 100}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#fff'
  }
});

export default ProgressBar;
