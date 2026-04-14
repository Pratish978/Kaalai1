"use client";
import React from 'react';
import { Mic, SendHorizontal } from 'lucide-react';

interface ChatInterfaceProps {
  onBack?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 w-full">
      {/* Central Card Container */}
      <div className="bg-[#F3EFE9] w-full max-w-2xl rounded-[30px] md:rounded-[40px] p-8 md:p-14 text-center shadow-inner flex flex-col items-center relative overflow-hidden">
        
        {/* User Status/Feeling Feedback Card */}
        <div className="bg-white rounded-2xl p-6 mb-12 w-full max-w-sm text-center shadow-sm border border-black/5">
          <h2 className="text-2xl font-serif text-gray-900 mb-3">I hear you.</h2>
          <p className="text-sm text-gray-600 leading-relaxed font-light">
            It sounds like you’re feeling anxious right now.<br />
            You don’t have to go through this alone.
          </p>
        </div>

        <p className="text-[11px] text-gray-400 tracking-widest uppercase mb-10 animate-pulse">
          KAAL is taking a moment...
        </p>

        <div className="relative w-full max-w-lg">
          <input 
            type="text" 
            placeholder="Type here... I am listening." 
            className="w-full bg-white border border-gray-100 rounded-full py-5 pl-8 pr-20 text-sm text-gray-800 focus:ring-2 focus:ring-[#E9B96E]/20 focus:border-[#E9B96E] outline-none shadow-sm placeholder:text-gray-400 transition-all"
          />
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button type="button" className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer bg-transparent border-none outline-none">
              <Mic className="h-5 w-5" />
            </button>
            <button type="button" className="text-[#E9B96E] hover:text-[#d4a55d] p-2 cursor-pointer bg-transparent border-none outline-none transition-transform active:scale-90">
              <SendHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 italic mt-6 text-center tracking-wide">
          You can share as much or as little as you want.
        </p>
      </div>

      <div className="mt-8 text-[9px] md:text-[10px] text-gray-400 leading-tight uppercase tracking-[0.2em] text-center px-6 opacity-70">
        KAAL AI is not a doctor or therapist.<br className="hidden md:block"/>
        It listens with care and may suggest professional help when needed.
      </div>
    </div>
  );
};

export default ChatInterface;