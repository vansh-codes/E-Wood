"use client"

import { useState, useEffect } from 'react'

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolledPercentage = (scrolled / totalScroll) * 100;
    setScrollProgress(scrolledPercentage);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-background z-50">
      <div
        className="h-full bg-[#27272a] dark:bg-[#e4e4e7] transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

