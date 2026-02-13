import { type ReactNode } from 'react';
import { useDirectAuth } from '../../contexts/DirectAuthContext';

interface RequireAnonymousProps {
  children: ReactNode;
}

export default function RequireAnonymous({ children }: RequireAnonymousProps) {
  const { isAuthenticated } = useDirectAuth();

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
