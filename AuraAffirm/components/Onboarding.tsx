
import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { UserPreferences, VoiceType } from '../types';
import LotusLogo from './LotusLogo';

interface OnboardingProps {
  onComplete: (prefs: UserPreferences) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [time, setTime] = useState('08:00');
  const [voicePreference, setVoicePreference] = useState<VoiceType>('Kore');
  const [backgroundMusicEnabled, setBackgroundMusicEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const t = TRANSLATIONS;

  const handleNext = () => {
    if (step === 1 && !userName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete({
        userName: userName.trim(),
        notificationTime: time,
        setupComplete: true,
        lastSessionDate: null,
        voicePreference,
        backgroundMusicEnabled,
        notificationsEnabled
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-tr from-rose-50 to-indigo-50">
      <div className="max-w-lg w-full glass p-10 md:p-16 rounded-[3rem] shadow-2xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">

        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <LotusLogo size="xl" className="mx-auto mb-6" />
              <h2 className="text-4xl font-serif text-rose-950">{t.welcomeTitle}</h2>
              <p className="text-rose-700/70 leading-relaxed">{t.welcomeDesc}</p>
            </div>
            <div className="space-y-4">
              <label htmlFor="userName" className="block text-center text-rose-800 font-semibold">
                What is your name?
              </label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full text-3xl font-serif text-rose-900 bg-white/50 border-b-2 border-rose-300 focus:border-rose-500 outline-none px-4 py-3 text-center rounded-xl"
                aria-label="Enter your name"
                autoFocus
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl" role="img" aria-label="clock">⏰</span>
              </div>
              <h2 className="text-4xl font-serif text-rose-950">{t.ritualTitle}</h2>
              <p className="text-rose-700/70">{t.ritualDesc}</p>
            </div>
            <div className="flex justify-center">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="text-5xl font-serif text-rose-900 bg-white/50 border-b-2 border-rose-300 focus:border-rose-500 outline-none px-4 py-2 text-center rounded-xl"
                aria-label="Select daily ritual time"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl" role="img" aria-label="voice">🎙️</span>
              </div>
              <h2 className="text-4xl font-serif text-rose-950">Choose Aura's Voice</h2>
              <p className="text-rose-700/70">Select the voice that resonates with you</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(['Kore', 'Puck', 'Charon', 'Fenrir'] as VoiceType[]).map((voice) => (
                <button
                  key={voice}
                  onClick={() => setVoicePreference(voice)}
                  className={`p-6 rounded-2xl font-semibold text-lg transition-all ${
                    voicePreference === voice
                      ? 'bg-rose-500 text-white shadow-xl scale-105'
                      : 'bg-white/50 text-rose-800 hover:bg-white/70'
                  }`}
                  aria-label={`Select ${voice} voice`}
                  aria-pressed={voicePreference === voice}
                >
                  {voice}
                  <div className="text-xs mt-1 opacity-70">
                    {voice === 'Kore' || voice === 'Fenrir' ? 'Female' : 'Male'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl" role="img" aria-label="music">🎵</span>
              </div>
              <h2 className="text-4xl font-serif text-rose-950">Background Music</h2>
              <p className="text-rose-700/70">Enhance your experience with ambient sounds</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setBackgroundMusicEnabled(true)}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
                  backgroundMusicEnabled
                    ? 'bg-rose-500 text-white shadow-xl scale-105'
                    : 'bg-white/50 text-rose-800 hover:bg-white/70'
                }`}
                aria-label="Enable background music"
                aria-pressed={backgroundMusicEnabled}
              >
                Yes
              </button>
              <button
                onClick={() => setBackgroundMusicEnabled(false)}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all ${
                  !backgroundMusicEnabled
                    ? 'bg-rose-500 text-white shadow-xl scale-105'
                    : 'bg-white/50 text-rose-800 hover:bg-white/70'
                }`}
                aria-label="Disable background music"
                aria-pressed={!backgroundMusicEnabled}
              >
                No
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-8 text-center">
            <div className="space-y-6">
              <LotusLogo size="xl" className="mx-auto animate-pulse" />
              <h2 className="text-4xl font-serif text-rose-950">{t.readyTitle}, {userName}</h2>
              <p className="text-rose-700/70 leading-relaxed italic">
                "{t.readyDesc}"
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleNext}
          className="w-full py-6 bg-rose-500 text-white rounded-full font-bold text-xl hover:bg-rose-600 shadow-xl shadow-rose-200 transition-all active:scale-95"
          aria-label={step === 5 ? 'Complete setup and begin journey' : 'Continue to next step'}
        >
          {step === 5 ? t.btnBeginJourney : t.btnContinue}
        </button>

        <div className="flex justify-center gap-2 pt-4" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={5}>
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'w-8 bg-rose-500' : s < step ? 'w-2 bg-rose-300' : 'w-2 bg-rose-200'
              }`}
              aria-label={`Step ${s}${s === step ? ' (current)' : s < step ? ' (completed)' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
