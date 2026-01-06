import { describe, it, expect, beforeEach } from 'vitest';
import {
  getItem,
  setItem,
  removeItem,
  isStorageAvailable,
  clearAllData,
  StorageError
} from '../utils/storageUtils';

describe('Storage Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getItem', () => {
    it('should return null for non-existent keys', () => {
      const result = getItem('nonexistent');
      expect(result).toBeNull();
    });

    it('should retrieve and parse stored data', () => {
      const testData = { name: 'Test', value: 123 };
      localStorage.setItem('testKey', JSON.stringify(testData));

      const result = getItem<{ name: string; value: number }>('testKey');
      expect(result).toEqual(testData);
    });

    it('should return null for invalid JSON', () => {
      localStorage.setItem('invalidJSON', 'not valid json {');
      const result = getItem('invalidJSON');
      expect(result).toBeNull();
    });
  });

  describe('setItem', () => {
    it('should store data successfully', () => {
      const testData = { foo: 'bar' };
      const result = setItem('testKey', testData);

      expect(result).toBe(true);
      expect(JSON.parse(localStorage.getItem('testKey')!)).toEqual(testData);
    });

    it('should handle complex objects', () => {
      const complexData = {
        name: 'John',
        age: 30,
        nested: {
          array: [1, 2, 3],
          flag: true
        }
      };

      setItem('complex', complexData);
      const retrieved = getItem(typeof complexData);
      expect(retrieved).toEqual(complexData);
    });
  });

  describe('removeItem', () => {
    it('should remove item from storage', () => {
      localStorage.setItem('toRemove', 'value');
      const result = removeItem('toRemove');

      expect(result).toBe(true);
      expect(localStorage.getItem('toRemove')).toBeNull();
    });
  });

  describe('isStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(isStorageAvailable()).toBe(true);
    });
  });

  describe('clearAllData', () => {
    it('should clear only aura_ prefixed items', () => {
      localStorage.setItem('aura_prefs', 'value1');
      localStorage.setItem('aura_history', 'value2');
      localStorage.setItem('other_key', 'value3');

      clearAllData();

      expect(localStorage.getItem('aura_prefs')).toBeNull();
      expect(localStorage.getItem('aura_history')).toBeNull();
      expect(localStorage.getItem('other_key')).toBe('value3');
    });
  });
});
