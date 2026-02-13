import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Project } from '../backend';

export function useListProjects() {
  const { actor, isFetching } = useActor();

  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProject(name: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Project>({
    queryKey: ['project', name],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getProject(name);
    },
    enabled: !!actor && !isFetching && !!name,
  });
}
