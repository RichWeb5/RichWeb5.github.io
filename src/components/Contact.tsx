'use client';

import { siteConfig } from "@/config/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pick } from "@/types/localized";

export default function Contact({ day }: { day: boolean }) {
    const { t, lang } = useLanguage();

    return (
        <section id="contact" className={`nes-container is-rounded bg-gray-200 with-title  ${day ? "" : "is-dark"}`}>
            <p className="title">{t('contact.title')}</p>
            <p className="text-xs md:text-lg">
                {t('contact.emailMeAt')} <a href={`mailto:${siteConfig.email}`} className="nes-text is-primary">{siteConfig.email}</a>
            </p>
            <p className="text-xs md:text-lg mt-2">
                {t('contact.basedIn')} {pick(siteConfig.contact.location, lang)}
            </p>
        </section>
    )
}
