"use client";
import React from 'react';
import Navbar from '../components/Navbar'; 
import BreathingCircle from '../components/Meditation/BreathingCircle';
import MeditationCard from '../components/Meditation/MeditationCard';

export default function MeditationPage() {
  const guidedSessions = [
    { title: "Morning energy", duration: "15 mints", status: "Locked", isFree: false },
    { title: "Stress relief", duration: "15 mints", status: "Locked", isFree: false },
    { title: "Morning energy", duration: "15 mints", status: "free", isFree: true },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f5f3f1] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">
        
        <section className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center">
          <BreathingCircle />
        </section>


        <div className="h-20"></div>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#4a4a4a] mb-2">Guided Meditation</h2>
          <p className="text-[#a4adb7] italic text-sm mb-8">Choose an option</p>
          
          <p className="text-[#a4adb7] text-[13px] font-medium max-w-md mx-auto leading-relaxed">
            If you'd like additional support, these options are available.
          </p>
        </section>

        <section className="w-full  grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pb-20">
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