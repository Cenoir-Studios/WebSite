import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Lang = 'en' | 'ua' | 'pl';

const STORAGE_KEY = 'cenoir-lang';
const DEFAULT_LANG: Lang = 'en';

function getStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ua' || stored === 'pl') return stored;
  } catch {}
  return DEFAULT_LANG;
}

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LangContext = createContext<LangContextType>({ lang: DEFAULT_LANG, setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getStoredLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export const LANG_LABELS: Record<Lang, string> = {
  en: 'EN',
  ua: 'UA',
  pl: 'PL',
};

export const LANG_FLAGS: Record<Lang, string> = {
  en: '🇬🇧',
  ua: '🇺🇦',
  pl: '🇵🇱',
};
