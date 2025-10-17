import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onPressAction?: () => void;
}

const SectionHeading: React.FC<Props> = ({ title, subtitle, actionLabel, onPressAction }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
    {actionLabel ? (
      <Text onPress={onPressAction} style={styles.action}>
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
  subtitle: {
    fontSize: 14,
    color: '#d8e6ff',
    marginTop: 2
  },
  action: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600'
  }
});

export default SectionHeading;
