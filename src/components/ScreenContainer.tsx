import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, View, ViewStyle, StyleProp } from 'react-native';

interface Props {
  children: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const ScreenContainer: React.FC<Props> = ({ children, scrollable = true, contentContainerStyle }) => {
  if (scrollable) {
    return (
      <LinearGradient colors={['#eef3ff', '#ffffff']} style={styles.gradient}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#eef3ff', '#ffffff']} style={styles.gradient}>
      <View style={[styles.scrollContent, contentContainerStyle]}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32
  }
});

export default ScreenContainer;
