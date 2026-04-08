'use client';

import { useState, useEffect, useCallback } from 'react';

const ASCII_ART = `  ____                            _
 / ___|  __ _ _ __ ___  _   _  ___| |
 \\___ \\ / _\` | '_ \` _ \\| | | |/ _ \\ |
  ___) | (_| | | | | | | |_| |  __/ |
 |____/ \\__,_|_| |_| |_|\\__,_|\\___|_|`;

const BIOS_HEADER = [
  '',
  'Samuel BIOS v1.0.4 (C) 2024-2026',
  'Memory Test: 32768MB OK',
  'GPU: Terminal Graphics Adapter READY',
  '',
];

const BOOT_LINES = [
  '[ OK ] Checking Storage',
  '[ OK ] Checking Storage',
  '[ OK ] Loading Kernel',
  '[ OK ] Mounting /dev/portfolio',
  '[ OK ] Initializing Desktop Services',
  '[ OK ] Loading Theme Engine',
  '[ OK ] Starting PowerShell Session',
  '[ OK ] Starting PowerShell Session',
  '[ OK ] Syncing Portfolio Metadata',
  '[ OK ] Searching for User Profiles',
  '[ OK ] Verifying Session Integrity',
  '[ OK ] Warming Wallpaper Cache',
  '[ OK ] Warming Wallpaper Cache',
];

const BOOT_FOOTER = [
  'boot@samuel: initializing user shell...',
  'boot@samuel: launching desktop environment...',
  'Starting session...',
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<'ascii' | 'header' | 'boot' | 'footer' | 'done'>('ascii');
  const [fadeOut, setFadeOut] = useState(false);

  const finishBoot = useCallback(() => {
    setFadeOut(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    // Phase 1: ASCII art (instant)
    setLines([ASCII_ART]);
    const headerTimer = setTimeout(() => setPhase('header'), 400);
    return () => clearTimeout(headerTimer);
  }, []);

  useEffect(() => {
    if (phase === 'header') {
      let i = 0;
      const interval = setInterval(() => {
        if (i < BIOS_HEADER.length) {
          setLines(prev => [...prev, BIOS_HEADER[i]]);
          i++;
        } else {
          clearInterval(interval);
          setPhase('boot');
        }
      }, 120);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'boot') {
      let i = 0;
      const interval = setInterval(() => {
        if (i < BOOT_LINES.length) {
          setLines(prev => [...prev, BOOT_LINES[i]]);
          i++;
        } else {
          clearInterval(interval);
          setPhase('footer');
        }
      }, 90);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'footer') {
      let i = 0;
      const interval = setInterval(() => {
        if (i < BOOT_FOOTER.length) {
          setLines(prev => [...prev, BOOT_FOOTER[i]]);
          i++;
        } else {
          clearInterval(interval);
          setPhase('done');
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'done') {
      const t = setTimeout(finishBoot, 800);
      return () => clearTimeout(t);
    }
  }, [phase, finishBoot]);

  return (
    <div className={`boot-screen font-mono ${fadeOut ? 'boot-fade-out' : ''}`}>
      {lines.map((line, i) => (
        <div
          key={i}
          className="boot-line text-[14px] text-[#c8c8c8] leading-[1.5]"
          style={{ animationDelay: `${i * 0.01}s`, whiteSpace: 'pre' }}
        >
          {line}
        </div>
      ))}
      {phase !== 'done' && (
        <div className="mt-4 text-[13px] text-[#888]">
          <span className="boot-cursor" /> booting...
        </div>
      )}
    </div>
  );
}
