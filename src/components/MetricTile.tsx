import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  label: string;
  value: string;
  hint?: string;
  accent?: string;
  labelColor?: string;
  valueColor?: string;
  hintColor?: string;
}

const MetricTile: React.FC<Props> = ({
  label,
  value,
  hint,
  accent = '#f4f7ff',
  labelColor = '#5a6d9c',
  valueColor = '#0a2a6b',
  hintColor = '#7d8db5'
}) => (
  <View style={[styles.container, { backgroundColor: accent }]}>
    <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
    <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
    {hint ? <Text style={[styles.hint, { color: hintColor }]}>{hint}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 20
  },
  label: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '600'
  },
  value: {
    fontSize: 24,
    fontWeight: '700'
  },
  hint: {
    fontSize: 12,
    marginTop: 6
  }
});

export default MetricTile;
