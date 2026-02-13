import type { Article } from '../backend';

export function formatDate(timestamp: bigint): string {
  const date = new Date(Number(timestamp) / 1_000_000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function sortArticlesByDate(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => Number(b.created - a.created));
}
