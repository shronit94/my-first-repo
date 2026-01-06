/**
 * Session History View Component
 */

import React, { useState } from 'react';
import { SessionHistory } from '../types';
import { getSessionHistory, getSessionsByDate } from '../utils/streakUtils';

interface HistoryViewProps {
  onClose: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ onClose }) => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const history = getSessionHistory();
  const sessionsByDate = getSessionsByDate();

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderCalendarView = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateKey = date.toDateString();
      const sessions = sessionsByDate[dateKey] || [];
      const hasSession = sessions.length > 0;
      const isToday = date.toDateString() === today.toDateString();

      days.push(
        <div
          key={day}
          className={`p-2 text-center rounded-lg transition-all ${
            isToday ? 'ring-2 ring-rose-500' : ''
          } ${
            hasSession
              ? 'bg-rose-500 text-white font-bold hover:bg-rose-600 cursor-pointer'
              : 'bg-white/30 text-rose-800 hover:bg-white/50'
          }`}
          title={hasSession ? `${sessions.length} session(s)` : 'No sessions'}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-center font-bold text-rose-900 text-xl">
          {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-rose-700 text-sm">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-50/95 backdrop-blur-2xl">
      <div className="max-w-2xl w-full bg-white/80 rounded-[3rem] shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-serif text-rose-950">Your Journey</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-rose-100 text-rose-500 transition-all"
            aria-label="Close history view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 bg-rose-100 p-1 rounded-full">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all ${
              viewMode === 'list' ? 'bg-white text-rose-900 shadow-md' : 'text-rose-700'
            }`}
            aria-label="List view"
            aria-pressed={viewMode === 'list'}
          >
            List
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all ${
              viewMode === 'calendar' ? 'bg-white text-rose-900 shadow-md' : 'text-rose-700'
            }`}
            aria-label="Calendar view"
            aria-pressed={viewMode === 'calendar'}
          >
            Calendar
          </button>
        </div>

        <div className="max-h-[500px] overflow-y-auto rounded-2xl p-4 bg-gradient-to-br from-rose-50/50 to-indigo-50/50">
          {viewMode === 'calendar' ? (
            renderCalendarView()
          ) : (
            <div className="space-y-4">
              {history.length === 0 ? (
                <p className="text-center text-rose-700/70 py-12 italic">
                  No sessions yet. Begin your journey today!
                </p>
              ) : (
                history.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-rose-600 font-semibold uppercase tracking-wide">
                          {formatDate(session.date)}
                        </div>
                        <div className="text-lg font-serif text-rose-950 italic mt-1">
                          "{session.quote}"
                        </div>
                      </div>
                      {session.completed && (
                        <div className="text-2xl" role="img" aria-label="completed">✓</div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-rose-700/70">
                      <span className="font-semibold">{session.theme}</span>
                      <span>•</span>
                      <span>{formatDuration(session.duration)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
