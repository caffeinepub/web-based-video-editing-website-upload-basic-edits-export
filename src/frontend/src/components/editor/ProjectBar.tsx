import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, FolderOpen, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useProjects } from '@/hooks/useProjects';
import type { VideoEditorState } from '@/hooks/useVideoEditorState';

interface ProjectBarProps {
  editorState: VideoEditorState;
}

export function ProjectBar({ editorState }: ProjectBarProps) {
  const [projectName, setProjectName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  
  const { projects, isLoadingProjects, saveProjectMutation, openProject } = useProjects();

  const handleSave = async () => {
    if (!projectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }

    if (!editorState.videoUrl) {
      toast.error('No video loaded to save');
      return;
    }

    try {
      await saveProjectMutation.mutateAsync({
        name: projectName.trim(),
        settings: {
          trimIn: BigInt(Math.floor(editorState.trimIn * 1000)),
          trimOut: BigInt(Math.floor(editorState.trimOut * 1000)),
          mute: editorState.muted,
          playbackSpeed: editorState.playbackSpeed,
        },
      });
      toast.success(`Project "${projectName}" saved successfully`);
    } catch (error) {
      toast.error('Failed to save project');
      console.error(error);
    }
  };

  const handleOpenProject = (name: string, settings: any) => {
    openProject({
      trimIn: Number(settings.trimIn) / 1000,
      trimOut: Number(settings.trimOut) / 1000,
      mute: settings.mute,
      playbackSpeed: settings.playbackSpeed,
    });
    setProjectName(name);
    setOpenDialog(false);
    toast.success(`Project "${name}" loaded`);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="project-name" className="sr-only">
          Project Name
        </Label>
        <Input
          id="project-name"
          placeholder="Enter project name..."
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleSave}
          disabled={!projectName.trim() || !editorState.videoUrl || saveProjectMutation.isPending}
          className="gap-2"
        >
          {saveProjectMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Project
        </Button>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <FolderOpen className="h-4 w-4" />
              Open Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Open Project</DialogTitle>
              <DialogDescription>
                Select a saved project to restore its settings.
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="h-[300px] pr-4">
              {isLoadingProjects ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : projects && projects.length > 0 ? (
                <div className="space-y-2">
                  {projects.map((project) => (
                    <button
                      key={project.name}
                      onClick={() => handleOpenProject(project.name, project.settings)}
                      className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Updated: {new Date(Number(project.updated) / 1000000).toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No saved projects yet
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
