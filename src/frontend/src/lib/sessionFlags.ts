const SESSION_KEY = 'dailynews_auth_modal_shown';

export function hasShownAuthModal(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function markAuthModalShown(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SESSION_KEY, 'true');
}

export function clearAuthModalFlag(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SESSION_KEY);
}
