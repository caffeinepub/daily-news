import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface Article {
    id: string;
    title: string;
    created: Time;
    featured: boolean;
    summary: string;
    category: string;
    image: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}

// Direct authentication types (to be implemented in backend)
export interface SessionToken {
    token: string;
}

export interface UserSession {
    name: string;
    email: string;
    userId: string;
}

export interface AuthResult {
    success: boolean;
    message?: string;
    sessionToken?: SessionToken;
    user?: UserSession;
}

export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getArticle(id: string): Promise<Article | null>;
    getArticlesByCategory(category: string): Promise<Array<Article>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedNews(): Promise<Array<Article>>;
    getLatestTopStories(): Promise<Array<Article>>;
    getNewsletterSubscribers(): Promise<Array<string>>;
    getPaginatedArticles(start: bigint, count: bigint): Promise<Array<Article>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    subscribeNewsletter(email: string): Promise<boolean>;
    
    // Direct authentication methods (to be implemented in backend)
    signup(name: string, email: string, password: string): Promise<AuthResult>;
    login(email: string, password: string): Promise<AuthResult>;
    validateSession(token: string): Promise<UserSession | null>;
    logout(token: string): Promise<void>;
}
