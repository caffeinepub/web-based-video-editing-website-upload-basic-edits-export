import { Film } from 'lucide-react';

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/logo-video-editor.dim_512x512.png"
            alt="Video Editor Logo"
            className="h-10 w-10"
            width={40}
            height={40}
          />
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold text-foreground">Video Editor</span>
          </div>
        </div>
      </div>
    </header>
  );
}
