import { useState, useCallback } from 'react';

export interface VideoEditorState {
  videoFile: File | null;
  videoUrl: string | null;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  trimIn: number;
  trimOut: number;
  muted: boolean;
  playbackSpeed: number;
  loadVideo: (file: File, url: string, duration: number) => void;
  setCurrentTime: (time: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setTrimIn: (time: number) => void;
  setTrimOut: (time: number) => void;
  setMuted: (muted: boolean) => void;
  setPlaybackSpeed: (speed: number) => void;
  restoreSettings: (settings: {
    trimIn: number;
    trimOut: number;
    mute: boolean;
    playbackSpeed: number;
  }) => void;
}

export function useVideoEditorState(): VideoEditorState {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trimIn, setTrimIn] = useState(0);
  const [trimOut, setTrimOut] = useState(0);
  const [muted, setMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const loadVideo = useCallback((file: File, url: string, videoDuration: number) => {
    // Clean up previous video URL
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoFile(file);
    setVideoUrl(url);
    setDuration(videoDuration);
    setCurrentTime(0);
    setTrimIn(0);
    setTrimOut(videoDuration);
    setIsPlaying(false);
  }, [videoUrl]);

  const restoreSettings = useCallback((settings: {
    trimIn: number;
    trimOut: number;
    mute: boolean;
    playbackSpeed: number;
  }) => {
    setTrimIn(Math.max(0, Math.min(settings.trimIn, duration)));
    setTrimOut(Math.max(0, Math.min(settings.trimOut, duration)));
    setMuted(settings.mute);
    setPlaybackSpeed(settings.playbackSpeed);
    setCurrentTime(settings.trimIn);
  }, [duration]);

  return {
    videoFile,
    videoUrl,
    duration,
    currentTime,
    isPlaying,
    trimIn,
    trimOut,
    muted,
    playbackSpeed,
    loadVideo,
    setCurrentTime,
    setIsPlaying,
    setTrimIn,
    setTrimOut,
    setMuted,
    setPlaybackSpeed,
    restoreSettings,
  };
}
