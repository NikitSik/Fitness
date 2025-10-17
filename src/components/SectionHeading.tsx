import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onPressAction?: () => void;
  variant?: 'light' | 'dark';
}

const SectionHeading: React.FC<Props> = ({ title, subtitle, actionLabel, onPressAction, variant = 'light' }) => (
  <View style={styles.container}>
    <View>
      <Text style={[styles.title, variant === 'dark' && styles.titleDark]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, variant === 'dark' && styles.subtitleDark]}>{subtitle}</Text>
      ) : null}
    </View>
    {actionLabel ? (
      <Text onPress={onPressAction} style={[styles.action, variant === 'dark' && styles.actionDark]}>
        {actionLabel}
      </Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  title: {
    fontSize: 18,
    color: '#f5fbff',
    fontWeight: '700'
  },
  titleDark: {
    color: '#112d60'
  },
  subtitle: {
    fontSize: 14,
    color: '#d8e6ff',
    marginTop: 2
  },
  subtitleDark: {
    color: '#5a6d9c'
  },
  action: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600'
  },
  actionDark: {
    color: '#1b63ff'
  }
});

export default SectionHeading;
