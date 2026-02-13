import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RequireAnonymous from '../auth/RequireAnonymous';
import { useState } from 'react';
import AuthModal from '../auth/AuthModal';

export default function NewsSidebar() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <>
      <aside className="space-y-6">
        <RequireAnonymous>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Join Daily News</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Sign up to personalize your news feed and save your favorite articles.
              </p>
              <Button
                onClick={() => setAuthModalOpen(true)}
                className="w-full bg-gold text-primary hover:bg-gold/90"
              >
                Sign Up Now
              </Button>
            </CardContent>
          </Card>
        </RequireAnonymous>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Articles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Smart Contracts in Finance</h4>
              <p className="text-xs text-muted-foreground">How blockchain is changing banking</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">The Future of AI</h4>
              <p className="text-xs text-muted-foreground">What to expect in 2026</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Climate Action Now</h4>
              <p className="text-xs text-muted-foreground">Global initiatives making a difference</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Comments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-medium">John D.</p>
              <p className="text-xs text-muted-foreground">"Great article on technology trends!"</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium">Sarah M.</p>
              <p className="text-xs text-muted-foreground">"Very informative piece on climate change."</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium">Mike R.</p>
              <p className="text-xs text-muted-foreground">"Looking forward to more updates!"</p>
            </div>
          </CardContent>
        </Card>
      </aside>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
