import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useDirectAuth } from '../../contexts/DirectAuthContext';
import AuthModal from '../auth/AuthModal';
import NavLink from '../navigation/NavLink';

export default function SiteHeader() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useDirectAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/' });
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Daily News</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/privacy">Privacy Policy</NavLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center space-x-3 md:flex">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user?.name || user?.email}
                </span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="border-gold text-gold hover:bg-gold hover:text-primary-foreground"
                >
                  Login
                </Button>
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  size="sm"
                  className="bg-gold text-primary hover:bg-gold/90"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/40 bg-background md:hidden">
            <nav className="container flex flex-col space-y-4 py-4">
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/news" onClick={() => setMobileMenuOpen(false)}>
                News
              </NavLink>
              <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                About Us
              </NavLink>
              <NavLink to="/privacy" onClick={() => setMobileMenuOpen(false)}>
                Privacy Policy
              </NavLink>
              <div className="flex flex-col space-y-2 pt-4">
                {isAuthenticated ? (
                  <>
                    <span className="text-sm text-muted-foreground">
                      {user?.name || user?.email}
                    </span>
                    <Button onClick={handleLogout} variant="outline" size="sm">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="border-gold text-gold hover:bg-gold hover:text-primary-foreground"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      size="sm"
                      className="bg-gold text-primary hover:bg-gold/90"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
