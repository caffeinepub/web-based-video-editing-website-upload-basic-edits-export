import { Scissors, Zap, Download } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Edit Videos
              <span className="block text-primary">Right in Your Browser</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Trim, adjust speed, and export your videos instantly. No uploads, no waiting—everything happens locally on your device.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Scissors className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Trim & Cut</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Speed Control</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Quick Export</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/assets/generated/hero-video-editing.dim_1600x600.png"
              alt="Video editing interface illustration"
              className="w-full h-auto rounded-lg shadow-2xl"
              width={1600}
              height={600}
              style={{ aspectRatio: '1600/600' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
