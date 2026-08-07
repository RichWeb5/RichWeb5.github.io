'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortalOverlay from './PortalOverlay';
import Banner from './Banner';
import { FaRegCopyright } from 'react-icons/fa';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function MinecraftLayout({ children, setDayOrNight }: { children: React.ReactNode, setDayOrNight: any }) {
    const [day, setDay] = useState(true);
    const [isEntered, setIsEntered] = useState(false);
    const { t } = useLanguage();

    const cloudCount = 10;
    const clouds = Array.from({ length: cloudCount }, () => ({
        top: `${Math.random() * 30 + 2}vh`,
        duration: 30 + Math.random() * 50,
        delay: Math.random() * 10
    }));

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
                {day ? (
                    <div className="absolute top-0 left-0 w-full h-120 overflow-hidden pointer-events-none">
                        {clouds.map((cloud, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-40 h-18 bg-white opacity-80 rounded-full shadow-md z-10"
                                style={{ top: cloud.top, left: '-200px' }}
                                animate={{ left: '110vw' }}
                                transition={{
                                    duration: cloud.duration,
                                    ease: 'linear',
                                    repeat: Infinity,
                                    delay: cloud.delay,
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="absolute top-0 left-0 w-full h-120 z-10 overflow-hidden pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {[...Array(90)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-white rounded-full"
                                initial={{ opacity: 0.5 }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                            />
                        ))}
                    </motion.div>
                )}
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