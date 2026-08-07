import type { LocalizedText } from './localized';

export interface Project {
    name: string;
    description: LocalizedText;
    repoUrl?: string;
    liveUrl?: string;
    playStoreUrl?: string;
    technologies?: string[];
}
