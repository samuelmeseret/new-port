'use client';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

const TILES = [
  {
    label: 'GitHub',
    color: 'var(--tile-github)',
    url: 'https://github.com/samuelmeseret',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    color: 'var(--tile-linkedin)',
    url: 'https://linkedin.com/in/samuelmeseret',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  
  {
    label: 'Email',
    color: 'var(--tile-email)',
    url: 'mailto:samuel.meseret2016@gmail.com',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
];

export default function StartMenu({ isOpen, onClose, onSignOut }: Props) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[44]" onClick={onClose} />

      <div className="start-menu">
        {/* Left sidebar */}
        <div className="start-sidebar">
         

          {/* Profile photo */}
          <div className="start-sidebar-icon">
            <img src="/sam-profile.jpeg" alt="Samuel Meseret" className="w-8 h-8 rounded-full object-cover" />
          </div>

          <div className="mt-auto flex flex-col gap-1">
            {/* Sign out */}
            <div className="start-sidebar-icon" onClick={onSignOut}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>

            {/* Power */}
            <div className="start-sidebar-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="start-main">
          {/* Header */}
          <div className="start-menu-header">
            <div className="start-menu-user">
              <h3>Samuel Meseret</h3>
              <p>Pinned</p>
            </div>
          </div>

          {/* Tiles */}
          <div className="start-menu-tiles">
            <div className="tile-grid">
              {TILES.map(tile => (
                <a
                  key={tile.label}
                  href={tile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tile"
                  style={{ background: tile.color }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="tile-icon">{tile.icon}</div>
                  <span className="tile-label">{tile.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
