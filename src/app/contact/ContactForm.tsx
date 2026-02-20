'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Stubbed submission — replace with API call or action if needed
    alert('Thanks! Message sent (stub).');
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <form action="#" className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          className="w-full rounded border px-3 py-2 bg-white dark:bg-gray-800"
        />
      </div>
      <div>
        <Button type="submit">Send message</Button>
      </div>
    </form>
  );
}
