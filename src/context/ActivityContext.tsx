import React, { createContext, useContext, useMemo } from 'react';
import useActivityTracking, { ActivitySnapshot } from '../hooks/useActivityTracking';

type ActivityContextValue = ActivitySnapshot & {
  startWalk: () => Promise<void>;
  stopWalk: () => Promise<void>;
};

const ActivityContext = createContext<ActivityContextValue | undefined>(undefined);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { snapshot, startTracking, stopTracking } = useActivityTracking();
  const value = useMemo<ActivityContextValue>(
    () => ({ ...snapshot, startWalk: startTracking, stopWalk: stopTracking }),
    [snapshot, startTracking, stopTracking]
  );

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
};

export const useActivity = () => {
  const ctx = useContext(ActivityContext);
  if (!ctx) throw new Error('useActivity must be used inside ActivityProvider');
  return ctx;
};
