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

  const audioRef = useRef(null);

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
    let timer;
    let countdown;

    if (sessionActive && breathsCompleted < breaths) {
      const [inhale, hold, exhale] = mode;

      const runPhase = (currentPhase, duration, next) => {
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
    // Main Background: 
    <div 
      className="min-h-screen w-full flex items-start justify-center pt-10"
    >
      <div className="bg-white rounded-[50px] w-[95vw] max-w-[900px] py-6 px-6 flex flex-col items-center border border-neutral-100 shadow-sm">
        
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-neutral-500 mb-1">Breathe with intention.</h2>
          <p className="text-sm text-neutral-400">A guided breathing experience designed to reset your nervous system.</p>
        </div>

        {/* Modes Selection */}
        <div className="flex gap-3 mb-4">
          {modes.map((m) => {
            const isActive = JSON.stringify(mode) === JSON.stringify(m.values);
            return (
              <button
                key={m.label}
                disabled={sessionActive}
                onClick={() => { setMode(m.values); setBreathsCompleted(0); }}
                className={`text-[12px] py-2.5 px-8 rounded-full border transition-all ${
                  isActive
                    ? 'bg-[#C7D2FE] border-transparent text-white shadow-md'
                    : 'bg-white border-neutral-200 text-neutral-400 hover:bg-neutral-50'
                } ${sessionActive ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Breath Counter */}
        <div className={`flex items-center gap-6 mb-6 transition-opacity ${sessionActive ? 'opacity-30' : 'opacity-100'}`}>
          <button 
            disabled={sessionActive} 
            onClick={() => setBreaths(Math.max(1, breaths - 1))} 
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:bg-neutral-50"
          >-</button>
          <span className="text-sm font-bold text-neutral-600">{breaths} Breaths</span>
          <button 
            disabled={sessionActive} 
            onClick={() => setBreaths(breaths + 1)} 
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:bg-neutral-50"
          >+</button>
        </div>

        {/* Visual Area */}
        <div className="relative h-64 w-full flex flex-col items-center justify-center mb-6">
          {/* Circular Image Container */}
          <div className={`relative z-10 w-60 h-60 rounded-full overflow-hidden border-4 border-white shadow-md transition-transform duration-[4000ms] ease-in-out ${sessionActive && phase === 'Inhale' ? 'scale-110' : 'scale-100'}`}>
            <Image 
              src="/med.png" 
              alt="Meditation" 
              fill
              className="object-cover"
              priority 
            />
          </div>
          
          {/* Overlay Text (Always visible white color) */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none translate-y-20">
            <div className="text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
              {breathsCompleted}/{breaths}
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-[0.5em] mt-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              {sessionActive ? `${phase} ${timeLeft}s` : phase}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-3 w-full max-w-sm">
          <button 
            onClick={toggleMusic}
            className="w-full flex items-center justify-center gap-4 bg-white border border-neutral-100 rounded-2xl py-3 px-10 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-amber-50 rounded-full">
              <Image src="/image.png" alt="Ohm" width={20} height={20} />
            </div>
            <span className="text-sm font-bold text-neutral-700">
              {isMusicPlaying ? "Stop Ohm" : "Play Ohm chanting"}
            </span>
          </button>

          <button
            onClick={() => { if(!sessionActive) setBreathsCompleted(0); setSessionActive(!sessionActive); }}
            className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all uppercase tracking-widest"
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