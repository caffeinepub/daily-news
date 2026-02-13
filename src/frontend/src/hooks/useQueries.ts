import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Article } from '../backend';

export function useGetLatestTopStories() {
  const { actor, isFetching } = useActor();

  return useQuery<Article[]>({
    queryKey: ['topStories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLatestTopStories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedNews() {
  const { actor, isFetching } = useActor();

  return useQuery<Article[]>({
    queryKey: ['featuredNews'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedNews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetArticlesByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Article[]>({
    queryKey: ['articles', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getArticlesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPaginatedArticles(start: number, count: number) {
  const { actor, isFetching } = useActor();

  return useQuery<Article[]>({
    queryKey: ['articles', 'paginated', start, count],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPaginatedArticles(BigInt(start), BigInt(count));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubscribeNewsletter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.subscribeNewsletter(email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newsletter'] });
    },
  });
}

export function useGetArticle(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Article | null>({
    queryKey: ['article', id],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getArticle(id);
      return result || null;
    },
    enabled: !!actor && !isFetching && !!id,
  });
}
