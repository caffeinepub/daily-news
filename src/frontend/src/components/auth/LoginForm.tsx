import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDirectAuth } from '../../contexts/DirectAuthContext';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const navigate = useNavigate();
  const { login } = useDirectAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate({ to: '/' });
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Sign in to your Daily News account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={isLoading}
              required
            />
          </div>
          <div className="text-right">
            <button type="button" className="text-sm text-gold hover:underline">
              Forgot Password?
            </button>
          </div>
          <Button
            type="submit"
            className="w-full bg-gold text-primary hover:bg-gold/90"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button type="button" onClick={onSwitchToSignup} className="text-gold hover:underline">
              Sign up here
            </button>
          </p>
        </form>
      </CardContent>
    </>
  );
}
