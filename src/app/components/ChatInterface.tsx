"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mic, SendHorizontal, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface ChatInterfaceProps {
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "I hear you. It sounds like you're feeling anxious right now. You don't have to go through this alone." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef(`session_${Math.random().toString(36).substring(7)}`);

  // Auto-scroll logic to handle extending chat list
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
      // FastAPI backend call
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I'm having trouble connecting to Kaal right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FBF9F6] min-h-screen flex flex-col items-center pt-4 px-4 w-full">
      
      {/* Main Card: UI strictly preserved */}
      <div className="bg-[#F6F2ED] w-full max-w-2xl rounded-[32px] px-6 py-6 flex flex-col items-center shadow-sm max-h-[80vh]">
        
        {/* Chat History Area: This part now extends/scrolls */}
        <div className="w-full overflow-y-auto mb-3 space-y-3 pr-1 no-scrollbar flex flex-col items-center">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`bg-[#F0EAE2] rounded-[24px] px-6 py-5 w-full max-w-md flex flex-col items-start text-left shadow-sm ${
                msg.role === 'user' ? 'border-r-4 border-[#6D7EB3]' : ''
              }`}
            >
              {msg.role === 'assistant' && (
                <h2 className="text-base font-bold text-[#3D3D3D] mb-1 leading-tight">
                  {idx === 0 ? "I hear you." : "Kaal"}
                </h2>
              )}
              <p className="text-[13px] md:text-[14px] text-[#5A5A5A] leading-snug whitespace-pre-wrap">
                {msg.text}
              </p>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {/* Status Text: Animated Logo */}
        {isLoading && (
          <div className="flex items-center gap-2 mb-4">
            <img 
              src="/kaal-logo-1.png" 
              alt="Logo" 
              className="w-4 h-4 animate-spin" 
              style={{ animationDuration: '3s' }}
            />
            <p className="text-[10px] text-gray-400 italic">
              KAAL is taking a moment
            </p>
          </div>
        )}

        {/* Input Area: UI strictly preserved */}
        <div className="relative w-full max-w-lg">
          <input 
            autoFocus 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type here ..I am listening." 
            className="w-full bg-[#FAF9F6] border border-gray-100 rounded-xl py-2.5 pl-5 pr-24 text-[13px] text-[#5A5A5A] italic placeholder:text-gray-300 focus:outline-none shadow-sm transition-all"
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <button 
              type="button" 
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <Mic className="h-4 w-4" />
            </button>
            <button 
              onClick={handleSendMessage}
              disabled={isLoading}
              type="button" 
              className={`${isLoading ? 'text-gray-200' : 'text-[#3D3D3D] hover:text-black'} transition-colors p-1`}
            >
              <SendHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Small sub-text */}
        <div className="w-full max-w-lg mt-1.5 pl-1">
          <p className="text-[9px] text-gray-400 italic">
            You can share as much or as little as you want.
          </p>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-8 text-[12px] text-gray-600 leading-relaxed text-center px-6 max-w-xs font-light tracking-wide opacity-80">
        KAAL AI is not a doctor or therapist.<br />
        It listens with care and may suggest professional help when needed.
      </div>
    </div>
  );
};

export default ChatInterface;