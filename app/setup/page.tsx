"use client";
import { client } from "../lib/sanity";

export default function SetupPage() {
  const createTeacher = async () => {
    try {
      // This creates the authorized person in your Sanity database
      await client.create({
        _type: 'student', // Matches your existing schema
        name: 'Prof. Ahmed',
        rollNumber: 'T-101',
        role: 'teacher' // The secret key to unlock admin access
      });
      alert("Teacher Created! Now go to /login and use T-101");
    } catch (err) {
      console.error(err);
      alert("Error! Check if your Sanity Token in src/lib/sanity.ts is set to 'Editor' permissions.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-10">
      <div className="border border-sky-500/30 p-10 rounded-[3rem] bg-zinc-900/50 backdrop-blur-xl text-center">
        <h1 className="text-3xl font-black mb-4">SYSTEM <span className="text-sky-500">SETUP</span></h1>
        <p className="text-zinc-400 mb-8 text-sm">Click below to authorize the initial Teacher account in your database.</p>
        
        <button 
          onClick={createTeacher} 
          className="bg-white text-black px-8 py-4 rounded-2xl font-black hover:bg-sky-500 transition-all uppercase tracking-widest shadow-lg shadow-sky-500/20"
        >
          Force Create Teacher (T-101)
        </button>
      </div>
    </div>
  );
}