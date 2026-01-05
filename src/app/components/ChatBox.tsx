'use client';

import { useState, useRef, useEffect } from 'react';
import { Cohere, CohereClientV2 } from 'cohere-ai';
import Card from '@/components/ui/card';
import { loadDocuments, formatDocumentsForRAG } from '@/lib/documentLoader';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Document {
  data: {
    title: string;
    snippet: string;
  };
}

export default function ChatBox() {
  const cohere = new CohereClientV2({
    token: `${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load documents on component mount
  useEffect(() => {
    const initializeDocuments = async () => {
      const loadedDocs = await loadDocuments();
      setDocuments(formatDocumentsForRAG(loadedDocs));
    };
    initializeDocuments();
  }, []);

  useEffect(() => {
    // Check for initial prompt in URL (e.g., ?prompt=hello)
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const prompt = params.get('prompt');

    if (prompt && !processedRef.current) {
      processedRef.current = true;
      // remove the prompt param to prevent re-sending
      const url = new URL(window.location.href);
      url.searchParams.delete('prompt');
      window.history.replaceState({}, '', url.toString());
      // send the initial prompt
      sendPrompt(prompt);
      // if there's a hash to scroll to, respect it
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendPrompt(input);
  };

  const sendPrompt = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const messageToSend = [...messages, userMessage];

      // Prepare the API request with RAG documents
      const requestData: Record<string, any> = {
        model: 'command-r-08-2024',
        messages: messageToSend.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content,
        })),
      };

      // Add documents to the request if they exist
      if (documents && documents.length > 0) {
        requestData.documents = documents;
      }

      const response = await cohere.chat(requestData);

      if (!response.message) {
        throw new Error(`Cohere API error: ${response.finishReason}`);
      }

      const data = await response.message;
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          (data.content?.at(-1) as unknown as Cohere.ChatTextContent).text ??
          '',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Cohere API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your message.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card id="chat" className="flex flex-col h-full bg-gray-100 ">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p>Start a conversation...</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
              <p className="text-sm">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-300 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </Card>
  );
}
