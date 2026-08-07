'use client';

import { siteConfig } from "@/config/site";
import { GitHubCalendar } from "react-github-calendar";
import { useLanguage } from "@/i18n/LanguageProvider";

export const GitHub = ({ day }: { day: boolean }) => {
    const { t } = useLanguage();

    return (
        <section id="github" className={`nes-container is-rounded bg-gray-200 with-title  ${day ? "" : "is-dark"}`}>
            <p className="title"> {t('github.title.before')}<span className="font-bold">{t('github.title.code')}</span></p>
            <GitHubCalendar
                username={siteConfig.contact.github}
                blockSize={20}
                blockMargin={7}
                fontSize={25}
                showTotalCount={false}
                theme={{
                    light: ['white', 'black'],
                    dark: ['gray', 'rgb(214, 16, 174)']
                }}
                colorScheme={day ? "light" : "dark"}
            />
        </section>
    );
};