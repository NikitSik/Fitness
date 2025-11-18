import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  children: ReactNode;
  background?: string;
  gradientColors?: [string, string] | [string, string, string];
  style?: ViewStyle;
}

const RoundedCard: React.FC<Props> = ({
  children,
  background = '#ffffff',
  gradientColors,
  style
}) => {
  if (gradientColors) {
    return (
      <LinearGradient colors={gradientColors} style={[styles.card, style]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: background }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 26,
    padding: 22,
    marginBottom: 20,
    shadowColor: '#143e88',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4
  }
});

export default RoundedCard;
