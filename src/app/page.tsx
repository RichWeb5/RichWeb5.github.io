'use client';

import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import MinecraftLayout from '@/components/MinecraftLayout';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHub } from '@/components/GitHub';
import WorkExprience from '@/components/WorkExprience';
import Education from '@/components/Education';

export default function Home() {
  const [day, setDay] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowButton(window.scrollY > 0); // Show button as soon as the user starts scrolling
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function topFunction() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <MinecraftLayout setDayOrNight={setDay}>
      <div className="container mx-auto flex flex-col flex-grow w-full p-2 pt-24 md:pt-28 gap-6 md:gap-8">
        <Hero day={day} />
        <WorkExprience day={day} />
        <Projects day={day} />
        <Skills day={day} />
        <GitHub day={day} />
        <Education day={day} />
        <Contact day={day} />
      </div>
      <button
        type="button"
        onClick={topFunction}
        id="topButton"
        className="nes-btn is-error"
        style={{
          display: showButton ? 'block' : 'none',
          position: 'fixed',
          bottom: '60px',
          right: '30px',
          zIndex: 9999,
          pointerEvents: 'auto',
        }}
      >
        ^
      </button>
    </MinecraftLayout>
  );
}
