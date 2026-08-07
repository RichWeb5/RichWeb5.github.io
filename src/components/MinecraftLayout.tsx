'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortalOverlay from './PortalOverlay';
import Banner from './Banner';
import { FaRegCopyright } from 'react-icons/fa';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Clouds, Stars } from './SkyDecor';

export default function MinecraftLayout({ children, setDayOrNight }: { children: React.ReactNode, setDayOrNight: any }) {
    const [day, setDay] = useState(true);
    const [isEntered, setIsEntered] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const hour = new Date().getHours();
        setDay(hour >= 6 && hour < 18);
        document.documentElement.classList.toggle('dark', !(hour >= 6 && hour < 18));
    }, []);

    const toggleDayNight = () => {
        setDay(prev => {
            const newDay = !prev;
            document.documentElement.classList.toggle('dark', !newDay);
            return newDay;
        });
    };

    useEffect(() => {
        setDayOrNight(day);
    }, [day, setDayOrNight]);

    return (
        <motion.div
            className={`minecraft-world ${day ? 'day' : 'night'} relative min-h-screen flex flex-col overflow-hidden z-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            {isEntered && <Banner day={day} toggleDayNight={toggleDayNight} />}
            <AnimatePresence>
                {day ? <Clouds key="clouds" /> : <Stars key="stars" />}
            </AnimatePresence>
            {!isEntered && (
                <div className="border-none">
                    <PortalOverlay
                        day={day}
                        onEnter={() => {
                            setIsEntered(true);
                        }}
                    />
                </div>
            )}
            {isEntered && (
                <div className="relative z-20 pt-8">{children}</div>
            )}
            {isEntered && (
                <footer className="p-4 text-white z-20 relative">
                    <div className="flex justify-between">
                        <span className="flex gap-2 items-center text-[6px] md:text-sm"><FaRegCopyright /> <i className="font-bold">{siteConfig.name}</i> {new Date().getFullYear()}</span>
                        <span className="flex gap-3">
                            <span className="text-[6px] md:text-sm">{day ? '☀️' : '🌙'}</span>
                            <span className="text-[6px] md:text-sm">{day ? t('footer.day') : t('footer.night')}</span>
                        </span>
                    </div>
                </footer>
            )}
        </motion.div>
    );
}