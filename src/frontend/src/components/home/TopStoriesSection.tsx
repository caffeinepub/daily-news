import { useGetLatestTopStories } from '../../hooks/useQueries';
import ArticleCard from '../articles/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function TopStoriesSection() {
  const { data: stories, isLoading } = useGetLatestTopStories();

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">Top Stories</h2>
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories?.slice(0, 5).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
