export interface WeeklyTrendPoint {
  label: string;
  steps: number;
  target: number;
}

export interface DailySummary {
  steps: number;
  meters: number;
  goalMeters: number;
  baseAllowanceMinutes: number;
  earnedMinutes: number;
  spentMinutes: number;
  remainingMinutes: number;
  multiplier: number;
  challenge: string;
  reward: string;
}

export interface AchievementSnapshot {
  id: string;
  label: string;
  metersRequired: number;
  completed: boolean;
  progress: number;
}

export interface ActivitySnapshot {
  daily: DailySummary;
  weekly: WeeklyTrendPoint[];
  achievements: AchievementSnapshot[];
  walking: boolean;
  streakDays: number;
  lifetimeMeters: number;
}
