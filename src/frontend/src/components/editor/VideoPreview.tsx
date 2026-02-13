import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import type { VideoEditorState } from '@/hooks/useVideoEditorState';

interface VideoPreviewProps {
  editorState: VideoEditorState;
}

export function VideoPreview({ editorState }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    videoUrl,
    isPlaying,
    currentTime,
    trimIn,
    trimOut,
    muted,
    playbackSpeed,
    setCurrentTime,
    setIsPlaying,
  } = editorState;

  // Apply video settings
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = playbackSpeed;
    videoRef.current.muted = muted;
  }, [playbackSpeed, muted]);

  // Handle play/pause
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  // Sync current time
  useEffect(() => {
    if (!videoRef.current) return;
    if (Math.abs(videoRef.current.currentTime - currentTime) > 0.1) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  // Handle time updates and trim enforcement
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    
    // Enforce trim range
    if (time < trimIn) {
      videoRef.current.currentTime = trimIn;
      setCurrentTime(trimIn);
    } else if (time > trimOut) {
      videoRef.current.currentTime = trimIn;
      setCurrentTime(trimIn);
      setIsPlaying(false);
    } else {
      setCurrentTime(time);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    
    // If at the end, restart from beginning
    if (currentTime >= trimOut) {
      videoRef.current.currentTime = trimIn;
      setCurrentTime(trimIn);
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <video
          ref={videoRef}
          src={videoUrl || undefined}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Button
            size="lg"
            variant="secondary"
            className="pointer-events-auto h-16 w-16 rounded-full opacity-90 hover:opacity-100"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </Button>
        </div>
      </div>

      {/* Time Display */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(trimOut - trimIn)} duration</span>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
