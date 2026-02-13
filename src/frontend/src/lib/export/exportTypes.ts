export type ExportStatus = 'idle' | 'exporting' | 'success' | 'error';

export interface ExportSettings {
  trimIn: number;
  trimOut: number;
  muted: boolean;
  playbackSpeed: number;
}

export interface ExportResult {
  blob: Blob;
  url: string;
}
