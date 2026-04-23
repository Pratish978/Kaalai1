"use client";
import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface PlayerProps {
  onClose: () => void;
  title: string;
}

export default function MeditationPlayer({ onClose, title }: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => setDuration(audio.duration);
    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    
    audio.play().then(() => setIsPlaying(true)).catch(() => console.log("Interaction needed"));

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  // Click on bar to seek music
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedValue = (x / rect.width) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = clickedValue;
    }
  };

  return (
    <div className="fixed inset-0 z-999 bg-[#6B6B6B] flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-4xl flex justify-center items-center relative mb-8">
        <div className="text-center text-white">
          <h2 className="text-[18px] font-medium leading-tight">{title}</h2>
          <p className="text-[12px] opacity-80 mt-1">Choose an option</p>
        </div>
        <button 
          onClick={onClose}
          className="absolute right-0 text-white/80 hover:text-white transition-all cursor-pointer"
        >
          <X size={28} strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative w-full max-w-212.5 aspect-16/11 rounded-lg overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]">
        <img 
          src="/meditate.png" 
          alt="Meditation" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8 pt-20 bg-linear-to-t from-black/40 to-transparent">
          
          <audio ref={audioRef} src="/Music/morning.mp3" />

          <div className="w-full mb-6">
            <div className="flex justify-between text-white text-[13px] font-medium mb-3 px-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Progress Bar Container - Added cursor-pointer and onClick */}
            <div 
              onClick={handleSeek}
              className="relative w-full h-0.75 bg-white/20 rounded-full cursor-pointer group"
            >
              <div 
                className="absolute top-0 left-0 h-full bg-linear-to-r from-[#5E5CE6] to-[#BF5AF2] rounded-full transition-all duration-100"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
              {/* Hover effect for bar */}
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          <div className="flex items-center justify-between px-2 text-white/90">
            <button className="hover:text-white cursor-pointer transition-colors">
              <SkipBack size={24} fill="currentColor" />
            </button>
            
            <button 
              onClick={togglePlay} 
              className="hover:scale-110 transition-transform cursor-pointer"
            >
              {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" />}
            </button>
            
            <button className="hover:text-white cursor-pointer transition-colors">
              <SkipForward size={24} fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}