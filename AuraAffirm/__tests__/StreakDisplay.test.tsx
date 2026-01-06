import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StreakDisplay from '../components/StreakDisplay';
import { StreakData } from '../types';

describe('StreakDisplay Component', () => {
  it('should render streak data correctly', () => {
    const streak: StreakData = {
      currentStreak: 5,
      longestStreak: 10,
      totalSessions: 25,
      lastSessionDate: new Date().toISOString()
    };

    render(<StreakDisplay streak={streak} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText(/Current Streak/i)).toBeInTheDocument();
    expect(screen.getByText(/Longest Streak/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Sessions/i)).toBeInTheDocument();
  });

  it('should show encouragement message for 7 day streak', () => {
    const streak: StreakData = {
      currentStreak: 7,
      longestStreak: 7,
      totalSessions: 7,
      lastSessionDate: new Date().toISOString()
    };

    render(<StreakDisplay streak={streak} />);

    expect(screen.getByText(/Powerful momentum!/i)).toBeInTheDocument();
  });

  it('should show encouragement for 30+ day streak', () => {
    const streak: StreakData = {
      currentStreak: 30,
      longestStreak: 30,
      totalSessions: 30,
      lastSessionDate: new Date().toISOString()
    };

    render(<StreakDisplay streak={streak} />);

    expect(screen.getByText(/Extraordinary dedication!/i)).toBeInTheDocument();
  });

  it('should handle zero streak', () => {
    const streak: StreakData = {
      currentStreak: 0,
      longestStreak: 0,
      totalSessions: 0,
      lastSessionDate: null
    };

    render(<StreakDisplay streak={streak} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /streak day/i })).not.toBeInTheDocument();
  });
});
