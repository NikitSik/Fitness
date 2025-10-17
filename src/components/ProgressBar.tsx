import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  progress: number; // 0-1
  trackColor?: string;
  fillColor?: string;
  height?: number;
  style?: ViewStyle;
}

const ProgressBar: React.FC<Props> = ({
  progress,
  trackColor = '#dce6ff',
  fillColor = '#1b63ff',
  height = 12,
  style
}) => (
  <View style={[styles.container, { backgroundColor: trackColor, height }, style]}>
    <View style={[styles.fill, { width: `${Math.min(progress, 1) * 100}%`, backgroundColor: fillColor }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    borderRadius: 999
  }
});

export default ProgressBar;
