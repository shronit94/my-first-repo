/**
 * Streak calculation utilities
 */

import { StreakData, SessionHistory } from '../types';
import { getItem, setItem } from './storageUtils';

const STREAK_KEY = 'aura_streak';
const HISTORY_KEY = 'aura_history';

/**
 * Get current streak data
 */
export function getStreakData(): StreakData {
  return getItem<StreakData>(STREAK_KEY) || {
    currentStreak: 0,
    longestStreak: 0,
    totalSessions: 0,
    lastSessionDate: null
  };
}

/**
 * Update streak after a session
 */
export function updateStreak(sessionDate: string): StreakData {
  const streak = getStreakData();
  const today = new Date(sessionDate).toDateString();
  const lastDate = streak.lastSessionDate ? new Date(streak.lastSessionDate).toDateString() : null;

  // If this is the first session
  if (!lastDate) {
    streak.currentStreak = 1;
    streak.longestStreak = 1;
    streak.totalSessions = 1;
    streak.lastSessionDate = sessionDate;
    setItem(STREAK_KEY, streak);
    return streak;
  }

  // If already completed today, don't increment
  if (today === lastDate) {
    return streak;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  // If session was done yesterday, increment streak
  if (lastDate === yesterdayStr) {
    streak.currentStreak += 1;
    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
  } else {
    // Streak broken, start over
    streak.currentStreak = 1;
  }

  streak.totalSessions += 1;
  streak.lastSessionDate = sessionDate;

  setItem(STREAK_KEY, streak);
  return streak;
}

/**
 * Get session history
 */
export function getSessionHistory(): SessionHistory[] {
  return getItem<SessionHistory[]>(HISTORY_KEY) || [];
}

/**
 * Add a session to history
 */
export function addSessionToHistory(session: Omit<SessionHistory, 'id'>): SessionHistory {
  const history = getSessionHistory();
  const newSession: SessionHistory = {
    ...session,
    id: crypto.randomUUID()
  };

  history.unshift(newSession); // Add to beginning

  // Keep only last 100 sessions
  if (history.length > 100) {
    history.pop();
  }

  setItem(HISTORY_KEY, history);
  return newSession;
}

/**
 * Get sessions for a specific date
 */
export function getSessionsForDate(date: Date): SessionHistory[] {
  const history = getSessionHistory();
  const targetDate = date.toDateString();

  return history.filter(session => {
    const sessionDate = new Date(session.date).toDateString();
    return sessionDate === targetDate;
  });
}

/**
 * Get sessions grouped by date for calendar view
 */
export function getSessionsByDate(): Record<string, SessionHistory[]> {
  const history = getSessionHistory();
  const grouped: Record<string, SessionHistory[]> = {};

  history.forEach(session => {
    const dateKey = new Date(session.date).toDateString();
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(session);
  });

  return grouped;
}

/**
 * Calculate completion rate
 */
export function getCompletionRate(): number {
  const history = getSessionHistory();
  if (history.length === 0) return 0;

  const completed = history.filter(s => s.completed).length;
  return Math.round((completed / history.length) * 100);
}
