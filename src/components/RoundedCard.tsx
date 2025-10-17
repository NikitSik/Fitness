import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  children: ReactNode;
  background?: string;
  style?: ViewStyle;
}

const RoundedCard: React.FC<Props> = ({ children, background = 'rgba(255,255,255,0.18)', style }) => (
  <View style={[styles.card, { backgroundColor: background }, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#001040',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6
  }
});

export default RoundedCard;
