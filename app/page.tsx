"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "../app/lib/sanity";
import Cookies from "js-cookie";

export default function WelcomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Search for the user in Sanity based on the ID/Roll Number
      const user = await client.fetch(
        `*[_type in ["student", "teacher"] && rollNumber == $id][0]`,
        { id }
      );

      if (user) {
        // Save session in a cookie for the middleware to check
        Cookies.set("user_session", JSON.stringify(user), { expires: 1 });
        
        // Redirect based on the role found in the database
        if (user.role === "teacher") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("Invalid ID. Access Denied.");
      }
    } catch (err) {
      setError("System Error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Background Aesthetic Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[120px]" />

      {/* Main Branding Section */}
      <div className="text-center z-10 space-y-6">
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter italic text-white uppercase leading-none select-none">
          KUPORTAL<span className="text-sky-500 italic not-italic text-4xl">v1.1</span>
        </h1>
        <p className="text-zinc-500 text-xs font-bold tracking-[0.6em] uppercase">
          Karachi University • BSCS Semester 1 Project
        </p>
        
        <div className="flex gap-4 justify-center pt-8">
          <button 
            onClick={() => setShowLogin(true)}
            className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-sky-500 hover:text-white transition-all duration-500"
          >
            Enter Portal
          </button>
        </div>
      </div>

      {/* --- LOGIN POP-UP OVERLAY --- */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={() => setShowLogin(false)}
              className="absolute top-6 right-6 text-zinc-600 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="mb-10">
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter underline decoration-sky-500 underline-offset-8">
                Portal Login
              </h2>
              <p className="text-[10px] text-zinc-500 mt-4 tracking-widest font-bold uppercase">
                Enter your Teacher or Student ID
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Roll Number / ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                  className="w-full bg-black border border-zinc-800 p-5 rounded-2xl text-white text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all placeholder:text-zinc-700"
                />
              </div>

              {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sky-500 hover:bg-sky-400 text-black font-black py-5 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all flex justify-center items-center gap-2"
              >
                {loading ? "Verifying..." : "Access Portal"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-zinc-800/50 text-center">
              <p className="text-zinc-600 text-[10px] font-bold tracking-widest uppercase">
                New User? <span className="text-white hover:text-sky-400 cursor-pointer transition-colors">Register Here</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer Signature */}
      <footer className="absolute bottom-10 text-zinc-800 text-[10px] font-mono tracking-widest uppercase select-none">
        Secure Terminal Node • Authorized Access Only
      </footer>
    </div>
  );
}