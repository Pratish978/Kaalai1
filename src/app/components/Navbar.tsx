"use client";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; 
import { ChevronLeft, X, Menu } from "lucide-react";
import AuthModal from "./AuthModal";

interface NavbarProps {
  onBack?: () => void;
  forceBack?: boolean; 
}

const Navbar = ({ onBack, forceBack }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  
  // Agar forceBack true hai ya hum "/" ke bahar hain, toh back dikhao
  const showBack = forceBack || pathname !== "/";

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <>
      <nav className="relative flex items-center justify-between px-4 md:px-16 py-6 md:py-10 bg-transparent min-h-27.5 w-full">
        

        <div className="flex flex-1 items-start z-50">
          

          <div className="hidden md:block">
            {showBack ? (
              <button 
                onClick={handleBack} 
                className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors bg-transparent border-none cursor-pointer p-0 group"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                <span className="text-xs uppercase tracking-widest font-bold">Back</span>
              </button>
            ) : (
              <div className="relative w-28 h-10 cursor-pointer" onClick={() => router.push("/")}>
                <Image src="/kaal-logo.png" alt="KAAL AI Logo" fill sizes="112px" className="object-contain" priority />
              </div>
            )}
          </div>


          <div className="md:hidden">
            {showBack ? (
              <button 
                onClick={handleBack} 
                className="flex items-center gap-0 text-gray-800 bg-transparent border-none cursor-pointer p-1 -ml-1 active:scale-95 transition-transform"
              >
                <ChevronLeft className="w-7 h-7" />
                <span className="text-[10px] uppercase tracking-widest font-extrabold -ml-1">Back</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsOpen(true)} 
                className="text-gray-800 bg-transparent border-none cursor-pointer p-1 -ml-1"
              >
                <Menu className="w-7 h-7" />
              </button>
            )}
          </div>
        </div>


        <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <div className="relative w-20 h-8" onClick={() => router.push("/")}>
            <Image src="/kaal-logo.png" alt="KAAL AI Logo" fill sizes="80px" className="object-contain" priority />
          </div>
        </div>


        <div className="flex flex-1 justify-end items-center z-50">
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="hidden md:block text-gray-600 font-medium hover:text-black transition-all bg-transparent border-none cursor-pointer text-sm  tracking-widest hover:underline underline-offset-8"
          >
            Log in
          </button>
          <div className="md:hidden w-8"></div>
        </div>
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Sidebar logic */}
      <div className={`fixed top-0 left-0 h-full w-[80%] bg-[#F3EFE9] shadow-2xl z-100 transform transition-transform duration-500 md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full p-8">
          <button onClick={() => setIsOpen(false)} className="self-end p-2 text-gray-400 bg-transparent border-none"><X className="w-8 h-8" /></button>
          <button className="text-left text-3xl font-serif text-gray-800 bg-transparent border-none mt-10" onClick={() => { setIsOpen(false); setIsAuthOpen(true); }}>Log in</button>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-90 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Navbar;