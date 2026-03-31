"use client";
import { useState } from "react";
import { client } from "../lib/sanity";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Look for the user in Sanity
      const user = await client.fetch(
        `*[_type == "student" && rollNumber == $id][0]`,
        { id }
      );

      if (user) {
        // 1. Save the session in a cookie for the middleware to see
        // We store the whole user object as a string
        Cookies.set("user_session", JSON.stringify(user), { expires: 1 });

        // 2. Redirect based on their role
        if (user.role === "teacher") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        alert("Invalid ID. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("System error. Check your Sanity connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans">
      <div className="w-full max-w-md p-8 bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] backdrop-blur-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter uppercase">
            KUPORTAL <span className="text-sky-500">v1.1</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-2 tracking-[0.2em] uppercase">
            Karachi University • BSCS Project
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 ml-4">
              Identification ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter Teacher or Student ID"
              className="w-full bg-zinc-800/50 border border-zinc-700 p-4 rounded-2xl focus:outline-none focus:border-sky-500 transition-all text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-sky-500 hover:text-white transition-all uppercase tracking-widest text-sm shadow-xl shadow-white/5"
          >
            {loading ? "Verifying..." : "Access Portal"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-500 text-xs">
            Don't have an account?{" "}
            <button 
              onClick={() => router.push('/register')}
              className="text-white hover:text-sky-500 transition-colors"
            >
              Register here
            </button>
          </p>
        </div>
      </div>

      {/* Aesthetic Footer */}
      <div className="absolute bottom-10 text-[10px] text-zinc-700 tracking-[0.5em] uppercase">
        Secure Terminal Access
      </div>
    </div>
  );
}