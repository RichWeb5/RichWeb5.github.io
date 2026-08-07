import type { LocalizedText } from './localized';

export interface SkillItem {
    name: string;
    icon: string;
    library: string;
}

export interface Skill {
    title: LocalizedText;
    skills: SkillItem[];
}
