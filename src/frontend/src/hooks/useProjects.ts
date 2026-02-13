import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useListProjects } from './useQueries';
import type { EditSettings } from '../backend';

export function useProjects() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: projects, isLoading: isLoadingProjects } = useListProjects();

  const saveProjectMutation = useMutation({
    mutationFn: async ({ name, settings }: { name: string; settings: EditSettings }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.saveProject(name, settings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const openProject = (settings: {
    trimIn: number;
    trimOut: number;
    mute: boolean;
    playbackSpeed: number;
  }) => {
    // This is handled by the parent component
    return settings;
  };

  return {
    projects,
    isLoadingProjects,
    saveProjectMutation,
    openProject,
  };
}
