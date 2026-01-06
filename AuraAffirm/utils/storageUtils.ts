/**
 * Safe localStorage wrapper with error handling
 */

export class StorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Safely get an item from localStorage
 */
export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return null;
  }
}

/**
 * Safely set an item in localStorage
 */
export function setItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);

    // Check if it's a quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      throw new StorageError('Storage quota exceeded. Please clear some data.');
    }

    throw new StorageError('Failed to save data. Please check if storage is available.');
  }
}

/**
 * Safely remove an item from localStorage
 */
export function removeItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
}

/**
 * Check if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Clear all app data from localStorage
 */
export function clearAllData(): boolean {
  try {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('aura_'));
    keys.forEach(key => localStorage.removeItem(key));
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}
