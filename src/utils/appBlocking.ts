export type AppIdentifier =
  | 'tiktok'
  | 'youtube'
  | 'instagram'
  | 'facebook'
  | 'snapchat';

export const defaultTrackedApps: AppIdentifier[] = ['tiktok', 'youtube'];

export const readableAppName: Record<AppIdentifier, string> = {
  tiktok: 'TikTok',
  youtube: 'YouTube',
  instagram: 'Instagram',
  facebook: 'Facebook',
  snapchat: 'Snapchat'
};
