'use client';

import React, { useState } from "react";
import { loadIcon } from "../helpers/iconLoader";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { pick } from "@/types/localized";
import type { Skill } from "@/types/skill";

const VISIBLE_LIMIT = 6;

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Skills = ({ day }: { day: boolean }) => (
    <div className="flex flex-col gap-4">
        {siteConfig.skills.map((skillGroup) => (
            <SkillGroup key={skillGroup.title.en} group={skillGroup} day={day} />
        ))}
    </div>
);

function SkillGroup({ group, day }: { group: Skill; day: boolean }) {
    // Each group tracks its own expansion so one "show more" does not expand the rest.
    const [showAll, setShowAll] = useState(false);
    const { t, lang } = useLanguage();

    const visible = showAll ? group.skills : group.skills.slice(0, VISIBLE_LIMIT);

    return (
        <div className={`nes-container with-title is-rounded bg-gray-200 ${day ? "" : "is-dark"}`}>
            <p className="title">{pick(group.title, lang)}</p>
            <motion.div
                className="flex flex-wrap justify-center gap-4 sm:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {visible.map((skill) => {
                    const IconComponent = loadIcon(skill.library, skill.icon);
                    return (
                        <motion.div
                            key={skill.name}
                            title={skill.name}
                            className={`relative group border rounded-lg p-6 sm:p-8 text-center flex-shrink-0 transition-transform transform hover:scale-110 ${day
                                ? "border-gray-300 bg-white text-black"
                                : "border-gray-700 bg-gray-800 text-white"
                                }`}
                            style={{ width: "45%", maxWidth: "150px" }}
                            variants={itemVariants}
                            whileHover={{ scale: 1.1 }}
                        >
                            {IconComponent && React.createElement(IconComponent, { className: "w-12 h-12 sm:w-20 sm:h-20 mx-auto" })}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                                {skill.name}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
            {group.skills.length > VISIBLE_LIMIT && (
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={() => setShowAll((prev) => !prev)}
                        className={`nes-btn ${showAll ? "is-error" : "is-primary"}`}
                    >
                        {showAll ? t('skills.showLess') : t('skills.showMore')}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Skills;
