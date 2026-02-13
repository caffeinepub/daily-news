import { type ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md shadow-xl">
      {children}
    </Card>
  );
}
