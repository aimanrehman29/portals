"use client";
import { useState } from "react";
import { client } from "../lib/sanity";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Check if the Roll Number already exists
      const existing = await client.fetch(
        `*[_type == "student" && rollNumber == $id][0]`,
        { id: formData.rollNumber }
      );

      if (existing) {
        alert("This Roll Number is already registered!");
        setLoading(false);
        return;
      }

      // 2. Create the new student in Sanity
      await client.create({
        _type: "student",
        name: formData.name,
        rollNumber: formData.rollNumber,
        email: formData.email,
        role: "student", // Default role for new signups
      });

      alert("Registration Successful! Please login with your ID.");
      router.push("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Error saving data. Ensure your API token has 'Editor' permissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans p-6">
      <div className="w-full max-w-md p-8 bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">
            JOIN <span className="text-sky-500 underline decoration-sky-500/30 underline-offset-8">PORTAL</span>
          </h1>
          <p className="text-zinc-500 text-[10px] mt-4 tracking-[0.3em] uppercase">Student Enrollment</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="group">
            <label className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-2 ml-4 group-focus-within:text-sky-500 transition-colors">Full Name</label>
            <input
              type="text"
              placeholder="e.g. Ayman Rehman"
              className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all text-sm"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-2 ml-4 group-focus-within:text-sky-500 transition-colors">Roll Number / ID</label>
            <input
              type="text"
              placeholder="e.g. BSCS-001"
              className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all text-sm"
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
              required
            />
          </div>

          <div className="group">
            <label className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-2 ml-4 group-focus-within:text-sky-500 transition-colors">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-2xl focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all text-sm"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-sky-500 hover:text-white active:scale-95 transition-all uppercase tracking-widest text-xs mt-4 shadow-lg shadow-white/5"
          >
            {loading ? "PROCESSING..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p className="mt-8 text-center text-zinc-500 text-[10px] tracking-widest uppercase">
          Already registered?{" "}
          <button onClick={() => router.push("/login")} className="text-white border-b border-white/20 hover:text-sky-500 hover:border-sky-500 transition-all">SIGN IN</button>
        </p>
      </div>
    </div>
  );
}