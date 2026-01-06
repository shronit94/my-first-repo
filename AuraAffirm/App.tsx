
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AppView, UserPreferences, SessionSummary } from './types';
import { TRANSLATIONS } from './constants';
import VoiceSession from './components/VoiceSession';
import Onboarding from './components/Onboarding';
import LotusLogo from './components/LotusLogo';
import StreakDisplay from './components/StreakDisplay';
import { getItem, setItem, StorageError } from './utils/storageUtils';
import { getStreakData, updateStreak, addSessionToHistory } from './utils/streakUtils';
import { trackEvent, Events } from './utils/analytics';
import { useBackgroundMusic } from './hooks/useBackgroundMusic';

// Lazy load HistoryView for better performance
const HistoryView = lazy(() => import('./components/HistoryView'));

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [streak, setStreak] = useState(getStreakData());
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Background music
  const backgroundMusic = useBackgroundMusic(prefs?.backgroundMusicEnabled || false);

  useEffect(() => {
    trackEvent(Events.APP_LOADED);

    try {
      const saved = getItem<UserPreferences>('aura_prefs');
      if (saved) {
        setPrefs(saved);
      } else {
        setView(AppView.ONBOARDING);
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
      setError('Failed to load your data. Starting fresh.');
      setView(AppView.ONBOARDING);
    }
  }, []);

  const handleSetupComplete = (newPrefs: UserPreferences) => {
    try {
      setPrefs(newPrefs);
      setItem('aura_prefs', newPrefs);
      setView(AppView.HOME);
      trackEvent(Events.ONBOARDING_COMPLETED);
    } catch (error) {
      if (error instanceof StorageError) {
        setError(error.message);
      }
    }
  };

  const startSession = () => {
    setView(AppView.LIVE_SESSION);
    setSessionStartTime(Date.now());
    trackEvent(Events.SESSION_START);

    // Start background music if enabled
    if (prefs?.backgroundMusicEnabled) {
      backgroundMusic.play();
    }
  };

  const endSession = () => {
    setView(AppView.HOME);
    setSessionStartTime(null);
    backgroundMusic.pause();
    trackEvent(Events.SESSION_INTERRUPTED);
  };

  const finishSession = (quote: string, theme: string) => {
    const now = new Date().toISOString();
    const duration = sessionStartTime ? Math.floor((Date.now() - sessionStartTime) / 1000) : 0;

    setSummary({ quote, theme });
    setView(AppView.SUMMARY);

    // Update streak
    const newStreak = updateStreak(now);
    setStreak(newStreak);

    // Add to history
    addSessionToHistory({
      date: now,
      quote,
      theme,
      duration,
      completed: true
    });

    // Update preferences
    if (prefs) {
      const updated = { ...prefs, lastSessionDate: now };
      setPrefs(updated);
      try {
        setItem('aura_prefs', updated);
      } catch (error) {
        console.error('Failed to save preferences:', error);
      }
    }

    // Stop background music
    backgroundMusic.pause();

    // Track analytics
    trackEvent(Events.SESSION_COMPLETE, { duration, quote, theme });
  };

  const t = TRANSLATIONS;

  // Error display
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-rose-50 to-indigo-50">
        <div className="max-w-md glass p-8 rounded-3xl shadow-xl text-center space-y-4">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-2xl font-serif text-rose-950">Notice</h2>
          <p className="text-rose-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="px-6 py-3 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600"
            aria-label="Dismiss error"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (view === AppView.ONBOARDING) {
    return <Onboarding onComplete={handleSetupComplete} />;
  }

  if (view === AppView.HISTORY) {
    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-rose-500 text-xl">Loading...</div>
        </div>
      }>
        <HistoryView onClose={() => setView(AppView.HOME)} />
      </Suspense>
    );
  }

  if (view === AppView.SUMMARY && summary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-50 to-indigo-50">
        <div className="max-w-xl w-full text-center space-y-12 animate-in fade-in zoom-in duration-1000">
          <div className="space-y-4">
            <span className="text-rose-400 font-bold uppercase tracking-[0.2em] text-sm">{t.wisdomLabel}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-rose-950 leading-tight italic">
              "{summary.quote}"
            </h2>
            <div className="h-px w-24 bg-rose-200 mx-auto mt-8"></div>
          </div>
          
          <div className="glass p-8 rounded-[2rem] border-rose-100">
            <p className="text-rose-800/70 font-serif text-xl">
              {t.cultivatedLabel} <span className="text-rose-500 font-bold">{summary.theme}</span> {t.todayLabel}
            </p>
          </div>

          <button 
            onClick={() => setView(AppView.HOME)}
            className="px-12 py-5 bg-rose-500 text-white rounded-full font-bold text-lg hover:bg-rose-600 shadow-xl shadow-rose-200 transition-all hover:scale-105"
          >
            {t.btnReturn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-24 space-y-16">
      <nav className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <LotusLogo size="md" />
          <span className="text-2xl font-serif font-bold text-[#631e1e] tracking-tight">Aura Affirm</span>
        </div>
        <div className="flex items-center gap-3">
          {prefs && (
            <>
              <button
                onClick={() => {
                  setView(AppView.HISTORY);
                  trackEvent(Events.HISTORY_VIEWED);
                }}
                className="p-2 hover:bg-rose-100 rounded-full transition-all"
                aria-label="View session history"
                title="View History"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-rose-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-rose-100">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-widest">
                  {t.ritualLabel} {prefs.notificationTime}
                </span>
              </div>
            </>
          )}
        </div>
      </nav>

      {prefs && streak.totalSessions > 0 && (
        <StreakDisplay streak={streak} className="animate-in fade-in slide-in-from-top duration-700" />
      )}

      <section className="text-center space-y-8 py-12">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-serif text-rose-950 leading-tight">
            {prefs?.userName ? (
              <>
                Welcome, <br />
                <span className="text-rose-400 italic">{prefs.userName}</span>
              </>
            ) : (
              <>
                {t.heroTitle} <br />
                <span className="text-rose-400 italic">{t.heroHighlight}</span>
              </>
            )}
          </h1>
          <p className="text-xl text-rose-700/70 max-w-xl mx-auto font-light leading-relaxed">
            {t.heroDesc}
          </p>
        </div>

        <div className="pt-8 flex flex-col items-center">
          <button
            onClick={startSession}
            className="group relative px-16 py-8 bg-rose-500 text-white rounded-full font-bold text-2xl hover:bg-rose-600 transition-all shadow-2xl shadow-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-300"
            aria-label="Begin your daily affirmation ritual"
          >
            <div className="absolute inset-0 rounded-full bg-rose-400 animate-ping opacity-20 group-hover:opacity-40" aria-hidden="true"></div>
            {t.btnBeginRitual}
          </button>
          <p className="mt-6 text-sm font-bold text-rose-400 uppercase tracking-[0.3em]">{t.sessionSubtitle}</p>
        </div>
      </section>

      {view === AppView.LIVE_SESSION && (
        <VoiceSession
          onClose={endSession}
          onFinish={finishSession}
          isFirstTime={!prefs?.lastSessionDate}
          userName={prefs?.userName}
          voicePreference={prefs?.voicePreference || 'Kore'}
        />
      )}
    </div>
  );
};

export default App;
