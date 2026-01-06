/**
 * Streak Display Component
 */

import React from 'react';
import { StreakData } from '../types';

interface StreakDisplayProps {
  streak: StreakData;
  className?: string;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak, className = '' }) => {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-3xl font-bold text-rose-500">{streak.currentStreak}</div>
          <div className="text-xs text-rose-700 uppercase tracking-wide">Current Streak</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-indigo-500">{streak.longestStreak}</div>
          <div className="text-xs text-indigo-700 uppercase tracking-wide">Longest Streak</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-teal-500">{streak.totalSessions}</div>
          <div className="text-xs text-teal-700 uppercase tracking-wide">Total Sessions</div>
        </div>
      </div>

      {streak.currentStreak > 0 && (
        <div className="mt-4 pt-4 border-t border-rose-100 text-center">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: Math.min(streak.currentStreak, 7) }).map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
                role="img"
                aria-label="streak day"
              />
            ))}
            {streak.currentStreak > 7 && (
              <span className="text-rose-600 font-bold">+{streak.currentStreak - 7}</span>
            )}
          </div>
          <p className="text-sm text-rose-700/70 mt-2 italic">
            {streak.currentStreak === 1 && "You've started your journey!"}
            {streak.currentStreak >= 2 && streak.currentStreak < 7 && "Building the habit!"}
            {streak.currentStreak >= 7 && streak.currentStreak < 30 && "Powerful momentum!"}
            {streak.currentStreak >= 30 && "Extraordinary dedication!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default StreakDisplay;
