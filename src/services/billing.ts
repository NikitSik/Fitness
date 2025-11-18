import * as RNIap from 'react-native-iap';

export type SubscriptionTier = {
  productId: string;
  title: string;
  description: string;
  price: string;
  metersPer10Minutes: number;
  isUnlimited?: boolean;
  multiplier?: number;
};

interface SubscriptionPayload {
  tiers: SubscriptionTier[];
  activeTier?: SubscriptionTier;
}

const subscriptionIds = ['free.walk', 'sub.walk.5', 'sub.walk.10', 'pass.unlimited', 'booster.x2'];

export const fetchSubscriptions = async (): Promise<SubscriptionPayload> => {
  await RNIap.initConnection();
  const products = await RNIap.getSubscriptions(subscriptionIds);

  const tiers: SubscriptionTier[] = [
    {
      productId: 'free.walk',
      title: 'Бесплатно',
      description: '100 метров = 10 минут',
      price: '0$',
      metersPer10Minutes: 100
    },
    {
      productId: 'sub.walk.5',
      title: 'Подписка $5',
      description: '75 метров = 10 минут',
      price: '$4.99',
      metersPer10Minutes: 75
    },
    {
      productId: 'sub.walk.10',
      title: 'Подписка $10',
      description: '50 метров = 10 минут',
      price: '$9.99',
      metersPer10Minutes: 50
    },
    {
      productId: 'pass.unlimited',
      title: 'Безлимит на день',
      description: 'Получите бесконечное экранное время на сутки',
      price: '$1.99',
      metersPer10Minutes: 0,
      isUnlimited: true
    },
    {
      productId: 'booster.x2',
      title: 'x2 минутный бустер',
      description: 'Умножьте заработанные минуты на 2 на 24 часа',
      price: '$2.99',
      metersPer10Minutes: 100,
      multiplier: 2
    }
  ];

  // Merge real store data if available
  tiers.forEach((tier) => {
    const match = products.find((p) => p.productId === tier.productId);
    if (match) {
      tier.price = match.localizedPrice;
      tier.title = match.title || tier.title;
      tier.description = match.description || tier.description;
    }
  });

  const purchases = await RNIap.getAvailablePurchases();
  const active = purchases.find((purchase) => subscriptionIds.includes(purchase.productId));
  const activeTier = tiers.find((tier) => tier.productId === active?.productId);

  return { tiers, activeTier };
};

export const purchaseProduct = async (productId: string): Promise<SubscriptionTier> => {
  if (productId === 'restore') {
    const purchases = await RNIap.getAvailablePurchases();
    const active = purchases.find((purchase) => subscriptionIds.includes(purchase.productId));
    if (!active) throw new Error('Нет активной подписки');
    const payload = await fetchSubscriptions();
    const tier = payload.tiers.find((t) => t.productId === active.productId);
    if (!tier) throw new Error('Подписка не найдена');
    return tier;
  }

  await RNIap.requestSubscription({ sku: productId });
  const payload = await fetchSubscriptions();
  const tier = payload.tiers.find((t) => t.productId === productId);
  if (!tier) throw new Error('Подписка не найдена');
  return tier;
};
