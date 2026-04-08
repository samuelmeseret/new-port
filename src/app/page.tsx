'use client';

import { useState } from 'react';
import BootScreen from '@/components/BootScreen';
import LockScreen from '@/components/LockScreen';
import Desktop from '@/components/Desktop';

type Phase = 'boot' | 'lock' | 'desktop';

export default function Home() {
  const [phase, setPhase] = useState<Phase>('boot');

  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      {phase === 'boot' && (
        <BootScreen onComplete={() => setPhase('lock')} />
      )}
      {phase === 'lock' && (
        <LockScreen onLogin={() => setPhase('desktop')} />
      )}
      {phase === 'desktop' && (
        <Desktop onSignOut={() => setPhase('lock')} />
      )}
    </main>
  );
}
