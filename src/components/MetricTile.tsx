import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  label: string;
  value: string;
  hint?: string;
  accent?: string;
}

const MetricTile: React.FC<Props> = ({ label, value, hint, accent = 'rgba(255,255,255,0.16)' }) => (
  <View style={[styles.container, { backgroundColor: accent }]}> 
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
    {hint ? <Text style={styles.hint}>{hint}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 20
  },
  label: {
    color: '#d8e6ff',
    fontSize: 13,
    marginBottom: 8
  },
  value: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700'
  },
  hint: {
    color: '#e8f1ff',
    fontSize: 12,
    marginTop: 6
  }
});

export default MetricTile;
