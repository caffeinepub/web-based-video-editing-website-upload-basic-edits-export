import { BrandHeader } from './components/BrandHeader';
import { HeroSection } from './components/HeroSection';
import { VideoEditorPage } from './components/editor/VideoEditorPage';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <BrandHeader />
        <main>
          <HeroSection />
          <VideoEditorPage />
        </main>
        <footer className="border-t border-border bg-card py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Video Editor. Built with{' '}
              <span className="text-accent-foreground">♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'video-editor'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </footer>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
