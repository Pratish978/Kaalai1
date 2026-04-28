"use client";
import React from 'react';
import { Mic, SendHorizontal } from 'lucide-react';

interface ChatInterfaceProps {
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  return (
    /* Top-aligned wrapper with minimal top padding */
    <div className="bg-[#FBF9F6] min-h-screen flex flex-col items-center pt-4 px-4 w-full">
      
      {/* Main Card: Reduced max-width and vertical padding (py-6) to make it short */}
      <div className="bg-[#F6F2ED] w-full max-w-2xl rounded-[32px] px-6 py-6 flex flex-col items-center shadow-sm">
        
        {/* Message Bubble: Reduced padding and left-aligned text */}
        <div className="bg-[#F0EAE2] rounded-[24px] px-6 py-5 mb-3 w-full max-w-md flex flex-col items-start text-left">
          <h2 className="text-base font-bold text-[#3D3D3D] mb-1 leading-tight">
            I hear you.
          </h2>
          <p className="text-[13px] md:text-[14px] text-[#5A5A5A] leading-snug">
            It sounds like you&apos;re feeling anxious right now.<br />
            You don&apos;t have to go through this alone.
          </p>
        </div>

        {/* Status Text: Logo now on the LEFT with rotation */}
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

        {/* Input Area: Reduced vertical padding (py-2.5) */}
        <div className="relative w-full max-w-lg">
          <input 
            autoFocus 
            type="text" 
            placeholder="Type here ..I am listening." 
            className="w-full bg-[#FAF9F6] border border-gray-100 rounded-xl py-2.5 pl-5 pr-20 text-[13px] text-[#5A5A5A] italic placeholder:text-gray-300 focus:outline-none shadow-sm transition-all"
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Mic className="h-4 w-4" />
            </button>
            <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
              <SendHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Small sub-text: Tighter margin */}
        <div className="w-full max-w-lg mt-1.5 pl-1">
          <p className="text-[9px] text-gray-400 italic">
            You can share as much or as little as you want.
          </p>
        </div>
      </div>

      {/* Footer Disclaimer: Smaller text and lower opacity */}
      <div className="mt-8 text-[9px] text-gray-600 leading-relaxed text-center px-6 max-w-xs font-light tracking-wide opacity-80">
        KAAL AI is not a doctor or therapist.<br />
        It listens with care and may suggest professional help when needed.
      </div>
    </div>
  );
};

export default ChatInterface;