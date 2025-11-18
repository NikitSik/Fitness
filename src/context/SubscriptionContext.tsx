import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { fetchSubscriptions, purchaseProduct, SubscriptionTier } from '../services/billing';

interface SubscriptionContextValue {
  tiers: SubscriptionTier[];
  activeTier?: SubscriptionTier;
  loading: boolean;
  restore: () => Promise<void>;
  subscribe: (productId: string) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [activeTier, setActiveTier] = useState<SubscriptionTier | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchSubscriptions();
        setTiers(fetched.tiers);
        setActiveTier(fetched.activeTier);
      } catch (error) {
        console.error(error);
        Alert.alert('Ошибка подписки', 'Не удалось получить данные подписок.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const subscribe = useCallback(async (productId: string) => {
    try {
      const purchased = await purchaseProduct(productId);
      setActiveTier(purchased);
      Alert.alert('Поздравляем!', 'Подписка активирована.');
    } catch (error) {
      Alert.alert('Оплата отклонена', 'Проверьте привязанную карту или попробуйте позже.');
    }
  }, []);

  const restore = useCallback(async () => {
    await subscribe('restore');
  }, [subscribe]);

  const value = useMemo(
    () => ({ tiers, activeTier, loading, subscribe, restore }),
    [tiers, activeTier, loading, subscribe, restore]
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used inside SubscriptionProvider');
  return ctx;
};
