"use client";
import React from 'react';
import { Mic, SendHorizontal } from 'lucide-react';

interface ChatInterfaceProps {
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  return (
    /* pt-0 and justify-start ensures there is zero gap at the top */
    <div className="flex-1 flex flex-col items-center justify-start pt-0 px-4 w-full min-h-screen bg-linear-to-b from-[#FAFAFA] to-[#F5F5F4]">
      
      {/* Central Card Container - Added mt-4 for just a tiny breathing room from the browser edge */}
      <div className="bg-[#F7F3EE] w-full max-w-3xl rounded-[30px] md:rounded-[40px] p-6 md:p-10 mt-4 md:mt-8 flex flex-col items-center relative shadow-sm">
        
        {/* Message Bubble */}
        <div className="bg-[#FAF7F2] rounded-[28px] p-6 md:p-8 mb-6 w-full max-w-md self-center text-left shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-2">I hear you.</h2>
          <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed">
            It sounds like you&apos;re feeling anxious right now.<br />
            You don&apos;t have to go through this alone.
          </p>
        </div>

        {/* Input Area */}
        <div className="relative w-full max-w-2xl">
          <input 
            autoFocus 
            type="text" 
            placeholder="" 
            className="w-full bg-[#FAF9F6] border border-gray-100 rounded-2xl py-3.5 pl-6 pr-24 text-sm text-gray-800 focus:outline-none shadow-sm transition-all"
          />
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button type="button" className="text-gray-400 hover:text-gray-600 p-1.5 transition-colors">
              <Mic className="h-5 w-5" />
            </button>
            <button type="button" className="text-gray-300 hover:text-gray-500 p-1.5 transition-colors">
              <SendHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Small sub-text */}
        <p className="w-full max-w-2xl text-[11px] text-gray-800 italic mt-3 text-left pl-2">
          You can share as much or as little as you want.
        </p>
      </div>

      {/* Disclaimer - Tighter margin to keep everything in the upper half */}
      <div className="mt-6 text-[10px] text-gray-400 leading-relaxed  tracking-widest text-center px-6 max-w-xl opacity-60">
        KAAL AI is not a doctor or therapist.<br />
        It listens with care and may suggest professional help when needed.
      </div>
    </div>
  );
};

export default ChatInterface;