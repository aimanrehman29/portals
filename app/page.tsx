"use client";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Aesthetic Background - Subtle Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black" />

      <div className="z-10 text-center space-y-6">
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase">
          DUAL PORTAL<span className="text-sky-500 text-3xl not-italic"></span>
        </h1>
        <p className="text-zinc-600 text-[10px] tracking-[0.8em] uppercase font-bold">
          Karachi University • BSCS Project
        </p>
        
        <div className="pt-10">
          <button 
            onClick={() => router.push("/register")}
            className="px-16 py-5 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-sky-500 hover:text-white transition-all duration-500 shadow-2xl shadow-sky-500/20"
          >
            Enter Terminal
          </button>
        </div>
      </div>
    </div>
  );
}