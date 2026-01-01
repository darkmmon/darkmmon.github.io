'use client';

import Image from 'next/image';
import Gameboard from '../gameboard';

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16">
      <main className="flex h-[min(95vh,95vw)] w-[min(95vh,95vw)] flex-col items-center sm:items-start">
        <Gameboard playerCount={2} moveEngine={undefined} />
      </main>
    </div>
  );
}
