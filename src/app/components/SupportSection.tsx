"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; 

const cards = [
  { 
    title: "Meditation", 
    icon: "🧘", 
    desc: "Take a few gentle minutes to settle your thoughts and body.",
    path: "/Meditation"
  },
  { 
    title: "Reflect and connect", 
    icon: "👨‍⚕️", 
    desc: "Connect with a trained professional for deeper support when you need it.",
    path: "/quiz"
  },
  { 
    title: "Events", 
    icon: "📅", 
    desc: "Join our upcoming guided sessions to reconnect and reset your mind.",
    path: "/events"
  },
];

const SupportSection = () => {
  const router = useRouter();

  return (
    <section className="mt-10 md:mt-20 pb-20 px-6">
      <p className="text-center text-[11px] md:text-sm text-gray-400 italic mb-10 max-w-xs mx-auto md:max-w-none leading-relaxed">
        If you&apos;d like additional support, these options are available.
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white p-6 md:p-8 rounded-3xl md:rounded-4xl shadow-sm border border-gray-100 flex flex-col items-start transition-all hover:shadow-md group"
          >
            {/* Header: Icon + Title */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl group-hover:scale-110 transition-transform">{card.icon}</span>
              <h3 className="font-bold text-gray-800 text-sm md:text-base tracking-tight uppercase">
                {card.title}
              </h3>
            </div>


            <p className="text-[13px] md:text-sm text-gray-500 mb-8 leading-relaxed min-h-15">
              {card.desc}
            </p>


            <button 
              onClick={() => router.push(card.path)} // Navigation logic
              className="mt-auto bg-[#E9B96E] hover:bg-[#d4a55d] text-white px-10 py-2.5 md:px-8 md:py-2 rounded-full text-sm font-semibold transition cursor-pointer active:scale-95 shadow-sm shadow-[#E9B96E]/20"
            >
              Start
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportSection;