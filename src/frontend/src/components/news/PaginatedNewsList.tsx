import { useState } from 'react';
import { useGetPaginatedArticles } from '../../hooks/useQueries';
import ArticleCard from '../articles/ArticleCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ARTICLES_PER_PAGE = 6;

export default function PaginatedNewsList() {
  const [page, setPage] = useState(0);
  const { data: articles, isLoading } = useGetPaginatedArticles(page * ARTICLES_PER_PAGE, ARTICLES_PER_PAGE);

  const hasArticles = articles && articles.length > 0;
  const hasMore = articles && articles.length === ARTICLES_PER_PAGE;

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">All Articles</h2>
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : hasArticles ? (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">Page {page + 1}</span>
            <Button variant="outline" onClick={() => setPage((p) => p + 1)} disabled={!hasMore}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center text-muted-foreground">No articles found</div>
      )}
    </div>
  );
}
