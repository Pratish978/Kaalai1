"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const BreathingCircle = () => {
  const [breaths, setBreaths] = useState(6);
  const [sessionActive, setSessionActive] = useState(false);
  const [breathsCompleted, setBreathsCompleted] = useState(0);
  const [phase, setPhase] = useState('READY');
  const [timeLeft, setTimeLeft] = useState(0);
  const [mode, setMode] = useState([4, 4, 4]); 
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/Music/om.mp3');
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Playback blocked", err));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let countdown: NodeJS.Timeout;

    if (sessionActive && breathsCompleted < breaths) {
      const [inhale, hold, exhale] = mode;

      const runPhase = (currentPhase: string, duration: number, next?: () => void) => {
        setPhase(currentPhase);
        setTimeLeft(duration);
        countdown = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
        timer = setTimeout(() => {
          clearInterval(countdown);
          if (next) next();
        }, duration * 1000);
      };

      runPhase('Inhale', inhale, () => {
        runPhase('Hold', hold, () => {
          runPhase('Exhale', exhale, () => {
            const nextBreath = breathsCompleted + 1;
            setBreathsCompleted(nextBreath);
            if (nextBreath >= breaths) {
              setSessionActive(false);
              setPhase('DONE!');
              audioRef.current?.pause();
              setIsMusicPlaying(false);
            }
          });
        });
      });
    }
    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, [sessionActive, breathsCompleted, mode, breaths]);

  const modes = [
    { label: 'Gentle (4-4-4)', values: [4, 4, 4] },
    { label: 'Deep (5-5-8)', values: [5, 5, 8] },
    { label: 'Power (4-7-8)', values: [4, 7, 8] }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2 md:p-4">
      <div className="bg-white rounded-[40px] md:rounded-[50px] w-full max-w-[900px] py-8 md:py-10 px-3 md:px-10 flex flex-col items-center border border-neutral-100 overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-xl font-bold text-neutral-500 mb-1">Breathe with intention.</h2>
          <p className="text-[11px] md:text-sm text-neutral-400">A guided breathing experience designed to reset your nervous system.</p>
        </div>

        {/* Line 1: Modes Selection */}
        <div className="flex justify-center gap-1.5 md:gap-3 mb-8 w-full max-w-full overflow-x-auto no-scrollbar">
          {modes.map((m) => {
            const isActive = JSON.stringify(mode) === JSON.stringify(m.values);
            return (
              <button
                key={m.label}
                disabled={sessionActive}
                onClick={() => { setMode(m.values); setBreathsCompleted(0); }}
                className={`whitespace-nowrap text-[9px] md:text-[12px] py-2 md:py-2.5 px-3 md:px-8 rounded-full border transition-all cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-[#C7D2FE] border-transparent text-white'
                    : 'bg-white border-neutral-200 text-neutral-400 hover:bg-neutral-50'
                } ${sessionActive ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Line 2: Breath Counter */}
        <div className={`flex items-center gap-4 md:gap-6 mb-8 transition-opacity ${sessionActive ? 'opacity-30' : 'opacity-100'}`}>
          <button 
            disabled={sessionActive} 
            onClick={() => setBreaths(Math.max(1, breaths - 1))} 
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:bg-neutral-50 cursor-pointer disabled:cursor-not-allowed"
          >-</button>
          <span className="text-xs md:text-sm font-bold text-neutral-600">{breaths} Breaths</span>
          <button 
            disabled={sessionActive} 
            onClick={() => setBreaths(breaths + 1)} 
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:bg-neutral-50 cursor-pointer disabled:cursor-not-allowed"
          >+</button>
        </div>

        {/* Visual Area - Shadows removed from text */}
        <div className="relative w-full flex flex-col items-center justify-center mb-10 overflow-visible min-h-[220px] md:min-h-[280px]">
          <div className={`relative z-10 transition-transform duration-[4000ms] ease-in-out ${sessionActive && phase === 'Inhale' ? 'scale-110' : 'scale-100'}`}>
            <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] relative">
              <Image src="/med.png" alt="Meditation" fill className="object-cover rounded-full"  />
            </div>
          </div>
          
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none translate-y-10 md:translate-y-16">
            {/* Removed drop-shadow-md */}
            <div className="text-4xl md:text-5xl font-bold text-white">
              {breathsCompleted}/{breaths}
            </div>
            {/* Removed drop-shadow-sm */}
            <div className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.3em] md:tracking-[0.5em] mt-1">
              {sessionActive ? `${phase} ${timeLeft}s` : phase}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[280px] md:max-w-xs">
          <button 
            onClick={toggleMusic}
            className="w-full flex items-center justify-center gap-2 bg-white border border-neutral-100 rounded-2xl py-4 md:py-6 transition-all group cursor-pointer"
          >
            <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-amber-50 rounded-full">
              <Image src="/image.png" alt="Ohm" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-lg md:text-xl font-bold text-neutral-700">
              {isMusicPlaying ? "Stop Ohm" : "Play Ohm"}
            </span>
          </button>

          <button
            onClick={() => { if(!sessionActive) setBreathsCompleted(0); setSessionActive(!sessionActive); }}
            className="w-full py-4 rounded-2xl md:rounded-3xl text-white font-bold text-xs md:text-sm active:scale-95 transition-all uppercase tracking-widest cursor-pointer"
            style={{ background: 'linear-gradient(to right, #6D7EB3, #7FB1E9)' }}
          >
            {sessionActive ? 'Stop Session' : 'Start Session'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default BreathingCircle;