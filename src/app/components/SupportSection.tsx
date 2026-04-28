"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const cards = [
  {
    title: "Meditation",
    icon: "/Home1.png",
    desc: "Take a few gentle minutes to settle your thoughts and body.",
    path: "/Meditation"
  },
  {
    title: "Talk to a Psychologist",
    icon: "/Home2.png",
    desc: "Connect with a trained professional for deeper support when you need it.",
    path: "/quiz"
  },
  {
    title: "Events",
    icon: "/Home3.png",
    desc: "Answer a few questions to understand how you've been feeling lately.",
    path: "/events"
  },
];

const SupportSection = () => {
  const router = useRouter();

  return (
    <section className="py-10 px-6">
            <p className="text-center text-[11px] md:text-sm text-gray-600 italic mb-10 max-w-xs mx-auto md:max-w-none leading-relaxed">

        If you&apos;d like additional support, these options are available.

      </p>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            /* Reduced vertical padding from p-10 to py-8 */
            className="bg-white px-8 py-8 rounded-[2rem] shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col items-start"
          >
            {/* Icon - Reduced bottom margin */}
            <div className="mb-4">
              <img
                src={card.icon}
                alt={card.title}
                className="w-10 h-10 object-contain"
              />
            </div>

            {/* Title - Reduced bottom margin */}
            <h3 className="font-bold text-[#333] text-lg mb-2 tracking-tight">
              {card.title}
            </h3>

            {/* Description - Lowered min-height and text size for compactness */}
            <p className="font-serif text-[15px] text-gray-400 mb-6 leading-snug min-h-[60px]">
              {card.desc}
            </p>

            {/* Button - Reduced padding (py-3) */}
            <button
              onClick={() => router.push(card.path)}
              className="w-full bg-[#E9B666] hover:bg-[#dfa755] text-white py-3 rounded-full font-bold text-base transition-colors shadow-sm active:scale-95 cursor-pointer"
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