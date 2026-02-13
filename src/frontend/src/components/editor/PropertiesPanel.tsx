import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Volume2, VolumeX, Gauge } from 'lucide-react';
import type { VideoEditorState } from '@/hooks/useVideoEditorState';

interface PropertiesPanelProps {
  editorState: VideoEditorState;
}

export function PropertiesPanel({ editorState }: PropertiesPanelProps) {
  const { muted, playbackSpeed, setMuted, setPlaybackSpeed } = editorState;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
      </div>

      <Separator />

      {/* Mute Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="mute" className="flex items-center gap-2">
            {muted ? (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            )}
            Mute Audio
          </Label>
          <Switch
            id="mute"
            checked={muted}
            onCheckedChange={setMuted}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Toggle audio on or off for the video
        </p>
      </div>

      <Separator />

      {/* Playback Speed */}
      <div className="space-y-3">
        <Label htmlFor="speed" className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-muted-foreground" />
          Playback Speed
        </Label>
        <Select
          value={playbackSpeed.toString()}
          onValueChange={(value) => setPlaybackSpeed(parseFloat(value))}
        >
          <SelectTrigger id="speed">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0.25">0.25x (Slow)</SelectItem>
            <SelectItem value="0.5">0.5x</SelectItem>
            <SelectItem value="0.75">0.75x</SelectItem>
            <SelectItem value="1">1x (Normal)</SelectItem>
            <SelectItem value="1.25">1.25x</SelectItem>
            <SelectItem value="1.5">1.5x</SelectItem>
            <SelectItem value="1.75">1.75x</SelectItem>
            <SelectItem value="2">2x (Fast)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Adjust the playback speed of the video
        </p>
      </div>
    </div>
  );
}
