import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import type { VideoEditorState } from '@/hooks/useVideoEditorState';

interface TimelineTrimControlsProps {
  editorState: VideoEditorState;
}

export function TimelineTrimControls({ editorState }: TimelineTrimControlsProps) {
  const {
    duration,
    currentTime,
    trimIn,
    trimOut,
    isPlaying,
    setCurrentTime,
    setTrimIn,
    setTrimOut,
    setIsPlaying,
  } = editorState;

  const handleTrimInChange = (value: number) => {
    const newTrimIn = Math.max(0, Math.min(value, trimOut - 0.1));
    setTrimIn(newTrimIn);
    if (currentTime < newTrimIn) {
      setCurrentTime(newTrimIn);
    }
  };

  const handleTrimOutChange = (value: number) => {
    const newTrimOut = Math.max(trimIn + 0.1, Math.min(value, duration));
    setTrimOut(newTrimOut);
    if (currentTime > newTrimOut) {
      setCurrentTime(newTrimOut);
    }
  };

  return (
    <div className="space-y-6">
      {/* Transport Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentTime(trimIn)}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button
          size="lg"
          onClick={() => setIsPlaying(!isPlaying)}
          className="gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="h-5 w-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              Play
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentTime(trimOut)}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Playhead Slider */}
      <div className="space-y-2">
        <Label>Current Time: {formatTime(currentTime)}</Label>
        <Slider
          value={[currentTime]}
          min={trimIn}
          max={trimOut}
          step={0.1}
          onValueChange={([value]) => setCurrentTime(value)}
          className="w-full"
        />
      </div>

      {/* Trim Controls */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="trim-in">Trim In (seconds)</Label>
          <div className="flex gap-2">
            <Input
              id="trim-in"
              type="number"
              value={trimIn.toFixed(1)}
              onChange={(e) => handleTrimInChange(parseFloat(e.target.value) || 0)}
              step={0.1}
              min={0}
              max={trimOut - 0.1}
            />
          </div>
          <Slider
            value={[trimIn]}
            min={0}
            max={duration}
            step={0.1}
            onValueChange={([value]) => handleTrimInChange(value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="trim-out">Trim Out (seconds)</Label>
          <div className="flex gap-2">
            <Input
              id="trim-out"
              type="number"
              value={trimOut.toFixed(1)}
              onChange={(e) => handleTrimOutChange(parseFloat(e.target.value) || duration)}
              step={0.1}
              min={trimIn + 0.1}
              max={duration}
            />
          </div>
          <Slider
            value={[trimOut]}
            min={0}
            max={duration}
            step={0.1}
            onValueChange={([value]) => handleTrimOutChange(value)}
          />
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
}
