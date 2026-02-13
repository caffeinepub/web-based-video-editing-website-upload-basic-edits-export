import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { VideoFilePicker } from './VideoFilePicker';
import { VideoPreview } from './VideoPreview';
import { TimelineTrimControls } from './TimelineTrimControls';
import { PropertiesPanel } from './PropertiesPanel';
import { ExportPanel } from './ExportPanel';
import { ProjectBar } from './ProjectBar';
import { useVideoEditorState } from '@/hooks/useVideoEditorState';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export function VideoEditorPage() {
  const editorState = useVideoEditorState();
  const [propertiesOpen, setPropertiesOpen] = useState(false);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="space-y-6">
          {/* Project Bar */}
          <Card className="p-4">
            <ProjectBar editorState={editorState} />
          </Card>

          {/* File Picker */}
          {!editorState.videoUrl && (
            <Card className="p-8">
              <VideoFilePicker onVideoLoaded={editorState.loadVideo} />
            </Card>
          )}

          {/* Editor Workspace */}
          {editorState.videoUrl && (
            <div className="grid lg:grid-cols-[1fr_320px] gap-6">
              {/* Main Editor Area */}
              <div className="space-y-6">
                {/* Preview */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Preview</h2>
                  <VideoPreview editorState={editorState} />
                </Card>

                {/* Timeline Controls */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Timeline</h2>
                  <TimelineTrimControls editorState={editorState} />
                </Card>

                {/* Export */}
                <Card className="p-6">
                  <ExportPanel editorState={editorState} />
                </Card>
              </div>

              {/* Properties Panel - Desktop */}
              <div className="hidden lg:block">
                <Card className="p-6 sticky top-20">
                  <PropertiesPanel editorState={editorState} />
                </Card>
              </div>

              {/* Properties Panel - Mobile */}
              <div className="lg:hidden fixed bottom-4 right-4 z-40">
                <Sheet open={propertiesOpen} onOpenChange={setPropertiesOpen}>
                  <SheetTrigger asChild>
                    <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
                      <Settings className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[80vh]">
                    <PropertiesPanel editorState={editorState} />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
