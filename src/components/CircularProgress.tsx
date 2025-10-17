import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface Props {
  progress: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  value: string;
  caption?: string;
  valueColor?: string;
  captionColor?: string;
}

const CircularProgress: React.FC<Props> = ({
  progress,
  size = 150,
  strokeWidth = 12,
  trackColor = 'rgba(255,255,255,0.25)',
  progressColor = '#ffffff',
  value,
  caption,
  valueColor = '#ffffff',
  captionColor = 'rgba(255,255,255,0.7)'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const strokeDashoffset = circumference * (1 - clampedProgress);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeLinecap="round"
        />
        <Circle
          stroke={progressColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.labelContainer}>
        <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
        {caption ? <Text style={[styles.caption, { color: captionColor }]}>{caption}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center'
  },
  value: {
    fontSize: 28,
    fontWeight: '700'
  },
  caption: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500'
  }
});

export default CircularProgress;
