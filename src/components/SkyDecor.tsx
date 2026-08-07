'use client';

import { motion } from 'framer-motion';

/**
 * The sky band is the first 60% of the world gradient (see .minecraft-world.day
 * in globals.css), so clouds and stars are laid out against that same fraction
 * rather than a fixed pixel height.
 */
const SKY_BAND = '60%';

/**
 * Positions are derived from the item index instead of Math.random() so the
 * server and client render the same markup — random values would differ
 * between the two and trip a hydration mismatch, and would also reshuffle
 * every time the day/night or language state changes.
 */
const spread = (i: number, seed: number, min: number, max: number) => {
    // Scale the sine far past 1 before taking the fractional part. Without the
    // large multiplier consecutive indices stay correlated and the stars line
    // up along the sine wave instead of scattering.
    const noisy = Math.sin((i + 1) * seed) * 43758.5453;
    const fraction = noisy - Math.floor(noisy);
    return min + fraction * (max - min);
};

const CLOUD_COUNT = 14;
const STAR_COUNT = 140;

/** A blocky cloud built from three stacked bars — no border radius, so it
 *  keeps the 8-bit look instead of reading as a soft ellipse. */
function PixelCloud({ unit }: { unit: number }) {
    const bar = 'absolute bg-white';
    return (
        <div className="relative" style={{ width: unit * 9, height: unit * 3 }}>
            <div className={bar} style={{ left: unit * 3, top: 0, width: unit * 3, height: unit }} />
            <div className={bar} style={{ left: unit * 1, top: unit, width: unit * 7, height: unit }} />
            <div className={bar} style={{ left: 0, top: unit * 2, width: unit * 9, height: unit }} />
            {/* Two extra puffs break the symmetry so the silhouette reads as a cloud. */}
            <div className={bar} style={{ left: unit * 6, top: unit, width: unit * 2, height: unit }} />
            <div className={bar} style={{ left: unit * 2, top: 0, width: unit, height: unit }} />
        </div>
    );
}

const BIRD_COUNT = 3;

/** A blocky bird whose two wings beat out of phase with each other, so the
 *  silhouette alternates between a rising and a falling V. */
function PixelBird({ unit }: { unit: number }) {
    const block = 'absolute bg-gray-800';
    const flap = {
        duration: 0.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
    };

    return (
        <div className="relative" style={{ width: unit * 7, height: unit * 5 }}>
            {/* Body */}
            <div className={block} style={{ left: unit * 3, top: unit * 2, width: unit, height: unit }} />

            {/* Left wing: up, then down */}
            <motion.div
                className={block}
                style={{ left: unit, width: unit * 2, height: unit }}
                animate={{ top: [unit, unit * 3, unit] }}
                transition={flap}
            />
            <motion.div
                className={block}
                style={{ left: 0, width: unit, height: unit }}
                animate={{ top: [0, unit * 3.6, 0] }}
                transition={flap}
            />

            {/* Right wing mirrors the left */}
            <motion.div
                className={block}
                style={{ left: unit * 4, width: unit * 2, height: unit }}
                animate={{ top: [unit, unit * 3, unit] }}
                transition={flap}
            />
            <motion.div
                className={block}
                style={{ left: unit * 6, width: unit, height: unit }}
                animate={{ top: [0, unit * 3.6, 0] }}
                transition={flap}
            />
        </div>
    );
}

function Birds() {
    return (
        <>
            {Array.from({ length: BIRD_COUNT }, (_, i) => {
                const top = spread(i, 21.317, 8, 55);
                const unit = Math.round(spread(i, 61.803, 3, 6));
                const duration = spread(i, 17.451, 22, 38);
                const delay = -spread(i, 55.219, 0, 30);

                return (
                    <motion.div
                        key={`bird-${i}`}
                        className="absolute"
                        style={{ top: `${top}%`, left: '-120px' }}
                        animate={{ left: '110vw' }}
                        transition={{ duration, ease: 'linear', repeat: Infinity, delay }}
                    >
                        <PixelBird unit={unit} />
                    </motion.div>
                );
            })}
        </>
    );
}

export function Clouds() {
    return (
        <div
            className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-10"
            style={{ height: SKY_BAND }}
        >
            {Array.from({ length: CLOUD_COUNT }, (_, i) => {
                const top = spread(i, 12.9898, 2, 92);
                const unit = Math.round(spread(i, 45.164, 7, 16));
                const duration = spread(i, 78.233, 45, 110);
                const delay = -spread(i, 33.117, 0, 60);

                return (
                    <motion.div
                        key={i}
                        className="absolute opacity-90"
                        style={{ top: `${top}%`, left: '-300px' }}
                        animate={{ left: '110vw' }}
                        transition={{ duration, ease: 'linear', repeat: Infinity, delay }}
                    >
                        <PixelCloud unit={unit} />
                    </motion.div>
                );
            })}
            <Birds />
        </div>
    );
}

export function Stars() {
    return (
        <motion.div
            className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-10"
            style={{ height: SKY_BAND }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {Array.from({ length: STAR_COUNT }, (_, i) => {
                const top = spread(i, 12.9898, 0, 99);
                const left = spread(i, 78.233, 0, 99);
                const size = spread(i, 45.164, 2, 5);
                const duration = spread(i, 33.117, 1.6, 4.2);
                const delay = spread(i, 91.873, 0, 3);

                return (
                    <motion.div
                        key={i}
                        className="absolute bg-white"
                        style={{ top: `${top}%`, left: `${left}%`, width: size, height: size }}
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
                    />
                );
            })}
        </motion.div>
    );
}
