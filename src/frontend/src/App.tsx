import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AuthPage from './pages/AuthPage';
import SiteLayout from './components/layout/SiteLayout';
import { Toaster } from '@/components/ui/sonner';
import { DirectAuthProvider } from './contexts/DirectAuthContext';

const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const newsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/news',
  component: NewsPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy',
  component: PrivacyPolicyPage,
});

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: AuthPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  newsRoute,
  aboutRoute,
  privacyRoute,
  authRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <DirectAuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </DirectAuthProvider>
    </ThemeProvider>
  );
}
