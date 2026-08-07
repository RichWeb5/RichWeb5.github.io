'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';
import type { Project } from '@/types/project';
import { useLanguage } from '@/i18n/LanguageProvider';
import { pick } from '@/types/localized';


const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Projects({ day }: { day: boolean; }) {
    const { t, lang } = useLanguage();
    const [visibleCount, setVisibleCount] = useState(4);

    const showMore = () => setVisibleCount((prev) => prev + 4);

    return (
        <section
            id="projects"
            className={`nes-container is-rounded with-title p-6 ${day ? 'bg-gray-200' : 'is-dark'}`}
        >
            <p className="title mb-4">{t('projects.title')}</p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={listVariants}
            >
                <AnimatePresence>
                    {siteConfig.projects.slice(0, visibleCount).map((p: Project) => (
                        <motion.div
                            key={p.name.en}
                            variants={cardVariants}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <div
                                className={`nes-container is-rounded with-title p-4 flex flex-col justify-between ${day ? 'bg-white text-gray-900' : 'is-dark text-gray-100'}`}
                            >
                                <div>
                                    <p className="title mb-2">{pick(p.name, lang)}</p>
                                    <p className="text-xs md:text-sm mb-4">{pick(p.description, lang)}</p>
                                    {p.technologies && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {p.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-xs px-2 py-1 bg-gray-300 rounded text-black"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {p.liveUrl && (
                                        <button
                                            onClick={() => window.open(p.liveUrl, '_blank')}
                                            className="nes-btn is-warning is-small flex-1"
                                        >
                                            {t('projects.viewSite')}
                                        </button>
                                    )}
                                    {p.repoUrl && (
                                        <button
                                            onClick={() => window.open(p.repoUrl, '_blank')}
                                            className="nes-btn is-primary is-small flex-1"
                                        >
                                            {t('projects.viewRepo')}
                                        </button>
                                    )}
                                    {p.playStoreUrl && (
                                        <button
                                            onClick={() => window.open(p.playStoreUrl, '_blank')}
                                            className="nes-btn is-success is-small flex-1"
                                        >
                                            {t('projects.viewApp')}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {visibleCount < siteConfig.projects.length && (
                    <motion.div
                        className="flex justify-center mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            onClick={showMore}
                            className="nes-btn is-primary"
                        >
                            {t('projects.loadMore')}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}