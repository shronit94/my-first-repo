
export enum AppView {
  ONBOARDING = 'onboarding',
  HOME = 'home',
  LIVE_SESSION = 'live_session',
  SUMMARY = 'summary',
  HISTORY = 'history'
}

export type VoiceType = 'Kore' | 'Puck' | 'Charon' | 'Fenrir';

export interface UserPreferences {
  userName: string;
  notificationTime: string;
  setupComplete: boolean;
  lastSessionDate: string | null;
  voicePreference: VoiceType;
  backgroundMusicEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface SessionSummary {
  quote: string;
  theme: string;
}

export interface SessionHistory {
  id: string;
  date: string;
  quote: string;
  theme: string;
  duration: number; // in seconds
  completed: boolean;
}

export interface SessionState {
  sessionId: string;
  startTime: string;
  messages: Message[];
  isActive: boolean;
  audioPosition: number;
}

export interface Message {
  id: string;
  role: 'aura' | 'user';
  text: string;
  timestamp: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  lastSessionDate: string | null;
}

export interface AnalyticsEvent {
  eventName: string;
  timestamp: string;
  data?: Record<string, any>;
}
