/**
 * Push notification utilities for PWA
 */

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    return 'denied';
  }

  const permission = await Notification.requestPermission();
  return permission;
}

/**
 * Check if notifications are supported
 */
export function areNotificationsSupported(): boolean {
  return 'Notification' in window;
}

/**
 * Check if notifications are enabled
 */
export function areNotificationsEnabled(): boolean {
  return areNotificationsSupported() && Notification.permission === 'granted';
}

/**
 * Schedule a daily reminder notification
 */
export function scheduleDailyReminder(time: string, message: string = 'Time for your daily affirmation ritual'): void {
  if (!areNotificationsEnabled()) {
    console.warn('Notifications not enabled');
    return;
  }

  // Parse time (HH:MM format)
  const [hours, minutes] = time.split(':').map(Number);

  // Calculate time until next notification
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hours, minutes, 0, 0);

  // If time has passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();

  // Schedule notification
  setTimeout(() => {
    showNotification('Aura Affirm', message, '/lotus-icon.png');
    // Reschedule for next day
    scheduleDailyReminder(time, message);
  }, timeUntilNotification);

  console.log(`Notification scheduled for ${scheduledTime.toLocaleString()}`);
}

/**
 * Show a notification
 */
export function showNotification(
  title: string,
  body: string,
  icon?: string,
  data?: any
): void {
  if (!areNotificationsEnabled()) {
    console.warn('Cannot show notification: not enabled');
    return;
  }

  const options: NotificationOptions = {
    body,
    icon: icon || '/lotus-icon.png',
    badge: '/lotus-icon.png',
    vibrate: [200, 100, 200],
    data,
    tag: 'aura-affirm'
  };

  const notification = new Notification(title, options);

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
}

/**
 * Show session reminder
 */
export function showSessionReminder(): void {
  showNotification(
    'Aura is waiting',
    'Take a moment to connect with your inner strength',
    '/lotus-icon.png'
  );
}

/**
 * Show streak notification
 */
export function showStreakNotification(streak: number): void {
  let message = '';

  if (streak === 1) {
    message = 'You started your journey! Come back tomorrow.';
  } else if (streak === 7) {
    message = '7 day streak! You are building powerful habits.';
  } else if (streak === 30) {
    message = '30 day streak! Your dedication is extraordinary.';
  } else if (streak === 100) {
    message = '100 day streak! You are unstoppable!';
  } else if (streak % 10 === 0) {
    message = `${streak} day streak! Keep the momentum going.`;
  }

  if (message) {
    showNotification('Streak Milestone! 🔥', message);
  }
}
