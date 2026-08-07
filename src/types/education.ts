import type { LocalizedText } from './localized';

export interface Education {
    school: string;
    degree: LocalizedText;
    location: LocalizedText;
    startYear: string;
    endYear: string;
}
