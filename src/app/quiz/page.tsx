"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Navbar from "../components/Navbar";
import ChatInterface from "../components/ChatInterface";

const questions = [
  { q: "How would you describe your mood lately?", options: ["Generally positive", "Neutral", "Often low", "Very low"] },
  { q: "How well have you been sleeping?", options: ["Very well", "Fairly well", "Poorly", "Hardly at all"] },
  { q: "How often do you feel stressed?", options: ["Rarely", "Sometimes", "Often", "Almost always"] },
  { q: "How has your energy felt lately?", options: ["Energised and steady", "Mostly balanced", "Frequently exhausted", "Often drained"] },
  { q: "How connected do you feel to others?", options: ["Very connected", "Somewhat", "Often isolated", "Very isolated"] },
];

export default function QuizPage() {
  const router = useRouter(); 
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(5).fill(null));
  const [result, setResult] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleOptionSelect = (index: number) => {
    const updated = [...answers];
    updated[step] = index;
    setAnswers(updated);
  };

  const calculateResult = () => {
    const highCount = answers.filter(a => a === 2 || a === 3).length;
    return highCount >= 3 ? "High" : "Moderate";
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult(calculateResult());
    }
  };

  const progress = ((step + 1) / questions.length) * 100;

  if (showChat) {
    return (
      <div className="min-h-screen bg-[#f5f3f1] flex flex-col px-4">
        <Navbar />
        <ChatInterface onBack={() => setShowChat(false)} />
      </div>
    );
  }

  if (result) {
    const isHighStress = result === "High";

    return (
      <div className="min-h-screen bg-linear-to-b from-[#FAFAFA] to-[#F5F5F4] flex flex-col px-4">
        <Navbar />

        <div className="flex-1 flex items-center justify-center py-10">
          <div
            style={{
              background: "#fff",
              borderRadius: "30px",
              padding: "32px",
              width: "100%",
              maxWidth: "420px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              borderTop: isHighStress ? "4px solid #ef4444" : "4px solid #22c55e"
            }}
          >
            <h1 className="text-xl font-semibold text-gray-800">Your Reflection</h1>
            <p className="text-gray-400 text-sm mb-5">Based on your responses</p>

            <p className="text-xs text-gray-400 tracking-widest uppercase font-medium">
              Current Stress Level
            </p>

            <h2 className={`text-4xl my-3 font-bold ${isHighStress ? 'text-red-500' : 'text-green-500'}`}>
              {result}
            </h2>

            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              {isHighStress 
                ? "Your stress levels are currently high. We strongly recommend professional guidance alongside our tools."
                : "Your responses suggest steady stress with moments of mental fatigue. A short reset may help restore clarity."
              }
            </p>


            <div className={`flex gap-3 justify-center mb-6 ${isHighStress ? 'flex-row' : 'flex-col sm:flex-row'}`}>
               {!isHighStress ? (
                 <>
                   <button 
                    onClick={() => setShowChat(true)}
                    className="bg-orange-300 px-6 py-2.5 rounded-full cursor-pointer hover:bg-orange-400 transition-all font-medium text-sm shadow-sm"
                   >
                    Talk to Kaal AI
                   </button>
                   <button 
                    onClick={() => router.push('/Meditation')}
                    className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full cursor-pointer hover:bg-gray-50 transition-all font-medium text-sm"
                   >
                    Try Meditation
                   </button>
                 </>
               ) : (
                 <>
                   <button 
                    onClick={() => setShowChat(true)}
                    className="flex-1 bg-orange-100 text-orange-700 py-2 rounded-full text-xs font-bold hover:bg-orange-200 transition-all"
                   >
                    Talk to Kaal AI
                   </button>
                   <button 
                    onClick={() => router.push('/Meditation')}
                    className="flex-1 border border-orange-100 text-orange-700 py-2 rounded-full text-xs font-bold hover:bg-orange-50 transition-all"
                   >
                    Meditate
                   </button>
                 </>
               )}
            </div>


            <div className="pt-6 border-t border-gray-100">
              {isHighStress ? (
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Recommended Action</p>
                  <button className="w-full bg-[#4A4A4A] text-white py-3.5 rounded-2xl font-semibold text-sm hover:bg-black transition-all shadow-md active:scale-[0.98]">
                    Connect with a psychologist
                  </button>
                  <p className="text-[10px] text-gray-400 italic">Highly recommended for your current state</p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-400">
                    Prefer speaking with a licensed professional?
                  </p>
                  <p className="underline cursor-pointer text-sm text-gray-600 font-medium mt-1 hover:text-black transition-colors">
                    Connect with a psychologist
                  </p>
                </>
              )}
            </div>

            <p
              onClick={() => {
                setStep(0);
                setAnswers(new Array(5).fill(null));
                setResult(null);
              }}
              className="text-xs text-gray-400 mt-8 cursor-pointer hover:text-gray-600 transition-colors block"
            >
              Retake assessment
            </p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#f5f3f1] flex flex-col px-4">
      <Navbar />
      <div className="flex-1 flex flex-col items-center pt-14">
        <div className="text-center mb-8 w-full max-w-xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
            Assess Your Mental Clarity
          </h1>
          <div className="max-w-md mx-auto mt-5">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Question {step + 1} of 5</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2.5 bg-[#E7E5DF] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${progress}%`, background: "#EDC791" }}
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-center text-gray-600 mb-6 text-lg">
            {questions[step].q}
          </h2>
          <div className="flex flex-col gap-3">
            {questions[step].options.map((opt, i) => {
              const selected = answers[step] === i;
              return (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(i)}
                  className="w-full rounded-full py-4 bg-white border border-gray-200 transition-all font-medium text-gray-600"
                  style={{
                    background: selected ? "#FFF7ED" : "#fff",
                    border: selected ? "2px solid #EDC791" : "1px solid #E5E7EB",
                    color: selected ? "#C58A2E" : "#6B7280",
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 mb-8 w-full max-w-md flex gap-3">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="flex-1 py-3 rounded-full border border-gray-200 text-gray-400 disabled:opacity-30"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            disabled={answers[step] === null}
            className="flex-1 py-3 rounded-full text-white font-semibold transition-all"
            style={{ background: answers[step] === null ? "#D1D5DB" : "#EDC791" }}
          >
            {step === 4 ? "Finish" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
  }