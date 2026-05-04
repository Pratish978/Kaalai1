"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mic, SendHorizontal } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface ChatInterfaceProps {
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "I hear you. It sounds like you're feeling anxious right now. You don't have to go through this alone." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef(`session_${Math.random().toString(36).substring(7)}`);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.NEXT_PUBLIC_CHAT_KEY || '', 
        },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          message: userMsg
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting to Kaal right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FBF9F6] min-h-screen flex flex-col items-center pt-8 px-4 w-full">
      
      {/* Main Container Card - uses h-fit to start small and grow as you chat */}
      <div className="bg-[#F6F2ED] w-full max-w-3xl rounded-[40px] px-8 py-10 flex flex-col shadow-sm h-fit max-h-[85vh] transition-all duration-500 ease-in-out no-scrollbar">
        
        {/* Chat History Area */}
        <div className="w-full overflow-y-auto mb-6 space-y-6 no-scrollbar flex flex-col">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`bg-[#F0EAE2] rounded-[32px] px-10 py-6 shadow-sm transition-all duration-300 max-w-[85%] w-fit ${
                  msg.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <h2 className="text-base font-bold text-[#3D3D3D] mb-1 leading-tight">
                  {msg.role === 'assistant' ? (idx === 0 ? "I hear you." : "Kaal") : "You"}
                </h2>
                <p className="text-[14px] text-[#5A5A5A] leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center gap-2 mb-4 self-center">
            <img 
              src="/kaal-logo-1.png" 
              alt="Logo" 
              className="w-5 h-5 animate-spin opacity-30" 
              style={{ animationDuration: '3s' }}
            />
          </div>
        )}

        {/* Input Control Area */}
        <div className="mt-auto w-full max-w-2xl mx-auto">
          <div className="relative">
            <input 
              autoFocus 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type here..." 
              className="w-full bg-[#FAF9F6] border border-gray-100 rounded-2xl py-4 pl-6 pr-28 text-[15px] text-[#5A5A5A] focus:outline-none shadow-sm transition-all"
            />
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-5">
              <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                <Mic className="h-5 w-5" />
              </button>
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                type="button" 
                className={`${isLoading ? 'text-gray-200' : 'text-[#3D3D3D] hover:text-black'} transition-colors`}
              >
                <SendHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 italic mt-2 pl-1">
            You can share as much or as little as you want.
          </p>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-12 text-[12px] text-gray-400 text-center px-6 max-w-sm font-light tracking-wide leading-relaxed">
        KAAL AI is not a doctor or therapist.<br />
        It listens with care and may suggest professional help when needed.
      </div>
    </div>
  );
};

export default ChatInterface;