"use client";
import React from 'react';

interface CardProps {
  title: string;
  duration: string;
  status: string;
  isFree?: boolean;
}

export default function MeditationCard({ title, duration, status, isFree }: CardProps) {
  return (
    <div className="bg-white rounded-[40px] p-8 text-left shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-white flex flex-col min-h-70 w-full transition-all hover:shadow-md">
      
      {/* Icon and Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#FFF9E5] rounded-xl flex items-center justify-center text-lg shadow-sm">
          🧘
        </div>
        <h4 className="font-bold text-[#4A4A4A] text-[16px] tracking-tight">
          {title}
        </h4>
      </div>

      {/* Description - */}
      <div className="grow">
        <p className="text-[#9B9B9B] text-[13px] leading-[1.6] mb-6 font-light block">
          Start your day with positive intentions and clarity for deeper support when you need it.
        </p>
      </div>

      {/* Footer: Status and Duration */}
      <div className="flex justify-between items-center pt-2">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-tight uppercase 
          ${isFree 
            ? 'bg-[#E8F9F1] text-[#7ED9A9]' 
            : 'bg-[#FDF2E9] text-[#E67E22]'
          }`}
        >
          {status}
        </span>
        
        <span className="text-[11px] text-[#BDBDBD] font-medium tracking-wide">
          {duration}
        </span>
      </div>
    </div>
  );
}