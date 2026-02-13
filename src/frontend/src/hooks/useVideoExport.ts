import { useState, useCallback } from 'react';
import { exportVideo } from '@/lib/export/exportVideo';
import type { VideoEditorState } from './useVideoEditorState';
import type { ExportStatus } from '@/lib/export/exportTypes';

export function useVideoExport() {
  const [status, setStatus] = useState<ExportStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startExport = useCallback(async (editorState: VideoEditorState) => {
    if (!editorState.videoUrl) {
      setError('No video loaded');
      setStatus('error');
      return;
    }

    setStatus('exporting');
    setProgress(0);
    setError(null);

    try {
      const result = await exportVideo(
        editorState.videoUrl,
        {
          trimIn: editorState.trimIn,
          trimOut: editorState.trimOut,
          muted: editorState.muted,
          playbackSpeed: editorState.playbackSpeed,
        },
        (progressValue) => {
          setProgress(progressValue);
        }
      );

      setDownloadUrl(result.url);
      setStatus('success');
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    setStatus('idle');
    setProgress(0);
    setDownloadUrl(null);
    setError(null);
  }, [downloadUrl]);

  return {
    startExport,
    status,
    progress,
    downloadUrl,
    error,
    reset,
  };
}
