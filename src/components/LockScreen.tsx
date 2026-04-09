'use client';

import { useState, useEffect } from 'react';

export default function LockScreen({ onLogin }: { onLogin: () => void }) {
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/new-backgroud.jpg';
    img.onload = () => setReady(true);
    img.onerror = () => setReady(true); // show UI anyway if image fails
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(onLogin, 1500);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className={`lock-screen ${ready ? 'lock-fade-in' : ''}`} style={{ opacity: ready ? undefined : 0 }}>
      <div className="wallpaper" />

      {/* Center profile */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="profile-ring">
          <img src="/sam-profile.jpeg" alt="Samuel Meseret" className="w-full h-full rounded-full object-cover" />
        </div>
        <h2 className="text-4xl font-semibold text-white tracking-wide font-mono">
          Samuel Meseret
        </h2>
        {loading ? (
          <div className="flex flex-col items-center gap-3 mt-2">
            <svg className="login-spinner" width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <circle cx="16" cy="16" r="13" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeDasharray="60 22" />
            </svg>
            <span className="text-sm text-white/70 font-mono tracking-wide">Logging in...</span>
          </div>
        ) : (
          <button onClick={handleLogin} className="login-btn px-10 py-2.5 rounded-md text-sm text-white/90 font-medium tracking-wide flex items-center gap-2">
            Login
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          </button>
        )}
      </div>

      {/* Bottom-left clock */}
      <div className="absolute bottom-12 left-12 z-10">
        <div className="lock-clock text-[80px] font-extralight text-white leading-none font-mono">
          {formatTime(time)}
        </div>
        <div className="lock-date text-[17px] text-white/80 mt-2 font-mono">
          {formatDate(time)}
        </div>
      </div>

      {/* Bottom-right tray */}
      <div className="absolute bottom-10 right-10 z-10 flex items-center gap-5">
        {/* WiFi */}
        <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
        {/* Accessibility */}
        <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
        </svg>
        {/* Power */}
        <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
        </svg>
      </div>
    </div>
  );
}
