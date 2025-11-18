import React from 'react';
import { ActivityProvider } from '../context/ActivityContext';
import { SubscriptionProvider } from '../context/SubscriptionContext';
import { SettingsProvider } from '../context/SettingsContext';

interface Props {
  children: React.ReactNode;
}

const AppProviders: React.FC<Props> = ({ children }) => (
  <SettingsProvider>
    <SubscriptionProvider>
      <ActivityProvider>{children}</ActivityProvider>
    </SubscriptionProvider>
  </SettingsProvider>
);

export default AppProviders;
