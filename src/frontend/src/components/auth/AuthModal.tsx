import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Daily News</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          {mode === 'login' ? (
            <LoginForm onSwitchToSignup={() => setMode('signup')} />
          ) : (
            <SignupForm onSwitchToLogin={() => setMode('login')} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
