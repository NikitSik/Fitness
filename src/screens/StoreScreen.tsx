import React from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SectionHeading from '../components/SectionHeading';
import RoundedCard from '../components/RoundedCard';
import { useSubscription } from '../context/SubscriptionContext';

const StoreScreen: React.FC = () => {
  const { tiers, activeTier, loading, subscribe, restore } = useSubscription();

  if (loading) {
    return (
      <ScreenContainer scrollable={false}>
        <View style={styles.loaderWrapper}>
          <ActivityIndicator color="#ffffff" />
          <Text style={styles.loaderText}>Загрузка предложений...</Text>
        </View>
      </ScreenContainer>
    );
  }

  const basePlans = tiers.filter((tier) => !tier.isUnlimited && !tier.multiplier);
  const extras = tiers.filter((tier) => tier.isUnlimited || tier.multiplier);

  const handleTierPress = (productId: string) => {
    void subscribe(productId);
  };

  return (
    <ScreenContainer>
      <RoundedCard>
        <SectionHeading title="Текущий тариф" subtitle="Настройте скорость начисления минут" />
        <Text style={styles.activeTitle}>{activeTier ? activeTier.title : 'Бесплатный тариф'}</Text>
        <Text style={styles.activeDescription}>
          {activeTier ? activeTier.description : '100 метров = 10 минут. Улучшите тариф, чтобы получать больше.'}
        </Text>
        <Pressable style={styles.restoreButton} onPress={() => void restore()}>
          <Text style={styles.restoreText}>Восстановить покупки</Text>
        </Pressable>
      </RoundedCard>

      <SectionHeading title="Подписки" subtitle="Выберите оптимальный план" />
      {basePlans.map((tier) => {
        const isActive = activeTier?.productId === tier.productId;
        return (
          <RoundedCard key={tier.productId} background={isActive ? 'rgba(62,213,152,0.35)' : 'rgba(255,255,255,0.18)'}>
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>{tier.title}</Text>
              <Text style={styles.tierPrice}>{tier.price}</Text>
            </View>
            <Text style={styles.tierDescription}>{tier.description}</Text>
            <Text style={styles.tierRate}>10 мин = {tier.metersPer10Minutes} м</Text>
            <Pressable
              onPress={() => handleTierPress(tier.productId)}
              style={[styles.tierButton, isActive && styles.tierButtonActive]}
            >
              <Text style={styles.tierButtonText}>{isActive ? 'Активен' : 'Выбрать'}</Text>
            </Pressable>
          </RoundedCard>
        );
      })}

      <SectionHeading title="Бусты" subtitle="Временные усиления" />
      {extras.map((tier) => (
        <RoundedCard key={tier.productId} background="rgba(255,255,255,0.22)">
          <View style={styles.tierHeader}>
            <Text style={styles.tierTitle}>{tier.title}</Text>
            <Text style={styles.tierPrice}>{tier.price}</Text>
          </View>
          <Text style={styles.tierDescription}>{tier.description}</Text>
          <Pressable onPress={() => handleTierPress(tier.productId)} style={styles.tierButtonSecondary}>
            <Text style={styles.tierButtonSecondaryText}>Активировать</Text>
          </Pressable>
        </RoundedCard>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loaderText: {
    color: '#ffffff',
    marginTop: 12
  },
  activeTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6
  },
  activeDescription: {
    color: '#d8e6ff',
    fontSize: 14,
    marginBottom: 16
  },
  restoreButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.16)'
  },
  restoreText: {
    color: '#ffffff',
    fontWeight: '600'
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12
  },
  tierTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700'
  },
  tierPrice: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  tierDescription: {
    color: '#e6f1ff',
    marginBottom: 12
  },
  tierRate: {
    color: '#d8e6ff',
    fontSize: 13,
    marginBottom: 16
  },
  tierButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: 'center'
  },
  tierButtonActive: {
    backgroundColor: '#3ed598'
  },
  tierButtonText: {
    color: '#0a4bdc',
    fontWeight: '700'
  },
  tierButtonSecondary: {
    marginTop: 16,
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)'
  },
  tierButtonSecondaryText: {
    color: '#ffffff',
    fontWeight: '700'
  }
});

export default StoreScreen;
