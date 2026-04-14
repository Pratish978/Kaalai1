"use client";
import React, { useState, useEffect } from 'react';

interface BreathingMode {
  name: string;
  rhythm: [number, number, number];
}

const BreathingCircle = () => {
  const [breaths, setBreaths] = useState<number>(6);
  const [currentBreath, setCurrentBreath] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<BreathingMode>({
    name: 'Gentle (4-4-4)',
    rhythm: [4, 4, 4],
  });
  const [phase, setPhase] = useState<string>('Inhale');
  const [seconds, setSeconds] = useState<number>(0);

  const modes: BreathingMode[] = [
    { name: 'Gentle (4-4-4)', rhythm: [4, 4, 4] },
    { name: 'Deep (5-5-8)', rhythm: [5, 5, 8] },
    { name: 'Deep (4-7-8)', rhythm: [4, 7, 8] },
  ];

  useEffect(() => {
    let interval: any = undefined;

    if (isActive && currentBreath < breaths) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      const [inhale, hold, exhale] = selectedMode.rhythm;

      if (phase === 'Inhale' && seconds >= inhale) {
        setPhase('Hold');
        setSeconds(0);
      } else if (phase === 'Hold' && seconds >= hold) {
        setPhase('Exhale');
        setSeconds(0);
      } else if (phase === 'Exhale' && seconds >= exhale) {
        if (currentBreath + 1 < breaths) {
          setPhase('Inhale');
          setCurrentBreath((prev) => prev + 1);
          setSeconds(0);
        } else {
          setCurrentBreath(breaths);
          setIsActive(false);
          setPhase('Done!');
          clearInterval(interval);
        }
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, phase, currentBreath, breaths, selectedMode]);

  const handleStart = () => {
    if (isActive) {
      setIsActive(false);
      setPhase('Inhale');
      setCurrentBreath(0);
      setSeconds(0);
    } else {
      setIsActive(true);
      setPhase('Inhale');
      setCurrentBreath(0);
      setSeconds(0);
    }
  };

  const isInhale = isActive && phase === 'Inhale';

  return (
    <div
      className="w-full flex items-center justify-center px-3 py-6 sm:px-4 sm:py-8 md:py-10"
      style={{
        background: 'linear-gradient(160deg, #eaf0fa 0%, #dce6f5 40%, #e4edf7 70%, #d8e4f3 100%)',
        fontFamily: "'DM Sans', sans-serif",
        minHeight: '100%',
      }}
    >
      <div className="w-full max-w-[320px] sm:max-w-sm md:max-w-md flex flex-col items-center py-6 sm:py-8 md:py-10 px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-4 sm:mb-5">
          <p className="text-[#8a94a6] text-[13px] sm:text-[14px] md:text-[15px] font-normal">
            Breathe with intention.
          </p>
          <p className="text-[#9aa3b2] text-[11px] sm:text-[12px] md:text-[13px] font-normal mt-1">
            A guided breathing experience designed to reset your nervous system.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {modes.map((mode) => (
            <button
              key={mode.name}
              disabled={isActive}
              onClick={() => setSelectedMode(mode)}
              className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium transition-all duration-250 cursor-pointer disabled:cursor-not-allowed"
              style={{
                background:
                  selectedMode.name === mode.name
                    ? 'rgba(200,208,255,0.55)'
                    : 'rgba(255,255,255,0.7)',
                color: selectedMode.name === mode.name ? '#6070d8' : '#9aa3b2',
                border:
                  selectedMode.name === mode.name
                    ? '1.5px solid rgba(180,190,255,0.6)'
                    : '1.5px solid #d8dff0',
                boxShadow:
                  selectedMode.name === mode.name
                    ? '0 2px 8px rgba(120,140,240,0.15)'
                    : 'none',
                opacity: isActive && selectedMode.name !== mode.name ? 0.5 : 1,
              }}
            >
              {mode.name}
            </button>
          ))}
        </div>

        {/* Breath Counter */}
        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
          <button
            disabled={isActive}
            onClick={() => setBreaths((prev) => Math.max(1, prev - 1))}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-[#8a94a6] text-base sm:text-lg font-light cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-90 transition-transform"
            style={{
              background: 'rgba(255,255,255,0.85)',
              border: '1.5px solid #d5ddf0',
            }}
          >
            −
          </button>

          <span className="text-[#8a94a6] text-[13px] sm:text-[15px] font-medium min-w-[90px] sm:min-w-[100px] text-center">
            {breaths} Breaths
          </span>

          <button
            disabled={isActive}
            onClick={() => setBreaths((prev) => prev + 1)}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-[#8a94a6] text-base sm:text-lg font-light cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-90 transition-transform"
            style={{
              background: 'rgba(255,255,255,0.85)',
              border: '1.5px solid #d5ddf0',
            }}
          >
            +
          </button>
        </div>

        {/* Breathing Circle */}
        <div className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px] flex items-center justify-center mb-6 sm:mb-7">

          {/* Outer glow */}
          <div
            className="absolute rounded-full transition-all duration-[4000ms] ease-in-out"
            style={{
              background:
                'radial-gradient(circle, rgba(180,210,245,0.55) 0%, rgba(200,220,255,0.25) 60%, transparent 80%)',
              transform: isInhale ? 'scale(1.18)' : 'scale(1.0)',
              inset: '-16px',
              position: 'absolute',
              borderRadius: '50%',
            }}
          />

          {/* Circle background */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-[4000ms] ease-in-out"
            style={{
              background:
                'radial-gradient(circle at 40% 35%, rgba(210,228,252,0.95) 0%, rgba(185,210,245,0.88) 45%, rgba(170,200,240,0.8) 100%)',
              transform: isInhale ? 'scale(1.07)' : 'scale(0.97)',
            }}
          />

          {/* Meditation Image — no Om logo */}
          <img
            src="/meditation1.PNG"
            alt="Meditation"
            className="relative z-10 object-contain transition-all duration-[4000ms] ease-in-out"
            style={{
              width: '65%',
              height: '65%',
              filter: 'drop-shadow(0 3px 12px rgba(100,130,200,0.18))',
              transform: isInhale ? 'scale(1.09)' : 'scale(1.0)',
            }}
          />

          {/* Breath count + phase label */}
          <div className="absolute bottom-3 left-0 right-0 text-center z-20">
            <p className="text-[#8a94a6] text-[28px] sm:text-[32px] md:text-[36px] font-light leading-none">
              {currentBreath}/{breaths}
            </p>
            <p
              className="text-[#7080d0] text-[9px] sm:text-[10px] font-medium uppercase mt-1"
              style={{ letterSpacing: '0.20em' }}
            >
              {isActive ? `${phase} (${seconds}s)` : phase === 'Done!' ? 'Done!' : 'Inhale'}
            </p>
          </div>
        </div>

        {/* Start / Stop Button */}
        <button
          onClick={handleStart}
          className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[290px] py-3 sm:py-3.5 rounded-full text-white text-[13px] sm:text-[14px] font-medium cursor-pointer transition-all active:scale-95 hover:brightness-105"
          style={{
            border: 'none',
            background: isActive
              ? 'linear-gradient(135deg, #f9a8b0 0%, #f3c6e8 100%)'
              : 'linear-gradient(135deg, #7c88cd 0%, #85b8f0 100%)',
            boxShadow: isActive
              ? '0 4px 18px rgba(220,100,130,0.18)'
              : '0 4px 18px rgba(100,130,220,0.22)',
            letterSpacing: '0.02em',
          }}
        >
          {isActive ? 'Stop Session' : 'Start session'}
        </button>

      </div>
    </div>
  );
};

export default BreathingCircle;