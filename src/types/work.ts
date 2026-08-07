import type { LocalizedList, LocalizedText } from './localized';

export interface Work {
    company: string;
    position: LocalizedText;
    location: LocalizedText;
    startDate: string;
    /** Empty string means the role is still current. */
    endDate: string;
    summary: LocalizedText;
    highlights: LocalizedList;
}
