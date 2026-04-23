'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type Line = { type: 'output' | 'command'; content: string };

const PROMPT = 'C:\\Users\\samuel> ';

const COMMANDS = ['help', 'about', 'projects', 'experience', 'skills', 'contact', 'whoami', 'date', 'clear'];

function getCommandOutput(cmd: string): string | null {
  const trimmed = cmd.trim().toLowerCase();

  switch (trimmed) {
    case 'help':
      return `
Available commands:
  help       - Show this help message
  about      - Learn about me
  projects   - Browse my projects
  experience - View experience
  skills     - View my skills
  contact    - Get my contact information
  whoami     - Display current user
  date       - Show current date and time
  clear      - Clear the terminal`;

    case 'about':
      return `
╔════════════════════════════════════════╗
║          Samuel Meseret                ║
║       Full-Stack Developer             ║
╚════════════════════════════════════════╝

  Passionate developer building beautiful,
  functional web experiences.

  Currently focused on:
  → React & Next.js
  → TypeScript & Node.js
  → UI/UX Design
  → Cloud Architecture

  "Code is poetry written in logic."`;

    case 'projects':
      return `
  MY PROJECTS
  ===========

  [01] canvas                                  (TypeScript)
       Real-time collaborative whiteboard built with
       Next.js, Liveblocks, Tldraw, and Convex.
       github.com/samuelmeseret/canvas

  [02] memsearch                               (TypeScript)
       AI-powered semantic search for macOS — index
       local files and iCloud Photos, search with
       natural language.
       github.com/samuelmeseret/memsearch

  [03] gpt-zero-version-history-bypasser       (Python)
       A Python application that simulates realistic
       human typing with AI-generated text variations.
       github.com/samuelmeseret/gpt-zero-version-history-bypasser

  [04] custom-wordle                           (JavaScript)
       A custom Wordle puzzle creator and player.
       github.com/samuelmeseret/custom-wordle`;

    case 'experience':
      return `
  EXPERIENCE
  ==========

  * Full-Stack Developer
    Building modern web applications
    React, Next.js, Node.js, TypeScript

  * Frontend Engineer
    Crafting responsive user interfaces
    React, Tailwind CSS, Figma

  * Open Source Contributor
    Active contributor to OSS projects
    GitHub, Community building`;

    case 'skills':
      return `
┌──────────────────────────────────────────┐
│              SKILLS                      │
├──────────────────────────────────────────┤
│                                          │
│  Languages:                              │
│    TypeScript ████████████████░░ 90%     │
│    JavaScript ████████████████░░ 88%     │
│    Python     ██████████████░░░░ 78%     │
│    Java       ████████████░░░░░░ 70%     │
│                                          │
│  Frontend:                               │
│    React, Next.js, Tailwind CSS          │
│    Vue.js, HTML5, CSS3                   │
│                                          │
│  Backend:                                │
│    Node.js, Express, FastAPI             │
│    PostgreSQL, MongoDB, Redis            │
│                                          │
│  Tools:                                  │
│    Git, Docker, AWS, Vercel              │
│    Figma, Linux, CI/CD                   │
│                                          │
└──────────────────────────────────────────┘`;

    case 'contact':
      return `
  CONTACT ME
  ==========

  Email      samuel.meseret2016@gmail.com
  GitHub     github.com/samuelmeseret
  LinkedIn   linkedin.com/in/samuel

  Feel free to reach out!`;

    case 'whoami':
      return '  samuel';

    case 'date':
      return `  ${new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })}`;

    case 'clear':
      return '__CLEAR__';

    case '':
      return '';

    default:
      return `  '${cmd.trim()}' is not recognized as a command.\n  Type 'help' for available commands.`;
  }
}

interface TerminalProps {
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  externalCommand: string | null;
  onExternalCommandHandled: () => void;
}

export default function Terminal({
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  externalCommand,
  onExternalCommandHandled,
}: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', content: "hi, I'm Samuel Meseret" },
    { type: 'output', content: '' },
    { type: 'output', content: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [position, setPosition] = useState({ x: 300, y: 60 });
  const [size, setSize] = useState({ w: 720, h: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const executeCommand = useCallback((cmd: string) => {
    const output = getCommandOutput(cmd);

    if (output === '__CLEAR__') {
      setLines([]);
      return;
    }

    const newLines: Line[] = [
      { type: 'command', content: `${PROMPT}${cmd}` },
    ];

    if (output !== null && output !== '') {
      newLines.push({ type: 'output', content: output });
    }

    setLines(prev => [...prev, ...newLines]);

    if (cmd.trim()) {
      setCmdHistory(prev => [...prev, cmd.trim()]);
      setHistoryIdx(-1);
    }
  }, []);

  // Handle external commands from desktop icons
  useEffect(() => {
    if (externalCommand) {
      executeCommand(externalCommand);
      onExternalCommandHandled();
      setTimeout(scrollToBottom, 50);
    }
  }, [externalCommand, executeCommand, onExternalCommandHandled, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const matches = COMMANDS.filter(c => c.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        // Show available completions, then re-prompt
        setLines(prev => [
          ...prev,
          { type: 'command', content: `${PROMPT}${input}` },
          { type: 'output', content: matches.join('  ') },
        ]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const newIdx = historyIdx + 1;
        if (newIdx >= cmdHistory.length) {
          setHistoryIdx(-1);
          setInput('');
        } else {
          setHistoryIdx(newIdx);
          setInput(cmdHistory[newIdx]);
        }
      }
    }
  };

  // Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 200, e.clientX - dragStart.x)),
        y: Math.max(0, Math.min(window.innerHeight - 100, e.clientY - dragStart.y)),
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  if (!isOpen || isMinimized) return null;

  return (
    <div
      className="terminal-window window-open font-mono"
      style={{
        left: position.x,
        top: position.y,
        width: size.w,
        height: size.h,
        zIndex: 30,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="terminal-titlebar" onMouseDown={handleMouseDown}>
        <span className="terminal-title-text">Command Prompt</span>
        <div className="terminal-controls">
          <button
            aria-label="Minimize"
            className="terminal-ctrl-btn"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          >
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path d="M0 5 H10" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          <button
            aria-label="Maximize"
            className="terminal-ctrl-btn"
            onClick={(e) => { e.stopPropagation(); /* maximize placeholder */ }}
          >
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          <button
            aria-label="Close"
            className="terminal-ctrl-btn close"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          >
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path d="M0 0 L10 10 M10 0 L0 10" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="terminal-body" ref={scrollRef}>
        {lines.map((line, i) => (
          <div key={i} className="terminal-output-line text-[#cccccc]">
            {line.content}
          </div>
        ))}

        {/* Active prompt */}
        <form onSubmit={handleSubmit} className="terminal-prompt-line">
          <span className="terminal-prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>

      {/* Status bar */}
      <div className="terminal-statusbar">
        <span>Type &apos;help&apos; for commands</span>
        <span>↑↓ History • Tab Autocomplete</span>
      </div>
    </div>
  );
}
