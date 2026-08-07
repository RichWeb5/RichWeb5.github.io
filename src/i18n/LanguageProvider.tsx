'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { dictionary, type Language, type TranslationKey } from './dictionary';

const STORAGE_KEY = 'portfolio-lang';

type LanguageContextValue = {
    lang: Language;
    setLang: (lang: Language) => void;
    toggleLang: () => void;
    t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Server and first client render must agree, so start from a fixed default
    // and adopt the stored/browser preference once mounted.
    const [lang, setLangState] = useState<Language>('es');

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'es' || stored === 'en') {
            setLangState(stored);
            return;
        }
        setLangState(navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en');
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = (next: Language) => {
        setLangState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
    };

    const toggleLang = () => setLang(lang === 'es' ? 'en' : 'es');

    const t = (key: TranslationKey) => dictionary[lang][key];

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used inside a LanguageProvider');
    return ctx;
}
