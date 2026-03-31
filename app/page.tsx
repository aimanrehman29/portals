"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function WelcomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [id, setId] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for T-101 vs Student ID
    if (id.startsWith("T-")) {
      Cookies.set("user_session", JSON.stringify({ name: "Ayyan", role: "teacher", rollNumber: id }));
      router.push("/admin");
    } else {
      Cookies.set("user_session", JSON.stringify({ name: "Ayman", role: "student", rollNumber: id }));
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-6">
      {/* Aesthetic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-black to-black" />

      <div className="z-10 text-center space-y-8">
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase">
          KUPORTAL<span className="text-sky-500 text-3xl not-italic">v1.1</span>
        </h1>
        <p className="text-zinc-600 text-[10px] tracking-[0.8em] uppercase font-bold">
          Karachi University • BSCS Project
        </p>
        <button 
          onClick={() => router.push("/register")}
          className="mt-10 px-12 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-sky-500 hover:text-white transition-all duration-500"
        >
          Enter Terminal
        </button>
      </div>

      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
          <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-900 p-10 rounded-[3rem] shadow-2xl flex flex-col gap-8">
            <button onClick={() => setShowLogin(false)} className="absolute top-8 right-8 text-zinc-700 hover:text-white">✕</button>
            
            <div className="text-center">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white underline decoration-sky-500 underline-offset-8">Portal Login</h2>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter Teacher or Student ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full bg-black border border-zinc-900 p-5 rounded-2xl text-white text-sm outline-none focus:border-sky-500 transition-all placeholder:text-zinc-800"
              />
              <button className="w-full bg-sky-500 text-black font-black py-5 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-sky-400 transition-all">
                Access Portal
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-zinc-700 text-[9px] font-bold tracking-widest uppercase">
                Don't have an account?{" "}
                <button 
                  onClick={() => router.push("/register")} 
                  className="text-white hover:text-sky-400 underline decoration-zinc-800 underline-offset-4"
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}