import HeroSection from '../components/home/HeroSection';
import InlineSignupSection from '../components/home/InlineSignupSection';
import TopStoriesSection from '../components/home/TopStoriesSection';
import CategoriesSection from '../components/home/CategoriesSection';
import NewsletterSignup from '../components/newsletter/NewsletterSignup';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <InlineSignupSection />
      <TopStoriesSection />
      <CategoriesSection />
      <NewsletterSignup />
    </div>
  );
}
