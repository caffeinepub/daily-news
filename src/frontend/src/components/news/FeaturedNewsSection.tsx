import { useGetFeaturedNews } from '../../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '../../lib/articles';

export default function FeaturedNewsSection() {
  const { data: featured, isLoading } = useGetFeaturedNews();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const mainFeatured = featured?.[0];

  if (!mainFeatured) {
    return null;
  }

  const imageUrl = mainFeatured.image || '/assets/generated/news-featured-placeholder.dim_1200x675.png';

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-bold">Featured News</h2>
      <Card className="overflow-hidden">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="aspect-video overflow-hidden md:aspect-auto">
            <img src={imageUrl} alt={mainFeatured.title} className="h-full w-full object-cover" />
          </div>
          <CardContent className="flex flex-col justify-center p-6">
            <div className="mb-3 flex items-center gap-3">
              <Badge>{mainFeatured.category}</Badge>
              <span className="text-sm text-muted-foreground">{formatDate(mainFeatured.created)}</span>
            </div>
            <h3 className="mb-4 text-2xl font-bold">{mainFeatured.title}</h3>
            <p className="text-muted-foreground">{mainFeatured.summary}</p>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
