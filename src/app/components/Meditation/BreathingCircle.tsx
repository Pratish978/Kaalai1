"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ChatInterface from '../ChatInterface'; // Reference from image_f02061.jpg

// JSON Imports
import chapter2 from '@/app/JSON/Chapter2.json';
import chapter8 from '@/app/JSON/Chapter8.json';
import chapter12 from '@/app/JSON/Chaptor12.json';
import chapter15 from '@/app/JSON/Chaptor15.json';
import chapter17 from '@/app/JSON/Chaptor17.json';

const allGitaData = [...chapter2, ...chapter8, ...chapter12, ...chapter15, ...chapter17];

const BreathingCircle = () => {
  const router = useRouter();
  
  // --- States ---
  const [breaths, setBreaths] = useState(6);
  const [sessionActive, setSessionActive] = useState(false);
  const [breathsCompleted, setBreathsCompleted] = useState(0);
  const [phase, setPhase] = useState('READY');
  const [timeLeft, setTimeLeft] = useState(0);
  const [mode, setMode] = useState([4, 4, 4]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  // UI Toggles
  const [showPopup, setShowPopup] = useState(false);
  const [showChat, setShowChat] = useState(false); 
  const [showShloka, setShowShloka] = useState(false);
  
  // Gita Wisdom States
  const [currentShloka, setCurrentShloka] = useState<any>(null);
  const [shlokaCount, setShlokaCount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- Logic Functions ---

  const getRandomShloka = () => {
    if (shlokaCount >= 5 && !isPaid) {
      setCurrentShloka(null);
      setShowShloka(true);
      setShowPopup(false);
      return;
    }
    if (allGitaData.length > 0) {
      const randomIndex = Math.floor(Math.random() * allGitaData.length);
      setCurrentShloka(allGitaData[randomIndex]);
      setShlokaCount((prev) => prev + 1);
      setShowShloka(true);
      setShowPopup(false);
    }
  };

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
              setShowPopup(true);
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-2 md:p-4 bg-[#FBF9F6]">
      
      {/* Kaal AI Chat Modal Overlay */}
      {showChat && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-[40px] relative overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <button 
              onClick={() => setShowChat(false)}
              className="absolute top-6 right-6 z-[60] bg-neutral-100 hover:bg-neutral-200 w-10 h-10 rounded-full flex items-center justify-center transition-colors text-neutral-600"
            >
              ✕
            </button>
            <ChatInterface />
          </div>
        </div>
      )}

      <div className="bg-white rounded-[40px] md:rounded-[50px] w-full max-w-[900px] py-8 md:py-10 px-3 md:px-10 flex flex-col items-center border border-neutral-100 overflow-hidden shadow-sm relative">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-xl font-bold text-neutral-500 mb-1">Breathe with intention.</h2>
          <p className="text-[11px] md:text-sm text-neutral-400">A guided breathing experience designed to reset your nervous system.</p>
        </div>

        {/* Modes Selection */}
        <div className="flex justify-center gap-1.5 md:gap-3 mb-8 w-full max-w-full overflow-x-auto no-scrollbar">
          {modes.map((m) => {
            const isActive = JSON.stringify(mode) === JSON.stringify(m.values);
            return (
              <button
                key={m.label}
                disabled={sessionActive}
                onClick={() => { setMode(m.values); setBreathsCompleted(0); setShowPopup(false); setShowShloka(false); }}
                className={`whitespace-nowrap text-[9px] md:text-[12px] py-2 md:py-2.5 px-3 md:px-8 rounded-full border transition-all cursor-pointer flex-shrink-0 ${
                  isActive ? 'bg-[#C7D2FE] border-transparent text-white' : 'bg-white border-neutral-200 text-neutral-400 hover:bg-neutral-50'
                } ${sessionActive ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Breath Counter */}
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

        {/* Visual Area */}
        <div className="relative w-full flex flex-col items-center justify-center mb-10 overflow-visible min-h-[220px] md:min-h-[280px]">
          <div className={`relative z-10 transition-transform duration-[4000ms] ease-in-out ${sessionActive && phase === 'Inhale' ? 'scale-110' : 'scale-100'}`}>
            <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] relative">
              <Image src="/meditation1.PNG" alt="Meditation" fill className="object-cover rounded-full" />
            </div>
          </div>
          
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none translate-y-10 md:translate-y-16">
            <div className="text-4xl md:text-5xl font-bold text-white">
              {breathsCompleted}/{breaths}
            </div>
            <div className="text-[10px] md:text-xs font-bold text-white uppercase tracking-[0.3em] md:tracking-[0.5em] mt-1">
              {sessionActive ? `${phase} ${timeLeft}s` : phase}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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
            onClick={() => { 
              if(!sessionActive) {
                setBreathsCompleted(0);
                setShowPopup(false);
                setShowShloka(false);
              }
              setSessionActive(!sessionActive); 
            }}
            className="w-full py-4 rounded-2xl md:rounded-3xl text-white font-bold text-xs md:text-sm active:scale-95 transition-all uppercase tracking-widest cursor-pointer"
            style={{ background: 'linear-gradient(to right, #6D7EB3, #7FB1E9)' }}
          >
            {sessionActive ? 'Stop Session' : 'Start Session'}
          </button>
        </div>

        {/* Reflection Pop-up */}
        {showPopup && !showShloka && (
          <div className="mt-10 w-full max-w-xl bg-[#F5F5F5] rounded-[32px] p-8 flex flex-col items-center text-center shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-[#4A4A4A] text-[16px] md:text-[18px] font-medium mb-1">Session Complete</h3>
            <p className="text-[#8E8E8E] text-[11px] md:text-[12px] mb-8 leading-relaxed">How do you feel?</p>

            <div className="flex flex-wrap justify-center gap-3 w-full">
              {/* TALK TO KAAL AI */}
              <button 
                onClick={() => setShowChat(true)}
                className="bg-[#E9B87D] text-white px-6 py-2.5 rounded-full text-[12px] md:text-[13px] font-medium hover:bg-[#dfa96b] transition-all shadow-sm"
              >
                Talk to Kaal
              </button>
              
              <button 
                onClick={getRandomShloka}
                className="border border-[#D1C7BD] text-[#7A7A7A] px-6 py-2.5 rounded-full text-[12px] md:text-[13px] font-medium hover:bg-[#ebe5df] transition-all"
              >
                Explore Gita Wisdom
              </button>

              {/* TAKE REFLECTION TEST - Navigates to /quiz as seen in sidebar */}
              <button 
                onClick={() => router.push('/quiz')}
                className="border border-[#D1C7BD] text-[#7A7A7A] px-6 py-2.5 rounded-full text-[12px] md:text-[13px] font-medium hover:bg-[#ebe5df] transition-all"
              >
                Take Reflection Test
              </button>
            </div>
            <button onClick={() => setShowPopup(false)} className="mt-6 text-[11px] text-[#A0A0A0] underline">Skip for now</button>
          </div>
        )}

        {/* Shloka Wisdom Card or Paywall */}
        {showShloka && (
          <div className="mt-10 w-full max-w-2xl bg-orange-50/50 rounded-[32px] p-6 md:p-10 border border-orange-100 animate-in fade-in zoom-in duration-500">
            {currentShloka ? (
              <div className="text-center">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Verse {currentShloka.chapter}.{currentShloka.verse} ({shlokaCount}/5 Free)</span>
                  <button onClick={() => setShowShloka(false)} className="text-neutral-400">✕</button>
                </div>
                <p className="text-xl font-serif text-neutral-800 mb-6 italic leading-relaxed">"{currentShloka.sanskrit}"</p>
                <p className="text-md text-neutral-600 mb-8 leading-relaxed">{currentShloka.meanings?.english || currentShloka.english}</p>
                <button 
                  onClick={getRandomShloka}
                  className="w-full py-3 rounded-full border border-orange-200 text-orange-600 text-xs font-bold uppercase tracking-widest hover:bg-orange-100 transition-colors"
                >
                  Next Wisdom
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🕉️</div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">Daily Limit Reached</h3>
                <p className="text-sm text-neutral-500 mb-8">Unlock the full spiritual collection of 700+ verses to continue your journey.</p>
                <button 
                  onClick={() => setIsPaid(true)} 
                  className="w-full py-4 rounded-2xl bg-orange-400 text-black font-bold text-sm shadow-lg mb-4 hover:bg-orange-600 transition-all"
                >
                  Go Premium — ₹99
                </button>
                <button onClick={() => setShowShloka(false)} className="text-xs text-neutral-400 underline">Close</button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default BreathingCircle;