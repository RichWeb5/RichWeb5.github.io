'use client';

import { siteConfig } from '@/config/site';
import { useLanguage } from '@/i18n/LanguageProvider';
import { pick } from '@/types/localized';

export default function Education({ day }: { day: boolean }) {
    const { t, lang } = useLanguage();

    return (
        <section id="education" className={`nes-container with-title is-rounded p-6 ${day ? 'bg-gray-200' : 'is-dark'}`}>
            <p className="title mb-4">{t('education.title')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
                {siteConfig.education.map((item) => (
                    <div
                        key={item.school}
                        className={`nes-container is-rounded p-4 ${day ? 'bg-white text-gray-900' : 'is-dark text-gray-100'}`}
                    >
                        <h3 className="font-bold text-sm md:text-lg">{pick(item.degree, lang)}</h3>
                        <p className="text-xs md:text-sm mt-2">{item.school}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            {item.startYear} &mdash; {item.endYear} &middot; {pick(item.location, lang)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
