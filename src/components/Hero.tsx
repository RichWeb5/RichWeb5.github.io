'use client'

import { siteConfig } from '@/config/site'
import Image from 'next/image'
import { useLanguage } from '@/i18n/LanguageProvider'
import { pick } from '@/types/localized'

export default function Hero({ day }: { day: boolean }) {
    const { t, lang } = useLanguage()

    return (
        <section className={`nes-container with-title is-rounded bg-gray-200 ${day ? "" : "is-dark"}`
        }>
            <p className="title">{t('hero.title')}</p>
            <div className='flex flex-col items-center gap-3'>
                <Image
                    src="/richard-pixel.png"
                    width={96}
                    height={96}
                    className="pixelated"
                    alt={siteConfig.profile.name}
                />
                <p className="text-center text-xs md:text-sm">{pick(siteConfig.profile.summary, lang)}</p>
            </div>
        </section >
    )
}
