export function formatPrincipal(principal: string): string {
  if (principal.length <= 12) return principal;
  return `${principal.slice(0, 6)}...${principal.slice(-4)}`;
}

export function isAuthenticated(identity: any): boolean {
  return identity && !identity.getPrincipal().isAnonymous();
}

export function formatUserDisplay(name?: string, email?: string): string {
  if (name) return name;
  if (email) {
    const [localPart] = email.split('@');
    return localPart;
  }
  return 'User';
}
