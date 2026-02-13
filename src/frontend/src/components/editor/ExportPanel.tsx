import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useVideoExport } from '@/hooks/useVideoExport';
import type { VideoEditorState } from '@/hooks/useVideoEditorState';

interface ExportPanelProps {
  editorState: VideoEditorState;
}

export function ExportPanel({ editorState }: ExportPanelProps) {
  const { startExport, downloadUrl, progress, status, error, reset } = useVideoExport();

  const handleExport = () => {
    startExport(editorState);
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `edited-video-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Export Video</h2>
      </div>

      {status === 'idle' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Export your edited video with all applied settings (trim, mute, speed).
          </p>
          <Button onClick={handleExport} className="w-full gap-2" size="lg">
            <Download className="h-5 w-5" />
            Export Video
          </Button>
        </div>
      )}

      {status === 'exporting' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Exporting video... {progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-xs text-muted-foreground">
            This may take a moment depending on video length and settings.
          </p>
        </div>
      )}

      {status === 'success' && downloadUrl && (
        <div className="space-y-4">
          <Alert className="border-primary/50 bg-primary/5">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <AlertDescription>
              Video exported successfully! Click below to download.
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button onClick={handleDownload} className="flex-1 gap-2" size="lg">
              <Download className="h-5 w-5" />
              Download Video
            </Button>
            <Button onClick={reset} variant="outline" size="lg">
              Export Again
            </Button>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Failed to export video. Please try again.'}
            </AlertDescription>
          </Alert>
          <Button onClick={handleExport} variant="outline" className="w-full">
            Retry Export
          </Button>
        </div>
      )}
    </div>
  );
}
