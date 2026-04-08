'use client';

import { useState } from 'react';

interface DesktopIconDef {
  id: string;
  label: string;
  command?: string;
  icon: React.ReactNode;
}

const FolderIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    <path d="M6 12h14l4 4h18v24H6V12z" fill="#f0c040" />
    <path d="M6 16h36v24H6V16z" fill="#f5d060" />
    <path d="M6 16h36v4H6V16z" fill="#e8b830" opacity="0.5" />
  </svg>
);

const TerminalIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="6" width="40" height="36" rx="4" fill="#1a1a2e" stroke="#4cc2ff" strokeWidth="1.5" />
    <path d="M12 18l8 6-8 6" stroke="#4cc2ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="24" y1="30" x2="36" y2="30" stroke="#4cc2ff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const RecycleBinIcon = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    <path d="M14 16h20v24H14V16z" fill="#8ba4b8" />
    <path d="M12 12h24v4H12v-4z" fill="#9ab5c8" />
    <path d="M20 10h8v2h-8v-2z" fill="#9ab5c8" />
    <line x1="20" y1="20" x2="20" y2="36" stroke="#6a8090" strokeWidth="1.5" />
    <line x1="24" y1="20" x2="24" y2="36" stroke="#6a8090" strokeWidth="1.5" />
    <line x1="28" y1="20" x2="28" y2="36" stroke="#6a8090" strokeWidth="1.5" />
  </svg>
);

const ICONS: DesktopIconDef[] = [
  { id: 'about', label: 'About\nMe', command: 'about', icon: <FolderIcon /> },
  { id: 'projects', label: 'Projects', command: 'projects', icon: <FolderIcon /> },
  { id: 'experience', label: 'Experience', command: 'experience', icon: <FolderIcon /> },
  { id: 'terminal', label: 'Terminal', icon: <TerminalIcon /> },
  { id: 'contact', label: 'Contact', command: 'contact', icon: <FolderIcon /> },
  { id: 'recycle', label: 'Recycle\nBin', icon: <RecycleBinIcon /> },
];

interface Props {
  onDoubleClick: (command: string) => void;
  onTerminalOpen: () => void;
}

export default function DesktopIcons({ onDoubleClick, onTerminalOpen }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleDoubleClick = (icon: DesktopIconDef) => {
    if (icon.id === 'terminal') {
      onTerminalOpen();
    } else if (icon.command) {
      onDoubleClick(icon.command);
    }
  };

  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
      {ICONS.map(icon => (
        <div
          key={icon.id}
          className={`desktop-icon no-select ${selected === icon.id ? 'selected' : ''}`}
          onClick={() => setSelected(icon.id)}
          onDoubleClick={() => handleDoubleClick(icon)}
        >
          <div className="icon-box">{icon.icon}</div>
          <span className="icon-label" style={{ whiteSpace: 'pre-line' }}>{icon.label}</span>
        </div>
      ))}
    </div>
  );
}
