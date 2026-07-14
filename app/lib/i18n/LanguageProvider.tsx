'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { zhTranslations } from './translations';

type Language = 'en' | 'zh';

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const originalTextByNode = new WeakMap<Text, string>();

const translations: Record<string, string> = zhTranslations;

const reverseTranslations: ReadonlyMap<string, string> = new Map(
  Object.entries(zhTranslations).map(([english, chinese]) => [chinese, english]),
);

function shouldSkipNode(node: Node) {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(parent.closest('script, style, noscript, textarea, input, code, pre, [data-i18n-skip]'));
}

function translateTextNode(node: Text, language: Language) {
  if (shouldSkipNode(node)) return;

  const rawText = node.nodeValue ?? '';
  const trimmed = rawText.trim();
  if (!trimmed) return;

  const original = originalTextByNode.get(node) || reverseTranslations.get(trimmed) || trimmed;
  const translated = language === 'zh' ? translations[original] : original;
  if (!translated) return;

  originalTextByNode.set(node, original);
  const nextText = rawText.replace(trimmed, translated);
  if (nextText !== rawText) {
    node.nodeValue = nextText;
  }
}

function applyLanguage(language: Language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode as Text);
  }

  textNodes.forEach((node) => translateTextNode(node, language));
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem('portfolio-language');
    if (storedLanguage === 'zh' || storedLanguage === 'en') {
      setLanguageState(storedLanguage);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('portfolio-language', language);
    applyLanguage(language);

    const observer = new MutationObserver(() => {
      applyLanguage(language);
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      toggleLanguage: () => setLanguageState((current) => (current === 'en' ? 'zh' : 'en')),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return value;
}
