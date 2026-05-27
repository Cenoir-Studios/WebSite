import type { AllContent } from './types';
import type { Lang } from './LangContext';

const CONTENT_FILES = ['shared', 'index', 'about', 'team', 'projects', 'news', 'careers', 'timeline'] as const;
type ContentKey = typeof CONTENT_FILES[number];

const langStores: Partial<Record<Lang, AllContent>> = {};

export async function loadAllContent(lang: Lang = 'en'): Promise<AllContent> {
  if (langStores[lang]) return langStores[lang]!;

  const base: Record<string, unknown> = {};

  const fetches = CONTENT_FILES.map(async (name) => {
    try {
      const res = await fetch(`./assets/content/${lang}/${name}.json`);
      if (!res.ok) throw new Error(String(res.status));
      base[name] = await res.json();
      console.log(`[content] loaded ${lang}/${name}.json`);
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
  langStores[lang] = base as unknown as AllContent;
  return langStores[lang]!;
}

let currentLang: Lang = 'en';

export function setCurrentLang(lang: Lang) { currentLang = lang; }

export function getContent<K extends ContentKey>(key: K): AllContent[K] {
  const store = langStores[currentLang];
  if (store) return store[key];
  const fallback = (window as unknown as Record<string, unknown>)['CONTENT'] as Record<string, unknown> | undefined;
  return (fallback?.[key] ?? {}) as AllContent[K];
}

export function clearLangCache(lang: Lang) { delete langStores[lang]; }
