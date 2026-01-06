/**
 * Custom hook for background music
 */

import { useEffect, useRef, useState } from 'react';

export function useBackgroundMusic(enabled: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!enabled) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // 30% volume for ambient music

      // Use a royalty-free ambient music URL or local file
      // For now, we'll use a placeholder. In production, add actual music files
      audioRef.current.src = '/assets/ambient-music.mp3';

      audioRef.current.addEventListener('playing', () => setIsPlaying(true));
      audioRef.current.addEventListener('pause', () => setIsPlaying(false));
      audioRef.current.addEventListener('error', (e) => {
        console.warn('Background music failed to load:', e);
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [enabled]);

  const play = async () => {
    if (audioRef.current && enabled) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.warn('Failed to play background music:', error);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  return { isPlaying, play, pause, setVolume };
}
