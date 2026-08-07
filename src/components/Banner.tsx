'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';
import ToggleDayNight from './ToggleDayNight';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { CgGitFork } from 'react-icons/cg';
import { AiFillStar } from 'react-icons/ai';
import { ImBlog } from 'react-icons/im';
import { TbBrandGithub, TbBrandLinkedin, TbBrandMedium } from 'react-icons/tb';
import { useLanguage } from '@/i18n/LanguageProvider';
import { pick } from '@/types/localized';

export default function Banner({ day, toggleDayNight }: { day: boolean; toggleDayNight: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const { t, lang, toggleLang } = useLanguage();

    const links = [
        { id: 'work', label: t('nav.work') },
        { id: 'projects', label: t('nav.projects') },
        { id: 'education', label: t('nav.education') },
        { id: 'contact', label: t('nav.contact') },
    ];

    const langButton = (
        <button
            type="button"
            onClick={toggleLang}
            aria-label={t('lang.label')}
            title={t('lang.label')}
            className="bg-gray-700 px-2 py-1 rounded text-white text-xs hover:bg-gray-600 transition duration-300 shadow-md"
        >
            {t('lang.switchTo')}
        </button>
    );

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault(); // Prevent default anchor behavior
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const socialComponent = () => {
        return (
            <div className="flex gap-2 items-center">
                <a href={`https://www.github.com/${siteConfig.contact.github}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <TbBrandGithub />
                </a>
                {siteConfig.contact.medium && (
                    <a href={siteConfig.contact.medium}
                        target="_blank"
                        rel="noopener noreferrer">
                        <TbBrandMedium />
                    </a>
                )}
                {siteConfig.contact.linkedin && (
                    <a href={siteConfig.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer">
                        <TbBrandLinkedin />
                    </a>
                )}
            </div>
        );
    };

    // w-full rather than w-screen: 100vw includes the vertical scrollbar, which
    // made the bar wider than the viewport and scrolled the whole page sideways.
    return (
        <div
            className={`w-full ${isOpen ? 'p-2 h-auto text-4xl' : 'p-3 h-17 text-2xl'
                } px-4 md:px-6 bg-gray-800 bg-opacity-90 text-white flex flex-col md:flex-row justify-between items-center fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b-2 border-gray-500`}
        >
            <div className="flex justify-between items-center w-full md:w-auto">
                <div className="content-start">
                    <div className="flex flex-col">
                        <span className="font-extrabold text-sm md:text-lg">{siteConfig.profile.name}</span>
                        <i className="font-bold text-[6px] md:text-sm">{pick(siteConfig.profile.tagline, lang)}</i>
                    </div>
                </div>
                <div className="content-end flex gap-2 items-center md:hidden">
                    {langButton}
                    <ToggleDayNight day={day} toggle={toggleDayNight} />
                    <button
                        className="bg-gray-700 p-2 rounded text-white hover:bg-gray-600 transition duration-300 shadow-md"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <IoMdClose className="image-rendering-pixelated" /> : <GiHamburgerMenu className="image-rendering-pixelated" />}
                    </button>
                </div>
            </div>
            <div
                className={`${isOpen ? 'translate-x-0 visible' : '-translate-x-full invisible'
                    } transition-transform duration-500 ease-in-out flex flex-col gap-4 items-center bg-gray-800 w-full md:hidden`}
            >
                {links.map((link) => (
                    <a
                        key={link.id}
                        href={`#${link.id}`}
                        className="text-white text-xs"
                        onClick={(e) => handleLinkClick(e, link.id)}
                    >
                        {link.label}
                    </a>
                ))}
                <a
                    href={`https://www.github.com/${siteConfig.contact.github}/portfolio`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="flex gap-2 items-center">
                        <CgGitFork />
                        <span className="text-sm">{t('nav.source')}</span>
                    </div>
                </a>
                {siteConfig.contact.blog && (
                    <a
                        href={siteConfig.contact.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="flex gap-2 items-center">
                            <ImBlog />
                            <span className="text-sm">{t('nav.blog')}</span>
                        </div>
                    </a>
                )}
                {socialComponent()}
            </div>
            <div className="hidden md:flex gap-2 items-center">
                <div className="flex gap-2 items-center">
                    {links.map((link) => (
                        <a
                            key={link.id}
                            href={`#${link.id}`}
                            className="text-white text-xs"
                            onClick={(e) => handleLinkClick(e, link.id)}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                {socialComponent()}

                {siteConfig.contact.blog && (
                    <a
                        href={siteConfig.contact.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ImBlog />
                    </a>
                )}
                <a
                    href={`https://www.github.com/${siteConfig.contact.github}/portfolio`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <CgGitFork />
                </a>
                {langButton}
                <ToggleDayNight day={day} toggle={toggleDayNight} />
            </div>
        </div>
    );
}
