import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStreakData,
  updateStreak,
  addSessionToHistory,
  getSessionHistory,
  getCompletionRate
} from '../utils/streakUtils';

describe('Streak Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getStreakData', () => {
    it('should return initial streak data when no data exists', () => {
      const streak = getStreakData();

      expect(streak).toEqual({
        currentStreak: 0,
        longestStreak: 0,
        totalSessions: 0,
        lastSessionDate: null
      });
    });
  });

  describe('updateStreak', () => {
    it('should create first streak', () => {
      const today = new Date().toISOString();
      const streak = updateStreak(today);

      expect(streak.currentStreak).toBe(1);
      expect(streak.longestStreak).toBe(1);
      expect(streak.totalSessions).toBe(1);
    });

    it('should not increment streak for same day session', () => {
      const today = new Date().toISOString();

      updateStreak(today);
      const streak = updateStreak(today);

      expect(streak.currentStreak).toBe(1);
      expect(streak.totalSessions).toBe(1);
    });

    it('should increment streak for consecutive days', () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      updateStreak(yesterday.toISOString());
      const streak = updateStreak(today.toISOString());

      expect(streak.currentStreak).toBe(2);
      expect(streak.longestStreak).toBe(2);
      expect(streak.totalSessions).toBe(2);
    });

    it('should reset streak when days are skipped', () => {
      const today = new Date();
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      updateStreak(threeDaysAgo.toISOString());
      const streak = updateStreak(today.toISOString());

      expect(streak.currentStreak).toBe(1);
      expect(streak.longestStreak).toBe(1);
      expect(streak.totalSessions).toBe(2);
    });
  });

  describe('addSessionToHistory', () => {
    it('should add session to history', () => {
      const session = {
        date: new Date().toISOString(),
        quote: 'Test quote',
        theme: 'Peace',
        duration: 120,
        completed: true
      };

      const added = addSessionToHistory(session);

      expect(added.id).toBeDefined();
      expect(added.quote).toBe('Test quote');

      const history = getSessionHistory();
      expect(history).toHaveLength(1);
      expect(history[0].quote).toBe('Test quote');
    });

    it('should limit history to 100 sessions', () => {
      // Add 101 sessions
      for (let i = 0; i < 101; i++) {
        addSessionToHistory({
          date: new Date().toISOString(),
          quote: `Quote ${i}`,
          theme: 'Theme',
          duration: 60,
          completed: true
        });
      }

      const history = getSessionHistory();
      expect(history).toHaveLength(100);
    });
  });

  describe('getCompletionRate', () => {
    it('should return 0 for no sessions', () => {
      const rate = getCompletionRate();
      expect(rate).toBe(0);
    });

    it('should calculate completion rate correctly', () => {
      addSessionToHistory({
        date: new Date().toISOString(),
        quote: 'Quote 1',
        theme: 'Peace',
        duration: 60,
        completed: true
      });

      addSessionToHistory({
        date: new Date().toISOString(),
        quote: 'Quote 2',
        theme: 'Strength',
        duration: 30,
        completed: false
      });

      const rate = getCompletionRate();
      expect(rate).toBe(50); // 1 out of 2 completed
    });
  });
});
