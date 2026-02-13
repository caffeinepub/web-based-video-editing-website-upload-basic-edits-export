import type { ExportSettings, ExportResult } from './exportTypes';

export async function exportVideo(
  videoUrl: string,
  settings: ExportSettings,
  onProgress: (progress: number) => void
): Promise<ExportResult> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.muted = true; // Mute during processing
    video.playbackRate = 1; // Process at normal speed
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const chunks: Blob[] = [];
      const stream = canvas.captureStream(30); // 30 fps
      
      // Add audio track if not muted
      if (!settings.muted) {
        try {
          const audioContext = new AudioContext();
          const source = audioContext.createMediaElementSource(video);
          const destination = audioContext.createMediaStreamDestination();
          source.connect(destination);
          source.connect(audioContext.destination);
          
          destination.stream.getAudioTracks().forEach(track => {
            stream.addTrack(track);
          });
        } catch (err) {
          console.warn('Failed to add audio track:', err);
        }
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus',
        videoBitsPerSecond: 2500000,
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        resolve({ blob, url });
      };

      mediaRecorder.onerror = (e) => {
        reject(new Error('MediaRecorder error: ' + e));
      };

      // Start recording
      mediaRecorder.start(100); // Collect data every 100ms

      const duration = settings.trimOut - settings.trimIn;
      let currentTime = 0;

      const drawFrame = () => {
        if (video.currentTime >= settings.trimOut || video.ended) {
          mediaRecorder.stop();
          video.pause();
          return;
        }

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        currentTime = video.currentTime - settings.trimIn;
        const progress = Math.min(100, (currentTime / duration) * 100);
        onProgress(Math.floor(progress));

        requestAnimationFrame(drawFrame);
      };

      video.currentTime = settings.trimIn;
      
      video.onseeked = () => {
        video.play().then(() => {
          drawFrame();
        }).catch(reject);
      };
    };

    video.onerror = () => {
      reject(new Error('Failed to load video for export'));
    };
  });
}
