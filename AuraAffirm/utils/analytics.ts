/**
 * Simple analytics utility for tracking user events
 */

import { AnalyticsEvent } from '../types';
import { getItem, setItem } from './storageUtils';

const ANALYTICS_KEY = 'aura_analytics';
const MAX_EVENTS = 1000; // Keep last 1000 events

/**
 * Track an analytics event
 */
export function trackEvent(eventName: string, data?: Record<string, any>): void {
  try {
    const event: AnalyticsEvent = {
      eventName,
      timestamp: new Date().toISOString(),
      data
    };

    const events = getItem<AnalyticsEvent[]>(ANALYTICS_KEY) || [];
    events.push(event);

    // Keep only the latest MAX_EVENTS
    if (events.length > MAX_EVENTS) {
      events.shift();
    }

    setItem(ANALYTICS_KEY, events);

    // Log in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics:', eventName, data);
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

/**
 * Get all analytics events
 */
export function getAnalytics(): AnalyticsEvent[] {
  return getItem<AnalyticsEvent[]>(ANALYTICS_KEY) || [];
}

/**
 * Get analytics summary
 */
export function getAnalyticsSummary() {
  const events = getAnalytics();

  const summary = {
    totalEvents: events.length,
    sessionStarts: events.filter(e => e.eventName === 'session_start').length,
    sessionCompletions: events.filter(e => e.eventName === 'session_complete').length,
    completionRate: 0,
    averageSessionDuration: 0,
    mostActiveDay: '',
  };

  if (summary.sessionStarts > 0) {
    summary.completionRate = (summary.sessionCompletions / summary.sessionStarts) * 100;
  }

  // Calculate average session duration
  const sessionCompleteEvents = events.filter(e => e.eventName === 'session_complete');
  if (sessionCompleteEvents.length > 0) {
    const totalDuration = sessionCompleteEvents.reduce(
      (sum, e) => sum + (e.data?.duration || 0),
      0
    );
    summary.averageSessionDuration = totalDuration / sessionCompleteEvents.length;
  }

  return summary;
}

/**
 * Clear analytics data
 */
export function clearAnalytics(): void {
  setItem(ANALYTICS_KEY, []);
}

// Pre-defined event names for consistency
export const Events = {
  APP_LOADED: 'app_loaded',
  ONBOARDING_STARTED: 'onboarding_started',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  SESSION_START: 'session_start',
  SESSION_COMPLETE: 'session_complete',
  SESSION_INTERRUPTED: 'session_interrupted',
  VOICE_CHANGED: 'voice_changed',
  MUSIC_TOGGLED: 'music_toggled',
  NOTIFICATION_PERMISSION: 'notification_permission',
  HISTORY_VIEWED: 'history_viewed',
} as const;
