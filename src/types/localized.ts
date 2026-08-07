import type { Language } from '@/i18n/dictionary';

/** A piece of content that exists in both site languages. */
export interface LocalizedText {
    es: string;
    en: string;
}

/** A list of content that exists in both site languages. */
export interface LocalizedList {
    es: string[];
    en: string[];
}

export const pick = (text: LocalizedText, lang: Language): string => text[lang];

export const pickList = (list: LocalizedList, lang: Language): string[] => list[lang];
