import type { LocalizedText } from './localized';

export interface Project {
    /** Localized because some projects are described by what they are rather
     *  than by a brand name. */
    name: LocalizedText;
    description: LocalizedText;
    repoUrl?: string;
    liveUrl?: string;
    playStoreUrl?: string;
    technologies?: string[];
}
