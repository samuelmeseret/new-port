'use client';

import { useState, useCallback } from 'react';
import DesktopIcons from './DesktopIcons';
import Terminal from './Terminal';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';

export default function Desktop({ onSignOut }: { onSignOut: () => void }) {
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [externalCommand, setExternalCommand] = useState<string | null>(null);

  const handleIconCommand = useCallback((command: string) => {
    setTerminalOpen(true);
    setTerminalMinimized(false);
    setExternalCommand(command);
  }, []);

  const handleTerminalOpen = useCallback(() => {
    setTerminalOpen(true);
    setTerminalMinimized(false);
  }, []);

  const handleExternalCommandHandled = useCallback(() => {
    setExternalCommand(null);
  }, []);

  const toggleStartMenu = () => setStartMenuOpen(prev => !prev);

  const handleTaskbarTerminalClick = () => {
    if (!terminalOpen) {
      setTerminalOpen(true);
      setTerminalMinimized(false);
    } else if (terminalMinimized) {
      setTerminalMinimized(false);
    } else {
      setTerminalMinimized(true);
    }
  };

  return (
    <div className="fixed inset-0 desktop-enter" onClick={() => startMenuOpen && setStartMenuOpen(false)}>
      <div className="wallpaper" />

      <DesktopIcons
        onDoubleClick={handleIconCommand}
        onTerminalOpen={handleTerminalOpen}
      />

      <Terminal
        isOpen={terminalOpen}
        isMinimized={terminalMinimized}
        onClose={() => setTerminalOpen(false)}
        onMinimize={() => setTerminalMinimized(true)}
        externalCommand={externalCommand}
        onExternalCommandHandled={handleExternalCommandHandled}
      />

      <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} onSignOut={onSignOut} />

      <Taskbar
        onStartClick={toggleStartMenu}
        startMenuOpen={startMenuOpen}
        terminalOpen={terminalOpen}
        onTerminalClick={handleTaskbarTerminalClick}
      />
    </div>
  );
}
