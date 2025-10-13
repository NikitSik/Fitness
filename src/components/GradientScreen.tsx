import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  children: ReactNode;
}

const GradientScreen: React.FC<Props> = ({ children }) => (
  <LinearGradient colors={['#0a4bdc', '#6bc1ff']} style={styles.gradient}>
    <View style={styles.inner}>{children}</View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  inner: {
    flex: 1,
    padding: 20
  }
});

export default GradientScreen;
