import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useActor } from '../hooks/useActor';

interface DirectAuthUser {
  name: string;
  email: string;
}

interface DirectAuthContextValue {
  user: DirectAuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const DirectAuthContext = createContext<DirectAuthContextValue | undefined>(undefined);

const SESSION_TOKEN_KEY = 'dailynews_session_token';
const SESSION_USER_KEY = 'dailynews_user';

export function DirectAuthProvider({ children }: { children: ReactNode }) {
  const { actor, isFetching: actorFetching } = useActor();
  const [user, setUser] = useState<DirectAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      if (!actor || actorFetching) return;

      const storedToken = localStorage.getItem(SESSION_TOKEN_KEY);
      const storedUser = localStorage.getItem(SESSION_USER_KEY);

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // In a real implementation, validate the token with the backend
          // For now, we trust the stored session
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to restore session:', error);
          localStorage.removeItem(SESSION_TOKEN_KEY);
          localStorage.removeItem(SESSION_USER_KEY);
        }
      }

      setIsLoading(false);
    };

    restoreSession();
  }, [actor, actorFetching]);

  const signup = async (name: string, email: string, password: string) => {
    if (!actor) throw new Error('Actor not initialized');

    // In a real implementation, call backend signup endpoint
    // For now, simulate successful signup
    const sessionToken = `token_${Date.now()}_${Math.random()}`;
    const newUser = { name, email };

    localStorage.setItem(SESSION_TOKEN_KEY, sessionToken);
    localStorage.setItem(SESSION_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    if (!actor) throw new Error('Actor not initialized');

    // In a real implementation, call backend login endpoint
    // For now, simulate successful login
    const sessionToken = `token_${Date.now()}_${Math.random()}`;
    const loggedInUser = { name: 'User', email };

    localStorage.setItem(SESSION_TOKEN_KEY, sessionToken);
    localStorage.setItem(SESSION_USER_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = async () => {
    // In a real implementation, call backend logout endpoint
    localStorage.removeItem(SESSION_TOKEN_KEY);
    localStorage.removeItem(SESSION_USER_KEY);
    setUser(null);
  };

  const value: DirectAuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signup,
    login,
    logout,
  };

  return <DirectAuthContext.Provider value={value}>{children}</DirectAuthContext.Provider>;
}

export function useDirectAuth() {
  const context = useContext(DirectAuthContext);
  if (context === undefined) {
    throw new Error('useDirectAuth must be used within a DirectAuthProvider');
  }
  return context;
}
