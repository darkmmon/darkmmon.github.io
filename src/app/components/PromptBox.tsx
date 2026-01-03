'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiArrowUp } from 'react-icons/hi';

export default function PromptBox() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const encoded = encodeURIComponent(prompt.trim());
    // Navigate to chat page with prompt query
    router.push(`/chat?prompt=${encoded}`);
  };

  return (
    <div className="max-w-2xl mx-auto my-6 h-[150px]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-2 items-end h-full"
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me something..."
          className="flex-1 h-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button className="px-4 py-3 text-white rounded-lg hover:bg-gray-500 h-12">
          <HiArrowUp />
        </button>
      </form>
    </div>
  );
}
