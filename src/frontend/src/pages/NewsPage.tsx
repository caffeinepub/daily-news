import FeaturedNewsSection from '../components/news/FeaturedNewsSection';
import PaginatedNewsList from '../components/news/PaginatedNewsList';
import NewsSidebar from '../components/news/NewsSidebar';

export default function NewsPage() {
  return (
    <div className="py-8">
      <div className="container">
        <h1 className="mb-8 text-4xl font-bold">Latest News</h1>
        <FeaturedNewsSection />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_300px]">
          <PaginatedNewsList />
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
