import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useLang } from './LangContext';
import type { AllContent } from './types';

type ContentKey = keyof AllContent;

const CONTENT_FILES: ContentKey[] = ['shared', 'index', 'about', 'team', 'projects', 'news', 'careers', 'timeline'];

async function fetchContent(lang: string): Promise<AllContent> {
  const base: Record<string, unknown> = {};

  const fetches = CONTENT_FILES.map(async (name) => {
    try {
      const res = await fetch(`./assets/content/${lang}/${name}.json`);
      if (!res.ok) throw new Error(String(res.status));
      base[name] = await res.json();
    } catch {
      try {
        const res2 = await fetch(`./assets/content/en/${name}.json`);
        if (res2.ok) { base[name] = await res2.json(); return; }
      } catch {}
      const fallback = (window as unknown as Record<string, unknown>)['CONTENT'] as Record<string, unknown> | undefined;
      base[name] = fallback?.[name] ?? {};
    }
  });

  await Promise.all(fetches);
  return base as unknown as AllContent;
}

const ContentContext = createContext<AllContent | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang();
  const [content, setContent] = useState<AllContent | null>(null);

  useEffect(() => {
    let cancelled = false;
    setContent(null);
    fetchContent(lang).then(data => {
      if (!cancelled) setContent(data);
    });
    return () => { cancelled = true; };
  }, [lang]);

  if (!content) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="loading-spinner" />
    </div>
  );

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent<K extends ContentKey>(key: K): AllContent[K] {
  const ctx = useContext(ContentContext);
  if (ctx) return ctx[key];
  const fallback = (window as unknown as Record<string, unknown>)['CONTENT'] as Record<string, unknown> | undefined;
  return (fallback?.[key] ?? {}) as AllContent[K];
}
