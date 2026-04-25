"use client";
import React from 'react';
import { X, Mail, Phone } from 'lucide-react'; 
import Image from 'next/image';
import { supabase } from '@/app/utils/supabase'; // Path check kar lena agar utils folder kahi aur hai toh

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Supabase Google Login Function
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Login ke baad user ko kahan bhejna hai (usually home page)
          redirectTo: `${window.location.origin}/`, 
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  // Note: Phone aur Email ke liye aapko input fields lagengi 
  // Isliye abhi sirf Google ko functional kiya hai office requirements ke hisaab se.

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/10 backdrop-blur-[1px] transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-md rounded-4xl p-8 md:p-10 shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-black transition-colors bg-transparent border-none cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <h2 className="text-2xl font-serif text-gray-800 mb-2 mt-4 text-center">
          Save your journey with KAAL
        </h2>
        <p className="text-sm text-gray-500 text-center mb-10 leading-relaxed">
          Sign in to securely store your reflections and conversations.
        </p>

        {/* Buttons Stack */}
        <div className="w-full flex flex-col gap-4">
          
          {/* Google Button - Ab ye working hai */}
          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-[#E9B96E] hover:bg-[#d4a55d] text-white font-bold py-4 rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-3 border-none cursor-pointer shadow-sm"
          >
            <span className="text-sm">Continue with Google</span>
          </button>

          {/* Phone Button */}
          <button className="w-full bg-white border border-gray-200 hover:border-[#E9B96E] text-gray-700 font-medium py-4 rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Continue with Phone</span>
          </button>

          {/* Email Button */}
          <button className="w-full bg-white border border-gray-200 hover:border-[#E9B96E] text-gray-700 font-medium py-4 rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Continue with Email</span>
          </button>

          {/* Skip Button */}
          <button 
            onClick={onClose}
            className="w-full bg-transparent text-gray-400 hover:text-gray-600 text-xs py-2 mt-2 transition-colors border-none cursor-pointer"
          >
            Continue without signing
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-10 pt-6 border-t border-gray-100 w-full text-center px-4">
          <p className="text-[10px] text-gray-400 leading-normal uppercase tracking-wider">
            You can continue without signing in. <br/>
            Signing in simply helps you return to your conversations anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;