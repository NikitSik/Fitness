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
          <ActivityIndicator color="#1b63ff" />
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
      <RoundedCard background="#ffffff">
        <SectionHeading
          variant="dark"
          title="Текущий тариф"
          subtitle="Настройте скорость начисления минут"
        />
        <Text style={styles.activeTitle}>{activeTier ? activeTier.title : 'Бесплатный тариф'}</Text>
        <Text style={styles.activeDescription}>
          {activeTier
            ? activeTier.description
            : '100 метров = 10 минут. Улучшите тариф, чтобы получать больше.'}
        </Text>
        <Pressable style={styles.restoreButton} onPress={() => void restore()}>
          <Text style={styles.restoreText}>Восстановить покупки</Text>
        </Pressable>
      </RoundedCard>

      <SectionHeading variant="dark" title="Подписки" subtitle="Выберите оптимальный план" />
      {basePlans.map((tier) => {
        const isActive = activeTier?.productId === tier.productId;
        return (
          <RoundedCard
            key={tier.productId}
            background={isActive ? '#e6fbf0' : '#f4f7ff'}
          >
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
              <Text style={[styles.tierButtonText, isActive && styles.tierButtonTextActive]}>
                {isActive ? 'Активен' : 'Выбрать'}
              </Text>
            </Pressable>
          </RoundedCard>
        );
      })}

      <SectionHeading variant="dark" title="Бусты" subtitle="Временные усиления" />
      {extras.map((tier) => (
        <RoundedCard key={tier.productId} background="#f4f7ff">
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
    color: '#112d60',
    marginTop: 12
  },
  activeTitle: {
    color: '#112d60',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6
  },
  activeDescription: {
    color: '#5a6d9c',
    fontSize: 14,
    marginBottom: 16
  },
  restoreButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#f1f5ff'
  },
  restoreText: {
    color: '#1b63ff',
    fontWeight: '600'
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12
  },
  tierTitle: {
    color: '#112d60',
    fontSize: 18,
    fontWeight: '700'
  },
  tierPrice: {
    color: '#1b63ff',
    fontSize: 16,
    fontWeight: '600'
  },
  tierDescription: {
    color: '#5a6d9c',
    marginBottom: 12
  },
  tierRate: {
    color: '#7d8db5',
    fontSize: 13,
    marginBottom: 16
  },
  tierButton: {
    backgroundColor: '#1b63ff',
    paddingVertical: 12,
    borderRadius: 18,
    alignItems: 'center'
  },
  tierButtonActive: {
    backgroundColor: '#3ed598'
  },
  tierButtonText: {
    color: '#ffffff',
    fontWeight: '700'
  },
  tierButtonTextActive: {
    color: '#08463b'
  },
  tierButtonSecondary: {
    marginTop: 16,
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c8d6ff'
  },
  tierButtonSecondaryText: {
    color: '#1b63ff',
    fontWeight: '700'
  }
});

export default StoreScreen;
