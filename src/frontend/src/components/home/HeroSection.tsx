import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useDirectAuth } from '../../contexts/DirectAuthContext';
import { useState } from 'react';
import AuthModal from '../auth/AuthModal';

export default function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useDirectAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate({ to: '/news' });
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-primary py-20 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/assets/generated/dailynews-hero.dim_1920x800.png)' }}
        />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
              Stay Informed, Stay Ahead
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
              Sign up now to personalize your news feed and get instant updates.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={handleAuthClick}
                className="w-full bg-gold text-primary hover:bg-gold/90 sm:w-auto"
              >
                {isAuthenticated ? 'View News' : 'Login'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleAuthClick}
                className="w-full border-gold text-gold hover:bg-gold hover:text-primary sm:w-auto"
              >
                {isAuthenticated ? 'My Account' : 'Sign Up'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
