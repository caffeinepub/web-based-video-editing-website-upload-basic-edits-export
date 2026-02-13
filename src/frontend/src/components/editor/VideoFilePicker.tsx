import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Video } from 'lucide-react';
import { toast } from 'sonner';

interface VideoFilePickerProps {
  onVideoLoaded: (file: File, url: string, duration: number) => void;
}

export function VideoFilePicker({ onVideoLoaded }: VideoFilePickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please select a valid video file');
      return;
    }

    const url = URL.createObjectURL(file);
    
    // Create a temporary video element to get duration
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      const duration = video.duration;
      onVideoLoaded(file, url, duration);
      toast.success('Video loaded successfully');
    };

    video.onerror = () => {
      toast.error('Failed to load video');
      URL.revokeObjectURL(url);
    };

    video.src = url;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
        <Video className="h-12 w-12 text-primary" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold">Select a Video to Edit</h3>
        <p className="text-muted-foreground max-w-md">
          Choose a video file from your device. All processing happens locally in your browser.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <Button
        size="lg"
        onClick={() => fileInputRef.current?.click()}
        className="gap-2"
      >
        <Upload className="h-5 w-5" />
        Choose Video File
      </Button>

      <p className="text-xs text-muted-foreground">
        Supported formats: MP4, WebM, MOV, and more
      </p>
    </div>
  );
}
