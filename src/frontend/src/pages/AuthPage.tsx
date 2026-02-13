import { useState } from 'react';
import AuthCard from '../components/auth/AuthCard';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted/30 py-12">
      <AuthCard>
        {mode === 'login' ? (
          <LoginForm onSwitchToSignup={() => setMode('signup')} />
        ) : (
          <SignupForm onSwitchToLogin={() => setMode('login')} />
        )}
      </AuthCard>
    </div>
  );
}
