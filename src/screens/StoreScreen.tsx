import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import GradientScreen from '../components/GradientScreen';
import RoundedCard from '../components/RoundedCard';
import { useSubscription } from '../context/SubscriptionContext';

const StoreScreen: React.FC = () => {
  const { tiers, activeTier, loading, subscribe, restore } = useSubscription();

  return (
    <GradientScreen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Магазин</Text>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          tiers.map((tier) => {
            const isActive = tier.productId === activeTier?.productId;
            return (
              <RoundedCard key={tier.productId} background={isActive ? 'rgba(62,213,152,0.35)' : 'rgba(255,255,255,0.25)'}>
                <Text style={styles.tierTitle}>{tier.title}</Text>
                <Text style={styles.tierDescription}>{tier.description}</Text>
                <View style={styles.tierFooter}>
                  <Text style={styles.price}>{tier.price}</Text>
                  <Pressable style={styles.buyButton} onPress={() => subscribe(tier.productId)}>
                    <Text style={styles.buyText}>{isActive ? 'Активна' : 'Выбрать'}</Text>
                  </Pressable>
                </View>
              </RoundedCard>
            );
          })
        )}
        <Pressable style={styles.restore} onPress={restore}>
          <Text style={styles.restoreText}>Восстановить покупки</Text>
        </Pressable>
      </ScrollView>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16
  },
  tierTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600'
  },
  tierDescription: {
    color: '#e9f2ff',
    marginVertical: 8
  },
  tierFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600'
  },
  buyButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999
  },
  buyText: {
    color: '#0a4bdc',
    fontWeight: '600'
  },
  restore: {
    marginTop: 12,
    alignSelf: 'center'
  },
  restoreText: {
    color: '#fff',
    textDecorationLine: 'underline'
  }
});

export default StoreScreen;
