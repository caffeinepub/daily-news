import { Link } from '@tanstack/react-router';
import { SiFacebook, SiX, SiInstagram, SiLinkedin } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'dailynews';

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground transition-colors hover:text-foreground">
                Home
              </Link>
              <Link to="/news" className="text-muted-foreground transition-colors hover:text-foreground">
                News
              </Link>
              <Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                About Us
              </Link>
              <Link to="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <p className="text-muted-foreground">
              Email:{' '}
              <a href="mailto:info@dailynews.com" className="transition-colors hover:text-foreground">
                info@dailynews.com
              </a>
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Daily News. Built with <Heart className="h-4 w-4 fill-gold text-gold" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
