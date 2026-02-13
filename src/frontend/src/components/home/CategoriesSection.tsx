import { useGetArticlesByCategory } from '../../hooks/useQueries';
import ArticleCard from '../articles/ArticleCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const categories = ['Politics', 'Technology', 'Sports', 'Health', 'Entertainment'];

export default function CategoriesSection() {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">Browse by Category</h2>
        <Tabs defaultValue="Technology" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:gap-0">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <CategoryTab key={category} category={category} />
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function CategoryTab({ category }: { category: string }) {
  const { data: articles, isLoading } = useGetArticlesByCategory(category);

  return (
    <TabsContent value={category}>
      {isLoading ? (
        <div className="text-center text-muted-foreground">Loading {category} articles...</div>
      ) : articles && articles.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">No articles found in {category}</div>
      )}
    </TabsContent>
  );
}
