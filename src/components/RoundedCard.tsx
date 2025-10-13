import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  children: ReactNode;
  background?: string;
}

const RoundedCard: React.FC<Props> = ({ children, background = 'rgba(255,255,255,0.2)' }) => (
  <View style={[styles.card, { backgroundColor: background }]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  }
});

export default RoundedCard;
