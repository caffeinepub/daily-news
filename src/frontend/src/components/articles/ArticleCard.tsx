import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Article } from '../../backend';
import { formatDate } from '../../lib/articles';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = article.image || '/assets/generated/news-thumb-placeholder.dim_800x500.png';

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img src={imageUrl} alt={article.title} className="h-full w-full object-cover transition-transform hover:scale-105" />
      </div>
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="secondary">{article.category}</Badge>
          <span className="text-xs text-muted-foreground">{formatDate(article.created)}</span>
        </div>
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="line-clamp-3">{article.summary}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-primary">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}
