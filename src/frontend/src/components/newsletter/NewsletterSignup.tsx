import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSubscribeNewsletter } from '../../hooks/useQueries';
import { validateEmail } from '../../lib/validation';
import { toast } from 'sonner';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { mutate: subscribe, isPending } = useSubscribeNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    subscribe(email, {
      onSuccess: (success) => {
        if (success) {
          toast.success('Successfully subscribed to our newsletter!');
          setEmail('');
        } else {
          toast.error('This email is already subscribed');
        }
      },
      onError: () => {
        toast.error('Failed to subscribe. Please try again.');
      },
    });
  };

  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Subscribe for instant updates</h2>
          <p className="mb-8 text-primary-foreground/90">
            Get the latest news delivered straight to your inbox
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-background text-foreground"
                disabled={isPending}
              />
              {error && <p className="mt-1 text-left text-sm text-destructive-foreground">{error}</p>}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="bg-gold text-primary hover:bg-gold/90"
            >
              {isPending ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
