import type { AllContent } from './types';

const CONTENT_FILES = ['shared', 'index', 'about', 'team', 'projects', 'news', 'careers'] as const;
type ContentKey = typeof CONTENT_FILES[number];

let contentStore: AllContent | null = null;

export async function loadAllContent(): Promise<AllContent> {
  if (contentStore) return contentStore;

  const base: Record<string, unknown> = {};

  const fetches = CONTENT_FILES.map(async (name) => {
    try {
      const res = await fetch(`./assets/content/${name}.json`);
      if (!res.ok) throw new Error(String(res.status));
      base[name] = await res.json();
      console.log(`[content] loaded ${name}.json from server`);
    } catch (e) {
      console.warn(`[content] ${name}.json fetch failed, using fallback`);
      const fallback = (window as unknown as Record<string, unknown>)['CONTENT'] as Record<string, unknown> | undefined;
      base[name] = fallback?.[name] ?? {};
    }
  });

  await Promise.all(fetches);
  contentStore = base as unknown as AllContent;
  return contentStore;
}

export function getContent<K extends ContentKey>(key: K): AllContent[K] {
  if (!contentStore) {
    const fallback = (window as unknown as Record<string, unknown>)['CONTENT'] as Record<string, unknown> | undefined;
    return (fallback?.[key] ?? {}) as AllContent[K];
  }
  return contentStore[key];
}
