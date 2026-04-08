'use client';

import { useState, useEffect } from 'react';

interface Props {
  onStartClick: () => void;
  startMenuOpen: boolean;
  terminalOpen: boolean;
  onTerminalClick: () => void;
}

export default function Taskbar({ onStartClick, startMenuOpen, terminalOpen, onTerminalClick }: Props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const dateStr = time.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

  return (
    <div className="taskbar no-select">
      {/* Start button */}
      <div
        className={`taskbar-start ${startMenuOpen ? 'active' : ''}`}
        onClick={onStartClick}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#4cc2ff">
          <path d="M0 3.5L9.8 2.1V11.4H0V3.5ZM11 1.9L24 0V11.4H11V1.9ZM0 12.6H9.8V21.9L0 20.5V12.6ZM11 12.6H24V24L11 22.1V12.6Z" />
        </svg>
      </div>

      {/* Search bar */}
      <div className="taskbar-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span>Type here to search</span>
      </div>

      {/* Pinned apps */}
      <div className="taskbar-pinned">
        {/* File Explorer */}
        <div className="taskbar-pin" title="File Explorer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#f0c040">
            <path d="M4 6h6l2 2h8v12H4V6z" />
          </svg>
        </div>

        {/* Terminal - indicates if open */}
        <div
          className={`taskbar-pin ${terminalOpen ? 'has-indicator' : ''}`}
          onClick={onTerminalClick}
          title="Terminal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="3" width="20" height="18" rx="2" fill="#1a1a2e" stroke="#4cc2ff" strokeWidth="1" />
            <path d="M6 9l4 3-4 3" stroke="#4cc2ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Chrome */}
        <div className="taskbar-pin" title="Browser">
          <img src="https://www.google.com/chrome/static/images/chrome-logo-m100.svg" alt="Chrome" width="20" height="20" />
        </div>
      </div>

      {/* System tray */}
      <div className="taskbar-tray">
        {/* Chevron up */}
        <div className="tray-icon">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
        </div>

        {/* WiFi */}
        <div className="tray-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
        </div>

        {/* Volume */}
        <div className="tray-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
        </div>

        {/* Clock */}
        <div className="tray-clock">
          <div>{timeStr}</div>
          <div>{dateStr}</div>
        </div>
      </div>
    </div>
  );
}
