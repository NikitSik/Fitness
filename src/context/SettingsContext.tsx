import React, { createContext, useContext, useMemo, useState } from 'react';
import { AppIdentifier, defaultTrackedApps } from '../utils/appBlocking';
import { toggleAppBlocking, scheduleUsageWarning } from '../services/app-limiter';

interface SettingsContextValue {
  trackedApps: AppIdentifier[];
  notificationsEnabled: boolean;
  toggleApp: (id: AppIdentifier) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trackedApps, setTrackedApps] = useState<AppIdentifier[]>(defaultTrackedApps);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(true);

  const toggleApp = (id: AppIdentifier) => {
    setTrackedApps((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((app) => app !== id) : [...prev, id];
      toggleAppBlocking(updated);
      return updated;
    });
  };

  const setNotificationsEnabled = (enabled: boolean) => {
    setNotificationsEnabledState(enabled);
    scheduleUsageWarning(enabled);
  };

  const value = useMemo(
    () => ({ trackedApps, notificationsEnabled, toggleApp, setNotificationsEnabled }),
    [trackedApps, notificationsEnabled]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
  return ctx;
};
