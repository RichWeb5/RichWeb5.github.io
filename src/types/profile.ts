import type { LocalizedText } from './localized';

export interface Profile {
    name: string;
    title: LocalizedText;
    tagline: LocalizedText;
    summary: LocalizedText;
}
