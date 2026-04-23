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

  // Audio setup
  useEffect(() => {
    audioRef.current = new Audio('/Music/om.mp3');
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // Manual Music Toggle on Image Click
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
        
        countdown = setInterval(() => {
          setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        timer = setTimeout(() => {
          clearInterval(countdown);
          if (next) next();
        }, duration * 1000);
      };

      // Cycle logic: Counter updates ONLY after Exhale finishes
      runPhase('Inhale', inhale, () => {
        runPhase('Hold', hold, () => {
          runPhase('Exhale', exhale, () => {
            const nextBreath = breathsCompleted + 1;
            setBreathsCompleted(nextBreath);
            
            if (nextBreath >= breaths) {
              setSessionActive(false);
              setPhase('DONE!');
              setTimeLeft(0);
              // Session khatam hone par music stop kar sakte hain (optional)
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

  const handleModeChange = (newMode: number[]) => {
    setMode(newMode);
    setSessionActive(false);
    setBreathsCompleted(0);
    setPhase('READY');
    setTimeLeft(0);
  };

  return (
    <div className="h-fit w-full flex flex-col items-center justify-center font-sans text-neutral-700">
      <div className="bg-white px-10 py-12 rounded-3xl shadow-lg w-212.5 flex flex-col items-center border border-neutral-100">
        
        <div className="text-center mb-4">
          <p className="text-sm font-medium">Breathe with intention.</p>
          <p className="text-[10px] text-neutral-400">
            {isMusicPlaying ? "🎵 Music is playing..." : "Click the image to play music"}
          </p>
        </div>

        {/* Mode Selection */}
        <div className="flex gap-2 mb-4">
          {[
            { label: 'Gentle (4-4-4)', values: [4, 4, 4] },
            { label: 'Deep (5-5-8)', values: [5, 5, 8] },
            { label: 'Power (4-7-8)', values: [4, 7, 8] }
          ].map((m) => (
            <button
              key={m.label}
              onClick={() => handleModeChange(m.values)}
              className={`text-[10px] py-1.5 px-4 rounded-full transition-all border cursor-pointer ${
                JSON.stringify(mode) === JSON.stringify(m.values)
                  ? 'bg-purple-100 border-purple-300 text-purple-700 shadow-sm'
                  : 'border-neutral-200 hover:border-purple-300 hover:bg-neutral-50 text-neutral-500'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Breath Controller */}
        <div className="flex items-center gap-4 mb-4 bg-neutral-50 px-3 py-1 rounded-xl border border-neutral-100">
          <button 
            onClick={() => { setBreaths(Math.max(1, breaths - 1)); setBreathsCompleted(0); }} 
            className="text-lg hover:text-purple-600 px-2 cursor-pointer select-none"
          >-</button>
          <span className="text-[11px] font-bold w-16 text-center">{breaths} Breaths</span>
          <button 
            onClick={() => { setBreaths(breaths + 1); setBreathsCompleted(0); }} 
            className="text-lg hover:text-purple-600 px-2 cursor-pointer select-none"
          >+</button>
        </div>

        {/* Image: Only Music Toggle */}
        <div 
          onClick={toggleMusic}
          className={`relative h-56 w-56 cursor-pointer transition-transform duration-[4000ms] ease-in-out ${sessionActive && phase === 'Inhale' ? 'scale-110' : 'scale-100'}`}
        >
          <Image 
            src="/meditation1.PNG" 
            alt="Meditation" 
            fill
            className={`object-contain transition-opacity ${isMusicPlaying ? 'opacity-100' : 'opacity-80'}`}
            priority 
          />
          {!isMusicPlaying && !sessionActive && (
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/50 px-2 py-1 rounded text-[10px]">Click to Play Sound</span>
             </div>
          )}
        </div>

        {/* Status Area */}
        <div className="text-center mt-4 w-full flex flex-col items-center">
          <div className="mb-4 h-10">
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
              {breathsCompleted} / {breaths}
            </div>
            <div className={`text-xl font-bold tracking-[0.2em] uppercase transition-all ${sessionActive ? 'text-purple-600' : 'text-neutral-400'}`}>
              {sessionActive ? `${phase} (${timeLeft}s)` : phase}
            </div>
          </div>

          <button
            onClick={() => {
              if(!sessionActive) setBreathsCompleted(0);
              setSessionActive(!sessionActive);
            }}
            className={`w-48 py-2.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
              sessionActive 
                ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' 
                : 'bg-linear-to-r from-[#7A8BBF] to-[#94A3D8] text-white hover:opacity-90'
            }`}
          >
            {sessionActive ? 'Stop Session' : 'Start Session'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreathingCircle;