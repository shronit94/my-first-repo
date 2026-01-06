import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Mock Web Audio API
global.AudioContext = vi.fn().mockImplementation(() => ({
  createMediaStreamSource: vi.fn(),
  createScriptProcessor: vi.fn(() => ({
    connect: vi.fn(),
    disconnect: vi.fn(),
    onaudioprocess: null,
  })),
  createBuffer: vi.fn(),
  createBufferSource: vi.fn(() => ({
    buffer: null,
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    addEventListener: vi.fn(),
  })),
  close: vi.fn(),
  resume: vi.fn(),
  suspend: vi.fn(),
  state: 'running',
  currentTime: 0,
  destination: {},
  sampleRate: 48000,
})) as any;

// Mock navigator.mediaDevices
Object.defineProperty(global.navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: vi.fn().mockResolvedValue({
      getTracks: () => [],
      getVideoTracks: () => [],
      getAudioTracks: () => [],
    }),
  },
});

// Mock Notification API
global.Notification = {
  permission: 'default',
  requestPermission: vi.fn().mockResolvedValue('granted'),
} as any;

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});
