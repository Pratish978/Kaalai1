"use client";
import React from 'react';
import Navbar from '../components/Navbar'; 
import BreathingCircle from '../components/Meditation/BreathingCircle';
import MeditationCard from '../components/Meditation/MeditationCard';

export default function MeditationPage() {
  const guidedSessions = [
    // Move the Free session to the top of the list
    { title: "Morning energy", duration: "4 mints", status: "Free", isFree: true },
    { title: "Stress relief", duration: "15 mints", status: "Locked", isFree: false },
    { title: "Deep calm", duration: "15 mints", status: "Locked", isFree: false },
  ];

  return (
    <div className="bg-[#FBF9F6] min-h-screen">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4">
        
        {/* Breathing section */}
        <section className="w-full flex flex-col items-center justify-center">
          <BreathingCircle />
        </section>

        {/* Guided Section Title */}
        <section className="text-center mt-10 mb-8">
          <h2 className="text-3xl font-bold text-[#4a4a4a] mb-2">Guided Meditation</h2>
          <p className="text-[#a4adb7] italic text-sm mb-6">Choose an option</p>
          <p className="text-[#a4adb7] text-[13px] font-medium max-w-md mx-auto leading-relaxed">
            If you'd like additional support, these options are available.
          </p>
        </section>

        {/* Meditation Cards Grid */}
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-20">
          {guidedSessions.map((session, index) => (
            <MeditationCard 
              key={index}
              title={session.title}
              duration={session.duration}
              status={session.status}
              isFree={session.isFree}
            />
          ))}
        </section>
      </main>
    </div>
  );
}