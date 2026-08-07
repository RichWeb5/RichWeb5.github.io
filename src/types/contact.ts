import type { LocalizedText } from './localized';

export interface Contact {
    email: string;
    phone: string | null;
    location: LocalizedText;
    website: string | null;
    /** GitHub username, not a URL — also drives the contribution calendar. */
    github: string;
    linkedin: string | null;
    medium: string | null;
    blog: string | null;
}
