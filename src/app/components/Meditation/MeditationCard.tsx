"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import MeditationPlayer from './MeditationPlayer';

interface CardProps {
  title: string;
  duration: string;
  status: string;
  isFree?: boolean;
}

export default function MeditationCard({ title, duration, status, isFree }: CardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => isFree && setIsOpen(true)} 
        className={`bg-white rounded-[32px] p-7 text-left flex flex-col min-h-[240px] w-full transition-all duration-300
          ${isFree 
            ? 'shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer active:scale-[0.98]' 
            : 'shadow-[0_10px_30px_rgba(0,0,0,0.04)] opacity-90'
          }`}
      >
        {/* Header: Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image 
              src="/Home1.png" 
              alt="Meditation Icon" 
              width={32} 
              height={32} 
              className="object-contain"
            />
          </div>
          <h4 className="font-bold text-[#333333] text-[17px] tracking-tight">
            {title}
          </h4>
        </div>

        {/* Description */}
        <div className="grow">
          <p className="text-[#7D7D7D] text-[14px] leading-relaxed font-medium max-w-[90%]">
            Start your day with positive intentions and clarity for deeper support when you need it.
          </p>
        </div>

        {/* Footer: Status on Left, Duration on Right */}
        <div className="flex justify-between items-center mt-6">
          <div className={`px-5 py-2 rounded-2xl text-[13px] font-bold
            ${isFree 
              ? 'bg-[#E8F9E9] text-[#5CC489]' 
              : 'bg-[#FEF0E3] text-[#D48D5E]'
            }`}
          >
            {status}
          </div>
          
          <span className="text-[13px] text-[#A5C683] font-bold">
            {duration}
          </span>
        </div>
      </div>

      {/* Render Player Modal if Open */}
      {isOpen && (
        <MeditationPlayer 
          title={title} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}