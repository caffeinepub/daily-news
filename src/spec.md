# Specification

## Summary
**Goal:** Replace Internet Identity-based authentication with direct email/password signup and login, while keeping all other pages and existing functionality unchanged.

**Planned changes:**
- Add Motoko backend endpoints for direct signup, login, and session validation using a persisted session token; store a password-derived value (not plaintext).
- Persist registered user records and active sessions in canister state, including clear error handling for duplicate signup and invalid login.
- Create a new frontend auth context (separate from the Internet Identity hook) that supports signup, login, logout, `isAuthenticated`, and localStorage-backed session persistence validated against the backend.
- Update all auth-related UI/components to use the new direct-auth flow and remove Internet Identity copy/redirect behavior, without changing existing page structure or styling.
- Preserve all existing non-auth behavior (news/article fetching, newsletter subscription, Home/News/About/Privacy pages) with no breaking changes to existing query endpoints.

**User-visible outcome:** Users can sign up and log in with email/password, stay logged in across page reloads via a stored session token, and log out immediately—without any Internet Identity redirects—while the rest of the site works as before.
